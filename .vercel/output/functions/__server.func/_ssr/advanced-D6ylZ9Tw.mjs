import { C as validatePool, f as isCorrect } from "./xp-CqT-O4I5.mjs";
import { F as listAttempts, V as listTests } from "./db-CAmn2mwk.mjs";
import { a as questionsForAttempt } from "./stats-B0uMixd3.mjs";
import { s as examOf } from "./bank-Q2zv39_H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced-D6ylZ9Tw.js
/**
* JEE Advanced module core.
*
* Everything here is additive — JEE Main logic (bank.ts, stats.ts, scoring.ts)
* is untouched and keeps working exactly as before.
*/
/** Detects Paper 1 / Paper 2 from tags or the file name — never asks the user. */
function detectPaper(name, tagged) {
	if (tagged === 1 || tagged === 2) return tagged;
	const n = name.toLowerCase();
	if (/(paper[\s_-]*2|p[\s_-]*2\b|\bpaper2\b|\bii\b)/.test(n)) return 2;
	return 1;
}
function detectYear(name, tagged) {
	if (tagged && tagged > 1950) return tagged;
	const m = name.match(/(19|20)\d{2}/);
	return m ? Number(m[0]) : void 0;
}
var isAdvanced = (t) => examOf(t) === "advanced";
function advancedTests(tests) {
	return tests.filter(isAdvanced);
}
function paperOf(t) {
	return detectPaper(t.name, t.paper);
}
function yearOf(t) {
	return detectYear(t.name, t.year);
}
var SUBJECT_ORDER = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
function subjectRank(s) {
	const i = SUBJECT_ORDER.findIndex((x) => x.toLowerCase() === (s || "").toLowerCase());
	return i === -1 ? SUBJECT_ORDER.length : i;
}
/**
* Physics → Chemistry → Mathematics, renumbered 1..n so subjects never mix.
* (Physics 1–25, Chemistry 26–50, Maths 51–75 for a standard 75-question paper.)
*/
function arrangeBySubject(questions) {
	return [...questions].sort((a, b) => subjectRank(a.subject) - subjectRank(b.subject) || a.number - b.number).map((q, i) => ({
		...q,
		number: i + 1
	}));
}
function subjectBlocks(questions) {
	const blocks = [];
	questions.forEach((q, i) => {
		const last = blocks[blocks.length - 1];
		if (last && last.subject === q.subject) {
			last.to = i + 1;
			last.count += 1;
		} else blocks.push({
			subject: q.subject,
			from: i + 1,
			to: i + 1,
			count: 1
		});
	});
	return blocks;
}
/** Flat, memo-friendly pool of every JEE Advanced question. */
function advancedPool(tests) {
	const out = [];
	for (const t of advancedTests(tests)) {
		const paper = paperOf(t);
		const year = yearOf(t);
		for (const q of t.questions) out.push({
			q,
			test: t,
			paper,
			year: q.year ?? year
		});
	}
	return out;
}
/** True when a set name contains "PYQ" anywhere (case-insensitive). */
function isPyqName(name) {
	return /pyq/i.test(String(name ?? ""));
}
/**
* Every question available to Advanced → PYQ: the Advanced pool plus any set
* whose name contains "PYQ", regardless of which library it was imported into.
*/
function pyqPool(tests) {
	const out = advancedPool(tests);
	const seen = new Set(out.map((i) => i.test.id));
	for (const t of tests) {
		if (seen.has(t.id) || !isPyqName(t.name)) continue;
		const paper = paperOf(t);
		const year = yearOf(t);
		for (const q of t.questions) out.push({
			q,
			test: t,
			paper,
			year: q.year ?? year
		});
	}
	return out;
}
/** Built once per pool change; keeps filtering O(n) with no per-keystroke work. */
function buildIndex(items) {
	const byId = /* @__PURE__ */ new Map();
	const search = /* @__PURE__ */ new Map();
	const subjects = /* @__PURE__ */ new Set();
	const chapters = /* @__PURE__ */ new Set();
	const topics = /* @__PURE__ */ new Set();
	const years = /* @__PURE__ */ new Set();
	const types = /* @__PURE__ */ new Set();
	for (const it of items) {
		byId.set(it.q.id, it);
		search.set(it.q.id, `${it.q.text} ${it.q.chapter} ${it.q.topic} ${it.q.subject} ${it.test.name}`.toLowerCase());
		subjects.add(it.q.subject || "General");
		chapters.add(it.q.chapter || "General");
		if (it.q.topic) topics.add(it.q.topic);
		if (it.year) years.add(it.year);
		types.add(it.q.type);
	}
	return {
		items,
		byId,
		search,
		subjects: [...subjects].sort(),
		chapters: [...chapters].sort(),
		topics: [...topics].sort(),
		years: [...years].sort((a, b) => b - a),
		types: [...types]
	};
}
function customPyqSelection(items, f) {
	if (!Boolean(f.papers?.length || f.years?.length || f.subjects?.length || f.chapters?.length || f.topics?.length)) return items;
	return items.filter(({ q, paper, year }) => {
		if (f.papers?.length && !f.papers.includes(paper)) return false;
		if (f.years?.length && (!year || !f.years.includes(year))) return false;
		if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
		if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
		if (f.topics?.length && (!q.topic || !f.topics.includes(q.topic))) return false;
		return true;
	});
}
function filterAdvanced(index, f, history) {
	const term = f.search?.trim().toLowerCase() ?? "";
	return index.items.filter(({ q, paper, year }) => {
		if (f.papers?.length && !f.papers.includes(paper)) return false;
		if (f.years?.length && (!year || !f.years.includes(year))) return false;
		if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
		if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
		if (f.topics?.length && (!q.topic || !f.topics.includes(q.topic))) return false;
		if (f.difficulties?.length && !f.difficulties.includes(q.difficulty)) return false;
		if (f.types?.length && !f.types.includes(q.type)) return false;
		if (f.pyqOnly && !q.pyq) return false;
		if (history && f.source && f.source !== "all" && f.source !== "imported") {
			if (f.source === "wrong" && !history.wrong.has(q.id)) return false;
			if (f.source === "unattempted" && history.attempted.has(q.id)) return false;
			if (f.source === "bookmarked" && !history.bookmarks.has(q.id)) return false;
			if (f.source === "pyq" && !q.pyq) return false;
			if (f.source === "weak" && !history.weakChapters.has(`${q.subject}::${q.chapter}`)) return false;
			if (f.source === "strong" && !history.strongChapters.has(`${q.subject}::${q.chapter}`)) return false;
		}
		if (term && !(index.search.get(q.id) ?? "").includes(term)) return false;
		return true;
	});
}
var BOOKMARK_TAGS = [
	"Revision",
	"Doubt",
	"Important",
	"Formula",
	"Favourite"
];
var EMPTY_HISTORY = () => ({
	used: /* @__PURE__ */ new Set(),
	attempted: /* @__PURE__ */ new Set(),
	correct: /* @__PURE__ */ new Set(),
	wrong: /* @__PURE__ */ new Set(),
	bookmarks: /* @__PURE__ */ new Set(),
	bookmarkList: [],
	chapterAccuracy: /* @__PURE__ */ new Map(),
	weakChapters: /* @__PURE__ */ new Set(),
	strongChapters: /* @__PURE__ */ new Set()
});
var isAdvancedAttempt = (a) => a.exam === "advanced" || /advanc/i.test(a.testName ?? "");
async function advancedHistory() {
	const attempts = (await listAttempts()).filter(isAdvancedAttempt);
	const h = EMPTY_HISTORY();
	for (const a of attempts) {
		const questions = await questionsForAttempt(a);
		const completed = Boolean(a.submitted);
		for (const q of questions) {
			const ans = a.answers[q.id];
			if (completed) h.used.add(q.id);
			if (ans?.bookmarked) {
				if (!h.bookmarks.has(q.id)) {
					h.bookmarks.add(q.id);
					h.bookmarkList.push({
						question: q,
						tag: ans.tag,
						attemptId: a.id,
						testName: a.testName,
						year: q.year,
						correct: ans.value != null ? isCorrect(q, ans.value) : void 0
					});
				}
			}
			if (!completed) continue;
			if (!(ans?.value != null && String(ans.value).length > 0)) continue;
			h.attempted.add(q.id);
			const key = `${q.subject}::${q.chapter}`;
			const bucket = h.chapterAccuracy.get(key) ?? {
				correct: 0,
				total: 0
			};
			bucket.total += 1;
			if (isCorrect(q, ans.value)) {
				bucket.correct += 1;
				h.correct.add(q.id);
				h.wrong.delete(q.id);
			} else h.wrong.add(q.id);
			h.chapterAccuracy.set(key, bucket);
		}
	}
	for (const [key, v] of h.chapterAccuracy) {
		if (v.total < 3) continue;
		if (v.correct / v.total < .6) h.weakChapters.add(key);
		else if (v.correct / v.total >= .8) h.strongChapters.add(key);
	}
	return h;
}
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function pickQuestions(items, opts) {
	const valid = validatePool(items, (i) => i.q).valid;
	const picked = shuffle(opts.allowRepeat ? valid : valid.filter((i) => !opts.used?.has(i.q.id))).slice(0, Math.max(0, opts.count)).map((i) => i.q);
	return opts.arrange === false ? picked : arrangeBySubject(picked);
}
/** Even Physics / Chemistry / Maths split for full papers. */
function pickBalanced(items, perSubject, opts) {
	const out = [];
	for (const s of SUBJECT_ORDER) {
		const subset = items.filter((i) => i.q.subject.toLowerCase() === s.toLowerCase());
		out.push(...pickQuestions(subset, {
			...opts,
			count: perSubject,
			arrange: false
		}));
	}
	if (out.length === 0) return pickQuestions(items, {
		...opts,
		count: perSubject * 3
	});
	return arrangeBySubject(out);
}
async function advancedContext() {
	const [tests, history] = await Promise.all([listTests(), advancedHistory()]);
	const pool = advancedPool(tests);
	return {
		tests,
		pool,
		pyq: pyqPool(tests),
		index: buildIndex(pool),
		history
	};
}
//#endregion
export { arrangeBySubject as a, detectPaper as c, isAdvancedAttempt as d, paperOf as f, yearOf as g, subjectBlocks as h, advancedTests as i, detectYear as l, pickQuestions as m, advancedContext as n, buildIndex as o, pickBalanced as p, advancedHistory as r, customPyqSelection as s, BOOKMARK_TAGS as t, filterAdvanced as u };
