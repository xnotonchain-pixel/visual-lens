import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ScanRecord } from "../backend";

export function useHistory() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const queryClient = useQueryClient();

  const historyQuery = useQuery<ScanRecord[]>({
    queryKey: ["scanHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getScanHistory();
    },
    enabled: !!actor && !isActorLoading,
  });

  const deleteScanMutation = useMutation({
    mutationFn: async (scanId: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteScan(scanId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    },
  });

  return {
    history: historyQuery.data ?? [],
    isLoading: historyQuery.isLoading || isActorLoading,
    error: historyQuery.error,
    deleteScan: deleteScanMutation.mutate,
    isDeleting: deleteScanMutation.isPending,
    refetch: historyQuery.refetch,
  };
}
