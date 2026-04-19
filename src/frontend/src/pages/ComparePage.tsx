import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeftRight,
  BookOpen,
  Car,
  ChevronLeft,
  ExternalLink,
  FlaskConical,
  GitCompare,
  Leaf,
  Scan,
  ScanSearch,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ScanRecord } from "../backend";
import { AnalysisMode } from "../backend";
import { useHistory } from "../hooks/useHistory";

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatTs(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  const d = new Date(ms);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const MODE_META: Record<
  AnalysisMode,
  { label: string; icon: React.ReactNode; color: string }
> = {
  [AnalysisMode.generic]: {
    label: "Generic",
    icon: <Scan className="w-3 h-3" />,
    color: "oklch(0.72 0.16 195)",
  },
  [AnalysisMode.plant]: {
    label: "Plant ID",
    icon: <Leaf className="w-3 h-3" />,
    color: "oklch(0.68 0.18 140)",
  },
  [AnalysisMode.food]: {
    label: "Food Scanner",
    icon: <UtensilsCrossed className="w-3 h-3" />,
    color: "oklch(0.72 0.16 30)",
  },
  [AnalysisMode.bookProduct]: {
    label: "Book/Product",
    icon: <BookOpen className="w-3 h-3" />,
    color: "oklch(0.65 0.16 270)",
  },
  [AnalysisMode.translation]: {
    label: "Translation",
    icon: <FlaskConical className="w-3 h-3" />,
    color: "oklch(0.7 0.17 50)",
  },
  [AnalysisMode.artLandmark]: {
    label: "Art/Landmark",
    icon: <ShoppingBag className="w-3 h-3" />,
    color: "oklch(0.75 0.15 320)",
  },
  [AnalysisMode.receipt]: {
    label: "Receipt Parser",
    icon: <FlaskConical className="w-3 h-3" />,
    color: "oklch(0.66 0.14 240)",
  },
  [AnalysisMode.medicalReference]: {
    label: "Medical Ref",
    icon: <Stethoscope className="w-3 h-3" />,
    color: "oklch(0.62 0.2 10)",
  },
  [AnalysisMode.carFashion]: {
    label: "Car/Fashion",
    icon: <Car className="w-3 h-3" />,
    color: "oklch(0.68 0.16 170)",
  },
};

function scanTitle(scan: ScanRecord): string {
  return scan.analysisResult.objects[0]?.name ?? "Untitled Scan";
}

// ─── Picker overlay ─────────────────────────────────────────────────────────

function ScanPicker({
  scans,
  alreadySelected,
  onSelect,
  onClose,
}: {
  scans: ScanRecord[];
  alreadySelected: string[];
  onSelect: (scan: ScanRecord) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "oklch(0.05 0.005 240 / 0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="glass-card w-full max-w-sm flex flex-col"
        style={{ maxHeight: "75vh" }}
        data-ocid="compare.picker_dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
          <p className="font-display font-semibold text-foreground text-sm">
            Select a Scan
          </p>
          <button
            type="button"
            onClick={onClose}
            data-ocid="compare.picker_close_button"
            className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
            aria-label="Close picker"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-2 space-y-1 flex-1">
          {scans.length === 0 ? (
            <p
              className="text-sm text-muted-foreground text-center py-8"
              data-ocid="compare.picker_empty_state"
            >
              No scans in history yet.
            </p>
          ) : (
            scans.map((scan, i) => {
              const title = scanTitle(scan);
              const disabled = alreadySelected.includes(scan.id);
              return (
                <button
                  key={scan.id}
                  type="button"
                  disabled={disabled}
                  data-ocid={`compare.picker_item.${i + 1}`}
                  onClick={() => {
                    if (!disabled) {
                      onSelect(scan);
                      onClose();
                    }
                  }}
                  className="w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-smooth text-left disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <div className="w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0 border border-border/40">
                    {scan.imageBase64 ? (
                      <img
                        src={`data:${scan.mimeType};base64,${scan.imageBase64}`}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ScanSearch className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {formatTs(scan.timestamp)}
                    </p>
                  </div>
                  {disabled && (
                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
                      selected
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Scan Panel ─────────────────────────────────────────────────────────────

function ScanPanel({
  label,
  scan,
  uniqueObjects,
  onClear,
  panelIndex,
}: {
  label: string;
  scan: ScanRecord;
  uniqueObjects: Set<string>;
  onClear: () => void;
  panelIndex: number;
}) {
  const mode = scan.mode;
  const meta = MODE_META[mode] ?? MODE_META[AnalysisMode.generic];
  const title = scanTitle(scan);
  const objects = scan.analysisResult.objects.slice(0, 6);
  const webResults = scan.analysisResult.webResults.slice(0, 3);

  return (
    <div
      className="comparison-panel flex flex-col gap-4 animate-slide-up"
      data-ocid={`compare.panel.${panelIndex}`}
    >
      {/* Panel Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              {label}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-mono border"
              style={{
                color: meta.color,
                borderColor: `${meta.color.replace(")", " / 0.35)")}`,
                background: `${meta.color.replace(")", " / 0.1)")}`,
              }}
            >
              {meta.icon}
              {meta.label}
            </span>
          </div>
          <p className="text-sm font-display font-semibold text-foreground truncate">
            {title}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {formatTs(scan.timestamp)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          data-ocid={`compare.clear_button.${panelIndex}`}
          className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth flex-shrink-0"
          aria-label="Clear panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-video rounded-md overflow-hidden bg-muted border border-border/40 relative scan-overlay">
        {scan.imageBase64 ? (
          <img
            src={`data:${scan.mimeType};base64,${scan.imageBase64}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ScanSearch className="w-8 h-8 text-muted-foreground/30" />
          </div>
        )}
      </div>

      {/* Scene description */}
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
          Scene
        </p>
        <p className="text-sm text-foreground leading-relaxed line-clamp-4">
          {scan.analysisResult.sceneDescription || "No description available."}
        </p>
      </div>

      {/* Detected objects */}
      {objects.length > 0 && (
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
            Detected Objects
          </p>
          <div className="space-y-2">
            {objects.map((obj) => {
              const isUnique = uniqueObjects.has(obj.name.toLowerCase());
              return (
                <div key={obj.name} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    {isUnique && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "oklch(0.72 0.16 80)" }}
                        title="Unique to this scan"
                      />
                    )}
                    <span
                      className={`text-sm truncate capitalize ${
                        isUnique ? "font-medium" : "text-foreground"
                      }`}
                      style={
                        isUnique ? { color: "oklch(0.82 0.14 80)" } : undefined
                      }
                    >
                      {obj.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div
                      className="h-1 rounded-full confidence-fill"
                      style={{
                        width: `${Math.round(obj.confidence * 100) * 0.4}px`,
                        minWidth: "12px",
                        background: isUnique
                          ? "oklch(0.78 0.16 80)"
                          : "oklch(0.72 0.16 195 / 0.6)",
                      }}
                    />
                    <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                      {Math.round(obj.confidence * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {uniqueObjects.size > 0 && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "oklch(0.72 0.16 80)" }}
              />
              Highlighted objects are unique to this scan
            </p>
          )}
        </div>
      )}

      {/* Extracted text */}
      {scan.analysisResult.extractedText &&
        scan.analysisResult.extractedText.trim().length > 0 && (
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
              Extracted Text
            </p>
            <div
              className="rounded-md p-3 border border-border/40"
              style={{ background: "oklch(0.16 0.005 240)" }}
            >
              <p className="text-xs font-mono text-foreground leading-relaxed line-clamp-5 whitespace-pre-wrap break-words">
                {scan.analysisResult.extractedText}
              </p>
            </div>
          </div>
        )}

      {/* Web results */}
      {webResults.length > 0 && (
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
            Web Results
          </p>
          <div className="space-y-2">
            {webResults.map((result, webIdx) => (
              <a
                key={result.url}
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid={`compare.web_result.${panelIndex}.${webIdx + 1}`}
                className="block rounded-md p-2.5 border border-border/40 hover:border-primary/40 hover:bg-muted/30 transition-smooth group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-1 flex-1 min-w-0">
                    {result.title}
                  </p>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 mt-0.5 transition-smooth" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {result.snippet}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty placeholder panel ─────────────────────────────────────────────────

function EmptyPanel({
  label,
  onPick,
  panelIndex,
}: {
  label: string;
  onPick: () => void;
  panelIndex: number;
}) {
  return (
    <div
      className="comparison-panel flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border/40"
      data-ocid={`compare.empty_panel.${panelIndex}`}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "oklch(0.18 0.008 240)" }}
      >
        <ScanSearch className="w-6 h-6 text-muted-foreground/50" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">
          Pick a scan from your history
        </p>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={onPick}
        data-ocid={`compare.select_button.${panelIndex}`}
        className="gap-1.5"
      >
        <ScanSearch className="w-3.5 h-3.5" />
        Select Scan
      </Button>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function ComparePage() {
  const { history, isLoading } = useHistory();

  const [left, setLeft] = useState<ScanRecord | null>(null);
  const [right, setRight] = useState<ScanRecord | null>(null);
  const [picking, setPicking] = useState<"left" | "right" | null>(null);

  const handleSelect = (scan: ScanRecord) => {
    if (picking === "left") setLeft(scan);
    else if (picking === "right") setRight(scan);
    setPicking(null);
  };

  const swap = () => {
    const tmp = left;
    setLeft(right);
    setRight(tmp);
  };

  // Compute unique objects per panel
  const leftNames = new Set(
    (left?.analysisResult.objects ?? []).map((o) => o.name.toLowerCase()),
  );
  const rightNames = new Set(
    (right?.analysisResult.objects ?? []).map((o) => o.name.toLowerCase()),
  );
  const uniqueToLeft = new Set(
    [...leftNames].filter((n) => !rightNames.has(n)),
  );
  const uniqueToRight = new Set(
    [...rightNames].filter((n) => !leftNames.has(n)),
  );

  // Already-selected IDs to disable in picker
  const selectedIds = [left?.id, right?.id].filter(Boolean) as string[];

  // Not enough scans
  const insufficientScans = !isLoading && history.length < 2;

  return (
    <div
      className="flex flex-col min-h-[calc(100vh-3.5rem)]"
      data-ocid="compare.page"
    >
      {/* Toolbar */}
      <div className="border-b border-border/60 bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground h-8 px-2"
            onClick={() => {
              setLeft(null);
              setRight(null);
            }}
            data-ocid="compare.reset_button"
          >
            <ChevronLeft className="w-4 h-4" />
            Reset
          </Button>
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground text-sm">
              Compare Scans
            </span>
          </div>
        </div>

        {/* Swap button — only visible when both panels filled */}
        {left && right && (
          <Button
            variant="outline"
            size="sm"
            onClick={swap}
            data-ocid="compare.swap_button"
            className="gap-1.5 h-8 text-xs"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Swap
          </Button>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-4">
        {isLoading ? (
          <div
            className="comparison-layout"
            style={{ minHeight: "400px" }}
            data-ocid="compare.loading_state"
          >
            {[1, 2].map((i) => (
              <div key={i} className="comparison-panel flex flex-col gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="aspect-video w-full rounded-md" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            ))}
          </div>
        ) : insufficientScans ? (
          /* Not enough scans */
          <div
            className="flex flex-col items-center justify-center gap-5 py-20 text-center"
            data-ocid="compare.empty_state"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.18 0.008 240)" }}
            >
              <GitCompare className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-lg mb-1">
                Not Enough Scans
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                You need at least 2 scans in your history to use the comparison
                tool. Capture or upload images to get started.
              </p>
            </div>
            <Badge variant="outline" className="text-xs font-mono">
              {history.length} / 2 scans available
            </Badge>
          </div>
        ) : (
          /* Comparison layout */
          <div
            className="comparison-layout"
            style={{ minHeight: "480px" }}
            data-ocid="compare.layout"
          >
            {/* Left panel */}
            {left ? (
              <ScanPanel
                label="Scan A"
                scan={left}
                uniqueObjects={uniqueToLeft}
                onClear={() => setLeft(null)}
                panelIndex={1}
              />
            ) : (
              <EmptyPanel
                label="Scan A"
                onPick={() => setPicking("left")}
                panelIndex={1}
              />
            )}

            {/* Right panel */}
            {right ? (
              <ScanPanel
                label="Scan B"
                scan={right}
                uniqueObjects={uniqueToRight}
                onClear={() => setRight(null)}
                panelIndex={2}
              />
            ) : (
              <EmptyPanel
                label="Scan B"
                onPick={() => setPicking("right")}
                panelIndex={2}
              />
            )}
          </div>
        )}
      </div>

      {/* Scan picker overlay */}
      {picking && (
        <ScanPicker
          scans={history}
          alreadySelected={selectedIds}
          onSelect={handleSelect}
          onClose={() => setPicking(null)}
        />
      )}
    </div>
  );
}
