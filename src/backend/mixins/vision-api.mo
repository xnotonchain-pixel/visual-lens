import Types "../types/vision";
import HCSTypes "../types/history-collections-sharing";
import VisionLib "../lib/vision";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

mixin () {
  /// Required transform callback for IC HTTP outcalls.
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  /// Analyze an image using Venice AI vision model with integrated web search.
  /// imageBase64: base64-encoded image data
  /// mimeType: MIME type of the image (e.g. "image/jpeg", "image/png")
  /// mode: optional analysis mode — null defaults to #generic
  public shared func analyzeImage(imageBase64 : Text, mimeType : Text, mode : ?HCSTypes.AnalysisMode) : async Types.AnalysisResult {
    let response = await VisionLib.analyzeImage(imageBase64, mimeType, mode, transform);
    switch (response) {
      case (#ok result) result;
      case (#err msg) Runtime.trap(msg);
    };
  };
};
