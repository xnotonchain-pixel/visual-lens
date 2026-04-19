import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  BookmarkCheck,
  BookmarkPlus,
  Camera,
  Car,
  Check,
  ExternalLink,
  FileText,
  FolderOpen,
  Globe,
  HeartPulse,
  Landmark,
  Languages,
  Leaf,
  LogIn,
  Plus,
  Receipt,
  ScanLine,
  ScanSearch,
  Tag,
  Utensils,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { DetectedObject, WebResult } from "../backend";
import { AnalysisMode } from "../backend";
import { useCollections } from "../hooks/useCollections";
import { useSharedScan, useSharing } from "../hooks/useSharing";

/* ── Mode meta ──────────────────────────────────────────────── */
const MODE_META: Record<
  AnalysisMode,
  { label: string; icon: React.ElementType; color: string }
> = {
  [AnalysisMode.generic]: {
    label: "Generic",
    icon: ScanSearch,
    color: "text-primary",
  },
  [AnalysisMode.plant]: {
    label: "Plant ID",
    icon: Leaf,
    color: "text-[oklch(0.68_0.18_140)]",
  },
  [AnalysisMode.food]: {
    label: "Food Scanner",
    icon: Utensils,
    color: "text-[oklch(0.72_0.16_30)]",
  },
  [AnalysisMode.bookProduct]: {
    label: "Book / Product",
    icon: BookOpen,
    color: "text-[oklch(0.65_0.16_270)]",
  },
  [AnalysisMode.translation]: {
    label: "Translation",
    icon: Languages,
    color: "text-[oklch(0.7_0.17_50)]",
  },
  [AnalysisMode.artLandmark]: {
    label: "Art / Landmark",
    icon: Landmark,
    color: "text-[oklch(0.75_0.15_320)]",
  },
  [AnalysisMode.receipt]: {
    label: "Receipt Parser",
    icon: Receipt,
    color: "text-[oklch(0.66_0.14_240)]",
  },
  [AnalysisMode.medicalReference]: {
    label: "Medical Ref.",
    icon: HeartPulse,
    color: "text-[oklch(0.62_0.2_10)]",
  },
  [AnalysisMode.carFashion]: {
    label: "Car / Fashion",
    icon: Car,
    color: "text-[oklch(0.68_0.16_170)]",
  },
};

/* ── Confidence chip ────────────────────────────────────────── */
function ObjectChip({ obj, index }: { obj: DetectedObject; index: number }) {
  const pct = Math.round(obj.confidence * 100);
  const isHigh = pct >= 75;
  return (
    <div
      className="glass-card px-3 py-2 flex flex-col gap-1.5 animate-slide-up"
      style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
      data-ocid={`shared.object.${index + 1}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground capitalize truncate">
          {obj.name}
        </span>
        <span
          className={`text-xs font-mono font-semibold ${
            isHigh ? "text-secondary" : "text-muted-foreground"
          }`}
        >
          {pct}%
        </span>
      </div>
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full confidence-fill ${
            isHigh ? "bg-secondary" : "bg-muted-foreground"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Web result card ────────────────────────────────────────── */
function WebResultCard({
  result,
  index,
}: {
  result: WebResult;
  index: number;
}) {
  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-4 flex flex-col gap-1.5 hover:border-primary/50 transition-smooth group animate-slide-up"
      style={{ animationDelay: `${index * 0.06 + 0.2}s` }}
      data-ocid={`shared.web_result.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-2 flex-1">
          {result.title}
        </p>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-smooth" />
      </div>
      <p className="text-xs text-primary font-mono truncate">{result.url}</p>
      {result.snippet && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {result.snippet}
        </p>
      )}
    </a>
  );
}

/* ── Section label ──────────────────────────────────────────── */
function SectionLabel({
  icon: Icon,
  label,
  accent = "primary",
}: {
  icon: React.ElementType;
  label: string;
  accent?: "primary" | "secondary";
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${
        accent === "secondary" ? "text-secondary" : "text-primary"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

/* ── Collection Picker Dialog ───────────────────────────────── */
interface CollectionPickerProps {
  open: boolean;
  onClose: () => void;
  onSave: (collectionId: string, collectionName: string) => void;
}

function CollectionPickerDialog({
  open,
  onClose,
  onSave,
}: CollectionPickerProps) {
  const { collections, isLoading, createCollection, isCreating } =
    useCollections();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (creating && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [creating]);

  const handleCreateAndSave = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    createCollection(trimmed, {
      onSuccess: (newId) => {
        onSave(newId as string, trimmed);
        setNewName("");
        setCreating(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="glass-card border-border max-w-sm"
        data-ocid="shared.collection_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-primary" />
            Save to Collection
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-1">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : collections.length === 0 && !creating ? (
            <p className="text-sm text-muted-foreground text-center py-2">
              No collections yet. Create one below.
            </p>
          ) : (
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {collections.map((col, i) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onSave(col.id, col.name)}
                  className="w-full text-left glass-card px-3 py-2.5 hover:border-primary/50 transition-smooth flex items-center justify-between gap-2 group"
                  data-ocid={`shared.collection_option.${i + 1}`}
                >
                  <span className="text-sm text-foreground group-hover:text-primary transition-smooth truncate">
                    {col.name}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                    {col.scanIds.length} scan
                    {col.scanIds.length !== 1 ? "s" : ""}
                  </span>
                </button>
              ))}
            </div>
          )}

          {creating ? (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-widest">
                Collection Name
              </Label>
              <Input
                ref={inputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Plants, Food, Travel…"
                className="bg-input border-border"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateAndSave();
                  if (e.key === "Escape") {
                    setCreating(false);
                    setNewName("");
                  }
                }}
                data-ocid="shared.collection_name_input"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleCreateAndSave}
                  disabled={!newName.trim() || isCreating}
                  className="flex-1 gap-1.5"
                  data-ocid="shared.create_collection_confirm_button"
                >
                  {isCreating ? (
                    "Creating…"
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Create & Save
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setCreating(false);
                    setNewName("");
                  }}
                  data-ocid="shared.create_collection_cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 border-dashed"
              onClick={() => setCreating(true)}
              data-ocid="shared.new_collection_button"
            >
              <Plus className="w-3.5 h-3.5" />
              New Collection
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={onClose}
            data-ocid="shared.collection_dialog_cancel_button"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Login Prompt Dialog ────────────────────────────────────── */
function LoginPromptDialog({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="glass-card border-border max-w-xs text-center"
        data-ocid="shared.login_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Sign In to Save
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mt-1">
          Log in with Internet Identity to save this scan to your collection.
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={onLogin}
            className="gap-2"
            data-ocid="shared.login_confirm_button"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="shared.login_cancel_button"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Main page ──────────────────────────────────────────────── */
export function SharedScanPage() {
  const { token } = useParams({ from: "/shared/$token" });
  const navigate = useNavigate();
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: scan, isLoading } = useSharedScan(token);
  const { saveToMyHistory, isSavingToHistory } = useSharing();
  const { addScan } = useCollections();

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showCollectionDialog, setShowCollectionDialog] = useState(false);
  const [savedCollection, setSavedCollection] = useState<string | null>(null);

  const isLoggedIn = isAuthenticated;

  const handleSaveCTA = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    } else {
      setShowCollectionDialog(true);
    }
  };

  const handleLogin = () => {
    login();
    setShowLoginDialog(false);
  };

  // After login, if they were trying to save, open collection picker
  useEffect(() => {
    if (isLoggedIn && showLoginDialog) {
      setShowLoginDialog(false);
      setShowCollectionDialog(true);
    }
  }, [isLoggedIn, showLoginDialog]);

  const handleSaveToCollection = (
    collectionId: string,
    collectionName: string,
  ) => {
    setShowCollectionDialog(false);
    saveToMyHistory(token, {
      onSuccess: (scanId) => {
        addScan(
          { collectionId, scanId: scanId as string },
          {
            onSuccess: () => {
              setSavedCollection(collectionName);
              toast.success(`Saved to "${collectionName}"`, {
                description: "You can find this scan in your collection.",
                duration: 4000,
              });
            },
            onError: () => {
              // History saved but collection add failed — still show partial success
              setSavedCollection(collectionName);
              toast.success("Saved to your history", {
                description: "Couldn't add to collection, but it's in History.",
              });
            },
          },
        );
      },
      onError: () => {
        toast.error("Save failed", {
          description: "Please try again.",
        });
      },
    });
  };

  /* ── Loading state ── */
  if (isLoading) {
    return (
      <div
        className="container max-w-4xl mx-auto px-4 py-12 space-y-5"
        data-ocid="shared.loading_state"
      >
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-36" />
        </div>
        <Skeleton className="h-72 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-14 rounded-md" />
          <Skeleton className="h-14 rounded-md" />
          <Skeleton className="h-14 rounded-md" />
          <Skeleton className="h-14 rounded-md" />
        </div>
      </div>
    );
  }

  /* ── Not found / expired ── */
  if (!scan) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center gap-6 animate-fade-in"
        data-ocid="shared.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted/50 border border-border flex items-center justify-center">
          <ScanSearch className="w-7 h-7 text-muted-foreground" />
        </div>
        <div className="space-y-1.5">
          <p className="font-display font-semibold text-foreground text-lg">
            This scan link is no longer available
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            The shared scan may have been removed or the link has expired.
          </p>
        </div>
        <Button
          size="lg"
          className="gap-2"
          onClick={() => navigate({ to: "/" })}
          data-ocid="shared.go_home_button"
        >
          <Camera className="w-4 h-4" />
          Create your own scan
        </Button>
      </div>
    );
  }

  const { objects, extractedText, sceneDescription, webResults } =
    scan.analysisResult;
  const modeMeta = MODE_META[scan.mode] ?? MODE_META[AnalysisMode.generic];
  const ModeIcon = modeMeta.icon;

  return (
    <>
      <div
        className="container max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in"
        data-ocid="shared.page"
      >
        {/* ── Page header ── */}
        <div className="flex items-center justify-between gap-3 flex-wrap animate-slide-up stagger-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="shared-badge">
              <Globe className="shared-badge-icon" />
              Shared Scan
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono font-medium bg-muted border border-border">
              <ModeIcon className={`w-3.5 h-3.5 ${modeMeta.color}`} />
              <span className="text-muted-foreground">{modeMeta.label}</span>
            </span>
          </div>

          {/* Save CTA */}
          {savedCollection ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="gap-1.5 border-primary/40 text-primary"
              data-ocid="shared.saved_indicator"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              Saved to {savedCollection}
            </Button>
          ) : (
            <Button
              size="sm"
              className="gap-1.5"
              onClick={handleSaveCTA}
              disabled={isSavingToHistory}
              data-ocid="shared.save_button"
            >
              {isSavingToHistory ? (
                "Saving…"
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  Save to My Collection
                </>
              )}
            </Button>
          )}
        </div>

        {/* ── Image preview ── */}
        {scan.imageBase64 && (
          <div
            className="glass-card overflow-hidden scan-overlay animate-slide-up stagger-2"
            data-ocid="shared.image"
          >
            <img
              src={`data:${scan.mimeType};base64,${scan.imageBase64}`}
              alt="Shared scan preview"
              className="w-full max-h-72 object-cover"
            />
          </div>
        )}

        {/* ── Scene Description ── */}
        <div
          className="glass-card p-5 space-y-3 animate-slide-up stagger-2"
          data-ocid="shared.scene_section"
        >
          <SectionLabel icon={Tag} label="Scene Description" />
          <p className="text-foreground text-sm leading-relaxed">
            {sceneDescription || "No scene description available."}
          </p>
        </div>

        {/* ── Detected Objects ── */}
        <div
          className="glass-card p-5 space-y-4 animate-slide-up stagger-3"
          data-ocid="shared.objects_section"
        >
          <SectionLabel
            icon={ScanLine}
            label="Detected Objects"
            accent="secondary"
          />
          {objects.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {objects.map((obj, i) => (
                <ObjectChip key={`${obj.name}-${i}`} obj={obj} index={i} />
              ))}
            </div>
          ) : (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="shared.objects.empty_state"
            >
              No objects detected in this image.
            </p>
          )}
        </div>

        {/* ── Extracted Text (OCR) ── */}
        <div
          className="glass-card p-5 space-y-3 animate-slide-up stagger-3"
          data-ocid="shared.text_section"
        >
          <SectionLabel
            icon={FileText}
            label="Extracted Text (OCR)"
            accent="secondary"
          />
          {extractedText ? (
            <pre className="text-sm text-foreground font-mono whitespace-pre-wrap break-words bg-muted/20 rounded-lg p-3 border border-border/40 leading-relaxed">
              {extractedText}
            </pre>
          ) : (
            <p
              className="text-sm text-muted-foreground italic"
              data-ocid="shared.text.empty_state"
            >
              No text detected in this image.
            </p>
          )}
        </div>

        {/* ── Web Results ── */}
        <div
          className="space-y-3 animate-slide-up stagger-4"
          data-ocid="shared.web_section"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest px-1">
            <Globe className="w-3.5 h-3.5" />
            Web Search Results
          </div>
          {webResults.length > 0 ? (
            <div className="space-y-2">
              {webResults.map((result, i) => (
                <WebResultCard key={result.url} result={result} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="glass-card p-5 text-center"
              data-ocid="shared.web.empty_state"
            >
              <p className="text-sm text-muted-foreground italic">
                No web results found for this image.
              </p>
            </div>
          )}
        </div>

        {/* ── CTA footer ── */}
        <div className="flex flex-col items-center gap-3 pt-4 pb-10 animate-slide-up stagger-5">
          <p className="text-xs text-muted-foreground font-mono">
            Visual Lens · Powered by Venice AI
          </p>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 font-semibold px-8"
            onClick={() => navigate({ to: "/" })}
            data-ocid="shared.create_scan_button"
          >
            <Camera className="w-4 h-4" />
            Create your own scan
          </Button>
        </div>
      </div>

      {/* ── Dialogs ── */}
      <LoginPromptDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
      <CollectionPickerDialog
        open={showCollectionDialog}
        onClose={() => setShowCollectionDialog(false)}
        onSave={handleSaveToCollection}
      />
    </>
  );
}
