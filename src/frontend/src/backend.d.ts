import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WebResult {
    url: string;
    title: string;
    snippet: string;
}
export interface DiscoveryScan {
    id: string;
    analysisResult: AnalysisResult;
    title?: string;
    likeCount: bigint;
    scanId: string;
    analysisMode: AnalysisMode;
    ownerPrincipal: string;
    createdAt: Timestamp;
    tags: Array<string>;
    privacy: Variant_open_unlisted;
    viewCount: bigint;
    imageBase64: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TagSuggestionRequest {
    analysisResult: AnalysisResult;
    scanId: string;
    existingTags: Array<string>;
    aggressiveness: Variant_aggressive_subtle_moderate;
}
export interface ScanRecord {
    id: string;
    analysisResult: AnalysisResult;
    userId: Principal;
    mode: AnalysisMode;
    shareToken?: string;
    mimeType: string;
    imageBase64: string;
    timestamp: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface VideoFrame {
    analysisResult?: AnalysisResult;
    imageBase64: string;
    frameIndex: bigint;
    timestamp: number;
    processed: boolean;
}
export interface TagSuggestion {
    tag: string;
    source: Variant_ai_user;
    confidence: number;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Collection {
    id: string;
    userId: Principal;
    name: string;
    createdAt: Timestamp;
    scanIds: Array<string>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface VideoAnalysisJob {
    id: string;
    frameInterval: bigint;
    status: Variant_pending_completed_processing_failed;
    frameCount: bigint;
    analysisMode: AnalysisMode;
    ownerPrincipal: string;
    createdAt: Timestamp;
    videoName: string;
    frames: Array<VideoFrame>;
}
export interface UserSettings {
    webSearchEnabled: boolean;
    historyRetentionDays?: bigint;
    scanResultLayout: Variant_stacked_compact_sideBySide;
    theme: Variant_auto_dark_light;
    tagAggressiveness: Variant_aggressive_subtle_moderate;
    collectionOrganizationMode: Variant_tagBased_flat;
    exportFormat: Variant_csv_pdf_json;
    language: string;
    resultDetailLevel: Variant_detailed_compact_standard;
    defaultScanPrivacy: Variant_open_unlisted_onlyMe;
    showConfidenceScores: boolean;
    autoSaveScans: boolean;
}
export interface DiscoveryFilter {
    sortBy: Variant_trending_newest_mostLiked;
    mode?: AnalysisMode;
    offset: bigint;
    limit: bigint;
    keyword?: string;
}
export interface DetectedObject {
    name: string;
    confidence: number;
}
export interface AnalysisResult {
    sceneDescription: string;
    extractedText: string;
    objects: Array<DetectedObject>;
    webResults: Array<WebResult>;
}
export enum AnalysisMode {
    receipt = "receipt",
    food = "food",
    carFashion = "carFashion",
    translation = "translation",
    medicalReference = "medicalReference",
    artLandmark = "artLandmark",
    generic = "generic",
    plant = "plant",
    bookProduct = "bookProduct"
}
export enum Variant_aggressive_subtle_moderate {
    aggressive = "aggressive",
    subtle = "subtle",
    moderate = "moderate"
}
export enum Variant_ai_user {
    ai = "ai",
    user = "user"
}
export enum Variant_auto_dark_light {
    auto = "auto",
    dark = "dark",
    light = "light"
}
export enum Variant_csv_pdf_json {
    csv = "csv",
    pdf = "pdf",
    json = "json"
}
export enum Variant_detailed_compact_standard {
    detailed = "detailed",
    compact = "compact",
    standard = "standard"
}
export enum Variant_open_unlisted {
    open = "open",
    unlisted = "unlisted"
}
export enum Variant_open_unlisted_onlyMe {
    open = "open",
    unlisted = "unlisted",
    onlyMe = "onlyMe"
}
export enum Variant_pending_completed_processing_failed {
    pending = "pending",
    completed = "completed",
    processing = "processing",
    failed = "failed"
}
export enum Variant_stacked_compact_sideBySide {
    stacked = "stacked",
    compact = "compact",
    sideBySide = "sideBySide"
}
export enum Variant_tagBased_flat {
    tagBased = "tagBased",
    flat = "flat"
}
export enum Variant_trending_newest_mostLiked {
    trending = "trending",
    newest = "newest",
    mostLiked = "mostLiked"
}
export interface backendInterface {
    addScanToCollection(collectionId: string, scanId: string): Promise<void>;
    analyzeImage(imageBase64: string, mimeType: string, mode: AnalysisMode | null): Promise<AnalysisResult>;
    createCollection(name: string): Promise<string>;
    createShareToken(scanId: string): Promise<string>;
    deleteCollection(collectionId: string): Promise<void>;
    deleteScan(scanId: string): Promise<void>;
    getCollection(collectionId: string): Promise<Collection | null>;
    getPublicDiscoveryFeed(filter: DiscoveryFilter): Promise<Array<DiscoveryScan>>;
    getScanHistory(): Promise<Array<ScanRecord>>;
    getSharedScan(token: string): Promise<ScanRecord | null>;
    getUserCollections(): Promise<Array<Collection>>;
    getUserSettings(): Promise<UserSettings | null>;
    getUserVideoJobs(): Promise<Array<VideoAnalysisJob>>;
    getVideoAnalysisJob(jobId: string): Promise<VideoAnalysisJob | null>;
    likeDiscoveryScan(discoveryId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    publishScanToDiscovery(scanId: string, title: string | null, tags: Array<string>, imageBase64: string, analysisMode: AnalysisMode, analysisResult: AnalysisResult, privacy: Variant_open_unlisted): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    removeFromCollection(collectionId: string, scanId: string): Promise<void>;
    saveScan(imageBase64: string, mimeType: string, mode: AnalysisMode, analysisResult: AnalysisResult): Promise<string>;
    saveScanToMyHistory(sharedToken: string): Promise<string>;
    saveUserSettings(settings: UserSettings): Promise<void>;
    saveVideoAnalysisJob(job: VideoAnalysisJob): Promise<string>;
    suggestTags(request: TagSuggestionRequest): Promise<Array<TagSuggestion>>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unpublishScanFromDiscovery(discoveryId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateVideoFrameResult(jobId: string, frameIndex: bigint, result: AnalysisResult): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
