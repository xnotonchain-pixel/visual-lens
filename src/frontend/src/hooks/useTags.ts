import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AnalysisResult,
  TagSuggestion,
  TagSuggestionRequest,
} from "../backend";
import { Variant_aggressive_subtle_moderate } from "../backend";

export type { TagSuggestion };
export type { TagSuggestionRequest };

// Map frontend aggressiveness strings to backend enum values
export type AggressivenessLevel = "subtle" | "moderate" | "aggressive";

export function aggressivenessToVariant(
  level: AggressivenessLevel,
): Variant_aggressive_subtle_moderate {
  switch (level) {
    case "subtle":
      return Variant_aggressive_subtle_moderate.subtle;
    case "moderate":
      return Variant_aggressive_subtle_moderate.moderate;
    case "aggressive":
      return Variant_aggressive_subtle_moderate.aggressive;
  }
}

export function useSuggestTags(
  request: {
    scanId: string;
    analysisResult: AnalysisResult;
    existingTags: string[];
    aggressiveness: AggressivenessLevel;
  } | null,
) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  return useQuery<TagSuggestion[]>({
    queryKey: [
      "suggestTags",
      request?.scanId,
      request?.aggressiveness,
      request?.existingTags.join(","),
    ],
    queryFn: async () => {
      if (!actor || !request) return [];
      const backendRequest: TagSuggestionRequest = {
        scanId: request.scanId,
        analysisResult: request.analysisResult,
        existingTags: request.existingTags,
        aggressiveness: aggressivenessToVariant(request.aggressiveness),
      };
      return actor.suggestTags(backendRequest);
    },
    enabled: !!actor && !isActorLoading && !!request,
    staleTime: 60_000, // cache suggestions for 1 minute
  });
}

export function usePublishToDiscovery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: {
      scanId: string;
      title: string | null;
      tags: string[];
      imageBase64: string;
      analysisMode: import("../backend").AnalysisMode;
      analysisResult: AnalysisResult;
      privacy: import("../backend").Variant_open_unlisted;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.publishScanToDiscovery(
        args.scanId,
        args.title,
        args.tags,
        args.imageBase64,
        args.analysisMode,
        args.analysisResult,
        args.privacy,
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discoveryFeed"] });
    },
  });
}
