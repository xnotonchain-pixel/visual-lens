import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Plus, Sparkles, Tag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { AnalysisResult, Variant_ai_user } from "../backend";
import { useCollections } from "../hooks/useCollections";
import {
  type AggressivenessLevel,
  type TagSuggestion,
  useSuggestTags,
} from "../hooks/useTags";

interface TagSuggestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisResult: AnalysisResult;
  scanId: string;
  onConfirm: (collectionId: string, tags: string[]) => void;
}

function TagChip({
  tag,
  confidence,
  source,
  onRemove,
}: {
  tag: string;
  confidence?: number;
  source?: "ai" | "user";
  onRemove: () => void;
}) {
  const opacity = confidence != null ? Math.max(0.5, confidence) : 1;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono transition-smooth group"
      style={{
        opacity,
        backgroundColor: "oklch(var(--chip-active-bg))",
        borderColor:
          source === "ai"
            ? "oklch(var(--primary) / 0.5)"
            : "oklch(var(--secondary) / 0.5)",
        color:
          source === "ai" ? "oklch(var(--primary))" : "oklch(var(--secondary))",
      }}
      data-ocid="tag-suggestion.tag_chip"
    >
      {source === "ai" && (
        <Sparkles className="w-2.5 h-2.5 opacity-70 flex-shrink-0" />
      )}
      <span className="truncate max-w-[120px]">{tag}</span>
      {confidence != null && (
        <span className="opacity-50 text-[10px]">
          {Math.round(confidence * 100)}%
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="ml-0.5 rounded-full hover:bg-muted/60 p-0.5 transition-smooth flex-shrink-0"
        aria-label={`Remove tag ${tag}`}
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  );
}

const AGGRESSIVENESS_OPTIONS: {
  value: AggressivenessLevel;
  label: string;
  desc: string;
}[] = [
  {
    value: "subtle",
    label: "Subtle",
    desc: "Only obvious, high-confidence tags",
  },
  { value: "moderate", label: "Moderate", desc: "Balanced — recommended" },
  {
    value: "aggressive",
    label: "Aggressive",
    desc: "Many tags, broader context",
  },
];

export function TagSuggestionDialog({
  open,
  onOpenChange,
  analysisResult,
  scanId,
  onConfirm,
}: TagSuggestionDialogProps) {
  const {
    collections,
    isLoading: collectionsLoading,
    createCollection,
    isCreating,
  } = useCollections();

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [aggressiveness, setAggressiveness] =
    useState<AggressivenessLevel>("moderate");
  const [confirmedTags, setConfirmedTags] = useState<TagSuggestion[]>([]);
  const [customTag, setCustomTag] = useState("");
  const customTagInputRef = useRef<HTMLInputElement>(null);

  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const suggestionRequest =
    open && scanId
      ? { scanId, analysisResult, existingTags: [], aggressiveness }
      : null;

  const { data: suggestions, isLoading: suggestionsLoading } =
    useSuggestTags(suggestionRequest);

  // Populate confirmed tags from suggestions once fetched
  useEffect(() => {
    if (
      !suggestionsLoading &&
      suggestions &&
      suggestions.length > 0 &&
      !hasFetchedOnce
    ) {
      setConfirmedTags(suggestions);
      setHasFetchedOnce(true);
    }
  }, [suggestions, suggestionsLoading, hasFetchedOnce]);

  // Reset when aggressiveness changes (track via ref to avoid extra dep lint error)
  const prevAggRef = useRef(aggressiveness);
  if (prevAggRef.current !== aggressiveness) {
    prevAggRef.current = aggressiveness;
    setHasFetchedOnce(false);
    setConfirmedTags([]);
  }

  // Reset on open
  useEffect(() => {
    if (open) {
      setSelectedCollectionId(collections[0]?.id ?? "");
      setNewCollectionName("");
      setShowCreateCollection(false);
      setCustomTag("");
      setConfirmedTags([]);
      setHasFetchedOnce(false);
      setAggressiveness("moderate");
    }
  }, [open, collections]);

  const handleRemoveTag = (tag: string) => {
    setConfirmedTags((prev) => prev.filter((t) => t.tag !== tag));
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmed) return;
    if (confirmedTags.some((t) => t.tag === trimmed)) {
      toast.error("Tag already added");
      return;
    }
    setConfirmedTags((prev) => [
      ...prev,
      {
        tag: trimmed,
        confidence: 1,
        source: { __kind__: "user" } as unknown as Variant_ai_user,
      },
    ]);
    setCustomTag("");
    customTagInputRef.current?.focus();
  };

  const handleCreateCollection = async () => {
    const trimmed = newCollectionName.trim();
    if (!trimmed) return;
    createCollection(trimmed);
    toast.success(`Collection "${trimmed}" created`);
    setNewCollectionName("");
    setShowCreateCollection(false);
  };

  const handleConfirm = () => {
    const collectionId = selectedCollectionId;
    if (!collectionId) {
      toast.error("Please select or create a collection.");
      return;
    }
    const tags = confirmedTags.map((t) => t.tag);
    onConfirm(collectionId, tags);
    onOpenChange(false);
  };

  const tagSourceStr = (s: TagSuggestion["source"]): "ai" | "user" => {
    if (typeof s === "string") return s as "ai" | "user";
    if (typeof s === "object" && s !== null && "__kind__" in s) {
      return (s as { __kind__: string }).__kind__ as "ai" | "user";
    }
    return "ai";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-ocid="tag-suggestion.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            Save to Collection
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-1">
          {/* Collection picker */}
          <div className="space-y-2">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Collection
            </Label>
            {collectionsLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : showCreateCollection ? (
              <div className="flex gap-2">
                <Input
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCreateCollection()
                  }
                  placeholder="New collection name…"
                  className="flex-1 bg-card border-border"
                  data-ocid="tag-suggestion.new_collection_input"
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={handleCreateCollection}
                  disabled={!newCollectionName.trim() || isCreating}
                  data-ocid="tag-suggestion.create_collection_button"
                >
                  {isCreating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowCreateCollection(false)}
                  data-ocid="tag-suggestion.cancel_collection_button"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Select
                  value={selectedCollectionId}
                  onValueChange={setSelectedCollectionId}
                >
                  <SelectTrigger
                    className="flex-1 bg-card border-border"
                    data-ocid="tag-suggestion.collection_select"
                  >
                    <SelectValue placeholder="Select collection…" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.length === 0 ? (
                      <SelectItem value="__none__" disabled>
                        No collections yet
                      </SelectItem>
                    ) : (
                      collections.map((col) => (
                        <SelectItem key={col.id} value={col.id}>
                          {col.name}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({col.scanIds.length})
                          </span>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowCreateCollection(true)}
                  className="gap-1.5 flex-shrink-0"
                  data-ocid="tag-suggestion.new_collection_trigger"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New
                </Button>
              </div>
            )}
          </div>

          {/* Aggressiveness selector */}
          <div className="space-y-2">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              AI Tag Detail
            </Label>
            <div
              className="flex gap-1.5 flex-wrap"
              data-ocid="tag-suggestion.aggressiveness_selector"
            >
              {AGGRESSIVENESS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAggressiveness(opt.value)}
                  title={opt.desc}
                  data-ocid={`tag-suggestion.aggressiveness.${opt.value}`}
                  className={`filter-chip text-xs transition-smooth ${aggressiveness === opt.value ? "active" : ""}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggested Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                AI Suggested Tags
              </Label>
              {suggestionsLoading && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating…
                </span>
              )}
            </div>

            <div
              className="min-h-[60px] p-3 rounded-lg border border-border bg-muted/10 flex flex-wrap gap-2"
              data-ocid="tag-suggestion.tags_container"
            >
              {suggestionsLoading && confirmedTags.length === 0 ? (
                <>
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </>
              ) : confirmedTags.length === 0 ? (
                <p className="text-xs text-muted-foreground italic self-center">
                  No tags yet — add some below or change the detail level.
                </p>
              ) : (
                confirmedTags.map((t) => (
                  <TagChip
                    key={t.tag}
                    tag={t.tag}
                    confidence={t.confidence}
                    source={tagSourceStr(t.source)}
                    onRemove={() => handleRemoveTag(t.tag)}
                  />
                ))
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Click × to remove a tag. Faded tags have lower confidence.
            </p>
          </div>

          {/* Custom tag input */}
          <div className="space-y-2">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Add Custom Tag
            </Label>
            <div className="flex gap-2">
              <Input
                ref={customTagInputRef}
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomTag()}
                placeholder="Type a tag and press Enter…"
                className="flex-1 bg-card border-border text-sm"
                data-ocid="tag-suggestion.custom_tag_input"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddCustomTag}
                disabled={!customTag.trim()}
                className="gap-1.5 flex-shrink-0"
                data-ocid="tag-suggestion.add_tag_button"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </Button>
            </div>
          </div>

          {/* Summary badges */}
          {confirmedTags.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="font-mono">
                {confirmedTags.length} tag
                {confirmedTags.length !== 1 ? "s" : ""}
              </Badge>
              <span>will be saved with this scan</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end pt-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            data-ocid="tag-suggestion.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedCollectionId || showCreateCollection}
            className="gap-2"
            data-ocid="tag-suggestion.submit_button"
          >
            <Tag className="w-3.5 h-3.5" />
            Save to Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
