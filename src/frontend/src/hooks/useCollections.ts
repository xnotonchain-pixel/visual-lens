import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Collection } from "../backend";

export function useCollections() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const queryClient = useQueryClient();

  const collectionsQuery = useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserCollections();
    },
    enabled: !!actor && !isActorLoading,
  });

  const createCollectionMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createCollection(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const deleteCollectionMutation = useMutation({
    mutationFn: async (collectionId: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteCollection(collectionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const addScanMutation = useMutation({
    mutationFn: async ({
      collectionId,
      scanId,
    }: { collectionId: string; scanId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addScanToCollection(collectionId, scanId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const removeScanMutation = useMutation({
    mutationFn: async ({
      collectionId,
      scanId,
    }: { collectionId: string; scanId: string }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeFromCollection(collectionId, scanId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  const getCollection = async (
    collectionId: string,
  ): Promise<Collection | null> => {
    if (!actor) return null;
    return actor.getCollection(collectionId);
  };

  return {
    collections: collectionsQuery.data ?? [],
    isLoading: collectionsQuery.isLoading || isActorLoading,
    error: collectionsQuery.error,
    createCollection: createCollectionMutation.mutate,
    isCreating: createCollectionMutation.isPending,
    deleteCollection: deleteCollectionMutation.mutate,
    isDeleting: deleteCollectionMutation.isPending,
    addScan: addScanMutation.mutate,
    removeScan: removeScanMutation.mutate,
    getCollection,
    refetch: collectionsQuery.refetch,
  };
}

export function useCollection(collectionId: string) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  return useQuery<Collection | null>({
    queryKey: ["collection", collectionId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCollection(collectionId);
    },
    enabled: !!actor && !isActorLoading && !!collectionId,
  });
}
