import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback } from "react";
import { createActor } from "../backend";
import { useLensStore } from "../store";
import type { AnalysisResult } from "../types";

export function useAnalysis() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const {
    selectedMode,
    setCapturedImage,
    setAnalysisResult,
    setIsAnalyzing,
    setError,
    setScanId,
  } = useLensStore();

  const analyzeImage = useCallback(
    async (base64Image: string, mimeType: string) => {
      if (!actor) {
        setError("Backend connection not ready. Please try again.");
        return;
      }

      setCapturedImage(base64Image, mimeType);
      setIsAnalyzing(true);

      try {
        const rawResult = await actor.analyzeImage(
          base64Image,
          mimeType,
          selectedMode,
        );

        const result: AnalysisResult = {
          objects: Array.isArray(rawResult?.objects)
            ? rawResult.objects.map(
                (o: { name: string; confidence: number }) => ({
                  name: o.name,
                  confidence: Number(o.confidence),
                }),
              )
            : [],
          extractedText: rawResult?.extractedText ?? "",
          sceneDescription: rawResult?.sceneDescription ?? "",
          webResults: Array.isArray(rawResult?.webResults)
            ? rawResult.webResults.map(
                (r: { title: string; url: string; snippet: string }) => ({
                  title: r.title,
                  url: r.url,
                  snippet: r.snippet,
                }),
              )
            : [],
        };

        setAnalysisResult(result);

        // Save scan to backend after successful analysis
        try {
          const savedId = await actor.saveScan(
            base64Image,
            mimeType,
            selectedMode,
            rawResult,
          );
          setScanId(savedId);
        } catch {
          // Non-critical — analysis result still shown even if save fails
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Analysis failed. Please try again.";
        setError(message);
      }
    },
    [
      actor,
      selectedMode,
      setCapturedImage,
      setAnalysisResult,
      setIsAnalyzing,
      setError,
      setScanId,
    ],
  );

  return {
    analyzeImage,
    isActorLoading,
  };
}
