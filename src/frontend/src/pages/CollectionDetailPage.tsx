import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckSquare,
  Download,
  FileDown,
  FolderOpen,
  Loader2,
  ScanSearch,
  Square,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ScanRecord } from "../backend";
import { AnalysisMode } from "../backend";
import { useCollection, useCollections } from "../hooks/useCollections";
import { useHistory } from "../hooks/useHistory";
import { useLensStore } from "../store";
import { exportScansToPDF } from "../utils/pdfExport";

const MODE_LABELS: Record<AnalysisMode, string> = {
  [AnalysisMode.generic]: "Generic",
  [AnalysisMode.plant]: "Plant ID",
  [AnalysisMode.food]: "Food",
  [AnalysisMode.bookProduct]: "Book/Product",
  [AnalysisMode.translation]: "Translation",
  [AnalysisMode.artLandmark]: "Art/Landmark",
  [AnalysisMode.receipt]: "Receipt",
  [AnalysisMode.medicalReference]: "Medical",
  [AnalysisMode.carFashion]: "Car/Fashion",
};

const MODE_COLORS: Record<AnalysisMode, string> = {
  [AnalysisMode.generic]: "var(--mode-generic)",
  [AnalysisMode.plant]: "var(--mode-plant)",
  [AnalysisMode.food]: "var(--mode-food)",
  [AnalysisMode.bookProduct]: "var(--mode-book)",
  [AnalysisMode.translation]: "var(--mode-translation)",
  [AnalysisMode.artLandmark]: "var(--mode-art)",
  [AnalysisMode.receipt]: "var(--mode-receipt)",
  [AnalysisMode.medicalReference]: "var(--mode-medical)",
  [AnalysisMode.carFashion]: "var(--mode-car)",
};

interface ScanCardProps {
  scan: ScanRecord;
  index: number;
  collectionId: string;
  selected: boolean;
  selectionMode: boolean;
  onToggleSelect: (id: string) => void;
  onRemove: (collectionId: string, scanId: string) => void;
  onOpen: (scan: ScanRecord) => void;
}

function ScanCard({
  scan,
  index,
  collectionId,
  selected,
  selectionMode,
  onToggleSelect,
  onRemove,
  onOpen,
}: ScanCardProps) {
  const label = scan.analysisResult.objects[0]?.name ?? "Scan";
  const timestamp = new Date(Number(scan.timestamp / BigInt(1_000_000)));
  const modeColor = MODE_COLORS[scan.mode] ?? "var(--mode-generic)";
  const modeLabel = MODE_LABELS[scan.mode] ?? "Scan";

  return (
    <div
      className="glass-card overflow-hidden transition-smooth animate-slide-up relative group"
      style={{ animationDelay: `${index * 0.05}s` }}
      data-ocid={`collection-detail.item.${index + 1}`}
    >
      {selectionMode && (
        <button
          type="button"
          className="absolute top-2 left-2 z-10 focus-ring rounded"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(scan.id);
          }}
        >
          {selected ? (
            <CheckSquare
              className="w-5 h-5 text-primary drop-shadow"
              data-ocid={`collection-detail.checkbox.${index + 1}`}
            />
          ) : (
            <Square
              className="w-5 h-5 text-muted-foreground/80 drop-shadow"
              data-ocid={`collection-detail.checkbox.${index + 1}`}
            />
          )}
        </button>
      )}

      {!selectionMode && (
        <button
          type="button"
          className="absolute top-2 right-2 z-10 w-6 h-6 rounded bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-smooth opacity-0 group-hover:opacity-100"
          aria-label="Remove from collection"
          data-ocid={`collection-detail.remove_button.${index + 1}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(collectionId, scan.id);
          }}
        >
          <X className="w-3 h-3" />
        </button>
      )}

      <button
        type="button"
        className="w-full text-left cursor-pointer hover:opacity-90 transition-smooth focus-ring rounded-t-lg"
        onClick={() => {
          if (selectionMode) onToggleSelect(scan.id);
          else onOpen(scan);
        }}
      >
        <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden rounded-t-lg">
          {scan.imageBase64 ? (
            <img
              src={`data:${scan.mimeType};base64,${scan.imageBase64}`}
              alt={label}
              className="w-full h-full object-cover hover:scale-105 transition-smooth"
            />
          ) : (
            <ScanSearch className="w-8 h-8 text-muted-foreground/40" />
          )}
        </div>

        <div className="p-2.5 space-y-1.5">
          <p className="text-sm font-medium text-foreground truncate">
            {label}
          </p>
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs text-muted-foreground font-mono">
              {timestamp.toLocaleDateString()}
            </p>
            <span
              className="text-xs font-mono px-1.5 py-0.5 rounded border"
              style={{ color: modeColor, borderColor: modeColor }}
            >
              {modeLabel}
            </span>
          </div>
        </div>
      </button>

      {selected && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none" />
      )}
    </div>
  );
}

interface ExportProgressProps {
  current: number;
  total: number;
}
function ExportProgress({ current, total }: ExportProgressProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div
      className="progress-container"
      data-ocid="collection-detail.export_progress"
    >
      <div className="progress-label">
        <span>Generating PDF…</span>
        <span>
          {pct}% ({current}/{total})
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function CollectionDetailPage() {
  const { collectionId } = useParams({ from: "/collections/$collectionId" });
  const navigate = useNavigate();
  const { data: collection, isLoading: isLoadingCollection } =
    useCollection(collectionId);
  const { history, isLoading: isLoadingHistory } = useHistory();
  const { removeScan } = useCollections();

  const setCapturedImage = useLensStore((s) => s.setCapturedImage);
  const setAnalysisResult = useLensStore((s) => s.setAnalysisResult);
  const setSelectedMode = useLensStore((s) => s.setSelectedMode);
  const setScanId = useLensStore((s) => s.setScanId);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [exportProgress, setExportProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const scans = history.filter((s) => collection?.scanIds.includes(s.id));
  const isLoading = isLoadingCollection || isLoadingHistory;

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === scans.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(scans.map((s) => s.id)));
  };

  const handleOpenScan = (scan: ScanRecord) => {
    setCapturedImage(scan.imageBase64, scan.mimeType);
    setAnalysisResult(scan.analysisResult);
    setSelectedMode(scan.mode);
    setScanId(scan.id);
    navigate({ to: "/results" });
  };

  const handleRemoveScan = (colId: string, scanId: string) => {
    removeScan({ collectionId: colId, scanId });
  };

  const handleExportSelected = async () => {
    const selected = scans.filter((s) => selectedIds.has(s.id));
    if (selected.length === 0) return;
    try {
      setExportProgress({ current: 0, total: selected.length });
      await exportScansToPDF(
        selected,
        `${collection?.name ?? "Collection"} — Selected`,
        (cur, tot) => setExportProgress({ current: cur, total: tot }),
      );
      toast.success(
        `Exported ${selected.length} scan${selected.length !== 1 ? "s" : ""} as PDF`,
      );
    } catch {
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setExportProgress(null);
      setSelectionMode(false);
      setSelectedIds(new Set());
    }
  };

  const handleExportAll = async () => {
    if (scans.length === 0) return;
    try {
      setExportProgress({ current: 0, total: scans.length });
      await exportScansToPDF(
        scans,
        collection?.name ?? "Collection",
        (cur, tot) => setExportProgress({ current: cur, total: tot }),
      );
      toast.success("Collection exported as PDF");
    } catch {
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setExportProgress(null);
    }
  };

  const confirmRemoveScan = scans.find((s) => s.id === confirmRemoveId);

  return (
    <div
      className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in"
      data-ocid="collection-detail.page"
    >
      {/* Breadcrumb */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2 mb-5"
        onClick={() => navigate({ to: "/collections" })}
        data-ocid="collection-detail.back_button"
      >
        <ArrowLeft className="w-4 h-4" />
        Collections
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <FolderOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              {isLoadingCollection ? (
                <Skeleton className="h-6 w-40 inline-block" />
              ) : (
                (collection?.name ?? "Collection")
              )}
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
              {scans.length} scan{scans.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Actions */}
        {scans.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Export all — always visible */}
            {!selectionMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportAll}
                disabled={!!exportProgress}
                className="gap-1.5 text-xs hidden sm:flex"
                data-ocid="collection-detail.export_all_button"
              >
                {exportProgress ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileDown className="w-3.5 h-3.5" />
                )}
                Export All PDF
              </Button>
            )}

            {selectionMode ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  data-ocid="collection-detail.select_all_button"
                >
                  {selectedIds.size === scans.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
                <Button
                  size="sm"
                  disabled={selectedIds.size === 0 || !!exportProgress}
                  onClick={handleExportSelected}
                  className="gap-1.5"
                  data-ocid="collection-detail.export_button"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export PDF
                  {selectedIds.size > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-0.5 h-4 px-1 text-xs font-mono"
                    >
                      {selectedIds.size}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectionMode(false);
                    setSelectedIds(new Set());
                  }}
                  data-ocid="collection-detail.cancel_selection_button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectionMode(true)}
                className="gap-1.5"
                data-ocid="collection-detail.select_button"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Select
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Export progress */}
      {exportProgress && (
        <div className="glass-card p-4 mb-6">
          <ExportProgress
            current={exportProgress.current}
            total={exportProgress.total}
          />
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {(["a", "b", "c", "d"] as const).map((k) => (
            <Skeleton key={k} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : scans.length === 0 ? (
        <div
          className="glass-card p-12 text-center space-y-3 animate-fade-in"
          data-ocid="collection-detail.empty_state"
        >
          <FolderOpen className="w-10 h-10 text-muted-foreground/40 mx-auto" />
          <p className="font-display font-semibold text-foreground">
            Collection is empty
          </p>
          <p className="text-sm text-muted-foreground">
            Add scans from your history to this collection.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/history" })}
            data-ocid="collection-detail.go_history_button"
          >
            Browse History
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {scans.map((scan, i) => (
            <ScanCard
              key={scan.id}
              scan={scan}
              index={i}
              collectionId={collectionId}
              selected={selectedIds.has(scan.id)}
              selectionMode={selectionMode}
              onToggleSelect={handleToggleSelect}
              onRemove={(_colId, scanId) => setConfirmRemoveId(scanId)}
              onOpen={handleOpenScan}
            />
          ))}
        </div>
      )}

      {/* Remove confirm dialog */}
      <Dialog
        open={!!confirmRemoveId}
        onOpenChange={(open) => {
          if (!open) setConfirmRemoveId(null);
        }}
      >
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="collection-detail.remove_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Remove from Collection?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {confirmRemoveScan
              ? `"${confirmRemoveScan.analysisResult.objects[0]?.name ?? "This scan"}" will be removed from this collection. The scan won't be deleted.`
              : "This scan will be removed from the collection."}
          </p>
          <div className="flex gap-2 justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setConfirmRemoveId(null)}
              data-ocid="collection-detail.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmRemoveId) {
                  handleRemoveScan(collectionId, confirmRemoveId);
                  setConfirmRemoveId(null);
                }
              }}
              data-ocid="collection-detail.confirm_button"
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
