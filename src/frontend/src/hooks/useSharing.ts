import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ScanRecord } from "../backend";

export function useSharing() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  const createShareTokenMutation = useMutation({
    mutationFn: async (scanId: string): Promise<string> => {
      if (!actor) throw new Error("Actor not ready");
      const token = await actor.createShareToken(scanId);
      const shareUrl = `${window.location.origin}/shared/${token}`;
      return shareUrl;
    },
  });

  const saveToMyHistoryMutation = useMutation({
    mutationFn: async (sharedToken: string): Promise<string> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveScanToMyHistory(sharedToken);
    },
  });

  return {
    createShareToken: createShareTokenMutation.mutate,
    createShareTokenAsync: createShareTokenMutation.mutateAsync,
    isCreatingToken: createShareTokenMutation.isPending,
    shareUrl: createShareTokenMutation.data ?? null,
    saveToMyHistory: saveToMyHistoryMutation.mutate,
    isSavingToHistory: saveToMyHistoryMutation.isPending,
    isActorLoading,
  };
}

export function useSharedScan(token: string) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  return useQuery<ScanRecord | null>({
    queryKey: ["sharedScan", token],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSharedScan(token);
    },
    enabled: !!actor && !isActorLoading && !!token,
  });
}
