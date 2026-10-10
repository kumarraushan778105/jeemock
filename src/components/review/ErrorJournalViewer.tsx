import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getErrorJournalAudio, getErrorJournalImage, type ErrorJournalEntry } from "@/lib/db";
import { cn } from "@/lib/utils";

const AUDIO_SPEEDS = [0.5, 1, 1.5, 2] as const;

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * ErrorJournalViewer: READ-ONLY display of a preserved mistake.
 * Shows the original question, image, audio, and your mistake notes.
 * No solving, no reattempt, no practice.
 */
export function ErrorJournalViewer({
  entry,
  onClose,
}: {
  entry: ErrorJournalEntry;
  onClose: () => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const [audioLoading, setAudioLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerScale, setViewerScale] = useState(1);
  const [defaultImageScale, setDefaultImageScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const viewerBackdropRef = useRef<HTMLDivElement | null>(null);
  const questionViewerRef = useRef<HTMLDivElement | null>(null);

  // Load image
  useEffect(() => {
    let active = true;

    const loadImage = async () => {
      try {
        const blob = await getErrorJournalImage(entry.id);
        if (active && blob) {
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } finally {
        if (active) setImageLoading(false);
      }
    };

    loadImage();

    return () => {
      active = false;
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [entry.id]);

  // Load audio
  useEffect(() => {
    let active = true;

    const loadAudio = async () => {
      try {
        const blob = await getErrorJournalAudio(entry.id);
        if (active && blob) {
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }
      } finally {
        if (active) setAudioLoading(false);
      }
    };

    loadAudio();

    return () => {
      active = false;
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [entry.id]);

  const handleSpeedChange = (rate: number) => {
    setAudioSpeed(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  useEffect(() => {
    if (!viewerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.fullscreenElement && questionViewerRef.current) {
          void document.exitFullscreen();
          return;
        }
        setViewerOpen(false);
        return;
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setViewerScale((s) => Math.min(4, Number((s + 0.25).toFixed(2))));
      }
      if (event.key === "-") {
        event.preventDefault();
        setViewerScale((s) => Math.max(0.5, Number((s - 0.25).toFixed(2))));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [viewerOpen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(
        Boolean(
          document.fullscreenElement &&
          questionViewerRef.current &&
          document.fullscreenElement === questionViewerRef.current,
        ),
      );
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!viewerOpen || !imageUrl) return;

    const img = new Image();
    img.onload = () => {
      const viewport = questionViewerRef.current;
      if (!viewport) {
        setDefaultImageScale(1);
        return;
      }

      const rect = viewport.getBoundingClientRect();
      const availableWidth = Math.max(rect.width - 32, 320);
      const availableHeight = Math.max(rect.height - 32, 220);
      const ratio = Math.min(
        availableWidth / img.naturalWidth,
        availableHeight / img.naturalHeight,
      );
      setDefaultImageScale(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
    };
    img.src = imageUrl;
  }, [viewerOpen, imageUrl]);

  const closeQuestionViewer = () => {
    if (document.fullscreenElement && questionViewerRef.current) {
      void document.exitFullscreen();
    }
    setViewerOpen(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = async () => {
    const target = questionViewerRef.current;
    if (!target) return;

    try {
      if (!document.fullscreenElement) {
        if (typeof target.requestFullscreen === "function") {
          await target.requestFullscreen();
        }
      } else if (document.fullscreenElement === target) {
        if (typeof document.exitFullscreen === "function") {
          await document.exitFullscreen();
        }
      }
    } catch {
      // Fail gracefully if fullscreen is unavailable or rejected by the browser.
    }
  };

  const openQuestionViewer = () => {
    setViewerScale(1);
    setDefaultImageScale(1);
    setViewerOpen(true);
  };

  return (
    <>
      {viewerOpen && (
        <div
          ref={viewerBackdropRef}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/75 p-2 sm:p-6 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeQuestionViewer();
          }}
        >
          <div
            ref={questionViewerRef}
            className="flex h-full max-h-[100vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-3 py-2 sm:px-5">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  Original Question
                </div>
                <div className="text-sm font-semibold text-foreground">Full Screen Viewer</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setViewerScale((s) => Math.max(0.5, Number((s - 0.25).toFixed(2))))
                  }
                  className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground hover:bg-accent"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="min-w-12 text-center text-xs font-medium text-muted-foreground">
                  {Math.round(viewerScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setViewerScale((s) => Math.min(4, Number((s + 0.25).toFixed(2))))}
                  className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground hover:bg-accent"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground hover:bg-accent"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? "⛶ Exit Fullscreen" : "⛶ Fullscreen"}
                </button>
                <button
                  type="button"
                  onClick={() => setViewerScale(1)}
                  className="rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:bg-accent"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={closeQuestionViewer}
                  className="rounded-md border border-border bg-card p-2 text-foreground hover:bg-accent"
                  aria-label="Close viewer"
                  title="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-3 sm:p-5">
              {entry.questionText && (
                <div className="mb-4 rounded-xl border border-border/70 bg-card/60 p-3 text-sm text-foreground shadow-sm">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Question Text
                  </div>
                  <div className="whitespace-pre-wrap break-words leading-relaxed">
                    {entry.questionText}
                  </div>
                </div>
              )}

              {imageUrl ? (
                <div className="flex min-h-[50vh] items-center justify-center rounded-xl border border-border/70 bg-background/60 p-2 sm:p-4">
                  <img
                    src={imageUrl}
                    alt="Original question"
                    draggable={false}
                    className="block select-none transition-transform duration-150 ease-out"
                    style={{
                      transform: `scale(${viewerScale * defaultImageScale})`,
                      transformOrigin: "center center",
                      maxWidth: "none",
                      maxHeight: "none",
                    }}
                  />
                </div>
              ) : (
                <div className="flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-border/70 bg-card/30 p-4 text-sm text-muted-foreground">
                  No question image saved for this entry.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm">
        <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/80 bg-card p-6 shadow-xl">
          {/* Close Button */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">📖 Review Mistake</h2>
            <button
              onClick={onClose}
              className="rounded-lg border p-2 hover:bg-accent"
              title="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Metadata */}
            <div className="rounded-lg border bg-card/50 p-3 text-xs text-muted-foreground">
              <div className="grid gap-2 sm:grid-cols-2">
                {entry.subject && (
                  <div>
                    <span className="font-semibold">Subject:</span> {entry.subject}
                  </div>
                )}
                {entry.difficulty && (
                  <div>
                    <span className="font-semibold">Difficulty:</span> {entry.difficulty}
                  </div>
                )}
                {entry.source && (
                  <div>
                    <span className="font-semibold">Source:</span> {entry.source}
                  </div>
                )}
                {entry.questionNumber && (
                  <div>
                    <span className="font-semibold">Question #:</span> {entry.questionNumber}
                  </div>
                )}
                {entry.chapter && (
                  <div>
                    <span className="font-semibold">Chapter:</span> {entry.chapter}
                  </div>
                )}
                {entry.topic && (
                  <div>
                    <span className="font-semibold">Topic:</span> {entry.topic}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Error Type:</span> {entry.errorType}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={cn(
                      "ml-1 rounded-full px-2 py-0.5",
                      entry.status === "Need Review"
                        ? "bg-red-500/10 text-red-600"
                        : entry.status === "Learning"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-green-500/10 text-green-600",
                    )}
                  >
                    {entry.status === "Need Review" && "🔴"}
                    {entry.status === "Learning" && "🟡"}
                    {entry.status === "Mastered" && "🟢"}
                    {" " + entry.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(entry.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Original Question */}
            <div
              role="button"
              tabIndex={0}
              onClick={openQuestionViewer}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openQuestionViewer();
                }
              }}
              className="cursor-pointer space-y-2 rounded-lg border bg-card/50 p-4 transition hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <h3 className="text-sm font-bold">❓ Original Question</h3>
              <div className="text-sm text-foreground">
                {entry.questionText || "(No question text recorded)"}
              </div>
            </div>

            {/* Original Question Image */}
            {!imageLoading && imageUrl && (
              <div
                role="button"
                tabIndex={0}
                onClick={openQuestionViewer}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openQuestionViewer();
                  }
                }}
                className="cursor-pointer space-y-2 rounded-lg border bg-card/50 p-4 transition hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <h3 className="text-sm font-bold">📷 Original Question Image</h3>
                <img
                  src={imageUrl}
                  alt="Original question"
                  className="max-h-96 max-w-full rounded-lg border object-contain"
                />
              </div>
            )}

            {/* My Mistake */}
            {entry.mistakeMade && (
              <div className="space-y-2 rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <h3 className="text-sm font-bold text-red-600">❌ What Went Wrong</h3>
                <p className="text-sm text-foreground">{entry.mistakeMade}</p>
              </div>
            )}

            {/* What I Learned */}
            {entry.whatLearned && (
              <div className="space-y-2 rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <h3 className="text-sm font-bold text-green-600">✅ What I Learned</h3>
                <p className="text-sm text-foreground">{entry.whatLearned}</p>
              </div>
            )}

            {/* Remember Next Time */}
            {entry.rememberNext && (
              <div className="space-y-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
                <h3 className="text-sm font-bold text-blue-600">💡 Remember Next Time</h3>
                <p className="text-sm text-foreground">{entry.rememberNext}</p>
              </div>
            )}

            {/* Additional Notes */}
            {entry.additionalNotes && (
              <div className="space-y-2 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
                <h3 className="text-sm font-bold text-purple-600">📝 Additional Notes</h3>
                <p className="text-sm text-foreground">{entry.additionalNotes}</p>
              </div>
            )}

            {/* Audio Recording - Show if audio exists OR if hasAudio flag is true */}
            {(audioUrl || entry.hasAudio) && (
              <div className="space-y-3 rounded-lg border border-dashed bg-card/50 p-4">
                <h3 className="text-sm font-bold">🎙️ My Audio Reflection</h3>

                {audioLoading && <p className="text-xs text-muted-foreground">Loading audio...</p>}

                {audioUrl ? (
                  <>
                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      controls
                      className="w-full rounded-lg bg-card"
                    />

                    <div className="flex flex-wrap gap-1.5">
                      {AUDIO_SPEEDS.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={cn(
                            "rounded-md border px-2 py-1 text-xs font-semibold transition",
                            audioSpeed === speed
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card hover:bg-accent",
                          )}
                        >
                          {speed}×
                        </button>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Click to play · Use speed controls · Your original recording
                    </p>
                  </>
                ) : (
                  !audioLoading && (
                    <p className="text-xs text-muted-foreground">
                      No audio recording found for this entry.
                    </p>
                  )
                )}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
