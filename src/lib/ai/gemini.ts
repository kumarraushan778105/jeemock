import { GoogleGenAI } from "@google/genai";
import { createServerFn } from "@tanstack/react-start";

export interface MentorPromptPayload {
  prompt: string;
  context?: Record<string, unknown>;
  questionRequest?: Record<string, unknown> | null;
  questionContext?: Array<Record<string, unknown>>;
  conversation?: Array<{ role: "user" | "mentor"; text: string }>;
  relevantHistory?: Array<{ title: string; summary: string; recentMessages: Array<{ role: "user" | "mentor"; text: string }> }>;
}

export const GEMINI_RATE_LIMIT_MESSAGE =
  "AI Mentor is temporarily unavailable because the AI limit has been reached. Please try again later.";
export const GEMINI_DAILY_REQUEST_LIMIT = 20;
const DAILY_USAGE_KEY = "jee-gemini-usage-v1";
const DEFAULT_GEMINI_RETRY_SECONDS = 35;

const BASIC_QUESTION_ANSWERS: Record<string, string> = {
  "what is inertia": "Inertia is the tendency of an object to resist a change in its state of motion. A body at rest stays at rest and a body in motion stays in motion unless acted upon by a net external force.",
  "what is inertia?": "Inertia is the tendency of an object to resist a change in its state of motion. A body at rest stays at rest and a body in motion stays in motion unless acted upon by a net external force.",
  "what is gravity": "Gravity is the attractive force between masses. On Earth, it gives objects weight and causes unsupported objects to fall toward the ground.",
  "what is gravity?": "Gravity is the attractive force between masses. On Earth, it gives objects weight and causes unsupported objects to fall toward the ground.",
  "what is momentum": "Momentum is the product of mass and velocity. It tells us how much motion an object has and is a vector quantity.",
  "what is momentum?": "Momentum is the product of mass and velocity. It tells us how much motion an object has and is a vector quantity.",
  "what is force": "Force is any push or pull that can change the state of motion of an object. It is measured in newtons.",
  "what is force?": "Force is any push or pull that can change the state of motion of an object. It is measured in newtons.",
  "what is velocity": "Velocity is the rate of change of displacement with time. It includes both speed and direction.",
  "what is velocity?": "Velocity is the rate of change of displacement with time. It includes both speed and direction.",
  "what is acceleration": "Acceleration is the rate of change of velocity with time. It tells us how quickly speed or direction changes.",
  "what is acceleration?": "Acceleration is the rate of change of velocity with time. It tells us how quickly speed or direction changes.",
  "what is photosynthesis": "Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to make glucose and oxygen.",
  "what is photosynthesis?": "Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to make glucose and oxygen.",
  "what is respiration": "Respiration is the process by which living organisms release energy from food, usually by converting glucose and oxygen into carbon dioxide, water, and energy.",
  "what is respiration?": "Respiration is the process by which living organisms release energy from food, usually by converting glucose and oxygen into carbon dioxide, water, and energy.",
  "what is ph": "pH is a measure of how acidic or basic a solution is. A pH of 7 is neutral, below 7 is acidic, and above 7 is basic.",
  "what is ph?": "pH is a measure of how acidic or basic a solution is. A pH of 7 is neutral, below 7 is acidic, and above 7 is basic.",
  "what is acid": "An acid is a substance that releases hydrogen ions in water and tends to have a sour taste, though tasting chemicals is not safe in practice.",
  "what is acid?": "An acid is a substance that releases hydrogen ions in water and tends to have a sour taste, though tasting chemicals is not safe in practice.",
  "what is a derivative": "A derivative measures how a function changes as its input changes. It is the instantaneous rate of change of a function.",
  "what is a derivative?": "A derivative measures how a function changes as its input changes. It is the instantaneous rate of change of a function.",
  "what is an integral": "An integral is a way to accumulate quantities or find the total area under a curve. It is the reverse process of differentiation in many cases.",
  "what is an integral?": "An integral is a way to accumulate quantities or find the total area under a curve. It is the reverse process of differentiation in many cases.",
  "what is a wave": "A wave is a disturbance that transfers energy from one place to another without permanently moving the medium as a whole.",
  "what is a wave?": "A wave is a disturbance that transfers energy from one place to another without permanently moving the medium as a whole.",
};

export function normalizeMentorQuestion(question: string) {
  return question
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[^a-z0-9\s'\?]/g, "")
    .trim();
}

export function shouldShortCircuitMentorQuestion(question: string) {
  const normalized = normalizeMentorQuestion(question);
  return BASIC_QUESTION_ANSWERS[normalized] ?? BASIC_QUESTION_ANSWERS[normalized.replace(/\?$/, "")] ?? null;
}

export function getTodayDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getGeminiRequestUsageSummary({ count, date }: { count: number; date: string }) {
  return `AI usage: ${count}/${GEMINI_DAILY_REQUEST_LIMIT} today`;
}

function readUsageFromStorage() {
  if (typeof window === "undefined") return { date: getTodayDateKey(), count: 0 };
  try {
    const raw = window.localStorage.getItem(DAILY_USAGE_KEY);
    if (!raw) return { date: getTodayDateKey(), count: 0 };
    const parsed = JSON.parse(raw) as { date?: string; count?: number };
    return {
      date: typeof parsed.date === "string" ? parsed.date : getTodayDateKey(),
      count: Number.isFinite(parsed.count) ? Number(parsed.count) : 0,
    };
  } catch {
    return { date: getTodayDateKey(), count: 0 };
  }
}

export function getGeminiRequestUsage() {
  const today = getTodayDateKey();
  const usage = readUsageFromStorage();
  if (usage.date !== today) {
    return { date: today, count: 0 };
  }
  return usage;
}

export function incrementGeminiRequestUsage() {
  const today = getTodayDateKey();
  const usage = readUsageFromStorage();
  const current = usage.date === today ? usage.count : 0;
  const next = { date: today, count: current + 1 };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(DAILY_USAGE_KEY, JSON.stringify(next));
    } catch {
      return next;
    }
  }
  return next;
}

const getErrorText = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return "";
  }

  const value = error as {
    message?: string;
    body?: unknown;
    rawResponse?: string | { message?: string };
    statusCode?: number;
    error?: unknown;
  };

  const bodyText = typeof value.body === "string" ? value.body : JSON.stringify(value.body ?? {});
  const rawResponseText = typeof value.rawResponse === "string" ? value.rawResponse : JSON.stringify(value.rawResponse ?? {});
  const errorText = typeof value.error === "string" ? value.error : JSON.stringify(value.error ?? {});

  return [value.message, bodyText, rawResponseText, errorText].filter(Boolean).join(" ");
};

export function isGeminiRateLimitError(error: unknown) {
  const errorText = getErrorText(error);
  const statusCode = (error as { statusCode?: number })?.statusCode ?? (error as { status?: number })?.status;

  return statusCode === 429 || /RESOURCE_EXHAUSTED|rate limit|quota|429/i.test(errorText);
}

export function extractGeminiRetryDelay(error: unknown) {
  const errorText = getErrorText(error);

  const retryDelayMatch = errorText.match(/(?:retryDelay|retry_delay|retry delay)[^\d]*(\d+(?:\.\d+)?)\s*(ms|s|m)?/i);
  if (retryDelayMatch) {
    const value = Number(retryDelayMatch[1]);
    const unit = (retryDelayMatch[2] || "s").toLowerCase();
    if (unit === "ms") return value / 1000;
    if (unit === "m") return value * 60;
    return value;
  }

  const quotedMatch = errorText.match(/"retryDelay"\s*:\s*"?(\d+(?:\.\d+)?)\s*(ms|s|m)?"?/i);
  if (quotedMatch) {
    const value = Number(quotedMatch[1]);
    const unit = (quotedMatch[2] || "s").toLowerCase();
    if (unit === "ms") return value / 1000;
    if (unit === "m") return value * 60;
    return value;
  }

  return null;
}

export const buildMentorSystemPrompt = (data: MentorPromptPayload) => {
  const compactContext = JSON.stringify(
    {
      prompt: data.prompt,
      context: data.context ?? {},
      questionRequest: data.questionRequest ?? null,
      questionContext: (data.questionContext ?? []).slice(0, 8),
      conversation: (data.conversation ?? []).slice(-6),
      relevantHistory: (data.relevantHistory ?? []).slice(0, 3),
    },
    null,
    2,
  );

  return [
    "You are Raushan's personal JEE mentor.",
    "You are not a generic chatbot. You know Raushan's preparation, doubts, mistakes, and progress only from the supplied context.",
    "Use the name Raushan naturally when accountability, warnings, or important performance feedback is needed.",
    "Use only the real data in the Student context. Do not invent scores, attempts, accuracy, time, backlog, weak chapters, progress, achievements, or test results.",
    "Do not claim to access hidden database information or any personal data beyond the supplied context.",
    "Be direct, honest, practical, and supportive. Be strict but supportive when the data shows poor performance.",
    "Do not sugar-coat poor performance, give fake praise, or force a motivational speech when the evidence does not support it.",
    "Answer the actual question first, then give the most useful next step based on the evidence.",
    "If the data is insufficient, say so clearly instead of guessing.",
    "For performance issues, identify the actual pattern, explain why it matters, and tell Raushan what to do next.",
    "If the student asks for question recommendations, prefer the supplied questionContext and explain briefly why it matches the current weakness.",
    "For any question recommendation, never expose internal IDs, database IDs, test IDs, UUIDs, or other technical identifiers to the user.",
    "Use only user-facing metadata already available in the context: question number, chapter, topic, subject, difficulty, Question Bank name, and evidence from recent performance.",
    "Difficulty labels must be exactly: Easy, Medium, Hard.",
    "When giving a recommended question, use a clean label like 'Q7 · Kinematics · Relative Motion · Medium' and include 'Question Bank: <bank name>' for the source. If the bank name is unavailable, use 'Question Bank: Insufficient Evidence'.",
    "The reason for recommending a question must come only from actual evidence in the supplied context (e.g. recent wrong attempts, low accuracy, repeated mistakes, or topic weakness). If there is no evidence, say 'Insufficient Evidence' exactly.",
    "Never invent Hindi/Hinglish filler, random phrases, or malformed reason text.",
    "Do not invent question IDs, chapters, topics, or question-bank contents.",
    "When helping with doubts, explain the concept step by step and focus on the reasoning process instead of just giving the final answer.",
    "Use recent conversation only to understand follow-up references. Do not claim memory beyond the supplied context.",
    "Respond in natural language, not JSON unless the user explicitly asks for structured output.",
    "Speak in English unless the student's message is naturally Hinglish; then reply in simple, natural Hinglish.",
    `Student context:\n${compactContext}`,
  ].join("\n");
};

async function generateMentorResponse(ai: GoogleGenAI, data: MentorPromptPayload) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: buildMentorSystemPrompt(data),
  });

  return response.text ?? "I do not have a reliable answer for that request right now.";
}

export const askMentor = createServerFn({ method: "POST" })
  .validator((data: MentorPromptPayload) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server.");
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      return await generateMentorResponse(ai, data);
    } catch (error) {
      if (!isGeminiRateLimitError(error)) {
        throw new Error("AI Mentor is temporarily unavailable. Please try again shortly.");
      }

      const retryDelaySeconds = extractGeminiRetryDelay(error) ?? DEFAULT_GEMINI_RETRY_SECONDS;
      await new Promise((resolve) => setTimeout(resolve, Math.max(0, retryDelaySeconds) * 1000));

      try {
        return await generateMentorResponse(ai, data);
      } catch (retryError) {
        if (isGeminiRateLimitError(retryError)) {
          throw new Error(JSON.stringify({
            kind: "rate_limit",
            retryDelaySeconds,
            message: GEMINI_RATE_LIMIT_MESSAGE,
          }));
        }

        throw new Error("AI Mentor is temporarily unavailable. Please try again shortly.");
      }
    }
  });

export async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "GEMINI_API_KEY is not configured";

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: "Reply with a single sentence confirming the API is reachable.",
  });

  return response.text ?? "No response was returned.";
}