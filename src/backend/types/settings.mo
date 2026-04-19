module {
  /// Comprehensive user settings controlling all aspects of app behavior.
  public type UserSettings = {
    /// Whether Venice AI web search is included in analysis results.
    webSearchEnabled : Bool;
    /// Controls the verbosity of analysis results.
    resultDetailLevel : { #compact; #standard; #detailed };
    /// Preferred format when exporting scan data.
    exportFormat : { #pdf; #json; #csv };
    /// Controls how aggressively AI suggests tags when saving to collections.
    tagAggressiveness : { #subtle; #moderate; #aggressive };
    /// Number of days to retain scan history; null means unlimited.
    historyRetentionDays : ?Nat;
    /// UI color scheme preference.
    theme : { #dark; #light; #auto };
    /// ISO 639-1 language code for analysis and UI language (e.g. "en").
    language : Text;
    /// Default privacy level applied to newly saved scans.
    defaultScanPrivacy : { #open; #onlyMe; #unlisted };
    /// How collections are organized in the UI.
    collectionOrganizationMode : { #flat; #tagBased };
    /// Whether confidence scores are shown alongside detected objects.
    showConfidenceScores : Bool;
    /// Whether scans are automatically persisted after analysis.
    autoSaveScans : Bool;
    /// Layout used on the scan result page.
    scanResultLayout : { #sideBySide; #stacked; #compact };
  };
};
