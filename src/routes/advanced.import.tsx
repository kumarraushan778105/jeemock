import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { advancedTests, paperOf, yearOf } from "@/lib/advanced";
import { listTests } from "@/lib/db";

export const Route = createFileRoute("/advanced/import")({
  head: () => ({
    meta: [
      { title: "Import JEE Advanced Papers — JSON & ZIP Sets" },
      {
        name: "description",
        content:
          "Import JEE Advanced question sets with images, answer keys and year/paper tags detected automatically.",
      },
      { property: "og:title", content: "Import JEE Advanced Papers" },
      {
        property: "og:description",
        content: "Add Advanced sets with automatic Paper 1 / Paper 2 and year detection.",
      },
    ],
  }),
  component: AdvancedImport,
});

function AdvancedImport() {
  const { data: tests } = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const sets = advancedTests(tests ?? []);

  return (
    <AdvancedShell
      title="Import Advanced Sets"
      subtitle="Name your files like “JEE Advanced 2022 Paper 1” — the year and paper are detected automatically."
    >
      <Link
        to="/import"
        className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Open importer
      </Link>
      <p className="mt-2 text-xs text-muted-foreground">
        In the importer, choose “Import into: Advanced” so the set joins this library.
      </p>

      <h2 className="mt-6 text-sm font-bold uppercase tracking-wide">
        Advanced sets ({sets.length})
      </h2>
      <ul className="mt-3 space-y-2">
        {sets.map((t) => (
          <li
            key={t.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4"
          >
            <div className="min-w-[180px] flex-1">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">
                {t.questionCount} questions · {t.imageCount} images · Paper {paperOf(t)}
                {yearOf(t) ? ` · ${yearOf(t)}` : ""}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(t.importedAt).toLocaleDateString()}
            </span>
          </li>
        ))}
        {sets.length === 0 && (
          <li className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
            No Advanced sets imported yet.
          </li>
        )}
      </ul>
    </AdvancedShell>
  );
}
