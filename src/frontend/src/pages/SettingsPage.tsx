import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Brain,
  Clock,
  Download,
  Globe,
  Layout,
  Lock,
  Monitor,
  Settings,
  Shield,
  Tag,
} from "lucide-react";
import { useCallback, useRef } from "react";
import {
  Variant_aggressive_subtle_moderate,
  Variant_auto_dark_light,
  Variant_csv_pdf_json,
  Variant_detailed_compact_standard,
  Variant_open_unlisted_onlyMe,
  Variant_stacked_compact_sideBySide,
  Variant_tagBased_flat,
} from "../backend";
import type { UserSettings } from "../backend";
import {
  DEFAULT_SETTINGS,
  useSaveSettings,
  useSettings,
} from "../hooks/useSettings";

// --- Segmented Control ---
interface SegmentedOption<T> {
  value: T;
  label: string;
  description?: string;
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ocidPrefix,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  ocidPrefix: string;
}) {
  return (
    <div className="flex rounded-md border border-border overflow-hidden">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          data-ocid={`${ocidPrefix}.${opt.value}`}
          className={cn(
            "flex-1 px-3 py-1.5 text-xs font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
            i !== 0 && "border-l border-border",
            value === opt.value
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// --- Setting Row ---
function SettingRow({
  label,
  description,
  children,
  ocid,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
  ocid?: string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-3"
      data-ocid={ocid}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

// --- Section Card ---
function SectionCard({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: React.ElementType;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card p-5 animate-slide-up">
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-md"
          style={{
            backgroundColor: accent ? `oklch(${accent} / 0.15)` : undefined,
          }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: accent ? `oklch(${accent})` : undefined }}
            strokeWidth={1.75}
          />
        </div>
        <h2 className="font-display font-semibold text-sm text-foreground">
          {title}
        </h2>
      </div>
      <Separator className="mb-3 opacity-50" />
      <div className="divide-y divide-border/40">{children}</div>
    </div>
  );
}

// --- Loading Skeleton ---
function SettingsSkeleton() {
  return (
    <div className="space-y-4">
      {(["a", "b", "c", "d", "e"] as const).map((key) => (
        <div key={key} className="glass-card p-5">
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Page ---
export function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const { mutate: saveSettings, isPending } = useSaveSettings();

  // Use a ref to batch-debounce saves
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<UserSettings | null>(null);

  const update = useCallback(
    (patch: Partial<UserSettings>) => {
      const current = pendingRef.current ?? settings ?? DEFAULT_SETTINGS;
      const updated: UserSettings = { ...current, ...patch };
      pendingRef.current = updated;

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        if (pendingRef.current) {
          saveSettings(pendingRef.current);
          pendingRef.current = null;
        }
      }, 400);
    },
    [settings, saveSettings],
  );

  const s = settings ?? DEFAULT_SETTINGS;

  return (
    <div
      className="container max-w-3xl mx-auto px-4 py-8"
      data-ocid="settings.page"
    >
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
          <Settings className="w-5 h-5 text-primary" strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Preferences are saved automatically
          </p>
        </div>
        {isPending && (
          <Badge
            variant="outline"
            className="ml-auto text-xs text-muted-foreground animate-pulse"
            data-ocid="settings.saving_state"
          >
            Saving…
          </Badge>
        )}
      </div>

      {isLoading ? (
        <SettingsSkeleton />
      ) : (
        <div className="space-y-4">
          {/* 1. Analysis Preferences */}
          <SectionCard
            icon={BarChart2}
            title="Analysis Preferences"
            accent="0.72 0.16 195"
          >
            <SettingRow
              label="Web Search"
              description="Include web search results alongside AI analysis"
              ocid="settings.web_search_row"
            >
              <Switch
                checked={s.webSearchEnabled}
                onCheckedChange={(v) => update({ webSearchEnabled: v })}
                data-ocid="settings.web_search_toggle"
              />
            </SettingRow>

            <SettingRow
              label="Result Detail Level"
              description="How much detail to show in analysis results"
              ocid="settings.result_detail_row"
            >
              <SegmentedControl
                options={[
                  {
                    value: Variant_detailed_compact_standard.compact,
                    label: "Compact",
                  },
                  {
                    value: Variant_detailed_compact_standard.standard,
                    label: "Standard",
                  },
                  {
                    value: Variant_detailed_compact_standard.detailed,
                    label: "Detailed",
                  },
                ]}
                value={s.resultDetailLevel}
                onChange={(v) => update({ resultDetailLevel: v })}
                ocidPrefix="settings.result_detail"
              />
            </SettingRow>

            <SettingRow
              label="Scan Result Layout"
              description="How to display image and results"
              ocid="settings.layout_row"
            >
              <SegmentedControl
                options={[
                  {
                    value: Variant_stacked_compact_sideBySide.sideBySide,
                    label: "Side by Side",
                  },
                  {
                    value: Variant_stacked_compact_sideBySide.stacked,
                    label: "Stacked",
                  },
                  {
                    value: Variant_stacked_compact_sideBySide.compact,
                    label: "Compact",
                  },
                ]}
                value={s.scanResultLayout}
                onChange={(v) => update({ scanResultLayout: v })}
                ocidPrefix="settings.scan_layout"
              />
            </SettingRow>

            <SettingRow
              label="Show Confidence Scores"
              description="Display percentage confidence for detected objects"
              ocid="settings.confidence_row"
            >
              <Switch
                checked={s.showConfidenceScores}
                onCheckedChange={(v) => update({ showConfidenceScores: v })}
                data-ocid="settings.confidence_toggle"
              />
            </SettingRow>
          </SectionCard>

          {/* 2. AI & Tagging */}
          <SectionCard icon={Brain} title="AI & Tagging" accent="0.78 0.16 80">
            <SettingRow
              label="Tag Aggressiveness"
              description="Subtle: 3–5 tags · Moderate: 5–10 tags · Aggressive: 10–20 tags"
              ocid="settings.tag_aggression_row"
            >
              <SegmentedControl
                options={[
                  {
                    value: Variant_aggressive_subtle_moderate.subtle,
                    label: "Subtle",
                  },
                  {
                    value: Variant_aggressive_subtle_moderate.moderate,
                    label: "Moderate",
                  },
                  {
                    value: Variant_aggressive_subtle_moderate.aggressive,
                    label: "Aggressive",
                  },
                ]}
                value={s.tagAggressiveness}
                onChange={(v) => update({ tagAggressiveness: v })}
                ocidPrefix="settings.tag_aggression"
              />
            </SettingRow>

            <SettingRow
              label="Auto-Save Scans"
              description="Automatically save scans to history after analysis"
              ocid="settings.autosave_row"
            >
              <Switch
                checked={s.autoSaveScans}
                onCheckedChange={(v) => update({ autoSaveScans: v })}
                data-ocid="settings.autosave_toggle"
              />
            </SettingRow>
          </SectionCard>

          {/* 3. Privacy & Sharing */}
          <SectionCard
            icon={Shield}
            title="Privacy & Sharing"
            accent="0.62 0.2 10"
          >
            <SettingRow
              label="Default Scan Privacy"
              description="Controls who can see your new scans by default"
              ocid="settings.privacy_row"
            >
              <SegmentedControl
                options={[
                  { value: Variant_open_unlisted_onlyMe.open, label: "Open" },
                  {
                    value: Variant_open_unlisted_onlyMe.unlisted,
                    label: "Unlisted",
                  },
                  {
                    value: Variant_open_unlisted_onlyMe.onlyMe,
                    label: "Private",
                  },
                ]}
                value={s.defaultScanPrivacy}
                onChange={(v) => update({ defaultScanPrivacy: v })}
                ocidPrefix="settings.privacy"
              />
            </SettingRow>
            <div className="pt-1 pb-2">
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex gap-1.5 items-start">
                  <Globe className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary/70" />
                  <span>
                    <strong className="text-foreground/70">Open</strong> —
                    discoverable by everyone in the feed
                  </span>
                </div>
                <div className="flex gap-1.5 items-start">
                  <Tag className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-secondary/70" />
                  <span>
                    <strong className="text-foreground/70">Unlisted</strong> —
                    accessible only via direct link
                  </span>
                </div>
                <div className="flex gap-1.5 items-start">
                  <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <span>
                    <strong className="text-foreground/70">Private</strong> —
                    only visible to you
                  </span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 4. History & Storage */}
          <SectionCard
            icon={Clock}
            title="History & Storage"
            accent="0.66 0.14 240"
          >
            <SettingRow
              label="History Retention"
              description="Older scans will be automatically deleted after this period"
              ocid="settings.retention_row"
            >
              <Select
                value={
                  s.historyRetentionDays !== undefined
                    ? String(s.historyRetentionDays)
                    : "forever"
                }
                onValueChange={(v) =>
                  update({
                    historyRetentionDays:
                      v === "forever" ? undefined : BigInt(v),
                  })
                }
              >
                <SelectTrigger
                  className="w-36 text-xs"
                  data-ocid="settings.retention_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Keep Forever</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
          </SectionCard>

          {/* 5. Export Preferences */}
          <SectionCard
            icon={Download}
            title="Export Preferences"
            accent="0.65 0.16 150"
          >
            <SettingRow
              label="Default Export Format"
              description="PDF = formatted document · JSON = raw data · CSV = spreadsheet"
              ocid="settings.export_format_row"
            >
              <SegmentedControl
                options={[
                  { value: Variant_csv_pdf_json.pdf, label: "PDF" },
                  { value: Variant_csv_pdf_json.json, label: "JSON" },
                  { value: Variant_csv_pdf_json.csv, label: "CSV" },
                ]}
                value={s.exportFormat}
                onChange={(v) => update({ exportFormat: v })}
                ocidPrefix="settings.export_format"
              />
            </SettingRow>
          </SectionCard>

          {/* 6. Display */}
          <SectionCard icon={Monitor} title="Display" accent="0.72 0.16 320">
            <SettingRow
              label="Theme"
              description="Visual appearance of the application"
              ocid="settings.theme_row"
            >
              <SegmentedControl
                options={[
                  { value: Variant_auto_dark_light.dark, label: "Dark" },
                  { value: Variant_auto_dark_light.light, label: "Light" },
                  { value: Variant_auto_dark_light.auto, label: "System" },
                ]}
                value={s.theme}
                onChange={(v) => update({ theme: v })}
                ocidPrefix="settings.theme"
              />
            </SettingRow>

            <SettingRow
              label="Language"
              description="Interface language for analysis results"
              ocid="settings.language_row"
            >
              <Select
                value={s.language}
                onValueChange={(v) => update({ language: v })}
              >
                <SelectTrigger
                  className="w-40 text-xs"
                  data-ocid="settings.language_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="ko">한국어</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow
              label="Collection Organization"
              description="How to organize scans within collections"
              ocid="settings.collection_org_row"
            >
              <SegmentedControl
                options={[
                  { value: Variant_tagBased_flat.flat, label: "Flat List" },
                  { value: Variant_tagBased_flat.tagBased, label: "Tag-Based" },
                ]}
                value={s.collectionOrganizationMode}
                onChange={(v) => update({ collectionOrganizationMode: v })}
                ocidPrefix="settings.collection_org"
              />
            </SettingRow>
          </SectionCard>

          {/* About footer */}
          <div className="text-center py-4 text-xs text-muted-foreground animate-fade-in">
            <p>
              Visual<span className="text-primary font-mono">Lens</span>
              {" · "}All data stored onchain on the Internet Computer
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
