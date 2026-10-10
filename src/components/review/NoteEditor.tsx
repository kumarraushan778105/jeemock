import { useEffect, useRef, useState } from "react";
import { Check, Mic, MicOff, RefreshCcw, Trash2 } from "lucide-react";
import {
  audioReflectionKey,
  deleteAudioReflection,
  emptyNote,
  getAudioReflection,
  putAudioReflection,
  putNote,
  type QuestionAudioReflection,
  type QuestionNote,
} from "@/lib/db";
import { cn } from "@/lib/utils";

export const REASON_TAGS = [
  "Formula Mistake",
  "Concept Weak",
  "Calculation Error",
  "Reading Mistake",
  "Silly Mistake",
  "Guess",
  "Time Pressure",
  "Need Revision",
];

/** Debounced auto-saving editor for per-question reflection notes. */
const AUDIO_SPEED_OPTIONS = [0.5, 1, 1.5, 2] as const;

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function AudioReflectionSection({
  attemptId,
  questionId,
}: {
  attemptId: string;
  questionId: string;
}) {
  const [audio, setAudio] = useState<QuestionAudioReflection | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [microphoneId, setMicrophoneId] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const destinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    void (async () => {
      const recording = await getAudioReflection(attemptId, questionId);
      if (!active || !recording) {
        setAudio(null);
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
        return;
      }

      const url = URL.createObjectURL(recording.blob);
      setAudio(recording);
      setAudioUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    })();

    return () => {
      active = false;
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      cleanupAudioProcessing();
    };
  }, [attemptId, questionId]);

  useEffect(() => {
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      setSupported(false);
      return;
    }

    const loadMicrophones = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setMicrophones(devices.filter((device) => device.kind === "audioinput"));
      } catch {
        setMicrophones([]);
      }
    };

    void loadMicrophones();
    navigator.mediaDevices.addEventListener?.("devicechange", loadMicrophones);
    return () => navigator.mediaDevices.removeEventListener?.("devicechange", loadMicrophones);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
  }, [audioUrl, speed]);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const cleanupAudioProcessing = () => {
    audioSourceRef.current?.disconnect();
    gainNodeRef.current?.disconnect();
    compressorRef.current?.disconnect();
    destinationRef.current?.stream.getTracks().forEach((track) => track.stop());
    audioSourceRef.current = null;
    gainNodeRef.current = null;
    compressorRef.current = null;
    destinationRef.current = null;
    const context = audioContextRef.current;
    audioContextRef.current = null;
    if (context && context.state !== "closed") void context.close();
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    clearTimer();
    setIsRecording(false);
    if (mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    stopStream();
  };

  const startRecording = async () => {
    if (!supported) {
      setError("This browser does not support audio recording.");
      return;
    }

    try {
      const constraints: MediaTrackConstraints = {
        echoCancellation: { ideal: true },
        noiseSuppression: { ideal: true },
        autoGainControl: { ideal: true },
        channelCount: { ideal: 1 },
        sampleRate: { ideal: 48000 },
        ...(microphoneId ? { deviceId: { exact: microphoneId } } : {}),
      };
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: constraints });
      } catch (constraintError) {
        if (constraintError instanceof DOMException && constraintError.name === "NotAllowedError") {
          throw constraintError;
        }
        stream = await navigator.mediaDevices.getUserMedia({
          audio: microphoneId ? { deviceId: { exact: microphoneId } } : true,
        });
      }
      streamRef.current = stream;
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setMicrophones(devices.filter((device) => device.kind === "audioinput"));
      } catch {}

      let recordingStream = stream;
      const AudioContextConstructor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextConstructor) {
        const context = new AudioContextConstructor();
        const source = context.createMediaStreamSource(stream);
        const gain = context.createGain();
        const compressor = context.createDynamicsCompressor();
        const destination = context.createMediaStreamDestination();
        gain.gain.value = 1.35;
        compressor.threshold.value = -24;
        compressor.knee.value = 24;
        compressor.ratio.value = 4;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.25;
        source.connect(gain).connect(compressor).connect(destination);
        audioContextRef.current = context;
        audioSourceRef.current = source;
        gainNodeRef.current = gain;
        compressorRef.current = compressor;
        destinationRef.current = destination;
        recordingStream = destination.stream;
        if (context.state === "suspended") await context.resume();
      }
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      const recorder = new MediaRecorder(
        recordingStream,
        MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : undefined,
      );
      chunksRef.current = [];
      startTimeRef.current = Date.now();

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onerror = () => {
        setError("The microphone could not be accessed. Please try again.");
        stopStream();
        cleanupAudioProcessing();
        setIsRecording(false);
      };

      recorder.onstop = async () => {
        clearTimer();
        stopStream();
        cleanupAudioProcessing();

        const blob = new Blob(chunksRef.current, { type: mimeType });
        if (blob.size === 0) {
          setError("No audio was captured. Please try again.");
          return;
        }

        const finalDuration = elapsed > 0 ? elapsed : 0;
        const nextAudio: QuestionAudioReflection = {
          id: audioReflectionKey(attemptId, questionId),
          attemptId,
          questionId,
          blob,
          mimeType: blob.type || "audio/webm",
          duration: finalDuration,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        await putAudioReflection(nextAudio);
        setAudio(nextAudio);
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        setError(null);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setElapsed(0);
      setIsRecording(true);
      timerRef.current = window.setInterval(() => {
        if (!startTimeRef.current) return;
        setElapsed((Date.now() - startTimeRef.current) / 1000);
      }, 250);
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "NotAllowedError"
          ? "Microphone permission was denied. Please allow access and try again."
          : "Your browser could not access the microphone.";
      setError(message);
      setIsRecording(false);
      stopStream();
      cleanupAudioProcessing();
    }
  };

  const handleDelete = async () => {
    if (isRecording) {
      stopRecording();
    }
    const id = audioReflectionKey(attemptId, questionId);
    await deleteAudioReflection(id);
    setAudio(null);
    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);
  };

  const durationLabel = audio ? formatDuration(audio.duration) : formatDuration(elapsed);

  return (
    <div className="space-y-3 rounded-xl border border-dashed bg-card/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          🎙️ MY AUDIO REFLECTION
        </span>
        {isRecording && (
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" /> LIVE
          </span>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {!supported && (
        <p className="text-xs text-muted-foreground">
          Voice recording is not supported in this browser.
        </p>
      )}

      {!audio && !isRecording && supported && microphones.length > 1 && (
        <select
          value={microphoneId}
          onChange={(event) => setMicrophoneId(event.target.value)}
          className="rounded-lg border bg-background px-3 py-2 text-sm"
          aria-label="Microphone"
        >
          <option value="">Default microphone</option>
          {microphones.map((microphone, index) => (
            <option key={microphone.deviceId} value={microphone.deviceId}>
              {microphone.label || `Microphone ${index + 1}`}
            </option>
          ))}
        </select>
      )}

      {!audio && !isRecording && supported && (
        <button
          type="button"
          onClick={startRecording}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Mic className="size-4" /> Start Recording
        </button>
      )}

      {isRecording && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={stopRecording}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground"
          >
            <MicOff className="size-4" /> Stop Recording
          </button>
          <span className="rounded-md border bg-card px-2 py-1 text-xs font-semibold tabular-nums">
            {formatDuration(elapsed)}
          </span>
        </div>
      )}

      {audio && !isRecording && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={startRecording}
              className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium"
            >
              <RefreshCcw className="size-4" /> Re-record / Replace
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive"
            >
              <Trash2 className="size-4" /> Delete recording
            </button>
          </div>

          <audio
            ref={audioRef}
            key={audioUrl ?? audio.id}
            controls
            src={audioUrl ?? undefined}
            className="w-full"
            onLoadedMetadata={() => {
              if (!audioRef.current) return;
              audioRef.current.playbackRate = speed;
            }}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Duration · {durationLabel}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => {
                    setSpeed(rate);
                    if (audioRef.current) audioRef.current.playbackRate = rate;
                  }}
                  className={cn(
                    "rounded-md border px-2 py-1 text-[11px] font-semibold",
                    speed === rate
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground",
                  )}
                  aria-pressed={speed === rate}
                >
                  {rate}×{" "}
                  {rate === 0.5
                    ? "Slow"
                    : rate === 1
                      ? "Normal"
                      : rate === 1.5
                        ? "Fast"
                        : "Very Fast"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Record in your own words: Why did I get this wrong? What did I learn? What will I remember
        next time?
      </p>
    </div>
  );
}

export function NoteEditor({
  attemptId,
  questionId,
  initial,
  mode,
}: {
  attemptId: string;
  questionId: string;
  initial?: QuestionNote;
  /** wrong = tags + why/learned, bookmark = personal note + revision flag */
  mode: "wrong" | "bookmark";
}) {
  const [note, setNote] = useState<QuestionNote>(initial ?? emptyNote(attemptId, questionId));
  const [saved, setSaved] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      void putNote(note).then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 1200);
      });
    }, 600);
    return () => clearTimeout(t);
  }, [note]);

  const patch = (p: Partial<QuestionNote>) => setNote((n) => ({ ...n, ...p }));

  const clear = () =>
    setNote((n) => ({ ...n, tags: [], reason: "", learning: "", note: "", revision: false }));

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-dashed bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {mode === "wrong" ? "Why did I get this wrong?" : "Personal notes"}
        </span>
        <span className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1 text-[11px] text-success">
              <Check className="size-3" /> Saved
            </span>
          )}
          <button
            onClick={clear}
            className="flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-destructive"
          >
            <Trash2 className="size-3" /> Delete
          </button>
        </span>
      </div>

      {mode === "wrong" ? (
        <>
          <div className="flex flex-wrap gap-1.5">
            {REASON_TAGS.map((t) => {
              const on = note.tags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() =>
                    patch({ tags: on ? note.tags.filter((x) => x !== t) : [...note.tags, t] })
                  }
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                    on ? "border-primary bg-primary text-primary-foreground" : "bg-card",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <textarea
            value={note.reason}
            onChange={(e) => patch({ reason: e.target.value })}
            rows={3}
            placeholder="In your own words — e.g. I forgot the sign convention."
            className="w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            What did I learn?
          </div>
          <textarea
            value={note.learning}
            onChange={(e) => patch({ learning: e.target.value })}
            rows={3}
            placeholder="Formula to remember, trick, shortcut, concept, mistake to avoid…"
            className="w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </>
      ) : (
        <>
          <textarea
            value={note.note}
            onChange={(e) => patch({ note: e.target.value })}
            rows={3}
            placeholder="Your notes on this question…"
            className="w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={note.revision}
              onChange={(e) => patch({ revision: e.target.checked })}
              className="size-4 accent-[var(--primary)]"
            />
            Mark for revision
          </label>
        </>
      )}

      <AudioReflectionSection attemptId={attemptId} questionId={questionId} />
    </div>
  );
}
