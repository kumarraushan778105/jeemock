import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Calculator as CalcIcon,
  Eraser,
  Flag,
  Images,
  Maximize,
  MoreVertical,
  Save,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { Calculator } from "@/components/Calculator";
import { QuestionView, type AnswerValue } from "@/components/QuestionView";
import { LazyImage } from "@/components/ImageViewer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAttempt, getTest, putAttempt } from "@/lib/db";
import { completeScheduledLiveTest, getLiveTestDraft } from "@/lib/live-tests";
import { orderQuestionsBySubject } from "@/lib/question-order";
import { BOOKMARK_TAGS } from "@/lib/advanced";
import { isMultiCorrect, optionIds } from "@/lib/question-type";
import { awardAttemptXp, xpForAttempt } from "@/lib/xp";
import { formatClock, isAnswered } from "@/lib/scoring";
import type { Attempt, Question } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Strict Mode auto-submits after this many violations. */
const STRICT_LIMIT = 3;

function isNumericalQuestion(question: Question | undefined): boolean {
  return question?.type === "integer" || question?.type === "numerical";
}

export const Route = createFileRoute("/test/$attemptId")({
  head: () => ({
    meta: [
      { title: "Test in progress — JEE CBT Platform" },
      {
        name: "description",
        content:
          "NTA-style CBT test window with countdown timer, question palette, figures gallery and scientific calculator.",
      },
      { property: "og:title", content: "Test in progress — JEE CBT Platform" },
      { property: "og:description", content: "Attempt your JEE mock in an exam-grade interface." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TestRunner,
});

function TestRunner() {
  const { attemptId } = Route.useParams();
  const router = useRouter();
  const data = useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: async () => {
      if (attemptId.startsWith("preview_")) {
        const draftId = attemptId.replace(/^preview_/, "");
        const draft = getLiveTestDraft(draftId);
        if (!draft) throw new Error("Preview draft not found");
        const questions = orderQuestionsBySubject(draft.questions);
        const attempt: Attempt = {
          id: attemptId,
          testId: draft.id,
          testName: draft.name,
          startedAt: Date.now(),
          updatedAt: Date.now(),
          durationSec: Math.max(1, draft.durationMin || draft.questions.length * 2) * 60,
          remainingSec: Math.max(1, draft.durationMin || draft.questions.length * 2) * 60,
          currentIndex: 0,
          answers: Object.fromEntries(
            questions.map((question) => [
              question.id,
              { value: null, visited: false, marked: false, bookmarked: false, timeSpent: 0 },
            ]),
          ),
          submitted: false,
          questionIds: questions.map((question) => question.id),
          questionsSnapshot: questions,
          scoring: { marks: 4, negative: 1 },
          attemptType: "normal",
          uiState: { subjectFilter: "all" },
          status: "IN_PROGRESS",
          preview: { draftId, mode: "check" },
        };
        return { attempt, questions, preview: { draftId } };
      }

      const attempt = await getAttempt(attemptId);
      if (!attempt) throw new Error("Attempt not found");
      const isScheduledLiveAttempt =
        attempt.attemptType === "live" ||
        attempt.attemptType === "missed" ||
        Boolean(attempt.scheduledTestId);
      const runnerAttempt = isScheduledLiveAttempt ? { ...attempt, mode: "nta" as const } : attempt;
      const test = await getTest(attempt.testId);
      const questions: Question[] =
        runnerAttempt.questionsSnapshot ??
        runnerAttempt.questionIds
          .map((id) => test?.questions.find((q) => q.id === id))
          .filter((q): q is Question => Boolean(q));
      if (questions.length === 0) throw new Error("This attempt has no questions available.");
      return { attempt: runnerAttempt, questions };
    },
    staleTime: 0,
    refetchOnMount: true,
    retry: false,
  });

  if (data.isLoading || data.isFetching) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Loading test…
      </div>
    );
  }
  if (data.error || !data.data) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <p className="font-semibold">Could not open this test</p>
          <p className="mt-1 text-sm text-muted-foreground">{(data.error as Error)?.message}</p>
          <button
            onClick={() => router.navigate({ to: "/" })}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <Runner
      initial={data.data.attempt}
      questions={data.data.questions}
      preview={"preview" in data.data ? data.data.preview : undefined}
    />
  );
}

function SaveIndicator({ state }: { state: "idle" | "saving" | "saved" }) {
  // fixed size + no animation: the indicator can never shift the exam layout
  return (
    <span className="hidden w-[86px] shrink-0 select-none items-center justify-center gap-1 rounded-lg border bg-surface px-2 py-1.5 text-[11px] font-semibold text-muted-foreground sm:inline-flex">
      {state === "saving" ? (
        <>
          <span className="size-1.5 rounded-full bg-warning" /> Saving
        </>
      ) : state === "saved" ? (
        <>
          <Save className="size-3 text-success" /> Saved
        </>
      ) : (
        <span className="opacity-0">Saved</span>
      )}
    </span>
  );
}

export function Runner({
  initial,
  questions,
  preview,
}: {
  initial: Attempt;
  questions: Question[];
  preview?: { draftId: string; returnTo?: string };
}) {
  const router = useRouter();
  const qc = useQueryClient();
  const isPreview = Boolean(preview);
  const [attempt, setAttempt] = useState<Attempt>(initial);
  const [index, setIndex] = useState(initial.currentIndex ?? 0);
  const [pendingAnswer, setPendingAnswer] = useState<{
    questionId: string;
    value: AnswerValue;
  } | null>(null);
  const [fullscreenActive, setFullscreenActive] = useState(
    () => typeof document !== "undefined" && Boolean(document.fullscreenElement),
  );
  const [fullscreenError, setFullscreenError] = useState<string | null>(null);
  const [showCalc, setShowCalc] = useState(Boolean(initial.uiState?.calcOpen));
  const [showFigures, setShowFigures] = useState(false);
  const [showPalette, setShowPalette] = useState(true);
  const [submitConfirmationOpen, setSubmitConfirmationOpen] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [strictWarning, setStrictWarning] = useState<{ count: number; reason: string } | null>(
    null,
  );
  const strictCount = useRef(0);
  const lastViolation = useRef(0);
  const [subjectFilter, setSubjectFilter] = useState<string>(
    initial.uiState?.subjectFilter ?? "all",
  );
  const [fontScale, setFontScale] = useState<number>(initial.uiState?.fontScale ?? 1);
  const dirty = useRef(false);
  const lastChange = useRef(0);
  const lastWrite = useRef(Date.now());
  const savedSignature = useRef("");
  const writeChain = useRef(Promise.resolve());
  const attemptRef = useRef(attempt);
  attemptRef.current = attempt;
  const indexRef = useRef(index);
  indexRef.current = index;
  const submitted = useRef(false);

  useEffect(() => {
    const syncFullscreen = () => setFullscreenActive(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    syncFullscreen();
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const enterFullscreen = async () => {
    if (!document.fullscreenEnabled) {
      setFullscreenError("Fullscreen is not supported in this browser.");
      return;
    }
    try {
      await document.documentElement.requestFullscreen();
      setFullscreenError(null);
    } catch (error) {
      console.error("[fullscreen] failed to enter fullscreen", error);
      setFullscreenError("Fullscreen permission was denied. Allow fullscreen to continue.");
    }
  };

  const persist = useCallback(
    (snapshot: Attempt) => {
      if (isPreview) {
        return Promise.resolve(snapshot);
      }
      writeChain.current = writeChain.current
        .catch(() => undefined)
        .then(() => putAttempt(snapshot));
      return writeChain.current;
    },
    [isPreview],
  );

  const syncAttemptList = useCallback(
    (snapshot: Attempt) => {
      if (isPreview || snapshot.preview) return;
      qc.setQueryData<Attempt[]>(["attempts"], (current) => {
        const attempts = current ?? [];
        const exists = attempts.some((attempt) => attempt.id === snapshot.id);
        return exists
          ? attempts.map((attempt) => (attempt.id === snapshot.id ? snapshot : attempt))
          : [snapshot, ...attempts];
      });
    },
    [isPreview, qc],
  );

  const question = questions[index];
  const answers = attempt.answers;
  useEffect(() => {
    setPendingAnswer(null);
  }, [question?.id]);
  const attemptedCount = questions.reduce(
    (count, item) => count + (isAnswered(answers[item.id]?.value) ? 1 : 0),
    0,
  );
  const subjects = useMemo(() => [...new Set(questions.map((q) => q.subject))], [questions]);

  const update = useCallback(
    (fn: (a: Attempt) => Attempt) => {
      dirty.current = true;
      lastChange.current = Date.now();
      const next = fn({ ...attemptRef.current, updatedAt: Date.now() });
      attemptRef.current = next;
      setAttempt(next);
      void persist(next);
    },
    [persist],
  );

  // persist non-critical UI state (calculator open, palette filter)
  useEffect(() => {
    update((a) => ({
      ...a,
      uiState: { ...a.uiState, calcOpen: showCalc, subjectFilter, fontScale },
    }));
  }, [showCalc, subjectFilter, fontScale, update]);

  const patchAnswer = useCallback(
    (qid: string, patch: Partial<Attempt["answers"][string]>) => {
      update((a) => ({
        ...a,
        answers: {
          ...a.answers,
          [qid]: {
            ...(a.answers[qid] ?? {
              value: null,
              visited: true,
              marked: false,
              bookmarked: false,
              timeSpent: 0,
            }),
            ...patch,
          },
        },
      }));
    },
    [update],
  );

  const savePendingAnswer = useCallback(
    (questionId: string) => {
      if (pendingAnswer?.questionId === questionId) {
        patchAnswer(questionId, { value: pendingAnswer.value });
      }
      setPendingAnswer(null);
    },
    [patchAnswer, pendingAnswer],
  );

  const clearAnswer = useCallback(
    (questionId: string) => {
      setPendingAnswer((current) => (current?.questionId === questionId ? null : current));
      patchAnswer(questionId, { value: null });
    },
    [patchAnswer],
  );

  // mark visited
  useEffect(() => {
    if (question && !attemptRef.current.answers[question.id]?.visited) {
      patchAnswer(question.id, { visited: true });
    }
  }, [question, patchAnswer]);

  // timer + per-question time tracking + autosave
  useEffect(() => {
    const tick = setInterval(() => {
      if (submitted.current) return; // never tick / overwrite a submitted attempt
      if (!isPreview && !document.fullscreenElement) return;
      const q = questions[indexRef.current];
      const a = attemptRef.current;
      {
        const remaining = Math.max(0, a.remainingSec - 1);
        const next: Attempt = {
          ...a,
          remainingSec: remaining,
          currentIndex: indexRef.current,
          updatedAt: Date.now(),
          answers: q
            ? {
                ...a.answers,
                [q.id]: {
                  ...(a.answers[q.id] ?? {
                    value: null,
                    visited: true,
                    marked: false,
                    bookmarked: false,
                    timeSpent: 0,
                  }),
                  timeSpent: (a.answers[q.id]?.timeSpent ?? 0) + 1,
                },
              }
            : a.answers,
        };
        dirty.current = true;
        lastChange.current = Date.now();
        if (remaining <= 0 && !submitted.current) {
          setTimeout(() => doSubmit(true), 0);
        }
        attemptRef.current = next;
        setAttempt(next);
      }
    }, 1000);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  /**
   * Background autosave: debounced after the last change, plus a periodic flush
   * so remaining time is persisted too. Writes are async, never block input and
   * never affect layout — only the fixed-size header indicator changes.
   */
  useEffect(() => {
    let alive = true;
    const flush = async () => {
      if (submitted.current) return; // completed attempts are immutable
      const snapshot: Attempt = { ...attemptRef.current, currentIndex: indexRef.current };
      const signature = JSON.stringify({
        a: snapshot.answers,
        i: snapshot.currentIndex,
        r: snapshot.remainingSec,
        u: snapshot.uiState,
        p: snapshot.proctor,
      });
      if (signature === savedSignature.current) return; // nothing changed → no write
      dirty.current = false;
      lastWrite.current = Date.now();
      if (alive) setSaveState("saving");
      try {
        await persist(snapshot);
        savedSignature.current = signature;
        if (alive) setSaveState("saved");
      } catch (e) {
        console.error("[autosave] failed", e);
        dirty.current = true;
        if (alive) setSaveState("idle");
      }
    };

    const loop = setInterval(() => {
      const now = Date.now();
      const debounced = dirty.current && now - lastChange.current >= 1000;
      const periodic = now - lastWrite.current >= 10000;
      if (debounced || periodic) void flush();
    }, 500);

    return () => {
      alive = false;
      clearInterval(loop);
    };
  }, []);

  useEffect(() => {
    const onLeave = () => {
      if (submitted.current || attemptRef.current.preview) return;
      const snapshot = { ...attemptRef.current, currentIndex: indexRef.current };
      void persist(snapshot).then(() => syncAttemptList(snapshot));
    };
    window.addEventListener("beforeunload", onLeave);
    return () => {
      onLeave();
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [persist, syncAttemptList]);

  // ---- exam integrity / proctoring ----
  const bumpProctor = useCallback(
    (key: "tabSwitches" | "fullscreenExits" | "blurs", message: string) => {
      update((a) => ({
        ...a,
        proctor: {
          tabSwitches: a.proctor?.tabSwitches ?? 0,
          fullscreenExits: a.proctor?.fullscreenExits ?? 0,
          blurs: a.proctor?.blurs ?? 0,
          [key]: (a.proctor?.[key] ?? 0) + 1,
        },
      }));
      toast.warning(message);
    },
    [update],
  );

  /**
   * Strict Mode: every tab switch, window switch, minimize or fullscreen exit is
   * one violation. 3 violations → the attempt is auto-submitted.
   */
  const registerViolation = useCallback(
    (reason: string) => {
      if (!attemptRef.current.strictMode || submitted.current) return;
      const now = Date.now();
      // a single tab switch fires both visibilitychange and blur — count it once
      if (now - lastViolation.current < 1200) return;
      lastViolation.current = now;
      const count = strictCount.current + 1;
      strictCount.current = count;
      setStrictWarning({ count, reason });
      if (count >= STRICT_LIMIT) {
        toast.error("Strict Mode: 3/3 violations — test submitted automatically");
        void doSubmit(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const onVisibility = () => {
      if (attemptRef.current.mode === "nta") return;
      if (document.hidden) {
        bumpProctor("tabSwitches", "Tab switch detected — this is recorded");
        registerViolation("You switched tabs or minimised the window.");
      }
    };
    const onBlur = () => {
      if (attemptRef.current.mode === "nta") return;
      bumpProctor("blurs", "Window lost focus — this is recorded");
      registerViolation("You left the exam window.");
    };
    const onFsChange = () => {
      if (attemptRef.current.mode === "nta") return;
      if (!document.fullscreenElement) {
        bumpProctor("fullscreenExits", "You exited fullscreen — this is recorded");
        registerViolation("You exited fullscreen.");
      }
    };
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
    };
  }, [bumpProctor, registerViolation]);

  const doSubmit = async (auto = false) => {
    if (isPreview) {
      submitted.current = true;
      toast.info("Preview closed — back to live test draft");
      router.navigate({
        to: "/live-tests",
        search: preview?.draftId ? { draft: preview.draftId } : undefined,
      });
      return;
    }

    // freeze the attempt first: stops the timer + autosave from resurrecting it
    if (submitted.current) return;
    submitted.current = true;
    const finished: Attempt = {
      ...attemptRef.current,
      currentIndex: indexRef.current,
      submitted: true,
      submittedAt: Date.now(),
      updatedAt: Date.now(),
      questionsSnapshot: attemptRef.current.questionsSnapshot ?? questions,
      status: "COMPLETED",
    };

    const xpEarned = await awardAttemptXp(finished, questions);
    const withXp = {
      ...finished,
      xpRewarded: (finished.xpRewarded ?? 0) + xpEarned,
      xpAwardedAt: Date.now(),
    };

    const completedAttempt = {
      ...withXp,
      resultId: withXp.id,
    };

    await persist(completedAttempt);
    syncAttemptList(completedAttempt);
    completeScheduledLiveTest({
      id: completedAttempt.id,
      scheduledTestId: completedAttempt.scheduledTestId,
      submittedAt: completedAttempt.submittedAt,
      resultId: completedAttempt.resultId,
    });
    await qc.invalidateQueries({ queryKey: ["attempts"], refetchType: "all" });
    await qc.invalidateQueries({ queryKey: ["reports"], refetchType: "all" });
    await qc.invalidateQueries({ queryKey: ["dashboardStats"], refetchType: "all" });
    qc.removeQueries({ queryKey: ["attempt", completedAttempt.id] });
    toast[auto ? "warning" : "success"](auto ? "Time up — test submitted" : "Test submitted");
    router.navigate({ to: "/result/$attemptId", params: { attemptId: withXp.id } });
  };

  const requestSubmit = () => {
    if (!submitted.current) setSubmitConfirmationOpen(true);
  };

  const confirmSubmit = () => {
    if (submitted.current) return;
    setSubmitConfirmationOpen(false);
    void doSubmit();
  };

  const go = useCallback(
    async (i: number, allowSubjectChange = false, allowSectionChange = false) => {
      let nextIndex = Math.max(0, Math.min(questions.length - 1, i));
      const currentIndex = indexRef.current;
      const currentQuestion = questions[currentIndex];
      const currentSubject = currentQuestion?.subject;
      const violatesNtaNavigationScope = (candidate: Question | undefined) =>
        (!allowSubjectChange && Boolean(currentSubject) && candidate?.subject !== currentSubject) ||
        (!allowSectionChange &&
          isNumericalQuestion(candidate) !== isNumericalQuestion(currentQuestion));

      if (attemptRef.current.mode === "nta" && violatesNtaNavigationScope(questions[nextIndex])) {
        const direction = i >= currentIndex ? 1 : -1;
        while (
          nextIndex >= 0 &&
          nextIndex < questions.length &&
          violatesNtaNavigationScope(questions[nextIndex])
        ) {
          nextIndex += direction;
        }
        if (nextIndex < 0 || nextIndex >= questions.length) return;
      }

      const snapshot: Attempt = {
        ...attemptRef.current,
        currentIndex: nextIndex,
        updatedAt: Date.now(),
      };
      indexRef.current = nextIndex;
      setIndex(nextIndex);
      attemptRef.current = snapshot;
      setAttempt(snapshot);
      dirty.current = true;
      lastChange.current = Date.now();
      setSaveState("saving");
      try {
        await persist(snapshot);
        savedSignature.current = JSON.stringify({
          a: snapshot.answers,
          i: snapshot.currentIndex,
          r: snapshot.remainingSec,
          u: snapshot.uiState,
          p: snapshot.proctor,
        });
        lastWrite.current = Date.now();
        if (attemptRef.current === snapshot) {
          dirty.current = false;
          setSaveState("saved");
        }
      } catch (error) {
        console.error("[navigation] failed to save attempt", error);
        setSaveState("idle");
        toast.error("Could not save your answer. Please try again.");
      }
    },
    [persist, questions],
  );

  const setValue = (v: AnswerValue) => setPendingAnswer({ questionId: question.id, value: v });

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "n") go(indexRef.current + 1);
      else if (e.key === "ArrowLeft" || e.key === "p") go(indexRef.current - 1);
      else if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const q = questions[indexRef.current];
        const ids = q ? optionIds(q) : [];
        const opt = ids[Number(e.key) - 1];
        if (q && opt) {
          const cur =
            pendingAnswer?.questionId === q.id
              ? pendingAnswer.value
              : attemptRef.current.answers[q.id]?.value;
          const sel = Array.isArray(cur) ? cur.map(String) : cur ? [String(cur)] : [];
          setPendingAnswer({
            questionId: q.id,
            value: isMultiCorrect(q)
              ? sel.includes(opt)
                ? sel.filter((x) => x !== opt)
                : [...sel, opt]
              : [opt],
              });
        }
      } else if (e.key === "c") {
        const q = questions[indexRef.current];
        if (q) clearAnswer(q.id);
      } else if (e.key === "m") {
        const q = questions[indexRef.current];
        if (q) patchAnswer(q.id, { marked: !attemptRef.current.answers[q.id]?.marked });
      } else if (e.key === "b") {
        const q = questions[indexRef.current];
        if (q) patchAnswer(q.id, { bookmarked: !attemptRef.current.answers[q.id]?.bookmarked });
      } else if (e.key === "k") setShowCalc((s) => !s);
      else if (e.key === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearAnswer, go, pendingAnswer, patchAnswer, questions]);

  const adjustFontScale = (delta: number) => {
    setFontScale((current) => {
      const next = Math.min(1.4, Math.max(0.8, Number((current + delta).toFixed(2))));
      update((a) => ({ ...a, uiState: { ...a.uiState, fontScale: next } }));
      return next;
    });
  };

  const counts = useMemo(() => {
    let answered = 0,
      marked = 0,
      notAnswered = 0,
      notVisited = 0;
    for (const q of questions) {
      const a = answers[q.id];
      if (!a?.visited) notVisited += 1;
      else if (isAnswered(a.value)) answered += 1;
      else notAnswered += 1;
      if (a?.marked) marked += 1;
    }
    return { answered, marked, notAnswered, notVisited };
  }, [answers, questions]);

  const figureQuestions = questions.filter((q) => q.images.length > 0);
  const lowTime = attempt.remainingSec <= 300;
  const violations =
    (attempt.proctor?.tabSwitches ?? 0) +
    (attempt.proctor?.fullscreenExits ?? 0) +
    (attempt.proctor?.blurs ?? 0);

  if (!isPreview && !fullscreenActive) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f4f8fc] px-4 text-slate-800">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl">
          <Maximize className="mx-auto size-8 text-blue-700" />
          <h1 className="mt-4 text-xl font-bold">Fullscreen required</h1>
          <p className="mt-2 text-sm text-slate-600">
            Your test will continue in fullscreen. The timer is paused until fullscreen is active.
          </p>
          {fullscreenError && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {fullscreenError}
            </p>
          )}
          {document.fullscreenEnabled ? (
            <button
              type="button"
              onClick={() => void enterFullscreen()}
              className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Enter fullscreen to continue
            </button>
          ) : (
            <p role="alert" className="mt-5 text-sm font-semibold text-red-600">
              Fullscreen is not supported in this browser, so the test cannot continue.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (attempt.mode === "nta") {
    return (
      <>
      <NtaExamScreen
        attempt={attempt}
        questions={questions}
        index={index}
        answers={answers}
        subjects={subjects}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        fontScale={fontScale}
        adjustFontScale={adjustFontScale}
        showCalc={showCalc}
        setShowCalc={setShowCalc}
        showPalette={showPalette}
        setShowPalette={setShowPalette}
        initial={initial}
        update={update}
        setValue={setValue}
        pendingAnswer={pendingAnswer}
        value={
          pendingAnswer?.questionId === question.id
            ? pendingAnswer.value
            : answers[question.id]?.value ?? null
        }
        patchAnswer={patchAnswer}
        clearAnswer={clearAnswer}
        savePendingAnswer={savePendingAnswer}
        go={go}
        requestSubmit={requestSubmit}
      />
      <SubmitConfirmationDialog
        open={submitConfirmationOpen}
        onOpenChange={setSubmitConfirmationOpen}
        total={questions.length}
        attempted={attemptedCount}
        remainingSeconds={attempt.remainingSec}
        onConfirm={confirmSubmit}
      />
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isPreview && (
        <div className="border-b bg-amber-500/10 px-4 py-2 text-center text-[11px] font-medium text-amber-700 dark:text-amber-200">
          Preview mode: temporary CBT check only. Answers and timer state are not saved.
        </div>
      )}
      {strictWarning && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-destructive">
              Strict Mode
            </div>
            <h3 className="mt-2 text-xl font-semibold">
              Warning {Math.min(strictWarning.count, STRICT_LIMIT)}/{STRICT_LIMIT}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {strictWarning.reason}{" "}
              {strictWarning.count >= STRICT_LIMIT
                ? "This was your third violation — your test has been submitted automatically."
                : `Leaving the exam again will count as another violation. The test is submitted automatically after ${STRICT_LIMIT} violations.`}
            </p>
            <button
              onClick={() => setStrictWarning(null)}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* top bar */}
      <header className="sticky top-0 z-30 border-b bg-card">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5">
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{attempt.testName}</div>
            <div className="truncate text-[11px] text-muted-foreground">
              Question {index + 1} of {questions.length} · {question.subject}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {violations > 0 && (
              <span
                title={`${attempt.proctor?.tabSwitches ?? 0} tab switches · ${attempt.proctor?.fullscreenExits ?? 0} fullscreen exits · ${attempt.proctor?.blurs ?? 0} focus losses`}
                className="rounded-lg border border-destructive/50 bg-destructive/10 px-2 py-1 text-[11px] font-semibold text-destructive"
              >
                {violations} violation{violations === 1 ? "" : "s"}
              </span>
            )}

            <SaveIndicator state={saveState} />

            <div
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-sm font-bold tabular-nums",
                lowTime ? "border-destructive bg-destructive/10 text-destructive" : "bg-surface",
              )}
            >
              {formatClock(attempt.remainingSec)}
            </div>
            <div className="flex items-center gap-1 rounded-lg border bg-surface px-2 py-1 text-sm font-semibold text-muted-foreground">
              <button
                type="button"
                onClick={() => adjustFontScale(-0.1)}
                className="grid size-7 place-items-center rounded-md hover:bg-accent"
                aria-label="Decrease text size"
              >
                A-
              </button>
              <span className="px-1 text-[10px] uppercase tracking-wide">Text size</span>
              <button
                type="button"
                onClick={() => adjustFontScale(0.1)}
                className="grid size-7 place-items-center rounded-md hover:bg-accent"
                aria-label="Increase text size"
              >
                A+
              </button>
            </div>
            <IconBtn onClick={() => setShowFigures((s) => !s)} label="Figures" active={showFigures}>
              <Images className="size-4" />
            </IconBtn>
            <IconBtn
              onClick={() => setShowCalc((s) => !s)}
              label="Calculator (K)"
              active={showCalc}
            >
              <CalcIcon className="size-4" />
            </IconBtn>
            <IconBtn
              onClick={() =>
                document.fullscreenElement
                  ? document.exitFullscreen()
                  : document.documentElement.requestFullscreen?.()
              }
              label="Fullscreen (F)"
            >
              <Maximize className="size-4" />
            </IconBtn>
            {isPreview ? (
              <button
                onClick={() => {
                  if (window.confirm("Exit preview and return to the live test draft?")) {
                    void doSubmit();
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"
              >
                <Send className="size-4" /> Exit Preview
              </button>
            ) : (
              <button
                onClick={requestSubmit}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground"
              >
                <Send className="size-4" /> Submit
              </button>
            )}
          </div>
        </div>
        <div className="h-1 w-full bg-muted">
          <div
            className={cn("h-full transition-all", lowTime ? "bg-destructive" : "bg-primary")}
            style={{ width: `${(attempt.remainingSec / attempt.durationSec) * 100}%` }}
          />
        </div>
      </header>

      <div className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* question area */}
        <div className="flex min-w-0 flex-col">
          <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6">
            <div className="mx-auto max-w-5xl">
              <QuestionView
                question={question}
                value={
                  pendingAnswer?.questionId === question.id
                    ? pendingAnswer.value
                    : answers[question.id]?.value ?? null
                }
                onChange={setValue}
                fontScale={fontScale}
              />
            </div>
          </div>

          <div className="sticky bottom-0 grid grid-cols-2 gap-2 border-t bg-card p-3 sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <ActionBtn
                onClick={() => clearAnswer(question.id)}
                icon={<Eraser className="size-4" />}
              >
                Clear <Kbd>C</Kbd>
              </ActionBtn>
              <ActionBtn
                onClick={() => patchAnswer(question.id, { marked: !answers[question.id]?.marked })}
                icon={<Flag className="size-4" />}
                active={answers[question.id]?.marked}
              >
                Review <Kbd>M</Kbd>
              </ActionBtn>
              <ActionBtn
                onClick={() =>
                  patchAnswer(question.id, { bookmarked: !answers[question.id]?.bookmarked })
                }
                icon={<Bookmark className="size-4" />}
                active={answers[question.id]?.bookmarked}
              >
                Bookmark <Kbd>B</Kbd>
              </ActionBtn>
              {answers[question.id]?.bookmarked && (
                <select
                  value={answers[question.id]?.tag ?? ""}
                  onChange={(e) => patchAnswer(question.id, { tag: e.target.value || undefined })}
                  className="rounded-lg border bg-background px-2 py-2 text-sm"
                  aria-label="Bookmark tag"
                >
                  <option value="">Tag…</option>
                  {BOOKMARK_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <ActionBtn onClick={() => go(index - 1)} icon={<ChevronLeft className="size-4" />}>
                Previous
              </ActionBtn>
              <button
                onClick={() => {
                  savePendingAnswer(question.id);
                  void go(index + 1);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Save &amp; Next <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* palette */}
        <aside className="border-t bg-surface p-4 lg:border-t-0 lg:border-l">
          <div className="mb-3 grid grid-cols-2 gap-2 text-[11px]">
            <Legend
              className="bg-answered text-answered-foreground"
              n={counts.answered}
              label="Answered"
            />
            <Legend
              className="bg-notanswered text-notanswered-foreground"
              n={counts.notAnswered}
              label="Not answered"
            />
            <Legend className="bg-marked text-marked-foreground" n={counts.marked} label="Marked" />
            <Legend
              className="bg-notvisited text-notvisited-foreground"
              n={counts.notVisited}
              label="Not visited"
            />
          </div>

          {subjects.length > 1 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {["all", ...subjects].map((s) => (
                <button
                  key={s}
                  onClick={() => setSubjectFilter(s)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    subjectFilter === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card",
                  )}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          )}

          <div className="scroll-slim grid max-h-[46vh] grid-cols-6 gap-1.5 overflow-y-auto pr-1 lg:max-h-[calc(100vh-320px)]">
            {questions.map((q, i) => {
              if (subjectFilter !== "all" && q.subject !== subjectFilter) return null;
              const a = answers[q.id];
              const ans = isAnswered(
                pendingAnswer?.questionId === q.id ? pendingAnswer.value : a?.value,
              );
              return (
                <button
                  key={q.id}
                  onClick={() => go(i)}
                  title={`Q${q.number ?? i + 1} · ${q.subject} · ${q.chapter}`}
                  className={cn(
                    "relative grid aspect-square place-items-center rounded-md border text-xs font-bold transition-transform hover:scale-105",
                    !a?.visited && "bg-notvisited text-notvisited-foreground",
                    a?.visited &&
                      !ans &&
                      !a?.marked &&
                      "bg-notanswered text-notanswered-foreground",
                    ans && !a?.marked && "bg-answered text-answered-foreground",
                    a?.marked && !ans && "bg-marked text-marked-foreground",
                    a?.marked && ans && "bg-answeredmarked text-marked-foreground",
                    i === index && "ring-2 ring-primary ring-offset-2 ring-offset-surface",
                  )}
                >
                  {q.number ?? i + 1}
                  <span className="absolute right-0.5 bottom-0.5 flex gap-px">
                    {q.flags.diagram && <Dot className="bg-physics" />}
                    {q.flags.graph && <Dot className="bg-maths" />}
                    {q.flags.table && <Dot className="bg-warning" />}
                    {q.flags.chem && <Dot className="bg-chemistry" />}
                  </span>
                  {a?.bookmarked && (
                    <Bookmark className="absolute top-0.5 left-0.5 size-2.5 fill-current opacity-80" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 space-y-1 text-[10px] text-muted-foreground">
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <Dot className="bg-physics" /> diagram
              </span>
              <span className="flex items-center gap-1">
                <Dot className="bg-maths" /> graph
              </span>
              <span className="flex items-center gap-1">
                <Dot className="bg-warning" /> table
              </span>
              <span className="flex items-center gap-1">
                <Dot className="bg-chemistry" /> chem structure
              </span>
            </div>
            <div>
              Shortcuts: 1–4 options · N/P navigate · C clear · M review · B bookmark · K calculator
              · F fullscreen
            </div>
          </div>
        </aside>
      </div>

      {showCalc && (
        <div className="fixed right-4 bottom-20 z-50">
          <Calculator
            initialExpr={initial.uiState?.calcExpr ?? ""}
            onExprChange={(calcExpr) =>
              update((a) => ({ ...a, uiState: { ...a.uiState, calcExpr } }))
            }
            onClose={() => setShowCalc(false)}
          />
        </div>
      )}

      {showFigures && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-80 flex-col border-l bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b p-3">
            <span className="text-sm font-semibold">Figures panel</span>
            <button onClick={() => setShowFigures(false)} className="text-xs text-muted-foreground">
              close
            </button>
          </div>
          <div className="scroll-slim flex-1 space-y-3 overflow-y-auto p-3">
            {figureQuestions.length === 0 && (
              <p className="text-xs text-muted-foreground">This paper has no figures.</p>
            )}
            {figureQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  go(questions.findIndex((x) => x.id === q.id));
                  setShowFigures(false);
                }}
                className="w-full rounded-lg border bg-surface p-2 text-left hover:border-primary"
              >
                <div className="grid grid-cols-3 gap-1">
                  {q.images.slice(0, 3).map((id) => (
                    <LazyImage
                      key={id}
                      id={id}
                      alt={`Q${q.number}`}
                      className="h-14 w-full object-cover rounded"
                    />
                  ))}
                </div>
                <div className="mt-1 text-[11px] font-semibold">
                  Q{q.number} · {q.subject}
                </div>
                <div className="text-[11px] text-muted-foreground">{q.chapter}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      <SubmitConfirmationDialog
        open={submitConfirmationOpen}
        onOpenChange={setSubmitConfirmationOpen}
        total={questions.length}
        attempted={attemptedCount}
        remainingSeconds={attempt.remainingSec}
        onConfirm={confirmSubmit}
      />
    </div>
  );
}

function SubmitConfirmationDialog({
  open,
  onOpenChange,
  total,
  attempted,
  remainingSeconds,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  attempted: number;
  remainingSeconds: number;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Test?</AlertDialogTitle>
          <AlertDialogDescription>
            Check your progress before submitting. You cannot change your answers afterward.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <dl className="grid grid-cols-1 gap-2 rounded-md border bg-muted/40 p-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Total Questions</dt>
            <dd className="font-semibold tabular-nums">{total}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Attempted Questions</dt>
            <dd className="font-semibold tabular-nums">{attempted}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Not Attempted Questions</dt>
            <dd className="font-semibold tabular-nums">{total - attempted}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Remaining Time</dt>
            <dd className="font-semibold tabular-nums">{formatClock(remainingSeconds)}</dd>
          </div>
        </dl>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Go Back to Test</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Submit Test</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type NtaExamScreenProps = {
  attempt: Attempt;
  questions: Question[];
  index: number;
  answers: Attempt["answers"];
  subjects: string[];
  subjectFilter: string;
  setSubjectFilter: (subject: string) => void;
  fontScale: number;
  adjustFontScale: (delta: number) => void;
  showCalc: boolean;
  setShowCalc: React.Dispatch<React.SetStateAction<boolean>>;
  showPalette: boolean;
  setShowPalette: React.Dispatch<React.SetStateAction<boolean>>;
  initial: Attempt;
  update: (fn: (attempt: Attempt) => Attempt) => void;
  setValue: (value: AnswerValue) => void;
  pendingAnswer: { questionId: string; value: AnswerValue } | null;
  value: AnswerValue;
  patchAnswer: (questionId: string, patch: Partial<Attempt["answers"][string]>) => void;
  clearAnswer: (questionId: string) => void;
  savePendingAnswer: (questionId: string) => void;
  go: (
    index: number,
    allowSubjectChange?: boolean,
    allowSectionChange?: boolean,
  ) => Promise<void>;
  requestSubmit: () => void;
};

function NtaExamScreen({
  attempt,
  questions,
  index,
  answers,
  subjects,
  subjectFilter,
  setSubjectFilter,
  fontScale,
  adjustFontScale,
  showCalc,
  setShowCalc,
  showPalette,
  setShowPalette,
  initial,
  update,
  setValue,
  pendingAnswer,
  value,
  patchAnswer,
  clearAnswer,
  savePendingAnswer,
  go,
  requestSubmit,
}: NtaExamScreenProps) {
  const question = questions[index];
  const [activeSection, setActiveSection] = useState<"mcq" | "numerical">(
    question.type === "integer" || question.type === "numerical" ? "numerical" : "mcq",
  );
  const selectedSubject = subjectFilter === "all" ? question.subject : subjectFilter;
  const subjectQuestions = questions
    .map((item, questionIndex) => ({ item, questionIndex }))
    .filter(({ item }) => item.subject === selectedSubject);
  const sectionQuestions = subjectQuestions.filter(
    ({ item }) => isNumericalQuestion(item) === (activeSection === "numerical"),
  );
  const hasNumerical = subjectQuestions.some(
    ({ item }) => item.type === "integer" || item.type === "numerical",
  );
  useEffect(() => {
    setActiveSection(
      question.type === "integer" || question.type === "numerical" ? "numerical" : "mcq",
    );
  }, [question.type]);
  const answered = sectionQuestions.filter(
    ({ item }) => isAnswered(answers[item.id]?.value) && !answers[item.id]?.marked,
  ).length;
  const notAnswered = sectionQuestions.filter(
    ({ item }) =>
      answers[item.id]?.visited &&
      !isAnswered(answers[item.id]?.value) &&
      !answers[item.id]?.marked,
  ).length;
  const notVisited = sectionQuestions.filter(({ item }) => !answers[item.id]?.visited).length;
  const marked = sectionQuestions.filter(
    ({ item }) => answers[item.id]?.marked && !isAnswered(answers[item.id]?.value),
  ).length;
  const answeredMarked = sectionQuestions.filter(
    ({ item }) => answers[item.id]?.marked && isAnswered(answers[item.id]?.value),
  ).length;
  const selectSection = (section: "mcq" | "numerical") => {
    const nextQuestion = subjectQuestions.find(({ item }) =>
      section === "numerical"
        ? item.type === "integer" || item.type === "numerical"
        : item.type !== "integer" && item.type !== "numerical",
    );
    if (!nextQuestion) return;
    setActiveSection(section);
    go(nextQuestion.questionIndex, false, true);
  };
  const selectSubject = (subject: string) => {
    const candidates = questions
      .map((item, questionIndex) => ({ item, questionIndex }))
      .filter(({ item }) => item.subject === subject);
    const nextQuestion =
      candidates.find(({ item }) =>
        activeSection === "numerical"
          ? item.type === "integer" || item.type === "numerical"
          : item.type !== "integer" && item.type !== "numerical",
      ) ?? candidates[0];
    setSubjectFilter(subject);
    if (nextQuestion) {
      setActiveSection(
        nextQuestion.item.type === "integer" || nextQuestion.item.type === "numerical"
          ? "numerical"
          : "mcq",
      );
      go(nextQuestion.questionIndex, true, true);
    }
  };
  const navigateWithinSection = (direction: -1 | 1) => {
    const candidates = direction > 0 ? sectionQuestions : [...sectionQuestions].reverse();
    const nextQuestion = candidates.find(
      ({ questionIndex }) => direction > 0 ? questionIndex > index : questionIndex < index,
    );
    if (nextQuestion) go(nextQuestion.questionIndex, false, true);
  };
  const questionType =
    question.type === "single"
      ? "Single-select MCQ"
      : question.type === "multiple"
        ? "Multiple-select MCQ"
        : question.type === "integer" || question.type === "numerical"
          ? "Numerical"
          : question.type;

  return (
    <div className="min-h-screen bg-[#f4f8fc] text-slate-800">
      <header className="flex h-10 items-center justify-between bg-[#2c6098] px-5 text-white">
        <div className="text-sm font-semibold">JEE Main Practice</div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              document.fullscreenElement
                ? document.exitFullscreen()
                : document.documentElement.requestFullscreen?.()
            }
            className="grid size-7 place-items-center hover:bg-white/10"
            aria-label="Toggle fullscreen"
            title="Toggle fullscreen"
          >
            <Maximize className="size-4" />
          </button>
          <button
            type="button"
            className="grid size-7 place-items-center text-lg leading-none hover:bg-white/10"
            aria-label="More exam options"
            title="More exam options"
          >
            <MoreVertical className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex min-h-[72px] flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <h1 className="text-xl font-bold leading-tight">{attempt.testName}</h1>
          <p className="mt-1 text-sm text-slate-500">Chapter-wise · {question.subject}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="whitespace-nowrap text-sm text-slate-600">
            Time Left :{" "}
            <strong className="ml-2 font-mono text-xl text-slate-900">
              {formatClock(attempt.remainingSec)}
            </strong>
          </div>
          <div className="flex items-center gap-1 border-l border-slate-200 pl-3 text-sm text-slate-600">
            <span className="mr-1 whitespace-nowrap text-xs">Text size</span>
            <button
              type="button"
              onClick={() => adjustFontScale(-0.1)}
              className="h-9 min-w-10 rounded border border-slate-300 bg-white px-2 font-medium hover:bg-slate-50"
              aria-label="Decrease text size"
            >
              A−
            </button>
            <button
              type="button"
              onClick={() => adjustFontScale(0.1)}
              className="h-9 min-w-10 rounded border border-slate-300 bg-white px-2 font-medium hover:bg-slate-50"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid min-h-[calc(100vh-112px)]",
          showPalette ? "xl:grid-cols-[minmax(0,1fr)_325px]" : "grid-cols-1",
        )}
      >
        <main
          className={cn(
            "flex min-w-0 flex-col bg-white",
            showPalette && "border-r border-slate-200",
          )}
        >
          <nav className="flex min-h-12 flex-wrap items-center gap-1 border-b border-slate-200 bg-[#e9f1f9] px-6 py-1">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => selectSubject(subject)}
                className={cn(
                  "min-w-24 rounded px-4 py-2 text-sm transition-colors",
                  selectedSubject === subject
                    ? "bg-[#2878c7] font-semibold text-white"
                    : "text-slate-600 hover:bg-white/70",
                )}
              >
                {subject}
              </button>
            ))}
          </nav>

          <div className="flex min-h-11 items-center justify-between gap-3 border-b border-slate-200 px-6">
            <div className="flex h-full items-center gap-6">
              <button
                type="button"
                onClick={() => selectSection("mcq")}
                disabled={
                  !subjectQuestions.some(
                    ({ item }) => item.type !== "integer" && item.type !== "numerical",
                  )
                }
                className={cn(
                  "h-full border-b-2 px-1 text-sm",
                  activeSection === "mcq"
                    ? "border-blue-600 font-semibold text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-800",
                )}
              >
                Section A - MCQ
              </button>
              {hasNumerical && (
                <button
                  type="button"
                  onClick={() => selectSection("numerical")}
                  className={cn(
                    "h-full border-b-2 px-1 text-sm",
                    activeSection === "numerical"
                      ? "border-blue-600 font-semibold text-blue-700"
                      : "border-transparent text-slate-500 hover:text-slate-800",
                  )}
                >
                  Section B - Numerical
                </button>
              )}
            </div>
            <label className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-600">
              View in :
              <select className="h-8 rounded border border-slate-300 bg-white px-2 text-sm text-slate-700">
                <option>English</option>
              </select>
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-3">
            <h2 className="text-base font-bold">Question No. {question.number ?? index + 1}</h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm">
              <span>Question Type : {questionType}</span>
              <span className="font-medium text-green-700">Marks : +{question.marks}</span>
              <span className="font-medium text-red-600">
                Negative Marks : -{question.negative}
              </span>
            </div>
          </div>

          <div
            className="min-h-[260px] flex-1 px-4 py-5 sm:px-6"
            style={{ fontSize: `${fontScale}rem` }}
          >
            <div className={cn("mx-auto w-full", showPalette ? "max-w-5xl" : "max-w-none")}>
              <QuestionView
                question={question}
                value={value}
                onChange={setValue}
                fontScale={fontScale}
              />
            </div>
          </div>

          <div className="sticky top-0 z-20 border-y border-slate-200 bg-white px-6 py-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => clearAnswer(question.id)}
                  className="rounded border border-blue-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Clear Response
                </button>
                <button
                  type="button"
                  onClick={() => {
                    patchAnswer(question.id, { marked: true });
                    navigateWithinSection(1);
                  }}
                  className="rounded border border-blue-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Mark for Review &amp; Next
                </button>
              </div>
              {!showPalette && (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPalette(true)}
                    className="rounded border border-blue-300 bg-white px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                  >
                    Show Question Palette
                  </button>
                  <NtaSubmitActions
                    goNext={() => {
                      savePendingAnswer(question.id);
                      navigateWithinSection(1);
                    }}
                    requestSubmit={requestSubmit}
                  />
                </div>
              )}
            </div>
            <div className="mt-3 flex justify-between">
              <button
                type="button"
                onClick={() => navigateWithinSection(-1)}
                className="rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-slate-50"
              >
                ‹ &nbsp; Previous
              </button>
              <button
                type="button"
                onClick={() => navigateWithinSection(1)}
                className="rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-slate-50"
              >
                Next &nbsp; ›
              </button>
            </div>
          </div>
        </main>

        {showPalette && (
          <aside className="sticky top-0 flex max-h-[calc(100vh-112px)] flex-col self-start overflow-y-auto border-l border-slate-200 bg-[#f5f9fd]">
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 border-b border-slate-200 bg-white px-5 py-4 text-xs text-slate-700">
              <NtaLegend variant="answered" count={answered} label="Answered" />
              <NtaLegend variant="not-answered" count={notAnswered} label="Not Answered" />
              <NtaLegend variant="square" count={notVisited} label="Not Visited" />
              <NtaLegend variant="circle" count={marked} label="Marked for Review" />
              <div className="col-span-2">
                <NtaLegend
                  variant="answered-marked"
                  count={answeredMarked}
                  label="Answered & Marked for Review"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-y border-[#b9cddd] bg-[#d8e6f3] px-5 py-3 text-sm text-slate-800">
              <span className="font-semibold">{selectedSubject}</span>
              <span className="text-xs text-slate-500">{sectionQuestions.length} questions</span>
            </div>
            <div className="grid grid-cols-5 justify-items-center gap-x-2 gap-y-4 px-5 py-4">
              {sectionQuestions.map(({ item, questionIndex }) => {
                const answer = answers[item.id];
                const hasAnswer = isAnswered(
                  pendingAnswer?.questionId === item.id ? pendingAnswer.value : answer?.value,
                );
                const status = answer?.marked
                  ? hasAnswer
                    ? "answered-marked"
                    : "marked"
                  : hasAnswer
                    ? "answered"
                    : answer?.visited
                      ? "not-answered"
                      : "not-visited";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      go(questionIndex, false, true);
                      setActiveSection(
                        item.type === "integer" || item.type === "numerical" ? "numerical" : "mcq",
                      );
                    }}
                    className={cn(
                      "relative grid size-8 place-items-center text-xs font-bold transition-colors",
                      status === "answered" && "bg-[#4f8d35] text-white",
                      status === "not-answered" && "bg-[#c84e20] text-white",
                      status === "marked" && "rounded-full bg-[#7952aa] text-white",
                      status === "answered-marked" && "rounded-full bg-[#7952aa] text-white",
                      status === "not-visited" &&
                        "rounded-sm border border-[#b9b9b9] bg-[#e9e9e9] text-slate-600 shadow-sm",
                      questionIndex === index &&
                        "z-10 rounded-sm ring-2 ring-[#2675b8] ring-offset-2 ring-offset-[#f5f9fd]",
                    )}
                    style={{
                      clipPath:
                        status === "answered"
                          ? "polygon(50% 0, 100% 28%, 100% 100%, 0 100%, 0 28%)"
                          : status === "not-answered"
                            ? "polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)"
                            : undefined,
                    }}
                    aria-current={questionIndex === index ? "step" : undefined}
                    title={`Question ${item.number ?? questionIndex + 1}`}
                  >
                    {item.number ?? questionIndex + 1}
                    {status === "answered-marked" && (
                      <span className="absolute right-[-2px] bottom-[-2px] grid size-3 place-items-center rounded-sm border border-white bg-green-600 text-white">
                        <Check className="size-2" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="px-5 text-xs leading-5 text-slate-500">
              {activeSection === "numerical" ? "Numerical" : "MCQ"} questions
              <br />
              Answered and marked for review responses will be evaluated.
            </div>
            <div className="px-5 pt-3">
              <button
                type="button"
                onClick={() => setShowPalette(false)}
                className="w-full rounded border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
              >
                Hide Question Palette
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-300 bg-[#edf4fa] px-5 py-4">
              <NtaSubmitActions
                goNext={() => {
                  savePendingAnswer(question.id);
                  navigateWithinSection(1);
                }}
                requestSubmit={requestSubmit}
              />
            </div>
          </aside>
        )}
      </div>

      {showCalc && (
        <div className="fixed right-4 bottom-20 z-50">
          <Calculator
            initialExpr={initial.uiState?.calcExpr ?? ""}
            onExprChange={(calcExpr) =>
              update((current) => ({ ...current, uiState: { ...current.uiState, calcExpr } }))
            }
            onClose={() => setShowCalc(false)}
          />
        </div>
      )}
    </div>
  );
}

function NtaSubmitActions({
  goNext,
  requestSubmit,
}: {
  goNext: () => void;
  requestSubmit: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={goNext}
        className="rounded bg-[#368b2c] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#2d7525]"
      >
        Save &amp; Next
      </button>
      <button
        type="button"
        onClick={requestSubmit}
        className="rounded bg-[#2465a2] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#1d548a]"
      >
        Submit Test
      </button>
    </>
  );
}

function NtaLegend({
  variant,
  count,
  label,
}: {
  variant: "answered" | "not-answered" | "square" | "circle" | "answered-marked";
  count: number;
  label: string;
}) {
  const color =
    variant === "answered"
      ? "bg-[#4f8d35] text-white"
      : variant === "not-answered"
        ? "bg-[#c84e20] text-white"
        : variant === "square"
          ? "rounded-sm border border-[#b9b9b9] bg-[#e9e9e9] text-slate-600"
          : "rounded-full bg-[#7952aa] text-white";
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "relative grid size-5 shrink-0 place-items-center text-[10px] font-bold",
          color,
          (variant === "answered" || variant === "not-answered") && "rounded-none",
        )}
        style={
          variant === "answered"
            ? { clipPath: "polygon(50% 0, 100% 28%, 100% 100%, 0 100%, 0 28%)" }
            : variant === "not-answered"
              ? { clipPath: "polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)" }
              : undefined
        }
      >
        {count}
        {variant === "answered-marked" && (
          <span className="absolute right-[-2px] bottom-[-2px] grid size-2.5 place-items-center rounded-sm border border-white bg-green-600 text-white">
            <Check className="size-1.5" />
          </span>
        )}
      </span>
      <span>{label}</span>
    </div>
  );
}

function Dot({ className }: { className: string }) {
  return <span className={cn("inline-block size-1.5 rounded-full", className)} />;
}

function Legend({ className, n, label }: { className: string; n: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn("grid size-5 place-items-center rounded text-[10px] font-bold", className)}
      >
        {n}
      </span>
      <span className="truncate text-muted-foreground">{label}</span>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "hidden size-9 place-items-center rounded-lg border transition-colors hover:bg-accent sm:grid",
        active ? "border-primary bg-primary/10 text-primary" : "bg-card",
      )}
    >
      {children}
    </button>
  );
}

function ActionBtn({
  children,
  onClick,
  icon,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-accent",
        active && "border-primary bg-primary/10 text-primary",
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="hidden rounded border bg-surface px-1 font-mono text-[10px] text-muted-foreground sm:inline">
      {children}
    </span>
  );
}
