import { startAttempt } from "./attempt";
import { uid } from "./db";
import type { Question, TestSet } from "./types";

/** Wraps an arbitrary set of questions into a throwaway TestSet and starts it. */
export async function startAdvancedTest(opts: {
  name: string;
  questions: Question[];
  durationMin: number;
  paper?: 1 | 2;
  paperGroupId?: string;
  reattemptOf?: string;
  strictMode?: boolean;
}) {
  const test: TestSet = {
    id: uid("advtest"),
    name: opts.name,
    subjects: [...new Set(opts.questions.map((q) => q.subject))],
    chapters: [...new Set(opts.questions.map((q) => q.chapter))],
    questionCount: opts.questions.length,
    imageCount: 0,
    missingImages: 0,
    importedAt: Date.now(),
    updatedAt: Date.now(),
    source: "custom",
    exam: "advanced",
    paper: opts.paper,
    durationMin: opts.durationMin,
    status: "valid",
    issues: [],
    questions: opts.questions,
  };
  return startAttempt(test, {
    questions: opts.questions,
    durationMin: opts.durationMin,
    name: opts.name,
    exam: "advanced",
    paper: opts.paper,
    paperGroupId: opts.paperGroupId,
    reattemptOf: opts.reattemptOf,
    strictMode: opts.strictMode,
  });
}
