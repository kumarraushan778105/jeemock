import { bumpUsage, putAttempt, uid } from "./db";
import { orderQuestionsBySubject } from "./question-order";
import type { Attempt, ExamKind, Question, TestSet } from "./types";

export async function startAttempt(
  test: TestSet,
  opts?: {
    questions?: Question[];
    durationMin?: number;
    name?: string;
    exam?: ExamKind;
    paper?: 1 | 2;
    paperGroupId?: string;
    reattemptOf?: string;
    strictMode?: boolean;
    mode?: "normal" | "strict" | "nta";
    attemptType?: "live" | "missed" | "normal";
    scheduledTestId?: string;
    liveStart?: number;
    liveEnd?: number;
    testDurationMin?: number;
  },
): Promise<Attempt> {
  const selectedQuestions = opts?.questions ?? test.questions;
  const isLiveAttempt = opts?.attemptType === "live" || opts?.attemptType === "missed";
  const questions = isLiveAttempt ? orderQuestionsBySubject(selectedQuestions) : selectedQuestions;
  const durationSec = Math.round((opts?.durationMin ?? test.durationMin) * 60);
  const attempt: Attempt = {
    id: uid("att"),
    testId: test.id,
    testName: opts?.name ?? test.name,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    durationSec,
    remainingSec: durationSec,
    currentIndex: 0,
    answers: Object.fromEntries(
      questions.map((q) => [
        q.id,
        { value: null, visited: false, marked: false, bookmarked: false, timeSpent: 0 },
      ]),
    ),
    submitted: false,
    questionIds: questions.map((q) => q.id),
    questionsSnapshot: opts?.questions ? questions : undefined,
    scoring: { marks: 4, negative: 1 },
    exam: opts?.exam,
    paper: opts?.paper,
    paperGroupId: opts?.paperGroupId,
    reattemptOf: opts?.reattemptOf,
    strictMode: opts?.strictMode ?? false,
    mode: opts?.mode ?? (opts?.strictMode ? "strict" : "normal"),
    attemptType: opts?.attemptType ?? "normal",
    scheduledTestId: opts?.scheduledTestId,
    liveStart: opts?.liveStart,
    liveEnd: opts?.liveEnd,
    testDurationMin: opts?.testDurationMin,
    status: "IN_PROGRESS",
  };
  await putAttempt(attempt);
  // question history — least-used questions are picked first in future tests
  await bumpUsage(questions.map((q) => q.id));
  return attempt;
}
