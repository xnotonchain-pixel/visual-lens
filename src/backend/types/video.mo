import CommonTypes "common";
import VisionTypes "vision";
import HCSTypes "history-collections-sharing";

module {
  public type Timestamp = CommonTypes.Timestamp;
  public type AnalysisResult = VisionTypes.AnalysisResult;
  public type AnalysisMode = HCSTypes.AnalysisMode;

  /// A single extracted video frame with optional analysis result.
  public type VideoFrame = {
    frameIndex : Nat;
    /// Seconds from the beginning of the video at which this frame was captured.
    timestamp : Float;
    imageBase64 : Text;
    analysisResult : ?AnalysisResult;
    processed : Bool;
  };

  /// A video analysis job tracking all extracted frames and their results.
  public type VideoAnalysisJob = {
    id : Text;
    ownerPrincipal : Text;
    videoName : Text;
    /// Total number of frames to be analyzed.
    frameCount : Nat;
    /// Seconds between consecutive extracted frames.
    frameInterval : Nat;
    analysisMode : AnalysisMode;
    frames : [VideoFrame];
    status : { #pending; #processing; #completed; #failed };
    createdAt : Timestamp;
  };
};
