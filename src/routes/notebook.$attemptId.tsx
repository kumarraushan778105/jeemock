import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NotebookPen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NoteEditor } from "@/components/review/NoteEditor";
import { ReviewList, type ReviewItem } from "@/components/review/ReviewList";
import { getAttempt, listNotes, noteKey } from "@/lib/db";
import { buildReport } from "@/lib/stats";
import { originMap } from "@/lib/origin";

export const Route = createFileRoute("/notebook/$attemptId")({
  head: () => ({
    meta: [
      { title: "Wrong Questions Review — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Only the wrong questions from this attempt, with sticky palette, subject filters, reasons and learnings.",
      },
      { property: "og:title", content: "Wrong Questions Review" },
      {
        property: "og:description",
        content: "Review your mistakes from one test on a single page.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotebookAttempt,
});

function NotebookAttempt() {
  const { attemptId } = Route.useParams();

  const q = useQuery({
    queryKey: ["notebook", attemptId],
    queryFn: async () => {
      const attempt = await getAttempt(attemptId);
      if (!attempt) throw new Error("Attempt not found");
      const [report, notes] = await Promise.all([buildReport(attempt), listNotes(attemptId)]);
      const sources = await originMap(report.questions.map((q) => q.id));
      return { report, notes, sources };
    },
    retry: false,
  });

  if (q.isLoading)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Loading mistakes…</p>
      </AppShell>
    );
  if (q.error || !q.data)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">
          {(q.error as Error)?.message ?? "Not found"}
        </p>
        <Link to="/notebook" className="mt-3 inline-block text-sm text-primary underline">
          Back to notebook
        </Link>
      </AppShell>
    );

  const { report, notes, sources } = q.data;
  const items: ReviewItem[] = report.summary.perQuestion
    .filter((p) => p.status === "wrong")
    .map((p) => ({ question: p.question, answer: p.answer, status: p.status, score: p.score }));

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 truncate text-2xl font-bold tracking-tight">
            <NotebookPen className="size-5" /> {report.attempt.testName}
          </h1>
          <p className="text-xs text-muted-foreground">{items.length} wrong questions</p>
        </div>
        <Link to="/notebook" className="rounded-lg border px-3 py-1.5 text-xs font-medium">
          All tests
        </Link>
      </div>

      <ReviewList
        items={items}
        sources={sources}
        statuses={["all"]}
        paletteTitle="Wrong Questions"
        emptyText="No wrong questions for this subject."
        renderFooter={(r) => (
          <NoteEditor
            attemptId={attemptId}
            questionId={r.question.id}
            mode="wrong"
            initial={notes.find((n) => n.id === noteKey(attemptId, r.question.id))}
          />
        )}
      />
    </AppShell>
  );
}
