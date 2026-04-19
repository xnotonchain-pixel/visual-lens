import Map "mo:core/Map";
import Principal "mo:core/Principal";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import SettingsTypes "../types/settings";
import DiscoveryTypes "../types/discovery";
import VideoTypes "../types/video";
import TagTypes "../types/tags";
import Lib "../lib/settings-discovery-video-tags";

mixin (
  userSettings : Map.Map<Principal, SettingsTypes.UserSettings>,
  discoveryScans : Map.Map<Text, DiscoveryTypes.DiscoveryScan>,
  discoveryCounter : { var value : Nat },
  discoveryLikes : Map.Map<Text, Bool>,
  videoJobs : Map.Map<Text, VideoTypes.VideoAnalysisJob>,
  jobCounter : { var value : Nat },
  transform : OutCall.Transform,
) {

  // ─── Settings ──────────────────────────────────────────────────────────────

  /// Returns the caller's persisted settings, or defaults if none exist yet.
  public shared ({ caller }) func getUserSettings() : async ?SettingsTypes.UserSettings {
    Lib.getUserSettings(userSettings, caller);
  };

  /// Saves (or overwrites) the caller's settings.
  public shared ({ caller }) func saveUserSettings(settings : SettingsTypes.UserSettings) : async () {
    Lib.saveUserSettings(userSettings, caller, settings);
  };

  // ─── Discovery ─────────────────────────────────────────────────────────────

  /// Returns a paginated list of public discovery scans matching the filter.
  /// Note: This is an update call because it increments viewCount for returned scans.
  public shared func getPublicDiscoveryFeed(filter : DiscoveryTypes.DiscoveryFilter) : async [DiscoveryTypes.DiscoveryScan] {
    Lib.getPublicDiscoveryFeed(discoveryScans, filter);
  };

  /// Publishes one of the caller's scans to the discovery feed.
  /// The imageBase64 and analysisResult must be provided from the frontend (copied from scan history).
  public shared ({ caller }) func publishScanToDiscovery(
    scanId : Text,
    title : ?Text,
    tags : [Text],
    imageBase64 : Text,
    analysisMode : DiscoveryTypes.AnalysisMode,
    analysisResult : DiscoveryTypes.AnalysisResult,
    privacy : { #open; #unlisted },
  ) : async { #ok : Text; #err : Text } {
    Lib.publishScanToDiscovery(
      discoveryScans,
      discoveryCounter,
      caller,
      scanId,
      title,
      tags,
      imageBase64,
      analysisMode,
      analysisResult,
      privacy,
    );
  };

  /// Removes the caller's scan from the discovery feed.
  public shared ({ caller }) func unpublishScanFromDiscovery(
    discoveryId : Text,
  ) : async { #ok; #err : Text } {
    Lib.unpublishScanFromDiscovery(discoveryScans, caller, discoveryId);
  };

  /// Increments the like count for a discovery scan (once per caller).
  public shared ({ caller }) func likeDiscoveryScan(
    discoveryId : Text,
  ) : async { #ok; #err : Text } {
    Lib.likeDiscoveryScan(discoveryScans, discoveryLikes, caller, discoveryId);
  };

  // ─── Video ─────────────────────────────────────────────────────────────────

  /// Persists a new video analysis job and returns its id.
  public shared ({ caller }) func saveVideoAnalysisJob(job : VideoTypes.VideoAnalysisJob) : async Text {
    Lib.saveVideoAnalysisJob(videoJobs, jobCounter, caller, job);
  };

  /// Retrieves a single video job by id (caller must be the owner).
  public shared ({ caller }) func getVideoAnalysisJob(jobId : Text) : async ?VideoTypes.VideoAnalysisJob {
    Lib.getVideoAnalysisJob(videoJobs, caller, jobId);
  };

  /// Returns all video jobs owned by the caller.
  public shared ({ caller }) func getUserVideoJobs() : async [VideoTypes.VideoAnalysisJob] {
    Lib.getUserVideoJobs(videoJobs, caller);
  };

  /// Stores the analysis result for a single frame within a job.
  public shared ({ caller }) func updateVideoFrameResult(
    jobId : Text,
    frameIndex : Nat,
    result : DiscoveryTypes.AnalysisResult,
  ) : async { #ok; #err : Text } {
    Lib.updateVideoFrameResult(videoJobs, caller, jobId, frameIndex, result);
  };

  // ─── Tags ──────────────────────────────────────────────────────────────────

  /// Calls Venice AI to generate tag suggestions for the provided scan data.
  public shared (_) func suggestTags(request : TagTypes.TagSuggestionRequest) : async [TagTypes.TagSuggestion] {
    await Lib.suggestTags(request, transform);
  };
};
