import type { MentorAnalysis, MentorContextMemory } from "./mentor";

const MEMORY_KEY = "jee-mentor-memory-v1";
const CHAT_KEY = "jee-mentor-chat-v1";
const CONVERSATIONS_KEY = "jee-mentor-conversations-v1";
const RESPONSE_CACHE_KEY = "jee-mentor-response-cache-v1";
const MAX_MESSAGES = 20;
const MAX_CONVERSATIONS = 30;
const MAX_CACHED_RESPONSES = 8;
const RESPONSE_CACHE_TTL = 24 * 60 * 60 * 1000;

export const JEE_2028_TARGET_DATE = "2028-01-24";

export interface MentorChatMessage {
  role: "user" | "mentor";
  text: string;
  timestamp: number;
}

export interface MentorConversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: MentorChatMessage[];
  tags: string[];
  summary: string;
}

export interface StoredMentorMemory extends MentorContextMemory {
  exam: "JEE 2028";
  targetDate: string;
  currentPreparationStage: string;
  studyPreferences: string[];
  importantPreviousDecisions: string[];
  performanceFingerprint: string;
  updatedAt: number;
}

const emptyMemory: StoredMentorMemory = {
  exam: "JEE 2028",
  targetDate: JEE_2028_TARGET_DATE,
  currentPreparationStage: "building a reliable preparation baseline",
  studyPreferences: [],
  importantPreviousDecisions: [],
  weakTopics: [],
  strongTopics: [],
  recentGoals: [],
  previousRecommendations: [],
  recentProgress: "No earlier Mentor performance snapshot is stored.",
  repeatedMistakes: [],
  performanceFingerprint: "",
  updatedAt: 0,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function makeConversationId() {
  return `mentor_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function formatConversationTitle(messages: MentorChatMessage[]) {
  const first = messages.find((message) => message.role === "user")?.text.trim() ?? "";
  const lower = first.toLowerCase();
  if (lower.includes("kinematic") || lower.includes("physics")) return "Physics Weak Topics";
  if (lower.includes("mock") || lower.includes("test") || lower.includes("accuracy")) return "Mock Test Analysis";
  if (lower.includes("backlog")) return "Backlog Plan";
  if (lower.includes("today") || lower.includes("study")) return "Today's Study Plan";
  if (lower.includes("chem")) return "Chemistry Weak Topics";
  if (lower.includes("strategy") || lower.includes("jee")) return "JEE 2028 Strategy";
  return first ? first.replace(/\s+/g, " ").slice(0, 42) : "Mentor Session";
}

function normalizeConversation(conversation: MentorConversation): MentorConversation {
  const messages = conversation.messages
    .filter((message) => (message.role === "user" || message.role === "mentor") && typeof message.text === "string")
    .slice(-MAX_MESSAGES);
  return {
    ...conversation,
    title: conversation.title || formatConversationTitle(messages),
    messages,
    tags: [...new Set(conversation.tags ?? [])].slice(0, 8),
    summary: conversation.summary || messages.filter((message) => message.role === "user").slice(-2).map((message) => message.text).join(" | ").slice(0, 240),
  };
}

export function loadMentorMemory(): StoredMentorMemory {
  return { ...emptyMemory, ...read<Partial<StoredMentorMemory>>(MEMORY_KEY, {}) };
}

export function saveMentorMemory(memory: StoredMentorMemory) {
  write(MEMORY_KEY, memory);
}

export function loadMentorConversations(): MentorConversation[] {
  const stored = read<MentorConversation[]>(CONVERSATIONS_KEY, []);
  if (stored.length) return stored.map(normalizeConversation).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_CONVERSATIONS);
  const legacy = read<MentorChatMessage[]>(CHAT_KEY, []).filter((message) => (message.role === "user" || message.role === "mentor") && typeof message.text === "string");
  if (!legacy.length) return [];
  const now = Date.now();
  const migrated = normalizeConversation({
    id: makeConversationId(),
    title: formatConversationTitle(legacy),
    createdAt: legacy[0]?.timestamp ?? now,
    updatedAt: legacy.at(-1)?.timestamp ?? now,
    messages: legacy,
    tags: [],
    summary: "",
  });
  saveMentorConversations([migrated]);
  return [migrated];
}

export function saveMentorConversations(conversations: MentorConversation[]) {
  write(CONVERSATIONS_KEY, conversations.map(normalizeConversation).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_CONVERSATIONS));
}

export function createMentorConversation(): MentorConversation {
  const now = Date.now();
  return { id: makeConversationId(), title: "Today's Study Plan", createdAt: now, updatedAt: now, messages: [], tags: [], summary: "" };
}

export function updateMentorConversation(conversation: MentorConversation, messages: MentorChatMessage[]): MentorConversation {
  const nextMessages = messages.slice(-MAX_MESSAGES);
  return normalizeConversation({
    ...conversation,
    title: conversation.messages.length ? conversation.title : formatConversationTitle(nextMessages),
    updatedAt: nextMessages.at(-1)?.timestamp ?? Date.now(),
    messages: nextMessages,
    summary: nextMessages.filter((message) => message.role === "user").slice(-3).map((message) => message.text).join(" | ").slice(0, 360),
  });
}

export function searchMentorConversations(conversations: MentorConversation[], query: string) {
  const terms = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter(Boolean);
  if (!terms.length) return conversations;
  return conversations.filter((conversation) => {
    const haystack = `${conversation.title} ${conversation.summary} ${conversation.tags.join(" ")} ${conversation.messages.map((message) => message.text).join(" ")}`.toLowerCase().replace(/[^a-z0-9]+/g, " ");
    return terms.every((term) => haystack.includes(term));
  });
}

export function relevantMentorHistory(conversations: MentorConversation[], query: string, activeId?: string) {
  const terms = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((term) => term.length > 2);
  return conversations
    .filter((conversation) => conversation.id !== activeId)
    .map((conversation) => {
      const text = `${conversation.title} ${conversation.summary} ${conversation.tags.join(" ")} ${conversation.messages.map((message) => message.text).join(" ")}`.toLowerCase().replace(/[^a-z0-9]+/g, " ");
      return { conversation, score: terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.conversation.updatedAt - a.conversation.updatedAt)
    .slice(0, 3)
    .map(({ conversation }) => ({
      title: conversation.title,
      summary: conversation.summary,
      recentMessages: conversation.messages.slice(-2).map(({ role, text }) => ({ role, text: text.slice(0, 280) })),
    }));
}

export function buildJeeTimeContext(now = new Date(), targetDate = JEE_2028_TARGET_DATE) {
  const nowDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const target = new Date(`${targetDate}T00:00:00Z`);
  const targetDateUtc = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate()));
  const days = Math.max(0, Math.round((targetDateUtc.getTime() - nowDate.getTime()) / 86_400_000));
  return { exam: "JEE 2028", targetDate, currentDate: nowDate.toISOString().slice(0, 10), daysRemaining: days, weeksRemaining: Math.ceil(days / 7), approximateMonthsRemaining: Math.round((days / 30.44) * 10) / 10 };
}

export function loadMentorChat() {
  return loadMentorConversations()[0]?.messages ?? [];
}

export function saveMentorChat(messages: MentorChatMessage[]) {
  const conversations = loadMentorConversations();
  const current = conversations[0] ?? createMentorConversation();
  saveMentorConversations([updateMentorConversation(current, messages), ...conversations.filter((item) => item.id !== current.id)]);
}

interface CachedMentorResponse { key: string; response: string; createdAt: number }

export function getCachedMentorResponse(key: string) {
  const now = Date.now();
  const valid = read<CachedMentorResponse[]>(RESPONSE_CACHE_KEY, []).filter((item) => typeof item.response === "string" && now - item.createdAt < RESPONSE_CACHE_TTL);
  write(RESPONSE_CACHE_KEY, valid);
  return valid.find((item) => item.key === key)?.response;
}

export function cacheMentorResponse(key: string, response: string) {
  const entries = read<CachedMentorResponse[]>(RESPONSE_CACHE_KEY, []).filter((item) => item.key !== key && Date.now() - item.createdAt < RESPONSE_CACHE_TTL);
  write(RESPONSE_CACHE_KEY, [{ key, response, createdAt: Date.now() }, ...entries].slice(0, MAX_CACHED_RESPONSES));
}

export function updateMentorMemory(analysis: MentorAnalysis, previous: StoredMentorMemory): StoredMentorMemory {
  const weakTopics = analysis.priorityTopics.slice(0, 5).map((item) => ({ subject: item.subject, topic: item.topic, accuracy: Number(item.accuracy.toFixed(1)) }));
  const strongTopics = analysis.subjectPerformance.filter((item) => item.total >= 2).sort((a, b) => b.accuracy - a.accuracy).slice(0, 3).map((item) => ({ subject: item.subject, topic: "subject trend", accuracy: Number(item.accuracy.toFixed(1)) }));
  const fingerprint = JSON.stringify({ weakTopics, recent: analysis.recentPerformance, subjects: analysis.subjectPerformance });
  const previousWeak = previous.weakTopics.map((item) => `${item.subject}:${item.topic}:${item.accuracy}`);
  const currentWeak = weakTopics.map((item) => `${item.subject}:${item.topic}:${item.accuracy}`);
  return { ...previous, exam: "JEE 2028", targetDate: previous.targetDate || JEE_2028_TARGET_DATE, weakTopics, strongTopics, previousRecommendations: analysis.recommendations.slice(0, 4), recentProgress: previousWeak.join("|") !== currentWeak.join("|") ? `Current priorities: ${currentWeak.join(", ") || "none"}. Previous priorities: ${previousWeak.join(", ") || "none"}.` : previous.recentProgress, repeatedMistakes: analysis.repeatedMistakes.slice(0, 5).map((item) => ({ subject: item.subject, topic: item.topic, count: item.count })), performanceFingerprint: fingerprint, updatedAt: Date.now() };
}

export function rememberGoal(memory: StoredMentorMemory, goal: string): StoredMentorMemory {
  const trimmed = goal.trim();
  if (!trimmed) return memory;
  return { ...memory, recentGoals: [trimmed, ...memory.recentGoals.filter((item) => item !== trimmed)].slice(0, 3) };
}
