import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NoteEditor } from "@/components/review/NoteEditor";
import { ReviewList, type ReviewItem } from "@/components/review/ReviewList";
import { getAttempt, listNotes, noteKey } from "@/lib/db";
import { buildReport } from "@/lib/stats";
import { originMap } from "@/lib/origin";

export const Route = createFileRoute("/bookmarks/$attemptId")({
  head: () => ({
    meta: [
      { title: "Bookmarked Questions Review — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Only the bookmarked questions from this attempt, with sticky palette, subject filters, notes and revision flags.",
      },
      { property: "og:title", content: "Bookmarked Questions Review" },
      {
        property: "og:description",
        content: "Review bookmarked questions from one test on a single page.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookmarksAttempt,
});

function BookmarksAttempt() {
  const { attemptId } = Route.useParams();

  const q = useQuery({
    queryKey: ["bookmarks", attemptId],
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
        <p className="text-sm text-muted-foreground">Loading bookmarks…</p>
      </AppShell>
    );
  if (q.error || !q.data)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">
          {(q.error as Error)?.message ?? "Not found"}
        </p>
        <Link to="/bookmarks" className="mt-3 inline-block text-sm text-primary underline">
          Back to bookmarks
        </Link>
      </AppShell>
    );

  const { report, notes, sources } = q.data;
  const items: ReviewItem[] = report.summary.perQuestion
    .filter((p) => p.answer?.bookmarked)
    .map((p) => ({ question: p.question, answer: p.answer, status: p.status, score: p.score }));

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 truncate text-2xl font-bold tracking-tight">
            <Bookmark className="size-5" /> {report.attempt.testName}
          </h1>
          <p className="text-xs text-muted-foreground">{items.length} bookmarked questions</p>
        </div>
        <Link to="/bookmarks" className="rounded-lg border px-3 py-1.5 text-xs font-medium">
          All tests
        </Link>
      </div>

      <ReviewList
        items={items}
        sources={sources}
        statuses={["all", "correct", "wrong", "skipped"]}
        paletteTitle="Bookmarked"
        emptyText="No bookmarked questions for this filter."
        renderFooter={(r) => (
          <NoteEditor
            attemptId={attemptId}
            questionId={r.question.id}
            mode="bookmark"
            initial={notes.find((n) => n.id === noteKey(attemptId, r.question.id))}
          />
        )}
      />
    </AppShell>
  );
}
