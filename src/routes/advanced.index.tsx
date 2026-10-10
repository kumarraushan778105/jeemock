import { useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdvancedShell } from "@/components/advanced/AdvancedShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { advancedContext, arrangeBySubject, pickBalanced, subjectBlocks } from "@/lib/advanced";
import { startAdvancedTest } from "@/lib/advanced-start";
import { deleteAttempt, listAttempts, uid } from "@/lib/db";
import { isAdvancedAttempt } from "@/lib/advanced";
import { prepareStartMode } from "@/lib/start-mode";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advanced/")({
  head: () => ({
    meta: [
      { title: "JEE Advanced Overview — Paper 1 & Paper 2 Tests" },
      {
        name: "description",
        content:
          "Start a JEE Advanced full test (Paper 1 + Paper 2), single-paper test, resume drafts or re-attempt past papers.",
      },
      { property: "og:title", content: "JEE Advanced Overview — Paper 1 & Paper 2 Tests" },
      {
        property: "og:description",
        content: "Full test, Paper 1, Paper 2, resume management and re-attempts.",
      },
    ],
  }),
  component: AdvancedHome,
});

type Mode = "full" | "p1" | "p2";

function AdvancedHome() {
  const router = useRouter();
  const qc = useQueryClient();
  const [mode, setMode] = useState<Mode>("full");
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);

  const { data } = useQuery({ queryKey: ["adv", "ctx"], queryFn: advancedContext });
  const { data: attempts } = useQuery({
    queryKey: ["attempts"],
    queryFn: async () => (await listAttempts()).filter(isAdvancedAttempt),
  });

  const pool = data?.pool ?? [];
  const used = data?.history.used ?? new Set<string>();
  const fresh = useMemo(() => pool.filter((i) => !used.has(i.q.id)), [pool, used]);

  const resumables = (attempts ?? []).filter((a) => !a.submitted);
  const completed = (attempts ?? []).filter((a) => a.submitted).slice(0, 6);

  const start = useMutation({
    mutationFn: async (opts?: { strictMode?: boolean }) => {
      if (pool.length === 0) throw new Error("Import a JEE Advanced set first.");
      const groupId = uid("grp");
      const papers: (1 | 2)[] = mode === "full" ? [1, 2] : mode === "p1" ? [1] : [2];
      let firstId = "";
      for (const p of papers) {
        const scoped = pool.filter((i) => i.paper === p);
        const source = scoped.length >= 18 ? scoped : pool;
        const questions = pickBalanced(source, 18, { allowRepeat, used });
        if (questions.length === 0) throw new Error("No unused questions left — allow repeats.");
        const att = await startAdvancedTest({
          name: `JEE Advanced ${mode === "full" ? "Full Test" : ""} Paper ${p}`.replace(
            /\s+/g,
            " ",
          ),
          questions: arrangeBySubject(questions),
          durationMin: 180,
          paper: p,
          paperGroupId: mode === "full" ? groupId : undefined,
          strictMode: opts?.strictMode,
        });
        if (!firstId) firstId = att.id;
      }
      return firstId;
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

  const del = useMutation({
    mutationFn: (id: string) => deleteAttempt(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attempts"] });
      qc.invalidateQueries({ queryKey: ["adv"] });
      toast.success("Resume deleted — those questions are available again");
    },
  });

  const reattempt = useMutation({
    mutationFn: async (attemptId: string) => {
      const all = await listAttempts();
      const a = all.find((x) => x.id === attemptId);
      if (!a) throw new Error("Attempt not found");
      const questions = a.questionsSnapshot ?? [];
      if (questions.length === 0) throw new Error("Original questions are no longer available.");
      const att = await startAdvancedTest({
        name: `${a.testName} (Re-attempt)`,
        questions: arrangeBySubject(questions),
        durationMin: Math.round(a.durationSec / 60),
        paper: a.paper,
        reattemptOf: a.id,
      });
      return att.id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const preview = useMemo(
    () => subjectBlocks(arrangeBySubject(fresh.slice(0, 54).map((i) => i.q))),
    [fresh],
  );

  return (
    <AdvancedShell
      title="Advanced Overview"
      subtitle="Generate a full Paper 1 + Paper 2 test, single papers, or continue where you left off. Questions used in completed tests are never repeated unless you allow it."
    >
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["Advanced questions", pool.length],
          ["Unused pool", fresh.length],
          ["Completed tests", (attempts ?? []).filter((a) => a.submitted).length],
          ["In progress", resumables.length],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-xl border bg-card p-4">
            <div className="text-xs uppercase text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-bold">{value as number}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wide">Start a test</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["full", "Full Test (P1 + P2)"],
              ["p1", "Paper 1 only"],
              ["p2", "Paper 2 only"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                mode === k ? "border-primary bg-primary text-primary-foreground" : "bg-background",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={allowRepeat}
            onChange={(e) => setAllowRepeat(e.target.checked)}
          />
          Allow questions from completed tests to repeat
        </label>

        {preview.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            {preview.map((b) => (
              <span key={b.subject} className="rounded-md border px-2 py-1">
                {b.subject}: Q{b.from}–{b.to}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={launch}
          disabled={start.isPending}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {start.isPending ? "Preparing…" : "Start test"}
        </button>
      </div>

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Resume</h2>
          {resumables.length === 0 && (
            <p className="mt-2 text-sm text-muted-foreground">Nothing in progress.</p>
          )}
          <ul className="mt-3 space-y-2">
            {resumables.map((a) => (
              <li key={a.id} className="flex items-center gap-2 rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{a.testName}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.questionIds.length} questions · {Math.round(a.remainingSec / 60)} min left
                  </div>
                </div>
                <button
                  onClick={() =>
                    router.navigate({ to: "/test/$attemptId", params: { attemptId: a.id } })
                  }
                  className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Resume
                </button>
                <button
                  onClick={() => del.mutate(a.id)}
                  className="rounded-md border px-3 py-1.5 text-xs font-semibold text-destructive"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide">Recent completed</h2>
          {completed.length === 0 && (
            <p className="mt-2 text-sm text-muted-foreground">No completed Advanced tests yet.</p>
          )}
          <ul className="mt-3 space-y-2">
            {completed.map((a) => (
              <li key={a.id} className="flex items-center gap-2 rounded-lg border p-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{a.testName}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(a.submittedAt ?? a.updatedAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() =>
                    router.navigate({ to: "/result/$attemptId", params: { attemptId: a.id } })
                  }
                  className="rounded-md border px-3 py-1.5 text-xs font-semibold"
                >
                  Review
                </button>
                <button
                  onClick={() => reattempt.mutate(a.id)}
                  className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Re-attempt
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdvancedShell>
  );
}
