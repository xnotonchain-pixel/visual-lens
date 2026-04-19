import { c as createLucideIcon, k as Variant_tagBased_flat, l as Variant_auto_dark_light, m as Variant_csv_pdf_json, n as Variant_open_unlisted_onlyMe, V as Variant_aggressive_subtle_moderate, o as Variant_stacked_compact_sideBySide, p as Variant_detailed_compact_standard, d as useQueryClient, e as createActor, r as reactExports, j as jsxRuntimeExports, q as Settings, g as Skeleton, b as cn } from "./index-BUSSrS1X.js";
import { B as Badge } from "./badge-tA_YrSZS.js";
import { S as Select, d as SelectTrigger, e as SelectValue, f as SelectContent, g as SelectItem } from "./select-Cn_z2xNC.js";
import { S as Separator } from "./separator-oANXWEIs.js";
import { S as Switch, L as Lock } from "./switch-CSKCPbdD.js";
import { a as useActor, b as useQuery } from "./index-BsMJgQDJ.js";
import { u as useMutation } from "./useMutation-Bk3bBMzH.js";
import { u as ue } from "./index-Dj6-O_Jm.js";
import { G as Globe } from "./globe-CkmyvlhN.js";
import { T as Tag } from "./tag-udTq4-YW.js";
import { C as Clock } from "./clock-BO6KhQ0e.js";
import { D as Download } from "./download-CE9kC546.js";
import "./index-DRfQwiyb.js";
import "./index-L_N3zCbP.js";
import "./Combination-4bkKIxDf.js";
import "./index-CfT8_6mJ.js";
import "./chevron-down-DFNb-xQO.js";
import "./check-YBUVQFsO.js";
import "./index-DDjwEEde.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const DEFAULT_SETTINGS = {
  webSearchEnabled: true,
  resultDetailLevel: Variant_detailed_compact_standard.standard,
  scanResultLayout: Variant_stacked_compact_sideBySide.sideBySide,
  showConfidenceScores: true,
  tagAggressiveness: Variant_aggressive_subtle_moderate.moderate,
  autoSaveScans: true,
  defaultScanPrivacy: Variant_open_unlisted_onlyMe.onlyMe,
  historyRetentionDays: void 0,
  exportFormat: Variant_csv_pdf_json.pdf,
  theme: Variant_auto_dark_light.dark,
  language: "en",
  collectionOrganizationMode: Variant_tagBased_flat.flat
};
function useSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      if (!actor) return DEFAULT_SETTINGS;
      const result = await actor.getUserSettings();
      return result ?? DEFAULT_SETTINGS;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
  });
}
function useSaveSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveUserSettings(settings);
      return settings;
    },
    onSuccess: (settings) => {
      queryClient.setQueryData(["userSettings"], settings);
      ue.success("Settings saved", {
        duration: 2e3,
        id: "settings-saved"
      });
    },
    onError: () => {
      ue.error("Failed to save settings. Please try again.");
    }
  });
}
function SegmentedControl({
  options,
  value,
  onChange,
  ocidPrefix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-md border border-border overflow-hidden", children: options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange(opt.value),
      "data-ocid": `${ocidPrefix}.${opt.value}`,
      className: cn(
        "flex-1 px-3 py-1.5 text-xs font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
        i !== 0 && "border-l border-border",
        value === opt.value ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
      ),
      children: opt.label
    },
    opt.value
  )) });
}
function SettingRow({
  label,
  description,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between gap-4 py-3",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children })
      ]
    }
  );
}
function SectionCard({
  icon: Icon,
  title,
  accent,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center w-7 h-7 rounded-md",
          style: {
            backgroundColor: accent ? `oklch(${accent} / 0.15)` : void 0
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: "w-4 h-4",
              style: { color: accent ? `oklch(${accent})` : void 0 },
              strokeWidth: 1.75
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-3 opacity-50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children })
  ] });
}
function SettingsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["a", "b", "c", "d", "e"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
    ] })
  ] }, key)) });
}
function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const { mutate: saveSettings, isPending } = useSaveSettings();
  const saveTimerRef = reactExports.useRef(null);
  const pendingRef = reactExports.useRef(null);
  const update = reactExports.useCallback(
    (patch) => {
      const current = pendingRef.current ?? settings ?? DEFAULT_SETTINGS;
      const updated = { ...current, ...patch };
      pendingRef.current = updated;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        if (pendingRef.current) {
          saveSettings(pendingRef.current);
          pendingRef.current = null;
        }
      }, 400);
    },
    [settings, saveSettings]
  );
  const s = settings ?? DEFAULT_SETTINGS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container max-w-3xl mx-auto px-4 py-8",
      "data-ocid": "settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 text-primary", strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground tracking-tight", children: "Settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Preferences are saved automatically" })
          ] }),
          isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "ml-auto text-xs text-muted-foreground animate-pulse",
              "data-ocid": "settings.saving_state",
              children: "Saving…"
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SectionCard,
            {
              icon: ChartNoAxesColumn,
              title: "Analysis Preferences",
              accent: "0.72 0.16 195",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    label: "Web Search",
                    description: "Include web search results alongside AI analysis",
                    ocid: "settings.web_search_row",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: s.webSearchEnabled,
                        onCheckedChange: (v) => update({ webSearchEnabled: v }),
                        "data-ocid": "settings.web_search_toggle"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    label: "Result Detail Level",
                    description: "How much detail to show in analysis results",
                    ocid: "settings.result_detail_row",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SegmentedControl,
                      {
                        options: [
                          {
                            value: Variant_detailed_compact_standard.compact,
                            label: "Compact"
                          },
                          {
                            value: Variant_detailed_compact_standard.standard,
                            label: "Standard"
                          },
                          {
                            value: Variant_detailed_compact_standard.detailed,
                            label: "Detailed"
                          }
                        ],
                        value: s.resultDetailLevel,
                        onChange: (v) => update({ resultDetailLevel: v }),
                        ocidPrefix: "settings.result_detail"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    label: "Scan Result Layout",
                    description: "How to display image and results",
                    ocid: "settings.layout_row",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SegmentedControl,
                      {
                        options: [
                          {
                            value: Variant_stacked_compact_sideBySide.sideBySide,
                            label: "Side by Side"
                          },
                          {
                            value: Variant_stacked_compact_sideBySide.stacked,
                            label: "Stacked"
                          },
                          {
                            value: Variant_stacked_compact_sideBySide.compact,
                            label: "Compact"
                          }
                        ],
                        value: s.scanResultLayout,
                        onChange: (v) => update({ scanResultLayout: v }),
                        ocidPrefix: "settings.scan_layout"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    label: "Show Confidence Scores",
                    description: "Display percentage confidence for detected objects",
                    ocid: "settings.confidence_row",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: s.showConfidenceScores,
                        onCheckedChange: (v) => update({ showConfidenceScores: v }),
                        "data-ocid": "settings.confidence_toggle"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { icon: Brain, title: "AI & Tagging", accent: "0.78 0.16 80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingRow,
              {
                label: "Tag Aggressiveness",
                description: "Subtle: 3–5 tags · Moderate: 5–10 tags · Aggressive: 10–20 tags",
                ocid: "settings.tag_aggression_row",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SegmentedControl,
                  {
                    options: [
                      {
                        value: Variant_aggressive_subtle_moderate.subtle,
                        label: "Subtle"
                      },
                      {
                        value: Variant_aggressive_subtle_moderate.moderate,
                        label: "Moderate"
                      },
                      {
                        value: Variant_aggressive_subtle_moderate.aggressive,
                        label: "Aggressive"
                      }
                    ],
                    value: s.tagAggressiveness,
                    onChange: (v) => update({ tagAggressiveness: v }),
                    ocidPrefix: "settings.tag_aggression"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingRow,
              {
                label: "Auto-Save Scans",
                description: "Automatically save scans to history after analysis",
                ocid: "settings.autosave_row",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: s.autoSaveScans,
                    onCheckedChange: (v) => update({ autoSaveScans: v }),
                    "data-ocid": "settings.autosave_toggle"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SectionCard,
            {
              icon: Shield,
              title: "Privacy & Sharing",
              accent: "0.62 0.2 10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    label: "Default Scan Privacy",
                    description: "Controls who can see your new scans by default",
                    ocid: "settings.privacy_row",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SegmentedControl,
                      {
                        options: [
                          { value: Variant_open_unlisted_onlyMe.open, label: "Open" },
                          {
                            value: Variant_open_unlisted_onlyMe.unlisted,
                            label: "Unlisted"
                          },
                          {
                            value: Variant_open_unlisted_onlyMe.onlyMe,
                            label: "Private"
                          }
                        ],
                        value: s.defaultScanPrivacy,
                        onChange: (v) => update({ defaultScanPrivacy: v }),
                        ocidPrefix: "settings.privacy"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground/70", children: "Open" }),
                      " — discoverable by everyone in the feed"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-secondary/70" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground/70", children: "Unlisted" }),
                      " — accessible only via direct link"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground/70", children: "Private" }),
                      " — only visible to you"
                    ] })
                  ] })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: Clock,
              title: "History & Storage",
              accent: "0.66 0.14 240",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingRow,
                {
                  label: "History Retention",
                  description: "Older scans will be automatically deleted after this period",
                  ocid: "settings.retention_row",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: s.historyRetentionDays !== void 0 ? String(s.historyRetentionDays) : "forever",
                      onValueChange: (v) => update({
                        historyRetentionDays: v === "forever" ? void 0 : BigInt(v)
                      }),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "w-36 text-xs",
                            "data-ocid": "settings.retention_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "7", children: "7 days" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "30 days" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90", children: "90 days" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "365", children: "1 year" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "forever", children: "Keep Forever" })
                        ] })
                      ]
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionCard,
            {
              icon: Download,
              title: "Export Preferences",
              accent: "0.65 0.16 150",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingRow,
                {
                  label: "Default Export Format",
                  description: "PDF = formatted document · JSON = raw data · CSV = spreadsheet",
                  ocid: "settings.export_format_row",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SegmentedControl,
                    {
                      options: [
                        { value: Variant_csv_pdf_json.pdf, label: "PDF" },
                        { value: Variant_csv_pdf_json.json, label: "JSON" },
                        { value: Variant_csv_pdf_json.csv, label: "CSV" }
                      ],
                      value: s.exportFormat,
                      onChange: (v) => update({ exportFormat: v }),
                      ocidPrefix: "settings.export_format"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { icon: Monitor, title: "Display", accent: "0.72 0.16 320", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingRow,
              {
                label: "Theme",
                description: "Visual appearance of the application",
                ocid: "settings.theme_row",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SegmentedControl,
                  {
                    options: [
                      { value: Variant_auto_dark_light.dark, label: "Dark" },
                      { value: Variant_auto_dark_light.light, label: "Light" },
                      { value: Variant_auto_dark_light.auto, label: "System" }
                    ],
                    value: s.theme,
                    onChange: (v) => update({ theme: v }),
                    ocidPrefix: "settings.theme"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingRow,
              {
                label: "Language",
                description: "Interface language for analysis results",
                ocid: "settings.language_row",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: s.language,
                    onValueChange: (v) => update({ language: v }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "w-40 text-xs",
                          "data-ocid": "settings.language_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "en", children: "English" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "es", children: "Español" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fr", children: "Français" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "de", children: "Deutsch" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ja", children: "日本語" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "zh", children: "中文" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pt", children: "Português" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ar", children: "العربية" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hi", children: "हिन्दी" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ko", children: "한국어" })
                      ] })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingRow,
              {
                label: "Collection Organization",
                description: "How to organize scans within collections",
                ocid: "settings.collection_org_row",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SegmentedControl,
                  {
                    options: [
                      { value: Variant_tagBased_flat.flat, label: "Flat List" },
                      { value: Variant_tagBased_flat.tagBased, label: "Tag-Based" }
                    ],
                    value: s.collectionOrganizationMode,
                    onChange: (v) => update({ collectionOrganizationMode: v }),
                    ocidPrefix: "settings.collection_org"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-xs text-muted-foreground animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Visual",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono", children: "Lens" }),
            " · ",
            "All data stored onchain on the Internet Computer"
          ] }) })
        ] })
      ]
    }
  );
}
export {
  SettingsPage
};
