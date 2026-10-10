import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Play, Target } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { listTests } from "@/lib/db";
import { startAttempt } from "@/lib/attempt";
import { prepareStartMode } from "@/lib/start-mode";
import { validatePool } from "@/lib/validate";
import type { Difficulty, Question, TestSet } from "@/lib/types";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Mode — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Quick chapter-wise and subject-wise practice sessions with difficulty filters and an instant timed runner.",
      },
      { property: "og:title", content: "Practice Mode — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Spin up a focused practice set by subject, chapter and difficulty in one click.",
      },
    ],
  }),
  component: PracticePage,
});

const DIFFS: Difficulty[] = ["Easy", "Medium", "Hard"];

export function useQuestionPool() {
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  return useMemo(() => {
    const list = tests.data ?? [];
    const all: { q: Question; test: TestSet }[] = [];
    for (const t of list) for (const q of t.questions) all.push({ q, test: t });
    // invalid questions never enter a generated practice set
    const pool = validatePool(all, (i) => i.q).valid;
    return { tests: list, pool, loading: tests.isLoading };
  }, [tests.data, tests.isLoading]);
}

function PracticePage() {
  const router = useRouter();
  const { pool, loading } = useQuestionPool();
  const [subject, setSubject] = useState("All");
  const [chapter, setChapter] = useState("All");
  const [diffs, setDiffs] = useState<Difficulty[]>([]);
  const [count, setCount] = useState(15);
  const [minutes, setMinutes] = useState(30);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const subjects = useMemo(() => ["All", ...new Set(pool.map((p) => p.q.subject))], [pool]);
  const chapters = useMemo(
    () => [
      "All",
      ...new Set(
        pool.filter((p) => subject === "All" || p.q.subject === subject).map((p) => p.q.chapter),
      ),
    ],
    [pool, subject],
  );

  const matched = useMemo(
    () =>
      pool.filter(
        (p) =>
          (subject === "All" || p.q.subject === subject) &&
          (chapter === "All" || p.q.chapter === chapter) &&
          (diffs.length === 0 || diffs.includes(p.q.difficulty)),
      ),
    [pool, subject, chapter, diffs],
  );

  const start = async () => {
    const picked = [...matched].sort(() => Math.random() - 0.5).slice(0, count);
    if (picked.length === 0) {
      toast.error("No questions match these filters");
      return;
    }
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const attempt = await startAttempt(picked[0].test, {
        questions: picked.map((p) => p.q),
        durationMin: minutes,
        name: `Practice · ${subject === "All" ? "Mixed" : subject}${chapter === "All" ? "" : ` — ${chapter}`}`,
        mode: selectedMode,
        strictMode: selectedMode === "strict",
      });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
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

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Target className="size-5" /> Practice
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Build a focused, timed set from your imported question banks.
      </p>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading question pool…</p>
      ) : pool.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Import a test first to start practising.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4 rounded-xl border bg-card p-4">
            <Field label="Subject">
              <Pills
                options={subjects}
                value={subject}
                onChange={(v) => {
                  setSubject(v);
                  setChapter("All");
                }}
              />
            </Field>
            <Field label="Chapter">
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
              >
                {chapters.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Difficulty">
              <div className="flex flex-wrap gap-2">
                {DIFFS.map((d) => (
                  <button
                    key={d}
                    onClick={() =>
                      setDiffs((cur) =>
                        cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d],
                      )
                    }
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                      diffs.includes(d)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-surface",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={`Questions: ${count}`}>
                <input
                  type="range"
                  min={5}
                  max={Math.max(5, Math.min(90, matched.length || 5))}
                  value={Math.min(count, Math.max(5, matched.length || 5))}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full"
                />
              </Field>
              <Field label={`Duration: ${minutes} min`}>
                <input
                  type="range"
                  min={5}
                  max={180}
                  step={5}
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full"
                />
              </Field>
            </div>
          </div>

          <div className="h-fit rounded-xl border bg-card p-4">
            <div className="text-xs font-semibold uppercase text-muted-foreground">
              Matching pool
            </div>
            <div className="mt-1 text-3xl font-bold">{matched.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.min(count, matched.length)} will be picked at random.
            </p>
            <button
              onClick={start}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              disabled={matched.length === 0}
            >
              <Play className="size-4" /> Start practice
            </button>
          </div>
        </div>
      )}

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold uppercase text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function Pills({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-xs font-semibold",
            value === o ? "border-primary bg-primary text-primary-foreground" : "bg-surface",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
