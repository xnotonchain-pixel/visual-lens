import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Principal } from "@icp-sdk/core/principal";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  Car,
  Check,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  Heart,
  Landmark,
  Languages,
  Leaf,
  Link2,
  Loader2,
  Receipt,
  RefreshCw,
  ScanLine,
  Stethoscope,
  Tag,
  Telescope,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnalysisMode } from "../backend";
import { PublishToDiscoveryDialog } from "../components/PublishToDiscoveryDialog";
import { TagSuggestionDialog } from "../components/TagSuggestionDialog";
import { useAnalysis } from "../hooks/useAnalysis";
import { useCollections } from "../hooks/useCollections";
import { useSharing } from "../hooks/useSharing";
import { useLensStore } from "../store";
import type { DetectedObject, ScanRecord, WebResult } from "../types";
import { exportScanToPDF } from "../utils/pdfExport";

/* ── Mode metadata ────────────────────────────────────────── */
interface ModeConfig {
  mode: AnalysisMode;
  label: string;
  emoji: string;
  icon: React.ElementType;
  cssClass: string;
  color: string;
  headline: string;
}

const MODE_CONFIG: ModeConfig[] = [
  {
    mode: AnalysisMode.generic,
    label: "Generic",
    emoji: "🔍",
    icon: ScanLine,
    cssClass: "mode-badge-generic",
    color: "oklch(0.72 0.16 195)",
    headline: "Visual Analysis Results",
  },
  {
    mode: AnalysisMode.plant,
    label: "Plant ID",
    emoji: "🌿",
    icon: Leaf,
    cssClass: "mode-badge-plant",
    color: "oklch(0.68 0.18 140)",
    headline: "Plant Identification Results",
  },
  {
    mode: AnalysisMode.food,
    label: "Food Scanner",
    emoji: "🍽",
    icon: Flame,
    cssClass: "mode-badge-food",
    color: "oklch(0.72 0.16 30)",
    headline: "Food Analysis Results",
  },
  {
    mode: AnalysisMode.bookProduct,
    label: "Book / Product",
    emoji: "📚",
    icon: BookOpen,
    cssClass: "mode-badge-book",
    color: "oklch(0.65 0.16 270)",
    headline: "Book & Product Lookup",
  },
  {
    mode: AnalysisMode.translation,
    label: "Translation",
    emoji: "🌐",
    icon: Languages,
    cssClass: "mode-badge-translation",
    color: "oklch(0.7 0.17 50)",
    headline: "Translation Results",
  },
  {
    mode: AnalysisMode.artLandmark,
    label: "Art / Landmark",
    emoji: "🏛",
    icon: Landmark,
    cssClass: "mode-badge-art",
    color: "oklch(0.75 0.15 320)",
    headline: "Art & Landmark Recognition",
  },
  {
    mode: AnalysisMode.receipt,
    label: "Receipt Parser",
    emoji: "🧾",
    icon: Receipt,
    cssClass: "mode-badge-receipt",
    color: "oklch(0.66 0.14 240)",
    headline: "Receipt & Document Results",
  },
  {
    mode: AnalysisMode.medicalReference,
    label: "Medical Ref.",
    emoji: "🩺",
    icon: Stethoscope,
    cssClass: "mode-badge-medical",
    color: "oklch(0.62 0.2 10)",
    headline: "Medical Reference Results",
  },
  {
    mode: AnalysisMode.carFashion,
    label: "Car / Fashion",
    emoji: "🚗",
    icon: Car,
    cssClass: "mode-badge-car",
    color: "oklch(0.68 0.16 170)",
    headline: "Car & Fashion Identification",
  },
];

function getModeConfig(mode: AnalysisMode): ModeConfig {
  return MODE_CONFIG.find((m) => m.mode === mode) ?? MODE_CONFIG[0];
}

/* ── Confidence chip ──────────────────────────────────────── */
function ObjectChip({ obj, index }: { obj: DetectedObject; index: number }) {
  const pct = Math.round(obj.confidence * 100);
  const isHigh = pct >= 75;
  return (
    <div
      className="glass-card px-3 py-2 flex flex-col gap-1.5 animate-slide-up"
      style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
      data-ocid={`results.object.${index + 1}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground capitalize truncate">
          {obj.name}
        </span>
        <span
          className={`text-xs font-mono font-semibold ${isHigh ? "text-secondary" : "text-muted-foreground"}`}
        >
          {pct}%
        </span>
      </div>
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full confidence-fill ${isHigh ? "bg-secondary" : "bg-muted-foreground"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ── Web result card ──────────────────────────────────────── */
function WebResultCard({
  result,
  index,
}: { result: WebResult; index: number }) {
  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-4 flex flex-col gap-1.5 hover:border-primary/50 hover:glow-border transition-smooth group animate-slide-up"
      style={{ animationDelay: `${index * 0.06 + 0.2}s` }}
      data-ocid={`results.web_result.${index + 1}`}
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

/* ── Analyzing overlay ────────────────────────────────────── */
function AnalyzingOverlay({
  imageData,
  mimeType,
}: { imageData: string; mimeType: string }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-background/95 flex flex-col items-center justify-center gap-8 animate-fade-in"
      data-ocid="results.loading_state"
    >
      <div className="relative w-72 h-72 rounded-xl overflow-hidden glass-card glow-border scan-overlay">
        <img
          src={`data:${mimeType};base64,${imageData}`}
          alt="Scanning…"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scan-beam" />
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl-sm" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-primary rounded-tr-sm" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-primary rounded-bl-sm" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br-sm" />
      </div>
      <div className="text-center space-y-2">
        <div className="flex items-center gap-2.5 justify-center">
          <ScanLine className="w-5 h-5 text-primary scan-pulse" />
          <p className="font-display font-semibold text-foreground text-lg tracking-wide">
            Analyzing
          </p>
          <ScanLine
            className="w-5 h-5 text-primary scan-pulse"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          Identifying objects · extracting text · searching web…
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary scan-pulse"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Section header ───────────────────────────────────────── */
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
      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${accent === "secondary" ? "text-secondary" : "text-primary"}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}

/* ── Mode Header Banner ───────────────────────────────────── */
function ModeHeader({ config }: { config: ModeConfig }) {
  return (
    <div
      className="glass-card p-4 flex items-center gap-3 animate-slide-up stagger-1 border-l-2"
      style={{ borderLeftColor: config.color }}
      data-ocid="results.mode_header"
    >
      <span className="text-2xl leading-none select-none">{config.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground text-base leading-tight">
          {config.headline}
        </p>
        <p className="text-xs text-muted-foreground font-mono mt-0.5 uppercase tracking-wider">
          {config.label} Mode
        </p>
      </div>
    </div>
  );
}

/* ── Re-analyze mode selector ─────────────────────────────── */
function ReanalyzeButton({
  currentMode,
  onReanalyze,
  isAnalyzing,
}: {
  currentMode: AnalysisMode;
  onReanalyze: (mode: AnalysisMode) => void;
  isAnalyzing: boolean;
}) {
  const { setSelectedMode } = useLensStore();
  const handleSelect = (mode: AnalysisMode) => {
    setSelectedMode(mode);
    onReanalyze(mode);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          disabled={isAnalyzing}
          data-ocid="results.reanalyze_button"
        >
          {isAnalyzing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
          Re-analyze
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52"
        data-ocid="results.reanalyze_dropdown"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          Switch Mode
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MODE_CONFIG.map((cfg) => {
          const Icon = cfg.icon;
          const isActive = cfg.mode === currentMode;
          return (
            <DropdownMenuItem
              key={cfg.mode}
              onClick={() => handleSelect(cfg.mode)}
              className="gap-2.5 cursor-pointer"
              data-ocid={`results.reanalyze_mode.${cfg.mode}`}
            >
              <Icon
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: cfg.color }}
              />
              <span className="flex-1 text-sm">
                {cfg.emoji} {cfg.label}
              </span>
              {isActive && (
                <Check className="w-3.5 h-3.5 text-primary ml-auto" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── Share Button ─────────────────────────────────────────── */
function ShareButton({ scanId }: { scanId: string | null }) {
  const { createShareTokenAsync, isCreatingToken } = useSharing();
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    if (!scanId) {
      toast.error("Scan not saved yet. Please wait a moment and try again.");
      return;
    }
    try {
      const url = await createShareTokenAsync(scanId);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Share link copied to clipboard!", { duration: 4000 });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to create share link. Please try again.");
    }
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5 text-xs"
      onClick={handleShare}
      disabled={isCreatingToken || !scanId}
      data-ocid="results.share_button"
    >
      {isCreatingToken ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : copied ? (
        <Check className="w-3.5 h-3.5 text-secondary" />
      ) : (
        <Link2 className="w-3.5 h-3.5" />
      )}
      {copied ? "Copied!" : "Share"}
    </Button>
  );
}

/* ── Folder SVG icon ──────────────────────────────────────── */
function Folder({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/* ── Save to Collection (opens TagSuggestionDialog) ──────── */
function SaveToCollectionButton({
  scanId,
  analysisResult,
  onSaved,
}: {
  scanId: string | null;
  analysisResult: import("../types").AnalysisResult;
  onSaved?: (collectionId: string, tags: string[]) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addScan } = useCollections();

  const handleConfirm = (collectionId: string, tags: string[]) => {
    if (!scanId) {
      toast.error("Scan not saved yet.");
      return;
    }
    addScan({ collectionId, scanId });
    toast.success("Scan saved to collection!");
    onSaved?.(collectionId, tags);
  };

  if (!scanId || !analysisResult) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs"
        disabled
        data-ocid="results.save_collection_button"
      >
        <Heart className="w-3.5 h-3.5" />
        Save
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs"
        onClick={() => setDialogOpen(true)}
        data-ocid="results.save_collection_button"
      >
        <Heart className="w-3.5 h-3.5" />
        Save
      </Button>
      <TagSuggestionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        analysisResult={analysisResult}
        scanId={scanId}
        onConfirm={handleConfirm}
      />
    </>
  );
}

/* ── Mode switcher bar ────────────────────────────────────── */
function ModeSwitcherBar({
  currentMode,
  onModeChange,
}: { currentMode: AnalysisMode; onModeChange: (mode: AnalysisMode) => void }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide animate-slide-up stagger-1"
      data-ocid="results.mode_switcher"
    >
      {MODE_CONFIG.map((cfg) => {
        const isActive = cfg.mode === currentMode;
        return (
          <button
            key={cfg.mode}
            type="button"
            onClick={() => onModeChange(cfg.mode)}
            className={`mode-badge flex-shrink-0 ${cfg.cssClass} ${isActive ? "active" : ""}`}
            data-ocid={`results.mode_tab.${cfg.mode}`}
          >
            <span className="text-base leading-none">{cfg.emoji}</span>
            <span
              className={isActive ? "text-foreground" : "text-muted-foreground"}
            >
              {cfg.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Saved tags display ───────────────────────────────────── */
function SavedTagsRow({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      data-ocid="results.saved_tags"
    >
      <Tag className="w-3 h-3 text-muted-foreground flex-shrink-0" />
      {tags.map((t) => (
        <Badge
          key={t}
          variant="outline"
          className="text-xs font-mono border-border/60 text-muted-foreground"
        >
          #{t}
        </Badge>
      ))}
    </div>
  );
}

// suppress unused warning
const _CopyIcon = Copy;
const _Folder = Folder;

/* ── Main page ────────────────────────────────────────────── */
export function ResultsPage() {
  const navigate = useNavigate();
  const {
    capturedImage,
    mimeType,
    analysisResult,
    isAnalyzing,
    error,
    reset,
    selectedMode,
    setSelectedMode,
    scanId,
  } = useLensStore();
  const { analyzeImage } = useAnalysis();

  const [savedTags, setSavedTags] = useState<string[]>([]);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  useEffect(() => {
    if (!analysisResult && !isAnalyzing) {
      navigate({ to: "/" });
    }
  }, [analysisResult, isAnalyzing, navigate]);

  const handleNewScan = () => {
    reset();
    navigate({ to: "/" });
  };

  const handleReanalyze = useCallback(
    (mode: AnalysisMode) => {
      if (!capturedImage) return;
      setSelectedMode(mode);
      analyzeImage(capturedImage, mimeType);
    },
    [capturedImage, mimeType, analyzeImage, setSelectedMode],
  );

  const handleModeSwitch = useCallback(
    (mode: AnalysisMode) => {
      if (mode === selectedMode) return;
      handleReanalyze(mode);
    },
    [selectedMode, handleReanalyze],
  );

  const handleExportPdf = async () => {
    if (!analysisResult || !scanId || !capturedImage) return;
    setIsExportingPdf(true);
    try {
      const mockScan: ScanRecord = {
        id: scanId,
        imageBase64: capturedImage,
        mimeType,
        mode: selectedMode,
        analysisResult,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        userId: { __principal__: "" } as unknown as Principal,
      };
      await exportScanToPDF(mockScan);
    } catch {
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  /* Analyzing overlay */
  if (isAnalyzing && capturedImage)
    return <AnalyzingOverlay imageData={capturedImage} mimeType={mimeType} />;

  if (isAnalyzing) {
    return (
      <div
        className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center animate-fade-in"
        data-ocid="results.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <ScanLine className="w-10 h-10 text-primary scan-pulse" />
          <p className="text-foreground font-semibold font-display">
            Analyzing…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center gap-5 animate-fade-in"
        data-ocid="results.error_state"
      >
        <div className="w-14 h-14 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <p className="font-display font-semibold text-foreground mb-1">
            Analysis failed
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
        </div>
        <Button
          onClick={handleNewScan}
          data-ocid="results.retry_button"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!analysisResult) return null;

  const { objects, extractedText, sceneDescription, webResults } =
    analysisResult;
  const hasContent =
    objects.length > 0 || !!extractedText || webResults.length > 0;
  const modeConfig = getModeConfig(selectedMode);

  // Build a scan-like object for PublishToDiscoveryDialog
  const currentScanForPublish: ScanRecord | null =
    scanId && capturedImage
      ? {
          id: scanId,
          imageBase64: capturedImage,
          mimeType,
          mode: selectedMode,
          analysisResult,
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
          userId: { __principal__: "" } as unknown as Principal,
        }
      : null;

  return (
    <div
      className="container max-w-4xl mx-auto px-4 py-8 space-y-5 animate-fade-in"
      data-ocid="results.page"
    >
      {/* Top nav */}
      <div className="flex items-center justify-between gap-3 animate-slide-up stagger-1">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
          onClick={handleNewScan}
          data-ocid="results.new_scan_button"
        >
          <ArrowLeft className="w-4 h-4" />
          New Scan
        </Button>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <ReanalyzeButton
            currentMode={selectedMode}
            onReanalyze={handleReanalyze}
            isAnalyzing={isAnalyzing}
          />
          <ShareButton scanId={scanId} />
          <SaveToCollectionButton
            scanId={scanId}
            analysisResult={analysisResult}
            onSaved={(_, tags) => setSavedTags(tags)}
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={handleExportPdf}
            disabled={isExportingPdf || !scanId}
            data-ocid="results.export_pdf_button"
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {isExportingPdf ? "Preparing…" : "Export PDF"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => setPublishDialogOpen(true)}
            disabled={!scanId}
            data-ocid="results.publish_discovery_button"
          >
            <Telescope className="w-3.5 h-3.5" />
            Publish
          </Button>
        </div>
      </div>

      {/* Mode switcher bar */}
      <ModeSwitcherBar
        currentMode={selectedMode}
        onModeChange={handleModeSwitch}
      />

      {/* Mode-specific header */}
      <ModeHeader config={modeConfig} />

      {/* Image preview card */}
      <div
        className="glass-card overflow-hidden scan-overlay animate-slide-up stagger-2"
        data-ocid="results.image_preview"
      >
        {capturedImage && (
          <img
            src={`data:${mimeType};base64,${capturedImage}`}
            alt="Visual scan result preview"
            className="w-full max-h-64 object-cover"
          />
        )}
      </div>

      {/* Saved tags (shown after save-to-collection) */}
      {savedTags.length > 0 && (
        <div className="glass-card px-4 py-3 animate-slide-up">
          <SavedTagsRow tags={savedTags} />
        </div>
      )}

      {/* ── Section 1: Scene Description ── */}
      <div
        className="glass-card p-5 space-y-3 animate-slide-up stagger-2"
        data-ocid="results.scene_section"
      >
        <SectionLabel icon={Tag} label="Scene Description" />
        <p className="text-foreground text-sm leading-relaxed">
          {sceneDescription || "No scene description available for this image."}
        </p>
      </div>

      {/* ── Section 2: Detected Objects ── */}
      <div
        className="glass-card p-5 space-y-4 animate-slide-up stagger-3"
        data-ocid="results.objects_section"
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
            data-ocid="results.objects.empty_state"
          >
            No objects detected in this image.
          </p>
        )}
      </div>

      {/* ── Section 3: Extracted Text (OCR) ── */}
      <div
        className="glass-card p-5 space-y-3 animate-slide-up stagger-3"
        data-ocid="results.text_section"
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
            data-ocid="results.text.empty_state"
          >
            No text detected in this image.
          </p>
        )}
      </div>

      {/* ── Section 4: Web Search Results ── */}
      <div
        className="space-y-3 animate-slide-up stagger-4"
        data-ocid="results.web_section"
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
            data-ocid="results.web.empty_state"
          >
            <p className="text-sm text-muted-foreground italic">
              No web results found for this image.
            </p>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!hasContent && (
        <div
          className="glass-card p-10 text-center space-y-3 animate-fade-in"
          data-ocid="results.empty_state"
        >
          <p className="text-muted-foreground text-sm">
            No recognizable content found in this image.
          </p>
          <Button
            onClick={handleNewScan}
            variant="outline"
            size="sm"
            data-ocid="results.try_again_button"
          >
            Try a different image
          </Button>
        </div>
      )}

      {/* Scan Another */}
      <div className="flex justify-center pt-4 pb-8 animate-slide-up stagger-5">
        <Button
          onClick={handleNewScan}
          size="lg"
          className="gap-2.5 font-semibold px-8"
          data-ocid="results.scan_another_button"
        >
          <Camera className="w-4 h-4" />
          Scan Another
        </Button>
      </div>

      {/* Publish to Discovery dialog */}
      {currentScanForPublish && (
        <PublishToDiscoveryDialog
          open={publishDialogOpen}
          onOpenChange={setPublishDialogOpen}
          scan={currentScanForPublish}
          initialTags={savedTags}
          onPublished={() => toast.success("Published to Discovery!")}
        />
      )}
    </div>
  );
}
