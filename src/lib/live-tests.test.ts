import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildLiveTestPreviewAttempt,
  cloneQuestionForDraft,
  completeScheduledLiveTest,
  createLiveTestDraft,
  deleteLiveTestDraft,
  deleteScheduledLiveTest,
  deriveLiveTestSyllabus,
  getActiveLiveTestDraftId,
  getScheduledLiveTest,
  listScheduledLiveTests,
  listUpcomingLiveTests,
  liveTestPreviewAttemptId,
  questionAlreadyInDraft,
  saveLiveTestDraft,
  scheduleLiveTest,
} from "./live-tests";
import { applyMissedLiveTestPenalty, getXpState, resetXpForTesting, setXpStateForTesting } from "./xp";
import type { Question } from "./types";

const storage = new Map<string, string>();
Object.defineProperty(globalThis, "window", {
  value: {
    localStorage: {
      getItem: (key: string) => (storage.has(key) ? storage.get(key)! : null),
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
      removeItem: (key: string) => {
        storage.delete(key);
      },
      clear: () => {
        storage.clear();
      },
    },
  },
  configurable: true,
});

beforeEach(() => {
  storage.clear();
  resetXpForTesting();
  vi.useRealTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const sampleQuestion: Question = {
  id: "q-preview-1",
  number: 1,
  subject: "Physics",
  chapter: "Units",
  topic: "Dimensions",
  difficulty: "Easy",
  type: "single",
  text: "Preview question text",
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

describe("live test preview", () => {
  it("creates a temporary CBT preview attempt from the current draft", () => {
    const draft = createLiveTestDraft([sampleQuestion], "Draft Preview");
    const previewId = liveTestPreviewAttemptId(draft.id);
    const attempt = buildLiveTestPreviewAttempt(draft);

    expect(attempt.id).toBe(previewId);
    expect(attempt.testId).toBe(draft.id);
    expect(attempt.preview?.draftId).toBe(draft.id);
    expect(attempt.questionsSnapshot).toHaveLength(1);
    expect(attempt.submitted).toBe(false);
    expect(attempt.answers[sampleQuestion.id]).toMatchObject({
      value: null,
      visited: false,
      marked: false,
      bookmarked: false,
    });
  });

  it("orders selected questions by subject and numbers them dynamically", () => {
    const sourceQuestions = [
      { ...sampleQuestion, id: "p2", number: 7, subject: "Physics" },
      { ...sampleQuestion, id: "m1", number: 4, subject: "Maths" },
      { ...sampleQuestion, id: "c2", number: 3, subject: "Chemistry" },
      { ...sampleQuestion, id: "c1", number: 2, subject: "Chemistry" },
      { ...sampleQuestion, id: "p1", number: 1, subject: "Physics" },
    ];
    const draft = createLiveTestDraft(sourceQuestions, "Ordered Draft");

    expect(draft.questions.map((question) => question.id)).toEqual(["c1", "c2", "p1", "p2", "m1"]);
    expect(draft.questions.map((question) => question.number)).toEqual([1, 2, 3, 4, 5]);
    expect(sourceQuestions.map((question) => question.number)).toEqual([7, 4, 3, 2, 1]);

    const preview = buildLiveTestPreviewAttempt({
      ...draft,
      questions: sourceQuestions,
      questionIds: sourceQuestions.map((question) => question.id),
    });
    expect(preview.questionIds).toEqual(["c1", "c2", "p1", "p2", "m1"]);
    expect(preview.questionsSnapshot?.map((question) => question.number)).toEqual([1, 2, 3, 4, 5]);
  });

  it("marks a scheduled live test as completed when its submitted attempt is linked back", () => {
    const draft = createLiveTestDraft([sampleQuestion], "Scheduled Live Test");
    const scheduled = scheduleLiveTest(draft, {
      testName: "Scheduled Live Test",
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      liveStart: "10:00",
      liveEnd: "11:00",
      durationMin: 60,
    });

    completeScheduledLiveTest({
      id: "att_live_123",
      scheduledTestId: scheduled.id,
      submittedAt: Date.now(),
    });

    const updated = getScheduledLiveTest(scheduled.id);
    expect(updated?.status).toBe("COMPLETED");
    expect(updated?.completedAttemptId).toBe("att_live_123");
    expect(updated?.completedAt).toBeTruthy();
    expect(updated?.attempts).toContain("att_live_123");
  });

  it("clones bank questions into the draft and blocks duplicates by source id", () => {
    const clone = cloneQuestionForDraft(sampleQuestion);
    const draft = createLiveTestDraft([clone], "Draft Clone");

    expect(clone.id).not.toBe(sampleQuestion.id);
    expect(clone).not.toBe(sampleQuestion);
    expect((clone as typeof clone & { sourceId?: string }).sourceId).toBe(sampleQuestion.id);
    expect(questionAlreadyInDraft(draft, sampleQuestion)).toBe(true);
    expect(questionAlreadyInDraft(draft, clone)).toBe(true);
  });

  it("retains the active draft until it is explicitly discarded or scheduled", () => {
    const draft = createLiveTestDraft([sampleQuestion], "Persisted Draft");
    expect(getActiveLiveTestDraftId()).toBe(draft.id);

    const updated = saveLiveTestDraft({
      ...draft,
      name: "Persisted Draft Updated",
      questions: [{ ...sampleQuestion, id: "q-preview-2", number: 2 }],
    });

    expect(getActiveLiveTestDraftId()).toBe(updated.id);

    deleteLiveTestDraft(updated.id);
    expect(getActiveLiveTestDraftId()).toBeNull();
  });

  it("derives syllabus from subject and chapter metadata when no custom syllabus is set", () => {
    const draft = createLiveTestDraft([
      { ...sampleQuestion, id: "q1", subject: "Physics", chapter: "Units" },
      { ...sampleQuestion, id: "q2", subject: "Chemistry", chapter: "Chemical Bonding" },
      { ...sampleQuestion, id: "q3", subject: "Physics", chapter: "Rotational Motion" },
      { ...sampleQuestion, id: "q4", subject: "Mathematics", chapter: "Calculus" },
    ], "Derived Syllabus");

    expect(deriveLiveTestSyllabus(draft.questions)).toEqual({
      Physics: ["Units", "Rotational Motion"],
      Chemistry: ["Chemical Bonding"],
      Mathematics: ["Calculus"],
    });
  });

  it("keeps a scheduled live test fixed to its final syllabus snapshot", () => {
    const draft = createLiveTestDraft([
      { ...sampleQuestion, id: "q1", subject: "Physics", chapter: "Units" },
      { ...sampleQuestion, id: "q2", subject: "Physics", chapter: "Rotational Motion" },
    ], "Fixed Syllabus");

    const customSyllabus = {
      Physics: ["Kinematics", "Rotational Motion"],
      Chemistry: ["Mole Concept"],
      Mathematics: ["Calculus"],
    };

    const scheduled = scheduleLiveTest({ ...draft, customSyllabus }, {
      testName: "Fixed Syllabus",
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      liveStart: "10:00",
      liveEnd: "11:00",
      durationMin: 60,
    });

    expect(scheduled.syllabus).toEqual(customSyllabus);
    expect(getScheduledLiveTest(scheduled.id)?.syllabus).toEqual(customSyllabus);

    const updatedQuestion = { ...draft.questions[0], chapter: "Changed Chapter" };
    expect(scheduled.fixedQuestions[0].chapter).toBe("Units");
    expect(updatedQuestion.chapter).not.toBe(scheduled.fixedQuestions[0].chapter);
  });

  it("deducts 10 XP once for a missed live test and never again on refresh", () => {
    const baseTime = new Date("2025-01-10T12:00:00Z");
    vi.setSystemTime(baseTime);
    setXpStateForTesting({
      balance: 25,
      weeklyEarned: 25,
      weeklySpent: 0,
      cycleStart: new Date().toISOString(),
      cycleEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      transactions: [],
    });

    const draft = createLiveTestDraft([sampleQuestion], "Missed Live Test");
    const scheduled = scheduleLiveTest(draft, {
      testName: "Missed Live Test",
      date: new Date(baseTime.getTime() + 86400000).toISOString().slice(0, 10),
      liveStart: "09:00",
      liveEnd: "09:30",
      durationMin: 30,
    });

    vi.setSystemTime(new Date(baseTime.getTime() + 2 * 86400000));

    const firstRead = getScheduledLiveTest(scheduled.id);
    const stateAfterFirst = getXpState();
    const secondRead = getScheduledLiveTest(scheduled.id);
    const stateAfterSecond = getXpState();

    expect(firstRead?.status).toBe("MISSED");
    expect(stateAfterFirst.balance).toBe(15);
    expect(stateAfterFirst.transactions.filter((tx) => tx.source === "live-test" && tx.sourceId === `live-test:${scheduled.id}`)).toHaveLength(1);
    expect(secondRead?.status).toBe("MISSED");
    expect(stateAfterSecond.balance).toBe(15);
    expect(stateAfterSecond.transactions.filter((tx) => tx.source === "live-test" && tx.sourceId === `live-test:${scheduled.id}`)).toHaveLength(1);
  });

  it("does not deduct XP for an upcoming test and caps a missed penalty at zero when balance is low", () => {
    const baseTime = new Date("2025-01-10T12:00:00Z");
    vi.setSystemTime(baseTime);
    setXpStateForTesting({
      balance: 7,
      weeklyEarned: 7,
      weeklySpent: 0,
      cycleStart: new Date().toISOString(),
      cycleEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      transactions: [],
    });

    const draft = createLiveTestDraft([sampleQuestion], "Upcoming Test");
    const upcoming = scheduleLiveTest(draft, {
      testName: "Upcoming Test",
      date: new Date(baseTime.getTime() + 86400000).toISOString().slice(0, 10),
      liveStart: "09:00",
      liveEnd: "09:30",
      durationMin: 30,
    });

    const beforeMiss = getXpState();
    expect(upcoming.status).toBe("UPCOMING");
    expect(getScheduledLiveTest(upcoming.id)?.status).toBe("UPCOMING");
    expect(beforeMiss.balance).toBe(7);

    const missedPenalty = applyMissedLiveTestPenalty("scheduled-low-balance", 10);
    const stateAfterMiss = getXpState();

    expect(missedPenalty.amount).toBe(7);
    expect(stateAfterMiss.balance).toBe(0);
    expect(stateAfterMiss.transactions.some((tx) => tx.source === "live-test" && tx.sourceId === "live-test:scheduled-low-balance" && tx.reason === "Missed Live Test")).toBe(true);
  });

  it("cancels an upcoming scheduled live test without creating XP transactions or affecting other tests", () => {
    vi.setSystemTime(new Date("2025-01-10T12:00:00Z"));
    setXpStateForTesting({
      balance: 25,
      weeklyEarned: 25,
      weeklySpent: 0,
      cycleStart: new Date().toISOString(),
      cycleEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      transactions: [],
    });

    const firstDraft = createLiveTestDraft([sampleQuestion], "First Scheduled");
    const firstScheduled = scheduleLiveTest(firstDraft, {
      testName: "First Scheduled",
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      liveStart: "09:00",
      liveEnd: "09:30",
      durationMin: 30,
    });

    const secondDraft = createLiveTestDraft([{ ...sampleQuestion, id: "q-second" }], "Second Scheduled");
    const secondScheduled = scheduleLiveTest(secondDraft, {
      testName: "Second Scheduled",
      date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
      liveStart: "10:00",
      liveEnd: "10:30",
      durationMin: 30,
    });

    deleteScheduledLiveTest(firstScheduled.id);
    const remaining = listScheduledLiveTests();
    const stateAfterCancellation = getXpState();

    expect(remaining.some((test) => test.id === firstScheduled.id)).toBe(false);
    expect(remaining.some((test) => test.id === secondScheduled.id)).toBe(true);
    expect(stateAfterCancellation.balance).toBe(25);
    expect(stateAfterCancellation.transactions).toHaveLength(0);
  });

  it("lists only live and upcoming scheduled tests for the dashboard", () => {
    vi.setSystemTime(new Date("2025-01-10T12:00:00Z"));

    const upcomingDraft = createLiveTestDraft([sampleQuestion], "Upcoming Test");
    const upcoming = scheduleLiveTest(upcomingDraft, {
      testName: "Upcoming Test",
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      liveStart: "09:00",
      liveEnd: "09:30",
      durationMin: 30,
    });

    const liveDraft = createLiveTestDraft([{ ...sampleQuestion, id: "q-live" }], "Live Test");
    const live = scheduleLiveTest(liveDraft, {
      testName: "Live Test",
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      liveStart: "12:00",
      liveEnd: "12:30",
      durationMin: 30,
    });

    const expiredDraft = createLiveTestDraft([{ ...sampleQuestion, id: "q-expired" }], "Expired Test");
    const expired = scheduleLiveTest(expiredDraft, {
      testName: "Expired Test",
      date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
      liveStart: "08:00",
      liveEnd: "08:30",
      durationMin: 30,
    });

    vi.setSystemTime(new Date("2025-01-10T09:15:00Z"));

    const dashboardTests = listUpcomingLiveTests();
    expect(dashboardTests.map((test) => test.id)).toEqual(expect.arrayContaining([upcoming.id, live.id]));
    expect(dashboardTests.map((test) => test.id)).not.toContain(expired.id);
    expect(dashboardTests.every((test) => test.status === "UPCOMING" || test.status === "LIVE")).toBe(true);
  });

  it("sorts dashboard live tests by live window date and time, with live tests first", () => {
    vi.setSystemTime(new Date("2025-01-10T12:00:00Z"));

    const draft202 = createLiveTestDraft([sampleQuestion], "Sep 20 live");
    const live202 = scheduleLiveTest(draft202, {
      testName: "Sep 20 live",
      date: "2025-09-20",
      liveStart: "18:30",
      liveEnd: "19:30",
      durationMin: 60,
    });

    const draft21AM = createLiveTestDraft([{ ...sampleQuestion, id: "q-21-am" }], "Sep 21 9am");
    const upcoming21AM = scheduleLiveTest(draft21AM, {
      testName: "Sep 21 9am",
      date: "2025-09-21",
      liveStart: "09:00",
      liveEnd: "09:30",
      durationMin: 30,
    });

    const draft21PM = createLiveTestDraft([{ ...sampleQuestion, id: "q-21-pm" }], "Sep 21 5pm");
    const upcoming21PM = scheduleLiveTest(draft21PM, {
      testName: "Sep 21 5pm",
      date: "2025-09-21",
      liveStart: "17:00",
      liveEnd: "17:30",
      durationMin: 30,
    });

    const draft22AM = createLiveTestDraft([{ ...sampleQuestion, id: "q-22-am" }], "Sep 22 10am");
    const upcoming22AM = scheduleLiveTest(draft22AM, {
      testName: "Sep 22 10am",
      date: "2025-09-22",
      liveStart: "10:00",
      liveEnd: "10:30",
      durationMin: 30,
    });

    const draft20PM = createLiveTestDraft([{ ...sampleQuestion, id: "q-20-pm" }], "Sep 20 11pm");
    const upcoming20PM = scheduleLiveTest(draft20PM, {
      testName: "Sep 20 11pm",
      date: "2025-09-20",
      liveStart: "23:00",
      liveEnd: "23:30",
      durationMin: 30,
    });

    const sorted = listUpcomingLiveTests();
    expect(sorted.map((test) => test.id)).toEqual([live202.id, upcoming20PM.id, upcoming21AM.id, upcoming21PM.id, upcoming22AM.id]);
  });
});
