import { describe, expect, it } from "vitest";
import { bulkQuestionToText, questionToText } from "@/lib/copy-question";
import type { Question } from "@/lib/types";

const chemistryQuestion: Question = {
  id: "chem-33",
  number: 33,
  subject: "Chemistry",
  chapter: "Solutions",
  topic: "Mixing of Solutions",
  difficulty: "Medium",
  type: "single",
  text:
    "[Comprehension: 2 litre of 9.8 % w/w $\\mathrm{H_{2}SO_{4}}$ (d = 1.5 gm/ml) solution is mixed with 3 litre of 1 M KOH solution.] The concentration (in molarity) of $\\mathrm{H^{+}}$ if solution is acidic or concentration of $\\mathrm{OH^{-}}$ if solution is basic in the final solution is",
  paragraph: "",
  options: [
    { id: "A", text: "0" },
    { id: "B", text: "$\\dfrac{3}{10}$" },
    { id: "C", text: "$\\dfrac{3}{5}$" },
    { id: "D", text: "$\\dfrac{2}{5}$" },
  ],
  correct: ["C"],
  marks: 4,
  negative: 1,
  images: [],
  flags: { diagram: false, graph: false, table: false, chem: true },
};

describe("copy-question", () => {
  it("keeps the exact raw LaTeX answer format used by the individual copy action", () => {
    const text = questionToText(chemistryQuestion, "answer");
    expect(text).toContain("[Chemistry · Solutions · Mixing of Solutions · Single Correct · Medium]");
    expect(text).toContain("Q33.");
    expect(text).toContain("$\\mathrm{H_{2}SO_{4}}$");
    expect(text).toContain("$\\mathrm{H^{+}}$");
    expect(text).toContain("$\\dfrac{3}{5}$");
    expect(text).toContain("Answer: C");
  });

  it("can build a bulk copy in the required question-only and answer-only variants", () => {
    const other: Question = {
      ...chemistryQuestion,
      id: "chem-34",
      number: 34,
      correct: ["A"],
      options: [
        { id: "A", text: "Yes" },
        { id: "B", text: "No" },
      ],
    };

    expect(bulkQuestionToText([chemistryQuestion, other], "questions-options-answer")).toContain(
      "Answer: C",
    );
    expect(bulkQuestionToText([chemistryQuestion, other], "questions-only")).not.toContain("(A)");
    expect(bulkQuestionToText([chemistryQuestion, other], "answers-only")).toContain("Q33. C");
    expect(bulkQuestionToText([chemistryQuestion, other], "answers-only")).toContain("Q34. A");
  });
});
