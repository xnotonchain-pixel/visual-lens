import { c as createLucideIcon, h as useParams, u as useNavigate, i as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, g as Skeleton, S as ScanSearch, C as Camera, A as AnalysisMode, F as FolderOpen } from "./index-BUSSrS1X.js";
import { B as Button } from "./button-DIJgVfI1.js";
import { u as useCollections, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./useCollections-BLnssFjP.js";
import { I as Input } from "./input-Coz0Q6Kk.js";
import { F as FileText, L as Label } from "./label-COTuiXCt.js";
import { u as ue } from "./index-Dj6-O_Jm.js";
import { b as useSharedScan, u as useSharing, R as Receipt, a as Landmark, L as Languages } from "./useSharing-C-iVm0Rl.js";
import { C as Car, B as BookOpen, L as Leaf } from "./leaf-Cdaw3APq.js";
import { U as Utensils } from "./utensils-BPl_TLaE.js";
import { G as Globe } from "./globe-CkmyvlhN.js";
import { T as Tag } from "./tag-udTq4-YW.js";
import { S as ScanLine } from "./scan-line-D013sVJa.js";
import { E as ExternalLink } from "./external-link-tbseScov.js";
import { C as Check } from "./check-YBUVQFsO.js";
import { P as Plus } from "./plus-Bf6BfWwF.js";
import "./index-BsMJgQDJ.js";
import "./index-Bct3_tmY.js";
import "./index-L_N3zCbP.js";
import "./Combination-4bkKIxDf.js";
import "./index-c1I6fEgY.js";
import "./useMutation-Bk3bBMzH.js";
import "./index-DDjwEEde.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
  ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }]
];
const BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
];
const HeartPulse = createLucideIcon("heart-pulse", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
const MODE_META = {
  [AnalysisMode.generic]: {
    label: "Generic",
    icon: ScanSearch,
    color: "text-primary"
  },
  [AnalysisMode.plant]: {
    label: "Plant ID",
    icon: Leaf,
    color: "text-[oklch(0.68_0.18_140)]"
  },
  [AnalysisMode.food]: {
    label: "Food Scanner",
    icon: Utensils,
    color: "text-[oklch(0.72_0.16_30)]"
  },
  [AnalysisMode.bookProduct]: {
    label: "Book / Product",
    icon: BookOpen,
    color: "text-[oklch(0.65_0.16_270)]"
  },
  [AnalysisMode.translation]: {
    label: "Translation",
    icon: Languages,
    color: "text-[oklch(0.7_0.17_50)]"
  },
  [AnalysisMode.artLandmark]: {
    label: "Art / Landmark",
    icon: Landmark,
    color: "text-[oklch(0.75_0.15_320)]"
  },
  [AnalysisMode.receipt]: {
    label: "Receipt Parser",
    icon: Receipt,
    color: "text-[oklch(0.66_0.14_240)]"
  },
  [AnalysisMode.medicalReference]: {
    label: "Medical Ref.",
    icon: HeartPulse,
    color: "text-[oklch(0.62_0.2_10)]"
  },
  [AnalysisMode.carFashion]: {
    label: "Car / Fashion",
    icon: Car,
    color: "text-[oklch(0.68_0.16_170)]"
  }
};
function ObjectChip({ obj, index }) {
  const pct = Math.round(obj.confidence * 100);
  const isHigh = pct >= 75;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card px-3 py-2 flex flex-col gap-1.5 animate-slide-up",
      style: { animationDelay: `${index * 0.05 + 0.1}s` },
      "data-ocid": `shared.object.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground capitalize truncate", children: obj.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-xs font-mono font-semibold ${isHigh ? "text-secondary" : "text-muted-foreground"}`,
              children: [
                pct,
                "%"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full confidence-fill ${isHigh ? "bg-secondary" : "bg-muted-foreground"}`,
            style: { width: `${pct}%` }
          }
        ) })
      ]
    }
  );
}
function WebResultCard({
  result,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: result.url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "glass-card p-4 flex flex-col gap-1.5 hover:border-primary/50 transition-smooth group animate-slide-up",
      style: { animationDelay: `${index * 0.06 + 0.2}s` },
      "data-ocid": `shared.web_result.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-2 flex-1", children: result.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-smooth" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-mono truncate", children: result.url }),
        result.snippet && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: result.snippet })
      ]
    }
  );
}
function SectionLabel({
  icon: Icon,
  label,
  accent = "primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${accent === "secondary" ? "text-secondary" : "text-primary"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
        label
      ]
    }
  );
}
function CollectionPickerDialog({
  open,
  onClose,
  onSave
}) {
  const { collections, isLoading, createCollection, isCreating } = useCollections();
  const [creating, setCreating] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (creating && inputRef.current) {
      setTimeout(() => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      }, 50);
    }
  }, [creating]);
  const handleCreateAndSave = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    createCollection(trimmed, {
      onSuccess: (newId) => {
        onSave(newId, trimmed);
        setNewName("");
        setCreating(false);
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass-card border-border max-w-sm",
      "data-ocid": "shared.collection_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 text-primary" }),
          "Save to Collection"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-1", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
          ] }) : collections.length === 0 && !creating ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-2", children: "No collections yet. Create one below." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-52 overflow-y-auto pr-1", children: collections.map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onSave(col.id, col.name),
              className: "w-full text-left glass-card px-3 py-2.5 hover:border-primary/50 transition-smooth flex items-center justify-between gap-2 group",
              "data-ocid": `shared.collection_option.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground group-hover:text-primary transition-smooth truncate", children: col.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground flex-shrink-0", children: [
                  col.scanIds.length,
                  " scan",
                  col.scanIds.length !== 1 ? "s" : ""
                ] })
              ]
            },
            col.id
          )) }),
          creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "Collection Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                ref: inputRef,
                value: newName,
                onChange: (e) => setNewName(e.target.value),
                placeholder: "e.g. Plants, Food, Travel…",
                className: "bg-input border-border",
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleCreateAndSave();
                  if (e.key === "Escape") {
                    setCreating(false);
                    setNewName("");
                  }
                },
                "data-ocid": "shared.collection_name_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handleCreateAndSave,
                  disabled: !newName.trim() || isCreating,
                  className: "flex-1 gap-1.5",
                  "data-ocid": "shared.create_collection_confirm_button",
                  children: isCreating ? "Creating…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                    "Create & Save"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => {
                    setCreating(false);
                    setNewName("");
                  },
                  "data-ocid": "shared.create_collection_cancel_button",
                  children: "Cancel"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "w-full gap-1.5 border-dashed",
              onClick: () => setCreating(true),
              "data-ocid": "shared.new_collection_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "New Collection"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full text-muted-foreground",
              onClick: onClose,
              "data-ocid": "shared.collection_dialog_cancel_button",
              children: "Cancel"
            }
          )
        ] })
      ]
    }
  ) });
}
function LoginPromptDialog({
  open,
  onClose,
  onLogin
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "glass-card border-border max-w-xs text-center",
      "data-ocid": "shared.login_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: "Sign In to Save" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Log in with Internet Identity to save this scan to your collection." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: onLogin,
              className: "gap-2",
              "data-ocid": "shared.login_confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                "Sign In"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              "data-ocid": "shared.login_cancel_button",
              children: "Maybe Later"
            }
          )
        ] })
      ]
    }
  ) });
}
function SharedScanPage() {
  const { token } = useParams({ from: "/shared/$token" });
  const navigate = useNavigate();
  const { isAuthenticated, login } = useInternetIdentity();
  const { data: scan, isLoading } = useSharedScan(token);
  const { saveToMyHistory, isSavingToHistory } = useSharing();
  const { addScan } = useCollections();
  const [showLoginDialog, setShowLoginDialog] = reactExports.useState(false);
  const [showCollectionDialog, setShowCollectionDialog] = reactExports.useState(false);
  const [savedCollection, setSavedCollection] = reactExports.useState(null);
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
  reactExports.useEffect(() => {
    if (isLoggedIn && showLoginDialog) {
      setShowLoginDialog(false);
      setShowCollectionDialog(true);
    }
  }, [isLoggedIn, showLoginDialog]);
  const handleSaveToCollection = (collectionId, collectionName) => {
    setShowCollectionDialog(false);
    saveToMyHistory(token, {
      onSuccess: (scanId) => {
        addScan(
          { collectionId, scanId },
          {
            onSuccess: () => {
              setSavedCollection(collectionName);
              ue.success(`Saved to "${collectionName}"`, {
                description: "You can find this scan in your collection.",
                duration: 4e3
              });
            },
            onError: () => {
              setSavedCollection(collectionName);
              ue.success("Saved to your history", {
                description: "Couldn't add to collection, but it's in History."
              });
            }
          }
        );
      },
      onError: () => {
        ue.error("Save failed", {
          description: "Please try again."
        });
      }
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-4xl mx-auto px-4 py-12 space-y-5",
        "data-ocid": "shared.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-36" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 w-full rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-md" })
          ] })
        ]
      }
    );
  }
  if (!scan) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 flex flex-col items-center justify-center px-4 py-20 text-center gap-6 animate-fade-in",
        "data-ocid": "shared.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/50 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "This scan link is no longer available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "The shared scan may have been removed or the link has expired." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "gap-2",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "shared.go_home_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                "Create your own scan"
              ]
            }
          )
        ]
      }
    );
  }
  const { objects, extractedText, sceneDescription, webResults } = scan.analysisResult;
  const modeMeta = MODE_META[scan.mode] ?? MODE_META[AnalysisMode.generic];
  const ModeIcon = modeMeta.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in",
        "data-ocid": "shared.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap animate-slide-up stagger-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shared-badge", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "shared-badge-icon" }),
                "Shared Scan"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-mono font-medium bg-muted border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ModeIcon, { className: `w-3.5 h-3.5 ${modeMeta.color}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: modeMeta.label })
              ] })
            ] }),
            savedCollection ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: true,
                className: "gap-1.5 border-primary/40 text-primary",
                "data-ocid": "shared.saved_indicator",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-3.5 h-3.5" }),
                  "Saved to ",
                  savedCollection
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "gap-1.5",
                onClick: handleSaveCTA,
                disabled: isSavingToHistory,
                "data-ocid": "shared.save_button",
                children: isSavingToHistory ? "Saving…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-3.5 h-3.5" }),
                  "Save to My Collection"
                ] })
              }
            )
          ] }),
          scan.imageBase64 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-card overflow-hidden scan-overlay animate-slide-up stagger-2",
              "data-ocid": "shared.image",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: `data:${scan.mimeType};base64,${scan.imageBase64}`,
                  alt: "Shared scan preview",
                  className: "w-full max-h-72 object-cover"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card p-5 space-y-3 animate-slide-up stagger-2",
              "data-ocid": "shared.scene_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { icon: Tag, label: "Scene Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm leading-relaxed", children: sceneDescription || "No scene description available." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card p-5 space-y-4 animate-slide-up stagger-3",
              "data-ocid": "shared.objects_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionLabel,
                  {
                    icon: ScanLine,
                    label: "Detected Objects",
                    accent: "secondary"
                  }
                ),
                objects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2", children: objects.map((obj, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ObjectChip, { obj, index: i }, `${obj.name}-${i}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-muted-foreground italic",
                    "data-ocid": "shared.objects.empty_state",
                    children: "No objects detected in this image."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-card p-5 space-y-3 animate-slide-up stagger-3",
              "data-ocid": "shared.text_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionLabel,
                  {
                    icon: FileText,
                    label: "Extracted Text (OCR)",
                    accent: "secondary"
                  }
                ),
                extractedText ? /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-foreground font-mono whitespace-pre-wrap break-words bg-muted/20 rounded-lg p-3 border border-border/40 leading-relaxed", children: extractedText }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-muted-foreground italic",
                    "data-ocid": "shared.text.empty_state",
                    children: "No text detected in this image."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-3 animate-slide-up stagger-4",
              "data-ocid": "shared.web_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest px-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
                  "Web Search Results"
                ] }),
                webResults.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: webResults.map((result, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WebResultCard, { result, index: i }, result.url)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "glass-card p-5 text-center",
                    "data-ocid": "shared.web.empty_state",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No web results found for this image." })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 pt-4 pb-10 animate-slide-up stagger-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Visual Lens · Powered by Venice AI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "gap-2 font-semibold px-8",
                onClick: () => navigate({ to: "/" }),
                "data-ocid": "shared.create_scan_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                  "Create your own scan"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoginPromptDialog,
      {
        open: showLoginDialog,
        onClose: () => setShowLoginDialog(false),
        onLogin: handleLogin
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollectionPickerDialog,
      {
        open: showCollectionDialog,
        onClose: () => setShowCollectionDialog(false),
        onSave: handleSaveToCollection
      }
    )
  ] });
}
export {
  SharedScanPage
};
