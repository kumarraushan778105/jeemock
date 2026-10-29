import { C as validatePool, f as isCorrect } from "./xp-CqT-O4I5.mjs";
import { F as listAttempts, V as listTests, ot as usageMap } from "./db-CAmn2mwk.mjs";
import { a as questionsForAttempt } from "./stats-B0uMixd3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bank-Q2zv39_H.js
/** Flat pool of every question in every imported set. */
function bankItems(tests) {
	const out = [];
	for (const t of tests) for (const q of t.questions) out.push({
		q,
		test: t
	});
	return out;
}
/** Validation report for a bank pool — invalid questions never enter a test. */
function validateBank(items) {
	return validatePool(items, (i) => i.q);
}
/** Only questions that pass validation. */
function validBankItems(items) {
	return validateBank(items).valid;
}
/** Total / valid / invalid counts per subject. */
function validationBySubject(items) {
	const report = validateBank(items);
	const map = /* @__PURE__ */ new Map();
	const bump = (subject, key) => {
		const s = subject || "General";
		const cur = map.get(s) ?? {
			subject: s,
			total: 0,
			valid: 0,
			invalid: 0
		};
		cur.total += 1;
		cur[key] += 1;
		map.set(s, cur);
	};
	for (const it of report.valid) bump(it.q.subject, "valid");
	for (const { item } of report.invalid) bump(item.q.subject, "invalid");
	return [...map.values()].sort((a, b) => a.subject.localeCompare(b.subject));
}
/** Subject → chapter folder tree. */
function chapterTree(items) {
	const chapters = /* @__PURE__ */ new Map();
	for (const it of items) {
		const subject = it.q.subject || "General";
		const chapter = it.q.chapter || "General";
		const key = `${subject}::${chapter}`;
		let node = chapters.get(key);
		if (!node) {
			node = {
				key,
				subject,
				chapter,
				topics: [],
				total: 0,
				easy: 0,
				medium: 0,
				hard: 0,
				figures: 0,
				items: []
			};
			chapters.set(key, node);
		}
		node.total += 1;
		if (it.q.difficulty === "Easy") node.easy += 1;
		else if (it.q.difficulty === "Hard") node.hard += 1;
		else node.medium += 1;
		node.figures += it.q.images.length;
		if (it.q.topic && !node.topics.includes(it.q.topic)) node.topics.push(it.q.topic);
		node.items.push(it);
	}
	const subjects = /* @__PURE__ */ new Map();
	for (const node of chapters.values()) {
		const s = subjects.get(node.subject) ?? {
			subject: node.subject,
			total: 0,
			chapters: []
		};
		s.total += node.total;
		s.chapters.push(node);
		subjects.set(node.subject, s);
	}
	const list = [...subjects.values()];
	for (const s of list) s.chapters.sort((a, b) => a.chapter.localeCompare(b.chapter));
	return list.sort((a, b) => a.subject.localeCompare(b.subject));
}
/** Library a set belongs to — inferred from its name when not tagged. */
function examOf(test) {
	if (test?.exam) return test.exam;
	return /advanc/i.test(test?.name ?? "") ? "advanced" : "main";
}
function normalizeSearchText(value) {
	const aliases = new Map([
		["mathematics", "math"],
		["mathematical", "math"],
		["maths", "math"],
		["math", "math"],
		["physics", "physics"],
		["phy", "physics"],
		["chemistry", "chemistry"],
		["chem", "chemistry"],
		["biology", "biology"],
		["bio", "biology"]
	]);
	const normalized = (value ?? "").trim().toLowerCase().replace(/&/g, " and ").replace(/[\/\\-]+/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
	if (!normalized) return "";
	return normalized.split(" ").map((token) => aliases.get(token) ?? token).join(" ").replace(/\s+/g, " ").trim();
}
function filterItems(items, f) {
	const term = normalizeSearchText(f.search);
	return items.filter(({ q, test }) => {
		if (f.exams?.length && !f.exams.includes(examOf(test))) return false;
		if (f.banks?.length) {
			const bankName = (test.name ?? "").trim() || "Unknown Question Bank";
			if (!f.banks.includes(bankName)) return false;
		}
		if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
		if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
		if (f.topics?.length && q.topic && !f.topics.includes(q.topic)) return false;
		if (f.difficulties?.length && !f.difficulties.includes(q.difficulty)) return false;
		if (f.types?.length && !f.types.includes(q.type)) return false;
		if (f.pyqOnly && !q.pyq) return false;
		if (term) {
			if (!normalizeSearchText([
				q.id,
				q.text,
				q.chapter,
				q.topic,
				q.subject,
				q.difficulty,
				q.type,
				Array.isArray(q.tags) ? q.tags.join(" ") : "",
				q.formula,
				q.concept,
				q.altMethod
			].filter(Boolean).join(" ")).includes(term)) return false;
		}
		return true;
	});
}
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
/**
* Picks `count` questions at random, never repeating inside the test and
* exhausting least-used questions first so a chapter cycles fully before any
* question comes back in a later test.
*/
function smartPick(items, count, usage) {
	if (count <= 0 || items.length === 0) return [];
	const buckets = /* @__PURE__ */ new Map();
	for (const it of items) {
		const used = usage.get(it.q.id)?.count ?? 0;
		const b = buckets.get(used) ?? [];
		b.push(it);
		buckets.set(used, b);
	}
	const out = [];
	for (const level of [...buckets.keys()].sort((a, b) => a - b)) {
		if (out.length >= count) break;
		out.push(...shuffle(buckets.get(level)).slice(0, count - out.length));
	}
	return shuffle(out);
}
/** Proportional split of `total` across pools, capped by availability. */
function autoDistribute(pools, total) {
	const sum = pools.reduce((a, p) => a + p.available, 0);
	const plan = /* @__PURE__ */ new Map();
	if (sum === 0) return plan;
	let assigned = 0;
	const target = Math.min(total, sum);
	for (const p of pools) {
		const n = Math.min(p.available, Math.floor(p.available / sum * target));
		plan.set(p.key, n);
		assigned += n;
	}
	let i = 0;
	while (assigned < target && pools.length) {
		const p = pools[i % pools.length];
		const cur = plan.get(p.key) ?? 0;
		if (cur < p.available) {
			plan.set(p.key, cur + 1);
			assigned += 1;
		} else if (pools.every((x) => (plan.get(x.key) ?? 0) >= x.available)) break;
		i += 1;
	}
	return plan;
}
/** Builds a paper from per-chapter quotas using the smart random engine. */
function buildFromPlan(groups, plan, usage) {
	const picked = [];
	const seen = /* @__PURE__ */ new Set();
	for (const g of groups) for (const it of smartPick(g.items, plan.get(g.key) ?? 0, usage)) {
		if (seen.has(it.q.id)) continue;
		seen.add(it.q.id);
		picked.push(it);
	}
	return shuffle(picked);
}
async function questionHistory() {
	const attempts = (await listAttempts()).filter((a) => a.submitted);
	const h = {
		attempted: /* @__PURE__ */ new Set(),
		correct: /* @__PURE__ */ new Set(),
		wrong: /* @__PURE__ */ new Set(),
		skipped: /* @__PURE__ */ new Set(),
		bookmarked: /* @__PURE__ */ new Set(),
		mastered: /* @__PURE__ */ new Set(),
		chapterAccuracy: /* @__PURE__ */ new Map()
	};
	for (const a of attempts) {
		const questions = await questionsForAttempt(a);
		for (const q of questions) {
			const ans = a.answers[q.id];
			if (ans?.bookmarked) h.bookmarked.add(q.id);
			const key = `${q.subject}::${q.chapter}`;
			const bucket = h.chapterAccuracy.get(key) ?? {
				correct: 0,
				total: 0
			};
			if (!(ans?.value !== null && ans?.value !== void 0 && String(ans?.value).length > 0)) h.skipped.add(q.id);
			else {
				h.attempted.add(q.id);
				bucket.total += 1;
				if (isCorrect(q, ans.value)) {
					h.correct.add(q.id);
					bucket.correct += 1;
				} else h.wrong.add(q.id);
			}
			h.chapterAccuracy.set(key, bucket);
		}
	}
	for (const id of h.correct) if (!h.wrong.has(id) && !h.skipped.has(id)) h.mastered.add(id);
	return h;
}
/**
* Questions still allowed in newly generated tests. A question is locked only when
* every appearance across saved history was answered correctly; deleting those
* attempts from History makes it eligible again.
*/
function eligibleItems(items, mastered) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const it of items) {
		if (mastered.has(it.q.id) || seen.has(it.q.id)) continue;
		seen.add(it.q.id);
		out.push(it);
	}
	return out;
}
async function weakSourcePool(source) {
	const [tests, history] = await Promise.all([listTests(), questionHistory()]);
	const items = bankItems(tests);
	if (source === "wrong") return items.filter((i) => history.wrong.has(i.q.id));
	if (source === "bookmarked") return items.filter((i) => history.bookmarked.has(i.q.id));
	if (source === "unattempted") return items.filter((i) => !history.attempted.has(i.q.id));
	const weakChapters = new Set([...history.chapterAccuracy.entries()].filter(([, v]) => v.total >= 3 && v.correct / v.total < .6).map(([k]) => k));
	return items.filter((i) => weakChapters.has(`${i.q.subject}::${i.q.chapter}`));
}
async function currentUsage() {
	return usageMap();
}
//#endregion
export { currentUsage as a, filterItems as c, validBankItems as d, validationBySubject as f, chapterTree as i, questionHistory as l, bankItems as n, eligibleItems as o, weakSourcePool as p, buildFromPlan as r, examOf as s, autoDistribute as t, smartPick as u };
