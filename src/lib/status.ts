import { isAnswered } from "./scoring";
import type { Attempt } from "./types";

/**
 * Test Status Engine.
 *
 *  draft        — attempt created, nothing touched yet
 *  in-progress  — started, not submitted  → only place it may appear is "Resume"
 *  completed    — submitted               → only History / Analytics
 */
export type TestStatus = "draft" | "in-progress" | "completed";

export const STATUS_LABEL: Record<TestStatus, string> = {
  draft: "Draft",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function attemptStatus(a: Attempt): TestStatus {
  if (a.submitted || a.submittedAt) return "completed";
  const touched =
    a.remainingSec < a.durationSec ||
    Object.values(a.answers ?? {}).some((x) => x?.visited || isAnswered(x?.value ?? null));
  return touched ? "in-progress" : "draft";
}

export const isCompleted = (a: Attempt) => attemptStatus(a) === "completed";
/** draft + in-progress attempts are resumable; submitted ones never are */
export const isResumable = (a: Attempt) => attemptStatus(a) !== "completed";
