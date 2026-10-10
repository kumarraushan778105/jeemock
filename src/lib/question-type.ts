import type { Question } from "./types";

const LETTERS = "ABCDEFGHIJKL".split("");

/**
 * Stable, unique option ids.
 * Imported sets sometimes ship options with missing or duplicated ids, which made
 * every duplicate toggle together. Falling back to the option letter keeps
 * selection and answer-key matching one-to-one.
 */
export function optionIds(q: Question): string[] {
  const used = new Set<string>();
  return q.options.map((o, i) => {
    const base = String(o.id ?? "").trim() || LETTERS[i] || String(i);
    let id = base;
    if (used.has(id)) id = LETTERS[i] ?? `${base}_${i}`;
    let n = 1;
    while (used.has(id)) id = `${base}_${n++}`;
    used.add(id);
    return id;
  });
}

/**
 * True when the question must accept more than one selection.
 * Detected from the stored answer key, so an answer-key import that adds a
 * second correct option upgrades a "single" question automatically.
 */
export function isMultiCorrect(q: Question): boolean {
  if (q.type === "integer" || q.type === "numerical" || q.matrix) return false;
  if (q.type === "multiple") return true;
  return (q.correct?.length ?? 0) > 1;
}

/** Label that reflects the detected (not just stored) question type. */
export function typeLabel(q: Question): string {
  if (isMultiCorrect(q) && q.type !== "multiple") return "Multiple Correct";
  return "";
}

/**
 * Human readable answer key of a match-the-following / matrix question.
 * Uses the stored pairs when present, otherwise the positional `correct` array.
 */
export function matrixAnswerLabel(q: Question): string {
  const rows = q.matrix?.left?.length ?? q.correct.length;
  const pairs = q.matrixPairs;
  const out: string[] = [];
  for (let i = 0; i < rows; i++) {
    const key = String(i + 1);
    const val = pairs?.[key] ?? q.correct[i];
    if (val) out.push(`${key} → ${val}`);
  }
  return out.join(", ") || "—";
}
