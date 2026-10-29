import { describe, expect, it } from "vitest";
import { addMarkedQuestionsToBookmarks, NTA_BOOKMARK_CATEGORIES } from "./nta-review";
import type { AnswerState, Question } from "./types";

const question = (id: string): Question => ({
  id,
  number: 1,
  subject: "Physics",
  chapter: "Units",
  topic: "Dimensions",
  difficulty: "Easy",
  type: "single",
  text: `Question ${id}`,
  options: [{ id: "A", text: "Option A" }],
  correct: ["A"],
  explanation: "Explanation",
  images: [],
  marks: 4,
  negative: 1,
  flags: { diagram: false, graph: false, table: false, chem: false },
});

const answer = (patch: Partial<AnswerState> = {}): AnswerState => ({
  value: null,
  visited: true,
  marked: false,
  bookmarked: false,
  timeSpent: 0,
  ...patch,
});

describe("NTA review bookmarks", () => {
  it("uses the requested NTA bookmark categories", () => {
    expect(NTA_BOOKMARK_CATEGORIES).toEqual(["Revision", "Doubt", "Important", "Practice Again"]);
  });

  it("bookmarks only questions still marked at submission and preserves answers", () => {
    const answers = {
      answered: answer({ value: "A", marked: true }),
      unanswered: answer({ marked: true }),
      unmarked: answer({ value: "A" }),
    };

    const result = addMarkedQuestionsToBookmarks(
      answers,
      [question("answered"), question("unanswered"), question("unmarked")],
      new Set(),
    );

    expect(result.answered).toEqual({ ...answers.answered, bookmarked: true });
    expect(result.unanswered).toEqual({ ...answers.unanswered, bookmarked: true });
    expect(result.unmarked).toBe(answers.unmarked);
    expect(answers.answered.bookmarked).toBe(false);
  });

  it("keeps existing bookmarks and avoids adding an already bookmarked question again", () => {
    const answers = {
      alreadyBookmarked: answer({ marked: true, bookmarked: true }),
      previouslyBookmarked: answer({ marked: true }),
    };

    const result = addMarkedQuestionsToBookmarks(
      answers,
      [question("alreadyBookmarked"), question("previouslyBookmarked")],
      new Set(["previouslyBookmarked"]),
    );

    expect(result).toBe(answers);
    expect(result.alreadyBookmarked.bookmarked).toBe(true);
    expect(result.previouslyBookmarked.bookmarked).toBe(false);
  });

  it("does not create bookmarks when the mark was removed before submission", () => {
    const answers = { removed: answer({ value: "A", marked: false }) };

    expect(addMarkedQuestionsToBookmarks(answers, [question("removed")], new Set())).toBe(answers);
  });
});
