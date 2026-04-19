module {
  /// A detected object with its name and confidence score (0.0 – 1.0).
  public type DetectedObject = {
    name : Text;
    confidence : Float;
  };

  /// A single web search result returned by Venice AI.
  public type WebResult = {
    title : Text;
    url : Text;
    snippet : Text;
  };

  /// The aggregated result of an image analysis call.
  public type AnalysisResult = {
    objects : [DetectedObject];
    extractedText : Text;
    sceneDescription : Text;
    webResults : [WebResult];
  };

  /// Wraps either a successful result or an error message.
  public type AnalysisResponse = {
    #ok : AnalysisResult;
    #err : Text;
  };
};
