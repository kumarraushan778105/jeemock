import { describe, expect, it } from "vitest";
import { selectValidBankQuestions } from "./bank-test";
import type { Question } from "./types";

function question(id: string, text = `Question ${id}`): Question {
  return {
    id,
    number: Number(id.replace(/\D/g, "")) || 1,
    subject: "Physics",
    chapter: "Mechanics",
    topic: "",
    difficulty: "Medium",
    type: "single",
    text,
    options: [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
    ],
    correct: ["A"],
    images: [],
    marks: 4,
    negative: 1,
    flags: { diagram: false, graph: false, table: false, chem: false },
  };
}

describe("selectValidBankQuestions", () => {
  it("samples the requested number of valid questions without changing the bank", () => {
    const bank = [question("Q1"), question("Q2"), question("Q3")];
    const result = selectValidBankQuestions(bank, 2, () => 0.99);

    expect(result).toHaveLength(2);
    expect(new Set(result.map((item) => item.id)).size).toBe(2);
    expect(bank.map((item) => item.id)).toEqual(["Q1", "Q2", "Q3"]);
    expect(result.map((item) => item.id)).not.toEqual(["Q1", "Q2", "Q3"]);
  });

  it("excludes invalid questions and rejects counts beyond the valid pool", () => {
    const invalid = question("Q2");
    invalid.correct = [];

    expect(selectValidBankQuestions([question("Q1"), invalid], 1).map((item) => item.id)).toEqual([
      "Q1",
    ]);
    expect(() => selectValidBankQuestions([question("Q1"), invalid], 2)).toThrow(RangeError);
  });

  it("returns all valid questions in their original order when All is selected", () => {
    const bank = [question("Q1"), question("Q2")];
    expect(selectValidBankQuestions(bank, 2).map((item) => item.id)).toEqual(["Q1", "Q2"]);
  });
});
