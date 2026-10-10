import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BarChart3 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { allReports } from "@/lib/stats";
import { formatClock } from "@/lib/scoring";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Performance Analytics — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Subject accuracy, time distribution, weak and strong chapters, difficulty and question-type breakdowns across every attempt.",
      },
      { property: "og:title", content: "Performance Analytics — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Deep analysis of your JEE mock performance across subjects, chapters and time.",
      },
    ],
  }),
  component: AnalyticsPage,
});

interface Bucket {
  name: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  time: number;
  score: number;
}

function makeBucket(name: string): Bucket {
  return { name, total: 0, correct: 0, wrong: 0, skipped: 0, time: 0, score: 0 };
}

function AnalyticsPage() {
  const reports = useQuery({ queryKey: ["reports"], queryFn: allReports });

  const data = useMemo(() => {
    const list = reports.data ?? [];
    const group = (key: (q: Question) => string) => {
      const map = new Map<string, Bucket>();
      for (const r of list)
        for (const pq of r.summary.perQuestion) {
          const k = key(pq.question) || "General";
          const b = map.get(k) ?? makeBucket(k);
          b.total += 1;
          b.score += pq.score;
          b.time += pq.answer?.timeSpent ?? 0;
          b[pq.status] += 1;
          map.set(k, b);
        }
      return [...map.values()];
    };

    const flat = list.flatMap((r) => r.summary.perQuestion);
    const answered = flat.filter((p) => p.status !== "skipped");
    const timed = answered.filter((p) => (p.answer?.timeSpent ?? 0) > 0);
    const sortedByTime = [...timed].sort(
      (a, b) => (a.answer?.timeSpent ?? 0) - (b.answer?.timeSpent ?? 0),
    );

    const daily = new Map<string, { day: string; score: number; tests: number; accuracy: number }>();
    for (const r of list) {
      const day = new Date(r.attempt.submittedAt ?? r.attempt.updatedAt).toISOString().slice(0, 10);
      const cur = daily.get(day) ?? { day, score: 0, tests: 0, accuracy: 0 };
      cur.tests += 1;
      cur.score += r.summary.score;
      cur.accuracy = (cur.accuracy * (cur.tests - 1) + r.summary.accuracy) / cur.tests;
      daily.set(day, cur);
    }

    const chapters = group((q) => q.chapter).filter((b) => b.total >= 2);
    const acc = (b: Bucket) => (b.correct + b.wrong ? (b.correct / (b.correct + b.wrong)) * 100 : 0);

    const wrongEntries = flat.filter((p) => p.status === "wrong");
    const avgWrongTime =
      wrongEntries.length > 0
        ? wrongEntries.reduce((sum, p) => sum + (p.answer?.timeSpent ?? 0), 0) / wrongEntries.length
        : 0;

    const mistakeTypes = new Map<
      string,
      { type: string; count: number; marksLost: number; pct: number }
    >();

    const classifyMistake = (question: Question, timeSpent: number) => {
      const label = `${question.subject} ${question.chapter} ${question.topic} ${question.type}`.toLowerCase();
      if (
        /formula|derivative|integral|differential|matrix|determinant|algebra|equation|complex|vector|probab|trig|geometry/.test(
          label,
        )
      ) {
        return "Formula / concept gap";
      }
      if (question.type === "numerical" || question.type === "integer" || question.type === "matrix") {
        return "Calculation error";
      }
      if (timeSpent > avgWrongTime * 1.5) {
        return "Time pressure / careless";
      }
      if (/bond|reaction|mechanism|electro|organic|thermo|kinetics|current|optics|modern|wave/.test(label)) {
        return "Concept misunderstanding";
      }
      return "Concept gap";
    };

    for (const item of wrongEntries) {
      const type = classifyMistake(item.question, item.answer?.timeSpent ?? 0);
      const current = mistakeTypes.get(type) ?? { type, count: 0, marksLost: 0, pct: 0 };
      current.count += 1;
      current.marksLost += item.question.marks;
      mistakeTypes.set(type, current);
    }

    const mistakeTypeRows = [...mistakeTypes.values()]
      .map((row) => ({ ...row, pct: wrongEntries.length ? (row.count / wrongEntries.length) * 100 : 0 }))
      .sort((a, b) => b.count - a.count || b.marksLost - a.marksLost)
      .slice(0, 5);

    const repeatedQuestions = new Map<
      string,
      { key: string; label: string; subject: string; chapter: string; count: number; attemptId: string }
    >();
    for (const item of wrongEntries) {
      const key = `${item.question.subject}::${item.question.chapter}::${item.question.topic || item.question.id}`;
      const current = repeatedQuestions.get(key) ?? {
        key,
        label: item.question.topic || item.question.chapter,
        subject: item.question.subject,
        chapter: item.question.chapter,
        count: 0,
        attemptId: item.answer ? "" : "",
      };
      current.count += 1;
      repeatedQuestions.set(key, current);
    }

    const repeatedMistakes = [...repeatedQuestions.values()]
      .filter((row) => row.count > 1)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const topicBuckets = new Map<
      string,
      {
        name: string;
        subject: string;
        chapter: string;
        total: number;
        correct: number;
        wrong: number;
        repeated: number;
        time: number;
      }
    >();

    for (const r of list) {
      for (const p of r.summary.perQuestion) {
        const q = p.question;
        const key = q.topic || q.chapter || q.subject;
        const cur = topicBuckets.get(key) ?? {
          name: key,
          subject: q.subject,
          chapter: q.chapter,
          total: 0,
          correct: 0,
          wrong: 0,
          repeated: 0,
          time: 0,
        };
        cur.total += 1;
        cur.time += p.answer?.timeSpent ?? 0;
        if (p.status === "correct") cur.correct += 1;
        if (p.status === "wrong") cur.wrong += 1;
        topicBuckets.set(key, cur);
      }
    }

    for (const item of repeatedMistakes) {
      const found = [...topicBuckets.values()].find((t) => t.name === item.label);
      if (found) found.repeated = item.count;
    }

    const weakestTopics = [...topicBuckets.values()]
      .filter((b) => b.total >= 2)
      .map((b) => {
        const accuracy = b.total ? (b.correct / b.total) * 100 : 0;
        const repeatedPenalty = Math.min(35, (b.repeated || 0) * 12);
        const wrongPenalty = Math.min(45, b.wrong * 9);
        const totalPenalty = Math.max(0, 100 - accuracy) + wrongPenalty + repeatedPenalty;
        let priority: "Critical" | "High" | "Medium" | "Low" = "Low";
        if (accuracy < 35 || b.wrong >= 5 || (b.repeated || 0) >= 3) priority = "Critical";
        else if (accuracy < 50 || b.wrong >= 3 || (b.repeated || 0) >= 2) priority = "High";
        else if (accuracy < 70 || b.wrong >= 1) priority = "Medium";

        return {
          ...b,
          accuracy,
          score: totalPenalty,
          priority,
        };
      })
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 5);

    const practiceNext = weakestTopics.slice(0, 5).map((topic, idx) => {
      const accuracy = topic.accuracy;
      let priority: "Critical" | "High" | "Medium" | "Low" = "Low";
      let reason = "Your accuracy is improving here — keep reinforcing the fundamentals.";

      if (accuracy < 35 || topic.wrong >= 5 || (topic.repeated || 0) >= 3) {
        priority = "Critical";
        reason = `Very low accuracy and repeated errors in ${topic.name}. Prioritise recall drills and concept review.`;
      } else if (accuracy < 50 || topic.wrong >= 3 || (topic.repeated || 0) >= 2) {
        priority = "High";
        reason = `This topic keeps coming back wrong. Focus on quick revision and error-correction practice.`;
      } else if (accuracy < 70 || topic.wrong >= 1) {
        priority = "Medium";
        reason = `Accuracy is fair but inconsistent. A short focused review should improve consistency.`;
      }

      return {
        id: `${topic.subject}-${topic.chapter}-${topic.name}-${idx}`,
        topic: topic.name,
        subject: topic.subject,
        chapter: topic.chapter,
        reason,
        priority,
      };
    });

    return {
      count: list.length,
      correct: flat.filter((p) => p.status === "correct").length,
      wrong: flat.filter((p) => p.status === "wrong").length,
      skipped: flat.filter((p) => p.status === "skipped").length,
      totalScore: list.reduce((a, r) => a + r.summary.score, 0),
      maxScore: list.reduce((a, r) => a + r.summary.maxScore, 0),
      negative: list.reduce((a, r) => a + r.summary.negative, 0),
      accuracy: answered.length
        ? (flat.filter((p) => p.status === "correct").length / answered.length) * 100
        : 0,
      totalTime: flat.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
      avgTime: timed.length
        ? timed.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0) / timed.length
        : 0,
      fastest: sortedByTime[0],
      slowest: sortedByTime[sortedByTime.length - 1],
      subjects: group((q) => q.subject),
      chaptersWeak: [...chapters].sort((a, b) => acc(a) - acc(b)).slice(0, 6),
      chaptersStrong: [...chapters].sort((a, b) => acc(b) - acc(a)).slice(0, 6),
      topics: group((q) => q.topic).filter((b) => b.name !== "General" && b.total >= 2),
      difficulty: group((q) => q.difficulty),
      types: group((q) => q.type),
      daily: [...daily.values()].sort((a, b) => a.day.localeCompare(b.day)),
      acc,
      mistakeTypeRows,
      repeatedMistakes,
      weakestTopics,
      practiceNext,
      hasDiagnosticData: wrongEntries.length >= 3,
    };
  }, [reports.data]);

  if (reports.isLoading) {
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Crunching your attempts…</p>
      </AppShell>
    );
  }

  if (data.count === 0) {
    return (
      <AppShell>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Submit at least one test to unlock analytics.
        </p>
      </AppShell>
    );
  }

  const acc = data.acc;

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <BarChart3 className="size-5" /> Analytics
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Across {data.count} submitted attempt{data.count === 1 ? "" : "s"}.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total marks" value={`${data.totalScore} / ${data.maxScore}`} />
        <Stat
          label="Percentage"
          value={`${(data.maxScore ? (data.totalScore / data.maxScore) * 100 : 0).toFixed(1)}%`}
        />
        <Stat label="Overall accuracy" value={`${data.accuracy.toFixed(1)}%`} />
        <Stat label="Negative marks" value={String(data.negative)} tone="bad" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Correct" value={String(data.correct)} />
        <Stat label="Wrong" value={String(data.wrong)} tone="bad" />
        <Stat label="Not attempted" value={String(data.skipped)} />
        <Stat label="Avg time / question" value={`${Math.round(data.avgTime)}s`} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Total time" value={formatClock(data.totalTime)} />
        <Stat
          label="Fastest question"
          value={data.fastest ? `Q${data.fastest.question.number} · ${data.fastest.answer?.timeSpent ?? 0}s` : "—"}
        />
        <Stat
          label="Slowest question"
          value={data.slowest ? `Q${data.slowest.question.number} · ${data.slowest.answer?.timeSpent ?? 0}s` : "—"}
        />
      </div>

      <Panel title="Subject performance">
        {data.subjects.map((b) => (
          <Bar key={b.name} label={b.name} pct={acc(b)} right={`${b.correct}/${b.total} · ${formatClock(b.time)}`} />
        ))}
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Weak chapters">
          {data.chaptersWeak.map((b) => (
            <Bar key={b.name} label={b.name} pct={acc(b)} tone="bad" right={`${b.correct}/${b.total}`} />
          ))}
          {data.chaptersWeak.length === 0 && <Empty />}
        </Panel>
        <Panel title="Strong chapters">
          {data.chaptersStrong.map((b) => (
            <Bar key={b.name} label={b.name} pct={acc(b)} tone="good" right={`${b.correct}/${b.total}`} />
          ))}
          {data.chaptersStrong.length === 0 && <Empty />}
        </Panel>
      </div>

      {data.topics.length > 0 && (
        <Panel title="Topic accuracy">
          {data.topics.map((b) => (
            <Bar key={b.name} label={b.name} pct={acc(b)} right={`${b.correct}/${b.total}`} />
          ))}
        </Panel>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Difficulty analysis">
          {data.difficulty.map((b) => (
            <Bar key={b.name} label={b.name} pct={acc(b)} right={`${b.correct}/${b.total}`} />
          ))}
        </Panel>
        <Panel title="Question type analysis">
          {data.types.map((b) => (
            <Bar key={b.name} label={b.name} pct={acc(b)} right={`${b.correct}/${b.total}`} />
          ))}
        </Panel>
      </div>

      <Panel title="Attempt analysis">
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <Mini label="Correct" value={data.subjects.reduce((a, b) => a + b.correct, 0)} tone="good" />
          <Mini label="Wrong" value={data.subjects.reduce((a, b) => a + b.wrong, 0)} tone="bad" />
          <Mini label="Skipped" value={data.subjects.reduce((a, b) => a + b.skipped, 0)} />
        </div>
      </Panel>

      <Panel title="WHY AM I LOSING MARKS?">
        {data.mistakeTypeRows.length > 0 ? (
          <div className="space-y-3">
            {data.mistakeTypeRows.map((row) => (
              <div key={row.type} className="rounded-lg border bg-surface p-3">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium">{row.type}</span>
                  <span className="text-muted-foreground">{row.count} · {row.pct.toFixed(0)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-card">
                  <div
                    className="h-full rounded-full bg-destructive transition-[width] duration-700 ease-out"
                    style={{ width: `${Math.min(100, row.pct)}%` }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">Marks lost · {row.marksLost}</div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Panel>

      <Panel title="REPEATED MISTAKES">
        {data.repeatedMistakes.length > 0 ? (
          <div className="space-y-3">
            {data.repeatedMistakes.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-3 rounded-lg border bg-surface p-3">
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold">{item.label}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {item.subject} · {item.chapter}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold text-destructive">
                    {item.count} times
                  </span>
                  <Link
                    to="/notebook"
                    className="rounded-lg border px-2 py-1 text-[11px] font-medium hover:bg-accent"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Panel>

      <Panel title="WEAKEST TOPICS">
        {data.weakestTopics.length > 0 ? (
          <div className="space-y-3">
            {data.weakestTopics.map((topic) => (
              <div key={`${topic.subject}-${topic.chapter}-${topic.name}`} className="rounded-lg border bg-surface p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold">{topic.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {topic.subject} · {topic.chapter}
                    </div>
                  </div>
                  <PriorityBadge level={topic.priority} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{topic.accuracy.toFixed(0)}% accuracy</span>
                  <span>{topic.wrong} wrong · {topic.repeated || 0} repeated</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Panel>

      <Panel title="WHAT SHOULD I PRACTICE NEXT?">
        {data.practiceNext.length > 0 ? (
          <div className="space-y-3">
            {data.practiceNext.map((item) => (
              <div key={item.id} className="rounded-lg border bg-surface p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold">{item.topic}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{item.reason}</div>
                  </div>
                  <PriorityBadge level={item.priority} />
                </div>
                <div className="mt-3 flex justify-end">
                  <Link
                    to="/practice"
                    className="rounded-lg border px-2 py-1 text-[11px] font-medium hover:bg-accent"
                  >
                    Practice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </Panel>

      <Panel title="Daily progress">
        <div className="flex items-end gap-2 overflow-x-auto pb-2">
          {data.daily.map((d) => {
            const h = Math.max(6, Math.min(100, d.accuracy));
            return (
              <div key={d.day} className="flex w-12 shrink-0 flex-col items-center gap-1">
                <div className="flex h-28 w-full items-end rounded bg-surface">
                  <div
                    className="w-full rounded bg-primary transition-[height] duration-700 ease-out"
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{d.day.slice(5)}</span>
                <span className="text-[10px] font-semibold">{d.accuracy.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </Panel>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "bad" }) {
  return (
    <div className="premium-card rounded-xl border bg-card p-4">
      <div className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div className={cn("mt-1 text-xl font-bold", tone === "bad" && "text-destructive")}>{value}</div>
    </div>
  );
}

function Mini({ label, value, tone }: { label: string; value: number; tone?: "good" | "bad" }) {
  return (
    <div className="premium-card rounded-lg bg-surface p-3">
      <div
        className={cn(
          "text-lg font-bold",
          tone === "good" && "text-answered",
          tone === "bad" && "text-destructive",
        )}
      >
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="premium-card mt-4 rounded-xl border bg-card p-4">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="text-xs text-muted-foreground">Not enough data yet.</p>;
}

function PriorityBadge({ level }: { level: "Critical" | "High" | "Medium" | "Low" }) {
  const palette = {
    Critical: "bg-destructive/10 text-destructive border-destructive/40",
    High: "bg-amber-500/10 text-amber-300 border-amber-500/40",
    Medium: "bg-primary/10 text-primary border-primary/40",
    Low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
  }[level];

  return (
    <span className={cn("rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide", palette)}>
      {level}
    </span>
  );
}

function Bar({
  label,
  pct,
  right,
  tone,
}: {
  label: string;
  pct: number;
  right?: string;
  tone?: "good" | "bad";
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="truncate font-medium capitalize">{label}</span>
        <span className="shrink-0 text-muted-foreground">
          {right} · {pct.toFixed(0)}%
        </span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-700 ease-out",
            tone === "bad" ? "bg-destructive" : tone === "good" ? "bg-answered" : "bg-primary",
          )}
          style={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  );
}
