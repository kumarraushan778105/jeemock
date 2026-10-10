import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import {
  advancedContext,
  arrangeBySubject,
  buildIndex,
  customPyqSelection,
  pickQuestions,
  type CustomPyqFilters,
  type PaperNo,
} from "@/lib/advanced";
import { startAdvancedTest } from "@/lib/advanced-start";
import { prepareStartMode } from "@/lib/start-mode";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advanced/pyq")({
  head: () => ({
    meta: [
      { title: "JEE Advanced PYQ — Year-wise Previous Year Papers" },
      {
        name: "description",
        content:
          "Practise JEE Advanced previous year questions year-wise and paper-wise, or attempt a full past paper in exam mode.",
      },
      { property: "og:title", content: "JEE Advanced PYQ — Year-wise Previous Year Papers" },
      {
        property: "og:description",
        content: "Year-wise and paper-wise Advanced PYQ practice with full-paper exam mode.",
      },
    ],
  }),
  component: AdvancedPyq,
});

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

function AdvancedPyq() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["adv", "ctx"], queryFn: advancedContext });
  const [year, setYear] = useState<number | null>(null);
  const [paper, setPaper] = useState<PaperNo | null>(null);
  const [chapterSearch, setChapterSearch] = useState("");
  const [customFilters, setCustomFilters] = useState<CustomPyqFilters>({});
  const [customCount, setCustomCount] = useState(30);
  const [customMinutes, setCustomMinutes] = useState(60);
  const [customAllowRepeat, setCustomAllowRepeat] = useState(false);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const pyq = useMemo(
    () =>
      (data?.pyq ?? data?.pool ?? []).filter((i) => i.q.pyq || i.year || /pyq/i.test(i.test.name)),
    [data],
  );

  const pyqIndex = useMemo(() => buildIndex(pyq), [pyq]);

  const years = useMemo(
    () =>
      [...new Set(pyq.map((i) => i.year).filter((y): y is number => Boolean(y)))].sort(
        (a, b) => b - a,
      ),
    [pyq],
  );

  const scoped = useMemo(
    () => pyq.filter((i) => (year ? i.year === year : true) && (paper ? i.paper === paper : true)),
    [pyq, year, paper],
  );

  const toggleCustomFilter = <K extends keyof CustomPyqFilters>(key: K, v: unknown) => {
    setCustomFilters((prev) => {
      const cur = ((prev[key] as unknown[]) ?? []).slice();
      const i = cur.indexOf(v);
      if (i === -1) cur.push(v);
      else cur.splice(i, 1);
      return { ...prev, [key]: cur } as CustomPyqFilters;
    });
  };

  const customMatched = useMemo(() => customPyqSelection(pyq, customFilters), [pyq, customFilters]);

  const customAvailable = useMemo(
    () =>
      customAllowRepeat
        ? customMatched
        : customMatched.filter((i) => !data?.history.used.has(i.q.id)),
    [customMatched, customAllowRepeat, data],
  );

  const visibleChapters = useMemo(() => {
    const term = chapterSearch.trim().toLowerCase();
    return pyqIndex.chapters.filter((chapter) => chapter.toLowerCase().includes(term));
  }, [pyqIndex.chapters, chapterSearch]);

  const byYear = useMemo(() => {
    const m = new Map<number, { p1: number; p2: number; total: number }>();
    for (const i of pyq) {
      if (!i.year) continue;
      const row = m.get(i.year) ?? { p1: 0, p2: 0, total: 0 };
      row.total += 1;
      if (i.paper === 2) row.p2 += 1;
      else row.p1 += 1;
      m.set(i.year, row);
    }
    return [...m.entries()].sort((a, b) => b[0] - a[0]);
  }, [pyq]);

  const start = useMutation({
    mutationFn: async (opts: { full: boolean; count?: number; strictMode?: boolean }) => {
      const questions = opts.full
        ? arrangeBySubject(scoped.map((i) => i.q))
        : pickQuestions(scoped, { count: opts.count ?? 30, allowRepeat: true });
      if (questions.length === 0) throw new Error("No PYQ questions for this selection.");
      const att = await startAdvancedTest({
        name: `JEE Advanced PYQ ${year ?? "All years"}${paper ? ` Paper ${paper}` : ""}`,
        questions,
        durationMin: opts.full ? 180 : 60,
        paper: paper ?? undefined,
        strictMode: opts.strictMode,
      });
      return att.id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const customStart = useMutation({
    mutationFn: async (opts?: { strictMode?: boolean }) => {
      const questions = pickQuestions(customMatched, {
        count: customCount,
        allowRepeat: customAllowRepeat,
        used: data?.history.used,
      });
      if (questions.length === 0) throw new Error("No PYQ questions match these filters.");
      const att = await startAdvancedTest({
        name: "JEE Advanced Custom PYQ Test",
        questions,
        durationMin: customMinutes,
        paper:
          customFilters.papers && customFilters.papers.length === 1
            ? customFilters.papers[0]
            : undefined,
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

  const launch = async (opts: { full: boolean; count?: number }) => {
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const id = await start.mutateAsync({
        ...opts,
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

  const launchCustom = async () => {
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const id = await customStart.mutateAsync({
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
      title="Previous Year Questions"
      subtitle="Browse Advanced PYQs year-wise and paper-wise, then attempt a full past paper or a quick set."
    >
      {pyq.length === 0 && (
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
          No PYQ questions found yet. Import an Advanced set whose name contains the year (e.g. "JEE
          Advanced 2022 Paper 1") or whose questions are tagged as PYQ.
        </div>
      )}

      {pyq.length > 0 && (
        <>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setYear(null)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs",
                year === null ? "border-primary bg-primary text-primary-foreground" : "bg-card",
              )}
            >
              All years
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs",
                  year === y ? "border-primary bg-primary text-primary-foreground" : "bg-card",
                )}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {([null, 1, 2] as const).map((p) => (
              <button
                key={String(p)}
                onClick={() => setPaper(p)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs",
                  paper === p ? "border-primary bg-primary text-primary-foreground" : "bg-card",
                )}
              >
                {p === null ? "Both papers" : `Paper ${p}`}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-5">
            <div className="text-sm">
              <span className="text-2xl font-bold">{scoped.length}</span>{" "}
              <span className="text-muted-foreground">questions selected</span>
            </div>
            <button
              onClick={() => launch({ full: true })}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Attempt full paper (180 min)
            </button>
            <button
              onClick={() => launch({ full: false, count: 30 })}
              className="rounded-lg border px-4 py-2 text-sm font-semibold"
            >
              Quick 30-question set
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
            <div className="space-y-4 rounded-2xl border bg-card p-5">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Paper
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setCustomFilters((prev) => ({ ...prev, papers: undefined }))}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs",
                      !customFilters.papers?.length
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background",
                    )}
                  >
                    Both papers
                  </button>
                  {[1, 2].map((v) => (
                    <button
                      key={v}
                      onClick={() => toggleCustomFilter("papers", v)}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs",
                        (customFilters.papers ?? []).includes(v)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background",
                      )}
                    >
                      {`Paper ${v}`}
                    </button>
                  ))}
                </div>
              </div>
              <Chips
                label="Subject"
                values={pyqIndex.subjects}
                selected={customFilters.subjects ?? []}
                onToggle={(v) => toggleCustomFilter("subjects", v)}
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
                  <span className="text-muted-foreground">
                    {customFilters.chapters?.length ?? 0} selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="font-semibold text-primary hover:underline"
                      onClick={() => {
                        for (const chapter of visibleChapters) {
                          if (!(customFilters.chapters ?? []).includes(chapter)) {
                            toggleCustomFilter("chapters", chapter);
                          }
                        }
                      }}
                    >
                      select all
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground hover:underline"
                      onClick={() => setCustomFilters((prev) => ({ ...prev, chapters: undefined }))}
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
                      const selected = (customFilters.chapters ?? []).includes(chapter);
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
                            onChange={() => toggleCustomFilter("chapters", chapter)}
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
                values={(pyqIndex.topics ?? []).slice(0, 60)}
                selected={customFilters.topics ?? []}
                onToggle={(v) => toggleCustomFilter("topics", v)}
              />
              <Chips
                label="Year"
                values={pyqIndex.years}
                selected={customFilters.years ?? []}
                onToggle={(v) => toggleCustomFilter("years", v)}
              />
            </div>

            <div className="h-fit space-y-3 rounded-2xl border bg-card p-5 lg:sticky lg:top-4">
              <div className="text-sm">
                <span className="text-2xl font-bold">{customAvailable.length}</span>{" "}
                <span className="text-muted-foreground">questions available</span>
              </div>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Questions
                <input
                  type="number"
                  min={1}
                  value={customCount}
                  onChange={(e) => setCustomCount(Math.max(1, Number(e.target.value) || 1))}
                  className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
                />
              </label>
              <label className="block text-xs font-semibold uppercase text-muted-foreground">
                Duration (min)
                <input
                  type="number"
                  min={1}
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(1, Number(e.target.value) || 1))}
                  className="mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
                />
              </label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={customAllowRepeat}
                  onChange={(e) => setCustomAllowRepeat(e.target.checked)}
                />
                Allow repeats
              </label>
              <button
                onClick={launchCustom}
                disabled={customStart.isPending}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                Create Custom PYQ Test
              </button>
              <button
                onClick={() => {
                  setCustomFilters({});
                  setCustomCount(30);
                  setCustomMinutes(60);
                  setCustomAllowRepeat(false);
                }}
                className="w-full rounded-lg border px-4 py-2 text-xs font-semibold"
              >
                Reset filters
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {byYear.map(([y, row]) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className="rounded-xl border bg-card p-4 text-left hover:bg-accent"
              >
                <div className="text-lg font-bold">{y}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {row.total} questions · Paper 1: {row.p1} · Paper 2: {row.p2}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

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
