import VisionApi "mixins/vision-api";
import HistoryApi "mixins/history-collections-sharing-api";
import SettingsApi "mixins/settings-discovery-video-tags-api";
import Map "mo:core/Map";
import HCSLib "lib/history-collections-sharing";
import SDVTLib "lib/settings-discovery-video-tags";

actor {
  let scans = Map.empty<Text, HCSLib.ScanRecord>();
  let collections = Map.empty<Text, HCSLib.Collection>();
  let shareTokens = Map.empty<Text, HCSLib.SharedScan>();
  let scanCounter = { var value : Nat = 0 };
  let collectionCounter = { var value : Nat = 0 };

  let userSettings = Map.empty<Principal, SDVTLib.UserSettings>();
  let discoveryScans = Map.empty<Text, SDVTLib.DiscoveryScan>();
  let discoveryCounter = { var value : Nat = 0 };
  let discoveryLikes = Map.empty<Text, Bool>();
  let videoJobs = Map.empty<Text, SDVTLib.VideoAnalysisJob>();
  let jobCounter = { var value : Nat = 0 };

  include VisionApi();
  include HistoryApi(scans, collections, shareTokens, scanCounter, collectionCounter);
  include SettingsApi(userSettings, discoveryScans, discoveryCounter, discoveryLikes, videoJobs, jobCounter, transform);
};
