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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Loader2, Lock, Plus, Telescope, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ScanRecord } from "../backend";
import { Variant_open_unlisted } from "../backend";
import { usePublishToDiscovery } from "../hooks/useTags";

interface PublishToDiscoveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scan: ScanRecord;
  onPublished: () => void;
  /** Pre-populate tags from an existing collection save */
  initialTags?: string[];
}

export function PublishToDiscoveryDialog({
  open,
  onOpenChange,
  scan,
  onPublished,
  initialTags = [],
}: PublishToDiscoveryDialogProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const { mutateAsync: publishAsync, isPending } = usePublishToDiscovery();

  // Reset on open
  useEffect(() => {
    if (open) {
      // Auto-generate a title from the first object or scene description
      const autoTitle =
        scan.analysisResult.objects[0]?.name ||
        scan.analysisResult.sceneDescription.slice(0, 60) ||
        "";
      setTitle(autoTitle);
      setTags(initialTags.length > 0 ? initialTags : []);
      setTagInput("");
      setIsPublic(true);
    }
  }, [open, scan, initialTags]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!t) return;
    if (tags.includes(t)) {
      toast.error("Tag already added");
      return;
    }
    setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const handlePublish = async () => {
    try {
      await publishAsync({
        scanId: scan.id,
        title: title.trim() || null,
        tags,
        imageBase64: scan.imageBase64,
        analysisMode: scan.mode,
        analysisResult: scan.analysisResult,
        privacy: isPublic
          ? Variant_open_unlisted.open
          : Variant_open_unlisted.unlisted,
      });
      toast.success(
        isPublic
          ? "Scan published to the Discovery feed!"
          : "Scan published as unlisted (accessible by link only).",
        { duration: 5000 },
      );
      onPublished();
      onOpenChange(false);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to publish. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        data-ocid="publish-discovery.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Telescope className="w-4 h-4 text-primary" />
            Publish to Discovery
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-1">
          {/* Scan preview */}
          {scan.imageBase64 && (
            <div className="w-full h-32 rounded-lg overflow-hidden border border-border bg-muted/20">
              <img
                src={`data:${scan.mimeType};base64,${scan.imageBase64}`}
                alt="Scan preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="discovery-title"
              className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
            >
              Title <span className="text-muted-foreground/50">(optional)</span>
            </Label>
            <Input
              id="discovery-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this scan a descriptive title…"
              className="bg-card border-border"
              maxLength={100}
              data-ocid="publish-discovery.title_input"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Tags
            </Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="Add a tag…"
                className="flex-1 bg-card border-border text-sm"
                data-ocid="publish-discovery.tag_input"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={addTag}
                disabled={!tagInput.trim()}
                className="gap-1.5 flex-shrink-0"
                data-ocid="publish-discovery.add_tag_button"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </Button>
            </div>

            {tags.length > 0 && (
              <div
                className="flex flex-wrap gap-1.5 mt-1.5"
                data-ocid="publish-discovery.tags_container"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted border border-border text-xs font-mono text-muted-foreground"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-foreground transition-colors ml-0.5"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Privacy toggle */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {isPublic ? (
                  <Globe className="w-4 h-4 text-primary" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isPublic ? "Public" : "Unlisted"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isPublic
                      ? "Visible in the Discovery feed to everyone"
                      : "Only accessible via direct link"}
                  </p>
                </div>
              </div>
              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
                data-ocid="publish-discovery.privacy_toggle"
                aria-label="Toggle public visibility"
              />
            </div>

            {isPublic && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-2">
                <Globe className="w-3 h-3 text-primary flex-shrink-0" />
                <span>
                  Your scan will appear in the Discovery feed and can be liked
                  and saved by others.
                </span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <Badge variant="outline" className="font-mono">
              {isPublic ? "Public" : "Unlisted"}
            </Badge>
            {tags.length > 0 && (
              <Badge variant="outline" className="font-mono">
                {tags.length} tag{tags.length !== 1 ? "s" : ""}
              </Badge>
            )}
            {title.trim() && (
              <span className="truncate max-w-[200px] italic">
                "{title.trim()}"
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end pt-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            data-ocid="publish-discovery.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isPending}
            className="gap-2"
            data-ocid="publish-discovery.submit_button"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Telescope className="w-3.5 h-3.5" />
            )}
            {isPending ? "Publishing…" : "Publish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
