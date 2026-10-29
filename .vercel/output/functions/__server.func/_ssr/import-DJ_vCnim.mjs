import { o as __toESM } from "../_runtime.mjs";
import { w as validateQuestion, y as parseNumericList } from "./xp-CqT-O4I5.mjs";
import { V as listTests, Z as putImages, at as uid, et as putTest } from "./db-CAmn2mwk.mjs";
import { c as detectPaper, l as detectYear } from "./advanced-D6ylZ9Tw.mjs";
import { r as repairLatex } from "./latex-B1zb5kvO.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/import-DJ_vCnim.js
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i;
var TYPE_ALIASES = {
	single: "single",
	scq: "single",
	mcq: "single",
	singlecorrect: "single",
	singlechoice: "single",
	multiple: "multiple",
	multi: "multiple",
	multiplecorrect: "multiple",
	msq: "multiple",
	integer: "integer",
	int: "integer",
	numerical: "numerical",
	numeric: "numerical",
	nat: "numerical",
	matrix: "matrix",
	matrixmatch: "matrix",
	match: "matrix",
	assertion: "assertion",
	assertionreason: "assertion",
	ar: "assertion",
	paragraph: "paragraph",
	comprehension: "paragraph",
	passage: "paragraph",
	diagram: "diagram",
	graph: "graph",
	table: "table"
};
function normType(raw, q) {
	const key = String(raw ?? "").toLowerCase().replace(/[^a-z]/g, "");
	if (TYPE_ALIASES[key]) return TYPE_ALIASES[key];
	const correct = q.correct ?? q.answer ?? q.correctAnswer;
	if (Array.isArray(correct) && correct.length > 1) return "multiple";
	if (typeof correct === "number") return "numerical";
	const opts = q.options ?? q.choices;
	if (!opts || Array.isArray(opts) && opts.length === 0) return "numerical";
	return "single";
}
function normSubject(raw) {
	const s = String(raw ?? "").trim();
	const l = s.toLowerCase();
	if (l.startsWith("phy")) return "Physics";
	if (l.startsWith("chem")) return "Chemistry";
	if (l.startsWith("math") || l.startsWith("maths")) return "Mathematics";
	return s || "General";
}
function normDifficulty(raw) {
	const l = String(raw ?? "").toLowerCase();
	if (l.startsWith("e")) return "Easy";
	if (l.startsWith("h")) return "Hard";
	return "Medium";
}
var LETTERS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
];
function normOptions(raw) {
	if (!raw) return [];
	if (Array.isArray(raw)) return raw.map((o, i) => {
		if (o && typeof o === "object") {
			const obj = o;
			return {
				id: String(obj.id ?? obj.key ?? obj.label ?? LETTERS[i] ?? i),
				text: String(obj.text ?? obj.value ?? obj.option ?? ""),
				images: toStringArray(obj.images ?? obj.image ?? obj.figure ?? obj.diagram)
			};
		}
		return {
			id: LETTERS[i] ?? String(i),
			text: String(o ?? "")
		};
	}).filter((o) => o.text !== "" || (o.images?.length ?? 0) > 0);
	if (typeof raw === "object") return Object.entries(raw).map(([k, v]) => ({
		id: k.toUpperCase(),
		text: String(v ?? "")
	}));
	return [];
}
function toStringArray(v) {
	if (!v) return [];
	if (Array.isArray(v)) return v.flatMap((x) => toStringArray(x));
	if (typeof v === "object") {
		const o = v;
		return toStringArray(o.src ?? o.path ?? o.url ?? o.file ?? o.name ?? o.image);
	}
	const s = String(v).trim();
	return s ? [s] : [];
}
function normCorrect(raw, options) {
	return (Array.isArray(raw) ? raw : raw === void 0 || raw === null ? [] : [raw]).flatMap((c) => typeof c === "string" && /[,;]/.test(c) ? c.split(/[,;]/) : [c]).map((c) => {
		const s = String(c).trim();
		if (options.some((o) => o.id.toLowerCase() === s.toLowerCase())) return options.find((o) => o.id.toLowerCase() === s.toLowerCase()).id;
		const n = Number(s);
		if (!Number.isNaN(n) && options[n]) return options[n].id;
		if (!Number.isNaN(n) && options[n - 1]) return options[n - 1].id;
		return s;
	}).filter(Boolean);
}
var CHEM_HINT = /(\\ce|reaction|organic|benzene|alkane|alkene|isomer|→|->)/i;
var IMAGE_KEYS = [
	"images",
	"image",
	"img",
	"imgs",
	"figure",
	"figures",
	"diagram",
	"diagrams",
	"image_path",
	"imagePath",
	"imagepaths",
	"image_paths",
	"imageUrl",
	"image_url",
	"asset",
	"assets",
	"picture",
	"pic",
	"photo",
	"fig",
	"attachment",
	"attachments"
];
/** Recursively collect anything that looks like an image reference. */
function collectImageRefs(value, depth = 0, out = []) {
	if (depth > 6 || value == null) return out;
	if (typeof value === "string") {
		const s = value.trim();
		if (s && IMAGE_EXT.test(s) && !/\s/.test(s.replace(/%20/g, ""))) out.push(s);
		return out;
	}
	if (Array.isArray(value)) {
		for (const v of value) collectImageRefs(v, depth + 1, out);
		return out;
	}
	if (typeof value === "object") for (const [k, v] of Object.entries(value)) {
		if (k === "options" || k === "choices") continue;
		collectImageRefs(v, depth + 1, out);
	}
	return out;
}
function questionImageRefs(raw) {
	const direct = [];
	for (const key of IMAGE_KEYS) if (raw[key] !== void 0) direct.push(...toStringArray(raw[key]));
	const deep = collectImageRefs(raw);
	return [...new Set([...direct, ...deep].map((s) => s.trim()).filter(Boolean))];
}
/** Normalizes Windows/Linux/relative/url-encoded paths to a lowercase posix path. */
function normPath(input) {
	let s = String(input ?? "").trim();
	if (!s) return "";
	s = s.replace(/^["']|["']$/g, "");
	s = s.split(/[?#]/)[0];
	try {
		if (/%[0-9a-f]{2}/i.test(s)) s = decodeURIComponent(s);
	} catch {}
	s = s.replace(/\\/g, "/");
	s = s.replace(/^[a-zA-Z]:\//, "");
	s = s.replace(/^file:\/\//, "");
	s = s.replace(/^https?:\/\/[^/]+\//, "");
	const parts = [];
	for (const seg of s.split("/")) {
		if (!seg || seg === ".") continue;
		if (seg === "..") {
			parts.pop();
			continue;
		}
		parts.push(seg);
	}
	return parts.join("/").toLowerCase();
}
function baseName(path) {
	return normPath(path).split("/").pop() ?? path;
}
function stripExt(name) {
	return name.replace(IMAGE_EXT, "");
}
/** Q1.png / q_1.jpg / question-01.webp / 1.png -> 1 */
function questionNumberFromFilename(name) {
	const m = stripExt(baseName(name)).match(/(?:^|[^0-9])(?:q(?:uestion)?[\s_-]*)?(\d{1,4})(?:[^0-9]|$)/i);
	if (!m) return null;
	const n = Number(m[1]);
	return Number.isFinite(n) ? n : null;
}
/**
* Multi-key index so a reference can be matched by full path, any trailing
* path suffix, filename, or filename-without-extension.
*/
var ImageIndex = class {
	map = /* @__PURE__ */ new Map();
	byId = /* @__PURE__ */ new Map();
	add(key, id) {
		if (!key) return;
		const cur = this.map.get(key);
		if (cur) {
			if (!cur.includes(id)) cur.push(id);
		} else this.map.set(key, [id]);
	}
	register(id, rawPath) {
		const path = normPath(rawPath);
		const base = baseName(path);
		this.byId.set(id, {
			path,
			base
		});
		const segs = path.split("/");
		for (let i = 0; i < segs.length; i++) this.add(segs.slice(i).join("/"), id);
		this.add(base, id);
		this.add(stripExt(base), id);
		this.add(stripExt(base).replace(/[\s_-]+/g, ""), id);
	}
	/** Returns the best matching image id, or null. */
	resolve(ref) {
		const p = normPath(ref);
		if (!p) return null;
		const candidateKeys = [p];
		const segs = p.split("/");
		for (let i = 1; i < segs.length; i++) candidateKeys.push(segs.slice(i).join("/"));
		const base = baseName(p);
		candidateKeys.push(base, stripExt(base), stripExt(base).replace(/[\s_-]+/g, ""));
		for (const key of candidateKeys) {
			const hits = this.map.get(key);
			if (!hits?.length) continue;
			if (hits.length === 1) return hits[0];
			return hits.find((id) => {
				const rec = this.byId.get(id);
				return rec.path === p || rec.path.endsWith("/" + p);
			}) ?? hits[0];
		}
		return null;
	}
};
/** Stable content fingerprint: subject + chapter + question text + option texts. */
function questionHash(q) {
	const norm = (v) => String(v ?? "").toLowerCase().replace(/\s+/g, " ").trim();
	const payload = [
		norm(q.subject),
		norm(q.chapter),
		norm(q.text),
		q.options.map((o) => norm(o.text)).join("|"),
		q.answerValue ?? ""
	].join("~");
	let h1 = 2166136261;
	let h2 = 16777619;
	for (let i = 0; i < payload.length; i++) {
		const c = payload.charCodeAt(i);
		h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
		h2 = (Math.imul(h2 + c, 2654435761) ^ h2 >>> 7) >>> 0;
	}
	return `${h1.toString(36)}${h2.toString(36)}${payload.length.toString(36)}`;
}
function normalizeQuestion(raw, index, issues) {
	const type = normType(raw.type ?? raw.questionType ?? raw.qtype, raw);
	const options = normOptions(raw.options ?? raw.choices).map((o) => ({
		...o,
		text: repairLatex(o.text)
	}));
	const text = repairLatex(String(raw.question ?? raw.text ?? raw.statement ?? raw.body ?? "").trim());
	const number = Number(raw.number ?? raw.no ?? raw.qno ?? raw.q_no ?? index + 1) || index + 1;
	if (!text) issues.push({
		level: "warning",
		message: `Q${number}: empty question text`
	});
	const correctRaw = raw.correct ?? raw.answer ?? raw.correctAnswer ?? raw.correctOption ?? raw.correct_option;
	const correct = type === "integer" || type === "numerical" ? [] : normCorrect(correctRaw, options);
	const numericList = type === "integer" || type === "numerical" ? parseNumericList(correctRaw ?? raw.value ?? raw.answers) : [];
	const answerValue = numericList.length ? numericList[0] : void 0;
	const images = questionImageRefs(raw);
	const matrixRaw = raw.matrix ?? raw.match;
	const solution = repairLatex(String(raw.solution ?? "")) || void 0;
	const explanation = repairLatex(String(raw.explanation ?? raw.reason ?? "")) || void 0;
	const tableHtml = raw.table ? String(raw.table) : void 0;
	return {
		id: String(raw.id ?? raw.questionId ?? raw.question_id ?? `q${number}_${index}`),
		number,
		subject: normSubject(raw.subject),
		chapter: String(raw.chapter ?? raw.unit ?? "General").trim() || "General",
		topic: String(raw.topic ?? "").trim(),
		difficulty: normDifficulty(raw.difficulty ?? raw.level),
		type,
		text,
		paragraph: raw.paragraph ? repairLatex(String(raw.paragraph)) : void 0,
		options,
		correct,
		answerValue,
		answerValues: numericList.length > 1 ? numericList : void 0,
		tolerance: Number(raw.tolerance ?? .01),
		matrix: matrixRaw ? {
			left: toStringArray(matrixRaw.left ?? matrixRaw.listI),
			right: toStringArray(matrixRaw.right ?? matrixRaw.listII)
		} : void 0,
		tableHtml,
		solution,
		explanation,
		images,
		marks: Number(raw.marks ?? 4),
		negative: Number(raw.negative ?? raw.negativeMarks ?? (type === "numerical" ? 0 : 1)),
		flags: {
			diagram: type === "diagram" || images.length > 0,
			graph: type === "graph" || /graph/i.test(text),
			table: type === "table" || Boolean(tableHtml),
			chem: normSubject(raw.subject) === "Chemistry" && CHEM_HINT.test(text)
		}
	};
}
var MIME = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	webp: "image/webp",
	gif: "image/gif",
	svg: "image/svg+xml",
	bmp: "image/bmp",
	avif: "image/avif"
};
async function readZip(file) {
	const zip = await import_lib.default.loadAsync(file);
	const jsons = [];
	const texts = [];
	const images = [];
	const entries = Object.values(zip.files).filter((f) => !f.dir && !f.name.split("/").pop().startsWith(".") && !f.name.startsWith("__MACOSX/"));
	for (const entry of entries) if (/\.json$/i.test(entry.name)) jsons.push({
		path: entry.name,
		text: await entry.async("string")
	});
	else if (/\.(csv|txt)$/i.test(entry.name)) texts.push({
		path: entry.name,
		text: await entry.async("string")
	});
	else if (IMAGE_EXT.test(entry.name)) {
		const ext = entry.name.split(".").pop().toLowerCase();
		const raw = await entry.async("blob");
		const blob = raw.type ? raw : new Blob([raw], { type: MIME[ext] ?? "image/png" });
		images.push({
			path: entry.name,
			blob
		});
	}
	return {
		jsons,
		texts,
		images
	};
}
function extractQuestionArray(data) {
	if (Array.isArray(data)) return {
		questions: data,
		meta: {}
	};
	if (data && typeof data === "object") {
		const obj = data;
		for (const key of [
			"questions",
			"data",
			"items",
			"qs",
			"test",
			"question_bank",
			"bank"
		]) {
			const v = obj[key];
			if (Array.isArray(v)) return {
				questions: v,
				meta: obj
			};
			if (v && typeof v === "object" && Array.isArray(v.questions)) return {
				questions: v.questions,
				meta: v
			};
		}
	}
	throw new Error("No question array found in JSON (expected an array or a `questions` field).");
}
/** Applies answer-key rows onto questions, matching by id then by number. */
function applyAnswerKey(questions, entries) {
	const byId = new Map(questions.map((q) => [String(q.id).toLowerCase(), q]));
	const byNumber = new Map(questions.map((q) => [String(q.number), q]));
	let applied = 0;
	let unmatched = 0;
	for (const row of entries) {
		const q = byId.get(row.key.toLowerCase()) ?? byNumber.get(String(Number(row.key) || row.key));
		if (!q) {
			unmatched += 1;
			continue;
		}
		if (q.type === "integer" || q.type === "numerical") {
			const list = parseNumericList(row.answer);
			if (list.length) {
				q.answerValue = list[0];
				q.answerValues = list.length > 1 ? list : void 0;
			}
		} else {
			const c = normCorrect(row.answer, q.options);
			if (c.length) q.correct = c;
		}
		if (row.marks !== void 0 && !Number.isNaN(row.marks)) q.marks = row.marks;
		if (row.negative !== void 0 && !Number.isNaN(row.negative)) q.negative = row.negative;
		if (row.solution) q.solution = q.solution ?? row.solution;
		applied += 1;
	}
	return {
		applied,
		unmatched
	};
}
async function buildTestFromFiles(opts) {
	const issues = [];
	let parsed;
	try {
		parsed = JSON.parse(opts.jsonText);
	} catch (err) {
		throw new Error(`Invalid JSON: ${err.message}`);
	}
	const { questions: rawQs, meta } = extractQuestionArray(parsed);
	if (rawQs.length === 0) throw new Error("The JSON contains zero questions.");
	const testId = uid("test");
	const allNormalized = rawQs.map((q, i) => normalizeQuestion(q, i, issues));
	const existingTests = await listTests();
	const known = /* @__PURE__ */ new Set();
	for (const t of existingTests) for (const q of t.questions) known.add(q.hash ?? questionHash(q));
	const questions = [];
	let duplicates = 0;
	for (const q of allNormalized) {
		const hash = questionHash(q);
		if (known.has(hash)) {
			duplicates += 1;
			continue;
		}
		known.add(hash);
		q.hash = hash;
		q.id = `${testId}::${q.id}`;
		questions.push(q);
	}
	if (duplicates) issues.push({
		level: "warning",
		message: `${duplicates} duplicate question(s) already in your bank were skipped.`
	});
	if (questions.length === 0) throw new Error("Every question in this file already exists in your bank — nothing to import.");
	if (opts.answerKeys?.length) {
		const { applied, unmatched } = applyAnswerKey(questions, opts.answerKeys);
		issues.push({
			level: "warning",
			message: `Answer key: ${applied} answer(s) linked${unmatched ? `, ${unmatched} row(s) had no matching question` : ""}.`
		});
	}
	const seenForValidation = {
		ids: /* @__PURE__ */ new Set(),
		signatures: /* @__PURE__ */ new Set()
	};
	let invalidCount = 0;
	for (const q of questions) {
		const { valid, reasons } = validateQuestion(q, seenForValidation);
		if (valid) continue;
		invalidCount += 1;
		if (invalidCount <= 50) issues.push({
			level: "warning",
			message: `Q${q.number}: ${reasons.join("; ")}`
		});
	}
	if (invalidCount) issues.push({
		level: "warning",
		message: `${invalidCount} question(s) failed validation and will be skipped when generating tests.`
	});
	const index = new ImageIndex();
	const stored = [];
	const seenIds = /* @__PURE__ */ new Set();
	for (const img of opts.images) {
		const path = normPath(img.path);
		let id = `${testId}::${path}`;
		let dup = 1;
		while (seenIds.has(id)) id = `${testId}::${path}#${dup++}`;
		seenIds.add(id);
		stored.push({
			id,
			testId,
			name: baseName(path),
			path,
			kind: /(^|\/)(solutions?|sol)\//.test(path) ? "solution" : "figure",
			blob: img.blob
		});
		index.register(id, path);
	}
	const used = /* @__PURE__ */ new Set();
	let missing = 0;
	const linkRefs = (refs, qNumber) => {
		const out = [];
		for (const ref of refs) {
			const id = index.resolve(ref);
			if (id) {
				if (!out.includes(id)) out.push(id);
				used.add(id);
				const rec = stored.find((s) => s.id === id);
				if (rec && rec.qNumber === void 0) rec.qNumber = qNumber;
			} else {
				missing += 1;
				issues.push({
					level: "warning",
					message: `Q${qNumber}: image "${ref}" not found in archive`
				});
			}
		}
		return out;
	};
	for (const q of questions) {
		q.images = linkRefs(q.images, q.number);
		for (const o of q.options) if (o.images?.length) o.images = linkRefs(o.images, q.number);
	}
	for (const rec of stored) {
		if (used.has(rec.id)) continue;
		const n = questionNumberFromFilename(rec.path ?? rec.name);
		if (n === null) continue;
		const q = questions.find((x) => x.number === n);
		if (!q) continue;
		rec.qNumber = n;
		if (rec.kind === "solution") {
			used.add(rec.id);
			continue;
		}
		if (!q.images.includes(rec.id)) q.images.push(rec.id);
		used.add(rec.id);
	}
	for (const q of questions) if (q.images.length > 0) q.flags.diagram = true;
	const unmatched = stored.filter((s) => !used.has(s.id));
	if (unmatched.length) issues.push({
		level: "warning",
		message: `${unmatched.length} image(s) could not be matched automatically — link them from the Figures page.`
	});
	await putImages(stored);
	const subjects = [...new Set(questions.map((q) => q.subject))];
	const chapters = [...new Set(questions.map((q) => q.chapter))];
	const errors = issues.filter((i) => i.level === "error").length;
	const testName = String(meta.name ?? meta.title ?? opts.name).trim() || opts.name;
	const exam = opts.exam ?? (/advanc/i.test(String(meta.exam ?? opts.name)) ? "advanced" : "main");
	const paper = detectPaper(`${testName} ${String(meta.paper ?? "")}`, meta.paper);
	const year = detectYear(testName, Number(meta.year) || void 0);
	if (year) {
		for (const q of questions) if (!q.year) q.year = year;
	}
	const test = {
		id: testId,
		name: testName,
		description: meta.description ? String(meta.description) : void 0,
		subjects,
		chapters,
		questionCount: questions.length,
		imageCount: stored.length,
		missingImages: missing,
		importedAt: Date.now(),
		updatedAt: Date.now(),
		source: opts.source,
		exam,
		paper: exam === "advanced" ? paper : void 0,
		year,
		durationMin: Number(meta.duration ?? meta.durationMin ?? opts.durationMin ?? 180),
		status: errors > 0 ? "invalid" : issues.length > 0 ? "warning" : "valid",
		issues,
		questions
	};
	await putTest(test);
	return {
		test,
		issues
	};
}
function validateTest(test) {
	const issues = [];
	if (test.questions.length === 0) issues.push({
		level: "error",
		message: "Test has no questions."
	});
	const seen = {
		ids: /* @__PURE__ */ new Set(),
		signatures: /* @__PURE__ */ new Set()
	};
	test.questions.forEach((q) => {
		const { valid, reasons } = validateQuestion(q, seen);
		if (!valid) issues.push({
			level: "error",
			message: `Q${q.number}: ${reasons.join("; ")}.`
		});
	});
	return issues;
}
function exportTestJson(test) {
	const payload = {
		name: test.name,
		duration: test.durationMin,
		questions: test.questions.map((q) => ({
			id: q.id,
			number: q.number,
			subject: q.subject,
			chapter: q.chapter,
			topic: q.topic,
			difficulty: q.difficulty,
			type: q.type,
			question: q.text,
			paragraph: q.paragraph,
			options: q.options.map((o) => ({
				id: o.id,
				text: o.text
			})),
			correct: q.type === "integer" || q.type === "numerical" ? q.answerValues?.length ? q.answerValues.join(",") : q.answerValue : q.correct,
			matrix: q.matrix,
			table: q.tableHtml,
			solution: q.solution,
			explanation: q.explanation,
			marks: q.marks,
			negative: q.negative,
			images: q.images.map((id) => id.split("::")[1] ?? id)
		}))
	};
	return JSON.stringify(payload, null, 2);
}
//#endregion
export { validateTest as a, readZip as i, exportTestJson as n, questionNumberFromFilename as r, buildTestFromFiles as t };
