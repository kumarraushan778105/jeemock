import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateCcw, Trash2, Trophy } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { deleteAttempt } from "@/lib/db";
import { startAttempt } from "@/lib/attempt";
import { formatClock } from "@/lib/scoring";
import { allReports, asTest, type AttemptReport } from "@/lib/stats";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Test History — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Permanent history of every submitted JEE mock: marks, percentage, accuracy, time taken, correct, wrong, unattempted and negative marks.",
      },
      { property: "og:title", content: "Test History — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Every completed attempt with full score, accuracy and timing breakdown.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const qc = useQueryClient();
  const router = useRouter();
  // only completed attempts ever reach History
  const reports = useQuery({
    queryKey: ["reports"],
    queryFn: allReports,
  });
  const rows = [...(reports.data ?? [])].sort(
    (a, b) =>
      (b.attempt.submittedAt ?? b.attempt.updatedAt) -
      (a.attempt.submittedAt ?? a.attempt.updatedAt),
  );

  const remove = async (id: string) => {
    await deleteAttempt(id);
    qc.invalidateQueries({ queryKey: ["reports"] });
    qc.invalidateQueries({ queryKey: ["attempts"] });
    qc.invalidateQueries({ queryKey: ["dashboardStats"] });
  };

  /** Starts the same paper again as a brand-new attempt; past attempts stay untouched. */
  const reattempt = async ({ attempt: a, questions }: AttemptReport) => {
    if (questions.length === 0) return toast.error("Original questions are no longer available.");
    const fresh = await startAttempt(asTest(questions, a), {
      questions,
      durationMin: Math.round(a.durationSec / 60),
      name: a.testName,
      exam: a.exam,
      paper: a.paper,
      reattemptOf: a.id,
      strictMode: a.strictMode,
    });
    qc.invalidateQueries({ queryKey: ["attempts"] });
    router.navigate({ to: "/test/$attemptId", params: { attemptId: fresh.id } });
  };

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Trophy className="size-5" /> Test History
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every completed attempt is stored permanently on this device.
      </p>

      <div className="mt-6 space-y-3">
        {reports.isLoading && <p className="text-sm text-muted-foreground">Loading history…</p>}
        {!reports.isLoading && rows.length === 0 && (
          <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
            No completed attempts yet. Submitted tests appear here automatically.
          </p>
        )}

        {rows.map((report) => {
          const { attempt: a, summary: s, questions } = report;
          const pct = s.maxScore ? (s.score / s.maxScore) * 100 : 0;
          const subjects = [...new Set(questions.map((q) => q.subject))];
          const chapters = [...new Set(questions.map((q) => q.chapter))];
          return (
            <div key={a.id} className="rounded-xl border bg-card p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <Link
                    to="/review/$attemptId"
                    params={{ attemptId: a.id }}
                    className="truncate text-base font-semibold hover:underline"
                  >
                    {a.testName}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {new Date(a.submittedAt ?? a.updatedAt).toLocaleString()} · {questions.length}{" "}
                    questions · {subjects.join(", ") || "—"}
                  </div>
                  <div className="mt-1 truncate text-[11px] text-muted-foreground">
                    Chapters: {chapters.slice(0, 6).join(", ")}
                    {chapters.length > 6 ? ` +${chapters.length - 6} more` : ""}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to="/review/$attemptId"
                    params={{ attemptId: a.id }}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    Full Test Review
                  </Link>
                  <Link
                    to="/result/$attemptId"
                    params={{ attemptId: a.id }}
                    className="rounded-md border px-3 py-1.5 text-xs font-semibold"
                  >
                    Analysis
                  </Link>
                  <button
                    onClick={() => void reattempt(report)}
                    className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold"
                  >
                    <RotateCcw className="size-3.5" /> Reattempt Test
                  </button>

                  <button
                    onClick={() => remove(a.id)}
                    className="rounded-md border border-destructive/40 p-1.5 text-destructive"
                    aria-label="Delete attempt"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8">
                <Cell label="Marks" value={`${s.score}/${s.maxScore}`} />
                <Cell label="Percentage" value={`${pct.toFixed(1)}%`} />
                <Cell label="Accuracy" value={`${s.accuracy.toFixed(1)}%`} />
                <Cell label="Correct" value={s.correct} tone="good" />
                <Cell label="Wrong" value={s.wrong} tone="bad" />
                <Cell label="Not attempted" value={s.skipped} />
                <Cell label="Negative" value={s.negative} tone="bad" />
                <Cell label="Time taken" value={formatClock(a.durationSec - a.remainingSec)} />
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

function Cell({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone?: "good" | "bad";
}) {
  return (
    <div className="rounded-lg bg-surface p-2">
      <div className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div
        className={
          "text-sm font-bold tabular-nums " +
          (tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "")
        }
      >
        {value}
      </div>
    </div>
  );
}
