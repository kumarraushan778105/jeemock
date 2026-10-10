import { describe, expect, it } from "vitest";
import { buildMentorAnalysis, buildMentorContext } from "./mentor.ts";
import { renderMentorMessageHtml } from "../routes/mentor";
import { buildJeeTimeContext, relevantMentorHistory, searchMentorConversations, type MentorConversation } from "./mentor-memory";
import { buildMentorSystemPrompt } from "./ai/gemini";

describe("buildMentorAnalysis", () => {
  it("ranks weak topics from real attempt data", () => {
    const analysis = buildMentorAnalysis([
      {
        attempt: {
          id: "a1",
          testId: "t1",
          testName: "Mock 1",
          startedAt: 1,
          updatedAt: 2,
          durationSec: 1200,
          remainingSec: 0,
          currentIndex: 0,
          answers: {
            p1: { value: "A", visited: true, marked: false, bookmarked: false, timeSpent: 35 },
            p2: { value: "B", visited: true, marked: false, bookmarked: false, timeSpent: 48 },
            p3: { value: "A", visited: true, marked: false, bookmarked: false, timeSpent: 50 },
          },
          submitted: true,
          submittedAt: 2,
          questionIds: ["p1", "p2", "p3"],
          scoring: { marks: 0, negative: 0 },
        },
        questions: [
          {
            id: "p1",
            number: 1,
            subject: "Physics",
            chapter: "Kinematics",
            topic: "Relative Motion",
            difficulty: "Medium",
            type: "single",
            text: "Question 1",
            options: [{ id: "A", text: "A" }, { id: "B", text: "B" }],
            correct: ["A"],
            images: [],
            marks: 4,
            negative: 1,
            flags: { diagram: false, graph: false, table: false, chem: false },
          },
          {
            id: "p2",
            number: 2,
            subject: "Physics",
            chapter: "Kinematics",
            topic: "Relative Motion",
            difficulty: "Medium",
            type: "single",
            text: "Question 2",
            options: [{ id: "A", text: "A" }, { id: "B", text: "B" }],
            correct: ["A"],
            images: [],
            marks: 4,
            negative: 1,
            flags: { diagram: false, graph: false, table: false, chem: false },
          },
          {
            id: "p3",
            number: 3,
            subject: "Physics",
            chapter: "Kinematics",
            topic: "Relative Motion",
            difficulty: "Medium",
            type: "single",
            text: "Question 3",
            options: [{ id: "A", text: "A" }, { id: "B", text: "B" }],
            correct: ["A"],
            images: [],
            marks: 4,
            negative: 1,
            flags: { diagram: false, graph: false, table: false, chem: false },
          },
        ],
        summary: {
          perQuestion: [
            {
              question: {
                id: "p1",
                number: 1,
                subject: "Physics",
                chapter: "Kinematics",
                topic: "Relative Motion",
                difficulty: "Medium",
                type: "single",
                text: "Question 1",
                options: [{ id: "A", text: "A" }, { id: "B", text: "B" }],
                correct: ["A"],
                images: [],
                marks: 4,
                negative: 1,
                flags: { diagram: false, graph: false, table: false, chem: false },
              },
              answer: { value: "A", visited: true, marked: false, bookmarked: false, timeSpent: 35 },
              status: "correct",
              score: 4,
            },
            {
              question: {
                id: "p2",
                number: 2,
                subject: "Physics",
                chapter: "Kinematics",
                topic: "Relative Motion",
                difficulty: "Medium",
                type: "single",
                text: "Question 2",
                options: [{ id: "A", text: "A" }, { id: "B", text: "B" }],
                correct: ["A"],
                images: [],
                marks: 4,
                negative: 1,
                flags: { diagram: false, graph: false, table: false, chem: false },
              },
              answer: { value: "B", visited: true, marked: false, bookmarked: false, timeSpent: 48 },
              status: "wrong",
              score: -1,
            },
            {
              question: {
                id: "p3",
                number: 3,
                subject: "Physics",
                chapter: "Kinematics",
                topic: "Relative Motion",
                difficulty: "Medium",
                type: "single",
                text: "Question 3",
                options: [{ id: "A", text: "A" }, { id: "B", text: "B" }],
                correct: ["A"],
                images: [],
                marks: 4,
                negative: 1,
                flags: { diagram: false, graph: false, table: false, chem: false },
              },
              answer: { value: "B", visited: true, marked: false, bookmarked: false, timeSpent: 50 },
              status: "wrong",
              score: -1,
            },
          ],
          correct: 1,
          wrong: 2,
          skipped: 0,
          score: 2,
          maxScore: 12,
          negative: -2,
          accuracy: 33.33333333333333,
          timeSpent: 133,
          bySubject: [],
          byChapter: [],
        },
      },
    ]);

    expect(analysis.priorityTopics.length).toBeGreaterThan(0);
    expect(analysis.priorityTopics[0].subject).toBe("Physics");
    expect(analysis.summary.toLowerCase()).toMatch(/physics|kinematics|relative motion/);
  });

  it("renders markdown and KaTeX properly in mentor replies", () => {
    const html = renderMentorMessageHtml(`The distance covered in the $n^{\\text{th}}$ second is given by the standard kinematics relation.

$S_n = u + \\frac{a}{2}(2n-1)$

$v = u + at$

### Today's Formula

For uniformly accelerated motion:

$$
v = u + at
$$

- Initial velocity: $u$
- Final velocity: $v$
- Acceleration: $a$
- Time: $t$

Bare command: \\frac{a}{b} and x^{2}.\n\n- **Important** idea`);

    expect(html).not.toContain("$n^{\\text{th}}$");
    expect(html).not.toContain("\\frac");
    expect(html).not.toContain("^{2}");
    expect(html).toContain("<strong>Important</strong>");
    expect(html).toContain("<ul>");
    expect(html).toContain("katex");
  });

  it("builds a compact context from calculated aggregates", () => {
    const analysis = buildMentorAnalysis([]);
    const context = buildMentorContext(
      analysis,
      {
        weakTopics: [],
        strongTopics: [],
        recentGoals: ["What should I study today?"],
        previousRecommendations: ["Revise mechanics"],
        recentProgress: "Kinematics improved from 42% to 68%.",
        repeatedMistakes: [],
      },
      "What should I study today?",
    );

    expect(context.overall).toEqual({ accuracy: 0, totalQuestions: 0, correct: 0, wrong: 0, skipped: 0, attempts: 0 });
    expect(context.recentGoals).toEqual(["What should I study today?"]);
    expect(JSON.stringify(context)).not.toContain("question text");
  });

  it("searches and retrieves only relevant Mentor sessions", () => {
    const conversations: MentorConversation[] = [
      {
        id: "physics",
        title: "Physics Weak Topics",
        createdAt: 1,
        updatedAt: 2,
        messages: [{ role: "user", text: "I struggle with kinematics", timestamp: 2 }],
        tags: ["physics"],
        summary: "Kinematics was previously a weak area.",
      },
      {
        id: "chemistry",
        title: "Chemistry Plan",
        createdAt: 1,
        updatedAt: 3,
        messages: [{ role: "user", text: "Help with organic chemistry", timestamp: 3 }],
        tags: ["chemistry"],
        summary: "Organic revision plan.",
      },
    ];

    expect(searchMentorConversations(conversations, "kinematics")).toHaveLength(1);
    expect(relevantMentorHistory(conversations, "What should I revise in kinematics?", "chemistry")[0].title).toBe("Physics Weak Topics");
    expect(buildJeeTimeContext(new Date("2026-09-09T00:00:00Z"), "2026-09-19").daysRemaining).toBe(10);
  });

  it("uses a calendar-date countdown for the JEE Main 2028 provisional exam date", () => {
    expect(buildJeeTimeContext(new Date("2026-09-10T00:00:00Z")).daysRemaining).toBe(501);
    expect(buildJeeTimeContext(new Date("2026-09-10T12:00:00Z")).daysRemaining).toBe(501);
    expect(buildJeeTimeContext(new Date("2026-09-11T00:00:00Z")).daysRemaining).toBe(500);
    expect(buildJeeTimeContext(new Date("2026-09-11T23:00:00Z")).daysRemaining).toBe(500);
    expect(buildJeeTimeContext(new Date("2028-01-24T00:00:00Z")).daysRemaining).toBe(0);
  });

  it("forces evidence-based recommendation references and forbids internal IDs in the mentor prompt", () => {
    const prompt = buildMentorSystemPrompt({
      prompt: "Give me 3 questions to practice",
      questionContext: [
        {
          number: 7,
          subject: "Physics",
          chapter: "Kinematics",
          topic: "Relative Motion",
          difficulty: "Medium",
          reason: "This topic has 5 wrong attempts and 58% accuracy in recent tests.",
          qRef: "Q7 · Kinematics · Relative Motion · Medium",
          id: "test_do6v27egluzj::MSL-Q07",
        },
      ],
    });

    expect(prompt).toContain("Never expose internal IDs");
    expect(prompt).toContain("Insufficient Evidence");
    expect(prompt).toContain("Q7");
    expect(prompt).not.toContain("test_do6v27egluzj");
  });
});
