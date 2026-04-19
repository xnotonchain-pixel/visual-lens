import { c as createLucideIcon, u as useNavigate, a as useLensStore, r as reactExports, j as jsxRuntimeExports, S as ScanSearch, C as Camera } from "./index-BUSSrS1X.js";
import { X, B as Button } from "./button-DIJgVfI1.js";
import { u as useAnalysis } from "./useAnalysis-DjV4svsM.js";
import { U as Upload, F as Film, P as Play } from "./upload-CzG3LUWn.js";
import { S as ScanLine } from "./scan-line-D013sVJa.js";
import { S as Square } from "./square-DcaVRyzk.js";
import { C as ChevronDown } from "./chevron-down-DFNb-xQO.js";
import "./index-BsMJgQDJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m14.31 8 5.74 9.94", key: "1y6ab4" }],
  ["path", { d: "M9.69 8h11.48", key: "1wxppr" }],
  ["path", { d: "m7.38 12 5.74-9.94", key: "1grp0k" }],
  ["path", { d: "M9.69 16 3.95 6.06", key: "libnyf" }],
  ["path", { d: "M14.31 16H2.83", key: "x5fava" }],
  ["path", { d: "m16.62 12-5.74 9.94", key: "1vwawt" }]
];
const Aperture = createLucideIcon("aperture", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const MODES = [
  {
    mode: "generic",
    label: "Generic",
    emoji: "🔍",
    description: "Objects, text & scene",
    cssKey: "generic",
    colorVar: "--mode-generic"
  },
  {
    mode: "plant",
    label: "Plant ID",
    emoji: "🌿",
    description: "Species, care & toxicity",
    cssKey: "plant",
    colorVar: "--mode-plant"
  },
  {
    mode: "food",
    label: "Food Scanner",
    emoji: "🍽️",
    description: "Nutrition & recipes",
    cssKey: "food",
    colorVar: "--mode-food"
  },
  {
    mode: "bookProduct",
    label: "Book/Product",
    emoji: "📦",
    description: "Reviews, prices & buy links",
    cssKey: "book",
    colorVar: "--mode-book"
  },
  {
    mode: "translation",
    label: "Translation",
    emoji: "🌐",
    description: "Signs, menus & documents",
    cssKey: "translation",
    colorVar: "--mode-translation"
  },
  {
    mode: "artLandmark",
    label: "Art/Landmark",
    emoji: "🏛️",
    description: "History, context & artist",
    cssKey: "art",
    colorVar: "--mode-art"
  },
  {
    mode: "receipt",
    label: "Receipt Parser",
    emoji: "🧾",
    description: "Itemize & total expenses",
    cssKey: "receipt",
    colorVar: "--mode-receipt"
  },
  {
    mode: "medicalReference",
    label: "Medical Ref.",
    emoji: "⚕️",
    description: "Skin & condition reference",
    cssKey: "medical",
    colorVar: "--mode-medical"
  },
  {
    mode: "carFashion",
    label: "Car/Fashion",
    emoji: "🚗",
    description: "Model, style & where to buy",
    cssKey: "car",
    colorVar: "--mode-car"
  }
];
function ModeSelectorGrid({
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground tracking-widest uppercase", children: "Analysis Mode" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", "data-ocid": "capture.mode_grid", children: MODES.map((m) => {
      const isActive = selected === m.mode;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `capture.mode_card.${m.cssKey}`,
          onClick: () => onSelect(m.mode),
          className: [
            "mode-badge",
            `mode-badge-${m.cssKey}`,
            isActive ? "active" : "",
            "flex-col items-start gap-1 p-2.5 text-left h-auto rounded-md transition-smooth focus-ring",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:border-border"
          ].filter(Boolean).join(" "),
          style: isActive ? {
            borderColor: `oklch(var(${m.colorVar}))`,
            backgroundColor: `oklch(var(${m.colorVar}) / 0.08)`
          } : void 0,
          "aria-pressed": isActive,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: m.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold leading-tight",
                style: isActive ? { color: `oklch(var(${m.colorVar}))` } : void 0,
                children: m.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] leading-tight text-muted-foreground font-normal line-clamp-1", children: m.description })
          ]
        },
        m.mode
      );
    }) })
  ] });
}
function ModeReanalysisBar({
  selected,
  onSelect,
  onReanalyze,
  isAnalyzing
}) {
  const [open, setOpen] = reactExports.useState(false);
  const modeInfo = MODES.find((m) => m.mode === selected) ?? MODES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "capture.change_mode_button",
        onClick: () => setOpen((v) => !v),
        className: "flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/30 hover:bg-muted/60 transition-smooth text-sm font-medium focus-ring",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: modeInfo.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: modeInfo.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `w-3.5 h-3.5 text-muted-foreground transition-smooth ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-full left-0 mt-1 z-50 glass-card shadow-lg p-2 w-56 animate-fade-in",
        "data-ocid": "capture.mode_dropdown",
        children: MODES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `capture.reanalyze_mode.${m.cssKey}`,
            onClick: () => {
              onSelect(m.mode);
              setOpen(false);
            },
            className: [
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-smooth text-left",
              selected === m.mode ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: m.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground leading-tight truncate", children: m.description })
              ] })
            ]
          },
          m.mode
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "capture.reanalyze_button",
        size: "sm",
        variant: "outline",
        disabled: isAnalyzing,
        onClick: onReanalyze,
        className: "gap-1.5 text-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-3.5 h-3.5" }),
          "Re-analyze"
        ]
      }
    )
  ] });
}
function CameraView({
  onCapture
}) {
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const mediaRecorderRef = reactExports.useRef(null);
  const chunksRef = reactExports.useRef([]);
  const [streaming, setStreaming] = reactExports.useState(false);
  const [camError, setCamError] = reactExports.useState(null);
  const [subMode, setSubMode] = reactExports.useState("photo");
  const [recording, setRecording] = reactExports.useState(false);
  const [, setVideoBlob] = reactExports.useState(null);
  const [videoUrl, setVideoUrl] = reactExports.useState(null);
  const [frameTime, setFrameTime] = reactExports.useState(0);
  const [videoDuration, setVideoDuration] = reactExports.useState(0);
  const scrubberVideoRef = reactExports.useRef(null);
  const startCamera = reactExports.useCallback(async () => {
    setCamError(null);
    setVideoBlob(null);
    setVideoUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch {
      setCamError(
        "Camera access denied. Please allow camera permissions and try again."
      );
    }
  }, []);
  const stopCamera = reactExports.useCallback(() => {
    var _a;
    if ((_a = videoRef.current) == null ? void 0 : _a.srcObject) {
      for (const t of videoRef.current.srcObject.getTracks())
        t.stop();
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);
  const capture = reactExports.useCallback(() => {
    var _a;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    (_a = canvas.getContext("2d")) == null ? void 0 : _a.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    onCapture(dataUrl.split(",")[1], "image/jpeg");
  }, [onCapture, stopCamera]);
  const startRecording = reactExports.useCallback(() => {
    var _a;
    if (!((_a = videoRef.current) == null ? void 0 : _a.srcObject)) return;
    chunksRef.current = [];
    const stream = videoRef.current.srcObject;
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
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
  const stopRecording = reactExports.useCallback(() => {
    var _a;
    (_a = mediaRecorderRef.current) == null ? void 0 : _a.stop();
    setRecording(false);
  }, []);
  const extractFrame = reactExports.useCallback(() => {
    var _a;
    const video = scrubberVideoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    (_a = canvas.getContext("2d")) == null ? void 0 : _a.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    onCapture(dataUrl.split(",")[1], "image/jpeg");
  }, [onCapture]);
  if (camError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 py-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: camError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setCamError(null),
          "data-ocid": "capture.retry_camera_button",
          children: "Try Again"
        }
      )
    ] });
  }
  if (videoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground tracking-wider uppercase", children: "Pick a frame to analyze" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full rounded-lg overflow-hidden border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: scrubberVideoRef,
          src: videoUrl,
          className: "w-full object-contain max-h-56",
          onLoadedMetadata: (e) => {
            const dur = e.target.duration;
            setVideoDuration(Number.isFinite(dur) ? dur : 0);
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            "data-ocid": "capture.frame_scrubber",
            type: "range",
            min: 0,
            max: videoDuration || 1,
            step: 0.033,
            value: frameTime,
            onChange: (e) => {
              const t = Number(e.target.value);
              setFrameTime(t);
              if (scrubberVideoRef.current) {
                scrubberVideoRef.current.currentTime = t;
              }
            },
            className: "w-full accent-primary cursor-pointer",
            "aria-label": "Frame position"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs font-mono text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            frameTime.toFixed(2),
            "s"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            videoDuration.toFixed(2),
            "s"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "capture.extract_frame_button",
            onClick: extractFrame,
            className: "gap-2 flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4" }),
              "Use This Frame"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "capture.discard_video_button",
            variant: "outline",
            onClick: () => {
              setVideoBlob(null);
              setVideoUrl(null);
              setFrameTime(0);
            },
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
              "Discard"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex rounded-md border border-border overflow-hidden w-full",
        "data-ocid": "capture.camera_submode_tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "capture.photo_submode_tab",
              onClick: () => setSubMode("photo"),
              className: [
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium transition-smooth",
                subMode === "photo" ? "bg-primary/20 text-primary border-r border-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-r border-border"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5" }),
                "Photo"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "capture.video_submode_tab",
              onClick: () => setSubMode("video"),
              className: [
                "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium transition-smooth",
                subMode === "video" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5" }),
                "Video Frame"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted", children: streaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: videoRef,
          autoPlay: true,
          playsInline: true,
          muted: true,
          className: "w-full h-full object-cover"
        }
      ),
      recording && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-destructive/90 text-xs font-mono text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-white animate-pulse" }),
        "REC"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-4 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary rounded-tr" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary rounded-bl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3 text-muted-foreground", children: [
      subMode === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-12 h-12 opacity-30" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-12 h-12 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Camera inactive" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
    streaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      subMode === "photo" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "capture.capture_button",
          onClick: capture,
          className: "w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:opacity-80 transition-smooth focus-ring",
          "aria-label": "Capture photo",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Aperture, { className: "w-7 h-7 text-primary-foreground" })
        }
      ) : recording ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "capture.stop_recording_button",
          onClick: stopRecording,
          className: "w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-lg hover:opacity-80 transition-smooth focus-ring",
          "aria-label": "Stop recording",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-6 h-6 text-white fill-white" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "capture.start_recording_button",
          onClick: startRecording,
          className: "w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:opacity-80 transition-smooth focus-ring",
          "aria-label": "Start recording",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-7 h-7 text-primary-foreground fill-primary-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "capture.stop_camera_button",
          onClick: stopCamera,
          className: "w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-muted/70 transition-smooth focus-ring",
          "aria-label": "Stop camera",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "capture.start_camera_button",
        onClick: startCamera,
        className: "gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
          "Start Camera"
        ]
      }
    ),
    subMode === "video" && !streaming && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-xs", children: "Record a short clip, then pick any frame to analyze as an image." })
  ] });
}
function UploadView({
  onFile
}) {
  const inputRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const handleFile = reactExports.useCallback(
    (file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a;
        const dataUrl = (_a = e.target) == null ? void 0 : _a.result;
        onFile(dataUrl.split(",")[1], file.type);
      };
      reader.readAsDataURL(file);
    },
    [onFile]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "capture.dropzone",
        "aria-label": "Image drop zone",
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop: (e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        },
        className: [
          "w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 py-12 px-6 transition-smooth",
          dragging ? "border-primary bg-primary/5 glow-border" : "border-border"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Upload,
            {
              className: `w-10 h-10 transition-smooth ${dragging ? "text-primary" : "text-muted-foreground"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground/80", children: "Drop image here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "or click below to browse files" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PNG · JPG · WEBP · HEIC supported" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        "data-ocid": "capture.input",
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (e) => {
          var _a;
          const file = (_a = e.target.files) == null ? void 0 : _a[0];
          if (file) handleFile(file);
          e.target.value = "";
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "data-ocid": "capture.browse_button",
        variant: "outline",
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        className: "gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
          "Browse Files"
        ]
      }
    )
  ] });
}
function ImagePreview({
  base64,
  mime,
  isAnalyzing,
  onClear,
  onAnalyze,
  selectedMode,
  onModeChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 animate-slide-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModeReanalysisBar,
      {
        selected: selectedMode,
        onSelect: onModeChange,
        onReanalyze: onAnalyze,
        isAnalyzing
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full rounded-lg overflow-hidden border border-border scan-overlay", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: `data:${mime};base64,${base64}`,
          alt: "Captured preview",
          className: "w-full object-contain max-h-64"
        }
      ),
      isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 h-px scan-beam",
            style: {
              background: "linear-gradient(90deg, transparent, oklch(0.72 0.16 195), transparent)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-12 h-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full border-2 border-primary/40 scan-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-1 rounded-full border border-primary/70 scan-pulse stagger-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "absolute inset-2.5 w-5 h-5 text-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider", children: "ANALYZING…" })
        ] })
      ] }),
      !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "capture.clear_button",
          onClick: onClear,
          className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-muted transition-smooth focus-ring",
          "aria-label": "Remove image",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        "data-ocid": "capture.analyze_button",
        onClick: onAnalyze,
        disabled: isAnalyzing,
        size: "lg",
        className: "gap-2 min-w-48 glow-border font-display font-semibold",
        children: isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-5 h-5 scan-pulse" }),
          "Analyzing…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-5 h-5" }),
          "Analyze Image"
        ] })
      }
    )
  ] });
}
function CapturePage() {
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
    reset
  } = useLensStore();
  const [captureMode, setCaptureMode] = reactExports.useState("camera");
  const handleImage = reactExports.useCallback(
    (base64, mime) => {
      setCapturedImage(base64, mime);
    },
    [setCapturedImage]
  );
  const handleAnalyze = reactExports.useCallback(async () => {
    if (!capturedImage) return;
    setError(null);
    await analyzeImage(capturedImage, mimeType);
    const freshError = useLensStore.getState().error;
    if (!freshError) navigate({ to: "/results" });
  }, [capturedImage, mimeType, analyzeImage, setError, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "capture.page",
      className: "flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fade-in",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { className: "w-3.5 h-3.5" }),
            "AI Visual Recognition"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl md:text-5xl text-foreground leading-tight", children: [
            "Point. Capture. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Discover." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-md mx-auto", children: "Choose a mode, upload or capture — Venice AI identifies, extracts, and finds results." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card w-full max-w-lg p-5 space-y-5", children: [
          !capturedImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModeSelectorGrid,
            {
              selected: selectedMode,
              onSelect: setSelectedMode
            }
          ),
          !capturedImage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "capture.mode_tabs",
              className: "flex rounded-md border border-border overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "capture.camera_tab",
                    onClick: () => setCaptureMode("camera"),
                    className: [
                      "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-smooth",
                      captureMode === "camera" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    ].join(" "),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                      "Camera"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "capture.upload_tab",
                    onClick: () => setCaptureMode("upload"),
                    className: [
                      "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-smooth",
                      captureMode === "upload" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    ].join(" "),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                      "Upload"
                    ]
                  }
                )
              ]
            }
          ),
          capturedImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImagePreview,
            {
              base64: capturedImage,
              mime: mimeType,
              isAnalyzing,
              onClear: reset,
              onAnalyze: handleAnalyze,
              selectedMode,
              onModeChange: setSelectedMode
            }
          ) : captureMode === "camera" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CameraView, { onCapture: handleImage }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UploadView, { onFile: handleImage }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "capture.error_state",
              className: "flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 animate-fade-in",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Analysis Failed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 break-words", children: error })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "capture.dismiss_error_button",
                    onClick: () => setError(null),
                    className: "shrink-0 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded",
                    "aria-label": "Dismiss error",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mt-6 animate-slide-up stagger-3", children: [
          "Object Detection",
          "OCR & Text Extraction",
          "Scene Description",
          "Web Search"
        ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-3 py-1 rounded-full text-xs bg-muted/50 border border-border/40 text-muted-foreground font-mono",
            children: f
          },
          f
        )) })
      ]
    }
  );
}
export {
  CapturePage
};
