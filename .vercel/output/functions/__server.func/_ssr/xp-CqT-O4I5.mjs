import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/xp-CqT-O4I5.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var LETTERS = "ABCDEFGHIJKL".split("");
/**
* Stable, unique option ids.
* Imported sets sometimes ship options with missing or duplicated ids, which made
* every duplicate toggle together. Falling back to the option letter keeps
* selection and answer-key matching one-to-one.
*/
function optionIds(q) {
	const used = /* @__PURE__ */ new Set();
	return q.options.map((o, i) => {
		const base = String(o.id ?? "").trim() || LETTERS[i] || String(i);
		let id = base;
		if (used.has(id)) id = LETTERS[i] ?? `${base}_${i}`;
		let n = 1;
		while (used.has(id)) id = `${base}_${n++}`;
		used.add(id);
		return id;
	});
}
/**
* True when the question must accept more than one selection.
* Detected from the stored answer key, so an answer-key import that adds a
* second correct option upgrades a "single" question automatically.
*/
function isMultiCorrect(q) {
	if (q.type === "integer" || q.type === "numerical" || q.matrix) return false;
	if (q.type === "multiple") return true;
	return (q.correct?.length ?? 0) > 1;
}
/**
* Human readable answer key of a match-the-following / matrix question.
* Uses the stored pairs when present, otherwise the positional `correct` array.
*/
function matrixAnswerLabel(q) {
	const rows = q.matrix?.left?.length ?? q.correct.length;
	const pairs = q.matrixPairs;
	const out = [];
	for (let i = 0; i < rows; i++) {
		const key = String(i + 1);
		const val = pairs?.[key] ?? q.correct[i];
		if (val) out.push(`${key} → ${val}`);
	}
	return out.join(", ") || "—";
}
var QUESTION_TYPE_LABEL = {
	single: "Single Correct",
	multiple: "Multiple Correct",
	integer: "Integer",
	numerical: "Numerical",
	matrix: "Matrix Match",
	assertion: "Assertion Reason",
	paragraph: "Paragraph",
	diagram: "Diagram",
	graph: "Graph",
	table: "Table"
};
var EXAM_LABEL = {
	main: "JEE Main",
	advanced: "JEE Advanced"
};
var SUBJECTS = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
/**
* Parses "2", "2,3", "2.5, 3.5" (also `;`/space separated) into a de-duplicated
* list of finite numbers. Used by the answer editor, importer and answer keys so
* numerical questions can hold several acceptable values.
*/
function parseNumericList(input) {
	const raw = Array.isArray(input) ? input : [input];
	const out = [];
	for (const part of raw) {
		if (part === null || part === void 0) continue;
		for (const piece of String(part).split(/[,;|\s]+/)) {
			const t = piece.trim();
			if (!t) continue;
			const n = Number(t);
			if (!Number.isFinite(n)) continue;
			if (!out.some((x) => x === n)) out.push(n);
		}
	}
	return out;
}
/** Every accepted numerical answer of a question (legacy single value included). */
function numericAnswers(q) {
	const many = q.answerValues?.filter((n) => Number.isFinite(n)) ?? [];
	const all = many.length ? [...many] : [];
	if (q.answerValue !== void 0 && Number.isFinite(q.answerValue) && !all.includes(q.answerValue)) all.push(q.answerValue);
	return all;
}
/** Human readable answer key of a numerical question. */
function numericAnswerLabel(q) {
	const list = numericAnswers(q);
	return list.length ? list.join(", ") : "—";
}
var isNumericType = (t) => t === "integer" || t === "numerical";
var VALID_TYPES = new Set(Object.keys(QUESTION_TYPE_LABEL));
/** Normalized content signature used for duplicate detection. */
function contentSignature(q) {
	return `${String(q.text ?? "").toLowerCase().replace(/\s+/g, " ").trim()}##${(q.options ?? []).map((o) => String(o?.text ?? "").toLowerCase().replace(/\s+/g, " ").trim()).join("|")}`;
}
/**
* Validates one question. `seen` (optional) accumulates ids and content
* signatures so duplicates inside the same pool are reported.
*/
function validateQuestion(q, seen) {
	const reasons = [];
	if (!q || typeof q !== "object") return {
		valid: false,
		reasons: ["Corrupted question data"]
	};
	if (!Array.isArray(q.options)) reasons.push("Corrupted question data (options are not a list)");
	const type = q.type;
	if (!type || !VALID_TYPES.has(type)) reasons.push(`Invalid question type "${String(type)}"`);
	const text = String(q.text ?? "").trim();
	const hasImage = Array.isArray(q.images) && q.images.length > 0;
	if (!text && !hasImage) reasons.push("Missing question text");
	const numeric = isNumericType(type);
	const matrix = Boolean(q.matrix);
	const objective = !numeric && !matrix;
	if (numeric) {
		if (numericAnswers(q).length === 0) reasons.push("Invalid or missing numerical answer");
	} else if (objective) {
		/** image-only question: the uploaded image *is* the whole question (stem + options),
		*  so typed option text is not required — only a marked correct option. */
		const imageOnly = !text && hasImage;
		const options = Array.isArray(q.options) ? q.options : [];
		const filled = options.filter((o) => String(o?.text ?? "").trim() || (o?.images?.length ?? 0) > 0);
		if (!imageOnly) {
			if (options.length < 2) reasons.push("Missing options (fewer than 2)");
			else if (filled.length < 2) reasons.push("Incomplete options (empty option text)");
		}
		const correct = (q.correct ?? []).map(String).filter((c) => c.trim());
		if (correct.length === 0) reasons.push("Missing correct answer");
		else if (!imageOnly && options.length >= 2) {
			const ids = new Set(optionIds(q));
			if (!correct.some((c) => ids.has(c))) reasons.push("Correct answer does not match any option");
		}
	} else if ((q.correct ?? []).length === 0) reasons.push("Missing correct answer");
	if (!Number.isFinite(q.marks)) reasons.push("Incomplete data (invalid marks)");
	if (seen) {
		const id = String(q.id ?? "");
		if (!id) reasons.push("Incomplete data (missing question id)");
		else if (seen.ids.has(id)) reasons.push("Duplicate question id");
		else seen.ids.add(id);
		if (text) {
			const sig = contentSignature(q);
			if (seen.signatures.has(sig)) reasons.push("Duplicate question");
			else seen.signatures.add(sig);
		}
	}
	return {
		valid: reasons.length === 0,
		reasons
	};
}
/** Validates a pool, reporting duplicates across the whole pool. */
function validatePool(items, pick) {
	const seen = {
		ids: /* @__PURE__ */ new Set(),
		signatures: /* @__PURE__ */ new Set()
	};
	const report = {
		valid: [],
		invalid: [],
		total: items.length,
		reasonsById: /* @__PURE__ */ new Map()
	};
	for (const item of items) {
		const q = pick(item);
		const res = validateQuestion(q, seen);
		if (res.valid) report.valid.push(item);
		else {
			report.invalid.push({
				item,
				reasons: res.reasons
			});
			report.reasonsById.set(String(q?.id ?? ""), res.reasons);
		}
	}
	return report;
}
/** Valid/invalid counts for a set of questions. */
function validationCounts(questions) {
	const r = validatePool(questions, (q) => q);
	return {
		total: r.total,
		valid: r.valid.length,
		invalid: r.invalid.length
	};
}
function isCorrect(q, value) {
	if (value === null || value === void 0) return false;
	if (q.type === "integer" || q.type === "numerical") {
		const n = Number(Array.isArray(value) ? value[0] : value);
		const accepted = numericAnswers(q);
		if (Number.isNaN(n) || accepted.length === 0) return false;
		const tol = q.type === "integer" ? 0 : q.tolerance ?? .01;
		return accepted.some((a) => Math.abs(n - a) <= tol);
	}
	const given = (Array.isArray(value) ? value : [value]).map(String).sort();
	const want = [...q.correct].map(String).sort();
	if (given.length === 0 || want.length === 0) return false;
	return given.length === want.length && given.every((g, i) => g === want[i]);
}
function isAnswered(value) {
	if (value === null || value === void 0) return false;
	if (Array.isArray(value)) return value.length > 0;
	return String(value).trim() !== "";
}
function scoreAttempt(test, attempt) {
	const perQuestion = test.questions.map((q) => {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value)) return {
			question: q,
			answer,
			status: "skipped",
			score: 0
		};
		const ok = isCorrect(q, answer.value);
		return {
			question: q,
			answer,
			status: ok ? "correct" : "wrong",
			score: ok ? q.marks : -q.negative
		};
	});
	const correct = perQuestion.filter((r) => r.status === "correct").length;
	const wrong = perQuestion.filter((r) => r.status === "wrong").length;
	const skipped = perQuestion.filter((r) => r.status === "skipped").length;
	const score = perQuestion.reduce((a, r) => a + r.score, 0);
	const maxScore = test.questions.reduce((a, q) => a + q.marks, 0);
	const negative = perQuestion.filter((r) => r.score < 0).reduce((a, r) => a + r.score, 0);
	const attempted = correct + wrong;
	const accuracy = attempted ? correct / attempted * 100 : 0;
	const group = (key) => {
		const map = /* @__PURE__ */ new Map();
		for (const r of perQuestion) {
			const k = key(r.question) || "General";
			const cur = map.get(k) ?? {
				name: k,
				correct: 0,
				wrong: 0,
				skipped: 0,
				score: 0,
				total: 0,
				time: 0
			};
			cur.total += 1;
			cur.score += r.score;
			cur.time += r.answer?.timeSpent ?? 0;
			cur[r.status] += 1;
			map.set(k, cur);
		}
		return [...map.values()].sort((a, b) => b.total - a.total);
	};
	return {
		perQuestion,
		correct,
		wrong,
		skipped,
		score,
		maxScore,
		negative,
		accuracy,
		timeSpent: perQuestion.reduce((a, r) => a + (r.answer?.timeSpent ?? 0), 0),
		bySubject: group((q) => q.subject),
		byChapter: group((q) => q.chapter)
	};
}
function formatClock(totalSeconds) {
	const s = Math.max(0, Math.floor(totalSeconds));
	return [
		Math.floor(s / 3600),
		Math.floor(s % 3600 / 60),
		s % 60
	].map((n) => String(n).padStart(2, "0")).join(":");
}
var XP_STORAGE_KEY = "cbt_xp";
var ERROR_JOURNAL_XP_SETTING_KEY = "cbt_error_journal_require_xp";
var XP_EVENT = "cbt-xp-change";
var DAY_MS = 1440 * 60 * 1e3;
var WEEK_MS = 7 * DAY_MS;
var memoryStore = /* @__PURE__ */ new Map();
function storage() {
	try {
		const ls = globalThis.localStorage;
		if (ls && typeof ls.getItem === "function" && typeof ls.setItem === "function" && typeof ls.removeItem === "function") return ls;
	} catch {}
	return {
		getItem: (key) => memoryStore.get(key) ?? null,
		setItem: (key, value) => {
			memoryStore.set(key, value);
		},
		removeItem: (key) => {
			memoryStore.delete(key);
		}
	};
}
function readXpState() {
	try {
		const raw = storage().getItem(XP_STORAGE_KEY);
		if (!raw) return makeFreshXpState();
		const parsed = JSON.parse(raw);
		return ensureXpCycle({
			...makeFreshXpState(),
			...parsed,
			transactions: Array.isArray(parsed.transactions) ? parsed.transactions : []
		});
	} catch {
		return makeFreshXpState();
	}
}
function writeXpState(next) {
	storage().setItem(XP_STORAGE_KEY, JSON.stringify(next));
	if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") window.dispatchEvent(new Event(XP_EVENT));
}
function makeFreshXpState() {
	const now = Date.now();
	return {
		balance: 0,
		weeklyEarned: 0,
		weeklySpent: 0,
		cycleStart: new Date(now).toISOString(),
		cycleEnd: new Date(now + WEEK_MS).toISOString(),
		transactions: []
	};
}
function ensureXpCycle(state) {
	const now = Date.now();
	const cycleStart = new Date(state.cycleStart).getTime();
	const cycleEnd = new Date(state.cycleEnd).getTime();
	if (!state.cycleStart || !state.cycleEnd || Number.isNaN(cycleStart) || Number.isNaN(cycleEnd)) return {
		...makeFreshXpState(),
		...state,
		transactions: state.transactions ?? []
	};
	if (now >= cycleEnd) return {
		...state,
		weeklyEarned: 0,
		weeklySpent: 0,
		cycleStart: new Date(now).toISOString(),
		cycleEnd: new Date(now + WEEK_MS).toISOString()
	};
	return state;
}
function getXpState() {
	return ensureXpCycle(readXpState());
}
function getRequireXpForErrorJournal() {
	try {
		const raw = storage().getItem(ERROR_JOURNAL_XP_SETTING_KEY);
		if (raw === null || raw === void 0) return true;
		return raw === "true" || raw === "1";
	} catch {
		return true;
	}
}
function setRequireXpForErrorJournal(enabled) {
	storage().setItem(ERROR_JOURNAL_XP_SETTING_KEY, String(enabled));
	if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") window.dispatchEvent(new Event(XP_EVENT));
}
function formatXp(value) {
	return `${value >= 0 ? "+" : "-"}${Math.abs(value).toLocaleString()} XP`;
}
function hasXpTransaction(source, sourceId) {
	const { transactions } = getXpState();
	return transactions.some((tx) => tx.source === source && tx.sourceId === sourceId);
}
function awardXpForCorrectAnswer(attemptId, questionId, reason = "Correct question") {
	const sourceId = `${attemptId}:${questionId}`;
	if (hasXpTransaction("test-question", sourceId)) return {
		amount: 0,
		transaction: null,
		state: getXpState()
	};
	const state = ensureXpCycle(readXpState());
	const tx = {
		id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
		type: "earn",
		amount: 4,
		source: "test-question",
		sourceId,
		reason,
		timestamp: Date.now(),
		attemptId,
		questionId,
		xpRewarded: 4
	};
	const next = {
		...state,
		balance: state.balance + 4,
		weeklyEarned: state.weeklyEarned + 4,
		transactions: [tx, ...state.transactions]
	};
	writeXpState(next);
	return {
		amount: 4,
		transaction: tx,
		state: next
	};
}
function spendXpForErrorJournal(entryId, amount = 20) {
	const state = ensureXpCycle(readXpState());
	const sourceId = `error-journal:${entryId}`;
	if (hasXpTransaction("error-journal", sourceId)) return {
		amount: 0,
		transaction: null,
		state,
		ok: false
	};
	if (state.balance < amount) return {
		amount: 0,
		transaction: null,
		state,
		ok: false,
		insufficient: true
	};
	const tx = {
		id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
		type: "spend",
		amount,
		source: "error-journal",
		sourceId,
		reason: "Added Error Journal entry",
		timestamp: Date.now()
	};
	const next = {
		...state,
		balance: state.balance - amount,
		weeklySpent: state.weeklySpent + amount,
		transactions: [tx, ...state.transactions]
	};
	writeXpState(next);
	return {
		amount,
		transaction: tx,
		state: next,
		ok: true
	};
}
function applyMissedLiveTestPenalty(testId, amount = 10) {
	const state = ensureXpCycle(readXpState());
	const sourceId = `live-test:${testId}`;
	if (hasXpTransaction("live-test", sourceId)) return {
		amount: 0,
		transaction: null,
		state,
		ok: false,
		alreadyApplied: true
	};
	const available = Math.max(0, state.balance);
	const deduction = Math.min(amount, available);
	if (deduction <= 0) return {
		amount: 0,
		transaction: null,
		state,
		ok: false,
		insufficient: true
	};
	const tx = {
		id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
		type: "spend",
		amount: deduction,
		source: "live-test",
		sourceId,
		reason: "Missed Live Test",
		timestamp: Date.now()
	};
	const next = {
		...state,
		balance: Math.max(0, state.balance - deduction),
		weeklySpent: state.weeklySpent + deduction,
		transactions: [tx, ...state.transactions]
	};
	writeXpState(next);
	return {
		amount: deduction,
		transaction: tx,
		state: next,
		ok: true
	};
}
async function awardAttemptXp(attempt, questions) {
	if (questions.reduce((sum, q) => {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value)) return sum;
		return isCorrect(q, answer.value) ? sum + 4 : sum;
	}, 0) <= 0) return 0;
	let awarded = 0;
	const seen = /* @__PURE__ */ new Set();
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
function getXpCycleDay() {
	const state = getXpState();
	const start = new Date(state.cycleStart).getTime();
	const elapsed = Date.now() - start;
	return {
		current: Math.min(7, Math.max(1, Math.floor(elapsed / DAY_MS) + 1)),
		total: 7
	};
}
function xpForResultAttempt(attempt, questions) {
	return questions.reduce((sum, q) => {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value) || !isCorrect(q, answer.value)) return sum;
		return sum + 4;
	}, 0);
}
function xpCycleLabel() {
	const { current, total } = getXpCycleDay();
	return `Day ${current} / ${total}`;
}
//#endregion
export { validatePool as C, xpForResultAttempt as D, xpCycleLabel as E, spendXpForErrorJournal as S, validationCounts as T, numericAnswers as _, awardAttemptXp as a, scoreAttempt as b, formatXp as c, isAnswered as d, isCorrect as f, numericAnswerLabel as g, matrixAnswerLabel as h, applyMissedLiveTestPenalty as i, getRequireXpForErrorJournal as l, isNumericType as m, QUESTION_TYPE_LABEL as n, cn as o, isMultiCorrect as p, SUBJECTS as r, formatClock as s, EXAM_LABEL as t, getXpState as u, optionIds as v, validateQuestion as w, setRequireXpForErrorJournal as x, parseNumericList as y };
