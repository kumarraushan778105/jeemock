import { numericAnswers } from "./validate";
import type { Attempt, Question, QuestionResult, TestSet } from "./types";

export function isCorrect(q: Question, value: Attempt["answers"][string]["value"]): boolean {
  if (value === null || value === undefined) return false;
  if (q.type === "integer" || q.type === "numerical") {
    const n = Number(Array.isArray(value) ? value[0] : value);
    const accepted = numericAnswers(q);
    if (Number.isNaN(n) || accepted.length === 0) return false;
    const tol = q.type === "integer" ? 0 : (q.tolerance ?? 0.01);
    return accepted.some((a) => Math.abs(n - a) <= tol);
  }
  const given = (Array.isArray(value) ? value : [value]).map(String).sort();
  const want = [...q.correct].map(String).sort();
  if (given.length === 0 || want.length === 0) return false;
  return given.length === want.length && given.every((g, i) => g === want[i]);
}

export function isAnswered(value: Attempt["answers"][string]["value"]): boolean {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  return String(value).trim() !== "";
}

export function scoreAttempt(test: TestSet, attempt: Attempt) {
  const perQuestion: QuestionResult[] = test.questions.map((q) => {
    const answer = attempt.answers[q.id];
    if (!answer || !isAnswered(answer.value)) {
      return { question: q, answer, status: "skipped" as const, score: 0 };
    }
    const ok = isCorrect(q, answer.value);
    return {
      question: q,
      answer,
      status: ok ? ("correct" as const) : ("wrong" as const),
      score: ok ? q.marks : -q.negative,
    };
  });

  const correct = perQuestion.filter((r) => r.status === "correct").length;
  const wrong = perQuestion.filter((r) => r.status === "wrong").length;
  const skipped = perQuestion.filter((r) => r.status === "skipped").length;
  const score = perQuestion.reduce((a, r) => a + r.score, 0);
  const maxScore = test.questions.reduce((a, q) => a + q.marks, 0);
  const negative = perQuestion.filter((r) => r.score < 0).reduce((a, r) => a + r.score, 0);
  const attempted = correct + wrong;
  const accuracy = attempted ? (correct / attempted) * 100 : 0;

  const group = (key: (q: Question) => string) => {
    const map = new Map<
      string,
      {
        name: string;
        correct: number;
        wrong: number;
        skipped: number;
        score: number;
        total: number;
        time: number;
      }
    >();
    for (const r of perQuestion) {
      const k = key(r.question) || "General";
      const cur = map.get(k) ?? {
        name: k,
        correct: 0,
        wrong: 0,
        skipped: 0,
        score: 0,
        total: 0,
        time: 0,
      };
      cur.total += 1;
      cur.score += r.score;
      cur.time += r.answer?.timeSpent ?? 0;
      cur[r.status] += 1;
      map.set(k, cur);
    }
    return [...map.values()].sort((a, b) => b.total - a.total);
  };

  const timeSpent = perQuestion.reduce((a, r) => a + (r.answer?.timeSpent ?? 0), 0);

  return {
    perQuestion,
    correct,
    wrong,
    skipped,
    score,
    maxScore,
    negative,
    accuracy,
    timeSpent,
    bySubject: group((q) => q.subject),
    byChapter: group((q) => q.chapter),
  };
}

export type ScoreSummary = ReturnType<typeof scoreAttempt>;

export function formatClock(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}
