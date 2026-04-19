import Lib "../lib/history-collections-sharing";
import Map "mo:core/Map";

mixin (
  scans : Map.Map<Text, Lib.ScanRecord>,
  collections : Map.Map<Text, Lib.Collection>,
  shareTokens : Map.Map<Text, Lib.SharedScan>,
  scanCounter : { var value : Nat },
  collectionCounter : { var value : Nat },
) {

  // ── Scans ─────────────────────────────────────────────────────────────────

  public shared ({ caller }) func saveScan(
    imageBase64 : Text,
    mimeType : Text,
    mode : Lib.AnalysisMode,
    analysisResult : Lib.AnalysisResult,
  ) : async Text {
    Lib.saveScan(scans, scanCounter, caller, imageBase64, mimeType, mode, analysisResult);
  };

  public query ({ caller }) func getScanHistory() : async [Lib.ScanRecord] {
    Lib.getScanHistory(scans, caller);
  };

  public shared ({ caller }) func deleteScan(scanId : Text) : async () {
    Lib.deleteScan(scans, shareTokens, caller, scanId);
  };

  // ── Collections ───────────────────────────────────────────────────────────

  public shared ({ caller }) func createCollection(name : Text) : async Text {
    Lib.createCollection(collections, collectionCounter, caller, name);
  };

  public shared ({ caller }) func addScanToCollection(
    collectionId : Text,
    scanId : Text,
  ) : async () {
    Lib.addScanToCollection(collections, scans, caller, collectionId, scanId);
  };

  public shared ({ caller }) func removeFromCollection(
    collectionId : Text,
    scanId : Text,
  ) : async () {
    Lib.removeFromCollection(collections, caller, collectionId, scanId);
  };

  public shared ({ caller }) func deleteCollection(collectionId : Text) : async () {
    Lib.deleteCollection(collections, caller, collectionId);
  };

  public query ({ caller }) func getUserCollections() : async [Lib.Collection] {
    Lib.getUserCollections(collections, caller);
  };

  public query ({ caller }) func getCollection(collectionId : Text) : async ?Lib.Collection {
    Lib.getCollection(collections, caller, collectionId);
  };

  // ── Sharing ───────────────────────────────────────────────────────────────

  public shared ({ caller }) func createShareToken(scanId : Text) : async Text {
    Lib.createShareToken(scans, shareTokens, caller, scanId);
  };

  public query func getSharedScan(token : Text) : async ?Lib.ScanRecord {
    Lib.getSharedScan(scans, shareTokens, token);
  };

  public shared ({ caller }) func saveScanToMyHistory(sharedToken : Text) : async Text {
    Lib.saveScanToMyHistory(scans, shareTokens, scanCounter, caller, sharedToken);
  };
};
