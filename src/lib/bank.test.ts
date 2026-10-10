import { describe, expect, it } from "vitest";
import { filterItems } from "./bank.ts";

describe("filterItems search", () => {
  const testSet = {
    id: "t1",
    name: "Demo",
    subjects: ["Physics"],
    chapters: ["Vectors"],
    questionCount: 1,
    imageCount: 0,
    missingImages: 0,
    importedAt: Date.now(),
    updatedAt: Date.now(),
    source: "custom" as const,
    durationMin: 60,
    status: "valid" as const,
    issues: [],
    questions: [],
  };

  it("matches question metadata and tags when a search term is used", () => {
    const items = [
      {
        q: {
          id: "PHY-204",
          text: "Two vectors are perpendicular.",
          subject: "Physics",
          chapter: "Vectors",
          topic: "Vector algebra",
          difficulty: "Medium" as const,
          type: "single" as const,
          options: [],
          correct: ["A"],
          images: [],
          marks: 4,
          negative: 1,
          flags: { diagram: false, graph: false, table: false, chem: false },
          tags: ["jee-main", "vector-geometry"],
        },
        test: testSet,
      },
      {
        q: {
          id: "CHEM-101",
          text: "Balance the equation.",
          subject: "Chemistry",
          chapter: "Redox",
          topic: "Oxidation",
          difficulty: "Easy" as const,
          type: "multiple" as const,
          options: [],
          correct: ["A"],
          images: [],
          marks: 4,
          negative: 1,
          flags: { diagram: false, graph: false, table: false, chem: false },
        },
        test: testSet,
      },
    ];

    expect(filterItems(items, { search: "vector" }).length).toBe(1);
    expect(filterItems(items, { search: "jee-main" }).length).toBe(1);
    expect(filterItems(items, { search: "PHY-204" }).length).toBe(1);
    expect(filterItems(items, { search: "redox" }).length).toBe(1);
    expect(filterItems(items, { search: "  chemistry  " }).length).toBe(1);
    expect(filterItems(items, { subject: ["Physics"], search: "vector" }).length).toBe(1);
  });

  it("normalizes punctuation and partial chapter names to match the same filter metadata", () => {
    const items = [
      {
        q: {
          id: "CHEM-420",
          text: "Which statement explains the difference between covalent and ionic compounds?",
          subject: "Chemistry",
          chapter: "Basic Concepts of Chemistry & Atomic Structure",
          topic: "Atomic structure",
          difficulty: "Easy" as const,
          type: "single" as const,
          options: [],
          correct: ["A"],
          images: [],
          marks: 4,
          negative: 1,
          flags: { diagram: false, graph: false, table: false, chem: false },
        },
        test: testSet,
      },
      {
        q: {
          id: "MATH-181",
          text: "Solve the inequality and compare means.",
          subject: "Mathematics",
          chapter: "Inequalities (AM-GM/AM-HM)",
          topic: "AM-GM",
          difficulty: "Hard" as const,
          type: "single" as const,
          options: [],
          correct: ["A"],
          images: [],
          marks: 4,
          negative: 1,
          flags: { diagram: false, graph: false, table: false, chem: false },
        },
        test: testSet,
      },
      {
        q: {
          id: "PHY-303",
          text: "A projectile is launched at an angle.",
          subject: "Physics",
          chapter: "Kinematics (Projectile Motion)",
          topic: "Projectile motion",
          difficulty: "Medium" as const,
          type: "single" as const,
          options: [],
          correct: ["A"],
          images: [],
          marks: 4,
          negative: 1,
          flags: { diagram: false, graph: false, table: false, chem: false },
        },
        test: testSet,
      },
      {
        q: {
          id: "MATH-201",
          text: "Study vectors and linear algebra.",
          subject: "Mathematics",
          chapter: "Basic Mathematics & Vectors",
          topic: "Vectors",
          difficulty: "Medium" as const,
          type: "single" as const,
          options: [],
          correct: ["A"],
          images: [],
          marks: 4,
          negative: 1,
          flags: { diagram: false, graph: false, table: false, chem: false },
        },
        test: testSet,
      },
    ];

    expect(filterItems(items, { search: "Kinematics" }).length).toBe(1);
    expect(filterItems(items, { search: "Projectile" }).length).toBe(1);
    expect(filterItems(items, { search: "Mathematical Tools" }).length).toBe(0);
    expect(filterItems(items, { search: "AM-GM" }).length).toBe(1);
    expect(filterItems(items, { search: "Basic Concepts" }).length).toBe(1);
    expect(filterItems(items, { search: "basic maths" }).length).toBe(1);
    expect(filterItems(items, { search: "kinematics projectile" }).length).toBe(1);
    expect(filterItems(items, { search: "maths and vectors" }).length).toBe(1);
    expect(filterItems(items, { search: "mathematics and vectors" }).length).toBe(1);
    expect(filterItems(items, { subject: ["Physics"], search: "Projectile" }).length).toBe(1);
    expect(filterItems(items, { chapters: ["Kinematics (Projectile Motion)"], search: "projectile" }).length).toBe(1);
  });
});
