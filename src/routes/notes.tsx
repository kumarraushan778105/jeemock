import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Folder,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import {
  deleteLibraryNote,
  libraryNoteUrl,
  listLibraryNotes,
  putLibraryNote,
  uid,
  type LibraryNote,
} from "@/lib/db";
import { SUBJECTS } from "@/lib/types";
import { groupLibraryNotesBySubjectAndChapter } from "@/lib/notes-library";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes Library — Revision PDFs & Images" },
      {
        name: "description",
        content:
          "Upload, organise and read revision notes as PDFs or images, sorted by subject and chapter, entirely offline.",
      },
      { property: "og:title", content: "Notes Library — Revision PDFs & Images" },
      {
        property: "og:description",
        content: "Subject and chapter wise revision notes with a built-in PDF and image viewer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesLibrary,
});

const OK_IMAGE = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

function NotesLibrary() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [subject, setSubject] = useState<string>(SUBJECTS[0] as string);
  const [chapter, setChapter] = useState("");
  const [search, setSearch] = useState("");
  const [fSubject, setFSubject] = useState("all");
  const [fChapter, setFChapter] = useState("all");
  const [view, setView] = useState<LibraryNote | null>(null);
  const [activeGroupKey, setActiveGroupKey] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const data = useQuery({ queryKey: ["library-notes"], queryFn: listLibraryNotes });
  const notes = data.data ?? [];

  const chapters = useMemo(
    () => [...new Set(notes.map((n) => n.chapter).filter(Boolean))].sort(),
    [notes],
  );

  const chapterGroups = useMemo(() => groupLibraryNotesBySubjectAndChapter(notes), [notes]);

  const filteredGroups = useMemo(() => {
    const s = search.trim().toLowerCase();
    return chapterGroups.filter((group) => {
      if (fSubject !== "all" && group.subject !== fSubject) return false;
      if (fChapter !== "all" && group.chapter !== fChapter) return false;
      if (!s) return true;
      const haystack = `${group.subject} ${group.chapter}`.toLowerCase();
      return (
        haystack.includes(s) ||
        group.notes.some((note) => `${note.title} ${note.name}`.toLowerCase().includes(s))
      );
    });
  }, [chapterGroups, fSubject, fChapter, search]);

  const selectedGroup = useMemo(() => {
    if (!activeGroupKey) return null;
    return (
      chapterGroups.find((group) => `${group.subject}::${group.chapter}` === activeGroupKey) ?? null
    );
  }, [activeGroupKey, chapterGroups]);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setActiveGroupKey(null);
      return;
    }

    const match = filteredGroups[0];
    if (match) {
      setActiveGroupKey(`${match.subject}::${match.chapter}`);
    }
  }, [filteredGroups, search]);

  const upload = async (files: File[]) => {
    const valid = files.filter((f) => f.type === "application/pdf" || OK_IMAGE.includes(f.type));
    if (valid.length === 0) {
      toast.error("Upload a PDF or an image (PNG, JPG, WEBP)");
      return;
    }
    setBusy(true);
    try {
      for (const f of valid) {
        await putLibraryNote({
          id: uid("note"),
          title: f.name.replace(/\.[^.]+$/, ""),
          subject,
          chapter: chapter.trim() || "General",
          kind: f.type === "application/pdf" ? "pdf" : "image",
          name: f.name,
          type: f.type,
          size: f.size,
          blob: f,
          createdAt: Date.now(),
        });
      }
      qc.invalidateQueries({ queryKey: ["library-notes"] });
      toast.success(`${valid.length} note(s) added to ${subject} · ${chapter.trim() || "General"}`);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (n: LibraryNote) => {
    if (!window.confirm(`Delete "${n.title}"?`)) return;
    await deleteLibraryNote(n.id);
    qc.invalidateQueries({ queryKey: ["library-notes"] });
    toast.success("Note deleted");
  };

  const downloadNote = (n: LibraryNote) => {
    const url = URL.createObjectURL(n.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = n.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-5">
        <header>
          <h1 className="text-xl font-bold tracking-tight">Notes Library</h1>
          <p className="text-sm text-muted-foreground">
            Revision material only — PDFs and note images organised by subject and chapter. Kept
            fully separate from the question bank and CBT engine.
          </p>
        </header>

        <section className="space-y-3 rounded-xl border bg-card p-4">
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase text-muted-foreground">
                Subject
              </span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border bg-background px-2 py-1.5 text-sm"
              >
                {[...new Set([...(SUBJECTS as string[]), ...notes.map((n) => n.subject)])].map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ),
                )}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase text-muted-foreground">
                Chapter
              </span>
              <input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Rotational Motion"
                list="note-chapters"
                className="w-full rounded-lg border bg-background px-2 py-1.5 text-sm"
              />
              <datalist id="note-chapters">
                {chapters.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <div className="flex items-end">
              <button
                type="button"
                disabled={busy}
                onClick={() => fileRef.current?.click()}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                <Upload className="size-4" /> {busy ? "Saving…" : "Upload notes"}
              </button>
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="application/pdf,image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              if (files.length) void upload(files);
            }}
          />
          <p className="text-[11px] text-muted-foreground">
            PDF · PNG · JPG · WEBP — stored offline on this device, exactly as uploaded.
          </p>
        </section>

        <section className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes by title, file name, subject or chapter…"
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:max-w-md">
            <select
              value={fSubject}
              onChange={(e) => setFSubject(e.target.value)}
              className="rounded-lg border bg-background px-2 py-1.5 text-xs"
            >
              <option value="all">All subjects</option>
              {[...new Set(notes.map((n) => n.subject))].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={fChapter}
              onChange={(e) => setFChapter(e.target.value)}
              className="rounded-lg border bg-background px-2 py-1.5 text-xs"
            >
              <option value="all">All chapters</option>
              {chapters.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </section>

        {filteredGroups.length === 0 ? (
          <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No notes yet — upload a PDF or a screenshot of your notes to start your revision
            library.
          </p>
        ) : selectedGroup ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-background/70 px-3 py-2">
              <div>
                <div className="text-sm font-semibold">{selectedGroup.chapter}</div>
                <div className="text-xs text-muted-foreground">{selectedGroup.subject}</div>
              </div>
              <button
                type="button"
                onClick={() => setActiveGroupKey(null)}
                className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium"
              >
                <ChevronLeft className="size-3.5" /> Back to library
              </button>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {selectedGroup.notes.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 rounded-xl border bg-card p-3 shadow-sm transition-colors hover:border-primary/50"
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg",
                      n.kind === "pdf"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {n.kind === "pdf" ? (
                      <FileText className="size-4" />
                    ) : (
                      <ImageIcon className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <button type="button" onClick={() => setView(n)} className="w-full text-left">
                      <span className="block truncate text-sm font-semibold">{n.title}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {n.name} · {(n.size / 1024).toFixed(0)} KB
                      </span>
                    </button>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setView(n)}
                        className="rounded border px-2 py-1 text-[11px] font-medium"
                      >
                        Open
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadNote(n)}
                        className="rounded border px-2 py-1 text-[11px] font-medium"
                      >
                        <span className="inline-flex items-center gap-1">
                          <Download className="size-3" /> Download
                        </span>
                      </button>
                      <button
                        onClick={() => void remove(n)}
                        title="Delete note"
                        aria-label="Delete note"
                        className="rounded border border-destructive/40 px-2 py-1 text-[11px] font-medium text-destructive"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filteredGroups.map((group) => {
              const lastUpdated = new Date(
                Math.max(...group.notes.map((note) => note.createdAt)),
              ).toLocaleDateString();

              return (
                <button
                  key={`${group.subject}-${group.chapter}`}
                  type="button"
                  onClick={() => setActiveGroupKey(`${group.subject}::${group.chapter}`)}
                  className="flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/50"
                >
                  <div className="flex w-full items-start gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Folder className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{group.chapter}</div>
                      <div className="truncate text-xs text-muted-foreground">{group.subject}</div>
                    </div>
                    <div className="rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      {group.notes.length} note{group.notes.length === 1 ? "" : "s"}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between text-[11px] text-muted-foreground">
                    <span>Updated {lastUpdated}</span>
                    <span className="font-medium text-foreground">Open</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {view && (
        <NoteViewer
          note={view}
          onClose={() => setView(null)}
          chapterNotes={selectedGroup?.notes ?? []}
          onNavigate={setView}
        />
      )}
    </AppShell>
  );
}

function NoteViewer({
  note,
  onClose,
  chapterNotes = [],
  onNavigate,
}: {
  note: LibraryNote;
  onClose: () => void;
  chapterNotes?: LibraryNote[];
  onNavigate?: (note: LibraryNote) => void;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [displayMode, setDisplayMode] = useState<"fit-width" | "fit-page" | "actual-size">(
    "fit-width",
  );
  const [page, setPage] = useState(1);
  const [viewerSize, setViewerSize] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const zoomRef = useRef(1);
  zoomRef.current = zoom;

  const url = useQuery({
    queryKey: ["library-note-url", note.id],
    queryFn: () => libraryNoteUrl(note.id),
  }).data;

  const currentIndex = chapterNotes.findIndex((item) => item.id === note.id);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < chapterNotes.length - 1;
  const zoomPresets = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 1.9, 2, 2.5, 3, 4, 5, 8];

  useEffect(() => {
    setPage(1);
    setDisplayMode("fit-width");
    setZoom(1);
  }, [note.id]);

  useEffect(() => {
    if (!viewerRef.current) return;

    const updateViewerSize = () => {
      if (!viewerRef.current) return;
      const rect = viewerRef.current.getBoundingClientRect();
      setViewerSize({ width: rect.width - 24, height: rect.height - 24 });
    };

    updateViewerSize();
    const observer = new ResizeObserver(updateViewerSize);
    observer.observe(viewerRef.current);
    window.addEventListener("resize", updateViewerSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateViewerSize);
    };
  }, [note.id, isFullscreen]);

  useEffect(() => {
    if (!viewerSize.width) return;
    if (displayMode === "fit-width") {
      setZoom(Math.max(0.25, Math.min(8, viewerSize.width / 816)));
    } else if (displayMode === "fit-page") {
      setZoom(
        Math.max(0.25, Math.min(8, Math.min(viewerSize.width / 816, viewerSize.height / 1056))),
      );
    }
  }, [displayMode, viewerSize.height, viewerSize.width]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "=")) {
        event.preventDefault();
        setDisplayMode("actual-size");
        setZoom((value) => Math.min(8, Number((value + 0.1).toFixed(2))));
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "-") {
        event.preventDefault();
        setDisplayMode("actual-size");
        setZoom((value) => Math.max(0.25, Number((value - 0.1).toFixed(2))));
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "0") {
        event.preventDefault();
        setDisplayMode("actual-size");
        setZoom(1);
      }
      if (event.key === "Escape" && document.fullscreenElement) {
        event.preventDefault();
        void document.exitFullscreen();
        setIsFullscreen(false);
      }
      if (event.key === "ArrowLeft" && canGoPrev && onNavigate) {
        event.preventDefault();
        onNavigate(chapterNotes[currentIndex - 1]);
      }
      if (event.key === "ArrowRight" && canGoNext && onNavigate) {
        event.preventDefault();
        onNavigate(chapterNotes[currentIndex + 1]);
      }
      if (event.key === "PageUp") {
        event.preventDefault();
        viewerRef.current?.scrollBy({ top: -400, behavior: "smooth" });
      }
      if (event.key === "PageDown") {
        event.preventDefault();
        viewerRef.current?.scrollBy({ top: 400, behavior: "smooth" });
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [canGoNext, canGoPrev, chapterNotes, currentIndex, note.id, onNavigate]);

  const applyZoom = (next: number) => {
    setDisplayMode("actual-size");
    setZoom(Math.min(8, Math.max(0.25, Number(next.toFixed(3)))));
  };

  /**
   * Cursor-anchored, delta-proportional zoom. Kept in a ref so the native
   * non-passive wheel listener below never reads stale state.
   */
  const wheelZoom = (event: WheelEvent) => {
    const el = viewerRef.current;
    if (!el) return;
    const dy = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
    const current = zoomRef.current;
    const next = Math.min(8, Math.max(0.25, current * Math.exp(-dy * 0.0018)));
    if (next === current) return;

    // keep the point under the cursor stationary
    const rect = el.getBoundingClientRect();
    const px = event.clientX - rect.left + el.scrollLeft;
    const py = event.clientY - rect.top + el.scrollTop;
    const k = next / current;

    setDisplayMode("actual-size");
    setZoom(next);
    requestAnimationFrame(() => {
      const node = viewerRef.current;
      if (!node) return;
      node.scrollLeft += px * (k - 1);
      node.scrollTop += py * (k - 1);
    });
  };
  const wheelRef = useRef(wheelZoom);
  wheelRef.current = wheelZoom;

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      // Ctrl/Cmd + wheel and trackpad pinch (which arrives with ctrlKey)
      if (!(event.ctrlKey || event.metaKey)) return;
      event.preventDefault();
      wheelRef.current(event);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [note.id, isFullscreen, url]);

  const setViewMode = (mode: "fit-width" | "fit-page" | "actual-size") => {
    setDisplayMode(mode);
  };

  const toggleFullscreen = async () => {
    const el = shellRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      await el.requestFullscreen?.();
    }
  };

  const zoomLabel =
    displayMode === "fit-width"
      ? "Fit Width"
      : displayMode === "fit-page"
        ? "Fit Page"
        : `${Math.round(zoom * 100)}%`;

  const pdfZoomParam =
    displayMode === "fit-width"
      ? "page-width"
      : displayMode === "fit-page"
        ? "page-fit"
        : `${Math.round(zoom * 100)}`;

  const pdfSrc = url
    ? `${url}#page=${page}&toolbar=0&navpanes=0&zoom=${encodeURIComponent(pdfZoomParam)}`
    : undefined;

  return (
    <div
      ref={shellRef}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-black/80 p-2 sm:p-6",
        isFullscreen && "bg-black p-0 sm:p-0",
      )}
    >
      <div
        className={cn(
          "mb-2 flex items-center gap-2 text-sm text-white",
          isFullscreen && "justify-end",
        )}
      >
        {!isFullscreen && (
          <span className="min-w-0 flex-1 truncate font-semibold">
            {note.title} — {note.subject} · {note.chapter}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {chapterNotes.length > 1 && (
            <>
              <button
                type="button"
                disabled={!canGoPrev}
                onClick={() => onNavigate?.(chapterNotes[currentIndex - 1])}
                aria-label="Previous note"
                title="Previous note"
                className="grid size-8 place-items-center rounded-md border border-white/30 bg-black/20 disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => onNavigate?.(chapterNotes[currentIndex + 1])}
                aria-label="Next note"
                title="Next note"
                className="grid size-8 place-items-center rounded-md border border-white/30 bg-black/20 disabled:opacity-40"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => applyZoom(zoom - 0.1)}
            aria-label="Zoom out"
            title="Zoom out"
            className="grid size-8 place-items-center rounded-md border border-white/30 bg-black/20"
          >
            <Minus className="size-4" />
          </button>
          <select
            value={displayMode === "actual-size" ? `${Math.round(zoom * 100)}%` : displayMode}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "fit-width") {
                setViewMode("fit-width");
              } else if (value === "fit-page") {
                setViewMode("fit-page");
              } else if (value === "actual-size") {
                setViewMode("actual-size");
              } else {
                const next = Number(value) / 100;
                applyZoom(next);
              }
            }}
            className="rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs text-white"
          >
            <option value="fit-width">Fit Width</option>
            <option value="fit-page">Fit Page</option>
            <option value="actual-size">Actual Size</option>
            {zoomPresets.map((preset) => (
              <option key={preset} value={Math.round(preset * 100)}>
                {Math.round(preset * 100)}%
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => applyZoom(zoom + 0.1)}
            aria-label="Zoom in"
            title="Zoom in"
            className="grid size-8 place-items-center rounded-md border border-white/30 bg-black/20"
          >
            <Plus className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("fit-width")}
            className="rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-medium"
          >
            Fit Width
          </button>
          <button
            type="button"
            onClick={() => setViewMode("fit-page")}
            className="rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-medium"
          >
            Fit Page
          </button>
          <button
            type="button"
            onClick={() => {
              setDisplayMode("actual-size");
              setZoom(1);
            }}
            aria-label="Reset zoom"
            title="Reset zoom"
            className="rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-semibold"
          >
            {zoomLabel}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
            className="grid size-8 place-items-center rounded-md border border-white/30 bg-black/20"
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="grid size-8 place-items-center rounded-md border border-white/30 bg-black/20"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={viewerRef}
        className={cn(
          "flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-xl bg-card p-4",
          isFullscreen && "rounded-none p-2 sm:p-2",
        )}
      >
        {!url ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : note.kind === "pdf" ? (
          <div className="flex w-full justify-center">
            <embed
              src={pdfSrc}
              type="application/pdf"
              title={note.title}
              className="min-h-[75vh] w-full rounded-xl border-0 bg-white"
            />
          </div>
        ) : (
          <div
            className="flex w-full items-start justify-center"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              width: `${100 / zoom}%`,
              minHeight: `${100 / zoom}%`,
            }}
          >
            <img src={url} alt={note.title} className="max-h-full max-w-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
