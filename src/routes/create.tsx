import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ShieldCheck, Shuffle, Sliders, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { listTests } from "@/lib/db";
import { startAttempt } from "@/lib/attempt";
import { prepareStartMode } from "@/lib/start-mode";
import { createLiveTestDraft } from "@/lib/live-tests";
import { orderQuestionsBySubject } from "@/lib/question-order";
import {
  autoDistribute,
  bankItems,
  buildFromPlan,
  chapterTree,
  currentUsage,
  eligibleItems,
  filterItems,
  questionHistory,
  smartPick,
  validBankItems,
  validationBySubject,
  weakSourcePool,
  type BankItem,
  type WeakSource,
} from "@/lib/bank";

import {
  EXAM_LABEL,
  QUESTION_TYPE_LABEL,
  type Difficulty,
  type ExamKind,
  type QuestionType,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create")({
  validateSearch: (search: Record<string, unknown>) => ({
    creationContext: search.creationContext === "live" ? "live" : "normal",
  }),
  head: () => ({
    meta: [
      { title: "Custom Test Builder — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Build custom JEE papers from any mix of chapters with auto or manual question distribution, difficulty and type filters.",
      },
      { property: "og:title", content: "Custom Test Builder — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Chapter-mix papers with a smart random engine that avoids repeating questions.",
      },
    ],
  }),
  component: CreatePage,
});

const PRESETS = [
  { key: "main", label: "JEE Main", minutes: 180, marks: 4, negative: 1, count: 75 },
  { key: "adv1", label: "JEE Advanced Paper 1", minutes: 180, marks: 4, negative: 2, count: 54 },
  { key: "adv2", label: "JEE Advanced Paper 2", minutes: 180, marks: 4, negative: 2, count: 54 },
  {
    key: "advfull",
    label: "Full Advanced (P1 + break + P2)",
    minutes: 420,
    marks: 4,
    negative: 2,
    count: 108,
  },
] as const;

const WEAK_SOURCES: { key: WeakSource; label: string; desc: string }[] = [
  { key: "wrong", label: "Wrong questions", desc: "Everything you answered incorrectly" },
  { key: "weak", label: "Weak chapters", desc: "Chapters below 60% accuracy" },
  { key: "bookmarked", label: "Bookmarked", desc: "Questions you flagged" },
  { key: "unattempted", label: "Not attempted", desc: "Never answered before" },
];

const DIFFS: Difficulty[] = ["Easy", "Medium", "Hard"];

function CreatePage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { creationContext } = Route.useSearch();
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const history = useQuery({
    queryKey: ["bank", "history"],
    queryFn: questionHistory,
    staleTime: 0,
  });
  const mastered = history.data?.mastered;

  const [mode, setMode] = useState<"bank" | WeakSource>("bank");
  const [exam, setExam] = useState<ExamKind | "both">("both");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [chapterKeys, setChapterKeys] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [types, setTypes] = useState<QuestionType[]>([]);
  const [search, setSearch] = useState("");
  const [pyqOnly, setPyqOnly] = useState(false);
  const [count, setCount] = useState(30);
  const [manual, setManual] = useState(false);
  const [quota, setQuota] = useState<Record<string, number>>({});
  const [marks, setMarks] = useState(4);
  const [negative, setNegative] = useState(1);
  const [hours, setHours] = useState(3);
  const [minutes, setMinutes] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("Custom Test");
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const libraryItems = useMemo(
    () =>
      filterItems(bankItems(tests.data ?? []), {
        exams: exam === "both" ? undefined : [exam],
      }),
    [tests.data, exam],
  );

  /** Total / valid / invalid per subject for the selected library. */
  const validitySummary = useMemo(() => validationBySubject(libraryItems), [libraryItems]);
  const invalidTotal = validitySummary.reduce((a, s) => a + s.invalid, 0);

  const items = useMemo(
    () => eligibleItems(validBankItems(libraryItems), mastered ?? new Set<string>()),
    [libraryItems, mastered],
  );

  const tree = useMemo(() => chapterTree(items), [items]);

  const [weakPool, setWeakPool] = useState<BankItem[]>([]);
  useEffect(() => {
    if (mode === "bank") return;
    let alive = true;
    void weakSourcePool(mode).then((pool) => {
      if (alive) setWeakPool(eligibleItems(validBankItems(pool), mastered ?? new Set<string>()));
    });

    return () => {
      alive = false;
    };
  }, [mode, mastered]);

  const visibleChapters = useMemo(
    () => {
      const selected = new Set(chapterKeys);
      return tree
        .filter((s) => subjects.length === 0 || subjects.includes(s.subject))
        .flatMap((s) => s.chapters)
        .filter((c) => {
          if (selected.has(c.key)) return true;
          return filterItems(c.items, { search, topics, difficulties, types, pyqOnly }).length > 0;
        });
    },
    [tree, subjects, chapterKeys, search, topics, difficulties, types, pyqOnly],
  );

  const topicOptions = useMemo(() => {
    const set = new Set<string>();
    for (const c of visibleChapters)
      if (chapterKeys.length === 0 || chapterKeys.includes(c.key))
        c.topics.forEach((t) => set.add(t));
    return [...set].sort();
  }, [visibleChapters, chapterKeys]);

  const groups = useMemo(() => {
    const selected = visibleChapters.filter(
      (c) => chapterKeys.length === 0 || chapterKeys.includes(c.key),
    );
    return selected
      .map((c) => ({
        key: c.key,
        subject: c.subject,
        chapter: c.chapter,
        items: filterItems(c.items, { search, topics, difficulties, types, pyqOnly }),
      }))
      .filter((g) => g.items.length > 0);
  }, [visibleChapters, chapterKeys, search, topics, difficulties, types, pyqOnly]);

  const pool = useMemo(
    () =>
      mode === "bank"
        ? groups.flatMap((g) => g.items)
        : filterItems(weakPool, { search, subjects, difficulties, types, pyqOnly }),
    [mode, groups, weakPool, search, subjects, difficulties, types, pyqOnly],
  );

  const autoPlan = useMemo(
    () =>
      autoDistribute(
        groups.map((g) => ({ key: g.key, available: g.items.length })),
        count,
      ),
    [groups, count],
  );

  const manualTotal = groups.reduce((a, g) => a + (quota[g.key] ?? 0), 0);
  const willUse = mode === "bank" && manual ? manualTotal : Math.min(count, pool.length);

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setHours(Math.floor(p.minutes / 60));
    setMinutes(p.minutes % 60);
    setMarks(p.marks);
    setNegative(p.negative);
    setCount(p.count);
    setName(p.label);
  };

  const build = async () => {
    const duration = hours * 60 + minutes;
    if (pool.length === 0) return toast.error("No questions match this selection.");

    const usage = await currentUsage();
    let chosen: BankItem[];
    if (mode === "bank" && groups.length > 0) {
      const plan = manual
        ? new Map(groups.map((g) => [g.key, Math.min(quota[g.key] ?? 0, g.items.length)]))
        : autoPlan;
      chosen = buildFromPlan(groups, plan, usage);
    } else {
      chosen = smartPick(pool, count, usage);
    }
    const unique: BankItem[] = [];
    const seen = new Set<string>();
    for (const it of chosen) {
      if (seen.has(it.q.id)) continue;
      seen.add(it.q.id);
      unique.push(it);
    }
    if (unique.length === 0) return toast.error("Distribution produced zero questions.");

    const picked = orderQuestionsBySubject(unique.map((it) => ({ ...it.q, marks, negative })));
    const base = (tests.data ?? [])[0];
    if (!base) return toast.error("Import a question set first.");

    if (creationContext === "live") {
      const draft = createLiveTestDraft(
        picked,
        name || "Live Test Draft",
        exam === "both" ? "JEE Main" : EXAM_LABEL[exam],
      );
      router.navigate({ to: "/live-tests", search: { draft: draft.id } });
      toast.success("Live Test Preview opened");
      return;
    }

    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const attempt = await startAttempt(
        { ...base, name, questions: picked, questionCount: picked.length, durationMin: duration },
        {
          questions: picked,
          durationMin: duration,
          name,
          mode: selectedMode,
          strictMode: selectedMode === "strict",
        },
      );
      qc.invalidateQueries({ queryKey: ["attempts"] });
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

  if (!tests.isLoading && (tests.data?.length ?? 0) === 0) {
    return (
      <AppShell>
        <h1 className="text-2xl font-bold">Custom Test Builder</h1>
        <p className="mt-4 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Import at least one question set first — the builder draws from your chapter library.
        </p>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Sliders className="size-5" /> Custom Test Builder
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Mix any chapters, pick how many questions you want, and the smart random engine builds the
        paper — no duplicates, least-used questions first.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            onClick={() => applyPreset(p)}
            className="rounded-lg border bg-card px-3 py-2 text-xs font-semibold hover:border-primary"
          >
            {p.label}
            <span className="ml-2 text-muted-foreground">{p.minutes} min</span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Library</div>
        <div className="flex flex-wrap gap-2">
          {(["main", "advanced", "both"] as const).map((k) => (
            <Chip
              key={k}
              active={exam === k}
              onClick={() => {
                setExam(k);
                setChapterKeys([]);
              }}
            >
              {k === "both" ? "Main + Advanced" : EXAM_LABEL[k]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip active={mode === "bank"} onClick={() => setMode("bank")}>
          Chapter mix
        </Chip>
        {WEAK_SOURCES.map((w) => (
          <Chip key={w.key} active={mode === w.key} onClick={() => setMode(w.key)} title={w.desc}>
            {w.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-xl border bg-card p-4">
          <Field label="Test name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
            />
          </Field>

          <div>
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Filters</span>
              <button
                type="button"
                onClick={() => {
                  if (searchOpen && !search.trim()) {
                    setSearchOpen(false);
                    return;
                  }
                  setSearchOpen((prev) => !prev);
                  if (!searchOpen) {
                    requestAnimationFrame(() => searchInputRef.current?.focus());
                  }
                }}
                className="inline-flex items-center gap-1 rounded-md border bg-surface px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                aria-label={searchOpen ? "Close search" : "Open search"}
                title={searchOpen ? "Close search" : "Open search"}
              >
                <Search className="size-3.5" />
                <span>Search</span>
              </button>
            </div>

            {searchOpen && (
              <div className="relative overflow-hidden rounded-lg border bg-surface transition-all duration-200 ease-out animate-in fade-in">
                <input
                  ref={searchInputRef}
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full rounded-lg border-0 bg-transparent py-2 pr-9 pl-3 text-sm outline-none ring-0"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchOpen(false);
                    searchInputRef.current?.blur();
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border bg-background p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Clear and close search"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )}

            {!searchOpen && search.trim() && (
              <div className="mt-2 text-[11px] text-muted-foreground">
                {pool.length} matching question{pool.length === 1 ? "" : "s"}
              </div>
            )}

            {searchOpen && (
              <div className="mt-2 text-[11px] text-muted-foreground">
                {search.trim()
                  ? `${pool.length} matching question${pool.length === 1 ? "" : "s"}`
                  : "Search by question text, ID, chapter, topic, subject or tags"}
              </div>
            )}
          </div>

          <Multi
            label="Subject"
            options={tree.map((s) => s.subject)}
            values={subjects}
            onToggle={(v) => {
              setSubjects((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
              setChapterKeys([]);
            }}
          />

          {mode === "bank" && (
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Chapters ({chapterKeys.length || "all"})
                </span>
                <div className="flex gap-2 text-[11px]">
                  <button
                    className="underline"
                    onClick={() => setChapterKeys(visibleChapters.map((c) => c.key))}
                  >
                    select all
                  </button>
                  <button className="underline" onClick={() => setChapterKeys([])}>
                    clear
                  </button>
                </div>
              </div>
              <div className="scroll-slim max-h-64 space-y-1 overflow-auto rounded-lg border bg-surface p-2">
                {visibleChapters.map((c) => {
                  const on = chapterKeys.includes(c.key);
                  return (
                    <label
                      key={c.key}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                        on && "bg-primary/10",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setChapterKeys((s) => (on ? s.filter((x) => x !== c.key) : [...s, c.key]))
                        }
                      />
                      <span className="min-w-0 flex-1 truncate">
                        <span className="text-[11px] font-semibold uppercase text-primary">
                          {c.subject.slice(0, 4)}
                        </span>{" "}
                        {c.chapter}
                      </span>
                      <span className="text-xs text-muted-foreground">{c.total}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {topicOptions.length > 0 && (
            <Multi
              label="Topic"
              options={topicOptions}
              values={topics}
              onToggle={(v) =>
                setTopics((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]))
              }
            />
          )}

          <Multi
            label="Difficulty"
            options={DIFFS}
            values={difficulties}
            onToggle={(v) =>
              setDifficulties((s) =>
                s.includes(v as Difficulty) ? s.filter((x) => x !== v) : [...s, v as Difficulty],
              )
            }
          />

          <Multi
            label="Question type"
            options={Object.keys(QUESTION_TYPE_LABEL).map(
              (k) => QUESTION_TYPE_LABEL[k as QuestionType],
            )}
            values={types.map((t) => QUESTION_TYPE_LABEL[t])}
            onToggle={(label) => {
              const key = (Object.keys(QUESTION_TYPE_LABEL) as QuestionType[]).find(
                (k) => QUESTION_TYPE_LABEL[k] === label,
              )!;
              setTypes((s) => (s.includes(key) ? s.filter((x) => x !== key) : [...s, key]));
            }}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={pyqOnly}
              onChange={(e) => setPyqOnly(e.target.checked)}
            />
            Previous year questions only
          </label>
        </div>

        <div className="space-y-4 rounded-xl border bg-card p-4">
          <div className="rounded-lg bg-surface p-3 text-sm">
            <span className="font-semibold text-primary">{pool.length}</span> valid questions
            available · using <span className="font-semibold">{willUse}</span>
          </div>

          <div className="rounded-lg border bg-surface p-3 text-xs">
            <div className="mb-1.5 flex items-center gap-1.5 font-semibold uppercase text-muted-foreground">
              <ShieldCheck className="size-3.5" /> Validation
            </div>
            {validitySummary.length === 0 ? (
              <p className="text-muted-foreground">No questions in this library.</p>
            ) : (
              <ul className="space-y-1">
                {validitySummary.map((s) => (
                  <li key={s.subject} className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate">{s.subject}</span>
                    <span className="text-muted-foreground">Total {s.total}</span>
                    <span className="font-semibold text-success">Valid {s.valid}</span>
                    <span
                      className={cn(
                        "font-semibold",
                        s.invalid ? "text-destructive" : "text-muted-foreground",
                      )}
                    >
                      Invalid {s.invalid}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {invalidTotal > 0
                ? `${invalidTotal} invalid question(s) are excluded automatically — open the Question Bank to see why.`
                : "All questions passed validation."}
            </p>
          </div>

          <Field label="Question count">
            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
            />
          </Field>
          <div className="flex flex-wrap gap-1.5">
            {[10, 20, 30, 50, 75, 90, 100, 200, 500].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={cn(
                  "rounded-md border px-2 py-1 text-xs",
                  count === n ? "border-primary bg-primary text-primary-foreground" : "bg-surface",
                )}
              >
                {n}
              </button>
            ))}
          </div>

          {mode === "bank" && groups.length > 0 && (
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={manual}
                  onChange={(e) => setManual(e.target.checked)}
                />
                Manual distribution
              </label>
              <div className="scroll-slim mt-2 max-h-56 space-y-1 overflow-auto rounded-lg border bg-surface p-2 text-xs">
                {groups.map((g) => (
                  <div key={g.key} className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate">{g.chapter}</span>
                    {manual ? (
                      <input
                        type="number"
                        min={0}
                        max={g.items.length}
                        value={quota[g.key] ?? 0}
                        onChange={(e) =>
                          setQuota((s) => ({
                            ...s,
                            [g.key]: Math.max(0, Math.min(g.items.length, Number(e.target.value))),
                          }))
                        }
                        className="w-16 rounded border bg-card px-2 py-1 text-right"
                      />
                    ) : (
                      <span className="w-16 text-right font-semibold">
                        {autoPlan.get(g.key) ?? 0}
                      </span>
                    )}
                    <span className="w-10 text-right text-muted-foreground">/{g.items.length}</span>
                  </div>
                ))}
              </div>
              {manual && (
                <div className="mt-1 text-right text-xs text-muted-foreground">
                  Total: <span className="font-semibold text-foreground">{manualTotal}</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Marks / correct">
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Negative marks">
              <input
                type="number"
                value={negative}
                onChange={(e) => setNegative(Number(e.target.value))}
                className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Hours">
              <input
                type="number"
                min={0}
                value={hours}
                onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Minutes">
              <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
                className="w-full rounded-lg border bg-surface px-3 py-2 text-sm"
              />
            </Field>
          </div>

          <button
            onClick={build}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Shuffle className="size-4" /> Generate &amp; start test
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
    </AppShell>
  );
}

function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-semibold",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card hover:border-primary",
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Multi({
  label,
  options,
  values,
  onToggle,
}: {
  label: string;
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={cn(
              "max-w-full truncate rounded-full border px-2.5 py-1 text-xs transition-colors",
              values.includes(o)
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-surface hover:bg-accent",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
