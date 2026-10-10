import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, CircleSlash, Clock, Target, XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { QuestionView } from "@/components/QuestionView";
import { getAttempt, getTest } from "@/lib/db";
import { formatClock, scoreAttempt } from "@/lib/scoring";
import type { Question, TestSet } from "@/lib/types";
import { xpForResultAttempt } from "@/lib/xp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/result/$attemptId")({
  head: () => ({
    meta: [
      { title: "Attempt analysis — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Detailed JEE mock analysis: score, accuracy, negative marking, subject and chapter breakdown, time per question and full solutions.",
      },
      { property: "og:title", content: "Attempt analysis — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Score, accuracy, timing and solution review for your attempt.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

type Filter = "all" | "correct" | "wrong" | "skipped" | "marked" | "bookmarked";

function ResultPage() {
  const { attemptId } = Route.useParams();
  const [filter, setFilter] = useState<Filter>("all");

  const q = useQuery({
    queryKey: ["result", attemptId],
    queryFn: async () => {
      const attempt = await getAttempt(attemptId);
      if (!attempt) throw new Error("Attempt not found");
      const test = await getTest(attempt.testId);
      const questions: Question[] =
        attempt.questionsSnapshot ??
        attempt.questionIds
          .map((id) => test?.questions.find((x) => x.id === id))
          .filter((x): x is Question => Boolean(x));
      const virtual = { ...(test ?? {}), questions } as TestSet;
      return { attempt, summary: scoreAttempt(virtual, attempt) };
    },
    retry: false,
  });

  const rows = useMemo(() => {
    const per = q.data?.summary.perQuestion ?? [];
    return per.filter((r) => {
      if (filter === "all") return true;
      if (filter === "marked") return r.answer?.marked;
      if (filter === "bookmarked") return r.answer?.bookmarked;
      return r.status === filter;
    });
  }, [q.data, filter]);

  if (q.isLoading)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Loading analysis…</p>
      </AppShell>
    );
  if (q.error || !q.data)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">
          {(q.error as Error)?.message ?? "Not found"}
        </p>
        <Link to="/results" className="mt-3 inline-block text-sm text-primary underline">
          Back to results
        </Link>
      </AppShell>
    );

  const { attempt, summary } = q.data;
  const pct = summary.maxScore ? (summary.score / summary.maxScore) * 100 : 0;
  const xpEarned = xpForResultAttempt(attempt, q.data.summary.perQuestion.map((r) => r.question));

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight">{attempt.testName}</h1>
          <p className="text-xs text-muted-foreground">
            Submitted {new Date(attempt.submittedAt ?? attempt.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/review/$attemptId"
            params={{ attemptId }}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Full Test Review
          </Link>
          <Link to="/results" className="rounded-lg border px-3 py-1.5 text-xs font-medium">
            All results
          </Link>
        </div>
      </div>

      {/* score hero */}
      <div className="mt-5 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="text-center">
          <div className="text-5xl font-black tabular-nums">
            {summary.score}
            <span className="text-xl text-muted-foreground">/{summary.maxScore}</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{pct.toFixed(1)}% of maximum</div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            icon={<CheckCircle2 className="size-4 text-success" />}
            label="Correct"
            value={summary.correct}
          />
          <Stat
            icon={<XCircle className="size-4 text-destructive" />}
            label="Wrong"
            value={summary.wrong}
          />
          <Stat
            icon={<CircleSlash className="size-4 text-muted-foreground" />}
            label="Skipped"
            value={summary.skipped}
          />
          <Stat
            icon={<Target className="size-4 text-primary" />}
            label="Accuracy"
            value={`${summary.accuracy.toFixed(1)}%`}
          />
          <Stat
            icon={<Target className="size-4 text-primary" />}
            label="XP Earned"
            value={`+${xpEarned} XP`}
          />
          <Stat
            icon={<Clock className="size-4" />}
            label="Time used"
            value={formatClock(summary.timeSpent)}
          />
          <Stat label="Negative" value={summary.negative} />
          <Stat
            label="Avg / question"
            value={formatClock(
              summary.perQuestion.length ? summary.timeSpent / summary.perQuestion.length : 0,
            )}
          />
          <Stat label="Attempted" value={summary.correct + summary.wrong} />
        </div>
        {attempt.proctor &&
          attempt.proctor.tabSwitches + attempt.proctor.fullscreenExits + attempt.proctor.blurs >
            0 && (
            <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              Exam integrity: {attempt.proctor.tabSwitches} tab switch(es) ·{" "}
              {attempt.proctor.fullscreenExits} fullscreen exit(s) · {attempt.proctor.blurs} focus
              loss(es) recorded during this attempt.
            </p>
          )}
      </div>

      {/* breakdowns */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Breakdown title="Subject-wise" rows={summary.bySubject} />
        <Breakdown title="Chapter-wise (strong vs weak)" rows={summary.byChapter} />
      </div>

      {/* review */}
      <h2 className="mt-8 text-lg font-bold">Question review</h2>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(["all", "correct", "wrong", "skipped", "marked", "bookmarked"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs capitalize",
              filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground">No questions in this filter.</p>
        )}
        {rows.map((r, i) => (
          <div key={r.question.id} className="rounded-2xl border bg-card p-4 sm:p-5">
            <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <div className="truncate text-xs font-semibold text-muted-foreground">
                Q{r.question.number || i + 1} · {formatClock(r.answer?.timeSpent ?? 0)} spent
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-bold capitalize",
                  r.status === "correct" && "bg-answered text-answered-foreground",
                  r.status === "wrong" && "bg-notanswered text-notanswered-foreground",
                  r.status === "skipped" && "bg-notvisited text-notvisited-foreground",
                )}
              >
                {r.status} {r.score > 0 ? `+${r.score}` : r.score}
              </span>
            </div>
            <QuestionView
              question={r.question}
              value={r.answer?.value ?? null}
              readOnly
              showAnswer
            />
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border bg-surface p-3">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 text-lg font-bold tabular-nums">{value}</div>
    </div>
  );
}

function Breakdown({
  title,
  rows,
}: {
  title: string;
  rows: {
    name: string;
    correct: number;
    wrong: number;
    skipped: number;
    score: number;
    total: number;
    time: number;
  }[];
}) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <h3 className="text-sm font-bold">{title}</h3>
      <div className="mt-3 space-y-3">
        {rows.map((r) => {
          const attempted = r.correct + r.wrong;
          const acc = attempted ? (r.correct / attempted) * 100 : 0;
          return (
            <div key={r.name}>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-xs">
                <span className="truncate font-medium">{r.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {r.correct}/{r.total} · {acc.toFixed(0)}% · {formatClock(r.time)}
                </span>
              </div>
              <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-muted">
                <div className="bg-answered" style={{ width: `${(r.correct / r.total) * 100}%` }} />
                <div
                  className="bg-notanswered"
                  style={{ width: `${(r.wrong / r.total) * 100}%` }}
                />
                <div
                  className="bg-notvisited"
                  style={{ width: `${(r.skipped / r.total) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
