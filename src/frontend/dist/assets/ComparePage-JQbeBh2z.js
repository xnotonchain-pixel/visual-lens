import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, g as Skeleton, A as AnalysisMode, S as ScanSearch } from "./index-BUSSrS1X.js";
import { B as Badge } from "./badge-tA_YrSZS.js";
import { B as Button, X } from "./button-DIJgVfI1.js";
import { u as useHistory } from "./useHistory-Cpl0QatJ.js";
import { E as ExternalLink } from "./external-link-tbseScov.js";
import { C as Car, B as BookOpen, L as Leaf } from "./leaf-Cdaw3APq.js";
import { S as Stethoscope } from "./stethoscope-S1B4AO-H.js";
import "./index-BsMJgQDJ.js";
import "./useMutation-Bk3bBMzH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
];
const ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
];
const GitCompare = createLucideIcon("git-compare", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
];
const Scan = createLucideIcon("scan", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
function formatTs(ts) {
  const ms = Number(ts / BigInt(1e6));
  const d = new Date(ms);
  return d.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
const MODE_META = {
  [AnalysisMode.generic]: {
    label: "Generic",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { className: "w-3 h-3" }),
    color: "oklch(0.72 0.16 195)"
  },
  [AnalysisMode.plant]: {
    label: "Plant ID",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-3 h-3" }),
    color: "oklch(0.68 0.18 140)"
  },
  [AnalysisMode.food]: {
    label: "Food Scanner",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-3 h-3" }),
    color: "oklch(0.72 0.16 30)"
  },
  [AnalysisMode.bookProduct]: {
    label: "Book/Product",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
    color: "oklch(0.65 0.16 270)"
  },
  [AnalysisMode.translation]: {
    label: "Translation",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3 h-3" }),
    color: "oklch(0.7 0.17 50)"
  },
  [AnalysisMode.artLandmark]: {
    label: "Art/Landmark",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3 h-3" }),
    color: "oklch(0.75 0.15 320)"
  },
  [AnalysisMode.receipt]: {
    label: "Receipt Parser",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3 h-3" }),
    color: "oklch(0.66 0.14 240)"
  },
  [AnalysisMode.medicalReference]: {
    label: "Medical Ref",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-3 h-3" }),
    color: "oklch(0.62 0.2 10)"
  },
  [AnalysisMode.carFashion]: {
    label: "Car/Fashion",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-3 h-3" }),
    color: "oklch(0.68 0.16 170)"
  }
};
function scanTitle(scan) {
  var _a;
  return ((_a = scan.analysisResult.objects[0]) == null ? void 0 : _a.name) ?? "Untitled Scan";
}
function ScanPicker({
  scans,
  alreadySelected,
  onSelect,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in",
      style: { background: "oklch(0.05 0.005 240 / 0.85)" },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card w-full max-w-sm flex flex-col",
          style: { maxHeight: "75vh" },
          "data-ocid": "compare.picker_dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Select a Scan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "compare.picker_close_button",
                  className: "w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
                  "aria-label": "Close picker",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto p-2 space-y-1 flex-1", children: scans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground text-center py-8",
                "data-ocid": "compare.picker_empty_state",
                children: "No scans in history yet."
              }
            ) : scans.map((scan, i) => {
              const title = scanTitle(scan);
              const disabled = alreadySelected.includes(scan.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled,
                  "data-ocid": `compare.picker_item.${i + 1}`,
                  onClick: () => {
                    if (!disabled) {
                      onSelect(scan);
                      onClose();
                    }
                  },
                  className: "w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-smooth text-left disabled:opacity-40 disabled:cursor-not-allowed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-sm overflow-hidden bg-muted flex-shrink-0 border border-border/40", children: scan.imageBase64 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: `data:${scan.mimeType};base64,${scan.imageBase64}`,
                        alt: title,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-4 h-4 text-muted-foreground/50" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: formatTs(scan.timestamp) })
                    ] }),
                    disabled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono flex-shrink-0", children: "selected" })
                  ]
                },
                scan.id
              );
            }) })
          ]
        }
      )
    }
  );
}
function ScanPanel({
  label,
  scan,
  uniqueObjects,
  onClear,
  panelIndex
}) {
  const mode = scan.mode;
  const meta = MODE_META[mode] ?? MODE_META[AnalysisMode.generic];
  const title = scanTitle(scan);
  const objects = scan.analysisResult.objects.slice(0, 6);
  const webResults = scan.analysisResult.webResults.slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "comparison-panel flex flex-col gap-4 animate-slide-up",
      "data-ocid": `compare.panel.${panelIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-mono border",
                  style: {
                    color: meta.color,
                    borderColor: `${meta.color.replace(")", " / 0.35)")}`,
                    background: `${meta.color.replace(")", " / 0.1)")}`
                  },
                  children: [
                    meta.icon,
                    meta.label
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground truncate", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: formatTs(scan.timestamp) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClear,
              "data-ocid": `compare.clear_button.${panelIndex}`,
              className: "w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth flex-shrink-0",
              "aria-label": "Clear panel",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-md overflow-hidden bg-muted border border-border/40 relative scan-overlay", children: scan.imageBase64 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: `data:${scan.mimeType};base64,${scan.imageBase64}`,
            alt: title,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-8 h-8 text-muted-foreground/30" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5", children: "Scene" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed line-clamp-4", children: scan.analysisResult.sceneDescription || "No description available." })
        ] }),
        objects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2", children: "Detected Objects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: objects.map((obj) => {
            const isUnique = uniqueObjects.has(obj.name.toLowerCase());
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 min-w-0", children: [
                isUnique && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    style: { background: "oklch(0.72 0.16 80)" },
                    title: "Unique to this scan"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-sm truncate capitalize ${isUnique ? "font-medium" : "text-foreground"}`,
                    style: isUnique ? { color: "oklch(0.82 0.14 80)" } : void 0,
                    children: obj.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1 rounded-full confidence-fill",
                    style: {
                      width: `${Math.round(obj.confidence * 100) * 0.4}px`,
                      minWidth: "12px",
                      background: isUnique ? "oklch(0.78 0.16 80)" : "oklch(0.72 0.16 195 / 0.6)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground w-8 text-right", children: [
                  Math.round(obj.confidence * 100),
                  "%"
                ] })
              ] })
            ] }, obj.name);
          }) }),
          uniqueObjects.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-1.5 h-1.5 rounded-full inline-block",
                style: { background: "oklch(0.72 0.16 80)" }
              }
            ),
            "Highlighted objects are unique to this scan"
          ] })
        ] }),
        scan.analysisResult.extractedText && scan.analysisResult.extractedText.trim().length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5", children: "Extracted Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-md p-3 border border-border/40",
              style: { background: "oklch(0.16 0.005 240)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground leading-relaxed line-clamp-5 whitespace-pre-wrap break-words", children: scan.analysisResult.extractedText })
            }
          )
        ] }),
        webResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2", children: "Web Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: webResults.map((result, webIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: result.url,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-ocid": `compare.web_result.${panelIndex}.${webIdx + 1}`,
              className: "block rounded-md p-2.5 border border-border/40 hover:border-primary/40 hover:bg-muted/30 transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-1 flex-1 min-w-0", children: result.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 mt-0.5 transition-smooth" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mt-0.5", children: result.snippet })
              ]
            },
            result.url
          )) })
        ] })
      ]
    }
  );
}
function EmptyPanel({
  label,
  onPick,
  panelIndex
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "comparison-panel flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border/40",
      "data-ocid": `compare.empty_panel.${panelIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-full flex items-center justify-center",
            style: { background: "oklch(0.18 0.008 240)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-6 h-6 text-muted-foreground/50" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pick a scan from your history" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: onPick,
            "data-ocid": `compare.select_button.${panelIndex}`,
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-3.5 h-3.5" }),
              "Select Scan"
            ]
          }
        )
      ]
    }
  );
}
function ComparePage() {
  const { history, isLoading } = useHistory();
  const [left, setLeft] = reactExports.useState(null);
  const [right, setRight] = reactExports.useState(null);
  const [picking, setPicking] = reactExports.useState(null);
  const handleSelect = (scan) => {
    if (picking === "left") setLeft(scan);
    else if (picking === "right") setRight(scan);
    setPicking(null);
  };
  const swap = () => {
    const tmp = left;
    setLeft(right);
    setRight(tmp);
  };
  const leftNames = new Set(
    ((left == null ? void 0 : left.analysisResult.objects) ?? []).map((o) => o.name.toLowerCase())
  );
  const rightNames = new Set(
    ((right == null ? void 0 : right.analysisResult.objects) ?? []).map((o) => o.name.toLowerCase())
  );
  const uniqueToLeft = new Set(
    [...leftNames].filter((n) => !rightNames.has(n))
  );
  const uniqueToRight = new Set(
    [...rightNames].filter((n) => !leftNames.has(n))
  );
  const selectedIds = [left == null ? void 0 : left.id, right == null ? void 0 : right.id].filter(Boolean);
  const insufficientScans = !isLoading && history.length < 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-[calc(100vh-3.5rem)]",
      "data-ocid": "compare.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "gap-1.5 text-muted-foreground hover:text-foreground h-8 px-2",
                onClick: () => {
                  setLeft(null);
                  setRight(null);
                },
                "data-ocid": "compare.reset_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  "Reset"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: "Compare Scans" })
            ] })
          ] }),
          left && right && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: swap,
              "data-ocid": "compare.swap_button",
              className: "gap-1.5 h-8 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-3.5 h-3.5" }),
                "Swap"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "comparison-layout",
            style: { minHeight: "400px" },
            "data-ocid": "compare.loading_state",
            children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-panel flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full rounded-md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" })
            ] }, i))
          }
        ) : insufficientScans ? (
          /* Not enough scans */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center gap-5 py-20 text-center",
              "data-ocid": "compare.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-full flex items-center justify-center",
                    style: { background: "oklch(0.18 0.008 240)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-7 h-7 text-muted-foreground/40" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg mb-1", children: "Not Enough Scans" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "You need at least 2 scans in your history to use the comparison tool. Capture or upload images to get started." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs font-mono", children: [
                  history.length,
                  " / 2 scans available"
                ] })
              ]
            }
          )
        ) : (
          /* Comparison layout */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "comparison-layout",
              style: { minHeight: "480px" },
              "data-ocid": "compare.layout",
              children: [
                left ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ScanPanel,
                  {
                    label: "Scan A",
                    scan: left,
                    uniqueObjects: uniqueToLeft,
                    onClear: () => setLeft(null),
                    panelIndex: 1
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EmptyPanel,
                  {
                    label: "Scan A",
                    onPick: () => setPicking("left"),
                    panelIndex: 1
                  }
                ),
                right ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ScanPanel,
                  {
                    label: "Scan B",
                    scan: right,
                    uniqueObjects: uniqueToRight,
                    onClear: () => setRight(null),
                    panelIndex: 2
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EmptyPanel,
                  {
                    label: "Scan B",
                    onPick: () => setPicking("right"),
                    panelIndex: 2
                  }
                )
              ]
            }
          )
        ) }),
        picking && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScanPicker,
          {
            scans: history,
            alreadySelected: selectedIds,
            onSelect: handleSelect,
            onClose: () => setPicking(null)
          }
        )
      ]
    }
  );
}
export {
  ComparePage
};
