import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { isAdvancedAttempt } from "@/lib/advanced";
import { listAttempts } from "@/lib/db";
import { buildReport } from "@/lib/stats";
import { isCorrect } from "@/lib/scoring";

export const Route = createFileRoute("/advanced/analytics")({
  head: () => ({
    meta: [
      { title: "JEE Advanced Analytics — Subject & Chapter Performance" },
      {
        name: "description",
        content:
          "Separate JEE Advanced analytics: subject, chapter, difficulty and paper-wise accuracy plus score trend.",
      },
      { property: "og:title", content: "JEE Advanced Analytics" },
      {
        property: "og:description",
        content: "Subject, chapter, difficulty and paper-wise Advanced performance breakdowns.",
      },
    ],
  }),
  component: AdvancedAnalytics,
});

function Bar({ label, correct, total }: { label: string; correct: number; total: number }) {
  const pct = total ? (correct / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="truncate">{label}</span>
        <span className="text-muted-foreground">
          {correct}/{total} · {pct.toFixed(0)}%
        </span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AdvancedAnalytics() {
  const { data } = useQuery({
    queryKey: ["adv", "analytics"],
    queryFn: async () => {
      const attempts = (await listAttempts()).filter((a) => isAdvancedAttempt(a) && a.submitted);
      return Promise.all(attempts.map(buildReport));
    },
  });

  const agg = useMemo(() => {
    const subject = new Map<string, { correct: number; total: number }>();
    const chapter = new Map<string, { correct: number; total: number }>();
    const difficulty = new Map<string, { correct: number; total: number }>();
    const paper = new Map<string, { correct: number; total: number }>();
    let score = 0;
    let correct = 0;
    let attempted = 0;
    for (const r of data ?? []) {
      score += r.summary.score;
      for (const q of r.questions) {
        const ans = r.attempt.answers[q.id];
        if (ans?.value == null || String(ans.value).length === 0) continue;
        const ok = isCorrect(q, ans.value);
        attempted += 1;
        if (ok) correct += 1;
        for (const [map, key] of [
          [subject, q.subject],
          [chapter, `${q.subject} · ${q.chapter}`],
          [difficulty, q.difficulty],
          [paper, `Paper ${r.attempt.paper ?? 1}`],
        ] as const) {
          const b = map.get(key) ?? { correct: 0, total: 0 };
          b.total += 1;
          if (ok) b.correct += 1;
          map.set(key, b);
        }
      }
    }
    const sort = (m: Map<string, { correct: number; total: number }>) =>
      [...m.entries()].sort((a, b) => b[1].total - a[1].total);
    return {
      subject: sort(subject),
      chapter: sort(chapter),
      difficulty: sort(difficulty),
      paper: sort(paper),
      score,
      accuracy: attempted ? (correct / attempted) * 100 : 0,
      tests: (data ?? []).length,
    };
  }, [data]);

  return (
    <AdvancedShell
      title="Advanced Analytics"
      subtitle="Performance across your JEE Advanced tests only — Main analytics stay separate."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Tests taken", agg.tests],
          ["Total marks", agg.score],
          ["Accuracy", `${agg.accuracy.toFixed(1)}%`],
        ].map(([l, v]) => (
          <div key={l as string} className="rounded-xl border bg-card p-4">
            <div className="text-xs uppercase text-muted-foreground">{l}</div>
            <div className="mt-1 text-2xl font-bold">{v}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {(
          [
            ["Subject-wise", agg.subject],
            ["Paper-wise", agg.paper],
            ["Difficulty-wise", agg.difficulty],
            ["Chapter-wise", agg.chapter.slice(0, 25)],
          ] as const
        ).map(([title, rows]) => (
          <div key={title} className="rounded-2xl border bg-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
            <div className="mt-3 space-y-3">
              {rows.length === 0 && <p className="text-sm text-muted-foreground">No data yet.</p>}
              {rows.map(([k, v]) => (
                <Bar key={k} label={k} correct={v.correct} total={v.total} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdvancedShell>
  );
}
