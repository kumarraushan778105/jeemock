import { getTest, listAttempts, listTests } from "./db";
import { isAnswered, scoreAttempt } from "./scoring";
import type { Attempt, Question, TestSet } from "./types";

export async function questionsForAttempt(attempt: Attempt): Promise<Question[]> {
  if (attempt.questionsSnapshot?.length) return attempt.questionsSnapshot;
  const test = await getTest(attempt.testId);
  return attempt.questionIds
    .map((id) => test?.questions.find((q) => q.id === id))
    .filter((q): q is Question => Boolean(q));
}

export function asTest(questions: Question[], attempt: Attempt): TestSet {
  return {
    id: attempt.testId,
    name: attempt.testName,
    subjects: [...new Set(questions.map((q) => q.subject))],
    chapters: [...new Set(questions.map((q) => q.chapter))],
    questionCount: questions.length,
    imageCount: 0,
    missingImages: 0,
    importedAt: attempt.startedAt,
    updatedAt: attempt.updatedAt,
    source: "custom",
    durationMin: Math.round(attempt.durationSec / 60),
    status: "valid",
    issues: [],
    questions,
  };
}

export interface AttemptReport {
  attempt: Attempt;
  questions: Question[];
  summary: ReturnType<typeof scoreAttempt>;
}

export async function buildReport(attempt: Attempt): Promise<AttemptReport> {
  const questions = await questionsForAttempt(attempt);
  return { attempt, questions, summary: scoreAttempt(asTest(questions, attempt), attempt) };
}

export async function allReports(): Promise<AttemptReport[]> {
  const attempts = (await listAttempts()).filter((a) => a.submitted);
  return Promise.all(attempts.map(buildReport));
}

/** consecutive days (ending today or yesterday) with at least one submission */
export function streakFromAttempts(attempts: Attempt[]): number {
  const days = new Set(
    attempts
      .filter((a) => a.submitted)
      .map((a) => new Date(a.submittedAt ?? a.updatedAt).toDateString()),
  );
  if (days.size === 0) return 0;
  const d = new Date();
  if (!days.has(d.toDateString())) {
    d.setDate(d.getDate() - 1);
    if (!days.has(d.toDateString())) return 0;
  }
  let streak = 0;
  while (days.has(d.toDateString())) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export async function dashboardStats() {
  const [tests, attempts] = await Promise.all([listTests(), listAttempts()]);
  const submitted = attempts.filter((a) => a.submitted);
  const reports = await Promise.all(submitted.map(buildReport));

  let correct = 0;
  let attemptedQ = 0;
  let totalTime = 0;
  let answeredCount = 0;
  for (const r of reports) {
    correct += r.summary.correct;
    attemptedQ += r.summary.correct + r.summary.wrong;
    totalTime += r.summary.timeSpent;
    answeredCount += r.questions.filter((q) => isAnswered(r.attempt.answers[q.id]?.value)).length;
  }

  return {
    tests,
    attempts,
    reports,
    testsGiven: submitted.length,
    bankCount: tests.length,
    totalQuestions: tests.reduce((a, t) => a + t.questionCount, 0),
    totalImages: tests.reduce((a, t) => a + t.imageCount, 0),
    accuracy: attemptedQ ? (correct / attemptedQ) * 100 : 0,
    avgTimePerQuestion: answeredCount ? totalTime / answeredCount : 0,
    streak: streakFromAttempts(attempts),
  };
}
