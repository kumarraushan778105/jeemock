import type { Question } from "./types";

const SUBJECT_ORDER = ["chemistry", "physics", "mathematics"];

function subjectRank(subject: string) {
  const normalized = subject.trim().toLowerCase();
  const canonical = normalized === "math" || normalized === "maths" ? "mathematics" : normalized;
  const rank = SUBJECT_ORDER.indexOf(canonical);
  return rank === -1 ? SUBJECT_ORDER.length : rank;
}

export function orderQuestionsBySubject(questions: Question[]): Question[] {
  return [...questions]
    .sort((a, b) => subjectRank(a.subject) - subjectRank(b.subject) || a.number - b.number)
    .map((question, index) => ({ ...question, number: index + 1 }));
}