import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type AnalysisMode,
  Variant_open_unlisted,
  Variant_trending_newest_mostLiked,
  createActor,
} from "../backend";
import type {
  AnalysisResult,
  DiscoveryFilter as BackendDiscoveryFilter,
  DiscoveryScan,
} from "../backend";

export type SortBy = "newest" | "mostLiked" | "trending";

export interface DiscoveryFilterUI {
  keyword?: string;
  mode?: AnalysisMode;
  sortBy: SortBy;
  limit: number;
  offset: number;
}

function toBackendFilter(f: DiscoveryFilterUI): BackendDiscoveryFilter {
  const sortMap: Record<SortBy, Variant_trending_newest_mostLiked> = {
    newest: Variant_trending_newest_mostLiked.newest,
    mostLiked: Variant_trending_newest_mostLiked.mostLiked,
    trending: Variant_trending_newest_mostLiked.trending,
  };
  return {
    keyword: f.keyword || undefined,
    mode: f.mode || undefined,
    sortBy: sortMap[f.sortBy],
    limit: BigInt(f.limit),
    offset: BigInt(f.offset),
  };
}

export function useDiscoveryFeed(filter: DiscoveryFilterUI) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);

  return useQuery<DiscoveryScan[]>({
    queryKey: ["discoveryFeed", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicDiscoveryFeed(toBackendFilter(filter));
    },
    enabled: !!actor && !isActorLoading,
    staleTime: 30_000,
  });
}

export interface PublishScanParams {
  scanId: string;
  title?: string;
  tags: string[];
  imageBase64: string;
  analysisMode: AnalysisMode;
  analysisResult: AnalysisResult;
  privacy: "open" | "unlisted";
}

export function usePublishScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (params: PublishScanParams) => {
      if (!actor) throw new Error("Actor not ready");
      const privacyVariant =
        params.privacy === "open"
          ? Variant_open_unlisted.open
          : Variant_open_unlisted.unlisted;
      const result = await actor.publishScanToDiscovery(
        params.scanId,
        params.title ?? null,
        params.tags,
        params.imageBase64,
        params.analysisMode,
        params.analysisResult,
        privacyVariant,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["discoveryFeed"] });
    },
  });
}

export function useUnpublishScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (discoveryId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.unpublishScanFromDiscovery(discoveryId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["discoveryFeed"] });
    },
  });
}

export function useLikeScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (discoveryId: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.likeDiscoveryScan(discoveryId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["discoveryFeed"] });
    },
  });
}
