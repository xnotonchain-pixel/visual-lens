import { h as useParams, u as useNavigate, a as useLensStore, r as reactExports, j as jsxRuntimeExports, F as FolderOpen, g as Skeleton, S as ScanSearch, A as AnalysisMode } from "./index-BUSSrS1X.js";
import { B as Badge } from "./badge-tA_YrSZS.js";
import { B as Button, X } from "./button-DIJgVfI1.js";
import { d as useCollection, u as useCollections, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./useCollections-BLnssFjP.js";
import { u as ue } from "./index-Dj6-O_Jm.js";
import { u as useHistory } from "./useHistory-Cpl0QatJ.js";
import { a as exportScansToPDF } from "./pdfExport-CqlmiXf-.js";
import { A as ArrowLeft } from "./arrow-left-BwtdsEZ1.js";
import { L as LoaderCircle } from "./loader-circle-Jy5N0DXm.js";
import { F as FileDown, S as SquareCheckBig } from "./square-check-big-BVit4_FV.js";
import { D as Download } from "./download-CE9kC546.js";
import { S as Square } from "./square-DcaVRyzk.js";
import "./index-BsMJgQDJ.js";
import "./index-Bct3_tmY.js";
import "./index-L_N3zCbP.js";
import "./Combination-4bkKIxDf.js";
import "./index-c1I6fEgY.js";
import "./useMutation-Bk3bBMzH.js";
const MODE_LABELS = {
  [AnalysisMode.generic]: "Generic",
  [AnalysisMode.plant]: "Plant ID",
  [AnalysisMode.food]: "Food",
  [AnalysisMode.bookProduct]: "Book/Product",
  [AnalysisMode.translation]: "Translation",
  [AnalysisMode.artLandmark]: "Art/Landmark",
  [AnalysisMode.receipt]: "Receipt",
  [AnalysisMode.medicalReference]: "Medical",
  [AnalysisMode.carFashion]: "Car/Fashion"
};
const MODE_COLORS = {
  [AnalysisMode.generic]: "var(--mode-generic)",
  [AnalysisMode.plant]: "var(--mode-plant)",
  [AnalysisMode.food]: "var(--mode-food)",
  [AnalysisMode.bookProduct]: "var(--mode-book)",
  [AnalysisMode.translation]: "var(--mode-translation)",
  [AnalysisMode.artLandmark]: "var(--mode-art)",
  [AnalysisMode.receipt]: "var(--mode-receipt)",
  [AnalysisMode.medicalReference]: "var(--mode-medical)",
  [AnalysisMode.carFashion]: "var(--mode-car)"
};
function ScanCard({
  scan,
  index,
  collectionId,
  selected,
  selectionMode,
  onToggleSelect,
  onRemove,
  onOpen
}) {
  var _a;
  const label = ((_a = scan.analysisResult.objects[0]) == null ? void 0 : _a.name) ?? "Scan";
  const timestamp = new Date(Number(scan.timestamp / BigInt(1e6)));
  const modeColor = MODE_COLORS[scan.mode] ?? "var(--mode-generic)";
  const modeLabel = MODE_LABELS[scan.mode] ?? "Scan";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card overflow-hidden transition-smooth animate-slide-up relative group",
      style: { animationDelay: `${index * 0.05}s` },
      "data-ocid": `collection-detail.item.${index + 1}`,
      children: [
        selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute top-2 left-2 z-10 focus-ring rounded",
            onClick: (e) => {
              e.stopPropagation();
              onToggleSelect(scan.id);
            },
            children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SquareCheckBig,
              {
                className: "w-5 h-5 text-primary drop-shadow",
                "data-ocid": `collection-detail.checkbox.${index + 1}`
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Square,
              {
                className: "w-5 h-5 text-muted-foreground/80 drop-shadow",
                "data-ocid": `collection-detail.checkbox.${index + 1}`
              }
            )
          }
        ),
        !selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute top-2 right-2 z-10 w-6 h-6 rounded bg-card/80 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-smooth opacity-0 group-hover:opacity-100",
            "aria-label": "Remove from collection",
            "data-ocid": `collection-detail.remove_button.${index + 1}`,
            onClick: (e) => {
              e.stopPropagation();
              onRemove(collectionId, scan.id);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full text-left cursor-pointer hover:opacity-90 transition-smooth focus-ring rounded-t-lg",
            onClick: () => {
              if (selectionMode) onToggleSelect(scan.id);
              else onOpen(scan);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted flex items-center justify-center overflow-hidden rounded-t-lg", children: scan.imageBase64 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: `data:${scan.mimeType};base64,${scan.imageBase64}`,
                  alt: label,
                  className: "w-full h-full object-cover hover:scale-105 transition-smooth"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-8 h-8 text-muted-foreground/40" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: timestamp.toLocaleDateString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-mono px-1.5 py-0.5 rounded border",
                      style: { color: modeColor, borderColor: modeColor },
                      children: modeLabel
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-lg border-2 border-primary pointer-events-none" })
      ]
    }
  );
}
function ExportProgress({ current, total }) {
  const pct = total > 0 ? Math.round(current / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "progress-container",
      "data-ocid": "collection-detail.export_progress",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generating PDF…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            pct,
            "% (",
            current,
            "/",
            total,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-fill", style: { width: `${pct}%` } }) })
      ]
    }
  );
}
function CollectionDetailPage() {
  var _a;
  const { collectionId } = useParams({ from: "/collections/$collectionId" });
  const navigate = useNavigate();
  const { data: collection, isLoading: isLoadingCollection } = useCollection(collectionId);
  const { history, isLoading: isLoadingHistory } = useHistory();
  const { removeScan } = useCollections();
  const setCapturedImage = useLensStore((s) => s.setCapturedImage);
  const setAnalysisResult = useLensStore((s) => s.setAnalysisResult);
  const setSelectedMode = useLensStore((s) => s.setSelectedMode);
  const setScanId = useLensStore((s) => s.setScanId);
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [selectionMode, setSelectionMode] = reactExports.useState(false);
  const [exportProgress, setExportProgress] = reactExports.useState(null);
  const [confirmRemoveId, setConfirmRemoveId] = reactExports.useState(null);
  const scans = history.filter((s) => collection == null ? void 0 : collection.scanIds.includes(s.id));
  const isLoading = isLoadingCollection || isLoadingHistory;
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleSelectAll = () => {
    if (selectedIds.size === scans.length) setSelectedIds(/* @__PURE__ */ new Set());
    else setSelectedIds(new Set(scans.map((s) => s.id)));
  };
  const handleOpenScan = (scan) => {
    setCapturedImage(scan.imageBase64, scan.mimeType);
    setAnalysisResult(scan.analysisResult);
    setSelectedMode(scan.mode);
    setScanId(scan.id);
    navigate({ to: "/results" });
  };
  const handleRemoveScan = (colId, scanId) => {
    removeScan({ collectionId: colId, scanId });
  };
  const handleExportSelected = async () => {
    const selected = scans.filter((s) => selectedIds.has(s.id));
    if (selected.length === 0) return;
    try {
      setExportProgress({ current: 0, total: selected.length });
      await exportScansToPDF(
        selected,
        `${(collection == null ? void 0 : collection.name) ?? "Collection"} — Selected`,
        (cur, tot) => setExportProgress({ current: cur, total: tot })
      );
      ue.success(
        `Exported ${selected.length} scan${selected.length !== 1 ? "s" : ""} as PDF`
      );
    } catch {
      ue.error("Failed to export PDF. Please try again.");
    } finally {
      setExportProgress(null);
      setSelectionMode(false);
      setSelectedIds(/* @__PURE__ */ new Set());
    }
  };
  const handleExportAll = async () => {
    if (scans.length === 0) return;
    try {
      setExportProgress({ current: 0, total: scans.length });
      await exportScansToPDF(
        scans,
        (collection == null ? void 0 : collection.name) ?? "Collection",
        (cur, tot) => setExportProgress({ current: cur, total: tot })
      );
      ue.success("Collection exported as PDF");
    } catch {
      ue.error("Failed to export PDF. Please try again.");
    } finally {
      setExportProgress(null);
    }
  };
  const confirmRemoveScan = scans.find((s) => s.id === confirmRemoveId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-4xl mx-auto px-4 py-8 animate-fade-in",
      "data-ocid": "collection-detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "gap-1.5 text-muted-foreground hover:text-foreground -ml-2 mb-5",
            onClick: () => navigate({ to: "/collections" }),
            "data-ocid": "collection-detail.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              "Collections"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: isLoadingCollection ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40 inline-block" }) : (collection == null ? void 0 : collection.name) ?? "Collection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-mono", children: [
                scans.length,
                " scan",
                scans.length !== 1 ? "s" : ""
              ] })
            ] })
          ] }),
          scans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            !selectionMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleExportAll,
                disabled: !!exportProgress,
                className: "gap-1.5 text-xs hidden sm:flex",
                "data-ocid": "collection-detail.export_all_button",
                children: [
                  exportProgress ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "w-3.5 h-3.5" }),
                  "Export All PDF"
                ]
              }
            ),
            selectionMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: handleSelectAll,
                  "data-ocid": "collection-detail.select_all_button",
                  children: selectedIds.size === scans.length ? "Deselect All" : "Select All"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  disabled: selectedIds.size === 0 || !!exportProgress,
                  onClick: handleExportSelected,
                  className: "gap-1.5",
                  "data-ocid": "collection-detail.export_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                    "Export PDF",
                    selectedIds.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "ml-0.5 h-4 px-1 text-xs font-mono",
                        children: selectedIds.size
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => {
                    setSelectionMode(false);
                    setSelectedIds(/* @__PURE__ */ new Set());
                  },
                  "data-ocid": "collection-detail.cancel_selection_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setSelectionMode(true),
                className: "gap-1.5",
                "data-ocid": "collection-detail.select_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5" }),
                  "Select"
                ]
              }
            )
          ] })
        ] }),
        exportProgress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card p-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExportProgress,
          {
            current: exportProgress.current,
            total: exportProgress.total
          }
        ) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }, k)) }) : scans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-12 text-center space-y-3 animate-fade-in",
            "data-ocid": "collection-detail.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-10 h-10 text-muted-foreground/40 mx-auto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Collection is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add scans from your history to this collection." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => navigate({ to: "/history" }),
                  "data-ocid": "collection-detail.go_history_button",
                  children: "Browse History"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: scans.map((scan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScanCard,
          {
            scan,
            index: i,
            collectionId,
            selected: selectedIds.has(scan.id),
            selectionMode,
            onToggleSelect: handleToggleSelect,
            onRemove: (_colId, scanId) => setConfirmRemoveId(scanId),
            onOpen: handleOpenScan
          },
          scan.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!confirmRemoveId,
            onOpenChange: (open) => {
              if (!open) setConfirmRemoveId(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DialogContent,
              {
                className: "sm:max-w-sm",
                "data-ocid": "collection-detail.remove_dialog",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Remove from Collection?" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: confirmRemoveScan ? `"${((_a = confirmRemoveScan.analysisResult.objects[0]) == null ? void 0 : _a.name) ?? "This scan"}" will be removed from this collection. The scan won't be deleted.` : "This scan will be removed from the collection." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        onClick: () => setConfirmRemoveId(null),
                        "data-ocid": "collection-detail.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "destructive",
                        onClick: () => {
                          if (confirmRemoveId) {
                            handleRemoveScan(collectionId, confirmRemoveId);
                            setConfirmRemoveId(null);
                          }
                        },
                        "data-ocid": "collection-detail.confirm_button",
                        children: "Remove"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  CollectionDetailPage
};
