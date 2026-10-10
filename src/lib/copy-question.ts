import { isMultiCorrect, matrixAnswerLabel, optionIds } from "./question-type";
import { isNumericType, numericAnswerLabel } from "./validate";
import { QUESTION_TYPE_LABEL, type Question } from "./types";

export type CopyMode = "question" | "answer" | "full";
export type BulkCopyMode =
  | "questions-options-answer"
  | "questions-options"
  | "questions-only"
  | "answers-only";

export const COPY_MODE_LABEL: Record<CopyMode, string> = {
  question: "Question + Options",
  answer: "Question + Options + Answer",
  full: "Complete Question + Solution",
};

export const BULK_COPY_MODE_LABEL: Record<BulkCopyMode, string> = {
  "questions-options-answer": "Questions + Options + Answer",
  "questions-options": "Questions + Options",
  "questions-only": "Questions Only",
  "answers-only": "Answers Only",
};

export const IMAGE_NOTE =
  "Note: This question contains an uploaded image. Verify using the attached image.";

/** Plain-text table for match-the-following questions, preserving rows/columns. */
function matrixText(q: Question): string[] {
  if (!q.matrix) return [];
  const { left, right } = q.matrix;
  const rows = Math.max(left.length, right.length);
  const out = ["Column I | Column II"];
  for (let i = 0; i < rows; i++) {
    const l = left[i] ? `${i + 1}. ${left[i]}` : "";
    const r = right[i] ? `${String.fromCharCode(65 + i)}. ${right[i]}` : "";
    out.push(`${l} | ${r}`);
  }
  return out;
}

function htmlToText(html: string): string {
  return html
    .replace(/<\s*(br|\/tr)\s*\/?>/gi, "\n")
    .replace(/<\s*\/(td|th)\s*>/gi, " | ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function answerValueText(q: Question): string {
  if (isNumericType(q.type)) return numericAnswerLabel(q);
  if (q.matrix) return matrixAnswerLabel(q);
  return q.correct.map(String).join(", ") || "—";
}

export function answerLine(q: Question): string {
  if (isNumericType(q.type)) return `Answer: ${numericAnswerLabel(q)}`;
  if (q.matrix) return `Answer: ${matrixAnswerLabel(q)}`;
  const label = isMultiCorrect(q) ? "Answer (multiple correct)" : "Answer";
  return `${label}: ${answerValueText(q)}`;
}

function stripQuestionOptions(text: string): string {
  const lines = text.split("\n");
  const filtered = lines.filter((rawLine) => {
    const line = rawLine.trim();
    if (!line) return true;
    if (/^\([A-Z0-9]\)\s/.test(line)) return false;
    if (line === "(Numerical answer)") return false;
    return true;
  });
  return filtered.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Builds an AI-verification-friendly plain-text version of a question.
 * Math/chemistry stay as their original LaTeX, so symbols, sub/superscripts and
 * unicode survive the round trip into ChatGPT / Gemini / Claude.
 */
export function questionToText(q: Question, mode: CopyMode): string {
  const lines: string[] = [];
  const meta = [q.subject, q.chapter, q.topic, QUESTION_TYPE_LABEL[q.type], q.difficulty]
    .filter(Boolean)
    .join(" · ");
  lines.push(`[${meta}]`);
  lines.push(`Q${q.number}.`);
  if (q.paragraph?.trim()) lines.push(q.paragraph.trim(), "");
  if (q.text?.trim()) lines.push(q.text.trim());
  if (q.tableHtml?.trim()) lines.push("", htmlToText(q.tableHtml));
  if (q.matrix) lines.push("", ...matrixText(q));

  if (!isNumericType(q.type) && !q.matrix && q.options.length) {
    const ids = optionIds(q);
    lines.push("");
    q.options.forEach((o, i) => lines.push(`(${ids[i]}) ${o.text}`));
  }
  if (isNumericType(q.type)) lines.push("", "(Numerical answer)");

  if (mode !== "question") lines.push("", answerLine(q));

  if (mode === "full") {
    if (q.solution?.trim()) lines.push("", `Solution: ${q.solution.trim()}`);
    if (q.explanation?.trim()) lines.push("", `Explanation: ${q.explanation.trim()}`);
    if (q.formula?.trim()) lines.push("", `Formula: ${q.formula.trim()}`);
    if (q.concept?.trim()) lines.push("", `Concept: ${q.concept.trim()}`);
  }

  if (q.images.length > 0) lines.push("", IMAGE_NOTE);
  return lines.join("\n");
}

export function bulkQuestionToText(questions: Question[], mode: BulkCopyMode): string {
  const blocks = questions.map((question) => {
    switch (mode) {
      case "questions-options-answer":
        return questionToText(question, "answer");
      case "questions-options":
        return questionToText(question, "question");
      case "questions-only":
        return stripQuestionOptions(questionToText(question, "question"));
      case "answers-only":
        return `Q${question.number}. ${answerValueText(question)}`;
      default:
        return questionToText(question, "answer");
    }
  });

  return blocks.filter(Boolean).join("\n\n");
}
