import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  CheckSquare,
  Clock,
  Download,
  FileDown,
  History,
  Loader2,
  ScanSearch,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnalysisMode } from "../backend";
import type { ScanRecord } from "../backend";
import { useHistory } from "../hooks/useHistory";
import { useLensStore } from "../store";
import { exportScansToPDF } from "../utils/pdfExport";

// ─── Constants ────────────────────────────────────────────────────────────────

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

const MODE_VAR: Record<AnalysisMode, string> = {
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

type FilterMode = "all" | AnalysisMode;
type DateRange = "today" | "week" | "month" | "all";

const ALL_MODES: AnalysisMode[] = [
  AnalysisMode.generic,
  AnalysisMode.plant,
  AnalysisMode.food,
  AnalysisMode.bookProduct,
  AnalysisMode.translation,
  AnalysisMode.artLandmark,
  AnalysisMode.receipt,
  AnalysisMode.medicalReference,
  AnalysisMode.carFashion,
];

const DATE_RANGES: { key: DateRange; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This week" },
  { key: "month", label: "This month" },
  { key: "all", label: "All time" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTimestamp(ts: bigint): string {
  const d = new Date(Number(ts / 1_000_000n));
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

function isInRange(ts: bigint, range: DateRange): boolean {
  if (range === "all") return true;
  const d = new Date(Number(ts / 1_000_000n));
  const now = new Date();
  if (range === "today") return d.toDateString() === now.toDateString();
  if (range === "week") {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return d >= weekAgo;
  }
  return (
    d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  );
}

function matchesSearch(scan: ScanRecord, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    scan.analysisResult.sceneDescription.toLowerCase().includes(q) ||
    scan.analysisResult.objects.some((o) => o.name.toLowerCase().includes(q)) ||
    scan.analysisResult.extractedText.toLowerCase().includes(q)
  );
}

function getSnippet(scan: ScanRecord): string {
  if (scan.analysisResult.sceneDescription)
    return scan.analysisResult.sceneDescription.slice(0, 80);
  if (scan.analysisResult.objects.length > 0)
    return scan.analysisResult.objects
      .slice(0, 3)
      .map((o) => o.name)
      .join(", ");
  return "No description available";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <div className="history-list" data-ocid="history.loading_state">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="glass-card p-3 flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-sm flex-shrink-0" />
          <div className="flex-1 space-y-2 min-w-0">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  filter,
  searchQuery,
  onClear,
}: { filter: FilterMode; searchQuery: string; onClear: () => void }) {
  const hasActiveFilter = filter !== "all" || searchQuery;
  return (
    <div
      className="glass-card p-14 text-center space-y-5 animate-fade-in"
      data-ocid="history.empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-muted/40 border border-border flex items-center justify-center mx-auto">
        <History className="w-7 h-7 text-muted-foreground" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground mb-1.5">
          {hasActiveFilter ? "No matching scans" : "No scans yet"}
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          {hasActiveFilter
            ? "Try adjusting your filters or search query."
            : "Capture or upload an image to start your visual history."}
        </p>
      </div>
      {hasActiveFilter ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          data-ocid="history.clear_filter_button"
        >
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}

interface ScanItemProps {
  scan: ScanRecord;
  index: number;
  bulkMode: boolean;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (scan: ScanRecord) => void;
}

function ScanItem({
  scan,
  index,
  bulkMode,
  selected,
  onToggleSelect,
  onDelete,
  onClick,
}: ScanItemProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const title = scan.analysisResult.objects[0]?.name ?? "Scan";
  const snippet = getSnippet(scan);

  return (
    <>
      <button
        type="button"
        className={`history-item group animate-slide-up w-full text-left ${selected ? "glow-border" : ""}`}
        style={{ animationDelay: `${index * 0.04}s` }}
        data-ocid={`history.item.${index + 1}`}
        onClick={() => {
          if (bulkMode) {
            onToggleSelect(scan.id);
          } else {
            onClick(scan);
          }
        }}
      >
        {bulkMode && (
          <div
            className="flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={selected}
              onCheckedChange={() => onToggleSelect(scan.id)}
              data-ocid={`history.checkbox.${index + 1}`}
              className="border-border"
            />
          </div>
        )}

        <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0 border border-border/40">
          {scan.imageBase64 ? (
            <img
              src={`data:${scan.mimeType};base64,${scan.imageBase64}`}
              alt={title}
              className="history-item-thumbnail"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ScanSearch className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="history-item-text">
          <p className="history-item-title">{title}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
            {snippet}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="history-item-time">
              {formatTimestamp(scan.timestamp)}
            </span>
          </div>
        </div>

        <Badge
          variant="outline"
          className="text-xs font-mono flex-shrink-0 hidden sm:flex"
          style={{
            color: MODE_VAR[scan.mode],
            borderColor: MODE_VAR[scan.mode],
          }}
        >
          {MODE_LABELS[scan.mode]}
        </Badge>

        {!bulkMode && (
          <button
            type="button"
            data-ocid={`history.delete_button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setConfirmOpen(true);
            }}
            className="ml-1 w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth opacity-0 group-hover:opacity-100 focus-visible:opacity-100 flex-shrink-0"
            aria-label={`Delete scan ${title}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </button>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent data-ocid="history.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this scan?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove "{title}" from your history. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="history.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="history.delete.confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onDelete(scan.id);
                setConfirmOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// ─── PDF Export Progress ──────────────────────────────────────────────────────

function PdfProgress({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div
      className="glass-card p-3 flex items-center gap-3 animate-fade-in"
      data-ocid="history.export_progress"
    >
      <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
          <span>Generating PDF…</span>
          <span>
            {current}/{total} scans ({pct}%)
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function HistoryPage() {
  const { history, isLoading, deleteScan } = useHistory();
  const navigate = useNavigate();
  const { setCapturedImage, setAnalysisResult, setSelectedMode } =
    useLensStore();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState<FilterMode>("all");
  const [dateRange, setDateRange] = useState<DateRange>("all");

  // Bulk mode
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false);

  // PDF export progress
  const [exportProgress, setExportProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);

  // Apply filters
  const filtered = history
    .filter((s) => (modeFilter === "all" ? true : s.mode === modeFilter))
    .filter((s) => isInRange(s.timestamp, dateRange))
    .filter((s) => matchesSearch(s, searchQuery))
    .sort((a, b) => Number(b.timestamp - a.timestamp));

  const allSelected =
    filtered.length > 0 && filtered.every((s) => selectedIds.has(s.id));

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((s) => s.id)));
  }

  function exitBulkMode() {
    setBulkMode(false);
    setSelectedIds(new Set());
  }

  function handleBulkDelete() {
    for (const id of selectedIds) deleteScan(id);
    exitBulkMode();
    setBulkConfirmOpen(false);
  }

  function handleRestoreScan(scan: ScanRecord) {
    setCapturedImage(scan.imageBase64, scan.mimeType);
    setAnalysisResult(scan.analysisResult);
    setSelectedMode(scan.mode);
    navigate({ to: "/results" });
  }

  function clearFilters() {
    setSearchQuery("");
    setModeFilter("all");
    setDateRange("all");
  }

  const hasFilters =
    searchQuery.trim() !== "" || modeFilter !== "all" || dateRange !== "all";

  async function handleExportSelected() {
    const selected = filtered.filter((s) => selectedIds.has(s.id));
    if (selected.length === 0) return;
    try {
      setExportProgress({ current: 0, total: selected.length });
      await exportScansToPDF(selected, "Selected Scans", (cur, tot) => {
        setExportProgress({ current: cur, total: tot });
      });
      toast.success(
        `Exported ${selected.length} scan${selected.length !== 1 ? "s" : ""} as PDF`,
      );
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setExportProgress(null);
    }
  }

  async function handleExportAll() {
    if (filtered.length === 0) return;
    const title = hasFilters ? "Filtered Scans" : "All Scans";
    try {
      setExportProgress({ current: 0, total: filtered.length });
      await exportScansToPDF(filtered, title, (cur, tot) => {
        setExportProgress({ current: cur, total: tot });
      });
      toast.success(
        `Exported ${filtered.length} scan${filtered.length !== 1 ? "s" : ""} as PDF`,
      );
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setExportProgress(null);
    }
  }

  return (
    <div
      className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in"
      data-ocid="history.page"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <History className="w-5 h-5 text-primary" />
          <h1 className="font-display font-bold text-xl text-foreground">
            Scan History
          </h1>
          {history.length > 0 && (
            <Badge
              variant="outline"
              className="font-mono text-xs border-border text-muted-foreground"
            >
              {history.length}
            </Badge>
          )}
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          {/* Export All PDF (always visible when there are results) */}
          {!bulkMode && filtered.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs hidden sm:flex"
              onClick={handleExportAll}
              disabled={!!exportProgress}
              data-ocid="history.export_all_button"
            >
              {exportProgress ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileDown className="w-3.5 h-3.5" />
              )}
              Export All
            </Button>
          )}

          {/* Bulk mode toggle */}
          {bulkMode ? (
            <>
              {selectedIds.size > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportSelected}
                    disabled={!!exportProgress}
                    className="gap-1.5 text-xs"
                    data-ocid="history.bulk_export_button"
                  >
                    {exportProgress ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    Export PDF ({selectedIds.size})
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setBulkConfirmOpen(true)}
                    data-ocid="history.bulk_delete_button"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete ({selectedIds.size})
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={exitBulkMode}
                data-ocid="history.cancel_bulk_button"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBulkMode(true)}
              data-ocid="history.bulk_mode_button"
              className="text-muted-foreground"
            >
              <CheckSquare className="w-4 h-4 mr-1.5" />
              Select
            </Button>
          )}
        </div>
      </div>

      {/* PDF export progress */}
      {exportProgress && (
        <div className="mb-4">
          <PdfProgress
            current={exportProgress.current}
            total={exportProgress.total}
          />
        </div>
      )}

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search by object, description, or text…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-card border-border"
          data-ocid="history.search_input"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Mode filter chips */}
      <div
        className="flex flex-wrap gap-1.5 mb-3"
        data-ocid="history.mode_filter_tabs"
      >
        <button
          type="button"
          onClick={() => setModeFilter("all")}
          data-ocid="history.filter.all"
          className={`filter-chip ${modeFilter === "all" ? "active" : ""}`}
        >
          All
        </button>
        {ALL_MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() =>
              setModeFilter((prev) => (prev === mode ? "all" : mode))
            }
            data-ocid={`history.filter.${mode}`}
            className={`filter-chip ${modeFilter === mode ? "active" : ""}`}
            style={
              modeFilter === mode
                ? { borderColor: MODE_VAR[mode], color: MODE_VAR[mode] }
                : undefined
            }
          >
            {MODE_LABELS[mode]}
          </button>
        ))}
      </div>

      {/* Date range chips */}
      <div
        className="flex flex-wrap gap-1.5 mb-5"
        data-ocid="history.date_filter_tabs"
      >
        <Calendar className="w-3.5 h-3.5 text-muted-foreground self-center mr-0.5" />
        {DATE_RANGES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setDateRange(key)}
            data-ocid={`history.date_filter.${key}`}
            className={`filter-chip text-xs ${dateRange === key ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            data-ocid="history.clear_all_filters_button"
            className="ml-1 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Bulk select-all row */}
      {bulkMode && filtered.length > 0 && (
        <div className="flex items-center gap-2 mb-3 px-1">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleSelectAll}
            data-ocid="history.select_all_checkbox"
          />
          <span className="text-sm text-muted-foreground">
            {allSelected ? "Deselect all" : "Select all"} ({filtered.length})
          </span>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <SkeletonRows />
      ) : filtered.length === 0 ? (
        <EmptyState
          filter={modeFilter}
          searchQuery={searchQuery}
          onClear={clearFilters}
        />
      ) : (
        <div className="history-list">
          {filtered.map((scan, i) => (
            <ScanItem
              key={scan.id}
              scan={scan}
              index={i}
              bulkMode={bulkMode}
              selected={selectedIds.has(scan.id)}
              onToggleSelect={toggleSelect}
              onDelete={deleteScan}
              onClick={handleRestoreScan}
            />
          ))}
        </div>
      )}

      {/* Bulk delete confirmation */}
      <AlertDialog open={bulkConfirmOpen} onOpenChange={setBulkConfirmOpen}>
        <AlertDialogContent data-ocid="history.bulk_delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedIds.size} scan{selectedIds.size !== 1 ? "s" : ""}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the selected scans from your history.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="history.bulk_delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="history.bulk_delete.confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleBulkDelete}
            >
              Delete all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
