import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import {
  advancedContext,
  filterAdvanced,
  pickQuestions,
  type AdvFilters,
  type PoolSource,
} from "@/lib/advanced";
import { startAdvancedTest } from "@/lib/advanced-start";
import { prepareStartMode } from "@/lib/start-mode";
import { QUESTION_TYPE_LABEL, type Difficulty, type QuestionType } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advanced/practice")({
  head: () => ({
    meta: [
      { title: "Custom JEE Advanced Practice Test Generator" },
      {
        name: "description",
        content:
          "Build a custom JEE Advanced test by subject, chapter, topic, difficulty, question type, paper and year.",
      },
      { property: "og:title", content: "Custom JEE Advanced Practice Test Generator" },
      {
        property: "og:description",
        content: "Filter by chapter, difficulty, type and year, then generate a timed test.",
      },
    ],
  }),
  component: AdvancedPractice,
});

const SOURCES: { key: PoolSource; label: string }[] = [
  { key: "all", label: "Whole bank" },
  { key: "weak", label: "Weak chapters" },
  { key: "strong", label: "Strong chapters" },
  { key: "wrong", label: "Previously wrong" },
  { key: "unattempted", label: "Unattempted" },
  { key: "bookmarked", label: "Bookmarked" },
  { key: "pyq", label: "PYQ only" },
];

function Chips<T extends string | number>({
  values,
  selected,
  onToggle,
  label,
  render,
}: {
  values: T[];
  selected: T[];
  onToggle: (v: T) => void;
  label: string;
  render?: (v: T) => string;
}) {
  if (values.length === 0) return null;
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {values.map((v) => (
          <button
            key={String(v)}
            onClick={() => onToggle(v)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs",
              selected.includes(v)
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background",
            )}
          >
            {render ? render(v) : String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

function AdvancedPractice() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["adv", "ctx"], queryFn: advancedContext });

  const [f, setF] = useState<AdvFilters>({ source: "all" });
  const [chapterSearch, setChapterSearch] = useState("");
  const [count, setCount] = useState(30);
  const [minutes, setMinutes] = useState(60);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const toggle = <K extends keyof AdvFilters>(key: K, v: unknown) =>
    setF((prev) => {
      const cur = ((prev[key] as unknown[]) ?? []).slice();
      const i = cur.indexOf(v);
      if (i === -1) cur.push(v);
      else cur.splice(i, 1);
      return { ...prev, [key]: cur } as AdvFilters;
    });

  const matched = useMemo(() => {
    if (!data) return [];
    return filterAdvanced(data.index, f, data.history);
  }, [data, f]);

  const available = useMemo(
    () => (allowRepeat ? matched : matched.filter((i) => !data?.history.used.has(i.q.id))),
    [matched, allowRepeat, data],
  );

  const idx = data?.index;

  const visibleChapters = useMemo(() => {
    const term = chapterSearch.trim().toLowerCase();
    return (idx?.chapters ?? []).filter((chapter) => chapter.toLowerCase().includes(term));
  }, [idx?.chapters, chapterSearch]);

  const start = useMutation({
    mutationFn: async (opts?: { strictMode?: boolean }) => {
      const questions = pickQuestions(matched, {
        count,
        allowRepeat,
        used: data?.history.used,
      });
      if (questions.length === 0) throw new Error("No questions match these filters.");
      const att = await startAdvancedTest({
        name: "JEE Advanced Custom Practice",
        questions,
        durationMin: minutes,
        strictMode: opts?.strictMode,
      });
      return att.id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const launch = async () => {
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const id = await start.mutateAsync({
        mode: selectedMode,
        strictMode: selectedMode === "strict",
      });
      if (id) {
        qc.invalidateQueries({ queryKey: ["attempts"] });
        router.navigate({ to: "/test/$attemptId", params: { attemptId: id } });
      }
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
    <AdvancedShell
      title="Custom Practice"
      subtitle="Pick exactly what you want to practise. Questions from completed tests are excluded automatically."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4 rounded-2xl border bg-card p-5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Source
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {SOURCES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setF((p) => ({ ...p, source: s.key }))}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs",
                    f.source === s.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <Chips
            label="Paper"
            values={[1, 2]}
            selected={f.papers ?? []}
            onToggle={(v) => toggle("papers", v)}
            render={(v) => `Paper ${v}`}
          />
          <Chips
            label="Subject"
            values={idx?.subjects ?? []}
            selected={f.subjects ?? []}
            onToggle={(v) => toggle("subjects", v)}
          />
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Chapter
            </div>
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
              <input
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                placeholder="Search chapter..."
                className="w-full rounded-lg border bg-surface py-2 pr-3 pl-9 text-sm"
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">{f.chapters?.length ?? 0} selected</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="font-semibold text-primary hover:underline"
                  onClick={() => {
                    for (const chapter of visibleChapters) {
                      if (!(f.chapters ?? []).includes(chapter)) toggle("chapters", chapter);
                    }
                  }}
                >
                  select all
                </button>
                <button
                  type="button"
                  className="text-muted-foreground hover:underline"
                  onClick={() => setF((prev) => ({ ...prev, chapters: undefined }))}
                >
                  clear
                </button>
              </div>
            </div>
            <div className="scroll-slim mt-1.5 max-h-64 space-y-1 overflow-auto rounded-lg border bg-surface p-2">
              {visibleChapters.length === 0 ? (
                <p className="p-2 text-xs text-muted-foreground">No chapters found</p>
              ) : (
                visibleChapters.map((chapter) => {
                  const selected = (f.chapters ?? []).includes(chapter);
                  return (
                    <label
                      key={chapter}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                        selected && "bg-primary/10",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggle("chapters", chapter)}
                      />
                      <span className="truncate">{chapter}</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>
          <Chips
            label="Topic"
            values={(idx?.topics ?? []).slice(0, 60)}
            selected={f.topics ?? []}
            onToggle={(v) => toggle("topics", v)}
          />
          <Chips
            label="Difficulty"
            values={["Easy", "Medium", "Hard"] as Difficulty[]}
            selected={f.difficulties ?? []}
            onToggle={(v) => toggle("difficulties", v)}
          />
          <Chips
            label="Question type"
            values={(idx?.types ?? []) as QuestionType[]}
            selected={f.types ?? []}
            onToggle={(v) => toggle("types", v)}
            render={(v) => QUESTION_TYPE_LABEL[v]}
          />
          <Chips
            label="Year"
            values={idx?.years ?? []}
            selected={f.years ?? []}
            onToggle={(v) => toggle("years", v)}
          />
        </div>

        <div className="h-fit space-y-3 rounded-2xl border bg-card p-5 lg:sticky lg:top-4">
          <div className="text-sm">
            <span className="text-2xl font-bold">{available.length}</span>{" "}
            <span className="text-muted-foreground">questions available</span>
          </div>
          <label className="block text-xs font-semibold uppercase text-muted-foreground">
            Questions
            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
            />
          </label>
          <label className="block text-xs font-semibold uppercase text-muted-foreground">
            Duration (min)
            <input
              type="number"
              min={1}
              value={minutes}
              onChange={(e) => setMinutes(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={allowRepeat}
              onChange={(e) => setAllowRepeat(e.target.checked)}
            />
            Allow repeats
          </label>
          <button
            onClick={launch}
            disabled={start.isPending}
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            Generate test
          </button>
          <button
            onClick={() => setF({ source: "all" })}
            className="w-full rounded-lg border px-4 py-2 text-xs font-semibold"
          >
            Reset filters
          </button>
        </div>
      </div>

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />
    </AdvancedShell>
  );
}
