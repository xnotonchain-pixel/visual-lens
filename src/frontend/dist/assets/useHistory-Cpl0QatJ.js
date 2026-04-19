import { d as useQueryClient, e as createActor } from "./index-BUSSrS1X.js";
import { a as useActor, b as useQuery } from "./index-BsMJgQDJ.js";
import { u as useMutation } from "./useMutation-Bk3bBMzH.js";
function useHistory() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const queryClient = useQueryClient();
  const historyQuery = useQuery({
    queryKey: ["scanHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getScanHistory();
    },
    enabled: !!actor && !isActorLoading
  });
  const deleteScanMutation = useMutation({
    mutationFn: async (scanId) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.deleteScan(scanId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    }
  });
  return {
    history: historyQuery.data ?? [],
    isLoading: historyQuery.isLoading || isActorLoading,
    error: historyQuery.error,
    deleteScan: deleteScanMutation.mutate,
    isDeleting: deleteScanMutation.isPending,
    refetch: historyQuery.refetch
  };
}
export {
  useHistory as u
};
