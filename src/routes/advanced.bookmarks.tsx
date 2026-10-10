import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { correctText } from "@/components/review/ReviewList";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { advancedHistory, BOOKMARK_TAGS, pickQuestions } from "@/lib/advanced";
import { startAdvancedTest } from "@/lib/advanced-start";
import { MathText } from "@/components/MathText";
import { prepareStartMode } from "@/lib/start-mode";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advanced/bookmarks")({
  head: () => ({
    meta: [
      { title: "JEE Advanced Bookmarks — Tagged Questions & Solutions" },
      {
        name: "description",
        content:
          "All bookmarked JEE Advanced questions with tags like Revision, Doubt, Important and Formula, plus full solutions.",
      },
      { property: "og:title", content: "JEE Advanced Bookmarks" },
      {
        property: "og:description",
        content: "Tagged Advanced bookmarks with solutions and one-click revision tests.",
      },
    ],
  }),
  component: AdvancedBookmarks,
});

function AdvancedBookmarks() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["adv", "bookmarks"], queryFn: advancedHistory });
  const [tag, setTag] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const list = useMemo(
    () => (data?.bookmarkList ?? []).filter((b) => (tag ? b.tag === tag : true)),
    [data, tag],
  );

  const start = useMutation({
    mutationFn: async (opts?: { strictMode?: boolean }) => {
      const items = list.map((b) => ({ q: b.question, test: null as never, paper: 1 as const }));
      const questions = pickQuestions(items as never, {
        count: items.length,
        allowRepeat: true,
      });
      if (questions.length === 0) throw new Error("No bookmarked questions.");
      const att = await startAdvancedTest({
        name: "JEE Advanced Bookmark Revision",
        questions,
        durationMin: Math.max(10, questions.length * 2),
        strictMode: opts?.strictMode,
      });
      return att.id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const launch = async () => {
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const id = await start.mutateAsync({
        mode: selectedMode,
        strictMode: selectedMode === "strict",
      });
      if (id) {
        qc.invalidateQueries({ queryKey: ["attempts"] });
        router.navigate({ to: "/test/$attemptId", params: { attemptId: id } });
      }
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
    <AdvancedShell
      title="Bookmarks"
      subtitle="Questions you flagged during Advanced tests, with their tags, solutions and metadata."
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => setTag(null)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs",
            tag === null ? "border-primary bg-primary text-primary-foreground" : "bg-card",
          )}
        >
          All ({data?.bookmarkList.length ?? 0})
        </button>
        {BOOKMARK_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs",
              tag === t ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {t}
          </button>
        ))}
        <button
          onClick={launch}
          disabled={list.length === 0}
          className="ml-auto rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
        >
          Revise these ({list.length})
        </button>
      </div>

      {list.length === 0 && (
        <div className="mt-4 rounded-xl border bg-card p-6 text-sm text-muted-foreground">
          No bookmarks yet — tap the bookmark icon during an Advanced test.
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {list.map((b) => (
          <li key={b.question.id} className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase text-muted-foreground">
              {b.tag && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{b.tag}</span>
              )}
              <span className="rounded border px-1.5 py-0.5">{b.question.subject}</span>
              <span className="rounded border px-1.5 py-0.5">{b.question.chapter}</span>
              {b.question.topic && (
                <span className="rounded border px-1.5 py-0.5">{b.question.topic}</span>
              )}
              {b.year && <span className="rounded border px-1.5 py-0.5">{b.year}</span>}
              <span className="rounded border px-1.5 py-0.5">{b.question.difficulty}</span>
              {b.correct !== undefined && (
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5",
                    b.correct ? "bg-status-answered/15" : "bg-destructive/15 text-destructive",
                  )}
                >
                  {b.correct ? "Correct" : "Wrong"}
                </span>
              )}
              <span className="truncate opacity-60">{b.testName}</span>
            </div>
            <div className="mt-2 text-sm">
              <MathText>{b.question.text}</MathText>
            </div>
            <button
              onClick={() => setOpen(open === b.question.id ? null : b.question.id)}
              className="mt-2 text-xs font-semibold text-primary"
            >
              {open === b.question.id ? "Hide solution" : "Show solution"}
            </button>
            {open === b.question.id && (
              <div className="mt-2 space-y-2 rounded-lg border bg-background p-3 text-sm">
                <div>
                  <span className="text-xs font-bold uppercase text-muted-foreground">Answer</span>
                  <div>{correctText(b.question)}</div>
                </div>
                {b.question.formula && (
                  <div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Formula
                    </span>
                    <MathText>{b.question.formula}</MathText>
                  </div>
                )}
                {b.question.concept && (
                  <div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Concept
                    </span>
                    <MathText>{b.question.concept}</MathText>
                  </div>
                )}
                {(b.question.solution || b.question.explanation) && (
                  <div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Solution
                    </span>
                    <MathText>{b.question.solution ?? b.question.explanation}</MathText>
                  </div>
                )}
                {b.question.altMethod && (
                  <div>
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Alternative method
                    </span>
                    <MathText>{b.question.altMethod}</MathText>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />
    </AdvancedShell>
  );
}
