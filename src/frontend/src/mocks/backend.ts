import {
  AnalysisMode,
  Variant_aggressive_subtle_moderate,
  Variant_auto_dark_light,
  Variant_csv_pdf_json,
  Variant_detailed_compact_standard,
  Variant_open_unlisted,
  Variant_open_unlisted_onlyMe,
  Variant_pending_completed_processing_failed,
  Variant_stacked_compact_sideBySide,
  Variant_tagBased_flat,
  Variant_trending_newest_mostLiked,
} from "../backend";
import type {
  backendInterface,
  ScanRecord,
  Collection,
  AnalysisResult,
  UserSettings,
  DiscoveryFilter,
  DiscoveryScan,
  VideoAnalysisJob,
  VideoFrame,
  TagSuggestionRequest,
  TagSuggestion,
} from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockAnalysisResult: AnalysisResult = {
  sceneDescription:
    "A vibrant street market scene with fresh produce stalls, colorful awnings, and people browsing goods. The setting appears to be an outdoor urban environment with warm afternoon light.",
  extractedText: "FRESH PRODUCE • ORGANIC • OPEN DAILY 8AM-6PM",
  objects: [
    { name: "Market Stall", confidence: 0.97 },
    { name: "Fresh Vegetables", confidence: 0.93 },
    { name: "Fruit Basket", confidence: 0.88 },
    { name: "Awning", confidence: 0.84 },
    { name: "Person", confidence: 0.79 },
  ],
  webResults: [
    {
      url: "https://en.wikipedia.org/wiki/Farmers_market",
      title: "Farmers Market - Wikipedia",
      snippet:
        "A farmers' market is a physical retail marketplace intended to sell foods directly by farmers to consumers. These markets date back to the ancient world.",
    },
    {
      url: "https://www.localfoodguide.org/markets",
      title: "Local Food Markets Guide | Find Fresh Produce Near You",
      snippet:
        "Discover local farmers markets and fresh produce stands in your area. Browse organic, sustainable, and seasonal offerings from trusted local vendors.",
    },
    {
      url: "https://www.healthline.com/nutrition/farmers-market-benefits",
      title: "10 Reasons to Shop at a Farmers Market | Healthline",
      snippet:
        "Buying from local markets supports regional agriculture, reduces environmental impact, and provides access to fresher, more nutritious produce.",
    },
  ],
};

const mockPrincipal = { toText: () => "mock-principal" } as unknown as Principal;

const mockScans: ScanRecord[] = [
  {
    id: "scan-001",
    userId: mockPrincipal,
    timestamp: BigInt(Date.now() - 3600000),
    imageBase64: "",
    mimeType: "image/jpeg",
    mode: AnalysisMode.plant,
    analysisResult: {
      ...mockAnalysisResult,
      sceneDescription: "A Monstera Deliciosa plant with large, glossy leaves.",
      objects: [{ name: "Monstera Deliciosa", confidence: 0.96 }],
    },
    shareToken: undefined,
  },
  {
    id: "scan-002",
    userId: mockPrincipal,
    timestamp: BigInt(Date.now() - 7200000),
    imageBase64: "",
    mimeType: "image/jpeg",
    mode: AnalysisMode.food,
    analysisResult: {
      ...mockAnalysisResult,
      sceneDescription: "A restaurant menu featuring Italian cuisine options.",
      objects: [{ name: "Restaurant Menu", confidence: 0.92 }],
    },
    shareToken: "share-token-abc123",
  },
  {
    id: "scan-003",
    userId: mockPrincipal,
    timestamp: BigInt(Date.now() - 10800000),
    imageBase64: "",
    mimeType: "image/jpeg",
    mode: AnalysisMode.receipt,
    analysisResult: {
      ...mockAnalysisResult,
      sceneDescription: "A receipt from a skincare product purchase.",
      extractedText: "Skincare Bottle — $45.99\nTotal: $49.23",
      objects: [{ name: "Skincare Bottle", confidence: 0.89 }],
    },
    shareToken: undefined,
  },
];

const mockCollections: Collection[] = [
  {
    id: "col-001",
    userId: mockPrincipal,
    name: "Plants & Nature",
    createdAt: BigInt(Date.now() - 86400000),
    scanIds: ["scan-001"],
  },
  {
    id: "col-002",
    userId: mockPrincipal,
    name: "Food & Recipes",
    createdAt: BigInt(Date.now() - 172800000),
    scanIds: ["scan-002"],
  },
];

// Local enum workaround for Variant_ai_user (not exported from backend enum)
const Variant_ai_user_local = { ai: "ai" as any, user: "user" as any };

// ── Discovery Feed ─────────────────────────────────────────────────────────────
const mockDiscoveryScans: DiscoveryScan[] = [
  {
    id: "discovery-001",
    scanId: "scan-001",
    analysisMode: AnalysisMode.plant,
    analysisResult: {
      sceneDescription: "A vibrant Monstera Deliciosa plant with large split leaves, photographed in natural morning light near a window.",
      extractedText: "",
      objects: [
        { name: "Monstera Deliciosa", confidence: 0.97 },
        { name: "Tropical Plant", confidence: 0.91 },
        { name: "Leaf", confidence: 0.88 },
      ],
      webResults: [
        { url: "https://en.wikipedia.org/wiki/Monstera_deliciosa", title: "Monstera deliciosa - Wikipedia", snippet: "Monstera deliciosa is a species of flowering plant native to tropical forests of southern Mexico." },
      ],
    },
    title: "Morning Monstera Study",
    likeCount: BigInt(84),
    viewCount: BigInt(312),
    ownerPrincipal: "aaaaa-aa",
    createdAt: BigInt(Date.now() - 3600000),
    tags: ["plant", "monstera", "indoor", "tropical"],
    privacy: Variant_open_unlisted.open,
    imageBase64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGYxZjEzIi8+PGVsbGlwc2UgY3g9IjE2MCIgY3k9IjEyMCIgcng9IjgwIiByeT0iNjAiIGZpbGw9IiMxNjMyMWMiLz48dGV4dCB4PSIxNjAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzRhYmI2YSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlBsYW50PC90ZXh0Pjwvc3ZnPg==",
  },
  {
    id: "discovery-002",
    scanId: "scan-002",
    analysisMode: AnalysisMode.food,
    analysisResult: {
      sceneDescription: "A beautifully plated pasta dish with fresh basil, cherry tomatoes and parmesan on a dark wooden table.",
      extractedText: "",
      objects: [
        { name: "Pasta", confidence: 0.96 },
        { name: "Plate", confidence: 0.90 },
        { name: "Basil", confidence: 0.85 },
      ],
      webResults: [],
    },
    title: "Handmade Tagliatelle al Pomodoro",
    likeCount: BigInt(47),
    viewCount: BigInt(203),
    ownerPrincipal: "bbbbb-bb",
    createdAt: BigInt(Date.now() - 7200000),
    tags: ["food", "pasta", "italian", "homemade"],
    privacy: Variant_open_unlisted.open,
    imageBase64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYwZDBkIi8+PGVsbGlwc2UgY3g9IjE2MCIgY3k9IjEyMCIgcng9IjcwIiByeT0iNTAiIGZpbGw9IiMzZDE1MTUiLz48dGV4dCB4PSIxNjAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmODA4MCIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkZvb2Q8L3RleHQ+PC9zdmc+",
  },
  {
    id: "discovery-003",
    scanId: "scan-003",
    analysisMode: AnalysisMode.artLandmark,
    analysisResult: {
      sceneDescription: "The Eiffel Tower photographed at golden hour with warm orange light illuminating the iron lattice structure.",
      extractedText: "",
      objects: [
        { name: "Eiffel Tower", confidence: 0.99 },
        { name: "Architecture", confidence: 0.93 },
      ],
      webResults: [
        { url: "https://en.wikipedia.org/wiki/Eiffel_Tower", title: "Eiffel Tower - Wikipedia", snippet: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France." },
      ],
    },
    title: "Golden Hour at the Eiffel Tower",
    likeCount: BigInt(231),
    viewCount: BigInt(1043),
    ownerPrincipal: "ccccc-cc",
    createdAt: BigInt(Date.now() - 86400000),
    tags: ["landmark", "paris", "eiffel", "travel", "architecture"],
    privacy: Variant_open_unlisted.open,
    imageBase64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYxNjA4Ii8+PHBvbHlnb24gcG9pbnRzPSIxNjAsMzAgMTIwLDIxMCAyMDAsMjEwIiBmaWxsPSIjNGEzNTEwIi8+PHRleHQgeD0iMTYwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmYmI5NDAiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5MYW5kbWFyazwvdGV4dD48L3N2Zz4=",
  },
  {
    id: "discovery-004",
    scanId: "scan-004",
    analysisMode: AnalysisMode.bookProduct,
    analysisResult: {
      sceneDescription: "A hardcover book with a dark minimalist cover design, titled 'The Design of Everyday Things'.",
      extractedText: "THE DESIGN OF EVERYDAY THINGS — Don Norman",
      objects: [
        { name: "Book", confidence: 0.98 },
        { name: "Cover Art", confidence: 0.87 },
      ],
      webResults: [],
    },
    title: "Design of Everyday Things — Classic UX",
    likeCount: BigInt(62),
    viewCount: BigInt(289),
    ownerPrincipal: "ddddd-dd",
    createdAt: BigInt(Date.now() - 172800000),
    tags: ["book", "design", "ux", "classic"],
    privacy: Variant_open_unlisted.open,
    imageBase64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGQxMTFmIi8+PHJlY3QgeD0iOTAiIHk9IjQwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE2MCIgZmlsbD0iIzFhMjY0MCIgcng9IjQiLz48dGV4dCB4PSIxNjAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYwYTVmYSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkJvb2s8L3RleHQ+PC9zdmc+",
  },
];

// ── Video Jobs ─────────────────────────────────────────────────────────────────
const mockVideoFrames: VideoFrame[] = [0, 1, 2, 3].map((i) => ({
  frameIndex: BigInt(i),
  timestamp: i * 5,
  processed: true,
  imageBase64: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTUxZTJlIi8+PHRleHQgeD0iODAiIHk9IjY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjBhNWZhIiBmb250LXNpemU9IjEyIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+RnJhbWUgJHtpICsgMX08L3RleHQ+PC9zdmc+`,
  analysisResult: {
    sceneDescription: `Frame ${i + 1}: A city street with pedestrians and vehicles at midday.`,
    extractedText: "",
    objects: [{ name: "Street", confidence: 0.9 }, { name: "Person", confidence: 0.85 }],
    webResults: [],
  },
}));

const mockVideoJobs: VideoAnalysisJob[] = [
  {
    id: "job-001",
    videoName: "city-walk.mp4",
    analysisMode: AnalysisMode.generic,
    ownerPrincipal: "aaaaa-aa",
    createdAt: BigInt(Date.now() - 3600000),
    frameInterval: BigInt(5),
    frameCount: BigInt(4),
    status: Variant_pending_completed_processing_failed.completed,
    frames: mockVideoFrames,
  },
];

// ── User Settings ──────────────────────────────────────────────────────────────
const mockUserSettings: UserSettings = {
  webSearchEnabled: true,
  historyRetentionDays: BigInt(30),
  scanResultLayout: Variant_stacked_compact_sideBySide.stacked,
  theme: Variant_auto_dark_light.dark,
  tagAggressiveness: Variant_aggressive_subtle_moderate.moderate,
  collectionOrganizationMode: Variant_tagBased_flat.tagBased,
  exportFormat: Variant_csv_pdf_json.pdf,
  language: "en",
  resultDetailLevel: Variant_detailed_compact_standard.standard,
  defaultScanPrivacy: Variant_open_unlisted_onlyMe.open,
  showConfidenceScores: true,
  autoSaveScans: false,
};

export const mockBackend: backendInterface = {
  analyzeImage: async (_imageBase64: string, _mimeType: string, _mode: AnalysisMode | null) =>
    mockAnalysisResult,

  saveScan: async (
    _imageBase64: string,
    _mimeType: string,
    _mode: AnalysisMode,
    _analysisResult: AnalysisResult,
  ) => `scan-${Date.now()}`,

  getScanHistory: async () => mockScans,

  deleteScan: async (_scanId: string) => {
    // noop in mock
  },

  createShareToken: async (_scanId: string) => `share-token-${Date.now()}`,

  getSharedScan: async (token: string) => {
    const scan = mockScans.find((s) => s.shareToken === token);
    return scan ?? null;
  },

  saveScanToMyHistory: async (_sharedToken: string) => `scan-saved-${Date.now()}`,

  createCollection: async (name: string) => {
    const newId = `col-${Date.now()}`;
    mockCollections.push({
      id: newId,
      userId: mockPrincipal,
      name,
      createdAt: BigInt(Date.now()),
      scanIds: [],
    });
    return newId;
  },

  getUserCollections: async () => mockCollections,

  getCollection: async (collectionId: string) =>
    mockCollections.find((c) => c.id === collectionId) ?? null,

  addScanToCollection: async (collectionId: string, scanId: string) => {
    const col = mockCollections.find((c) => c.id === collectionId);
    if (col && !col.scanIds.includes(scanId)) {
      col.scanIds.push(scanId);
    }
  },

  removeFromCollection: async (collectionId: string, scanId: string) => {
    const col = mockCollections.find((c) => c.id === collectionId);
    if (col) {
      col.scanIds = col.scanIds.filter((id) => id !== scanId);
    }
  },

  deleteCollection: async (collectionId: string) => {
    const idx = mockCollections.findIndex((c) => c.id === collectionId);
    if (idx !== -1) mockCollections.splice(idx, 1);
  },

  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),

  getPublicDiscoveryFeed: async (_filter: DiscoveryFilter): Promise<DiscoveryScan[]> => mockDiscoveryScans,

  getUserSettings: async (): Promise<UserSettings | null> => mockUserSettings,

  saveUserSettings: async (_settings: UserSettings) => {},

  getUserVideoJobs: async (): Promise<VideoAnalysisJob[]> => mockVideoJobs,

  getVideoAnalysisJob: async (_jobId: string): Promise<VideoAnalysisJob | null> => mockVideoJobs[0] ?? null,

  saveVideoAnalysisJob: async (_job: VideoAnalysisJob) => `video-job-${Date.now()}`,

  updateVideoFrameResult: async (_jobId: string, _frameIndex: bigint, _result: AnalysisResult) => ({
    __kind__: "ok" as const,
    ok: null,
  }),

  publishScanToDiscovery: async () => ({ __kind__: "ok" as const, ok: `discovery-${Date.now()}` }),

  unpublishScanFromDiscovery: async () => ({ __kind__: "ok" as const, ok: null }),

  likeDiscoveryScan: async () => ({ __kind__: "ok" as const, ok: null }),

  suggestTags: async (_request: TagSuggestionRequest): Promise<TagSuggestion[]> => [
    { tag: "nature", source: Variant_ai_user_local.ai, confidence: 0.95 },
    { tag: "outdoor", source: Variant_ai_user_local.ai, confidence: 0.88 },
    { tag: "photography", source: Variant_ai_user_local.ai, confidence: 0.82 },
  ],
};
