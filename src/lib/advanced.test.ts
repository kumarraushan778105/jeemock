import { describe, expect, it } from "vitest";
import { customPyqSelection, type AdvItem } from "./advanced";

function makeItem(
  id: string,
  subject: string,
  chapter: string,
  topic: string,
  year: number,
  paper: 1 | 2,
): AdvItem {
  return {
    q: {
      id,
      number: 1,
      subject,
      chapter,
      topic,
      difficulty: "Medium",
      type: "single",
      text: `Question ${id}`,
      options: [],
      correct: ["A"],
      images: [],
      marks: 3,
      negative: 1,
      flags: { diagram: false, graph: false, table: false, chem: false },
      pyq: true,
      year,
    },
    test: {
      id: `test-${id}`,
      name: `PYQ ${year} Paper ${paper}`,
      subjects: [subject],
      chapters: [chapter],
      questionCount: 1,
      imageCount: 0,
      missingImages: 0,
      importedAt: 0,
      updatedAt: 0,
      source: "json",
      durationMin: 180,
      status: "valid",
      issues: [],
      questions: [],
      paper,
      year,
    },
    paper,
    year,
  };
}

describe("customPyqSelection", () => {
  it("applies subject, chapter, topic, year, and paper filters to PYQ items", () => {
    const items = [
      makeItem("p1", "Physics", "Mechanics", "Kinematics", 2023, 1),
      makeItem("p2", "Physics", "Electrodynamics", "Current Electricity", 2023, 2),
      makeItem("p3", "Chemistry", "Mechanics", "Kinematics", 2023, 1),
      makeItem("p4", "Physics", "Mechanics", "Kinematics", 2022, 2),
    ];

    const filtered = customPyqSelection(items, {
      subjects: ["Physics"],
      chapters: ["Mechanics"],
      topics: ["Kinematics"],
      years: [2023],
      papers: [1],
    });

    expect(filtered.map((i) => i.q.id)).toEqual(["p1"]);
  });

  it("returns the full PYQ pool when no filters are selected", () => {
    const items = [
      makeItem("p1", "Physics", "Mechanics", "Kinematics", 2023, 1),
      makeItem("p2", "Chemistry", "Organic Chemistry", "Hydrocarbons", 2022, 2),
    ];

    expect(customPyqSelection(items, {}).map((i) => i.q.id)).toEqual(["p1", "p2"]);
  });
});
