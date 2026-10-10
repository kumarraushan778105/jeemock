import type { Attempt, Question } from "./types";
import { isCorrect, isAnswered } from "./scoring";

export type XpTransactionType = "earn" | "spend";
export interface XpTransaction {
  id: string;
  type: XpTransactionType;
  amount: number;
  source: "test-question" | "error-journal" | "live-test" | "manual";
  sourceId: string;
  reason: string;
  timestamp: number;
  attemptId?: string;
  questionId?: string;
  xpRewarded?: number;
}

export interface XpState {
  balance: number;
  weeklyEarned: number;
  weeklySpent: number;
  cycleStart: string;
  cycleEnd: string;
  transactions: XpTransaction[];
}

const XP_STORAGE_KEY = "cbt_xp";
const ERROR_JOURNAL_XP_SETTING_KEY = "cbt_error_journal_require_xp";
const XP_EVENT = "cbt-xp-change";
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const memoryStore = new Map<string, string>();

function storage(): Pick<Storage, "getItem" | "setItem" | "removeItem"> {
  try {
    const ls = globalThis.localStorage;
    if (ls && typeof ls.getItem === "function" && typeof ls.setItem === "function" && typeof ls.removeItem === "function") {
      return ls;
    }
  } catch {
    // Ignore browser/localStorage access restrictions.
  }

  return {
    getItem: (key: string) => memoryStore.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memoryStore.set(key, value);
    },
    removeItem: (key: string) => {
      memoryStore.delete(key);
    },
  };
}

function nowIso() {
  return new Date().toISOString();
}

function readXpState(): XpState {
  try {
    const raw = storage().getItem(XP_STORAGE_KEY);
    if (!raw) return makeFreshXpState();
    const parsed = JSON.parse(raw) as Partial<XpState>;
    const state = {
      ...makeFreshXpState(),
      ...parsed,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
    } as XpState;
    return ensureXpCycle(state);
  } catch {
    return makeFreshXpState();
  }
}

function writeXpState(next: XpState) {
  storage().setItem(XP_STORAGE_KEY, JSON.stringify(next));
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new Event(XP_EVENT));
  }
}

export function makeFreshXpState(): XpState {
  const now = Date.now();
  return {
    balance: 0,
    weeklyEarned: 0,
    weeklySpent: 0,
    cycleStart: new Date(now).toISOString(),
    cycleEnd: new Date(now + WEEK_MS).toISOString(),
    transactions: [],
  };
}

export function ensureXpCycle(state: XpState): XpState {
  const now = Date.now();
  const cycleStart = new Date(state.cycleStart).getTime();
  const cycleEnd = new Date(state.cycleEnd).getTime();

  if (!state.cycleStart || !state.cycleEnd || Number.isNaN(cycleStart) || Number.isNaN(cycleEnd)) {
    return { ...makeFreshXpState(), ...state, transactions: state.transactions ?? [] };
  }

  if (now >= cycleEnd) {
    const next: XpState = {
      ...state,
      weeklyEarned: 0,
      weeklySpent: 0,
      cycleStart: new Date(now).toISOString(),
      cycleEnd: new Date(now + WEEK_MS).toISOString(),
    };
    return next;
  }
  return state;
}

export function getXpState(): XpState {
  return ensureXpCycle(readXpState());
}

export function getRequireXpForErrorJournal(): boolean {
  try {
    const raw = storage().getItem(ERROR_JOURNAL_XP_SETTING_KEY);
    if (raw === null || raw === undefined) return true;
    return raw === "true" || raw === "1";
  } catch {
    return true;
  }
}

export function setRequireXpForErrorJournal(enabled: boolean) {
  storage().setItem(ERROR_JOURNAL_XP_SETTING_KEY, String(enabled));
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new Event(XP_EVENT));
  }
}

export function formatXp(value: number) {
  return `${value >= 0 ? "+" : "-"}${Math.abs(value).toLocaleString()} XP`;
}

export function getXpSummary() {
  const state = getXpState();
  const cycleProgress = Math.min(
    7,
    Math.max(1, Math.floor((Date.now() - new Date(state.cycleStart).getTime()) / DAY_MS) + 1),
  );
  return {
    ...state,
    cycleDay: cycleProgress,
    cycleTotal: 7,
  };
}

export function resetXpForTesting() {
  storage().removeItem(XP_STORAGE_KEY);
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(new Event(XP_EVENT));
  }
}

export function setXpStateForTesting(next: Partial<XpState>) {
  const state = { ...makeFreshXpState(), ...next, transactions: next.transactions ?? [] } as XpState;
  writeXpState(state);
}

export function hasXpTransaction(source: string, sourceId: string) {
  const { transactions } = getXpState();
  return transactions.some((tx) => tx.source === source && tx.sourceId === sourceId);
}

export function awardXpForCorrectAnswer(attemptId: string, questionId: string, reason = "Correct question") {
  const sourceId = `${attemptId}:${questionId}`;
  const exists = hasXpTransaction("test-question", sourceId);
  if (exists) {
    return { amount: 0, transaction: null as XpTransaction | null, state: getXpState() };
  }

  const state = ensureXpCycle(readXpState());
  const tx: XpTransaction = {
    id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
    type: "earn",
    amount: 4,
    source: "test-question",
    sourceId,
    reason,
    timestamp: Date.now(),
    attemptId,
    questionId,
    xpRewarded: 4,
  };

  const next: XpState = {
    ...state,
    balance: state.balance + 4,
    weeklyEarned: state.weeklyEarned + 4,
    transactions: [tx, ...state.transactions],
  };
  writeXpState(next);
  return { amount: 4, transaction: tx, state: next };
}

export function spendXpForErrorJournal(entryId: string, amount = 20) {
  const state = ensureXpCycle(readXpState());
  const sourceId = `error-journal:${entryId}`;
  const exists = hasXpTransaction("error-journal", sourceId);
  if (exists) {
    return { amount: 0, transaction: null as XpTransaction | null, state, ok: false };
  }

  const available = state.balance;
  if (available < amount) {
    return { amount: 0, transaction: null as XpTransaction | null, state, ok: false, insufficient: true };
  }

  const tx: XpTransaction = {
    id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
    type: "spend",
    amount,
    source: "error-journal",
    sourceId,
    reason: "Added Error Journal entry",
    timestamp: Date.now(),
  };

  const next: XpState = {
    ...state,
    balance: state.balance - amount,
    weeklySpent: state.weeklySpent + amount,
    transactions: [tx, ...state.transactions],
  };
  writeXpState(next);
  return { amount: amount, transaction: tx, state: next, ok: true };
}

export function applyMissedLiveTestPenalty(testId: string, amount = 10) {
  const state = ensureXpCycle(readXpState());
  const sourceId = `live-test:${testId}`;
  const exists = hasXpTransaction("live-test", sourceId);
  if (exists) {
    return { amount: 0, transaction: null as XpTransaction | null, state, ok: false, alreadyApplied: true };
  }

  const available = Math.max(0, state.balance);
  const deduction = Math.min(amount, available);
  if (deduction <= 0) {
    return { amount: 0, transaction: null as XpTransaction | null, state, ok: false, insufficient: true };
  }

  const tx: XpTransaction = {
    id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
    type: "spend",
    amount: deduction,
    source: "live-test",
    sourceId,
    reason: "Missed Live Test",
    timestamp: Date.now(),
  };

  const next: XpState = {
    ...state,
    balance: Math.max(0, state.balance - deduction),
    weeklySpent: state.weeklySpent + deduction,
    transactions: [tx, ...state.transactions],
  };
  writeXpState(next);
  return { amount: deduction, transaction: tx, state: next, ok: true };
}

export function addXpTransaction(tx: XpTransaction) {
  const state = ensureXpCycle(readXpState());
  if (state.transactions.some((t) => t.id === tx.id || (t.source === tx.source && t.sourceId === tx.sourceId))) {
    return { state, created: false };
  }
  const next: XpState = {
    ...state,
    balance: state.balance + (tx.type === "earn" ? tx.amount : -tx.amount),
    weeklyEarned: tx.type === "earn" ? state.weeklyEarned + tx.amount : state.weeklyEarned,
    weeklySpent: tx.type === "spend" ? state.weeklySpent + tx.amount : state.weeklySpent,
    transactions: [tx, ...state.transactions],
  };
  writeXpState(next);
  return { state: next, created: true };
}

export async function awardAttemptXp(attempt: Attempt, questions: Question[]) {
  const total = questions.reduce((sum, q) => {
    const answer = attempt.answers[q.id];
    if (!answer || !isAnswered(answer.value)) return sum;
    return isCorrect(q, answer.value) ? sum + 4 : sum;
  }, 0);

  if (total <= 0) return 0;

  let awarded = 0;
  const seen = new Set<string>();
  for (const q of questions) {
    const answer = attempt.answers[q.id];
    if (!answer || !isAnswered(answer.value) || !isCorrect(q, answer.value)) continue;
    const sourceId = `${attempt.id}:${q.id}`;
    if (seen.has(sourceId) || hasXpTransaction("test-question", sourceId)) continue;
    seen.add(sourceId);
    const result = awardXpForCorrectAnswer(attempt.id, q.id, `Correct question · ${q.subject}`);
    awarded += result.amount;
  }
  return awarded;
}

export function canSpendXp(amount: number) {
  return getXpState().balance >= amount;
}

export function getXpCycleDay() {
  const state = getXpState();
  const start = new Date(state.cycleStart).getTime();
  const elapsed = Date.now() - start;
  const day = Math.min(7, Math.max(1, Math.floor(elapsed / DAY_MS) + 1));
  return { current: day, total: 7 };
}

export function xpForAttempt(attempt: Attempt, questions: Question[]) {
  return questions.reduce((sum, q) => {
    const answer = attempt.answers[q.id];
    if (!answer || !isAnswered(answer.value) || !isCorrect(q, answer.value)) return sum;
    return sum + 4;
  }, 0);
}

export function xpTransactionSourceLabel(source: XpTransaction["source"]) {
  switch (source) {
    case "test-question":
      return "Live Test / Question";
    case "error-journal":
      return "Error Journal";
    case "live-test":
      return "Live Test";
    default:
      return "Manual";
  }
}

export function xpTransactionAmountLabel(tx: XpTransaction) {
  return tx.type === "earn" ? `+${tx.amount}` : `-${tx.amount}`;
}

export function xpTransactionDateLabel(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

export function xpForResultAttempt(attempt: Attempt, questions: Question[]) {
  return questions.reduce((sum, q) => {
    const answer = attempt.answers[q.id];
    if (!answer || !isAnswered(answer.value) || !isCorrect(q, answer.value)) return sum;
    return sum + 4;
  }, 0);
}

export function xpBalanceLabel() {
  return `${getXpState().balance.toLocaleString()} XP`;
}

export function xpCycleLabel() {
  const { current, total } = getXpCycleDay();
  return `Day ${current} / ${total}`;
}

export function xpPrivacyMode() {
  return nowIso();
}
