import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NTA_BOOKMARK_CATEGORIES, type NtaBookmarkCategory } from "@/lib/nta-review";
import { allReports } from "@/lib/stats";

export const Route = createFileRoute("/bookmarks/")({
  head: () => ({
    meta: [
      { title: "Bookmarks by Test — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Bookmarked questions grouped by test. Open any test to review only its bookmarked questions with notes.",
      },
      { property: "og:title", content: "Bookmarks by Test — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Every test with its bookmarked-question count.",
      },
    ],
  }),
  component: BookmarksIndex,
});

function BookmarksIndex() {
  const reports = useQuery({ queryKey: ["reports"], queryFn: allReports });
  const [categoryFilter, setCategoryFilter] = useState<"all" | NtaBookmarkCategory>("all");

  const allRows = (reports.data ?? [])
    .map((report) => {
      const categoryCounts: Partial<Record<NtaBookmarkCategory, number>> = {};
      for (const category of NTA_BOOKMARK_CATEGORIES) {
        categoryCounts[category] = report.summary.perQuestion.filter(
          (item) => item.answer?.bookmarked && item.answer.tag === category,
        ).length;
      }
      return {
        id: report.attempt.id,
        name: report.attempt.testName,
        when: report.attempt.submittedAt ?? report.attempt.updatedAt,
        count: report.summary.perQuestion.filter((item) => item.answer?.bookmarked).length,
        total: report.questions.length,
        isNta: report.attempt.mode === "nta",
        categoryCounts,
      };
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.when - a.when);
  const rows =
    categoryFilter === "all"
      ? allRows
      : allRows.filter((row) => row.isNta && (row.categoryCounts[categoryFilter] ?? 0) > 0);

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Bookmark className="size-5" /> Bookmarks
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a test to review only its bookmarked questions.
      </p>

      {allRows.some((row) => row.isNta) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              categoryFilter === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card"
            }`}
          >
            All categories
          </button>
          {NTA_BOOKMARK_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setCategoryFilter(category)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                categoryFilter === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {reports.isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}

      {!reports.isLoading && allRows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nothing bookmarked yet — tap the bookmark icon while taking a test.
        </p>
      ) : !reports.isLoading && rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No bookmarks in this category yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-2">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                to="/bookmarks/$attemptId"
                params={{ attemptId: r.id }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/60"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(r.when).toLocaleString()} · {r.total} questions
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {r.count} Bookmark{r.count === 1 ? "" : "s"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
