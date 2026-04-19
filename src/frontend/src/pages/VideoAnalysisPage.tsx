import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Film,
  Layers,
  Loader2,
  Play,
  RotateCcw,
  Upload,
  Video,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { createActor } from "../backend";
import {
  AnalysisMode,
  type AnalysisResult,
  Variant_pending_completed_processing_failed,
  type VideoAnalysisJob,
} from "../backend.d";
import {
  type ExtractedFrame,
  estimateFrameCount,
  extractFramesFromVideo,
  processFrames,
  useSaveVideoJob,
  useUpdateFrameResult,
  useVideoJobs,
} from "../hooks/useVideoAnalysis";

// ── Mode config ───────────────────────────────────────────────────────────────

const MODES: { value: AnalysisMode; label: string; cssVar: string }[] = [
  { value: AnalysisMode.generic, label: "General", cssVar: "--mode-generic" },
  { value: AnalysisMode.plant, label: "Plants", cssVar: "--mode-plant" },
  { value: AnalysisMode.food, label: "Food", cssVar: "--mode-food" },
  {
    value: AnalysisMode.bookProduct,
    label: "Books & Products",
    cssVar: "--mode-book",
  },
  {
    value: AnalysisMode.translation,
    label: "Translation",
    cssVar: "--mode-translation",
  },
  {
    value: AnalysisMode.artLandmark,
    label: "Art & Landmarks",
    cssVar: "--mode-art",
  },
  {
    value: AnalysisMode.receipt,
    label: "Receipts & Docs",
    cssVar: "--mode-receipt",
  },
  {
    value: AnalysisMode.medicalReference,
    label: "Medical Ref.",
    cssVar: "--mode-medical",
  },
  {
    value: AnalysisMode.carFashion,
    label: "Car & Fashion",
    cssVar: "--mode-car",
  },
];

const MAX_FRAMES_OPTIONS = [5, 10, 20, 50] as const;
type MaxFrames = (typeof MAX_FRAMES_OPTIONS)[number];

// ── Step indicator ────────────────────────────────────────────────────────────

const STEPS = ["Upload & Configure", "Processing", "Results"] as const;

function StepIndicator({ current }: { current: 0 | 1 | 2 }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-display font-semibold transition-smooth border"
              style={
                i < current
                  ? {
                      background: "oklch(var(--primary))",
                      borderColor: "oklch(var(--primary))",
                      color: "oklch(var(--primary-foreground))",
                    }
                  : i === current
                    ? {
                        background: "oklch(var(--primary) / 0.15)",
                        borderColor: "oklch(var(--primary))",
                        color: "oklch(var(--primary))",
                      }
                    : {
                        background: "oklch(var(--muted))",
                        borderColor: "oklch(var(--border))",
                        color: "oklch(var(--muted-foreground))",
                      }
              }
            >
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className="text-xs font-body hidden sm:block"
              style={{
                color:
                  i === current
                    ? "oklch(var(--foreground))"
                    : "oklch(var(--muted-foreground))",
              }}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="w-16 h-px mx-2 mb-4"
              style={{
                background:
                  i < current
                    ? "oklch(var(--primary))"
                    : "oklch(var(--border))",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Frame thumbnail card ──────────────────────────────────────────────────────

interface FrameCardProps {
  frame: ExtractedFrame;
  result?: AnalysisResult;
  isProcessing: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  index: number;
}

function FrameCard({
  frame,
  result,
  isProcessing,
  isExpanded,
  onToggleExpand,
  index,
}: FrameCardProps) {
  const ts = frame.timestamp;
  const minutes = Math.floor(ts / 60);
  const seconds = Math.floor(ts % 60);
  const timeLabel = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass-card overflow-hidden"
      data-ocid={`video.frame_card.${index + 1}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {frame.imageBase64 ? (
          <img
            src={`data:image/jpeg;base64,${frame.imageBase64}`}
            alt={`Frame at ${timeLabel}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Film className="w-6 h-6 text-muted-foreground" />
          </div>
        )}

        {/* Status overlay */}
        <div className="absolute top-1.5 right-1.5">
          {isProcessing ? (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "oklch(var(--card) / 0.9)" }}
            >
              <Loader2
                className="w-3.5 h-3.5 animate-spin"
                style={{ color: "oklch(var(--primary))" }}
              />
            </div>
          ) : result ? (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "oklch(var(--success) / 0.2)" }}
            >
              <CheckCircle2
                className="w-3.5 h-3.5"
                style={{ color: "oklch(var(--success))" }}
              />
            </div>
          ) : null}
        </div>

        {/* Timestamp badge */}
        <div
          className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-xs font-mono"
          style={{
            background: "oklch(var(--overlay-dark) / 0.85)",
            color: "oklch(var(--foreground))",
          }}
        >
          {timeLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {result ? (
          <>
            <p className="text-xs font-body text-muted-foreground line-clamp-2">
              {result.sceneDescription || "No description"}
            </p>

            {result.objects.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {result.objects.slice(0, 3).map((obj) => (
                  <Badge
                    key={obj.name}
                    variant="outline"
                    className="text-xs px-1.5 py-0 h-auto"
                  >
                    {obj.name}
                    <span className="ml-1 opacity-60">
                      {Math.round(obj.confidence * 100)}%
                    </span>
                  </Badge>
                ))}
                {result.objects.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0 h-auto"
                  >
                    +{result.objects.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full h-7 text-xs"
              onClick={onToggleExpand}
              data-ocid={`video.frame_expand.${index + 1}`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" /> Collapse
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 mr-1" /> Full Analysis
                </>
              )}
            </Button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 space-y-3">
                    <Separator />
                    {result.sceneDescription && (
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wide">
                          Scene
                        </p>
                        <p className="text-xs font-body">
                          {result.sceneDescription}
                        </p>
                      </div>
                    )}
                    {result.extractedText && (
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wide">
                          Text
                        </p>
                        <p className="text-xs font-body font-mono">
                          {result.extractedText}
                        </p>
                      </div>
                    )}
                    {result.objects.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wide">
                          Detected Objects
                        </p>
                        <div className="space-y-1">
                          {result.objects.map((obj) => (
                            <div
                              key={obj.name}
                              className="flex items-center justify-between"
                            >
                              <span className="text-xs font-body truncate">
                                {obj.name}
                              </span>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                <div
                                  className="h-1 w-16 rounded-full overflow-hidden"
                                  style={{
                                    background: "oklch(var(--progress-bg))",
                                  }}
                                >
                                  <div
                                    className="h-full rounded-full confidence-fill"
                                    style={{
                                      width: `${obj.confidence * 100}%`,
                                      background: "oklch(var(--primary))",
                                    }}
                                  />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground w-9 text-right">
                                  {Math.round(obj.confidence * 100)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.webResults.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wide">
                          Web Results
                        </p>
                        <div className="space-y-1">
                          {result.webResults.slice(0, 2).map((wr) => (
                            <a
                              key={wr.url}
                              href={wr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xs text-primary hover:underline truncate"
                            >
                              {wr.title || wr.url}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : isProcessing ? (
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-3/4 rounded" />
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Waiting...</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Past jobs list ────────────────────────────────────────────────────────────

function PastJobsList({
  onSelect,
}: {
  onSelect: (job: VideoAnalysisJob) => void;
}) {
  const { data: jobs, isLoading } = useVideoJobs();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <div
        className="text-center py-8 text-muted-foreground text-sm"
        data-ocid="video.past_jobs.empty_state"
      >
        No past video analyses yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {jobs.map((job, i) => {
        const statusColor =
          job.status === Variant_pending_completed_processing_failed.completed
            ? "oklch(var(--success))"
            : job.status ===
                Variant_pending_completed_processing_failed.processing
              ? "oklch(var(--primary))"
              : job.status ===
                  Variant_pending_completed_processing_failed.failed
                ? "oklch(var(--destructive))"
                : "oklch(var(--muted-foreground))";

        const date = new Date(
          Number(job.createdAt) / 1_000_000,
        ).toLocaleDateString();

        return (
          <button
            type="button"
            key={job.id}
            className="history-item w-full text-left"
            onClick={() => onSelect(job)}
            data-ocid={`video.past_job.${i + 1}`}
          >
            <div
              className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(var(--muted))" }}
            >
              <Video className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="history-item-title">{job.videoName}</p>
              <p className="history-item-time">
                {Number(job.frameCount)} frames · {date}
              </p>
            </div>
            <span
              className="text-xs font-mono capitalize px-2 py-0.5 rounded-full"
              style={{ color: statusColor }}
            >
              {job.status}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function VideoAnalysisPage() {
  const { actor } = useActor(createActor);
  const saveJobMutation = useSaveVideoJob();
  const updateFrameMutation = useUpdateFrameResult();

  // Step state
  const [step, setStep] = useState<0 | 1 | 2>(0);

  // Step 1 state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AnalysisMode>(
    AnalysisMode.generic,
  );
  const [frameInterval, setFrameInterval] = useState(5);
  const [maxFrames, setMaxFrames] = useState<MaxFrames>(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 2 state
  const [extractedFrames, setExtractedFrames] = useState<ExtractedFrame[]>([]);
  const [frameResults, setFrameResults] = useState<
    Record<number, AnalysisResult>
  >({});
  const [processingIndex, setProcessingIndex] = useState<number>(-1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const cancelRef = useRef<boolean>(false);

  // Step 3 state
  const [expandedFrames, setExpandedFrames] = useState<Set<number>>(new Set());
  const [showPastJobs, setShowPastJobs] = useState(false);

  const estimatedFrames = estimateFrameCount(
    videoDuration,
    frameInterval,
    maxFrames,
  );

  // ── File handling ──────────────────────────────────────────────────────────

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("video/")) {
      setExtractionError(
        "Please select a valid video file (MP4, WebM, MOV, AVI).",
      );
      return;
    }
    setExtractionError(null);
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleVideoLoaded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      setVideoDuration(e.currentTarget.duration);
    },
    [],
  );

  // ── Start analysis ─────────────────────────────────────────────────────────

  const handleStartAnalysis = useCallback(async () => {
    if (!videoFile || !actor) return;

    setIsExtracting(true);
    setExtractionError(null);
    cancelRef.current = false;

    try {
      const frames = await extractFramesFromVideo(
        videoFile,
        frameInterval,
        maxFrames,
      );

      if (cancelRef.current) return;
      setExtractedFrames(frames);
      setFrameResults({});
      setProcessingIndex(0);

      const now = BigInt(Date.now()) * 1_000_000n;
      const jobId = await saveJobMutation.mutateAsync({
        id: "",
        videoName: videoFile.name,
        ownerPrincipal: "",
        frameCount: BigInt(frames.length),
        frameInterval: BigInt(frameInterval),
        analysisMode: selectedMode,
        frames: frames.map((f) => ({
          frameIndex: BigInt(f.frameIndex),
          timestamp: f.timestamp,
          imageBase64: f.imageBase64,
          analysisResult: undefined,
          processed: false,
        })),
        status: Variant_pending_completed_processing_failed.processing,
        createdAt: now,
      });

      setIsExtracting(false);
      setStep(1);

      await processFrames({
        frames,
        jobId,
        analysisMode: selectedMode,
        analyzeImageFn: async (b64, mime, mode) => {
          if (!actor) throw new Error("No actor");
          return actor.analyzeImage(b64, mime, mode);
        },
        updateFrameResultFn: async (jId, idx, result) => {
          await updateFrameMutation.mutateAsync({
            jobId: jId,
            frameIndex: idx,
            result,
          });
        },
        onFrameDone: (index, result) => {
          setProcessingIndex(index + 1);
          setFrameResults((prev) => ({ ...prev, [index]: result }));
        },
        cancelRef,
      });

      setProcessingIndex(-1);
      setStep(2);
    } catch (err) {
      setIsExtracting(false);
      setExtractionError(
        err instanceof Error
          ? err.message
          : "An error occurred during analysis.",
      );
    }
  }, [
    videoFile,
    actor,
    frameInterval,
    maxFrames,
    selectedMode,
    saveJobMutation,
    updateFrameMutation,
  ]);

  // ── Cancel ─────────────────────────────────────────────────────────────────

  const handleCancel = useCallback(() => {
    cancelRef.current = true;
    setProcessingIndex(-1);
    setStep(2);
  }, []);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    cancelRef.current = true;
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setVideoDuration(0);
    setExtractedFrames([]);
    setFrameResults({});
    setProcessingIndex(-1);
    setExtractionError(null);
    setExpandedFrames(new Set());
    setStep(0);
  }, [videoPreviewUrl]);

  // ── Load past job ──────────────────────────────────────────────────────────

  const handleLoadPastJob = useCallback((job: VideoAnalysisJob) => {
    const loaded: ExtractedFrame[] = job.frames.map((f) => ({
      frameIndex: Number(f.frameIndex),
      timestamp: f.timestamp,
      imageBase64: f.imageBase64,
      thumbnail: f.imageBase64,
    }));
    const results: Record<number, AnalysisResult> = {};
    for (const f of job.frames) {
      if (f.analysisResult) {
        results[Number(f.frameIndex)] = f.analysisResult as AnalysisResult;
      }
    }
    setExtractedFrames(loaded);
    setFrameResults(results);
    setProcessingIndex(-1);
    setStep(2);
  }, []);

  // ── Step 1 render ──────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      {/* Drop zone / preview */}
      {!videoFile ? (
        <div
          className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-smooth ${
            isDragging ? "glow-border" : ""
          }`}
          style={{
            borderColor: isDragging
              ? "oklch(var(--primary))"
              : "oklch(var(--border))",
            background: isDragging
              ? "oklch(var(--primary) / 0.05)"
              : "oklch(var(--card))",
            minHeight: "220px",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          data-ocid="video.dropzone"
        >
          <label
            htmlFor="video-file-input"
            className="w-full h-full p-10 flex flex-col items-center justify-center gap-4 cursor-pointer"
            aria-label="Upload video file"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "oklch(var(--primary) / 0.12)" }}
            >
              <Upload
                className="w-7 h-7"
                style={{ color: "oklch(var(--primary))" }}
              />
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-lg">
                Drop a video file here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                MP4, WebM, MOV, AVI · or click to browse
              </p>
            </div>
            <input
              ref={fileInputRef}
              id="video-file-input"
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileSelect(f);
              }}
              data-ocid="video.file_input"
            />
          </label>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="relative">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={videoPreviewUrl ?? undefined}
              className="w-full rounded-t-lg max-h-64 object-contain bg-black"
              controls
              onLoadedMetadata={handleVideoLoaded}
              data-ocid="video.preview_player"
            >
              <track kind="captions" />
            </video>
            <button
              type="button"
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-smooth"
              style={{ background: "oklch(var(--card) / 0.9)" }}
              onClick={handleReset}
              data-ocid="video.remove_file_button"
              aria-label="Remove video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 flex items-center gap-3">
            <Film className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium truncate">
                {videoFile.name}
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                {videoDuration > 0 &&
                  ` · ${Math.floor(videoDuration / 60)}:${String(
                    Math.floor(videoDuration % 60),
                  ).padStart(2, "0")} duration`}
              </p>
            </div>
          </div>
        </div>
      )}

      {extractionError && (
        <div
          className="flex items-start gap-2 p-3 rounded-md text-sm"
          style={{
            background: "oklch(var(--destructive) / 0.12)",
            color: "oklch(var(--destructive))",
            border: "1px solid oklch(var(--destructive) / 0.3)",
          }}
          data-ocid="video.upload_error_state"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {extractionError}
        </div>
      )}

      {/* Analysis mode selector */}
      <div>
        <p className="text-sm font-body font-medium mb-2 text-muted-foreground uppercase tracking-wide">
          Analysis Mode
        </p>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              type="button"
              key={m.value}
              className={`mode-badge mode-badge-${m.value} ${selectedMode === m.value ? "active" : ""}`}
              style={
                selectedMode === m.value
                  ? {
                      borderColor: `oklch(var(${m.cssVar}))`,
                      color: `oklch(var(${m.cssVar}))`,
                      background: `oklch(var(${m.cssVar}) / 0.1)`,
                    }
                  : undefined
              }
              onClick={() => setSelectedMode(m.value)}
              data-ocid={`video.mode.${m.value}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Frame extraction settings */}
      <div className="glass-card p-4 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Layers
            className="w-4 h-4"
            style={{ color: "oklch(var(--primary))" }}
          />
          <p className="font-display font-semibold text-sm">
            Frame Extraction Settings
          </p>
        </div>

        {/* Interval slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label
              htmlFor="frame-interval-slider"
              className="text-sm font-body text-muted-foreground"
            >
              Extract a frame every
            </label>
            <span
              className="text-sm font-mono font-semibold"
              style={{ color: "oklch(var(--primary))" }}
            >
              {frameInterval}s
            </span>
          </div>
          <input
            id="frame-interval-slider"
            type="range"
            min={1}
            max={30}
            value={frameInterval}
            onChange={(e) => setFrameInterval(Number(e.target.value))}
            className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
            data-ocid="video.frame_interval_slider"
          />
          <div className="flex justify-between text-xs font-mono text-muted-foreground mt-1">
            <span>1s</span>
            <span>30s</span>
          </div>
        </div>

        {/* Max frames */}
        <div>
          <p className="text-sm font-body text-muted-foreground mb-2">
            Maximum Frames
          </p>
          <div className="flex gap-2">
            {MAX_FRAMES_OPTIONS.map((n) => (
              <button
                type="button"
                key={n}
                className={`flex-1 py-2 rounded-md text-sm font-mono font-semibold border transition-smooth ${
                  maxFrames === n ? "glow-border" : ""
                }`}
                style={
                  maxFrames === n
                    ? {
                        background: "oklch(var(--primary) / 0.12)",
                        borderColor: "oklch(var(--primary))",
                        color: "oklch(var(--primary))",
                      }
                    : {
                        background: "oklch(var(--muted))",
                        borderColor: "oklch(var(--border))",
                        color: "oklch(var(--foreground))",
                      }
                }
                onClick={() => setMaxFrames(n)}
                data-ocid={`video.max_frames.${n}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Estimate */}
        {videoDuration > 0 && (
          <div
            className="flex items-center gap-2 p-2 rounded-md"
            style={{ background: "oklch(var(--muted))" }}
          >
            <Zap
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "oklch(var(--secondary))" }}
            />
            <p className="text-xs font-mono text-muted-foreground">
              Estimated{" "}
              <span
                className="font-semibold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {estimatedFrames} frames
              </span>{" "}
              from {Math.floor(videoDuration / 60)}:
              {String(Math.floor(videoDuration % 60)).padStart(2, "0")} video
            </p>
          </div>
        )}
      </div>

      <Button
        type="button"
        className="w-full font-display font-semibold h-12 text-base"
        disabled={!videoFile || isExtracting || !actor}
        onClick={handleStartAnalysis}
        data-ocid="video.start_analysis_button"
      >
        {isExtracting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Extracting frames…
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Extract &amp; Analyze Frames
          </>
        )}
      </Button>
    </motion.div>
  );

  // ── Step 2 render ──────────────────────────────────────────────────────────

  const processedCount = Object.keys(frameResults).length;
  const totalFrames = extractedFrames.length;
  const progressPercent =
    totalFrames > 0 ? (processedCount / totalFrames) * 100 : 0;

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Progress header */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Loader2
              className="w-4 h-4 animate-spin"
              style={{ color: "oklch(var(--primary))" }}
            />
            <p className="font-display font-semibold">
              Analyzing frame{" "}
              {processingIndex >= 0 ? processingIndex + 1 : processedCount} of{" "}
              {totalFrames}…
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            data-ocid="video.cancel_button"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>

        <div className="progress-container">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="progress-label">
            <span>
              {processedCount}/{totalFrames} frames
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
        </div>
      </div>

      {/* Frame grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {extractedFrames.map((frame, i) => (
          <FrameCard
            key={frame.frameIndex}
            frame={frame}
            result={frameResults[frame.frameIndex]}
            isProcessing={processingIndex === frame.frameIndex}
            isExpanded={false}
            onToggleExpand={() => {}}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );

  // ── Step 3 render ──────────────────────────────────────────────────────────

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2
            className="w-5 h-5"
            style={{ color: "oklch(var(--success))" }}
          />
          <h2 className="font-display font-semibold text-lg">
            Analysis Complete · {processedCount}/{totalFrames} frames
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPastJobs((v) => !v)}
            data-ocid="video.toggle_past_jobs_button"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            Past Jobs
            {showPastJobs ? (
              <ChevronUp className="w-3.5 h-3.5 ml-1" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            )}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleReset}
            data-ocid="video.new_analysis_button"
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Past jobs panel */}
      <AnimatePresence>
        {showPastJobs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            data-ocid="video.past_jobs_panel"
          >
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock
                  className="w-4 h-4"
                  style={{ color: "oklch(var(--primary))" }}
                />
                <p className="font-display font-semibold text-sm">
                  Previous Video Jobs
                </p>
              </div>
              <ScrollArea className="max-h-48">
                <PastJobsList onSelect={handleLoadPastJob} />
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {extractedFrames.map((frame, i) => (
          <FrameCard
            key={frame.frameIndex}
            frame={frame}
            result={frameResults[frame.frameIndex]}
            isProcessing={false}
            isExpanded={expandedFrames.has(frame.frameIndex)}
            onToggleExpand={() => {
              setExpandedFrames((prev) => {
                const next = new Set(prev);
                if (next.has(frame.frameIndex)) {
                  next.delete(frame.frameIndex);
                } else {
                  next.add(frame.frameIndex);
                }
                return next;
              });
            }}
            index={i}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="flex gap-3 justify-center pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPastJobs(true)}
          data-ocid="video.view_all_jobs_button"
        >
          <Clock className="w-4 h-4 mr-2" />
          View All Past Jobs
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          data-ocid="video.start_new_button"
        >
          <Camera className="w-4 h-4 mr-2" />
          Start New Analysis
        </Button>
      </div>
    </motion.div>
  );

  // ── Page shell ─────────────────────────────────────────────────────────────

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-2">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "oklch(var(--primary) / 0.15)" }}
        >
          <Video
            className="w-5 h-5"
            style={{ color: "oklch(var(--primary))" }}
          />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl">
            Video Frame Analysis
          </h1>
          <p className="text-sm text-muted-foreground">
            Extract and analyze frames from any video using Venice AI
          </p>
        </div>
      </div>

      <StepIndicator current={step} />

      <AnimatePresence mode="wait">
        {step === 0 && renderStep1()}
        {step === 1 && renderStep2()}
        {step === 2 && renderStep3()}
      </AnimatePresence>
    </div>
  );
}
