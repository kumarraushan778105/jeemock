import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { advancedContext, filterAdvanced, type AdvFilters } from "@/lib/advanced";
import { MathText } from "@/components/MathText";
import { QUESTION_TYPE_LABEL } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advanced/bank")({
  head: () => ({
    meta: [
      { title: "JEE Advanced Question Bank — Chapter & Topic Browser" },
      {
        name: "description",
        content:
          "Search and browse the full JEE Advanced question bank by subject, chapter, topic, paper and year — built to stay fast with 100k+ questions.",
      },
      { property: "og:title", content: "JEE Advanced Question Bank" },
      {
        property: "og:description",
        content: "Fast search across the entire Advanced bank with chapter and topic filters.",
      },
    ],
  }),
  component: AdvancedBank,
});

const PAGE = 40;

function AdvancedBank() {
  const { data } = useQuery({ queryKey: ["adv", "ctx"], queryFn: advancedContext });
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState<string | null>(null);
  const [chapter, setChapter] = useState<string | null>(null);
  const [chapterSearch, setChapterSearch] = useState("");
  const [page, setPage] = useState(1);

  const filters: AdvFilters = useMemo(
    () => ({
      search,
      subjects: subject ? [subject] : undefined,
      chapters: chapter ? [chapter] : undefined,
    }),
    [search, subject, chapter],
  );

  const results = useMemo(
    () => (data ? filterAdvanced(data.index, filters, data.history) : []),
    [data, filters],
  );

  const chapters = useMemo(() => {
    const m = new Map<string, number>();
    for (const it of data?.pool ?? []) {
      if (subject && it.q.subject !== subject) continue;
      m.set(it.q.chapter || "General", (m.get(it.q.chapter || "General") ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [data, subject]);

  const shown = results.slice(0, page * PAGE);
  const visibleChapters = useMemo(() => {
    const term = chapterSearch.trim().toLowerCase();
    return chapters.filter(([name]) => name.toLowerCase().includes(term));
  }, [chapters, chapterSearch]);

  return (
    <AdvancedShell
      title="Advanced Question Bank"
      subtitle="Only JEE Advanced sets are shown here. Your JEE Main bank stays exactly as it is."
    >
      <div className="flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search questions, chapters, topics…"
          className="min-w-[220px] flex-1 rounded-lg border bg-background px-3 py-2 text-sm"
        />
        {[null, ...(data?.index.subjects ?? [])].map((s) => (
          <button
            key={String(s)}
            onClick={() => {
              setSubject(s);
              setChapter(null);
              setPage(1);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold",
              subject === s ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {s ?? "All subjects"}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="h-fit rounded-xl border bg-card p-3">
          <div className="text-[11px] font-bold uppercase text-muted-foreground">Chapters</div>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" />
            <input
              value={chapterSearch}
              onChange={(e) => setChapterSearch(e.target.value)}
              placeholder="Search chapter..."
              className="w-full rounded-lg border bg-surface py-2 pr-3 pl-9 text-sm"
            />
          </div>
          <div className="scroll-slim mt-2 max-h-[520px] space-y-1 overflow-y-auto">
            <button
              onClick={() => setChapter(null)}
              className={cn(
                "w-full rounded-md px-2 py-1.5 text-left text-xs",
                chapter === null ? "bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              All chapters
            </button>
            {visibleChapters.length === 0 ? (
              <p className="p-2 text-xs text-muted-foreground">No chapters found</p>
            ) : (
              visibleChapters.map(([c, n]) => (
                <button
                  key={c}
                  onClick={() => {
                    setChapter(c);
                    setPage(1);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs",
                    chapter === c ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                  )}
                >
                  <span className="truncate">{c}</span>
                  <span className="opacity-70">{n}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground">
            {results.length} question(s) · showing {shown.length}
          </div>
          <ul className="mt-2 space-y-2">
            {shown.map(({ q, paper, year, test }) => (
              <li key={q.id} className="rounded-xl border bg-card p-4">
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    Paper {paper}
                  </span>
                  {year && <span className="rounded border px-1.5 py-0.5">{year}</span>}
                  <span className="rounded border px-1.5 py-0.5">{q.subject}</span>
                  <span className="rounded border px-1.5 py-0.5">{q.chapter}</span>
                  <span className="rounded border px-1.5 py-0.5">
                    {QUESTION_TYPE_LABEL[q.type]}
                  </span>
                  <span className="rounded border px-1.5 py-0.5">{q.difficulty}</span>
                  <span className="truncate opacity-60">{test.name}</span>
                </div>
                <div className="mt-2 line-clamp-3 text-sm">
                  <MathText>{q.text}</MathText>
                </div>
              </li>
            ))}
          </ul>
          {shown.length < results.length && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="mt-3 w-full rounded-lg border py-2 text-sm font-semibold"
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </AdvancedShell>
  );
}
