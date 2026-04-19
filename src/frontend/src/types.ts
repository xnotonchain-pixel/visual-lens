// Re-export backend types for frontend use
export { AnalysisMode } from "./backend";
export type {
  ScanRecord,
  Collection,
  AnalysisResult as BackendAnalysisResult,
} from "./backend";

// Frontend-specific types (keep for backward compatibility)
export interface DetectedObject {
  name: string;
  confidence: number;
}

export interface WebResult {
  title: string;
  url: string;
  snippet: string;
}

export interface AnalysisResult {
  objects: DetectedObject[];
  extractedText: string;
  sceneDescription: string;
  webResults: WebResult[];
}
