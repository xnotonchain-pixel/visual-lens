import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Aperture,
  Camera,
  ChevronDown,
  Film,
  Image,
  Play,
  ScanLine,
  ScanSearch,
  Square,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnalysis } from "../hooks/useAnalysis";
import { useLensStore } from "../store";
import type { AnalysisMode } from "../types";

// ── Analysis mode definitions ─────────────────────────────────────────────────
interface ModeDefinition {
  mode: AnalysisMode;
  label: string;
  emoji: string;
  description: string;
  cssKey: string;
  colorVar: string;
}

const MODES: ModeDefinition[] = [
  {
    mode: "generic" as AnalysisMode,
    label: "Generic",
    emoji: "🔍",
    description: "Objects, text & scene",
    cssKey: "generic",
    colorVar: "--mode-generic",
  },
  {
    mode: "plant" as AnalysisMode,
    label: "Plant ID",
    emoji: "🌿",
    description: "Species, care & toxicity",
    cssKey: "plant",
    colorVar: "--mode-plant",
  },
  {
    mode: "food" as AnalysisMode,
    label: "Food Scanner",
    emoji: "🍽️",
    description: "Nutrition & recipes",
    cssKey: "food",
    colorVar: "--mode-food",
  },
  {
    mode: "bookProduct" as AnalysisMode,
    label: "Book/Product",
    emoji: "📦",
    description: "Reviews, prices & buy links",
    cssKey: "book",
    colorVar: "--mode-book",
  },
  {
    mode: "translation" as AnalysisMode,
    label: "Translation",
    emoji: "🌐",
    description: "Signs, menus & documents",
    cssKey: "translation",
    colorVar: "--mode-translation",
  },
  {
    mode: "artLandmark" as AnalysisMode,
    label: "Art/Landmark",
    emoji: "🏛️",
    description: "History, context & artist",
    cssKey: "art",
    colorVar: "--mode-art",
  },
  {
    mode: "receipt" as AnalysisMode,
    label: "Receipt Parser",
    emoji: "🧾",
    description: "Itemize & total expenses",
    cssKey: "receipt",
    colorVar: "--mode-receipt",
  },
  {
    mode: "medicalReference" as AnalysisMode,
    label: "Medical Ref.",
    emoji: "⚕️",
    description: "Skin & condition reference",
    cssKey: "medical",
    colorVar: "--mode-medical",
  },
  {
    mode: "carFashion" as AnalysisMode,
    label: "Car/Fashion",
    emoji: "🚗",
    description: "Model, style & where to buy",
    cssKey: "car",
    colorVar: "--mode-car",
  },
];

// ── Mode selector grid ────────────────────────────────────────────────────────
function ModeSelectorGrid({
  selected,
  onSelect,
}: {
  selected: AnalysisMode;
  onSelect: (mode: AnalysisMode) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
        Analysis Mode
      </p>
      <div className="grid grid-cols-3 gap-2" data-ocid="capture.mode_grid">
        {MODES.map((m) => {
          const isActive = selected === m.mode;
          return (
            <button
              key={m.mode}
              type="button"
              data-ocid={`capture.mode_card.${m.cssKey}`}
              onClick={() => onSelect(m.mode)}
              className={[
                "mode-badge",
                `mode-badge-${m.cssKey}`,
                isActive ? "active" : "",
                "flex-col items-start gap-1 p-2.5 text-left h-auto rounded-md transition-smooth focus-ring",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:border-border",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                isActive
                  ? {
                      borderColor: `oklch(var(${m.colorVar}))`,
                      backgroundColor: `oklch(var(${m.colorVar}) / 0.08)`,
                    }
                  : undefined
              }
              aria-pressed={isActive}
            >
              <span className="text-lg leading-none">{m.emoji}</span>
              <span
                className="text-xs font-semibold leading-tight"
                style={
                  isActive ? { color: `oklch(var(${m.colorVar}))` } : undefined
                }
              >
                {m.label}
              </span>
              <span className="text-[10px] leading-tight text-muted-foreground font-normal line-clamp-1">
                {m.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Mode re-analysis bar (shown after capture) ────────────────────────────────
function ModeReanalysisBar({
  selected,
  onSelect,
  onReanalyze,
  isAnalyzing,
}: {
  selected: AnalysisMode;
  onSelect: (mode: AnalysisMode) => void;
  onReanalyze: () => void;
  isAnalyzing: boolean;
}) {
  const [open, setOpen] = useState(false);
  const modeInfo = MODES.find((m) => m.mode === selected) ?? MODES[0];

  return (
    <div className="relative flex items-center gap-2 flex-wrap">
      <button
        type="button"
        data-ocid="capture.change_mode_button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/30 hover:bg-muted/60 transition-smooth text-sm font-medium focus-ring"
        aria-expanded={open}
      >
        <span>{modeInfo.emoji}</span>
        <span className="text-foreground">{modeInfo.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-smooth ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 glass-card shadow-lg p-2 w-56 animate-fade-in"
          data-ocid="capture.mode_dropdown"
        >
          {MODES.map((m) => (
            <button
              key={m.mode}
              type="button"
              data-ocid={`capture.reanalyze_mode.${m.cssKey}`}
              onClick={() => {
                onSelect(m.mode);
                setOpen(false);
              }}
              className={[
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-smooth text-left",
                selected === m.mode
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              ].join(" ")}
            >
              <span>{m.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium leading-tight">{m.label}</div>
                <div className="text-[10px] text-muted-foreground leading-tight truncate">
                  {m.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      <Button
        data-ocid="capture.reanalyze_button"
        size="sm"
        variant="outline"
        disabled={isAnalyzing}
        onClick={onReanalyze}
        className="gap-1.5 text-xs"
      >
        <ScanSearch className="w-3.5 h-3.5" />
        Re-analyze
      </Button>
    </div>
  );
}

// ── Camera view (photo + video modes) ─────────────────────────────────────────
type CaptureSubMode = "photo" | "video";

function CameraView({
  onCapture,
}: {
  onCapture: (base64: string, mime: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [streaming, setStreaming] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [subMode, setSubMode] = useState<CaptureSubMode>("photo");
  const [recording, setRecording] = useState(false);
  const [, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [frameTime, setFrameTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const scrubberVideoRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(async () => {
    setCamError(null);
    setVideoBlob(null);
    setVideoUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      setCamError(
        "Camera access denied. Please allow camera permissions and try again.",
      );
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      for (const t of (videoRef.current.srcObject as MediaStream).getTracks())
        t.stop();
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  }, []);

  // Cleanup video URL on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    onCapture(dataUrl.split(",")[1], "image/jpeg");
  }, [onCapture, stopCamera]);

  const startRecording = useCallback(() => {
    if (!videoRef.current?.srcObject) return;
    chunksRef.current = [];
    const stream = videoRef.current.srcObject as MediaStream;
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType });
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoBlob(blob);
      setVideoUrl(url);
      stopCamera();
    };
    recorder.start();
    setRecording(true);
  }, [stopCamera]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, []);

  const extractFrame = useCallback(() => {
    const video = scrubberVideoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    onCapture(dataUrl.split(",")[1], "image/jpeg");
  }, [onCapture]);

  if (camError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
        <p className="text-sm text-muted-foreground max-w-xs">{camError}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCamError(null)}
          data-ocid="capture.retry_camera_button"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Video frame scrubber
  if (videoUrl) {
    return (
      <div className="flex flex-col gap-4 animate-slide-up">
        <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
          Pick a frame to analyze
        </p>
        <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted">
          <video
            ref={scrubberVideoRef}
            src={videoUrl}
            className="w-full object-contain max-h-56"
            onLoadedMetadata={(e) => {
              const dur = (e.target as HTMLVideoElement).duration;
              setVideoDuration(Number.isFinite(dur) ? dur : 0);
            }}
          >
            <track kind="captions" />
          </video>
        </div>
        <div className="flex flex-col gap-2">
          <input
            data-ocid="capture.frame_scrubber"
            type="range"
            min={0}
            max={videoDuration || 1}
            step={0.033}
            value={frameTime}
            onChange={(e) => {
              const t = Number(e.target.value);
              setFrameTime(t);
              if (scrubberVideoRef.current) {
                scrubberVideoRef.current.currentTime = t;
              }
            }}
            className="w-full accent-primary cursor-pointer"
            aria-label="Frame position"
          />
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>{frameTime.toFixed(2)}s</span>
            <span>{videoDuration.toFixed(2)}s</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            data-ocid="capture.extract_frame_button"
            onClick={extractFrame}
            className="gap-2 flex-1"
          >
            <Image className="w-4 h-4" />
            Use This Frame
          </Button>
          <Button
            data-ocid="capture.discard_video_button"
            variant="outline"
            onClick={() => {
              setVideoBlob(null);
              setVideoUrl(null);
              setFrameTime(0);
            }}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Discard
          </Button>
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Photo / Video sub-mode toggle */}
      <div
        className="flex rounded-md border border-border overflow-hidden w-full"
        data-ocid="capture.camera_submode_tabs"
      >
        <button
          type="button"
          data-ocid="capture.photo_submode_tab"
          onClick={() => setSubMode("photo")}
          className={[
            "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium transition-smooth",
            subMode === "photo"
              ? "bg-primary/20 text-primary border-r border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-r border-border",
          ].join(" ")}
        >
          <Camera className="w-3.5 h-3.5" />
          Photo
        </button>
        <button
          type="button"
          data-ocid="capture.video_submode_tab"
          onClick={() => setSubMode("video")}
          className={[
            "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium transition-smooth",
            subMode === "video"
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
          ].join(" ")}
        >
          <Film className="w-3.5 h-3.5" />
          Video Frame
        </button>
      </div>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
        {streaming ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Recording indicator */}
            {recording && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-destructive/90 text-xs font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                REC
              </div>
            )}
            {/* Corner-bracket viewfinder overlay */}
            <div className="absolute inset-4 pointer-events-none">
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary rounded-tr" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary rounded-bl" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
            {subMode === "video" ? (
              <Film className="w-12 h-12 opacity-30" />
            ) : (
              <Camera className="w-12 h-12 opacity-30" />
            )}
            <p className="text-sm">Camera inactive</p>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />

      {streaming ? (
        <div className="flex items-center gap-4">
          {subMode === "photo" ? (
            <button
              type="button"
              data-ocid="capture.capture_button"
              onClick={capture}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:opacity-80 transition-smooth focus-ring"
              aria-label="Capture photo"
            >
              <Aperture className="w-7 h-7 text-primary-foreground" />
            </button>
          ) : recording ? (
            <button
              type="button"
              data-ocid="capture.stop_recording_button"
              onClick={stopRecording}
              className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-lg hover:opacity-80 transition-smooth focus-ring"
              aria-label="Stop recording"
            >
              <Square className="w-6 h-6 text-white fill-white" />
            </button>
          ) : (
            <button
              type="button"
              data-ocid="capture.start_recording_button"
              onClick={startRecording}
              className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:opacity-80 transition-smooth focus-ring"
              aria-label="Start recording"
            >
              <Play className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
            </button>
          )}
          <button
            type="button"
            data-ocid="capture.stop_camera_button"
            onClick={stopCamera}
            className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-muted/70 transition-smooth focus-ring"
            aria-label="Stop camera"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <Button
          data-ocid="capture.start_camera_button"
          onClick={startCamera}
          className="gap-2"
        >
          <Camera className="w-4 h-4" />
          Start Camera
        </Button>
      )}

      {subMode === "video" && !streaming && (
        <p className="text-xs text-muted-foreground text-center max-w-xs">
          Record a short clip, then pick any frame to analyze as an image.
        </p>
      )}
    </div>
  );
}

// ── File upload / drag-drop zone ──────────────────────────────────────────────
function UploadView({
  onFile,
}: { onFile: (base64: string, mime: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onFile(dataUrl.split(",")[1], file.type);
      };
      reader.readAsDataURL(file);
    },
    [onFile],
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        data-ocid="capture.dropzone"
        aria-label="Image drop zone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        className={[
          "w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 py-12 px-6 transition-smooth",
          dragging
            ? "border-primary bg-primary/5 glow-border"
            : "border-border",
        ].join(" ")}
      >
        <Upload
          className={`w-10 h-10 transition-smooth ${dragging ? "text-primary" : "text-muted-foreground"}`}
        />
        <div className="text-center">
          <p className="font-medium text-foreground/80">Drop image here</p>
          <p className="text-sm text-muted-foreground mt-1">
            or click below to browse files
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          PNG · JPG · WEBP · HEIC supported
        </p>
      </div>

      <input
        ref={inputRef}
        data-ocid="capture.input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <Button
        data-ocid="capture.browse_button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        <Upload className="w-4 h-4" />
        Browse Files
      </Button>
    </div>
  );
}

// ── Preview + Analyze panel ───────────────────────────────────────────────────
function ImagePreview({
  base64,
  mime,
  isAnalyzing,
  onClear,
  onAnalyze,
  selectedMode,
  onModeChange,
}: {
  base64: string;
  mime: string;
  isAnalyzing: boolean;
  onClear: () => void;
  onAnalyze: () => void;
  selectedMode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 animate-slide-up">
      {/* Mode re-analysis bar */}
      <ModeReanalysisBar
        selected={selectedMode}
        onSelect={onModeChange}
        onReanalyze={onAnalyze}
        isAnalyzing={isAnalyzing}
      />

      {/* Thumbnail */}
      <div className="relative w-full rounded-lg overflow-hidden border border-border scan-overlay">
        <img
          src={`data:${mime};base64,${base64}`}
          alt="Captured preview"
          className="w-full object-contain max-h-64"
        />
        {isAnalyzing && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
            <div
              className="absolute inset-x-0 h-px scan-beam"
              style={{
                background:
                  "linear-gradient(90deg, transparent, oklch(0.72 0.16 195), transparent)",
              }}
            />
            <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-3">
              <div className="relative w-12 h-12">
                <span className="absolute inset-0 rounded-full border-2 border-primary/40 scan-pulse" />
                <span className="absolute inset-1 rounded-full border border-primary/70 scan-pulse stagger-2" />
                <ScanSearch className="absolute inset-2.5 w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground font-mono tracking-wider">
                ANALYZING…
              </p>
            </div>
          </div>
        )}
        {!isAnalyzing && (
          <button
            type="button"
            data-ocid="capture.clear_button"
            onClick={onClear}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-muted transition-smooth focus-ring"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <Button
        data-ocid="capture.analyze_button"
        onClick={onAnalyze}
        disabled={isAnalyzing}
        size="lg"
        className="gap-2 min-w-48 glow-border font-display font-semibold"
      >
        {isAnalyzing ? (
          <>
            <ScanLine className="w-5 h-5 scan-pulse" />
            Analyzing…
          </>
        ) : (
          <>
            <ScanLine className="w-5 h-5" />
            Analyze Image
          </>
        )}
      </Button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function CapturePage() {
  const navigate = useNavigate();
  const { analyzeImage } = useAnalysis();
  const {
    capturedImage,
    mimeType,
    isAnalyzing,
    error,
    selectedMode,
    setCapturedImage,
    setError,
    setSelectedMode,
    reset,
  } = useLensStore();
  const [captureMode, setCaptureMode] = useState<"camera" | "upload">("camera");

  const handleImage = useCallback(
    (base64: string, mime: string) => {
      setCapturedImage(base64, mime);
    },
    [setCapturedImage],
  );

  const handleAnalyze = useCallback(async () => {
    if (!capturedImage) return;
    setError(null);
    await analyzeImage(capturedImage, mimeType);
    const freshError = useLensStore.getState().error;
    if (!freshError) navigate({ to: "/results" });
  }, [capturedImage, mimeType, analyzeImage, setError, navigate]);

  return (
    <div
      data-ocid="capture.page"
      className="flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fade-in"
    >
      {/* Hero text */}
      <div className="text-center mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase">
          <ScanSearch className="w-3.5 h-3.5" />
          AI Visual Recognition
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight">
          Point. Capture. <span className="text-primary">Discover.</span>
        </h1>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          Choose a mode, upload or capture — Venice AI identifies, extracts, and
          finds results.
        </p>
      </div>

      {/* Main card */}
      <div className="glass-card w-full max-w-lg p-5 space-y-5">
        {/* Mode selector grid — always visible before capture */}
        {!capturedImage && (
          <ModeSelectorGrid
            selected={selectedMode}
            onSelect={setSelectedMode}
          />
        )}

        {/* Camera / Upload tab — only before capture */}
        {!capturedImage && (
          <div
            data-ocid="capture.mode_tabs"
            className="flex rounded-md border border-border overflow-hidden"
          >
            <button
              type="button"
              data-ocid="capture.camera_tab"
              onClick={() => setCaptureMode("camera")}
              className={[
                "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-smooth",
                captureMode === "camera"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              ].join(" ")}
            >
              <Camera className="w-4 h-4" />
              Camera
            </button>
            <button
              type="button"
              data-ocid="capture.upload_tab"
              onClick={() => setCaptureMode("upload")}
              className={[
                "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-smooth",
                captureMode === "upload"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              ].join(" ")}
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        )}

        {/* Capture / upload / preview area */}
        {capturedImage ? (
          <ImagePreview
            base64={capturedImage}
            mime={mimeType}
            isAnalyzing={isAnalyzing}
            onClear={reset}
            onAnalyze={handleAnalyze}
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
          />
        ) : captureMode === "camera" ? (
          <CameraView onCapture={handleImage} />
        ) : (
          <UploadView onFile={handleImage} />
        )}

        {/* Error card */}
        {error && (
          <div
            data-ocid="capture.error_state"
            className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 animate-fade-in"
          >
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-destructive">
                Analysis Failed
              </p>
              <p className="text-sm text-muted-foreground mt-0.5 break-words">
                {error}
              </p>
            </div>
            <button
              type="button"
              data-ocid="capture.dismiss_error_button"
              onClick={() => setError(null)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-2 justify-center mt-6 animate-slide-up stagger-3">
        {[
          "Object Detection",
          "OCR & Text Extraction",
          "Scene Description",
          "Web Search",
        ].map((f) => (
          <span
            key={f}
            className="px-3 py-1 rounded-full text-xs bg-muted/50 border border-border/40 text-muted-foreground font-mono"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
