import CommonTypes "common";
import VisionTypes "vision";
import HCSTypes "history-collections-sharing";

module {
  public type Timestamp = CommonTypes.Timestamp;
  public type AnalysisResult = VisionTypes.AnalysisResult;
  public type AnalysisMode = HCSTypes.AnalysisMode;

  /// A public scan record surfaced in the discovery feed.
  public type DiscoveryScan = {
    id : Text;
    ownerPrincipal : Text;
    /// Reference to the source ScanRecord id.
    scanId : Text;
    imageBase64 : Text;
    analysisMode : AnalysisMode;
    analysisResult : AnalysisResult;
    tags : [Text];
    likeCount : Nat;
    viewCount : Nat;
    createdAt : Timestamp;
    privacy : { #open; #unlisted };
    title : ?Text;
  };

  /// Filter and pagination parameters for querying the discovery feed.
  public type DiscoveryFilter = {
    keyword : ?Text;
    mode : ?AnalysisMode;
    sortBy : { #newest; #mostLiked; #trending };
    limit : Nat;
    offset : Nat;
  };
};
