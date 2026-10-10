import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NotebookPen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { allReports } from "@/lib/stats";

export const Route = createFileRoute("/notebook/")({
  head: () => ({
    meta: [
      { title: "Wrong Notebook — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Your mistakes grouped by test. Open any test to review only its wrong questions with reasons and learnings.",
      },
      { property: "og:title", content: "Wrong Notebook — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Every test you attempted with its wrong-question count.",
      },
    ],
  }),
  component: NotebookIndex,
});

function NotebookIndex() {
  const reports = useQuery({ queryKey: ["reports"], queryFn: allReports });

  const rows = (reports.data ?? [])
    .map((r) => ({
      id: r.attempt.id,
      name: r.attempt.testName,
      when: r.attempt.submittedAt ?? r.attempt.updatedAt,
      wrong: r.summary.wrong,
      total: r.questions.length,
    }))
    .filter((r) => r.wrong > 0)
    .sort((a, b) => b.when - a.when);

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <NotebookPen className="size-5" /> Wrong Notebook
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a test to review only the questions you got wrong.
      </p>

      {reports.isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}

      {!reports.isLoading && rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No mistakes recorded yet — submit a test to build your notebook.
        </p>
      ) : (
        <ul className="mt-5 space-y-2">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                to="/notebook/$attemptId"
                params={{ attemptId: r.id }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/60"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(r.when).toLocaleString()} · {r.total} questions
                  </div>
                </div>
                <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
                  {r.wrong} Wrong
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
