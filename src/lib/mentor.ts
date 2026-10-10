import type { AttemptReport } from "./stats.ts";
import { bankItems } from "./bank.ts";
import type { Difficulty, Question, TestSet } from "./types.ts";

export type MentorPriority = "Critical" | "High" | "Medium" | "Low";

export interface MentorTopicInsight {
  key: string;
  subject: string;
  chapter: string;
  topic: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  avgTime: number;
  repeatedMistakes: number;
  priority: MentorPriority;
  reason: string;
}

export interface MentorRecentPerformance {
  label: string;
  accuracy: number;
  score: number;
  date: string;
}

export interface MentorSubjectPerformance {
  subject: string;
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
  accuracy: number;
  avgTime: number;
}

export interface MentorRepeatedMistake {
  subject: string;
  chapter: string;
  topic: string;
  count: number;
  questionIds: string[];
  message: string;
}

export interface MentorQuestionRequest {
  subject?: string;
  chapter?: string;
  topic?: string;
  difficulty?: Difficulty;
  count?: number;
  previouslyWrong?: boolean;
  unattempted?: boolean;
  pyq?: boolean;
}

export interface MentorAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  priorityTopics: MentorTopicInsight[];
  recommendations: string[];
  nextActions: Array<{ title: string; detail: string }>;
  recentPerformance: MentorRecentPerformance[];
  subjectPerformance: MentorSubjectPerformance[];
  repeatedMistakes: MentorRepeatedMistake[];
  hasEnoughData: boolean;
}

export interface MentorContextMemory {
  weakTopics: Array<{ subject: string; topic: string; accuracy: number }>;
  strongTopics: Array<{ subject: string; topic: string; accuracy: number }>;
  recentGoals: string[];
  previousRecommendations: string[];
  recentProgress: string;
  repeatedMistakes: Array<{ subject: string; topic: string; count: number }>;
}

export function buildMentorContext(
  analysis: MentorAnalysis,
  memory: MentorContextMemory,
  prompt: string,
) {
  const total = analysis.subjectPerformance.reduce((sum, item) => sum + item.total, 0);
  const correct = analysis.subjectPerformance.reduce((sum, item) => sum + item.correct, 0);
  const wrong = analysis.subjectPerformance.reduce((sum, item) => sum + item.wrong, 0);
  const skipped = analysis.subjectPerformance.reduce((sum, item) => sum + item.skipped, 0);
  const answered = Math.max(1, correct + wrong);

  return {
    prompt,
    overall: {
      accuracy: Number(((correct / answered) * 100).toFixed(1)),
      totalQuestions: total,
      correct,
      wrong,
      skipped,
      attempts: analysis.recentPerformance.length,
    },
    subjects: analysis.subjectPerformance.map((item) => ({
      subject: item.subject,
      accuracy: Number(item.accuracy.toFixed(1)),
      total: item.total,
      correct: item.correct,
      wrong: item.wrong,
      skipped: item.skipped,
      avgTime: Number(item.avgTime.toFixed(1)),
    })),
    weakTopics: analysis.priorityTopics.slice(0, 5).map((item) => ({
      subject: item.subject,
      chapter: item.chapter,
      topic: item.topic,
      accuracy: Number(item.accuracy.toFixed(1)),
      wrong: item.wrong,
      skipped: item.skipped,
      avgTime: Number(item.avgTime.toFixed(1)),
      priority: item.priority,
    })),
    strongTopics: memory.strongTopics.slice(0, 3),
    repeatedMistakes: analysis.repeatedMistakes.slice(0, 5).map((item) => ({
      subject: item.subject,
      topic: item.topic,
      count: item.count,
    })),
    recentPerformance: analysis.recentPerformance.slice(0, 5),
    recentProgress: memory.recentProgress,
    previousRecommendations: memory.previousRecommendations.slice(0, 4),
    recentGoals: memory.recentGoals.slice(0, 3),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function buildMentorAnalysis(reports: AttemptReport[]): MentorAnalysis {
  if (!reports.length) {
    return {
      summary:
        "I do not have enough practice data yet to judge your current preparation reliably. Keep taking timed tests and then I’ll compare your trends.",
      strengths: ["No completed attempts yet. Start with a mock or chapter test to unlock mentor analysis."],
      weaknesses: ["Lack of data means I can’t judge weak topics reliably yet."],
      priorityTopics: [],
      recommendations: [
        "Attempt one timed test to create a baseline.",
        "Revise your most recent weak chapters before the next mock.",
      ],
      nextActions: [
        { title: "Baseline test", detail: "Take a timed mock and let the mentor compare your accuracy and time per question." },
      ],
      recentPerformance: [],
      subjectPerformance: [],
      repeatedMistakes: [],
      hasEnoughData: false,
    };
  }

  const flat = reports.flatMap((r) => r.summary.perQuestion);
  const answered = flat.filter((p) => p.status !== "skipped");
  const correctCount = flat.filter((p) => p.status === "correct").length;
  const wrongCount = flat.filter((p) => p.status === "wrong").length;
  const skippedCount = flat.filter((p) => p.status === "skipped").length;
  const totalAccuracy = answered.length ? (correctCount / answered.length) * 100 : 0;

  const subjectMap = new Map<string, { subject: string; correct: number; wrong: number; skipped: number; total: number; time: number }>();
  for (const item of flat) {
    const bucket = subjectMap.get(item.question.subject) ?? {
      subject: item.question.subject,
      correct: 0,
      wrong: 0,
      skipped: 0,
      total: 0,
      time: 0,
    };
    bucket.total += 1;
    bucket.time += item.answer?.timeSpent ?? 0;
    if (item.status === "correct") bucket.correct += 1;
    else if (item.status === "wrong") bucket.wrong += 1;
    else bucket.skipped += 1;
    subjectMap.set(item.question.subject, bucket);
  }

  const subjectPerformance = [...subjectMap.values()]
    .map((bucket) => ({
      subject: bucket.subject,
      correct: bucket.correct,
      wrong: bucket.wrong,
      skipped: bucket.skipped,
      total: bucket.total,
      accuracy: bucket.total ? (bucket.correct / bucket.total) * 100 : 0,
      avgTime: bucket.total ? bucket.time / bucket.total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const topicMap = new Map<
    string,
    {
      key: string;
      subject: string;
      chapter: string;
      topic: string;
      total: number;
      correct: number;
      wrong: number;
      skipped: number;
      time: number;
      repeated: number;
      repeatedQuestionIds: Set<string>;
    }
  >();

  for (const item of flat) {
    const q = item.question;
    const key = `${q.subject}::${q.chapter}::${q.topic || q.chapter}`;
    const bucket = topicMap.get(key) ?? {
      key,
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic || q.chapter,
      total: 0,
      correct: 0,
      wrong: 0,
      skipped: 0,
      time: 0,
      repeated: 0,
      repeatedQuestionIds: new Set<string>(),
    };
    bucket.total += 1;
    bucket.time += item.answer?.timeSpent ?? 0;
    if (item.status === "correct") bucket.correct += 1;
    else if (item.status === "wrong") bucket.wrong += 1;
    else bucket.skipped += 1;
    if (item.status === "wrong") {
      bucket.repeatedQuestionIds.add(q.id);
    }
    topicMap.set(key, bucket);
  }

  const repeatedQuestionCounts = new Map<string, number>();
  const repeatedQuestionIdsByTopic = new Map<string, Set<string>>();
  for (const item of flat) {
    if (item.status !== "wrong") continue;
    const q = item.question;
    repeatedQuestionCounts.set(q.id, (repeatedQuestionCounts.get(q.id) ?? 0) + 1);
    const topicKey = `${q.subject}::${q.chapter}::${q.topic || q.chapter}`;
    const set = repeatedQuestionIdsByTopic.get(topicKey) ?? new Set<string>();
    set.add(q.id);
    repeatedQuestionIdsByTopic.set(topicKey, set);
  }

  const repeatedMistakes = [...repeatedQuestionCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id, count]) => {
      const q = flat.find((p) => p.question.id === id)?.question;
      return {
        id,
        q,
        count,
      };
    })
    .filter((entry): entry is { id: string; q: Question; count: number } => Boolean(entry.q))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map(({ q, count }) => ({
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic || q.chapter,
      count,
      questionIds: [q.id],
      message: `${q.subject} ${q.chapter} — ${q.topic || q.chapter} is repeating across ${count} wrong attempts.`,
    }));

  for (const [topicKey, ids] of repeatedQuestionIdsByTopic.entries()) {
    if (ids.size === 0) continue;
    const [subject, chapter, topic] = topicKey.split("::");
    const existing = repeatedMistakes.find((item) => item.subject === subject && item.chapter === chapter && item.topic === topic);
    if (existing) {
      existing.questionIds = [...new Set([...existing.questionIds, ...ids])];
      existing.message = `${subject} ${chapter} — ${topic} is repeating and is harming consistency.`;
    } else {
      repeatedMistakes.push({
        subject,
        chapter,
        topic,
        count: ids.size,
        questionIds: [...ids],
        message: `${subject} ${chapter} — ${topic} has repeated mistakes.`,
      });
    }
  }

  const topicInsights: MentorTopicInsight[] = [...topicMap.values()]
    .filter((bucket) => bucket.total >= 2)
    .map((bucket) => {
      const accuracy = bucket.total ? (bucket.correct / bucket.total) * 100 : 0;
      const avgTime = bucket.total ? bucket.time / bucket.total : 0;
      const repeated = bucket.repeatedQuestionIds.size || bucket.repeated;
      const score = clamp(100 - accuracy + Math.min(25, repeated * 8) + Math.max(0, (bucket.wrong - bucket.correct) * 6), 0, 100);
      let priority: MentorPriority = "Low";
      if (accuracy < 40 || repeated >= 3 || bucket.wrong >= 5) priority = "Critical";
      else if (accuracy < 55 || repeated >= 2 || bucket.wrong >= 3) priority = "High";
      else if (accuracy < 70 || bucket.wrong >= 1) priority = "Medium";
      const reason =
        accuracy < 40
          ? `Accuracy is ${accuracy.toFixed(1)}% with repeated wrong attempts and slow solving.`
          : accuracy < 60
            ? `Accuracy is ${accuracy.toFixed(1)}% and the same concepts keep resurfacing as errors.`
            : `Accuracy is ${accuracy.toFixed(1)}%, but the topic still needs more timed repetition.`;

      return {
        key: bucket.key,
        subject: bucket.subject,
        chapter: bucket.chapter,
        topic: bucket.topic,
        total: bucket.total,
        correct: bucket.correct,
        wrong: bucket.wrong,
        skipped: bucket.skipped,
        accuracy,
        avgTime,
        repeatedMistakes: repeated,
        priority,
        reason,
      };
    })
    .sort((a, b) => {
      if (b.priority === a.priority) return b.accuracy - a.accuracy;
      const rank = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return rank[b.priority] - rank[a.priority];
    });

  const priorityTopics = topicInsights.filter((topic) => topic.total >= 2).slice(0, 5);

  const recentPerformance = [...reports]
    .slice(-5)
    .reverse()
    .map((r) => ({
      label: r.attempt.testName || `Attempt ${r.attempt.id.slice(0, 4)}`,
      accuracy: r.summary.accuracy,
      score: r.summary.score,
      date: new Date(r.attempt.submittedAt ?? r.attempt.updatedAt).toLocaleDateString(),
    }));

  const strengths = subjectPerformance
    .filter((bucket) => bucket.accuracy >= 70 && bucket.total >= 2)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3)
    .map((bucket) => `${bucket.subject} is holding up at ${bucket.accuracy.toFixed(1)}% accuracy with ${bucket.correct} correct answers.`);

  const weaknesses = priorityTopics
    .slice(0, 3)
    .map((topic) => `${topic.subject} — ${topic.topic} (${topic.accuracy.toFixed(1)}% accuracy, ${topic.wrong} wrong) needs urgent revision.`);

  const recommendations = [
    ...priorityTopics.slice(0, 3).map((topic) => `Revise ${topic.topic} in ${topic.subject} for ${Math.max(20, topic.total * 5)} minutes and solve ${Math.min(20, Math.max(8, topic.total))} targeted questions.`),
    ...(wrongCount > 0
      ? [
          `Review your last ${Math.min(5, wrongCount)} wrong questions to stop repeating the same idea errors.`,
        ]
      : ["You are not seeing repeated mistakes yet; continue building a clean error log." ]),
    ...(correctCount > 0 && totalAccuracy < 60
      ? ["Your questions are not being chosen well enough; focus on easier, high-confidence chapters before moving to difficult sets."]
      : []),
  ].slice(0, 5);

  const nextActions = priorityTopics.slice(0, 3).map((topic) => ({
    title: `Revise ${topic.topic}`,
    detail: `Target ${topic.subject} → ${topic.chapter}. Solve ${Math.min(20, Math.max(10, topic.total))} questions, review the error log, and re-attempt a timed set of ${Math.min(10, topic.total)} questions.`,
  }));

  const summary = [
    `Across ${reports.length} submitted attempt${reports.length === 1 ? "" : "s"}, your overall accuracy is ${totalAccuracy.toFixed(1)}%.`,
    priorityTopics.length
      ? `Your weakest current focus is ${priorityTopics[0].subject} — ${priorityTopics[0].topic} (${priorityTopics[0].accuracy.toFixed(1)}% accuracy, ${priorityTopics[0].wrong} wrong).`
      : "I do not have enough weak-topic signal yet to call out a single priority area.",
    `Strongest subject trend is ${subjectPerformance.filter((bucket) => bucket.total >= 2).sort((a, b) => b.accuracy - a.accuracy)[0]?.subject ?? "your recent work"}.`,
  ].join(" ");

  return {
    summary,
    strengths: strengths.length ? strengths : ["Your recent accuracy is still being established; keep taking tests to reveal stronger chapters."],
    weaknesses: weaknesses.length ? weaknesses : ["No clear weak topic has emerged yet because the sample size is still small."],
    priorityTopics,
    recommendations,
    nextActions: nextActions.length ? nextActions : [{ title: "Expand the sample", detail: "Take another test and I’ll identify the exact topic pattern more reliably." }],
    recentPerformance,
    subjectPerformance,
    repeatedMistakes,
    hasEnoughData: reports.length >= 2,
  };
}

export function resolveMentorAction(prompt: string, analysis: MentorAnalysis): MentorQuestionRequest | null {
  const text = prompt.toLowerCase();
  if (!(text.includes("question") || text.includes("practice") || text.includes("give me") || text.includes("find"))) {
    return null;
  }

  const bestTopic = analysis.priorityTopics[0];
  const subject = bestTopic?.subject ?? "Physics";
  const topic = bestTopic?.topic ?? "Motion";
  const count = text.includes("20") ? 20 : text.includes("15") ? 15 : text.includes("10") ? 10 : text.includes("30") ? 30 : 12;

  const request: MentorQuestionRequest = {
    subject: /physics|chem|math/.test(text) ? (text.includes("physics") ? "Physics" : text.includes("chem") ? "Chemistry" : "Mathematics") : undefined,
    chapter: undefined,
    topic: bestTopic ? topic : undefined,
    count,
    previouslyWrong: text.includes("wrong") || text.includes("mistake") || text.includes("repeated"),
    unattempted: text.includes("unattempted") || text.includes("new"),
    pyq: text.includes("pyq") || text.includes("previous year"),
  };

  if (request.subject && request.topic && request.topic === "Motion" && bestTopic) {
    request.topic = bestTopic.topic;
  }

  if (!request.subject && bestTopic) request.subject = bestTopic.subject;
  if (!request.topic && bestTopic) request.topic = bestTopic.topic;

  return request;
}

export function sanitizeQuestionRequest(raw: unknown): MentorQuestionRequest | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  const count = Number(data.count ?? 10);
  const request: MentorQuestionRequest = {
    subject: typeof data.subject === "string" ? data.subject : undefined,
    chapter: typeof data.chapter === "string" ? data.chapter : undefined,
    topic: typeof data.topic === "string" ? data.topic : undefined,
    difficulty: typeof data.difficulty === "string" ? (data.difficulty as Difficulty) : undefined,
    count: Number.isFinite(count) ? clamp(Math.round(count), 1, 30) : 10,
    previouslyWrong: Boolean(data.previouslyWrong),
    unattempted: Boolean(data.unattempted),
    pyq: Boolean(data.pyq),
  };
  return request;
}

export function findRecommendedQuestions(
  tests: TestSet[],
  request: MentorQuestionRequest,
  analysis?: MentorAnalysis,
): Question[] {
  const items = bankItems(tests).map((it) => it.q);
  const repeatedIds = new Set(
    analysis?.repeatedMistakes.flatMap((item) => item.questionIds) ?? [],
  );

  const matchesBase = (q: Question) => {
    if (request.subject && q.subject !== request.subject) return false;
    if (request.chapter && q.chapter !== request.chapter) return false;
    if (request.difficulty && q.difficulty !== request.difficulty) return false;
    if (request.pyq && !q.pyq) return false;
    return true;
  };

  const exact = items.filter((q) => matchesBase(q) && (!request.topic || q.topic === request.topic));
  const related = request.topic
    ? items.filter((q) => matchesBase(q) && q.chapter === (request.chapter ?? analysis?.priorityTopics[0]?.chapter) && q.topic !== request.topic)
    : [];
  const repeated = items.filter((q) => matchesBase(q) && repeatedIds.has(q.id));
  const fallback = items.filter((q) => matchesBase(q));
  const ordered = [...exact, ...related, ...repeated, ...fallback];
  let filtered: Question[] = [];
  const seen = new Set<string>();
  for (const question of ordered) {
    if (seen.has(question.id)) continue;
    if (request.previouslyWrong && analysis && !repeatedIds.has(question.id)) continue;
    seen.add(question.id);
    filtered.push(question);
  }

  if (request.previouslyWrong && analysis && filtered.length === 0) {
    filtered.push(...items.filter((q) => repeatedIds.has(q.id) && matchesBase(q)));
  }

  if (request.count && filtered.length > request.count) {
    filtered = filtered.slice(0, request.count);
  }

  return filtered.slice(0, 30);
}
