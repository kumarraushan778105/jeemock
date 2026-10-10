import { optionIds } from "./question-type";
import { QUESTION_TYPE_LABEL, type Question, type QuestionType } from "./types";

/* ------------------------------------------------------------------ */
/*                    multiple numerical answers                       */
/* ------------------------------------------------------------------ */

/**
 * Parses "2", "2,3", "2.5, 3.5" (also `;`/space separated) into a de-duplicated
 * list of finite numbers. Used by the answer editor, importer and answer keys so
 * numerical questions can hold several acceptable values.
 */
export function parseNumericList(input: unknown): number[] {
  const raw: unknown[] = Array.isArray(input) ? input : [input];
  const out: number[] = [];
  for (const part of raw) {
    if (part === null || part === undefined) continue;
    for (const piece of String(part).split(/[,;|\s]+/)) {
      const t = piece.trim();
      if (!t) continue;
      const n = Number(t);
      if (!Number.isFinite(n)) continue;
      if (!out.some((x) => x === n)) out.push(n);
    }
  }
  return out;
}

/** Every accepted numerical answer of a question (legacy single value included). */
export function numericAnswers(q: Question): number[] {
  const many = q.answerValues?.filter((n) => Number.isFinite(n)) ?? [];
  const all = many.length ? [...many] : [];
  if (q.answerValue !== undefined && Number.isFinite(q.answerValue) && !all.includes(q.answerValue))
    all.push(q.answerValue);
  return all;
}

/** Human readable answer key of a numerical question. */
export function numericAnswerLabel(q: Question): string {
  const list = numericAnswers(q);
  return list.length ? list.join(", ") : "—";
}

export const isNumericType = (t: QuestionType) => t === "integer" || t === "numerical";

/* ------------------------------------------------------------------ */
/*                        question validation                          */
/* ------------------------------------------------------------------ */

export interface QuestionValidation {
  valid: boolean;
  /** why the question was rejected — shown in the UI */
  reasons: string[];
}

export const VALID_TYPES = new Set(Object.keys(QUESTION_TYPE_LABEL));

/** Normalized content signature used for duplicate detection. */
export function contentSignature(q: Question): string {
  const text = String(q.text ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  const opts = (q.options ?? [])
    .map((o) =>
      String(o?.text ?? "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim(),
    )
    .join("|");
  return `${text}##${opts}`;
}

/**
 * Validates one question. `seen` (optional) accumulates ids and content
 * signatures so duplicates inside the same pool are reported.
 */
export function validateQuestion(
  q: Question,
  seen?: { ids: Set<string>; signatures: Set<string> },
): QuestionValidation {
  const reasons: string[] = [];

  if (!q || typeof q !== "object") return { valid: false, reasons: ["Corrupted question data"] };
  if (!Array.isArray(q.options)) reasons.push("Corrupted question data (options are not a list)");

  const type = q.type;
  if (!type || !VALID_TYPES.has(type)) reasons.push(`Invalid question type "${String(type)}"`);

  const text = String(q.text ?? "").trim();
  const hasImage = Array.isArray(q.images) && q.images.length > 0;
  if (!text && !hasImage) reasons.push("Missing question text");

  const numeric = isNumericType(type);
  const matrix = Boolean(q.matrix);
  const objective = !numeric && !matrix;

  if (numeric) {
    if (numericAnswers(q).length === 0) reasons.push("Invalid or missing numerical answer");
  } else if (objective) {
    /** image-only question: the uploaded image *is* the whole question (stem + options),
     *  so typed option text is not required — only a marked correct option. */
    const imageOnly = !text && hasImage;
    const options = Array.isArray(q.options) ? q.options : [];
    const filled = options.filter(
      (o) => String(o?.text ?? "").trim() || (o?.images?.length ?? 0) > 0,
    );
    if (!imageOnly) {
      if (options.length < 2) reasons.push("Missing options (fewer than 2)");
      else if (filled.length < 2) reasons.push("Incomplete options (empty option text)");
    }

    const correct = (q.correct ?? []).map(String).filter((c) => c.trim());
    if (correct.length === 0) reasons.push("Missing correct answer");
    else if (!imageOnly && options.length >= 2) {
      const ids = new Set(optionIds(q));
      if (!correct.some((c) => ids.has(c)))
        reasons.push("Correct answer does not match any option");
    }
  } else if ((q.correct ?? []).length === 0) {
    reasons.push("Missing correct answer");
  }

  if (!Number.isFinite(q.marks)) reasons.push("Incomplete data (invalid marks)");

  if (seen) {
    const id = String(q.id ?? "");
    if (!id) reasons.push("Incomplete data (missing question id)");
    else if (seen.ids.has(id)) reasons.push("Duplicate question id");
    else seen.ids.add(id);

    if (text) {
      const sig = contentSignature(q);
      if (seen.signatures.has(sig)) reasons.push("Duplicate question");
      else seen.signatures.add(sig);
    }
  }

  return { valid: reasons.length === 0, reasons };
}

export interface ValidationReport<T> {
  valid: T[];
  invalid: { item: T; reasons: string[] }[];
  total: number;
  /** questionId → reasons, for quick lookups in the UI */
  reasonsById: Map<string, string[]>;
}

/** Validates a pool, reporting duplicates across the whole pool. */
export function validatePool<T>(items: T[], pick: (item: T) => Question): ValidationReport<T> {
  const seen = { ids: new Set<string>(), signatures: new Set<string>() };
  const report: ValidationReport<T> = {
    valid: [],
    invalid: [],
    total: items.length,
    reasonsById: new Map(),
  };
  for (const item of items) {
    const q = pick(item);
    const res = validateQuestion(q, seen);
    if (res.valid) report.valid.push(item);
    else {
      report.invalid.push({ item, reasons: res.reasons });
      report.reasonsById.set(String(q?.id ?? ""), res.reasons);
    }
  }
  return report;
}

/** Validates questions and returns only the usable ones. */
export function validQuestions(questions: Question[]): Question[] {
  return validatePool(questions, (q) => q).valid;
}

/** Valid/invalid counts for a set of questions. */
export function validationCounts(questions: Question[]) {
  const r = validatePool(questions, (q) => q);
  return { total: r.total, valid: r.valid.length, invalid: r.invalid.length };
}
