import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { isAdvancedAttempt, arrangeBySubject } from "@/lib/advanced";
import { startAdvancedTest } from "@/lib/advanced-start";
import { deleteAttempt, listAttempts } from "@/lib/db";
import { buildReport } from "@/lib/stats";
import type { Attempt } from "@/lib/types";

export const Route = createFileRoute("/advanced/history")({
  head: () => ({
    meta: [
      { title: "JEE Advanced Test History & Re-attempts" },
      {
        name: "description",
        content:
          "Every JEE Advanced test you have taken with score, accuracy, review and one-click re-attempt.",
      },
      { property: "og:title", content: "JEE Advanced Test History" },
      {
        property: "og:description",
        content: "Scores, accuracy and re-attempts for all your Advanced papers.",
      },
    ],
  }),
  component: AdvancedHistory,
});

function AdvancedHistory() {
  const router = useRouter();
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["adv", "history-list"],
    queryFn: async () => {
      const attempts = (await listAttempts()).filter(isAdvancedAttempt);
      return Promise.all(
        attempts.map(async (a) => ({ a, report: a.submitted ? await buildReport(a) : null })),
      );
    },
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteAttempt(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adv"] });
      qc.invalidateQueries({ queryKey: ["attempts"] });
      toast.success("Deleted");
    },
  });

  const reattempt = useMutation({
    mutationFn: async (a: Attempt) => {
      const questions = a.questionsSnapshot ?? [];
      if (questions.length === 0) throw new Error("Original questions are no longer available.");
      const att = await startAdvancedTest({
        name: `${a.testName} (Re-attempt)`,
        questions: arrangeBySubject(questions),
        durationMin: Math.round(a.durationSec / 60),
        paper: a.paper,
        reattemptOf: a.id,
      });
      return att.id;
    },
    onSuccess: (id) => router.navigate({ to: "/test/$attemptId", params: { attemptId: id } }),
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = data ?? [];

  return (
    <AdvancedShell
      title="Previous Tests"
      subtitle="All JEE Advanced attempts — in progress and completed."
    >
      {rows.length === 0 && (
        <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
          No Advanced tests yet.
        </div>
      )}
      <ul className="space-y-2">
        {rows.map(({ a, report }) => (
          <li
            key={a.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4"
          >
            <div className="min-w-[180px] flex-1">
              <div className="text-sm font-semibold">{a.testName}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(a.submittedAt ?? a.updatedAt).toLocaleString()} · {a.questionIds.length}{" "}
                questions
                {a.paper ? ` · Paper ${a.paper}` : ""}
              </div>
            </div>
            {report ? (
              <div className="flex gap-4 text-xs">
                <span>
                  <b className="text-base">{report.summary.score}</b> marks
                </span>
                <span className="text-status-answered">{report.summary.correct} correct</span>
                <span className="text-destructive">{report.summary.wrong} wrong</span>
                <span className="text-muted-foreground">
                  {report.summary.accuracy.toFixed(1)}% accuracy
                </span>
              </div>
            ) : (
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase text-primary">
                In progress
              </span>
            )}
            <div className="flex gap-2">
              {a.submitted ? (
                <>
                  <button
                    onClick={() =>
                      router.navigate({ to: "/result/$attemptId", params: { attemptId: a.id } })
                    }
                    className="rounded-md border px-3 py-1.5 text-xs font-semibold"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => reattempt.mutate(a)}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    Re-attempt
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    router.navigate({ to: "/test/$attemptId", params: { attemptId: a.id } })
                  }
                  className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Resume
                </button>
              )}
              <button
                onClick={() => del.mutate(a.id)}
                className="rounded-md border px-3 py-1.5 text-xs font-semibold text-destructive"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AdvancedShell>
  );
}
