import Types "../types/history-collections-sharing";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

module {
  public type ScanRecord = Types.ScanRecord;
  public type Collection = Types.Collection;
  public type SharedScan = Types.SharedScan;
  public type AnalysisMode = Types.AnalysisMode;
  public type AnalysisResult = Types.AnalysisResult;

  // ── Scans ────────────────────────────────────────────────────────────────

  public func saveScan(
    scans : Map.Map<Text, ScanRecord>,
    scanCounter : { var value : Nat },
    caller : Principal,
    imageBase64 : Text,
    mimeType : Text,
    mode : AnalysisMode,
    analysisResult : AnalysisResult,
  ) : Text {
    scanCounter.value += 1;
    let id = "scan-" # scanCounter.value.toText();
    let record : ScanRecord = {
      id;
      userId = caller;
      timestamp = Time.now();
      imageBase64;
      mimeType;
      mode;
      analysisResult;
      shareToken = null;
    };
    scans.add(id, record);
    id;
  };

  public func getScanHistory(
    scans : Map.Map<Text, ScanRecord>,
    userId : Principal,
  ) : [ScanRecord] {
    let filtered = scans.entries()
      |> _.filter(func((_, r) : (Text, ScanRecord)) : Bool {
        Principal.equal(r.userId, userId)
      })
      |> _.map(func((_, r) : (Text, ScanRecord)) : ScanRecord { r })
      |> _.toArray();
    filtered.sort(func(a : ScanRecord, b : ScanRecord) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    });
  };

  public func deleteScan(
    scans : Map.Map<Text, ScanRecord>,
    shareTokens : Map.Map<Text, SharedScan>,
    caller : Principal,
    scanId : Text,
  ) : () {
    switch (scans.get(scanId)) {
      case null {};
      case (?record) {
        if (not Principal.equal(record.userId, caller)) {
          return;
        };
        // Remove any share token pointing to this scan
        let tokenToRemove = shareTokens.entries()
          |> _.find(func((_, s) : (Text, SharedScan)) : Bool { s.scanId == scanId });
        switch (tokenToRemove) {
          case (?(token, _)) { shareTokens.remove(token) };
          case null {};
        };
        scans.remove(scanId);
      };
    };
  };

  // ── Collections ──────────────────────────────────────────────────────────

  public func createCollection(
    collections : Map.Map<Text, Collection>,
    collectionCounter : { var value : Nat },
    caller : Principal,
    name : Text,
  ) : Text {
    collectionCounter.value += 1;
    let id = "col-" # collectionCounter.value.toText();
    let collection : Collection = {
      id;
      userId = caller;
      name;
      createdAt = Time.now();
      scanIds = [];
    };
    collections.add(id, collection);
    id;
  };

  public func addScanToCollection(
    collections : Map.Map<Text, Collection>,
    scans : Map.Map<Text, ScanRecord>,
    caller : Principal,
    collectionId : Text,
    scanId : Text,
  ) : () {
    let collection = switch (collections.get(collectionId)) {
      case null { return };
      case (?c) {
        if (not Principal.equal(c.userId, caller)) { return };
        c
      };
    };
    // Validate scan exists and belongs to caller
    switch (scans.get(scanId)) {
      case null { return };
      case (?s) {
        if (not Principal.equal(s.userId, caller)) { return };
      };
    };
    // Only add if not already present
    let alreadyIn = collection.scanIds.find(func(id : Text) : Bool { id == scanId });
    switch (alreadyIn) {
      case (?_) { return };
      case null {};
    };
    let updated : Collection = { collection with scanIds = collection.scanIds.concat([scanId]) };
    collections.add(collectionId, updated);
  };

  public func removeFromCollection(
    collections : Map.Map<Text, Collection>,
    caller : Principal,
    collectionId : Text,
    scanId : Text,
  ) : () {
    let collection = switch (collections.get(collectionId)) {
      case null { return };
      case (?c) {
        if (not Principal.equal(c.userId, caller)) { return };
        c
      };
    };
    let updated : Collection = {
      collection with
      scanIds = collection.scanIds.filter(func(id : Text) : Bool { id != scanId })
    };
    collections.add(collectionId, updated);
  };

  public func deleteCollection(
    collections : Map.Map<Text, Collection>,
    caller : Principal,
    collectionId : Text,
  ) : () {
    switch (collections.get(collectionId)) {
      case null { return };
      case (?c) {
        if (not Principal.equal(c.userId, caller)) { return };
        collections.remove(collectionId);
      };
    };
  };

  public func getUserCollections(
    collections : Map.Map<Text, Collection>,
    caller : Principal,
  ) : [Collection] {
    collections.entries()
      |> _.filter(func((_, c) : (Text, Collection)) : Bool {
        Principal.equal(c.userId, caller)
      })
      |> _.map(func((_, c) : (Text, Collection)) : Collection { c })
      |> _.toArray();
  };

  public func getCollection(
    collections : Map.Map<Text, Collection>,
    caller : Principal,
    collectionId : Text,
  ) : ?Collection {
    switch (collections.get(collectionId)) {
      case null { null };
      case (?c) {
        if (Principal.equal(c.userId, caller)) { ?c } else { null }
      };
    };
  };

  // ── Sharing ──────────────────────────────────────────────────────────────

  public func createShareToken(
    scans : Map.Map<Text, ScanRecord>,
    shareTokens : Map.Map<Text, SharedScan>,
    caller : Principal,
    scanId : Text,
  ) : Text {
    let record = switch (scans.get(scanId)) {
      case null { Runtime.trap("Scan not found") };
      case (?r) { r };
    };
    if (not Principal.equal(record.userId, caller)) {
      Runtime.trap("Unauthorized");
    };
    // Return existing token if one already exists for this scan
    let existing = shareTokens.entries()
      |> _.find(func((_, s) : (Text, SharedScan)) : Bool { s.scanId == scanId });
    switch (existing) {
      case (?(token, _)) { return token };
      case null {};
    };
    let token = "share-" # scanId # "-" # Time.now().toText();
    let shareEntry : SharedScan = {
      token;
      scanId;
      createdAt = Time.now();
    };
    shareTokens.add(token, shareEntry);
    // Update scan record with the token
    let updatedScan : ScanRecord = { record with shareToken = ?token };
    scans.add(scanId, updatedScan);
    token;
  };

  public func getSharedScan(
    scans : Map.Map<Text, ScanRecord>,
    shareTokens : Map.Map<Text, SharedScan>,
    token : Text,
  ) : ?ScanRecord {
    switch (shareTokens.get(token)) {
      case null { null };
      case (?shareEntry) { scans.get(shareEntry.scanId) };
    };
  };

  public func saveScanToMyHistory(
    scans : Map.Map<Text, ScanRecord>,
    shareTokens : Map.Map<Text, SharedScan>,
    scanCounter : { var value : Nat },
    caller : Principal,
    sharedToken : Text,
  ) : Text {
    let original = switch (getSharedScan(scans, shareTokens, sharedToken)) {
      case null { Runtime.trap("Shared scan not found") };
      case (?r) { r };
    };
    scanCounter.value += 1;
    let newId = "scan-" # scanCounter.value.toText();
    let copy : ScanRecord = {
      original with
      id = newId;
      userId = caller;
      timestamp = Time.now();
      shareToken = null;
    };
    scans.add(newId, copy);
    newId;
  };
};
