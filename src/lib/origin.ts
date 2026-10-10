import { listTests } from "./db";

/** Where a question originally came from, so review pages can link back to the bank. */
export interface QuestionOrigin {
  testId: string;
  testName: string;
  number: number;
  questionId: string;
}

/**
 * Maps question ids to their source Question Bank set. Works even when the same
 * question is reused across many tests, because it resolves by question id.
 */
export async function originMap(questionIds: string[]): Promise<Record<string, QuestionOrigin>> {
  const want = new Set(questionIds);
  const tests = await listTests();
  const out: Record<string, QuestionOrigin> = {};
  for (const t of tests) {
    for (const q of t.questions ?? []) {
      if (!want.has(q.id) || out[q.id]) continue;
      out[q.id] = { testId: t.id, testName: t.name, number: q.number, questionId: q.id };
    }
  }
  return out;
}
