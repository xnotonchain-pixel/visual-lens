import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, d as useQueryClient, e as createActor, s as Variant_trending_newest_mostLiked, r as reactExports, a as useLensStore, g as Skeleton, A as AnalysisMode } from "./index-BUSSrS1X.js";
import { B as Badge } from "./badge-tA_YrSZS.js";
import { X, B as Button } from "./button-DIJgVfI1.js";
import { I as Input } from "./input-Coz0Q6Kk.js";
import { S as Select, d as SelectTrigger, e as SelectValue, f as SelectContent, g as SelectItem } from "./select-Cn_z2xNC.js";
import { S as Separator } from "./separator-oANXWEIs.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-Bct3_tmY.js";
import { a as useActor, b as useQuery } from "./index-BsMJgQDJ.js";
import { u as useMutation } from "./useMutation-Bk3bBMzH.js";
import { u as ue } from "./index-Dj6-O_Jm.js";
import { R as Receipt, a as Landmark, L as Languages, u as useSharing } from "./useSharing-C-iVm0Rl.js";
import { T as Telescope, S as Sparkles, H as Heart } from "./telescope-DWEsQvFL.js";
import { S as Search } from "./search-DvsdJUFX.js";
import { G as Globe } from "./globe-CkmyvlhN.js";
import { C as Car, B as BookOpen, L as Leaf } from "./leaf-Cdaw3APq.js";
import { S as Stethoscope } from "./stethoscope-S1B4AO-H.js";
import { U as Utensils } from "./utensils-BPl_TLaE.js";
import { E as Eye } from "./eye-BU51gTh6.js";
import "./index-DRfQwiyb.js";
import "./index-L_N3zCbP.js";
import "./Combination-4bkKIxDf.js";
import "./index-CfT8_6mJ.js";
import "./chevron-down-DFNb-xQO.js";
import "./check-YBUVQFsO.js";
import "./index-DDjwEEde.js";
import "./index-c1I6fEgY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 2v8l3-3 3 3V2", key: "sqw3rj" }],
  [
    "path",
    {
      d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
      key: "k3hazp"
    }
  ]
];
const BookMarked = createLucideIcon("book-marked", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function toBackendFilter(f) {
  const sortMap = {
    newest: Variant_trending_newest_mostLiked.newest,
    mostLiked: Variant_trending_newest_mostLiked.mostLiked,
    trending: Variant_trending_newest_mostLiked.trending
  };
  return {
    keyword: f.keyword || void 0,
    mode: f.mode || void 0,
    sortBy: sortMap[f.sortBy],
    limit: BigInt(f.limit),
    offset: BigInt(f.offset)
  };
}
function useDiscoveryFeed(filter) {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  return useQuery({
    queryKey: ["discoveryFeed", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicDiscoveryFeed(toBackendFilter(filter));
    },
    enabled: !!actor && !isActorLoading,
    staleTime: 3e4
  });
}
function useLikeScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (discoveryId) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.likeDiscoveryScan(discoveryId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["discoveryFeed"] });
    }
  });
}
const MODE_META = {
  [AnalysisMode.generic]: {
    label: "Generic",
    icon: Sparkles,
    cssVar: "--mode-generic",
    colorClass: "text-[oklch(0.72_0.16_195)]"
  },
  [AnalysisMode.plant]: {
    label: "Plant",
    icon: Leaf,
    cssVar: "--mode-plant",
    colorClass: "text-[oklch(0.68_0.18_140)]"
  },
  [AnalysisMode.food]: {
    label: "Food",
    icon: Utensils,
    cssVar: "--mode-food",
    colorClass: "text-[oklch(0.72_0.16_30)]"
  },
  [AnalysisMode.bookProduct]: {
    label: "Book & Product",
    icon: BookOpen,
    cssVar: "--mode-book",
    colorClass: "text-[oklch(0.65_0.16_270)]"
  },
  [AnalysisMode.translation]: {
    label: "Translation",
    icon: Languages,
    cssVar: "--mode-translation",
    colorClass: "text-[oklch(0.7_0.17_50)]"
  },
  [AnalysisMode.artLandmark]: {
    label: "Art & Landmark",
    icon: Landmark,
    cssVar: "--mode-art",
    colorClass: "text-[oklch(0.75_0.15_320)]"
  },
  [AnalysisMode.receipt]: {
    label: "Receipt",
    icon: Receipt,
    cssVar: "--mode-receipt",
    colorClass: "text-[oklch(0.66_0.14_240)]"
  },
  [AnalysisMode.medicalReference]: {
    label: "Medical",
    icon: Stethoscope,
    cssVar: "--mode-medical",
    colorClass: "text-[oklch(0.62_0.2_10)]"
  },
  [AnalysisMode.carFashion]: {
    label: "Car & Fashion",
    icon: Car,
    cssVar: "--mode-car",
    colorClass: "text-[oklch(0.68_0.16_170)]"
  }
};
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "mostLiked", label: "Most Liked" },
  { value: "trending", label: "Trending" }
];
const MODE_OPTIONS = [
  { value: "all", label: "All Modes" },
  ...Object.entries(MODE_META).map(([k, v]) => ({
    value: k,
    label: v.label
  }))
];
const PAGE_SIZE = 20;
function ScanCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card overflow-hidden animate-pulse",
      "data-ocid": "discovery.card.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
          ] })
        ] })
      ]
    }
  );
}
function ScanCard({ scan, index, likedIds, onLike, onOpen }) {
  const meta = MODE_META[scan.analysisMode] ?? MODE_META[AnalysisMode.generic];
  const Icon = meta.icon;
  const isLiked = likedIds.has(scan.id);
  const title = scan.title || scan.analysisResult.sceneDescription.slice(0, 60) || "Untitled scan";
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: card grid doesn't need keyboard handler
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-card overflow-hidden group cursor-pointer transition-smooth hover:scale-[1.02] hover:glow-border animate-slide-up",
        style: { animationDelay: `${index % 20 * 0.04}s` },
        onClick: () => onOpen(scan),
        "data-ocid": `discovery.card.item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/3] relative overflow-hidden bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: `data:image/jpeg;base64,${scan.imageBase64}`,
                alt: title,
                className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium font-mono bg-background/80 backdrop-blur-sm border border-border/60",
                style: { color: `oklch(var(${meta.cssVar}))` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                  meta.label
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/60 transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                onClick: (e) => {
                  e.stopPropagation();
                  onLike(scan.id);
                },
                "aria-label": isLiked ? "Unlike" : "Like",
                "data-ocid": `discovery.like_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: `w-3.5 h-3.5 transition-smooth ${isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"}`
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-body font-medium text-foreground line-clamp-2 leading-snug", children: title }),
            scan.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              scan.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center px-1.5 py-0 text-[10px] rounded-sm font-mono bg-muted text-muted-foreground border border-border/50",
                  children: [
                    "#",
                    tag
                  ]
                },
                tag
              )),
              scan.tags.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
                "+",
                scan.tags.length - 3
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3" }),
                  Number(scan.likeCount)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                  Number(scan.viewCount)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: new Date(Number(scan.createdAt) / 1e6).toLocaleDateString() })
            ] })
          ] })
        ]
      }
    )
  );
}
function DetailDrawer({
  scan,
  likedIds,
  onLike,
  onClose,
  collections
}) {
  const { saveToMyHistory, isSavingToHistory } = useSharing();
  const { actor } = useActor(createActor);
  const [addingToCollection, setAddingToCollection] = reactExports.useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = reactExports.useState("");
  const addToCollMutation = useMutation({
    mutationFn: async ({
      collectionId,
      scanId
    }) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addScanToCollection(collectionId, scanId);
    },
    onSuccess: () => {
      ue.success("Added to collection");
      setAddingToCollection(false);
    },
    onError: () => ue.error("Failed to add to collection")
  });
  if (!scan) return null;
  const meta = MODE_META[scan.analysisMode] ?? MODE_META[AnalysisMode.generic];
  const Icon = meta.icon;
  const isLiked = likedIds.has(scan.id);
  const title = scan.title || scan.analysisResult.sceneDescription.slice(0, 80) || "Untitled scan";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!scan, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:max-w-xl bg-card border-l border-border overflow-y-auto",
      "data-ocid": "discovery.detail.sheet",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-mono border border-border/50",
                style: { color: `oklch(var(${meta.cssVar}))` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                  meta.label
                ]
              }
            ),
            scan.privacy === "open" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shared-badge", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "shared-badge-icon" }),
              "Public"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-foreground text-left font-display leading-snug mt-2", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-md overflow-hidden border border-border mb-5 scan-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: `data:image/jpeg;base64,${scan.imageBase64}`,
            alt: title,
            className: "w-full object-contain max-h-80"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border transition-smooth hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isLiked ? "bg-destructive/10 border-destructive/40 text-destructive" : "bg-muted border-border text-muted-foreground hover:border-destructive/40"}`,
              onClick: () => onLike(scan.id),
              "data-ocid": "discovery.detail.like_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${isLiked ? "fill-current" : ""}` }),
                Number(scan.likeCount),
                " likes"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
            Number(scan.viewCount),
            " views"
          ] })
        ] }),
        scan.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: scan.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-xs font-mono border-border/60",
            children: [
              "#",
              tag
            ]
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [
          scan.analysisResult.sceneDescription && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5", children: "Scene Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: scan.analysisResult.sceneDescription })
          ] }),
          scan.analysisResult.objects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2", children: "Detected Objects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: scan.analysisResult.objects.map((obj) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted border border-border/60 text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: obj.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
                    Math.round(obj.confidence * 100),
                    "%"
                  ] })
                ]
              },
              obj.name
            )) })
          ] }),
          scan.analysisResult.extractedText && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5", children: "Extracted Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono text-foreground bg-muted/50 border border-border/40 rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-words max-h-32", children: scan.analysisResult.extractedText })
          ] }),
          scan.analysisResult.webResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2", children: "Web Results" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: scan.analysisResult.webResults.slice(0, 5).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: r.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block glass-card p-2.5 hover:bg-muted/50 transition-smooth group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary group-hover:underline font-medium line-clamp-1", children: r.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground line-clamp-2 mt-0.5", children: r.snippet })
                ]
              },
              r.url
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start gap-2",
              onClick: () => {
                if (scan.scanId) {
                  saveToMyHistory(scan.scanId);
                  ue.success("Saved to your history");
                }
              },
              disabled: isSavingToHistory,
              "data-ocid": "discovery.detail.save_history_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-4 h-4" }),
                "Save to My History"
              ]
            }
          ),
          !addingToCollection ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start gap-2",
              onClick: () => setAddingToCollection(true),
              disabled: collections.length === 0,
              "data-ocid": "discovery.detail.add_collection_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
                collections.length === 0 ? "No collections yet" : "Add to Collection"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-2",
              "data-ocid": "discovery.detail.collection_picker",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: selectedCollectionId,
                    onValueChange: setSelectedCollectionId,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "flex-1 h-9 text-sm",
                          "data-ocid": "discovery.detail.collection_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pick a collection…" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: collections.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    disabled: !selectedCollectionId || addToCollMutation.isPending,
                    onClick: () => addToCollMutation.mutate({
                      collectionId: selectedCollectionId,
                      scanId: scan.scanId
                    }),
                    "data-ocid": "discovery.detail.confirm_button",
                    children: "Add"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    onClick: () => setAddingToCollection(false),
                    "data-ocid": "discovery.detail.cancel_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function DiscoveryPage() {
  const [keyword, setKeyword] = reactExports.useState("");
  const [debouncedKeyword, setDebouncedKeyword] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("newest");
  const [modeFilter, setModeFilter] = reactExports.useState("all");
  const [offset, setOffset] = reactExports.useState(0);
  const [allScans, setAllScans] = reactExports.useState([]);
  const [likedIds, setLikedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [selectedScan, setSelectedScan] = reactExports.useState(null);
  const likeScan = useLikeScan();
  const { actor } = useActor(createActor);
  const collections = useLensStore((s) => s.collections);
  const handleKeywordChange = reactExports.useCallback((val) => {
    setKeyword(val);
    clearTimeout(
      handleKeywordChange._t
    );
    handleKeywordChange._t = setTimeout(() => setDebouncedKeyword(val), 400);
  }, []);
  const filter = reactExports.useMemo(
    () => ({
      keyword: debouncedKeyword || void 0,
      mode: modeFilter === "all" ? void 0 : modeFilter,
      sortBy,
      limit: PAGE_SIZE,
      offset
    }),
    [debouncedKeyword, modeFilter, sortBy, offset]
  );
  const { data: pageData, isFetching, isError } = useDiscoveryFeed(filter);
  const displayScans = reactExports.useMemo(() => {
    if (!pageData) return allScans;
    if (offset === 0) return pageData;
    return [...allScans.slice(0, offset), ...pageData];
  }, [pageData, allScans, offset]);
  reactExports.useMemo(() => {
    if (pageData && offset === 0) setAllScans(pageData);
  }, [pageData, offset]);
  const hasMore = ((pageData == null ? void 0 : pageData.length) ?? 0) === PAGE_SIZE;
  function applyFilter() {
    setOffset(0);
    setAllScans([]);
  }
  const handleSortChange = (v) => {
    setSortBy(v);
    applyFilter();
  };
  const handleModeChange = (v) => {
    setModeFilter(v);
    applyFilter();
  };
  const handleKeywordSubmit = () => {
    setDebouncedKeyword(keyword);
    applyFilter();
  };
  const handleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    likeScan.mutate(id, {
      onError: () => {
        setLikedIds((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
        ue.error("Failed to like scan");
      }
    });
  };
  const handleLoadMore = () => {
    setOffset((prev) => prev + PAGE_SIZE);
  };
  const { data: fetchedCollections } = useQuery({
    queryKey: ["userCollections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserCollections();
    },
    enabled: !!actor
  });
  const resolvedCollections = fetchedCollections ?? collections;
  const isInitialLoading = isFetching && offset === 0 && displayScans.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-7xl mx-auto px-4 py-6 space-y-6",
      "data-ocid": "discovery.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Telescope, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Discovery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Browse scans shared by the Visual Lens community" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card p-3 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center",
            "data-ocid": "discovery.filters.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Search by keyword…",
                    className: "pl-8 h-8 text-sm bg-muted/50 border-border/60",
                    value: keyword,
                    onChange: (e) => handleKeywordChange(e.target.value),
                    onKeyDown: (e) => e.key === "Enter" && handleKeywordSubmit(),
                    "data-ocid": "discovery.search_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: modeFilter,
                  onValueChange: (v) => handleModeChange(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      SelectTrigger,
                      {
                        className: "h-8 w-full sm:w-44 text-sm bg-muted/50 border-border/60",
                        "data-ocid": "discovery.mode_filter.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5 text-muted-foreground mr-1 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MODE_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: sortBy,
                  onValueChange: (v) => handleSortChange(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 w-full sm:w-44 text-sm bg-muted/50 border-border/60",
                        "data-ocid": "discovery.sort.select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
                  ]
                }
              )
            ]
          }
        ),
        !isInitialLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-muted-foreground font-mono",
            "data-ocid": "discovery.results_count",
            children: displayScans.length > 0 ? `${displayScans.length} scan${displayScans.length !== 1 ? "s" : ""} found` : ""
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-card p-6 text-center text-destructive text-sm",
            "data-ocid": "discovery.error_state",
            children: "Failed to load discovery feed. Please try again."
          }
        ),
        isInitialLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3",
            "data-ocid": "discovery.grid.loading_state",
            children: Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanCardSkeleton, {}, `sk-init-${i}`)
            ))
          }
        ),
        !isInitialLoading && !isError && displayScans.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 gap-4",
            "data-ocid": "discovery.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-10 h-10 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1", children: debouncedKeyword || modeFilter !== "all" ? "No matching scans" : "No public scans yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: debouncedKeyword || modeFilter !== "all" ? "Try adjusting your filters or clearing the search." : "Be the first to share a scan with the community!" })
              ] }),
              (debouncedKeyword || modeFilter !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    setKeyword("");
                    setDebouncedKeyword("");
                    setModeFilter("all");
                    applyFilter();
                  },
                  "data-ocid": "discovery.clear_filters_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
                    "Clear Filters"
                  ]
                }
              )
            ]
          }
        ),
        !isInitialLoading && displayScans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3",
            "data-ocid": "discovery.grid.list",
            children: [
              displayScans.map((scan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ScanCard,
                {
                  scan,
                  index: i,
                  likedIds,
                  onLike: handleLike,
                  onOpen: setSelectedScan
                },
                scan.id
              )),
              isFetching && offset > 0 && Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanCardSkeleton, {}, `sk-more-${i}`)
              ))
            ]
          }
        ),
        !isInitialLoading && hasMore && !isFetching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: handleLoadMore,
            className: "w-full sm:w-auto",
            "data-ocid": "discovery.load_more_button",
            children: "Load More"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DetailDrawer,
          {
            scan: selectedScan,
            likedIds,
            onLike: handleLike,
            onClose: () => setSelectedScan(null),
            collections: resolvedCollections
          }
        )
      ]
    }
  );
}
export {
  DiscoveryPage
};
