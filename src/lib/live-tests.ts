import type { Attempt, Question } from "./types";
import { applyMissedLiveTestPenalty } from "./xp";
import { orderQuestionsBySubject } from "./question-order";

export type LiveTestStatus = "UPCOMING" | "LIVE" | "COMPLETED" | "MISSED";
export type LiveWindowMode = "allow-finish" | "force-submit";

export const LIVE_TEST_SUBJECTS = ["Physics", "Chemistry", "Mathematics"] as const;
export type LiveTestSyllabus = Partial<Record<(typeof LIVE_TEST_SUBJECTS)[number], string[]>>;

export interface LiveTestDraft {
  id: string;
  name: string;
  examType: string;
  questions: Question[];
  questionIds: string[];
  questionCount: number;
  createdAt: number;
  updatedAt: number;
  durationMin: number;
  customSyllabus?: LiveTestSyllabus;
  validation?: { total: number; valid: number; invalid: number; warnings: number; reasons: Record<string, string[]> };
  status: "draft" | "warning" | "invalid" | "valid";
}

export function makeDraftQuestionId() {
  return `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createBlankQuestionForDraft(seed?: Partial<Question>): Question {
  return {
    id: makeDraftQuestionId(),
    number: seed?.number ?? 1,
    subject: seed?.subject ?? "Physics",
    chapter: seed?.chapter ?? "General",
    topic: seed?.topic ?? "",
    difficulty: seed?.difficulty ?? "Medium",
    type: seed?.type ?? "single",
    text: seed?.text ?? "",
    paragraph: seed?.paragraph,
    options: seed?.options ?? [
      { id: "A", text: "" },
      { id: "B", text: "" },
      { id: "C", text: "" },
      { id: "D", text: "" },
    ],
    correct: seed?.correct ?? [],
    answerValue: seed?.answerValue,
    answerValues: seed?.answerValues,
    tolerance: seed?.tolerance ?? 0.01,
    matrix: seed?.matrix,
    matrixPairs: seed?.matrixPairs,
    spacing: seed?.spacing,
    tableHtml: seed?.tableHtml,
    solution: seed?.solution,
    explanation: seed?.explanation,
    images: [...(seed?.images ?? [])],
    marks: seed?.marks ?? 4,
    negative: seed?.negative ?? 1,
    flags: { diagram: false, graph: false, table: false, chem: false },
    tags: seed?.tags,
    hash: seed?.hash,
    pyq: seed?.pyq,
    year: seed?.year,
    formula: seed?.formula,
    concept: seed?.concept,
    altMethod: seed?.altMethod,
    sourceId: seed?.sourceId,
  };
}

export function cloneQuestionForDraft(question: Question): Question {
  const copy = {
    ...question,
    id: makeDraftQuestionId(),
    sourceId: question.id,
    images: [...question.images],
    options: question.options.map((option) => ({
      ...option,
      images: option.images ? [...option.images] : undefined,
    })),
  } as Question;
  return copy;
}

export function questionAlreadyInDraft(draft: LiveTestDraft | null | undefined, question: Question) {
  if (!draft) return false;
  const sourceId = (question as Question & { sourceId?: string }).sourceId ?? question.id;
  return draft.questions.some((item) => {
    const itemSourceId = (item as Question & { sourceId?: string }).sourceId ?? item.id;
    return item.id === question.id || itemSourceId === sourceId || item.id === sourceId;
  });
}

export interface ScheduledLiveTestCompletion {
  resultId?: string;
  correct?: number;
  wrong?: number;
  skipped?: number;
  score?: number;
  total?: number;
  percent?: number;
}

export interface ScheduledLiveTest {
  id: string;
  draftId?: string;
  testName: string;
  examType: string;
  questionIds: string[];
  fixedQuestions: Question[];
  questionCount: number;
  durationMin: number;
  liveStart: number;
  liveEnd: number;
  createdAt: number;
  scheduledAt: number;
  status: LiveTestStatus;
  liveWindowMode: LiveWindowMode;
  allowStartedTestsToFinish: boolean;
  attempts: string[];
  syllabus: LiveTestSyllabus;
  completedAttemptId?: string;
  completedAt?: number;
  completion?: ScheduledLiveTestCompletion;
}

export function normalizeLiveTestSubject(subject: string | null | undefined) {
  const value = (subject ?? "").trim().toLowerCase();
  if (!value) return null;
  if (value === "physics") return "Physics";
  if (value === "chemistry") return "Chemistry";
  if (value === "math" || value === "mathematics" || value === "maths") return "Mathematics";
  return null;
}

export function normalizeLiveTestSyllabus(syllabus?: LiveTestSyllabus | null): LiveTestSyllabus {
  const next: LiveTestSyllabus = {};
  if (!syllabus) return next;

  for (const subject of LIVE_TEST_SUBJECTS) {
    const list = syllabus[subject] ?? [];
    const unique = Array.from(new Set((list ?? []).map((item) => item?.trim()).filter(Boolean))) as string[];
    if (unique.length > 0) next[subject] = unique;
  }
  return next;
}

export function deriveLiveTestSyllabus(questions: Question[]): LiveTestSyllabus {
  const grouped: Partial<Record<(typeof LIVE_TEST_SUBJECTS)[number], string[]>> = {};

  for (const question of questions) {
    const subject = normalizeLiveTestSubject(question.subject);
    if (!subject) continue;
    const chapter = (question.chapter ?? "").trim();
    if (!chapter) continue;
    if (!grouped[subject]) grouped[subject] = [];
    if (!grouped[subject]?.includes(chapter)) grouped[subject]?.push(chapter);
  }

  return normalizeLiveTestSyllabus(grouped as LiveTestSyllabus);
}

export function getEffectiveLiveTestSyllabus(draft: { customSyllabus?: LiveTestSyllabus; questions: Question[] }) {
  const custom = normalizeLiveTestSyllabus(draft.customSyllabus);
  if (Object.keys(custom).length > 0) return custom;
  return deriveLiveTestSyllabus(draft.questions);
}

export function parseCustomSyllabusInput(value: string): LiveTestSyllabus {
  const next: LiveTestSyllabus = {};
  const lines = value.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const parts = trimmed.split(":");
    const subjectLabel = (parts.shift() ?? "").trim();
    const subject = normalizeLiveTestSubject(subjectLabel);
    if (!subject) continue;

    const chapters = (parts.join(":") || trimmed)
      .split(/[,;|]/)
      .map((chapter) => chapter.trim())
      .filter(Boolean);

    if (chapters.length === 0) continue;
    next[subject] = Array.from(new Set([...(next[subject] ?? []), ...chapters]));
  }

  return normalizeLiveTestSyllabus(next);
}

export function formatCustomSyllabusInput(syllabus?: LiveTestSyllabus | null) {
  const normalized = normalizeLiveTestSyllabus(syllabus);
  return LIVE_TEST_SUBJECTS.map((subject) => {
    const chapters = normalized[subject] ?? [];
    if (!chapters.length) return "";
    return `${subject}: ${chapters.join(", ")}`;
  }).filter(Boolean).join("\n");
}

export function cloneQuestionSnapshot(question: Question): Question {
  if (typeof structuredClone === "function") {
    return structuredClone(question);
  }
  return JSON.parse(JSON.stringify(question)) as Question;
}

export function liveTestPreviewAttemptId(draftId: string) {
  return `preview_${draftId}`;
}

export function buildLiveTestPreviewAttempt(draft: LiveTestDraft): Attempt {
  const questions = orderQuestionsBySubject(draft.questions);
  const durationSec = Math.max(1, Math.round((draft.durationMin || 180) * 60));
  const answers = Object.fromEntries(
    questions.map((question) => [
      question.id,
      { value: null, visited: false, marked: false, bookmarked: false, timeSpent: 0 },
    ]),
  );

  return {
    id: liveTestPreviewAttemptId(draft.id),
    testId: draft.id,
    testName: draft.name,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    durationSec,
    remainingSec: durationSec,
    currentIndex: 0,
    answers,
    submitted: false,
    questionIds: questions.map((question) => question.id),
    questionsSnapshot: questions,
    scoring: { marks: 4, negative: 1 },
    attemptType: "normal",
    status: "PREVIEW",
    preview: { draftId: draft.id, mode: "check" },
  };
}

const DRAFT_KEY = "cbt_live_test_drafts";
const ACTIVE_DRAFT_KEY = "cbt_live_test_active_draft";
const SCHEDULED_KEY = "cbt_live_tests";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getActiveLiveTestDraftId() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ACTIVE_DRAFT_KEY) ?? null;
  } catch {
    return null;
  }
}

export function setActiveLiveTestDraftId(id: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (!id) {
      window.localStorage.removeItem(ACTIVE_DRAFT_KEY);
      return;
    }
    window.localStorage.setItem(ACTIVE_DRAFT_KEY, id);
  } catch {
    // ignore storage write failures to avoid wiping runtime draft state
  }
}

export function createLiveTestDraft(questions: Question[], name: string, examType = "JEE Main") {
  const orderedQuestions = orderQuestionsBySubject(questions);
  const draft: LiveTestDraft = {
    id: `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: name || "Live Test Draft",
    examType,
    questions: orderedQuestions,
    questionIds: orderedQuestions.map((q) => q.id),
    questionCount: orderedQuestions.length,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    durationMin: questions.length ? 180 : 0,
    customSyllabus: undefined,
    status: "draft",
  };
  const list = read<LiveTestDraft[]>(DRAFT_KEY, []);
  write(DRAFT_KEY, [...list, draft]);
  setActiveLiveTestDraftId(draft.id);
  return draft;
}

export function listLiveTestDrafts(): LiveTestDraft[] {
  return read<LiveTestDraft[]>(DRAFT_KEY, []);
}

export function getLiveTestDraft(id: string): LiveTestDraft | null {
  return listLiveTestDrafts().find((draft) => draft.id === id) ?? null;
}

export function saveLiveTestDraft(draft: LiveTestDraft) {
  const list = listLiveTestDrafts();
  const next = list.filter((item) => item.id !== draft.id);
  const questions = orderQuestionsBySubject(draft.questions);
  const saved = {
    ...draft,
    questions,
    questionIds: questions.map((question) => question.id),
    questionCount: questions.length,
    customSyllabus: normalizeLiveTestSyllabus(draft.customSyllabus),
    updatedAt: Date.now(),
  };
  next.push(saved);
  write(DRAFT_KEY, next);
  setActiveLiveTestDraftId(saved.id);
  return saved;
}

export function deleteLiveTestDraft(id: string) {
  const list = listLiveTestDrafts().filter((draft) => draft.id !== id);
  write(DRAFT_KEY, list);
  const activeId = getActiveLiveTestDraftId();
  if (activeId === id) setActiveLiveTestDraftId(null);
}

export function deleteScheduledLiveTest(id: string) {
  const list = read<ScheduledLiveTest[]>(SCHEDULED_KEY, []);
  const target = list.find((test) => test.id === id);
  const remaining = list.filter((test) => test.id !== id);
  write(SCHEDULED_KEY, remaining);

  if (target?.draftId) {
    const draftList = listLiveTestDrafts();
    const stillUsedByAnotherTest = remaining.some((test) => test.draftId === target.draftId);
    if (!stillUsedByAnotherTest) {
      deleteLiveTestDraft(target.draftId);
    }
  }

  return remaining;
}

export function listScheduledLiveTests(): ScheduledLiveTest[] {
  const list = read<ScheduledLiveTest[]>(SCHEDULED_KEY, []);
  const now = Date.now();
  const processed = list.map((item) => {
    const syllabus = normalizeLiveTestSyllabus(item.syllabus ?? deriveLiveTestSyllabus(item.fixedQuestions ?? []));
    const next = { ...item, syllabus };
    if (item.status === "COMPLETED") return next;
    if (now < item.liveStart) return { ...next, status: "UPCOMING" };
    if (now <= item.liveEnd) return { ...next, status: "LIVE" };

    const missed = { ...next, status: "MISSED" as const };
    if (item.status === "MISSED" || next.attempts.length > 0) return missed;

    applyMissedLiveTestPenalty(next.id, 10);
    return missed;
  });

  write(SCHEDULED_KEY, processed);
  return processed;
}

export function listUpcomingLiveTests(): ScheduledLiveTest[] {
  return [...listScheduledLiveTests()]
    .filter((test) => test.status === "UPCOMING" || test.status === "LIVE")
    .sort((a, b) => {
      const aLive = a.status === "LIVE";
      const bLive = b.status === "LIVE";
      if (aLive !== bLive) return aLive ? -1 : 1;
      return a.liveStart - b.liveStart;
    });
}

export function getScheduledLiveTest(id: string): ScheduledLiveTest | null {
  return listScheduledLiveTests().find((test) => test.id === id) ?? null;
}

export function scheduleLiveTest(draft: LiveTestDraft, input: {
  testName: string;
  date: string;
  liveStart: string;
  liveEnd: string;
  durationMin: number;
  liveWindowMode?: LiveWindowMode;
  customSyllabus?: LiveTestSyllabus;
}) {
  const now = Date.now();
  const start = new Date(`${input.date}T${input.liveStart}`).getTime();
  const end = new Date(`${input.date}T${input.liveEnd}`).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    throw new Error("Invalid live test window");
  }

  const questions = orderQuestionsBySubject(draft.questions);
  const syllabus = normalizeLiveTestSyllabus(input.customSyllabus ?? draft.customSyllabus ?? deriveLiveTestSyllabus(questions));
  const fixedQuestions = questions.map((question) => cloneQuestionSnapshot(question));

  const scheduled: ScheduledLiveTest = {
    id: `live_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    draftId: draft.id,
    testName: input.testName || draft.name,
    examType: draft.examType,
    questionIds: questions.map((question) => question.id),
    fixedQuestions,
    questionCount: questions.length,
    durationMin: Math.max(1, Number(input.durationMin) || draft.durationMin || 180),
    liveStart: start,
    liveEnd: end,
    createdAt: now,
    scheduledAt: now,
    status: now < start ? "UPCOMING" : now <= end ? "LIVE" : "MISSED",
    liveWindowMode: input.liveWindowMode ?? "allow-finish",
    allowStartedTestsToFinish: input.liveWindowMode !== "force-submit",
    attempts: [],
    syllabus,
  };

  const list = read<ScheduledLiveTest[]>(SCHEDULED_KEY, []);
  write(SCHEDULED_KEY, [scheduled, ...list]);
  deleteLiveTestDraft(draft.id);
  return scheduled;
}

export function updateScheduledLiveTestStatus(testId: string, status: LiveTestStatus) {
  const list = read<ScheduledLiveTest[]>(SCHEDULED_KEY, []);
  const next = list.map((test) => (test.id === testId ? { ...test, status } : test));
  write(SCHEDULED_KEY, next);
}

export function getLiveTestStatus(test: ScheduledLiveTest, now = Date.now()) {
  if (test.status === "COMPLETED") return "COMPLETED";
  if (now < test.liveStart) return "UPCOMING";
  if (now <= test.liveEnd) return "LIVE";
  return "MISSED";
}

export function canAttemptScheduledTest(test: ScheduledLiveTest, now = Date.now()) {
  if (test.status === "COMPLETED") return false;
  return now >= test.liveStart && now <= test.liveEnd;
}

export function cloneDraftToFixedTest(draft: LiveTestDraft) {
  const questions = orderQuestionsBySubject(draft.questions);
  return {
    ...draft,
    questions,
    fixedQuestions: questions.map((question) => cloneQuestionSnapshot(question)),
    questionIds: questions.map((question) => question.id),
    questionCount: questions.length,
  };
}

export function formatLiveTestDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatLiveWindowRange(start: number, end: number) {
  return `${new Date(start).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })} – ${new Date(end).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

export function formatLiveClock(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatLiveDuration(mins: number) {
  return `${mins} minutes`;
}

export function addLiveAttemptToScheduled(testId: string, attemptId: string) {
  const list = read<ScheduledLiveTest[]>(SCHEDULED_KEY, []);
  const next = list.map((test) =>
    test.id === testId ? { ...test, attempts: [...new Set([...test.attempts, attemptId])] } : test,
  );
  write(SCHEDULED_KEY, next);
}

export function completeScheduledLiveTest(attempt: {
  id: string;
  scheduledTestId?: string;
  submittedAt?: number;
  resultId?: string;
  correct?: number;
  wrong?: number;
  skipped?: number;
  score?: number;
  total?: number;
  percent?: number;
}) {
  if (!attempt.scheduledTestId) return null;

  const list = read<ScheduledLiveTest[]>(SCHEDULED_KEY, []);
  const next = list.map((test) => {
    if (test.id !== attempt.scheduledTestId) return test;
    const completedAt = attempt.submittedAt ?? Date.now();
    const completion: ScheduledLiveTestCompletion = {
      resultId: attempt.resultId ?? attempt.id,
      correct: attempt.correct,
      wrong: attempt.wrong,
      skipped: attempt.skipped,
      score: attempt.score,
      total: attempt.total,
      percent: attempt.percent,
    };

    return {
      ...test,
      status: "COMPLETED" as const,
      attempts: [...new Set([...test.attempts, attempt.id])],
      completedAttemptId: attempt.id,
      completedAt,
      completion,
    };
  });

  write(SCHEDULED_KEY, next);
  return next.find((test) => test.id === attempt.scheduledTestId) ?? null;
}

export function markScheduledLiveTestCompleted(testId: string) {
  updateScheduledLiveTestStatus(testId, "COMPLETED");
}
