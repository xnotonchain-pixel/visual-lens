import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BookMarked,
  BookOpen,
  Car,
  Eye,
  Globe,
  Heart,
  Landmark,
  Languages,
  Leaf,
  PlusCircle,
  Receipt,
  Search,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Telescope,
  Utensils,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { AnalysisMode, type DiscoveryScan } from "../backend";
import { createActor } from "../backend";
import {
  type DiscoveryFilterUI,
  type SortBy,
  useDiscoveryFeed,
  useLikeScan,
} from "../hooks/useDiscovery";
import { useSharing } from "../hooks/useSharing";
import { useLensStore } from "../store";
import type { Collection } from "../types";

// ── Mode metadata ──────────────────────────────────────────────────────────────
const MODE_META: Record<
  AnalysisMode,
  { label: string; icon: React.ElementType; cssVar: string; colorClass: string }
> = {
  [AnalysisMode.generic]: {
    label: "Generic",
    icon: Sparkles,
    cssVar: "--mode-generic",
    colorClass: "text-[oklch(0.72_0.16_195)]",
  },
  [AnalysisMode.plant]: {
    label: "Plant",
    icon: Leaf,
    cssVar: "--mode-plant",
    colorClass: "text-[oklch(0.68_0.18_140)]",
  },
  [AnalysisMode.food]: {
    label: "Food",
    icon: Utensils,
    cssVar: "--mode-food",
    colorClass: "text-[oklch(0.72_0.16_30)]",
  },
  [AnalysisMode.bookProduct]: {
    label: "Book & Product",
    icon: BookOpen,
    cssVar: "--mode-book",
    colorClass: "text-[oklch(0.65_0.16_270)]",
  },
  [AnalysisMode.translation]: {
    label: "Translation",
    icon: Languages,
    cssVar: "--mode-translation",
    colorClass: "text-[oklch(0.7_0.17_50)]",
  },
  [AnalysisMode.artLandmark]: {
    label: "Art & Landmark",
    icon: Landmark,
    cssVar: "--mode-art",
    colorClass: "text-[oklch(0.75_0.15_320)]",
  },
  [AnalysisMode.receipt]: {
    label: "Receipt",
    icon: Receipt,
    cssVar: "--mode-receipt",
    colorClass: "text-[oklch(0.66_0.14_240)]",
  },
  [AnalysisMode.medicalReference]: {
    label: "Medical",
    icon: Stethoscope,
    cssVar: "--mode-medical",
    colorClass: "text-[oklch(0.62_0.2_10)]",
  },
  [AnalysisMode.carFashion]: {
    label: "Car & Fashion",
    icon: Car,
    cssVar: "--mode-car",
    colorClass: "text-[oklch(0.68_0.16_170)]",
  },
};

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "mostLiked", label: "Most Liked" },
  { value: "trending", label: "Trending" },
];

const MODE_OPTIONS: { value: AnalysisMode | "all"; label: string }[] = [
  { value: "all", label: "All Modes" },
  ...Object.entries(MODE_META).map(([k, v]) => ({
    value: k as AnalysisMode,
    label: v.label,
  })),
];

const PAGE_SIZE = 20;

// ── Skeleton card ──────────────────────────────────────────────────────────────
function ScanCardSkeleton() {
  return (
    <div
      className="glass-card overflow-hidden animate-pulse"
      data-ocid="discovery.card.loading_state"
    >
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── Discovery card ─────────────────────────────────────────────────────────────
interface ScanCardProps {
  scan: DiscoveryScan;
  index: number;
  likedIds: Set<string>;
  onLike: (id: string) => void;
  onOpen: (scan: DiscoveryScan) => void;
}

function ScanCard({ scan, index, likedIds, onLike, onOpen }: ScanCardProps) {
  const meta = MODE_META[scan.analysisMode] ?? MODE_META[AnalysisMode.generic];
  const Icon = meta.icon;
  const isLiked = likedIds.has(scan.id);

  const title =
    scan.title ||
    scan.analysisResult.sceneDescription.slice(0, 60) ||
    "Untitled scan";

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: card grid doesn't need keyboard handler
    <div
      className="glass-card overflow-hidden group cursor-pointer transition-smooth hover:scale-[1.02] hover:glow-border animate-slide-up"
      style={{ animationDelay: `${(index % 20) * 0.04}s` }}
      onClick={() => onOpen(scan)}
      data-ocid={`discovery.card.item.${index + 1}`}
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <img
          src={`data:image/jpeg;base64,${scan.imageBase64}`}
          alt={title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        {/* Mode badge overlay */}
        <div
          className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium font-mono bg-background/80 backdrop-blur-sm border border-border/60"
          style={{ color: `oklch(var(${meta.cssVar}))` }}
        >
          <Icon className="w-3 h-3" />
          {meta.label}
        </div>
        {/* Like button overlay */}
        <button
          type="button"
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/60 transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={(e) => {
            e.stopPropagation();
            onLike(scan.id);
          }}
          aria-label={isLiked ? "Unlike" : "Like"}
          data-ocid={`discovery.like_button.${index + 1}`}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-smooth ${isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      {/* Card body */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Tags */}
        {scan.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scan.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-1.5 py-0 text-[10px] rounded-sm font-mono bg-muted text-muted-foreground border border-border/50"
              >
                #{tag}
              </span>
            ))}
            {scan.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground font-mono">
                +{scan.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-0.5">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {Number(scan.likeCount)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {Number(scan.viewCount)}
            </span>
          </div>
          <span className="text-[10px]">
            {new Date(Number(scan.createdAt) / 1_000_000).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Detail drawer ──────────────────────────────────────────────────────────────
interface DetailDrawerProps {
  scan: DiscoveryScan | null;
  likedIds: Set<string>;
  onLike: (id: string) => void;
  onClose: () => void;
  collections: Collection[];
}

function DetailDrawer({
  scan,
  likedIds,
  onLike,
  onClose,
  collections,
}: DetailDrawerProps) {
  const { saveToMyHistory, isSavingToHistory } = useSharing();
  const { actor } = useActor(createActor);
  const [addingToCollection, setAddingToCollection] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const addToCollMutation = useMutation({
    mutationFn: async ({
      collectionId,
      scanId,
    }: {
      collectionId: string;
      scanId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addScanToCollection(collectionId, scanId);
    },
    onSuccess: () => {
      toast.success("Added to collection");
      setAddingToCollection(false);
    },
    onError: () => toast.error("Failed to add to collection"),
  });

  if (!scan) return null;

  const meta = MODE_META[scan.analysisMode] ?? MODE_META[AnalysisMode.generic];
  const Icon = meta.icon;
  const isLiked = likedIds.has(scan.id);
  const title =
    scan.title ||
    scan.analysisResult.sceneDescription.slice(0, 80) ||
    "Untitled scan";

  return (
    <Sheet open={!!scan} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl bg-card border-l border-border overflow-y-auto"
        data-ocid="discovery.detail.sheet"
      >
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-mono border border-border/50"
              style={{ color: `oklch(var(${meta.cssVar}))` }}
            >
              <Icon className="w-3.5 h-3.5" />
              {meta.label}
            </div>
            {scan.privacy === "open" && (
              <div className="shared-badge">
                <Globe className="shared-badge-icon" />
                Public
              </div>
            )}
          </div>
          <SheetTitle className="text-foreground text-left font-display leading-snug mt-2">
            {title}
          </SheetTitle>
        </SheetHeader>

        {/* Image */}
        <div className="relative rounded-md overflow-hidden border border-border mb-5 scan-overlay">
          <img
            src={`data:image/jpeg;base64,${scan.imageBase64}`}
            alt={title}
            className="w-full object-contain max-h-80"
          />
        </div>

        {/* Stats + like */}
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-smooth hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isLiked
                ? "bg-destructive/10 border-destructive/40 text-destructive"
                : "bg-muted border-border text-muted-foreground hover:border-destructive/40"
            }`}
            onClick={() => onLike(scan.id)}
            data-ocid="discovery.detail.like_button"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            {Number(scan.likeCount)} likes
          </button>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
            <Eye className="w-4 h-4" />
            {Number(scan.viewCount)} views
          </span>
        </div>

        {/* Tags */}
        {scan.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {scan.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs font-mono border-border/60"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="mb-4" />

        {/* Analysis results */}
        <div className="space-y-4 mb-6">
          {scan.analysisResult.sceneDescription && (
            <section>
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                Scene Description
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {scan.analysisResult.sceneDescription}
              </p>
            </section>
          )}

          {scan.analysisResult.objects.length > 0 && (
            <section>
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Detected Objects
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {scan.analysisResult.objects.map((obj) => (
                  <div
                    key={obj.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted border border-border/60 text-xs"
                  >
                    <span className="text-foreground font-medium">
                      {obj.name}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {Math.round(obj.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {scan.analysisResult.extractedText && (
            <section>
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
                Extracted Text
              </h4>
              <pre className="text-xs font-mono text-foreground bg-muted/50 border border-border/40 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-words max-h-32">
                {scan.analysisResult.extractedText}
              </pre>
            </section>
          )}

          {scan.analysisResult.webResults.length > 0 && (
            <section>
              <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Web Results
              </h4>
              <div className="space-y-2">
                {scan.analysisResult.webResults.slice(0, 5).map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block glass-card p-2.5 hover:bg-muted/50 transition-smooth group"
                  >
                    <span className="text-xs text-primary group-hover:underline font-medium line-clamp-1">
                      {r.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                      {r.snippet}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <Separator className="mb-4" />

        {/* Actions */}
        <div className="space-y-2.5">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => {
              if (scan.scanId) {
                saveToMyHistory(scan.scanId);
                toast.success("Saved to your history");
              }
            }}
            disabled={isSavingToHistory}
            data-ocid="discovery.detail.save_history_button"
          >
            <BookMarked className="w-4 h-4" />
            Save to My History
          </Button>

          {!addingToCollection ? (
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setAddingToCollection(true)}
              disabled={collections.length === 0}
              data-ocid="discovery.detail.add_collection_button"
            >
              <PlusCircle className="w-4 h-4" />
              {collections.length === 0
                ? "No collections yet"
                : "Add to Collection"}
            </Button>
          ) : (
            <div
              className="flex gap-2"
              data-ocid="discovery.detail.collection_picker"
            >
              <Select
                value={selectedCollectionId}
                onValueChange={setSelectedCollectionId}
              >
                <SelectTrigger
                  className="flex-1 h-9 text-sm"
                  data-ocid="discovery.detail.collection_select"
                >
                  <SelectValue placeholder="Pick a collection…" />
                </SelectTrigger>
                <SelectContent>
                  {collections.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                disabled={!selectedCollectionId || addToCollMutation.isPending}
                onClick={() =>
                  addToCollMutation.mutate({
                    collectionId: selectedCollectionId,
                    scanId: scan.scanId,
                  })
                }
                data-ocid="discovery.detail.confirm_button"
              >
                Add
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAddingToCollection(false)}
                data-ocid="discovery.detail.cancel_button"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export function DiscoveryPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [modeFilter, setModeFilter] = useState<AnalysisMode | "all">("all");
  const [offset, setOffset] = useState(0);
  const [allScans, setAllScans] = useState<DiscoveryScan[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [selectedScan, setSelectedScan] = useState<DiscoveryScan | null>(null);

  const likeScan = useLikeScan();
  const { actor } = useActor(createActor);
  const collections = useLensStore((s) => s.collections);

  // Debounce keyword
  const handleKeywordChange = useCallback((val: string) => {
    setKeyword(val);
    clearTimeout(
      (handleKeywordChange as { _t?: ReturnType<typeof setTimeout> })._t,
    );
    (handleKeywordChange as { _t?: ReturnType<typeof setTimeout> })._t =
      setTimeout(() => setDebouncedKeyword(val), 400);
  }, []);

  const filter = useMemo<DiscoveryFilterUI>(
    () => ({
      keyword: debouncedKeyword || undefined,
      mode: modeFilter === "all" ? undefined : modeFilter,
      sortBy,
      limit: PAGE_SIZE,
      offset,
    }),
    [debouncedKeyword, modeFilter, sortBy, offset],
  );

  const { data: pageData, isFetching, isError } = useDiscoveryFeed(filter);

  // Merge pages
  const displayScans = useMemo(() => {
    if (!pageData) return allScans;
    if (offset === 0) return pageData;
    return [...allScans.slice(0, offset), ...pageData];
  }, [pageData, allScans, offset]);

  // Keep allScans in sync when offset=0 (filter changed)
  useMemo(() => {
    if (pageData && offset === 0) setAllScans(pageData);
  }, [pageData, offset]);

  const hasMore = (pageData?.length ?? 0) === PAGE_SIZE;

  function applyFilter() {
    setOffset(0);
    setAllScans([]);
  }

  const handleSortChange = (v: SortBy) => {
    setSortBy(v);
    applyFilter();
  };

  const handleModeChange = (v: AnalysisMode | "all") => {
    setModeFilter(v);
    applyFilter();
  };

  const handleKeywordSubmit = () => {
    setDebouncedKeyword(keyword);
    applyFilter();
  };

  const handleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    likeScan.mutate(id, {
      onError: () => {
        setLikedIds((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
        toast.error("Failed to like scan");
      },
    });
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + PAGE_SIZE);
  };

  // Fetch collections for the detail drawer
  const { data: fetchedCollections } = useQuery<
    import("../backend").Collection[]
  >({
    queryKey: ["userCollections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserCollections();
    },
    enabled: !!actor,
  });

  const resolvedCollections =
    (fetchedCollections as Collection[] | undefined) ?? collections;

  const isInitialLoading =
    isFetching && offset === 0 && displayScans.length === 0;

  return (
    <div
      className="container max-w-7xl mx-auto px-4 py-6 space-y-6"
      data-ocid="discovery.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <Telescope className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Discovery
          </h1>
          <p className="text-xs text-muted-foreground">
            Browse scans shared by the Visual Lens community
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div
        className="glass-card p-3 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center"
        data-ocid="discovery.filters.panel"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by keyword…"
            className="pl-8 h-8 text-sm bg-muted/50 border-border/60"
            value={keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleKeywordSubmit()}
            data-ocid="discovery.search_input"
          />
        </div>

        {/* Mode filter */}
        <Select
          value={modeFilter}
          onValueChange={(v) => handleModeChange(v as AnalysisMode | "all")}
        >
          <SelectTrigger
            className="h-8 w-full sm:w-44 text-sm bg-muted/50 border-border/60"
            data-ocid="discovery.mode_filter.select"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground mr-1 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MODE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={sortBy}
          onValueChange={(v) => handleSortChange(v as SortBy)}
        >
          <SelectTrigger
            className="h-8 w-full sm:w-44 text-sm bg-muted/50 border-border/60"
            data-ocid="discovery.sort.select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      {!isInitialLoading && (
        <p
          className="text-xs text-muted-foreground font-mono"
          data-ocid="discovery.results_count"
        >
          {displayScans.length > 0
            ? `${displayScans.length} scan${displayScans.length !== 1 ? "s" : ""} found`
            : ""}
        </p>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="glass-card p-6 text-center text-destructive text-sm"
          data-ocid="discovery.error_state"
        >
          Failed to load discovery feed. Please try again.
        </div>
      )}

      {/* Loading skeleton grid */}
      {isInitialLoading && (
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
          data-ocid="discovery.grid.loading_state"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
            <ScanCardSkeleton key={`sk-init-${i}`} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isInitialLoading && !isError && displayScans.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4"
          data-ocid="discovery.empty_state"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Globe className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <div className="text-center">
            <h3 className="font-display font-semibold text-foreground mb-1">
              {debouncedKeyword || modeFilter !== "all"
                ? "No matching scans"
                : "No public scans yet"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {debouncedKeyword || modeFilter !== "all"
                ? "Try adjusting your filters or clearing the search."
                : "Be the first to share a scan with the community!"}
            </p>
          </div>
          {(debouncedKeyword || modeFilter !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setKeyword("");
                setDebouncedKeyword("");
                setModeFilter("all");
                applyFilter();
              }}
              data-ocid="discovery.clear_filters_button"
            >
              <X className="w-4 h-4 mr-1.5" />
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Cards grid */}
      {!isInitialLoading && displayScans.length > 0 && (
        <div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
          data-ocid="discovery.grid.list"
        >
          {displayScans.map((scan, i) => (
            <ScanCard
              key={scan.id}
              scan={scan}
              index={i}
              likedIds={likedIds}
              onLike={handleLike}
              onOpen={setSelectedScan}
            />
          ))}
          {/* Inline loading skeletons when fetching more */}
          {isFetching &&
            offset > 0 &&
            Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <ScanCardSkeleton key={`sk-more-${i}`} />
            ))}
        </div>
      )}

      {/* Load More */}
      {!isInitialLoading && hasMore && !isFetching && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="w-full sm:w-auto"
            data-ocid="discovery.load_more_button"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Detail drawer */}
      <DetailDrawer
        scan={selectedScan}
        likedIds={likedIds}
        onLike={handleLike}
        onClose={() => setSelectedScan(null)}
        collections={resolvedCollections}
      />
    </div>
  );
}
