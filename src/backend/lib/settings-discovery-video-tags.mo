import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import SettingsTypes "../types/settings";
import DiscoveryTypes "../types/discovery";
import VideoTypes "../types/video";
import TagTypes "../types/tags";

module {
  public type UserSettings = SettingsTypes.UserSettings;
  public type DiscoveryScan = DiscoveryTypes.DiscoveryScan;
  public type DiscoveryFilter = DiscoveryTypes.DiscoveryFilter;
  public type VideoAnalysisJob = VideoTypes.VideoAnalysisJob;
  public type VideoFrame = VideoTypes.VideoFrame;
  public type TagSuggestion = TagTypes.TagSuggestion;
  public type TagSuggestionRequest = TagTypes.TagSuggestionRequest;
  public type AnalysisResult = DiscoveryTypes.AnalysisResult;
  public type AnalysisMode = DiscoveryTypes.AnalysisMode;

  /// Venice AI API key
  let VENICE_API_KEY : Text = "VENICE_ADMIN_KEY_kQREam1ZEO4Xc8qhUfa5aweuKcedSfz6cf57N4wkrC";

  /// Venice AI base URL
  let VENICE_API_URL : Text = "https://api.venice.ai/api/v1/chat/completions";

  /// Text model for tag suggestions
  let VENICE_TEXT_MODEL : Text = "llama-3.3-70b";

  // ─── Default Settings ─────────────────────────────────────────────────────────

  /// Returns the default UserSettings applied when no settings have been saved yet.
  public func defaultSettings() : UserSettings {
    {
      webSearchEnabled = true;
      resultDetailLevel = #standard;
      exportFormat = #pdf;
      tagAggressiveness = #moderate;
      historyRetentionDays = null;
      theme = #dark;
      language = "en";
      defaultScanPrivacy = #open;
      collectionOrganizationMode = #flat;
      showConfidenceScores = true;
      autoSaveScans = true;
      scanResultLayout = #sideBySide;
    };
  };

  // ─── Settings ────────────────────────────────────────────────────────────────

  /// Returns the stored settings for a principal, or defaults if none saved yet.
  public func getUserSettings(
    settings : Map.Map<Principal, UserSettings>,
    caller : Principal,
  ) : ?UserSettings {
    switch (settings.get(caller)) {
      case (?s) ?s;
      case null ?defaultSettings();
    };
  };

  /// Persists (or overwrites) settings for a principal.
  public func saveUserSettings(
    settings : Map.Map<Principal, UserSettings>,
    caller : Principal,
    userSettings : UserSettings,
  ) {
    settings.add(caller, userSettings);
  };

  // ─── Discovery ───────────────────────────────────────────────────────────────

  /// Check if a scan matches the keyword filter (searches tags and scene description).
  func matchesKeyword(scan : DiscoveryScan, keyword : Text) : Bool {
    let kw = keyword.toLower();
    let descMatch = scan.analysisResult.sceneDescription.toLower().contains(#text kw);
    if (descMatch) return true;
    for (tag in scan.tags.vals()) {
      if (tag.toLower().contains(#text kw)) return true;
    };
    false;
  };

  /// Compare two DiscoveryScan values for sorting.
  func compareScans(
    a : DiscoveryScan,
    b : DiscoveryScan,
    sortBy : { #newest; #mostLiked; #trending },
  ) : { #less; #equal; #greater } {
    switch (sortBy) {
      case (#newest) {
        // Descending by createdAt
        if (a.createdAt > b.createdAt) #less
        else if (a.createdAt < b.createdAt) #greater
        else #equal;
      };
      case (#mostLiked) {
        // Descending by likeCount
        if (a.likeCount > b.likeCount) #less
        else if (a.likeCount < b.likeCount) #greater
        else #equal;
      };
      case (#trending) {
        // Trending score: likes * 2 + views, with recency bonus
        let now = Time.now();
        let ageA = now - a.createdAt;
        let ageB = now - b.createdAt;
        let scoreA = (a.likeCount * 2 + a.viewCount) : Nat;
        let scoreB = (b.likeCount * 2 + b.viewCount) : Nat;
        // Boost newer items: divide age by 1 hour (3_600_000_000_000 ns)
        let hourNs : Int = 3_600_000_000_000;
        let hoursA = if (ageA > 0) ageA / hourNs else 0;
        let hoursB = if (ageB > 0) ageB / hourNs else 0;
        // Simple score decay: score / (hours + 2)
        let adjustedA = if (hoursA + 2 > 0) scoreA * 100 / (Int.abs(hoursA + 2)) else scoreA;
        let adjustedB = if (hoursB + 2 > 0) scoreB * 100 / (Int.abs(hoursB + 2)) else scoreB;
        if (adjustedA > adjustedB) #less
        else if (adjustedA < adjustedB) #greater
        else #equal;
      };
    };
  };

  /// Returns a filtered, sorted, paginated slice of the public discovery feed.
  /// Also increments viewCount for each returned scan.
  public func getPublicDiscoveryFeed(
    discoveryScans : Map.Map<Text, DiscoveryScan>,
    filter : DiscoveryFilter,
  ) : [DiscoveryScan] {
    // Collect public scans matching mode and keyword filters
    let matches = List.empty<DiscoveryScan>();
    for ((_, scan) in discoveryScans.entries()) {
      if (scan.privacy == #open) {
        let modeOk = switch (filter.mode) {
          case null true;
          case (?m) scan.analysisMode == m;
        };
        let kwOk = switch (filter.keyword) {
          case null true;
          case (?kw) if (kw.size() == 0) true else matchesKeyword(scan, kw);
        };
        if (modeOk and kwOk) matches.add(scan);
      };
    };

    // Sort in place
    let sortBy = filter.sortBy;
    matches.sortInPlace(func(a, b) { compareScans(a, b, sortBy) });

    // Increment viewCount for scans in the result window before slicing
    let total = matches.size();
    let from = Nat.min(filter.offset, total);
    let to = Nat.min(filter.offset + filter.limit, total);

    // Update viewCount in the backing map for the window being returned
    for (i in Nat.range(from, to)) {
      let scan = matches.at(i);
      let updated : DiscoveryScan = { scan with viewCount = scan.viewCount + 1 };
      discoveryScans.add(scan.id, updated);
      matches.put(i, updated);
    };

    matches.sliceToArray(from, to);
  };

  /// Publishes a scan to the discovery feed and returns the discovery id.
  public func publishScanToDiscovery(
    discoveryScans : Map.Map<Text, DiscoveryScan>,
    discoveryCounter : { var value : Nat },
    caller : Principal,
    scanId : Text,
    title : ?Text,
    tags : [Text],
    imageBase64 : Text,
    analysisMode : AnalysisMode,
    analysisResult : AnalysisResult,
    privacy : { #open; #unlisted },
  ) : { #ok : Text; #err : Text } {
    discoveryCounter.value += 1;
    let id = "disc_" # discoveryCounter.value.toText();
    let scan : DiscoveryScan = {
      id;
      ownerPrincipal = caller.toText();
      scanId;
      imageBase64;
      analysisMode;
      analysisResult;
      tags;
      likeCount = 0;
      viewCount = 0;
      createdAt = Time.now();
      privacy;
      title;
    };
    discoveryScans.add(id, scan);
    #ok id;
  };

  /// Removes a scan from the discovery feed; caller must be the owner.
  public func unpublishScanFromDiscovery(
    discoveryScans : Map.Map<Text, DiscoveryScan>,
    caller : Principal,
    discoveryId : Text,
  ) : { #ok; #err : Text } {
    switch (discoveryScans.get(discoveryId)) {
      case null #err("Discovery scan not found");
      case (?scan) {
        if (scan.ownerPrincipal != caller.toText()) {
          #err("Not authorized to unpublish this scan");
        } else {
          discoveryScans.remove(discoveryId);
          #ok;
        };
      };
    };
  };

  /// Increments the like counter on a discovery scan; prevents double-liking.
  /// discoveryLikes maps discoveryId_principalText → Bool to track who liked what.
  public func likeDiscoveryScan(
    discoveryScans : Map.Map<Text, DiscoveryScan>,
    discoveryLikes : Map.Map<Text, Bool>,
    caller : Principal,
    discoveryId : Text,
  ) : { #ok; #err : Text } {
    switch (discoveryScans.get(discoveryId)) {
      case null #err("Discovery scan not found");
      case (?scan) {
        let likeKey = discoveryId # "_" # caller.toText();
        switch (discoveryLikes.get(likeKey)) {
          case (?_) #err("Already liked this scan");
          case null {
            discoveryLikes.add(likeKey, true);
            let updated : DiscoveryScan = { scan with likeCount = scan.likeCount + 1 };
            discoveryScans.add(discoveryId, updated);
            #ok;
          };
        };
      };
    };
  };

  // ─── Video ───────────────────────────────────────────────────────────────────

  /// Persists a new video analysis job and returns its assigned id.
  public func saveVideoAnalysisJob(
    videoJobs : Map.Map<Text, VideoAnalysisJob>,
    jobCounter : { var value : Nat },
    caller : Principal,
    job : VideoAnalysisJob,
  ) : Text {
    jobCounter.value += 1;
    let id = "vj_" # jobCounter.value.toText();
    let newJob : VideoAnalysisJob = {
      job with
      id;
      ownerPrincipal = caller.toText();
      createdAt = Time.now();
      status = #pending;
    };
    videoJobs.add(id, newJob);
    id;
  };

  /// Retrieves a video job by id; returns null if not found or not owned by caller.
  public func getVideoAnalysisJob(
    videoJobs : Map.Map<Text, VideoAnalysisJob>,
    caller : Principal,
    jobId : Text,
  ) : ?VideoAnalysisJob {
    switch (videoJobs.get(jobId)) {
      case null null;
      case (?job) {
        if (job.ownerPrincipal == caller.toText()) ?job else null;
      };
    };
  };

  /// Returns all video jobs belonging to the caller, sorted by createdAt descending.
  public func getUserVideoJobs(
    videoJobs : Map.Map<Text, VideoAnalysisJob>,
    caller : Principal,
  ) : [VideoAnalysisJob] {
    let callerText = caller.toText();
    let result = List.empty<VideoAnalysisJob>();
    for ((_, job) in videoJobs.entries()) {
      if (job.ownerPrincipal == callerText) result.add(job);
    };
    result.sortInPlace(func(a, b) {
      if (a.createdAt > b.createdAt) #less
      else if (a.createdAt < b.createdAt) #greater
      else #equal;
    });
    result.toArray();
  };

  /// Stores the analysis result for a single frame within a job.
  /// When all frames are processed, sets job status to #completed.
  public func updateVideoFrameResult(
    videoJobs : Map.Map<Text, VideoAnalysisJob>,
    caller : Principal,
    jobId : Text,
    frameIndex : Nat,
    result : AnalysisResult,
  ) : { #ok; #err : Text } {
    switch (videoJobs.get(jobId)) {
      case null #err("Video job not found");
      case (?job) {
        if (job.ownerPrincipal != caller.toText()) {
          return #err("Not authorized to update this job");
        };
        if (frameIndex >= job.frames.size()) {
          return #err("Frame index out of bounds");
        };
        // Update the specific frame
        let updatedFrames = job.frames.map(func(frame : VideoFrame) : VideoFrame {
          if (frame.frameIndex == frameIndex) {
            { frame with analysisResult = ?result; processed = true };
          } else {
            frame;
          };
        });
        // Check if all frames are processed
        let allDone = updatedFrames.all(func(f : VideoFrame) : Bool { f.processed });
        let newStatus : { #pending; #processing; #completed; #failed } =
          if (allDone) #completed else #processing;
        let updatedJob : VideoAnalysisJob = {
          job with
          frames = updatedFrames;
          status = newStatus;
        };
        videoJobs.add(jobId, updatedJob);
        #ok;
      };
    };
  };

  // ─── Tags ────────────────────────────────────────────────────────────────────

  /// Escape a text value for embedding inside a JSON string.
  func jsonEscape(t : Text) : Text {
    t.flatMap(func(c : Char) : Text {
      if (c == '\"') "\\\"" else if (c == '\\') "\\\\" else if (c == '\n') "\\n" else if (c == '\r') "\\r" else if (c == '\t') "\\t" else c.toText()
    });
  };

  /// Find text after the first occurrence of needle in haystack.
  func textAfter(haystack : Text, needle : Text) : ?Text {
    let parts = haystack.split(#text needle);
    switch (parts.next()) {
      case null null;
      case (?_before) {
        var rest = "";
        var found = false;
        var isFirst = true;
        for (part in parts) {
          if (isFirst) {
            rest := part;
            isFirst := false;
            found := true;
          } else {
            rest := rest # needle # part;
          };
        };
        if (found) ?rest else null;
      };
    };
  };

  /// Extract the model's reply content string from Venice AI JSON response.
  func extractContent(rawJson : Text) : ?Text {
    let afterMarker : ?Text = switch (textAfter(rawJson, "\"content\":\"")) {
      case (?v) ?v;
      case null { textAfter(rawJson, "\"content\": \"") };
    };
    switch (afterMarker) {
      case null null;
      case (?rest) {
        var result = "";
        var escaped = false;
        var done = false;
        for (c in rest.chars()) {
          if (done) {}
          else if (escaped) {
            if (c == 'n') { result := result # "\n" }
            else if (c == 'r') { result := result # "\r" }
            else if (c == 't') { result := result # "\t" }
            else { result := result # c.toText() };
            escaped := false;
          } else if (c == '\\') {
            escaped := true;
          } else if (c == '\"') {
            done := true;
          } else {
            result := result # c.toText();
          };
        };
        ?result;
      };
    };
  };

  /// Simple float parser for confidence values like "0.95".
  func parseFloat(s : Text) : Float {
    var intPart : Float = 0.0;
    var fracPart : Float = 0.0;
    var fracDiv : Float = 10.0;
    var inFrac = false;
    for (c in s.chars()) {
      if (c == '.') {
        inFrac := true;
      } else if (c.isDigit()) {
        let n = (c.toNat32() - '0'.toNat32()).toNat();
        let d = n.toFloat();
        if (inFrac) {
          fracPart := fracPart + d / fracDiv;
          fracDiv := fracDiv * 10.0;
        } else {
          intPart := intPart * 10.0 + d;
        };
      };
    };
    intPart + fracPart;
  };

  /// Parse tag suggestions from AI response text.
  /// Expected format: one tag per line as "tag:confidence" or just "tag".
  func parseTagSuggestions(content : Text) : [TagSuggestion] {
    let result = List.empty<TagSuggestion>();
    for (line in content.split(#char '\n')) {
      let trimmed = line.trim(#char ' ');
      if (trimmed.size() > 0 and not trimmed.startsWith(#text "#") and not trimmed.startsWith(#text "-")) {
        // Remove leading "- " or "* " bullet points
        let cleaned = if (trimmed.startsWith(#text "- ") or trimmed.startsWith(#text "* ")) {
          Text.fromArray(trimmed.toArray().sliceToArray(2, trimmed.size()))
        } else trimmed;

        if (cleaned.size() > 0) {
          let chars = cleaned.toArray();
          let len = chars.size();
          // Look for last colon to split tag:confidence
          var lastColon : Int = -1;
          var idx = 0;
          for (c in chars.vals()) {
            if (c == ':') lastColon := idx;
            idx += 1;
          };
          if (lastColon > 0 and lastColon + 1 < len) {
            let lc = lastColon;
            let nameChars = chars.sliceToArray(0, lc);
            let confChars = chars.sliceToArray(lc + 1, len);
            let tagText = Text.fromArray(nameChars).trim(#char ' ').toLower();
            let confText = Text.fromArray(confChars).trim(#char ' ');
            if (tagText.size() > 0 and tagText.size() <= 50) {
              let conf = parseFloat(confText);
              let clampedConf = if (conf > 1.0) 1.0 else if (conf <= 0.0) 0.5 else conf;
              result.add({ tag = tagText; confidence = clampedConf; source = #ai });
            };
          } else {
            // No confidence — just a tag name
            let tagText = cleaned.toLower().trim(#char ' ');
            if (tagText.size() > 0 and tagText.size() <= 50) {
              result.add({ tag = tagText; confidence = 0.7; source = #ai });
            };
          };
        };
      };
    };
    result.toArray();
  };

  /// Build the Venice AI request body for tag suggestions.
  func buildTagRequestBody(request : TagSuggestionRequest) : Text {
    let maxTags = switch (request.aggressiveness) {
      case (#subtle) "3 to 5";
      case (#moderate) "5 to 10";
      case (#aggressive) "10 to 20";
    };
    let existingTagsText = if (request.existingTags.size() > 0) {
      "Existing tags to avoid duplicating: " # request.existingTags.values().join(", ") # ".\n"
    } else "";
    let objectNames = request.analysisResult.objects.map(func(o : { name : Text; confidence : Float }) : Text { o.name }).values().join(", ");
    let prompt = "Generate " # maxTags # " relevant, specific tags for an image with the following analysis:\n\nScene: " # jsonEscape(request.analysisResult.sceneDescription) # "\n\nDetected objects: " # objectNames # "\n\nExtracted text: " # (if (request.analysisResult.extractedText.size() > 0) jsonEscape(request.analysisResult.extractedText) else "none") # "\n\n" # existingTagsText # "Return ONLY the tags, one per line in this exact format: tagname:confidence (e.g. sunset:0.95). Tags should be lowercase, single words or hyphenated phrases, no spaces. Do not include explanations or headers.";
    let escapedPrompt = jsonEscape(prompt);
    "{\"model\":\"" # VENICE_TEXT_MODEL # "\",\"messages\":[{\"role\":\"user\",\"content\":\"" # escapedPrompt # "\"}],\"max_tokens\":512,\"temperature\":0.3}";
  };

  /// Calls Venice AI to generate tag suggestions for a given scan.
  public func suggestTags(
    request : TagSuggestionRequest,
    transform : OutCall.Transform,
  ) : async [TagSuggestion] {
    let body = buildTagRequestBody(request);
    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer " # VENICE_API_KEY },
    ];
    try {
      let rawJson = await OutCall.httpPostRequest(VENICE_API_URL, headers, body, transform);
      switch (extractContent(rawJson)) {
        case null [];
        case (?content) parseTagSuggestions(content);
      };
    } catch (_) {
      [];
    };
  };
};
