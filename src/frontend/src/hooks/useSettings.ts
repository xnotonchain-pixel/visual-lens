import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { UserSettings } from "../backend";
import {
  Variant_aggressive_subtle_moderate,
  Variant_auto_dark_light,
  Variant_csv_pdf_json,
  Variant_detailed_compact_standard,
  Variant_open_unlisted_onlyMe,
  Variant_stacked_compact_sideBySide,
  Variant_tagBased_flat,
} from "../backend";

export const DEFAULT_SETTINGS: UserSettings = {
  webSearchEnabled: true,
  resultDetailLevel: Variant_detailed_compact_standard.standard,
  scanResultLayout: Variant_stacked_compact_sideBySide.sideBySide,
  showConfidenceScores: true,
  tagAggressiveness: Variant_aggressive_subtle_moderate.moderate,
  autoSaveScans: true,
  defaultScanPrivacy: Variant_open_unlisted_onlyMe.onlyMe,
  historyRetentionDays: undefined,
  exportFormat: Variant_csv_pdf_json.pdf,
  theme: Variant_auto_dark_light.dark,
  language: "en",
  collectionOrganizationMode: Variant_tagBased_flat.flat,
};

export function useSettings() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: async () => {
      if (!actor) return DEFAULT_SETTINGS;
      const result = await actor.getUserSettings();
      return result ?? DEFAULT_SETTINGS;
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSaveSettings() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: UserSettings) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveUserSettings(settings);
      return settings;
    },
    onSuccess: (settings) => {
      queryClient.setQueryData(["userSettings"], settings);
      toast.success("Settings saved", {
        duration: 2000,
        id: "settings-saved",
      });
    },
    onError: () => {
      toast.error("Failed to save settings. Please try again.");
    },
  });
}
