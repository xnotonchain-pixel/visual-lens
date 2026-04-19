import CommonTypes "common";
import VisionTypes "vision";

module {
  public type Timestamp = CommonTypes.Timestamp;
  public type AnalysisResult = VisionTypes.AnalysisResult;

  /// Analysis mode variants for mode-specific Venice AI prompts.
  public type AnalysisMode = {
    #generic;
    #plant;
    #food;
    #bookProduct;
    #translation;
    #artLandmark;
    #receipt;
    #medicalReference;
    #carFashion;
  };

  /// A single saved scan record stored onchain.
  public type ScanRecord = {
    id : Text;
    userId : Principal;
    timestamp : Timestamp;
    imageBase64 : Text;
    mimeType : Text;
    mode : AnalysisMode;
    analysisResult : AnalysisResult;
    shareToken : ?Text;
  };

  /// A user-created collection of scan IDs.
  public type Collection = {
    id : Text;
    userId : Principal;
    name : Text;
    createdAt : Timestamp;
    scanIds : [Text];
  };

  /// A share token linking to a specific scan.
  public type SharedScan = {
    token : Text;
    scanId : Text;
    createdAt : Timestamp;
  };
};
