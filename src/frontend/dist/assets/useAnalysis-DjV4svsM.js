import { a as useLensStore, r as reactExports, e as createActor } from "./index-BUSSrS1X.js";
import { a as useActor } from "./index-BsMJgQDJ.js";
function useAnalysis() {
  const { actor, isFetching: isActorLoading } = useActor(createActor);
  const {
    selectedMode,
    setCapturedImage,
    setAnalysisResult,
    setIsAnalyzing,
    setError,
    setScanId
  } = useLensStore();
  const analyzeImage = reactExports.useCallback(
    async (base64Image, mimeType) => {
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
          selectedMode
        );
        const result = {
          objects: Array.isArray(rawResult == null ? void 0 : rawResult.objects) ? rawResult.objects.map(
            (o) => ({
              name: o.name,
              confidence: Number(o.confidence)
            })
          ) : [],
          extractedText: (rawResult == null ? void 0 : rawResult.extractedText) ?? "",
          sceneDescription: (rawResult == null ? void 0 : rawResult.sceneDescription) ?? "",
          webResults: Array.isArray(rawResult == null ? void 0 : rawResult.webResults) ? rawResult.webResults.map(
            (r) => ({
              title: r.title,
              url: r.url,
              snippet: r.snippet
            })
          ) : []
        };
        setAnalysisResult(result);
        try {
          const savedId = await actor.saveScan(
            base64Image,
            mimeType,
            selectedMode,
            rawResult
          );
          setScanId(savedId);
        } catch {
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Analysis failed. Please try again.";
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
      setScanId
    ]
  );
  return {
    analyzeImage,
    isActorLoading
  };
}
export {
  useAnalysis as u
};
