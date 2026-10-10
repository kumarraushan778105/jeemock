import { useEffect, useRef, useState } from "react";
import { Check, Mic, MicOff, RefreshCcw, Trash2, ImagePlus, X, Headphones } from "lucide-react";
import {
  deleteErrorJournalAudio,
  getErrorJournalImage,
  putErrorJournalImage,
  forgetErrorJournalImageUrl,
  getErrorJournalAudio,
  putErrorJournalAudio,
  putErrorJournalEntry,
  type ErrorJournalEntry,
} from "@/lib/db";
import { normalizeChapter } from "@/lib/chapter-utils";
import {
  canSpendXp,
  getRequireXpForErrorJournal,
  getXpState,
  spendXpForErrorJournal,
} from "@/lib/xp";
import { cn } from "@/lib/utils";

const ERROR_TYPES = [
  "Wrong Answer",
  "Couldn't Solve",
  "Concept",
  "Formula",
  "Calculation",
  "Misread",
  "Time Pressure",
  "Wrong Approach",
  "Guess",
];

const SUBJECTS = ["Physics", "Chemistry", "Mathematics"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const STATUSES = ["Need Review", "Learning", "Mastered"];

const AUDIO_SPEED_OPTIONS = [0.5, 1, 1.5, 2] as const;
type AudioRecordingMode = "microphone" | "class";

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function AudioRecorder({
  entryId,
  onAudioChange,
}: {
  entryId: string;
  onAudioChange: (hasAudio: boolean) => void;
}) {
  const [mode, setMode] = useState<AudioRecordingMode>("microphone");
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const urlRef = useRef<string | null>(null);
  const stoppingRef = useRef(false);
  const startingRef = useRef(false);

  useEffect(() => {
    let active = true;

    const loadAudio = async () => {
      try {
        const blob = await getErrorJournalAudio(entryId);
        if (active && blob) {
          const url = URL.createObjectURL(blob);
          urlRef.current = url;
          setAudioUrl(url);
          setHasAudio(true);
        }
      } catch (err) {
        console.error("Failed to load audio:", err);
      }
    };

    loadAudio();

    return () => {
      active = false;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        stoppingRef.current = true;
        mediaRecorderRef.current.stop();
      }
    };
  }, [entryId]);

  useEffect(() => {
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      setSupported(false);
    }
  }, []);

  const startRecording = async () => {
    if (isRecording || startingRef.current) return;
    startingRef.current = true;

    let captureStream: MediaStream | null = null;
    try {
      setError(null);
      if (!window.MediaRecorder) {
        throw new Error("This browser does not support audio recording.");
      }

      if (mode === "class") {
        if (!navigator.mediaDevices?.getDisplayMedia) {
          throw new Error(
            "Class Audio requires Chrome screen or window sharing, which is unavailable in this browser.",
          );
        }
        captureStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        if (captureStream.getAudioTracks().length === 0) {
          captureStream.getTracks().forEach((track) => track.stop());
          throw new Error(
            "Chrome did not provide audio for the selected window or screen. Enable audio sharing and try again.",
          );
        }
      } else {
        captureStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      streamRef.current = captureStream;
      const recordingStream =
        mode === "class" ? new MediaStream(captureStream.getAudioTracks()) : captureStream;
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"].find(
        (type) => MediaRecorder.isTypeSupported(type),
      );
      if (!mimeType) {
        throw new Error("This browser does not support a compatible audio recording format.");
      }

      const recorder = new MediaRecorder(recordingStream, { mimeType });
      mediaRecorderRef.current = recorder;
      stoppingRef.current = false;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        mediaRecorderRef.current = null;
        const chunks = chunksRef.current;
        chunksRef.current = [];
        if (chunks.length === 0) {
          setError(
            "No audio was captured. Confirm that audio sharing is enabled for the selected window or screen.",
          );
          return;
        }
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });

        try {
          await putErrorJournalAudio(entryId, blob, blob.type);

          const url = URL.createObjectURL(blob);
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = url;

          setAudioUrl(url);
          setHasAudio(true);
          onAudioChange(true);
          setElapsed(0);
        } catch (err) {
          setError((err as Error).message || "Failed to save audio");
        }
      };

      const handleCaptureEnded = () => {
        if (
          !stoppingRef.current &&
          mediaRecorderRef.current === recorder &&
          recorder.state !== "inactive"
        ) {
          stoppingRef.current = true;
          setError("Audio sharing ended before recording was stopped.");
          recorder.stop();
          captureStream?.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setIsRecording(false);
        }
      };
      captureStream.getTracks().forEach((track) => {
        track.addEventListener("ended", handleCaptureEnded, { once: true });
      });

      recorder.start();
      setIsRecording(true);
      setElapsed(0);

      timerRef.current = window.setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
      startingRef.current = false;
      recorder.onerror = () => {
        stoppingRef.current = true;
        setError("The audio recorder failed while recording. Please try again.");
        captureStream?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setIsRecording(false);
      };
    } catch (e) {
      captureStream?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      const error = e as DOMException;
      setError(
        error.name === "NotAllowedError"
          ? mode === "class"
            ? "Class Audio sharing was cancelled or denied. Select the Edge lecture window and allow audio sharing."
            : "Microphone access was cancelled or denied."
          : error.message || "Failed to start audio recording.",
      );
      startingRef.current = false;
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      stoppingRef.current = true;
      mediaRecorderRef.current.stop();
    }
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  const handleDelete = async () => {
    try {
      if (isRecording) {
        stopRecording();
      }
      await deleteErrorJournalAudio(entryId);
      setHasAudio(false);
      onAudioChange(false);
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
      setAudioUrl(null);
      setError(null);
    } catch (err) {
      setError((err as Error).message || "Failed to delete audio");
    }
  };

  return (
    <div className="space-y-2 rounded-lg border border-dashed bg-card/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {mode === "microphone" ? "🎙️ Microphone" : "🎧 Class Audio"}
        </span>
        {isRecording && (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" /> Recording
          </span>
        )}
      </div>

      <div className="flex gap-1" role="group" aria-label="Audio recording mode">
        <button
          type="button"
          onClick={() => !isRecording && setMode("microphone")}
          disabled={isRecording}
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold",
            mode === "microphone"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <Mic className="size-3" /> Microphone
        </button>
        <button
          type="button"
          onClick={() => !isRecording && setMode("class")}
          disabled={isRecording}
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold",
            mode === "class"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <Headphones className="size-3" /> Class Audio
        </button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {!supported && (
        <p className="text-xs text-muted-foreground">
          Audio recording is not supported in this browser.
        </p>
      )}

      {mode === "class" && !isRecording && supported && (
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          Chrome will open its sharing picker. Select the Edge lecture window or screen and enable
          audio sharing.
        </p>
      )}

      {!hasAudio && !isRecording && supported && (
        <button
          type="button"
          onClick={startRecording}
          className="inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Mic className="size-3" /> Start
        </button>
      )}

      {isRecording && (
        <button
          type="button"
          onClick={stopRecording}
          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:opacity-90"
        >
          <MicOff className="size-3" /> Stop
        </button>
      )}

      {hasAudio && audioUrl && (
        <div className="space-y-1">
          <audio
            ref={audioRef}
            src={audioUrl}
            controls
            className="w-full rounded-lg bg-card text-xs"
          />
          <div className="flex flex-wrap gap-1">
            {[0.5, 1, 1.5, 2].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => {
                  setSpeed(rate);
                  if (audioRef.current) audioRef.current.playbackRate = rate;
                }}
                className={cn(
                  "rounded-md border px-1.5 py-0.5 text-[10px] font-semibold",
                  speed === rate
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                {rate}×
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1 rounded-md border border-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive"
          >
            <Trash2 className="size-2.5" /> Delete
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold"
          >
            <RefreshCcw className="size-2.5" /> Replace
          </button>
        </div>
      )}

      <p className="text-[10px] leading-relaxed text-muted-foreground">
        Record your reflection: Why did I make this mistake? What did I learn?
      </p>
    </div>
  );
}

function ImageUploadSection({
  entryId,
  onImageSelect,
}: {
  entryId: string;
  onImageSelect: (blob: Blob) => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadImage = async () => {
      try {
        const blob = await getErrorJournalImage(entryId);
        if (active && blob) {
          const url = URL.createObjectURL(blob);
          urlRef.current = url;
          setImageUrl(url);
        }
      } finally {
        if (active) setImageLoading(false);
      }
    };

    loadImage();

    return () => {
      active = false;
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
      }
    };
  }, [entryId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const blob = new Blob([event.target?.result!], { type: file.type });
      const url = URL.createObjectURL(blob);

      // Clean up old URL
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = url;

      setImageUrl(url);
      onImageSelect(blob);
    };
    reader.readAsArrayBuffer(file);
  };

  const handlePaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items || [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.includes("image")) {
        const blob = items[i].getAsFile();
        if (blob) {
          const url = URL.createObjectURL(blob);

          // Clean up old URL
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = url;

          setImageUrl(url);
          onImageSelect(blob);
        }
      }
    }
  };

  const handleRemove = () => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setImageUrl(null);
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste as any);
    return () => {
      window.removeEventListener("paste", handlePaste as any);
    };
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          📷 Question Image
        </span>
        {imageUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] text-destructive"
          >
            <X className="size-2.5" /> Remove
          </button>
        )}
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Question"
          className="max-h-48 max-w-full rounded-lg border object-contain"
        />
      )}

      {!imageUrl && (
        <div
          className="rounded-lg border border-dashed border-muted-foreground/30 p-2 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file?.type.includes("image")) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const blob = new Blob([event.target?.result!], { type: file.type });
                const url = URL.createObjectURL(blob);

                if (urlRef.current) URL.revokeObjectURL(urlRef.current);
                urlRef.current = url;

                setImageUrl(url);
                onImageSelect(blob);
              };
              reader.readAsArrayBuffer(file);
            }
          }}
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 rounded-lg bg-card px-2 py-1 text-xs font-medium hover:bg-accent"
          >
            <ImagePlus className="size-3" /> Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="mt-1 text-[10px] text-muted-foreground">Upload, paste, or drag & drop</p>
        </div>
      )}
    </div>
  );
}

export function ErrorJournalEditor({
  entry,
  onSave,
  onCancel,
}: {
  entry?: ErrorJournalEntry;
  onSave: (entry: ErrorJournalEntry) => void;
  onCancel: () => void;
}) {
  // Generate consistent ID upfront for image/audio to use
  const [entryId] = useState(
    () => entry?.id || `ej_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
  );

  const [data, setData] = useState<Partial<ErrorJournalEntry>>(
    entry || {
      questionText: "",
      subject: "Physics",
      chapter: "",
      topic: "",
      difficulty: "Medium",
      source: "",
      questionNumber: "",
      errorType: "Wrong Answer",
      mistakeMade: "",
      whatLearned: "",
      rememberNext: "",
      additionalNotes: "",
      status: "Need Review",
      hasAudio: false,
      tryAgainCount: 0,
    },
  );
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | undefined>();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    if (isSaving) return; // Prevent duplicate saves

    try {
      setIsSaving(true);
      setSaveError(null);

      const requireXp =
        typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true;
      const xp = getXpState();

      if (requireXp) {
        if (xp.balance < 20) {
          setSaveError("Not enough XP. You need 20 XP to add this error.");
          setIsSaving(false);
          return;
        }

        const confirmSpend = window.confirm(
          `Add Error to Error Journal?\n\nCost: ⚡ 20 XP\nCurrent XP: ${xp.balance} XP`,
        );
        if (!confirmSpend) {
          setIsSaving(false);
          return;
        }
      }

      // Save image blob if present (must be before entry save)
      if (imageBlob) {
        await putErrorJournalImage(entryId, imageBlob, imageBlob.type || "image/png");
      }

      // Normalize chapter and topic: trim whitespace while preserving capitalization
      const chapterInput = data.chapter?.trim() || "";
      const topicInput = data.topic?.trim() || "";

      const fullEntry: ErrorJournalEntry = {
        id: entryId,
        questionText: data.questionText || "",
        subject: (data.subject as any) || "Physics",
        chapter: chapterInput,
        topic: topicInput,
        difficulty: (data.difficulty as any) || "Medium",
        source: data.source || "",
        questionNumber: data.questionNumber || "",
        errorType: (data.errorType as any) || "Wrong Answer",
        imageId: imageBlob ? entryId : entry?.imageId, // Use entryId when new image, preserve existing
        mistakeMade: data.mistakeMade || "",
        whatLearned: data.whatLearned || "",
        rememberNext: data.rememberNext || "",
        additionalNotes: data.additionalNotes || "",
        status: (data.status as any) || "Need Review",
        hasAudio: data.hasAudio || false,
        tryAgainCount: data.tryAgainCount || 0,
        lastTryAgainStatus: data.lastTryAgainStatus,
        createdAt: entry?.createdAt || Date.now(),
        updatedAt: Date.now(),
      };

      // Save entry first; only then spend XP when this mode requires it.
      await putErrorJournalEntry(fullEntry);
      if (requireXp) {
        const spend = spendXpForErrorJournal(fullEntry.id, 20);
        if (!spend.ok) {
          setSaveError("Could not complete XP spend. The Error Journal entry was not saved.");
          setIsSaving(false);
          return;
        }
      }
      setSaved(true);

      // Close after successful save
      setTimeout(() => {
        onSave(fullEntry);
      }, 1000);
    } catch (error) {
      setSaveError((error as Error).message || "Failed to save entry");
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
      <div className="max-h-[85vh] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-card p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold">{entry ? "Edit Entry" : "New Entry"}</h2>
          {saved && (
            <span className="flex items-center gap-1 text-xs text-success">
              <Check className="size-3" /> Saved
            </span>
          )}
        </div>

        {saveError && (
          <div className="mb-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            Error: {saveError}
          </div>
        )}

        <div className="space-y-3">
          {/* Question Text */}
          <div>
            <label className="block text-xs font-semibold uppercase">Question / Issue</label>
            <textarea
              value={data.questionText || ""}
              onChange={(e) => setData((d) => ({ ...d, questionText: e.target.value }))}
              rows={2}
              placeholder="Describe the question or issue..."
              className="mt-1 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Image Upload */}
          <ImageUploadSection entryId={entryId} onImageSelect={setImageBlob} />

          {/* Subject, Chapter, Topic - Grid */}
          <div className="grid gap-2 grid-cols-3">
            <div>
              <label className="block text-xs font-semibold uppercase">Subject</label>
              <select
                value={data.subject || "Physics"}
                onChange={(e) => setData((d) => ({ ...d, subject: e.target.value as any }))}
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase">Difficulty</label>
              <select
                value={data.difficulty || "Medium"}
                onChange={(e) => setData((d) => ({ ...d, difficulty: e.target.value as any }))}
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase">Status</label>
              <select
                value={data.status || "Need Review"}
                onChange={(e) => setData((d) => ({ ...d, status: e.target.value as any }))}
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s === "Need Review" ? "🔴" : s === "Learning" ? "🟡" : "🟢"} {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chapter and Topic */}
          <div className="grid gap-2 grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase">Chapter</label>
              <input
                type="text"
                value={data.chapter || ""}
                onChange={(e) => setData((d) => ({ ...d, chapter: e.target.value }))}
                placeholder="Chapter..."
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase">Topic</label>
              <input
                type="text"
                value={data.topic || ""}
                onChange={(e) => setData((d) => ({ ...d, topic: e.target.value }))}
                placeholder="Topic..."
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Source and Question Number */}
          <div className="grid gap-2 grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase">Source / Test</label>
              <input
                type="text"
                value={data.source || ""}
                onChange={(e) => setData((d) => ({ ...d, source: e.target.value }))}
                placeholder="e.g., JEE 2023..."
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase">Question #</label>
              <input
                type="text"
                value={data.questionNumber || ""}
                onChange={(e) => setData((d) => ({ ...d, questionNumber: e.target.value }))}
                placeholder="e.g., Q45..."
                className="mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Error Type - Compact */}
          <div>
            <label className="block text-xs font-semibold uppercase mb-1">Error Type</label>
            <div className="flex flex-wrap gap-1">
              {ERROR_TYPES.slice(0, 5).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setData((d) => ({ ...d, errorType: type as any }))}
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-[10px] font-medium transition",
                    data.errorType === type
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card hover:bg-accent",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
            {ERROR_TYPES.length > 5 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {ERROR_TYPES.slice(5).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setData((d) => ({ ...d, errorType: type as any }))}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-medium transition",
                      data.errorType === type
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card hover:bg-accent",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mistake Made */}
          <div>
            <label className="block text-xs font-semibold uppercase">❌ Mistake</label>
            <textarea
              value={data.mistakeMade || ""}
              onChange={(e) => setData((d) => ({ ...d, mistakeMade: e.target.value }))}
              rows={2}
              placeholder="What went wrong..."
              className="mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* What Learned */}
          <div>
            <label className="block text-xs font-semibold uppercase">✅ Learned</label>
            <textarea
              value={data.whatLearned || ""}
              onChange={(e) => setData((d) => ({ ...d, whatLearned: e.target.value }))}
              rows={2}
              placeholder="Key concepts..."
              className="mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Remember Next */}
          <div>
            <label className="block text-xs font-semibold uppercase">💡 Remember</label>
            <textarea
              value={data.rememberNext || ""}
              onChange={(e) => setData((d) => ({ ...d, rememberNext: e.target.value }))}
              rows={1}
              placeholder="Quick reminder..."
              className="mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase">📝 Notes</label>
            <textarea
              value={data.additionalNotes || ""}
              onChange={(e) => setData((d) => ({ ...d, additionalNotes: e.target.value }))}
              rows={1}
              placeholder="Extra notes..."
              className="mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Audio */}
          <AudioRecorder
            entryId={entryId}
            onAudioChange={(hasAudio) => setData((d) => ({ ...d, hasAudio }))}
          />

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Check className="mr-1 inline size-3 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check className="mr-1 inline size-3" /> Save
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
