import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Copy,
  Download,
  Images,
  KeyRound,
  Pencil,
  Play,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { LazyImage, ImageViewer } from "@/components/ImageViewer";
import { AnswerEditor } from "@/components/bank/AnswerEditor";
import { StatusDot } from "./index";
import { prepareStartMode } from "@/lib/start-mode";
import {
  deleteImage,
  deleteTest,
  getTest,
  listImages,
  listTests,
  putImages,
  putTest,
  uid,
} from "@/lib/db";
import { exportTestJson, questionNumberFromFilename, validateTest } from "@/lib/import";
import { startAttempt } from "@/lib/attempt";
import { validationCounts } from "@/lib/validate";
import type { TestSet } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bank")({
  validateSearch: (search: Record<string, unknown>) => ({
    edit: typeof search.edit === "string" ? search.edit : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Question Bank — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Manage imported JEE test sets: open, rename, duplicate, validate, export, edit answer keys and map diagrams to questions.",
      },
      { property: "og:title", content: "Question Bank — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Search, filter and maintain every imported JEE question set on your device.",
      },
    ],
  }),
  component: BankPage,
});

type SortKey = "date" | "name" | "questions";

function BankPage() {
  const qc = useQueryClient();
  const router = useRouter();
  const { edit, q: focusQuestion } = Route.useSearch();
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [sort, setSort] = useState<SortKey>("date");
  const [figuresFor, setFiguresFor] = useState<TestSet | null>(null);
  const [answersFor, setAnswersFor] = useState<string | null>(edit ?? null);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const rows = useMemo(() => {
    let list = tests.data ?? [];
    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(s) ||
          t.chapters.some((c) => c.toLowerCase().includes(s)) ||
          t.subjects.some((c) => c.toLowerCase().includes(s)),
      );
    }
    if (subject !== "all") list = list.filter((t) => t.subjects.includes(subject));
    const sorted = [...list];
    sorted.sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "questions"
          ? b.questionCount - a.questionCount
          : b.importedAt - a.importedAt,
    );
    return sorted;
  }, [tests.data, search, subject, sort]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["tests"] });
    qc.invalidateQueries({ queryKey: ["adv"] });
  };

  const onRename = async (t: TestSet) => {
    const name = window.prompt("Rename test", t.name);
    if (!name?.trim()) return;
    await putTest({ ...t, name: name.trim(), updatedAt: Date.now() });
    refresh();
    toast.success("Renamed");
  };

  const onDuplicate = async (t: TestSet) => {
    const copy: TestSet = {
      ...t,
      id: uid("test"),
      name: `${t.name} (copy)`,
      importedAt: Date.now(),
    };
    // duplicate image records so deletes stay independent
    const imgs = await listImages(t.id);
    const idMap = new Map<string, string>();
    const cloned = imgs.map((i) => {
      const nid = `${copy.id}::${i.name.toLowerCase()}_${Math.random().toString(36).slice(2, 6)}`;
      idMap.set(i.id, nid);
      return { ...i, id: nid, testId: copy.id };
    });
    await putImages(cloned);
    copy.questions = t.questions.map((q) => ({
      ...q,
      images: q.images.map((id) => idMap.get(id) ?? id),
    }));
    await putTest(copy);
    refresh();
    toast.success("Duplicated");
  };

  const onDelete = async (t: TestSet) => {
    if (!window.confirm(`Delete "${t.name}"? Attempts and images will be removed.`)) return;
    await deleteTest(t.id);
    refresh();
    qc.invalidateQueries({ queryKey: ["attempts"] });
    toast.success("Deleted");
  };

  const onExport = (t: TestSet) => {
    const blob = new Blob([exportTestJson(t)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.name.replace(/[^\w-]+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onValidate = async (t: TestSet) => {
    const issues = validateTest(t);
    const status = issues.some((i) => i.level === "error")
      ? "invalid"
      : issues.length
        ? "warning"
        : "valid";
    await putTest({ ...t, issues, status });
    refresh();
    if (status === "valid") toast.success("All questions valid");
    else toast.warning(`${issues.length} issue(s) found — see the test row`);
  };

  const onStart = async (t: TestSet) => {
    if (t.status === "invalid") return toast.error("Fix validation errors before starting.");
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const a = await startAttempt(t, {
        mode: selectedMode,
        strictMode: selectedMode === "strict",
      });
      qc.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: a.id } });
    });
    setModePickerOpen(true);
  };

  const handleModeSelect = async (selectedMode: StartMode) => {
    const decision = await prepareStartMode(selectedMode, {
      fullscreenSupported: !!document.fullscreenEnabled,
      isFullscreen: !!document.fullscreenElement,
      requestFullscreen: async () => {
        try {
          await document.documentElement.requestFullscreen();
          return true;
        } catch {
          return false;
        }
      },
    });
    if (!decision.ok) {
      toast.error(decision.error);
      return;
    }
    if (pendingLaunch) {
      const currentLaunch = pendingLaunch;
      setPendingLaunch(null);
      await currentLaunch(selectedMode);
    }
  };

  const subjects = [...new Set((tests.data ?? []).flatMap((t) => t.subjects))];

  return (
    <AppShell>
      <h1 className="text-2xl font-bold tracking-tight">Question Bank</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every imported set lives on this device. Validate before attempting a paper.
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative">
          <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, subject or chapter…"
            className="w-full rounded-lg border bg-card py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-lg border bg-card px-3 py-2 text-sm"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border bg-card px-3 py-2 text-sm"
        >
          <option value="date">Newest first</option>
          <option value="name">Name A–Z</option>
          <option value="questions">Most questions</option>
        </select>
      </div>

      <div className="mt-6 space-y-3">
        {rows.length === 0 && (
          <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            Nothing here yet.{" "}
            <Link to="/import" className="text-primary underline">
              Import a test
            </Link>
            .
          </p>
        )}
        {rows.map((t) => (
          <div key={t.id} className="rounded-xl border bg-card p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <StatusDot status={t.status} />
                  <h3 className="truncate font-semibold">{t.name}</h3>
                </div>
                <p className="mt-1 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground">
                  <QuestionValidity test={t} />
                  {t.subjects.join(" · ") || "—"} · {t.chapters.length} chapters · {t.questionCount}{" "}
                  questions · {t.imageCount} images · imported{" "}
                  {new Date(t.importedAt).toLocaleDateString()} · {t.source.toUpperCase()}
                </p>
                {t.issues.length > 0 && (
                  <details className="mt-2 text-xs">
                    <summary className="cursor-pointer text-warning">
                      {t.issues.length} validation note(s)
                    </summary>
                    <ul className="mt-1 max-h-32 list-disc overflow-auto pl-5 text-muted-foreground">
                      {t.issues.slice(0, 40).map((i, idx) => (
                        <li key={idx}>{i.message}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
              <div className="flex flex-wrap justify-end gap-1">
                <Act
                  onClick={() => onStart(t)}
                  icon={<Play className="size-3.5" />}
                  label="Open"
                  primary
                />
                <Act
                  onClick={() => setAnswersFor(t.id)}
                  icon={<KeyRound className="size-3.5" />}
                  label="Questions"
                />
                <Act
                  onClick={() => setFiguresFor(t)}
                  icon={<Images className="size-3.5" />}
                  label="Figures"
                />

                <Act
                  onClick={() => onValidate(t)}
                  icon={<ShieldCheck className="size-3.5" />}
                  label="Validate"
                />
                <Act
                  onClick={() => onRename(t)}
                  icon={<Pencil className="size-3.5" />}
                  label="Rename"
                />
                <Act
                  onClick={() => onDuplicate(t)}
                  icon={<Copy className="size-3.5" />}
                  label="Duplicate"
                />
                <Act
                  onClick={() => onExport(t)}
                  icon={<Download className="size-3.5" />}
                  label="Export"
                />
                <Act
                  onClick={() => onDelete(t)}
                  icon={<Trash2 className="size-3.5" />}
                  label="Delete"
                  danger
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />

      {figuresFor && (
        <FiguresManager
          testId={figuresFor.id}
          onClose={() => setFiguresFor(null)}
          onChanged={refresh}
        />
      )}

      {answersFor && (
        <AnswerEditor
          testId={answersFor}
          focusQuestionId={answersFor === edit ? focusQuestion : undefined}
          onClose={() => setAnswersFor(null)}
        />
      )}
    </AppShell>
  );
}

function Act({
  onClick,
  icon,
  label,
  primary,
  danger,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
        primary && "border-primary bg-primary text-primary-foreground hover:opacity-90",
        danger && "border-destructive/40 text-destructive",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

/** Figures panel: thumbnails, linked question, manual upload / replace / mapping. */
function FiguresManager({
  testId,
  onClose,
  onChanged,
}: {
  testId: string;
  onClose: () => void;
  onChanged: () => void;
}) {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [viewer, setViewer] = useState<string[] | null>(null);
  const data = useQuery({
    queryKey: ["figures", testId],
    queryFn: async () => {
      const [test, images] = await Promise.all([getTest(testId), listImages(testId)]);
      return { test, images };
    },
  });

  const test = data.data?.test;
  const images = data.data?.images ?? [];
  const reload = () => {
    qc.invalidateQueries({ queryKey: ["figures", testId] });
    onChanged();
  };

  const linkOf = (imgId: string) => test?.questions.find((q) => q.images.includes(imgId));

  const uploadFiles = async (files: FileList) => {
    if (!test) return;
    const stored = [];
    const updated = { ...test, questions: test.questions.map((q) => ({ ...q })) };
    let matched = 0;
    for (const f of Array.from(files)) {
      const id = `${testId}::${f.name.toLowerCase()}_${Math.random().toString(36).slice(2, 6)}`;
      stored.push({ id, testId, name: f.name, blob: f });
      const n = questionNumberFromFilename(f.name);
      const q = n !== null ? updated.questions.find((x) => x.number === n) : undefined;
      if (q) {
        q.images = [...q.images, id];
        q.flags = { ...q.flags, diagram: true };
        matched += 1;
      }
    }
    await putImages(stored);
    updated.imageCount = images.length + stored.length;
    updated.updatedAt = Date.now();
    await putTest(updated);
    reload();
    toast.success(`${stored.length} image(s) added · ${matched} auto-linked by filename`);
  };

  const mapTo = async (imgId: string, questionNumber: string) => {
    if (!test) return;
    const n = Number(questionNumber);
    const updated = {
      ...test,
      questions: test.questions.map((q) => {
        const without = q.images.filter((i) => i !== imgId);
        return q.number === n
          ? { ...q, images: [...without, imgId], flags: { ...q.flags, diagram: true } }
          : { ...q, images: without };
      }),
      updatedAt: Date.now(),
    };
    await putTest(updated);
    reload();
  };

  const removeImage = async (imgId: string) => {
    if (!test) return;
    await deleteImage(imgId);
    await putTest({
      ...test,
      questions: test.questions.map((q) => ({ ...q, images: q.images.filter((i) => i !== imgId) })),
      imageCount: Math.max(0, test.imageCount - 1),
      updatedAt: Date.now(),
    });
    reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-t-2xl border bg-card sm:rounded-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b p-4">
          <div className="min-w-0">
            <h2 className="truncate font-semibold">Figures — {test?.name}</h2>
            <p className="text-xs text-muted-foreground">
              {images.length} images · click a thumbnail to preview, map it to a question number, or
              upload more.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Upload images
            </button>
            <button onClick={onClose} className="rounded-md border px-3 py-1.5 text-xs">
              Close
            </button>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          hidden
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        <div className="scroll-slim grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
              No figures in this test yet.
            </p>
          )}
          {images.map((img) => {
            const q = linkOf(img.id);
            return (
              <div key={img.id} className="rounded-lg border bg-surface p-2">
                <button
                  onClick={() => setViewer([img.id])}
                  className="grid h-28 w-full place-items-center overflow-hidden rounded bg-card"
                >
                  <LazyImage id={img.id} alt={img.name} className="max-h-28" />
                </button>
                <div className="mt-2 truncate text-[11px] text-muted-foreground" title={img.name}>
                  {img.name}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px]">
                  {q ? (
                    <span className="inline-flex items-center gap-1 text-success">
                      <CheckCircle2 className="size-3" /> Q{q.number} · {q.subject}
                    </span>
                  ) : (
                    <span className="text-warning">unmapped</span>
                  )}
                </div>
                {q?.chapter && <div className="text-[11px] text-muted-foreground">{q.chapter}</div>}
                <div className="mt-2 flex gap-1">
                  <select
                    value={q?.number ?? ""}
                    onChange={(e) => mapTo(img.id, e.target.value)}
                    className="min-w-0 flex-1 rounded border bg-card px-1 py-1 text-[11px]"
                  >
                    <option value="">Map to…</option>
                    {test?.questions.map((qq) => (
                      <option key={qq.id} value={qq.number}>
                        Q{qq.number}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="rounded border border-destructive/40 px-1.5 text-[11px] text-destructive"
                  >
                    del
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {viewer && <ImageViewer ids={viewer} onClose={() => setViewer(null)} />}
    </div>
  );
}

/** Valid / invalid question counts for a set, computed from the live questions. */
function QuestionValidity({ test }: { test: TestSet }) {
  const counts = useMemo(() => validationCounts(test.questions), [test.questions]);
  if (counts.invalid === 0)
    return (
      <span className="rounded bg-success/15 px-1.5 py-0.5 font-semibold text-success">
        {counts.valid} valid
      </span>
    );
  return (
    <span className="rounded bg-destructive/15 px-1.5 py-0.5 font-semibold text-destructive">
      {counts.invalid} invalid · {counts.valid} valid
    </span>
  );
}
