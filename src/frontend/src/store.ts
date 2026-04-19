import { create } from "zustand";
import { AnalysisMode } from "./backend";
import type { AnalysisResult, Collection, ScanRecord } from "./types";

interface LensState {
  capturedImage: string | null;
  mimeType: string;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  selectedMode: AnalysisMode;
  scanHistory: ScanRecord[];
  collections: Collection[];
  scanId: string | null;

  // Actions
  setCapturedImage: (image: string, mimeType: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  setIsAnalyzing: (value: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedMode: (mode: AnalysisMode) => void;
  setScanHistory: (history: ScanRecord[]) => void;
  setCollections: (collections: Collection[]) => void;
  setScanId: (id: string | null) => void;
  reset: () => void;
}

const initialState = {
  capturedImage: null,
  mimeType: "image/jpeg",
  analysisResult: null,
  isAnalyzing: false,
  error: null,
  selectedMode: AnalysisMode.generic,
  scanHistory: [],
  collections: [],
  scanId: null,
};

export const useLensStore = create<LensState>((set) => ({
  ...initialState,

  setCapturedImage: (image, mimeType) =>
    set({
      capturedImage: image,
      mimeType,
      analysisResult: null,
      error: null,
      scanId: null,
    }),

  setAnalysisResult: (result) =>
    set({ analysisResult: result, isAnalyzing: false }),

  setIsAnalyzing: (value) => set({ isAnalyzing: value }),

  setError: (error) => set({ error, isAnalyzing: false }),

  setSelectedMode: (mode) => set({ selectedMode: mode }),

  setScanHistory: (scanHistory) => set({ scanHistory }),

  setCollections: (collections) => set({ collections }),

  setScanId: (scanId) => set({ scanId }),

  reset: () => set(initialState),
}));
