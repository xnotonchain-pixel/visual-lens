import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createActor } from "../backend";
import type {
  AnalysisMode,
  AnalysisResult,
  VideoAnalysisJob,
  VideoFrame,
} from "../backend.d";

// ── React Query hooks ─────────────────────────────────────────────────────────

export function useVideoJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoAnalysisJob[]>({
    queryKey: ["videoJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserVideoJobs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useVideoJob(jobId: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VideoAnalysisJob | null>({
    queryKey: ["videoJob", jobId],
    queryFn: async () => {
      if (!actor || !jobId) return null;
      return actor.getVideoAnalysisJob(jobId);
    },
    enabled: !!actor && !isFetching && !!jobId,
    staleTime: 10_000,
  });
}

export function useSaveVideoJob() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<string, Error, VideoAnalysisJob>({
    mutationFn: async (job) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.saveVideoAnalysisJob(job);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videoJobs"] });
    },
  });
}

export function useUpdateFrameResult() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { jobId: string; frameIndex: bigint; result: AnalysisResult }
  >({
    mutationFn: async ({ jobId, frameIndex, result }) => {
      if (!actor) throw new Error("Backend not ready");
      const r = await actor.updateVideoFrameResult(jobId, frameIndex, result);
      if (r.__kind__ === "err") throw new Error(r.err);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["videoJob", vars.jobId] });
    },
  });
}

// ── Frame extraction ──────────────────────────────────────────────────────────

export interface ExtractedFrame {
  frameIndex: number;
  timestamp: number;
  imageBase64: string;
  thumbnail: string; // same as imageBase64 but kept for naming clarity
}

/**
 * Extract frames from a video file using HTMLVideoElement + Canvas.
 * Seeks to each timestamp, draws to canvas, converts to base64 JPEG.
 */
export async function extractFramesFromVideo(
  file: File,
  intervalSeconds: number,
  maxFrames: number,
  onProgress?: (current: number, total: number) => void,
): Promise<ExtractedFrame[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    video.addEventListener("error", () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load video file."));
    });

    video.addEventListener("loadedmetadata", async () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Invalid video duration."));
        return;
      }

      // Calculate timestamps to capture
      const totalPossible = Math.floor(duration / intervalSeconds);
      const frameCount = Math.min(totalPossible + 1, maxFrames);
      const timestamps: number[] = [];

      for (let i = 0; i < frameCount; i++) {
        const ts = Math.min(i * intervalSeconds, duration - 0.1);
        timestamps.push(Number.parseFloat(ts.toFixed(2)));
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas 2D context unavailable."));
        return;
      }

      const frames: ExtractedFrame[] = [];

      for (let i = 0; i < timestamps.length; i++) {
        const ts = timestamps[i];
        onProgress?.(i, timestamps.length);

        await new Promise<void>((res, rej) => {
          const timeout = setTimeout(
            () => rej(new Error("Seek timeout")),
            8000,
          );
          video.onseeked = () => {
            clearTimeout(timeout);
            res();
          };
          video.currentTime = ts;
        });

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        const base64 = dataUrl.split(",")[1] ?? "";

        frames.push({
          frameIndex: i,
          timestamp: ts,
          imageBase64: base64,
          thumbnail: base64,
        });
      }

      URL.revokeObjectURL(objectUrl);
      onProgress?.(timestamps.length, timestamps.length);
      resolve(frames);
    });
  });
}

// ── Frame processing pipeline ─────────────────────────────────────────────────

export interface ProcessFramesOptions {
  frames: ExtractedFrame[];
  jobId: string;
  analysisMode: AnalysisMode;
  analyzeImageFn: (
    base64: string,
    mimeType: string,
    mode: AnalysisMode | null,
  ) => Promise<AnalysisResult>;
  updateFrameResultFn: (
    jobId: string,
    frameIndex: bigint,
    result: AnalysisResult,
  ) => Promise<void>;
  onFrameDone?: (index: number, result: AnalysisResult) => void;
  cancelRef?: React.MutableRefObject<boolean>;
}

export async function processFrames({
  frames,
  jobId,
  analysisMode,
  analyzeImageFn,
  updateFrameResultFn,
  onFrameDone,
  cancelRef,
}: ProcessFramesOptions): Promise<void> {
  for (const frame of frames) {
    if (cancelRef?.current) break;

    try {
      const result = await analyzeImageFn(
        frame.imageBase64,
        "image/jpeg",
        analysisMode,
      );
      await updateFrameResultFn(jobId, BigInt(frame.frameIndex), result);
      onFrameDone?.(frame.frameIndex, result);
    } catch {
      // Non-fatal — mark frame as failed silently and continue
      const emptyResult: AnalysisResult = {
        sceneDescription: "Analysis failed for this frame.",
        extractedText: "",
        objects: [],
        webResults: [],
      };
      onFrameDone?.(frame.frameIndex, emptyResult);
    }
  }
}

/** Helper to compute estimated frame count from video duration and settings */
export function estimateFrameCount(
  durationSeconds: number,
  intervalSeconds: number,
  maxFrames: number,
): number {
  if (durationSeconds <= 0 || intervalSeconds <= 0) return 0;
  const possible = Math.floor(durationSeconds / intervalSeconds) + 1;
  return Math.min(possible, maxFrames);
}

/** Shared cancelRef factory — create in component, pass down */
export function useCancelRef(): React.MutableRefObject<boolean> {
  return useRef<boolean>(false);
}
