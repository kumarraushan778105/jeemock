import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, Clock3, Plus, ShieldCheck, Sparkles, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { AnswerEditor } from "@/components/bank/AnswerEditor";
import { listAttempts, listTests } from "@/lib/db";
import { startAttempt } from "@/lib/attempt";
import { addLiveAttemptToScheduled, buildLiveTestPreviewAttempt, cloneQuestionForDraft, createBlankQuestionForDraft, createLiveTestDraft, deleteLiveTestDraft, deleteScheduledLiveTest, getActiveLiveTestDraftId, getEffectiveLiveTestSyllabus, getLiveTestDraft, listScheduledLiveTests, questionAlreadyInDraft, saveLiveTestDraft, scheduleLiveTest, setActiveLiveTestDraftId, formatLiveDuration, formatLiveTestDate, formatLiveWindowRange, type LiveTestDraft, type LiveTestSyllabus, type ScheduledLiveTest } from "@/lib/live-tests";
import { bankItems, validBankItems } from "@/lib/bank";
import { validatePool } from "@/lib/validate";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/live-tests")({
  validateSearch: (search: Record<string, unknown>) => ({
    draft: typeof search.draft === "string" ? search.draft : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Live Tests — JEE CBT Platform" },
      { name: "description", content: "Upcoming, live, completed and missed scheduled JEE tests." },
    ],
  }),
  component: LiveTestsPage,
});

type TabKey = "Upcoming" | "Live Now" | "Completed" | "Missed";

function SyllabusPanel({ syllabus }: { syllabus?: LiveTestSyllabus | null }) {
  const subjects = ["Physics", "Chemistry", "Mathematics"] as const;
  const subjectStyles = {
    Physics: "border-sky-200 bg-sky-50/90 text-sky-950 dark:border-sky-800/70 dark:bg-sky-950/20 dark:text-sky-100",
    Chemistry: "border-violet-200 bg-violet-50/90 text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/20 dark:text-violet-100",
    Mathematics: "border-emerald-200 bg-emerald-50/90 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/20 dark:text-emerald-100",
  } as const;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {subjects.map((subject) => {
        const chapters = syllabus?.[subject] ?? [];
        const subjectClass = subjectStyles[subject];
        return (
          <div key={subject} className={`space-y-2 rounded-xl border p-4 shadow-sm ${subjectClass}`}>
            <h3 className="text-lg font-bold tracking-tight">{subject}</h3>
            <ul className="space-y-2 text-base font-medium leading-relaxed opacity-95">
              {chapters.length === 0 ? (
                <li className="text-current/70">—</li>
              ) : (
                chapters.map((chapter) => (
                  <li key={`${subject}-${chapter}`} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-current/80" />
                    <span className="flex-1">{chapter}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function LiveTestsPage() {
  const router = useRouter();
  const { draft: draftId } = Route.useSearch();
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const attempts = useQuery({ queryKey: ["attempts"], queryFn: listAttempts });
  const [activeDraftId, setActiveDraftId] = useState<string | null>(draftId ?? null);
  const [draft, setDraft] = useState<LiveTestDraft | null>(draftId ? getLiveTestDraft(draftId) : null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [bankFilter, setBankFilter] = useState<"all" | string>("all");
  const [creatingNewQuestion, setCreatingNewQuestion] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("Upcoming");
  const [syllabusEditorOpen, setSyllabusEditorOpen] = useState(false);
  const [draftSyllabusEditor, setDraftSyllabusEditor] = useState<LiveTestSyllabus>({});
  const [draftSyllabusInputs, setDraftSyllabusInputs] = useState<Record<string, string>>({ Physics: "", Chemistry: "", Mathematics: "" });
  const [selectedSyllabusTestId, setSelectedSyllabusTestId] = useState<string | null>(null);
  const [form, setForm] = useState({
    testName: "",
    date: new Date().toISOString().slice(0, 10),
    liveStart: "10:00",
    liveEnd: "22:00",
    durationMin: 180,
    liveWindowMode: "allow-finish" as "allow-finish" | "force-submit",
  });

  useEffect(() => {
    const activeId = draftId ?? getActiveLiveTestDraftId();
    if (!activeId) {
      setDraft(null);
      return;
    }

    const next = getLiveTestDraft(activeId);
    if (!next) {
      setActiveLiveTestDraftId(null);
      setDraft(null);
      return;
    }

    setDraft(next);
    if (draftId !== next.id) {
      router.navigate({ to: "/live-tests", search: { draft: next.id } });
    }
  }, [draftId, router]);

  useEffect(() => {
    if (draft && draft.id !== activeDraftId) {
      setActiveDraftId(draft.id);
      setActiveLiveTestDraftId(draft.id);
    }
  }, [draft, activeDraftId]);

  const bankQuestionItems = useMemo(
    () => validBankItems(bankItems(tests.data ?? [])),
    [tests.data],
  );

  const bankQuestions = useMemo(
    () =>
      bankQuestionItems.map((item) => ({
        ...item.q,
        __sourceBankName: item.test.name,
      })),
    [bankQuestionItems],
  );

  const bankOptions = useMemo(
    () => [...new Set(bankQuestionItems.map((item) => item.test.name).filter(Boolean))].sort(),
    [bankQuestionItems],
  );

  const validSummary = useMemo(() => {
    if (!draft) return { total: 0, valid: 0, invalid: 0 };
    const report = validatePool(draft.questions, (q) => q);
    return { total: report.total, valid: report.valid.length, invalid: report.invalid.length };
  }, [draft]);

  const refreshDraft = (next: LiveTestDraft | null) => {
    setDraft(next);
    if (next) {
      const saved = saveLiveTestDraft(next);
      setActiveDraftId(saved.id);
      setActiveLiveTestDraftId(saved.id);
    }
  };

  const saveDraft = (next: LiveTestDraft) => {
    const saved = saveLiveTestDraft(next);
    setDraft(saved);
    if (activeDraftId) {
      router.navigate({ to: "/live-tests", search: { draft: activeDraftId } });
    }
  };

  const validateDraftNow = () => {
    if (!draft) return;
    const report = validatePool(draft.questions, (q) => q);
    const next = {
      ...draft,
      status: report.invalid.length > 0 ? "invalid" : "valid",
      validation: {
        total: report.total,
        valid: report.valid.length,
        invalid: report.invalid.length,
        warnings: 0,
        reasons: Object.fromEntries(report.invalid.map((entry) => [String(entry.item.id), entry.reasons])),
      },
      updatedAt: Date.now(),
    } satisfies LiveTestDraft;
    setDraft(next);
    const saved = saveLiveTestDraft(next);
    setActiveDraftId(saved.id);
    setActiveLiveTestDraftId(saved.id);
    toast.success(report.invalid.length === 0 ? "Draft validated" : `${report.invalid.length} issue(s) found`);
  };

  const openCbtPreview = () => {
    if (!draft) return;
    const attempt = buildLiveTestPreviewAttempt(draft);
    router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
  };

  const saveDraftQuestion = async (updatedQuestion: Question) => {
    if (!draft) return;
    const next = {
      ...draft,
      questions: draft.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
      questionIds: draft.questions
        .map((q) => (q.id === updatedQuestion.id ? updatedQuestion.id : q.id)),
      updatedAt: Date.now(),
    };

    refreshDraft(next);
    toast.success(`Q${updatedQuestion.number} saved`);
  };

  const removeQuestion = (questionId: string) => {
    if (!draft) return;
    if (!window.confirm("Remove this question from the test?")) return;
    const next = { ...draft, questions: draft.questions.filter((q) => q.id !== questionId), questionIds: draft.questions.filter((q) => q.id !== questionId).map((q) => q.id), questionCount: draft.questions.filter((q) => q.id !== questionId).length, updatedAt: Date.now() };
    refreshDraft(next);
  };

  const addQuestion = (question: Question) => {
    if (!draft) return;
    if (questionAlreadyInDraft(draft, question)) {
      toast.error("Question already exists in this test.");
      return;
    }

    const snapshot = (question as Question & { sourceId?: string }).sourceId
      ? cloneQuestionForDraft(question)
      : { ...question, id: question.id || `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` };
    const next = {
      ...draft,
      questions: [...draft.questions, snapshot],
      questionIds: [...draft.questionIds, snapshot.id],
      questionCount: draft.questions.length + 1,
      updatedAt: Date.now(),
    };
    refreshDraft(next);
    setAddOpen(false);
    setCreatingNewQuestion(false);
    toast.success(`${question.subject} · Q${question.number} added`);
  };

  const moveQuestion = (from: number, to: number) => {
    if (!draft) return;
    const nextQ = [...draft.questions];
    const [item] = nextQ.splice(from, 1);
    nextQ.splice(to, 0, item);
    const next = { ...draft, questions: nextQ, questionIds: nextQ.map((q) => q.id), updatedAt: Date.now() };
    refreshDraft(next);
  };

  const discardDraft = () => {
    if (!draft) return;
    if (!window.confirm("Discard this unscheduled Live Test draft? This will remove the saved draft permanently.")) return;
    deleteLiveTestDraft(draft.id);
    setDraft(null);
    setActiveDraftId(null);
    setActiveLiveTestDraftId(null);
    router.navigate({ to: "/live-tests", search: { draft: undefined } });
    toast.success("Draft discarded");
  };

  const openDraftSyllabusEditor = () => {
    if (!draft) return;
    const source = draft.customSyllabus && Object.keys(draft.customSyllabus).length > 0 ? draft.customSyllabus : getEffectiveLiveTestSyllabus(draft);
    setDraftSyllabusEditor(source);
    setDraftSyllabusInputs({
      Physics: "",
      Chemistry: "",
      Mathematics: "",
    });
    setSyllabusEditorOpen(true);
  };

  const addDraftSyllabusChapter = (subject: keyof LiveTestSyllabus) => {
    const value = (draftSyllabusInputs[subject] ?? "").trim();
    if (!value) return;

    setDraftSyllabusEditor((current) => {
      const existing = [...((current[subject] ?? []) as string[])];
      const nextChapters = Array.from(new Set([...existing, value]));
      return { ...current, [subject]: nextChapters };
    });
    setDraftSyllabusInputs((current) => ({ ...current, [subject]: "" }));
  };

  const removeDraftSyllabusChapter = (subject: keyof LiveTestSyllabus, chapter: string) => {
    setDraftSyllabusEditor((current) => ({
      ...current,
      [subject]: (current[subject] ?? []).filter((item) => item !== chapter),
    }));
  };

  const saveDraftSyllabus = () => {
    if (!draft) return;
    const nextCustomSyllabus: LiveTestSyllabus = {};
    (Object.entries(draftSyllabusEditor) as Array<[string, string[]]>).forEach(([subject, chapters]) => {
      const cleaned = Array.from(new Set((chapters ?? []).map((item) => item.trim()).filter(Boolean)));
      if (cleaned.length > 0) nextCustomSyllabus[subject as keyof LiveTestSyllabus] = cleaned;
    });

    const next = {
      ...draft,
      customSyllabus: Object.keys(nextCustomSyllabus).length > 0 ? nextCustomSyllabus : undefined,
      updatedAt: Date.now(),
    };
    refreshDraft(next);
    setSyllabusEditorOpen(false);
    toast.success("Syllabus saved");
  };

  const scheduleDraft = () => {
    if (!draft) return;
    const next = { ...draft, name: form.testName || draft.name, updatedAt: Date.now() };
    const scheduled = scheduleLiveTest(next, {
      testName: form.testName || next.name,
      date: form.date,
      liveStart: form.liveStart,
      liveEnd: form.liveEnd,
      durationMin: form.durationMin,
      liveWindowMode: form.liveWindowMode,
      customSyllabus: next.customSyllabus,
    });
    setDraft(null);
    setActiveDraftId(null);
    setActiveLiveTestDraftId(null);
    router.navigate({ to: "/live-tests", search: { draft: undefined } });
    toast.success(`Live test scheduled: ${scheduled.testName}`);
  };

  useEffect(() => {
    document.body.style.overflow = scheduleOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [scheduleOpen]);

  const scheduled = listScheduledLiveTests();
  const upcoming = scheduled.filter((test) => test.status === "UPCOMING");
  const liveNow = scheduled.filter((test) => test.status === "LIVE");
  const completed = scheduled.filter((test) => test.status === "COMPLETED");
  const missed = scheduled.filter((test) => test.status === "MISSED");

  const startLiveTest = async (test: ScheduledLiveTest) => {
    const attempt = await startAttempt(
      { id: test.id, name: test.testName, durationMin: test.durationMin, questionCount: test.questionCount, questions: test.fixedQuestions, subjects: [...new Set(test.fixedQuestions.map((q) => q.subject))], chapters: [...new Set(test.fixedQuestions.map((q) => q.chapter))], importedAt: Date.now(), updatedAt: Date.now(), valid: true, source: "custom", imageCount: 0, missingImages: 0, status: "valid", issues: [] } as any,
      {
        questions: test.fixedQuestions,
        durationMin: test.durationMin,
        name: test.testName,
        attemptType: "live",
        scheduledTestId: test.id,
        liveStart: test.liveStart,
        liveEnd: test.liveEnd,
        testDurationMin: test.durationMin,
      },
    );
    addLiveAttemptToScheduled(test.id, attempt.id);
    router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
  };

  const attemptLater = async (test: ScheduledLiveTest) => {
    const attempt = await startAttempt(
      { id: test.id, name: test.testName, durationMin: test.durationMin, questionCount: test.questionCount, questions: test.fixedQuestions, subjects: [...new Set(test.fixedQuestions.map((q) => q.subject))], chapters: [...new Set(test.fixedQuestions.map((q) => q.chapter))], importedAt: Date.now(), updatedAt: Date.now(), valid: true, source: "custom", imageCount: 0, missingImages: 0, status: "valid", issues: [] } as any,
      {
        questions: test.fixedQuestions,
        durationMin: test.durationMin,
        name: test.testName,
        attemptType: "missed",
        scheduledTestId: test.id,
        liveStart: test.liveStart,
        liveEnd: test.liveEnd,
        testDurationMin: test.durationMin,
      },
    );
    addLiveAttemptToScheduled(test.id, attempt.id);
    router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
  };

  const deleteScheduledTest = (test: ScheduledLiveTest) => {
    if (test.status !== "UPCOMING") return;
    const confirmed = window.confirm("Delete this scheduled Live Test?\nThis will remove the scheduled test and its schedule.");
    if (!confirmed) return;

    deleteScheduledLiveTest(test.id);
    router.navigate({ to: "/live-tests", search: { draft: undefined } });
    toast.success(`Scheduled Live Test deleted: ${test.testName}`);
  };

  if (draft) {
    return (
      <AppShell>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Preview &amp; Check</h1>
            <p className="text-sm text-muted-foreground">Draft: {draft.name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={openCbtPreview} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">Check Test in CBT Mode</button>
            <button onClick={() => validateDraftNow()} className="rounded-lg border px-3 py-1.5 text-xs font-semibold">Check Test Again</button>
            <button onClick={discardDraft} className="rounded-lg border px-3 py-1.5 text-xs font-semibold text-destructive">Close / Discard Draft</button>
            <button onClick={() => setScheduleOpen((v) => !v)} disabled={validSummary.invalid > 0} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40">Schedule Live Test</button>
          </div>
        </div>

        <div className="mt-5 rounded-xl border bg-card p-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>{draft.questions.length} questions</span>
            <span>✓ {validSummary.valid} valid</span>
            <span>✕ {validSummary.invalid} invalid</span>
          </div>

          <div className="mt-4 flex justify-end">
            <button type="button" onClick={openDraftSyllabusEditor} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Add Syllabus</button>
          </div>

          <div className="mt-4 space-y-3">
            {draft.questions.map((question, index) => (
              <div key={question.id} className="rounded-lg border bg-surface p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold uppercase text-muted-foreground">Q{index + 1} · {question.subject}</div>
                  <div className="flex gap-2">
                    <button onClick={() => moveQuestion(index, Math.max(0, index - 1))} className="rounded border px-2 py-1 text-[10px]">↑</button>
                    <button onClick={() => moveQuestion(index, Math.min(draft.questions.length - 1, index + 1))} className="rounded border px-2 py-1 text-[10px]">↓</button>
                    <button onClick={() => setEditingQuestionId(question.id)} className="rounded border px-2 py-1 text-[10px]">Edit</button>
                    <button onClick={() => removeQuestion(question.id)} className="rounded border px-2 py-1 text-[10px] text-destructive">Remove</button>
                  </div>
                </div>
                <p className="mb-2 text-sm text-foreground">{question.text || "Question text missing"}</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-[11px] text-muted-foreground">
                  <span>Chapter: {question.chapter}</span>
                  <span>Topic: {question.topic}</span>
                  <span>Type: {question.type}</span>
                  <span>Difficulty: {question.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-semibold"><Plus className="size-4" /> Add Question</button>
        </div>

        {scheduleOpen && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setScheduleOpen(false);
            }}
          >
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between border-b bg-surface/60 p-4">
                <h2 className="text-lg font-semibold">Schedule Live Test</h2>
                <button
                  type="button"
                  onClick={() => setScheduleOpen(false)}
                  className="rounded-full border bg-background p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Close schedule form"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm"><span className="mb-1 block font-medium">Test Name</span><input value={form.testName || draft.name} onChange={(e) => setForm((s) => ({ ...s, testName: e.target.value }))} className="w-full rounded-lg border bg-surface px-3 py-2" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Date</span><input type="date" value={form.date} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} className="w-full rounded-lg border bg-surface px-3 py-2" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Live Start</span><input type="time" value={form.liveStart} onChange={(e) => setForm((s) => ({ ...s, liveStart: e.target.value }))} className="w-full rounded-lg border bg-surface px-3 py-2" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Live End</span><input type="time" value={form.liveEnd} onChange={(e) => setForm((s) => ({ ...s, liveEnd: e.target.value }))} className="w-full rounded-lg border bg-surface px-3 py-2" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Test Duration</span><input type="number" min={1} value={form.durationMin} onChange={(e) => setForm((s) => ({ ...s, durationMin: Number(e.target.value) || 1 }))} className="w-full rounded-lg border bg-surface px-3 py-2" /></label>
                  <label className="text-sm"><span className="mb-1 block font-medium">Live window behavior</span><select value={form.liveWindowMode} onChange={(e) => setForm((s) => ({ ...s, liveWindowMode: e.target.value as "allow-finish" | "force-submit" }))} className="w-full rounded-lg border bg-surface px-3 py-2"><option value="allow-finish">Allow started tests to finish</option><option value="force-submit">Force submit at live window end</option></select></label>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={() => setScheduleOpen(false)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
                  <button onClick={() => { setScheduleOpen(false); scheduleDraft(); }} disabled={validSummary.invalid > 0} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Confirm Schedule</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {syllabusEditorOpen && draft && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSyllabusEditorOpen(false);
            }}
          >
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between border-b bg-surface/60 p-4">
                <h2 className="text-lg font-semibold">Add Syllabus</h2>
                <button type="button" onClick={() => setSyllabusEditorOpen(false)} className="rounded-full border bg-background p-2 text-muted-foreground hover:text-foreground" aria-label="Close syllabus editor">
                  <X className="size-4" />
                </button>
              </div>
              <div className="max-h-[75vh] overflow-y-auto p-4">
                <div className="space-y-4">
                  {(["Physics", "Chemistry", "Mathematics"] as const).map((subject) => {
                    const availableChapters = Array.from(
                      new Set(
                        (draft.questions.filter((question) => question.subject === subject).map((question) => question.chapter).filter(Boolean) as string[]).concat(
                          (bankQuestions.filter((question) => question.subject === subject).map((question) => question.chapter).filter(Boolean) as string[]),
                        ),
                      ),
                    );
                    const chapterList = draftSyllabusEditor[subject] ?? [];
                    const editorStyles = {
                      Physics: "border-sky-200 bg-sky-50/80 dark:border-sky-800/70 dark:bg-sky-950/20",
                      Chemistry: "border-violet-200 bg-violet-50/80 dark:border-violet-800/70 dark:bg-violet-950/20",
                      Mathematics: "border-emerald-200 bg-emerald-50/80 dark:border-emerald-800/70 dark:bg-emerald-950/20",
                    } as const;

                    return (
                      <div key={subject} className={`rounded-xl border p-3 ${editorStyles[subject]}`}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <h3 className="text-base font-semibold text-foreground">{subject}</h3>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            list={`${subject}-chapter-suggestions`}
                            value={draftSyllabusInputs[subject] ?? ""}
                            onChange={(e) => setDraftSyllabusInputs((current) => ({ ...current, [subject]: e.target.value }))}
                            placeholder={`Add ${subject} chapter`}
                            className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                          />
                          <button type="button" onClick={() => addDraftSyllabusChapter(subject)} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Add</button>
                          <datalist id={`${subject}-chapter-suggestions`}>
                            {availableChapters.map((chapter) => <option key={`${subject}-${chapter}`} value={chapter} />)}
                          </datalist>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {chapterList.length === 0 ? <span className="text-sm text-muted-foreground">No chapters added</span> : chapterList.map((chapter) => (
                            <button key={`${subject}-${chapter}`} type="button" onClick={() => removeDraftSyllabusChapter(subject, chapter)} className="rounded-full border border-border bg-background px-2.5 py-1 text-sm text-foreground hover:border-destructive hover:text-destructive">
                              {chapter} ×
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button type="button" onClick={() => setSyllabusEditorOpen(false)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
                  <button type="button" onClick={saveDraftSyllabus} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Save Syllabus</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {addOpen && draft && (
          <AnswerEditor
            questions={creatingNewQuestion ? [createBlankQuestionForDraft({ number: draft.questions.length + 1, subject: draft.questions[0]?.subject ?? "Physics" })] : bankQuestions}
            title={creatingNewQuestion ? "Create New Question" : "Add Question to Live Test"}
            bankOptions={bankOptions}
            bankFilter={bankFilter}
            onBankFilterChange={setBankFilter}
            onClose={() => {
              setAddOpen(false);
              setCreatingNewQuestion(false);
              setBankFilter("all");
            }}
            onSelect={creatingNewQuestion ? undefined : async (question) => {
              addQuestion(question);
            }}
            onCreateNew={creatingNewQuestion ? undefined : () => setCreatingNewQuestion(true)}
            onSave={creatingNewQuestion ? async (question) => {
              const nextQuestion = {
                ...question,
                id: `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                number: question.number || draft.questions.length + 1,
                sourceId: undefined,
              };
              addQuestion(nextQuestion);
            } : undefined}
            saveLabel={creatingNewQuestion ? "Add to Live Test" : "Save"}
            selectedQuestionIds={draft.questions.map((q) => ((q as Question & { sourceId?: string }).sourceId ?? q.id))}
          />
        )}

        {editingQuestionId && draft && (
          <AnswerEditor
            testId={draft.id}
            focusQuestionId={editingQuestionId}
            onClose={() => setEditingQuestionId(null)}
            onSave={saveDraftQuestion}
          />
        )}
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Tests</h1>
          <p className="text-sm text-muted-foreground">Upcoming, live, completed and missed tests remain fixed to their scheduled paper.</p>
        </div>
        <Link to="/create" search={{ creationContext: "live" }} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Create Test</Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["Upcoming", "Live Now", "Completed", "Missed"] as TabKey[]).map((item) => (
          <button key={item} onClick={() => setTab(item)} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold", tab === item ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {(tab === "Upcoming" ? upcoming : tab === "Live Now" ? liveNow : tab === "Completed" ? completed : missed).length === 0 && (
          <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">No {tab.toLowerCase()} tests yet.</p>
        )}
        {(tab === "Upcoming" ? upcoming : tab === "Live Now" ? liveNow : tab === "Completed" ? completed : missed).map((test) => (
          <div key={test.id} className="rounded-xl border bg-card p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 cursor-pointer" onClick={tab === "Upcoming" ? () => setSelectedSyllabusTestId(test.id) : undefined}>
                <div className="flex items-center gap-2">
                  {tab === "Upcoming" && <Clock3 className="size-4 text-amber-500" />}
                  {tab === "Live Now" && <Sparkles className="size-4 text-red-500" />}
                  {tab === "Completed" && <CheckCircle2 className="size-4 text-green-500" />}
                  {tab === "Missed" && <AlertTriangle className="size-4 text-amber-500" />}
                  <h2 className="text-base font-semibold">{test.testName}</h2>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {formatLiveTestDate(test.liveStart)} · {formatLiveWindowRange(test.liveStart, test.liveEnd)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{test.questionCount} questions · {formatLiveDuration(test.durationMin)}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tab === "Upcoming" && (
                  <div className="flex gap-2">
                    <button disabled className="rounded-lg border px-3 py-2 text-xs font-semibold text-muted-foreground">Locked</button>
                    <button onClick={() => deleteScheduledTest(test)} className="rounded-lg border border-destructive/40 px-3 py-2 text-xs font-semibold text-destructive">Delete Test</button>
                  </div>
                )}
                {tab === "Live Now" && <button onClick={() => void startLiveTest(test)} className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Start Test</button>}
                {tab === "Completed" && <div className="rounded-lg border px-3 py-2 text-xs font-semibold">Completed</div>}
                {tab === "Missed" && <button onClick={() => void attemptLater(test)} className="rounded-lg border px-3 py-2 text-xs font-semibold">Attempt Later</button>}
              </div>
            </div>
          </div>
        ))}

        {selectedSyllabusTestId && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedSyllabusTestId(null);
            }}
          >
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_90px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between border-b bg-surface/60 p-4">
                <h2 className="text-lg font-semibold">Syllabus</h2>
                <button type="button" onClick={() => setSelectedSyllabusTestId(null)} className="rounded-full border bg-background p-2 text-muted-foreground hover:text-foreground" aria-label="Close syllabus view">
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-4">
                {(() => {
                  const selectedTest = listScheduledLiveTests().find((item) => item.id === selectedSyllabusTestId);
                  if (!selectedTest) return <p className="text-sm text-muted-foreground">No syllabus available.</p>;
                  return <SyllabusPanel syllabus={selectedTest.syllabus} />;
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
