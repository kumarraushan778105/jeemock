import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Play, Search } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { listTests } from "@/lib/db";
import { startAttempt } from "@/lib/attempt";
import { prepareStartMode } from "@/lib/start-mode";
import type { Question, TestSet } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Chapter Library — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Every chapter in your question bank with question counts, difficulty spread and one-click chapter practice.",
      },
      { property: "og:title", content: "Chapter Library — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Browse chapters across all imported JEE sets and launch chapter-wise practice.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const router = useRouter();
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const { subjects, chapters } = useMemo(() => {
    const map = new Map<
      string,
      {
        subject: string;
        chapter: string;
        total: number;
        easy: number;
        medium: number;
        hard: number;
        figures: number;
        items: { q: Question; test: TestSet }[];
      }
    >();
    for (const t of tests.data ?? [])
      for (const q of t.questions) {
        const key = `${q.subject}::${q.chapter}`;
        const cur = map.get(key) ?? {
          subject: q.subject,
          chapter: q.chapter,
          total: 0,
          easy: 0,
          medium: 0,
          hard: 0,
          figures: 0,
          items: [],
        };
        cur.total += 1;
        if (q.difficulty === "Easy") cur.easy += 1;
        else if (q.difficulty === "Hard") cur.hard += 1;
        else cur.medium += 1;
        cur.figures += q.images.length;
        cur.items.push({ q, test: t });
        map.set(key, cur);
      }
    const all = [...map.values()].sort(
      (a, b) => a.subject.localeCompare(b.subject) || b.total - a.total,
    );
    return { subjects: ["All", ...new Set(all.map((c) => c.subject))], chapters: all };
  }, [tests.data]);

  const visible = chapters.filter(
    (c) =>
      (subject === "All" || c.subject === subject) &&
      (!search.trim() || c.chapter.toLowerCase().includes(search.trim().toLowerCase())),
  );

  const practice = async (items: { q: Question; test: TestSet }[], name: string) => {
    const picked = items.slice(0, 30);
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const attempt = await startAttempt(picked[0].test, {
        questions: picked.map((p) => p.q),
        durationMin: Math.max(10, picked.length * 2),
        name: `Practice · ${name}`,
        mode: selectedMode,
        strictMode: selectedMode === "strict",
      });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
    });
    setModePickerOpen(true);
  };

  const handleModeSelect = async (selectedMode: StartMode) => {
    const decision = await prepareStartMode(selectedMode, {
      fullscreenSupported: !!document.fullscreenEnabled,
      isFullscreen: !!document.fullscreenElement,
      requestFullscreen: async () => {
        try {
          await document.documentElement.requestFullscreen();
          return true;
        } catch {
          return false;
        }
      },
    });
    if (!decision.ok) {
      toast.error(decision.error);
      return;
    }
    if (pendingLaunch) {
      const currentLaunch = pendingLaunch;
      setPendingLaunch(null);
      await currentLaunch(selectedMode);
    }
  };

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <BookOpen className="size-5" /> Chapter Library
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {chapters.length} chapters across {tests.data?.length ?? 0} imported sets.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chapters…"
            className="w-full rounded-lg border bg-surface py-2 pl-9 pr-3 text-sm"
          />
        </div>
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setSubject(s)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-semibold",
              subject === s ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />

      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No chapters found — import a question set first.
        </p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((c) => (
            <div key={`${c.subject}-${c.chapter}`} className="rounded-xl border bg-card p-4">
              <div className="text-[11px] font-semibold uppercase text-primary">{c.subject}</div>
              <div className="mt-0.5 truncate text-sm font-bold" title={c.chapter}>
                {c.chapter}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                <Tag>{c.total} questions</Tag>
                <Tag>{c.figures} figures</Tag>
              </div>
              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-surface">
                <span className="bg-answered" style={{ width: `${(c.easy / c.total) * 100}%` }} />
                <span className="bg-warning" style={{ width: `${(c.medium / c.total) * 100}%` }} />
                <span
                  className="bg-destructive"
                  style={{ width: `${(c.hard / c.total) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                {c.easy} easy · {c.medium} medium · {c.hard} hard
              </div>
              <button
                onClick={() => practice(c.items, c.chapter)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-surface px-3 py-2 text-xs font-semibold hover:border-primary"
              >
                <Play className="size-3.5" /> Practice chapter
              </button>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-surface px-1.5 py-0.5 text-muted-foreground">{children}</span>;
}
