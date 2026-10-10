import type { ErrorJournalEntry } from "@/lib/db";

export function ErrorJournalStats({ entries }: { entries: ErrorJournalEntry[] }) {
  const stats = {
    total: entries.length,
    needReview: entries.filter((e) => e.status === "Need Review").length,
    learning: entries.filter((e) => e.status === "Learning").length,
    mastered: entries.filter((e) => e.status === "Mastered").length,
    withAudio: entries.filter((e) => e.hasAudio).length,
    withPhoto: entries.filter((e) => e.imageId).length,
  };

  // Find repeated issues
  const errorCounts: Record<string, number> = {};
  entries.forEach((e) => {
    errorCounts[e.errorType] = (errorCounts[e.errorType] || 0) + 1;
  });
  const repeatedIssues = Object.entries(errorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        📊 Your Stats
      </h3>

      {/* Main Stats */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Entries", value: stats.total, icon: "📝" },
          { label: "Need Review", value: stats.needReview, icon: "🔴" },
          { label: "Learning", value: stats.learning, icon: "🟡" },
          { label: "Mastered", value: stats.mastered, icon: "🟢" },
          { label: "With Audio", value: stats.withAudio, icon: "🎙️" },
          { label: "With Photo", value: stats.withPhoto, icon: "📷" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-3">
            <div className="text-lg font-bold">
              {stat.icon} {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Repeated Issues */}
      {repeatedIssues.length > 0 && (
        <div className="mt-4 rounded-lg bg-card p-3">
          <div className="mb-2 text-xs font-bold uppercase text-muted-foreground">
            ⚠️ Common Issues
          </div>
          <div className="space-y-1">
            {repeatedIssues.map(([errorType, count]) => (
              <div key={errorType} className="flex items-center justify-between text-xs">
                <span>{errorType}</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 font-semibold text-primary">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.total === 0 && (
        <p className="text-xs text-muted-foreground italic">Create your first entry to see stats</p>
      )}
    </div>
  );
}
