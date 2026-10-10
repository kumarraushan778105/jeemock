import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ReviewList, type ReviewItem } from "@/components/review/ReviewList";
import { getAttempt } from "@/lib/db";
import { buildReport } from "@/lib/stats";
import { originMap } from "@/lib/origin";

export const Route = createFileRoute("/review/$attemptId")({
  head: () => ({
    meta: [
      { title: "Full Test Review — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Review every question of a completed JEE attempt on one page with a sticky palette, status and subject filters, answers and solutions.",
      },
      { property: "og:title", content: "Full Test Review — JEE CBT Platform" },
      {
        property: "og:description",
        content: "All questions, your answers, correct answers and solutions on a single page.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReviewPage,
});

function ReviewPage() {
  const { attemptId } = Route.useParams();

  const q = useQuery({
    queryKey: ["review", attemptId],
    queryFn: async () => {
      const attempt = await getAttempt(attemptId);
      if (!attempt) throw new Error("Attempt not found");
      const report = await buildReport(attempt);
      const sources = await originMap(report.questions.map((q) => q.id));
      return { ...report, sources };
    },
    retry: false,
  });

  if (q.isLoading)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">Loading review…</p>
      </AppShell>
    );
  if (q.error || !q.data)
    return (
      <AppShell>
        <p className="text-sm text-muted-foreground">
          {(q.error as Error)?.message ?? "Not found"}
        </p>
        <Link to="/results" className="mt-3 inline-block text-sm text-primary underline">
          Back to history
        </Link>
      </AppShell>
    );

  const { attempt, summary, sources } = q.data;
  const items: ReviewItem[] = summary.perQuestion.map((p) => ({
    question: p.question,
    answer: p.answer,
    status: p.status,
    score: p.score,
  }));

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 truncate text-2xl font-bold tracking-tight">
            <ClipboardList className="size-5" /> {attempt.testName}
          </h1>
          <p className="text-xs text-muted-foreground">
            Full test review · {summary.correct} correct · {summary.wrong} wrong · {summary.skipped}{" "}
            not attempted
          </p>
        </div>
        <Link
          to="/result/$attemptId"
          params={{ attemptId }}
          className="rounded-lg border px-3 py-1.5 text-xs font-medium"
        >
          Score analysis
        </Link>
      </div>

      <ReviewList items={items} sources={sources} />
    </AppShell>
  );
}
