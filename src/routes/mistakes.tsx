import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Brain } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { allReports } from "@/lib/stats";
import { formatClock } from "@/lib/scoring";
import { QUESTION_TYPE_LABEL, type Question } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mistakes")({
  head: () => ({
    meta: [
      { title: "Smart Mistake Analysis — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Automatic mistake analysis after every test: accuracy by subject, chapter, topic, difficulty and question type, time analysis, trends and what to revise next.",
      },
      { property: "og:title", content: "Smart Mistake Analysis — JEE CBT Platform" },
      {
        property: "og:description",
        content:
          "Interactive charts on your real attempts plus dynamic recommendations for what to practise next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MistakesPage,
});

interface Bucket {
  name: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  time: number;
  accuracy: number;
}

const COLORS = ["var(--primary)", "var(--destructive)", "var(--muted-foreground)"];

function MistakesPage() {
  const reports = useQuery({ queryKey: ["reports"], queryFn: allReports });

  const data = useMemo(() => {
    const list = [...(reports.data ?? [])].sort(
      (a, b) =>
        (a.attempt.submittedAt ?? a.attempt.updatedAt) -
        (b.attempt.submittedAt ?? b.attempt.updatedAt),
    );
    const group = (key: (q: Question) => string, min = 1): Bucket[] => {
      const map = new Map<string, Bucket>();
      for (const r of list)
        for (const pq of r.summary.perQuestion) {
          const k = key(pq.question) || "General";
          const b =
            map.get(k) ??
            ({
              name: k,
              total: 0,
              correct: 0,
              wrong: 0,
              skipped: 0,
              time: 0,
              accuracy: 0,
            } as Bucket);
          b.total += 1;
          b.time += pq.answer?.timeSpent ?? 0;
          b[pq.status] += 1;
          map.set(k, b);
        }
      return [...map.values()]
        .filter((b) => b.total >= min)
        .map((b) => ({
          ...b,
          accuracy: b.correct + b.wrong ? (b.correct / (b.correct + b.wrong)) * 100 : 0,
        }));
    };

    const flat = list.flatMap((r) => r.summary.perQuestion);
    const correct = flat.filter((p) => p.status === "correct").length;
    const wrong = flat.filter((p) => p.status === "wrong").length;
    const skipped = flat.filter((p) => p.status === "skipped").length;
    const attempted = correct + wrong;
    const timed = flat.filter((p) => (p.answer?.timeSpent ?? 0) > 0);

    const subjects = group((q) => q.subject);
    const chapters = group((q) => q.chapter, 3);
    const topics = group((q) => q.topic, 3).filter((b) => b.name !== "General");
    const best = (arr: Bucket[]) => [...arr].sort((a, b) => b.accuracy - a.accuracy)[0];
    const worst = (arr: Bucket[]) => [...arr].sort((a, b) => a.accuracy - b.accuracy)[0];

    const trend = list.map((r, i) => ({
      name: `T${i + 1}`,
      accuracy: Number(r.summary.accuracy.toFixed(1)),
      score: r.summary.score,
      test: r.attempt.testName,
    }));

    const timeByStatus = [
      {
        name: "Correct",
        seconds: Math.round(
          flat
            .filter((p) => p.status === "correct")
            .reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
        ),
      },
      {
        name: "Wrong",
        seconds: Math.round(
          flat
            .filter((p) => p.status === "wrong")
            .reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
        ),
      },
      {
        name: "Skipped",
        seconds: Math.round(
          flat
            .filter((p) => p.status === "skipped")
            .reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
        ),
      },
    ];

    const weakChapters = [...chapters].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5);
    const slowWrong = [...flat]
      .filter((p) => p.status === "wrong")
      .sort((a, b) => (b.answer?.timeSpent ?? 0) - (a.answer?.timeSpent ?? 0))
      .slice(0, 3);

    const recommendations: string[] = [];
    const overall = attempted ? (correct / attempted) * 100 : 0;
    for (const c of weakChapters.slice(0, 3))
      recommendations.push(
        `Revise "${c.name}" — accuracy ${c.accuracy.toFixed(0)}% over ${c.total} questions.`,
      );
    const weakSubject = worst(subjects);
    if (weakSubject)
      recommendations.push(
        `${weakSubject.name} is your weakest subject (${weakSubject.accuracy.toFixed(0)}%). Add a focused ${weakSubject.name} practice set.`,
      );
    if (skipped > attempted * 0.25)
      recommendations.push(
        `You skipped ${skipped} questions. Practise timed sets to improve coverage before accuracy.`,
      );
    if (wrong > 0 && overall < 60)
      recommendations.push(
        "Negative marking is hurting you — attempt only questions you can justify in under 2 minutes.",
      );
    for (const p of slowWrong)
      recommendations.push(
        `Q${p.question.number} (${p.question.chapter}) took ${p.answer?.timeSpent ?? 0}s and was wrong — review the concept, not just the answer.`,
      );
    const weakType = worst(group((q) => QUESTION_TYPE_LABEL[q.type], 3));
    if (weakType)
      recommendations.push(
        `Drill ${weakType.name} questions — only ${weakType.accuracy.toFixed(0)}% accuracy so far.`,
      );

    return {
      count: list.length,
      correct,
      wrong,
      skipped,
      overall,
      totalTime: flat.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
      avgTime: timed.length
        ? timed.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0) / timed.length
        : 0,
      subjects,
      chapters: [...chapters].sort((a, b) => a.accuracy - b.accuracy).slice(0, 10),
      topics: [...topics].sort((a, b) => a.accuracy - b.accuracy).slice(0, 10),
      difficulty: group((q) => q.difficulty),
      types: group((q) => QUESTION_TYPE_LABEL[q.type]),
      trend,
      timeByStatus,
      pie: [
        { name: "Correct", value: correct },
        { name: "Wrong", value: wrong },
        { name: "Skipped", value: skipped },
      ],
      strongSubject: best(subjects),
      weakSubject,
      strongChapter: best(chapters),
      weakChapter: worst(chapters),
      strongTopic: best(topics),
      weakTopic: worst(topics),
      recommendations: recommendations.slice(0, 6),
    };
  }, [reports.data]);

  if (reports.isLoading)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Analysing your mistakes…</p>
      </AppShell>
    );

  if (data.count === 0)
    return (
      <AppShell>
        <h1 className="text-2xl font-bold tracking-tight">Smart Mistake Analysis</h1>
        <p className="mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Submit a test to unlock mistake analysis.{" "}
          <Link to="/create" className="text-primary underline">
            Create a test
          </Link>
        </p>
      </AppShell>
    );

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Brain className="size-5" /> Smart Mistake Analysis
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Updated automatically after every completed test · {data.count} attempt
        {data.count === 1 ? "" : "s"} analysed.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Overall accuracy" value={`${data.overall.toFixed(1)}%`} />
        <Stat label="Correct" value={String(data.correct)} tone="good" />
        <Stat label="Wrong" value={String(data.wrong)} tone="bad" />
        <Stat label="Skipped" value={String(data.skipped)} />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Stat label="Total time" value={formatClock(data.totalTime)} />
        <Stat label="Avg time / question" value={`${Math.round(data.avgTime)}s`} />
        <Stat
          label="Strongest subject"
          value={data.strongSubject ? `${data.strongSubject.name}` : "—"}
          tone="good"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Accuracy by subject">
          <ChartBox>
            <BarChart data={data.subjects}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip {...tooltip} />
              <Bar
                dataKey="accuracy"
                name="Accuracy %"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={750}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartBox>
        </Card>

        <Card title="Answer distribution">
          <ChartBox>
            <PieChart>
              <Pie
                data={data.pie}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
                isAnimationActive
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.pie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip {...tooltip} />
            </PieChart>
          </ChartBox>
        </Card>
      </div>

      <Card title="Performance trend">
        <ChartBox>
          <LineChart data={data.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip {...tooltip} />
            <Legend />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="Accuracy %"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="score"
              name="Score"
              stroke="var(--success)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--success)", strokeWidth: 0 }}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            />
          </LineChart>
        </ChartBox>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Weakest chapters">
          <ChartBox height={Math.max(220, data.chapters.length * 32)}>
            <BarChart data={data.chapters} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10 }} />
              <Tooltip {...tooltip} />
              <Bar
                dataKey="accuracy"
                name="Accuracy %"
                fill="var(--destructive)"
                radius={[0, 6, 6, 0]}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartBox>
        </Card>

        <Card title="Weakest topics">
          {data.topics.length === 0 ? (
            <p className="text-xs text-muted-foreground">Not enough topic data yet.</p>
          ) : (
            <ChartBox height={Math.max(220, data.topics.length * 32)}>
              <BarChart data={data.topics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10 }} />
                <Tooltip {...tooltip} />
                <Bar
                  dataKey="accuracy"
                  name="Accuracy %"
                  fill="var(--warning)"
                  radius={[0, 6, 6, 0]}
                  isAnimationActive
                  animationDuration={700}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ChartBox>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Accuracy by difficulty">
          <ChartBox>
            <BarChart data={data.difficulty}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip {...tooltip} />
              <Bar
                dataKey="accuracy"
                name="Accuracy %"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartBox>
        </Card>

        <Card title="Accuracy by question type">
          <ChartBox>
            <BarChart data={data.types}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} height={50} />
              <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip {...tooltip} />
              <Bar
                dataKey="accuracy"
                name="Accuracy %"
                fill="var(--success)"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              />
            </BarChart>
          </ChartBox>
        </Card>
      </div>

      <Card title="Time analysis (seconds by outcome)">
        <ChartBox>
          <BarChart data={data.timeByStatus}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip {...tooltip} />
            <Bar
              dataKey="seconds"
              name="Seconds"
              fill="var(--primary)"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={700}
              animationEasing="ease-out"
            />
          </BarChart>
        </ChartBox>
      </Card>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Extreme label="Weakest subject" b={data.weakSubject} tone="bad" />
        <Extreme label="Weakest chapter" b={data.weakChapter} tone="bad" />
        <Extreme label="Weakest topic" b={data.weakTopic} tone="bad" />
        <Extreme label="Strongest subject" b={data.strongSubject} tone="good" />
        <Extreme label="Strongest chapter" b={data.strongChapter} tone="good" />
        <Extreme label="Strongest topic" b={data.strongTopic} tone="good" />
      </div>

      <Card title="What to practise next">
        <ul className="space-y-2 text-sm">
          {data.recommendations.length === 0 && (
            <li className="text-muted-foreground">
              Nothing critical — keep attempting full-length papers.
            </li>
          )}
          {data.recommendations.map((r, i) => (
            <li key={i} className="rounded-lg border bg-surface p-3">
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/practice"
            className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Start targeted practice
          </Link>
          <Link to="/notebook" className="rounded-lg border px-3 py-1.5 text-xs font-semibold">
            Open Wrong Notebook
          </Link>
        </div>
      </Card>
    </AppShell>
  );
}

const tooltip = {
  animationDuration: 220,
  animationEasing: "ease-out" as const,
  contentStyle: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    fontSize: 12,
    color: "var(--foreground)",
    padding: "0.7rem 0.8rem",
  },
  itemStyle: {
    color: "var(--foreground)",
    padding: 0,
  },
  labelStyle: {
    color: "var(--foreground)",
    fontWeight: 600,
  },
} as const;

function ChartBox({ children, height = 260 }: { children: React.ReactElement; height?: number }) {
  return (
    <div style={{ height }} className="chart-animated w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="premium-card mt-4 rounded-xl border bg-card p-4">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 text-xl font-bold",
          tone === "bad" && "text-destructive",
          tone === "good" && "text-success",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Extreme({ label, b, tone }: { label: string; b?: Bucket; tone: "good" | "bad" }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div
        className={cn(
          "mt-1 truncate text-sm font-bold",
          tone === "bad" ? "text-destructive" : "text-success",
        )}
      >
        {b ? b.name : "—"}
      </div>
      <div className="text-[11px] text-muted-foreground">
        {b ? `${b.accuracy.toFixed(0)}% · ${b.correct}/${b.total} correct` : "Not enough data"}
      </div>
    </div>
  );
}
