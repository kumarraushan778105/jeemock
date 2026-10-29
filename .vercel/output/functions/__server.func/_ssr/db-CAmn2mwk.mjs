import { i as applyMissedLiveTestPenalty } from "./xp-CqT-O4I5.mjs";
import { t as openDB } from "../_libs/idb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-CAmn2mwk.js
var SUBJECT_ORDER = [
	"chemistry",
	"physics",
	"mathematics"
];
function subjectRank(subject) {
	const normalized = subject.trim().toLowerCase();
	const canonical = normalized === "math" || normalized === "maths" ? "mathematics" : normalized;
	const rank = SUBJECT_ORDER.indexOf(canonical);
	return rank === -1 ? SUBJECT_ORDER.length : rank;
}
function orderQuestionsBySubject(questions) {
	return [...questions].sort((a, b) => subjectRank(a.subject) - subjectRank(b.subject) || a.number - b.number).map((question, index) => ({
		...question,
		number: index + 1
	}));
}
var LIVE_TEST_SUBJECTS = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
function makeDraftQuestionId() {
	return `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function createBlankQuestionForDraft(seed) {
	return {
		id: makeDraftQuestionId(),
		number: seed?.number ?? 1,
		subject: seed?.subject ?? "Physics",
		chapter: seed?.chapter ?? "General",
		topic: seed?.topic ?? "",
		difficulty: seed?.difficulty ?? "Medium",
		type: seed?.type ?? "single",
		text: seed?.text ?? "",
		paragraph: seed?.paragraph,
		options: seed?.options ?? [
			{
				id: "A",
				text: ""
			},
			{
				id: "B",
				text: ""
			},
			{
				id: "C",
				text: ""
			},
			{
				id: "D",
				text: ""
			}
		],
		correct: seed?.correct ?? [],
		answerValue: seed?.answerValue,
		answerValues: seed?.answerValues,
		tolerance: seed?.tolerance ?? .01,
		matrix: seed?.matrix,
		matrixPairs: seed?.matrixPairs,
		spacing: seed?.spacing,
		tableHtml: seed?.tableHtml,
		solution: seed?.solution,
		explanation: seed?.explanation,
		images: [...seed?.images ?? []],
		marks: seed?.marks ?? 4,
		negative: seed?.negative ?? 1,
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: false
		},
		tags: seed?.tags,
		hash: seed?.hash,
		pyq: seed?.pyq,
		year: seed?.year,
		formula: seed?.formula,
		concept: seed?.concept,
		altMethod: seed?.altMethod,
		sourceId: seed?.sourceId
	};
}
function cloneQuestionForDraft(question) {
	return {
		...question,
		id: makeDraftQuestionId(),
		sourceId: question.id,
		images: [...question.images],
		options: question.options.map((option) => ({
			...option,
			images: option.images ? [...option.images] : void 0
		}))
	};
}
function questionAlreadyInDraft(draft, question) {
	if (!draft) return false;
	const sourceId = question.sourceId ?? question.id;
	return draft.questions.some((item) => {
		const itemSourceId = item.sourceId ?? item.id;
		return item.id === question.id || itemSourceId === sourceId || item.id === sourceId;
	});
}
function normalizeLiveTestSubject(subject) {
	const value = (subject ?? "").trim().toLowerCase();
	if (!value) return null;
	if (value === "physics") return "Physics";
	if (value === "chemistry") return "Chemistry";
	if (value === "math" || value === "mathematics" || value === "maths") return "Mathematics";
	return null;
}
function normalizeLiveTestSyllabus(syllabus) {
	const next = {};
	if (!syllabus) return next;
	for (const subject of LIVE_TEST_SUBJECTS) {
		const list = syllabus[subject] ?? [];
		const unique = Array.from(new Set((list ?? []).map((item) => item?.trim()).filter(Boolean)));
		if (unique.length > 0) next[subject] = unique;
	}
	return next;
}
function deriveLiveTestSyllabus(questions) {
	const grouped = {};
	for (const question of questions) {
		const subject = normalizeLiveTestSubject(question.subject);
		if (!subject) continue;
		const chapter = (question.chapter ?? "").trim();
		if (!chapter) continue;
		if (!grouped[subject]) grouped[subject] = [];
		if (!grouped[subject]?.includes(chapter)) grouped[subject]?.push(chapter);
	}
	return normalizeLiveTestSyllabus(grouped);
}
function getEffectiveLiveTestSyllabus(draft) {
	const custom = normalizeLiveTestSyllabus(draft.customSyllabus);
	if (Object.keys(custom).length > 0) return custom;
	return deriveLiveTestSyllabus(draft.questions);
}
function cloneQuestionSnapshot(question) {
	if (typeof structuredClone === "function") return structuredClone(question);
	return JSON.parse(JSON.stringify(question));
}
function liveTestPreviewAttemptId(draftId) {
	return `preview_${draftId}`;
}
function buildLiveTestPreviewAttempt(draft) {
	const questions = orderQuestionsBySubject(draft.questions);
	const durationSec = Math.max(1, Math.round((draft.durationMin || 180) * 60));
	const answers = Object.fromEntries(questions.map((question) => [question.id, {
		value: null,
		visited: false,
		marked: false,
		bookmarked: false,
		timeSpent: 0
	}]));
	return {
		id: liveTestPreviewAttemptId(draft.id),
		testId: draft.id,
		testName: draft.name,
		startedAt: Date.now(),
		updatedAt: Date.now(),
		durationSec,
		remainingSec: durationSec,
		currentIndex: 0,
		answers,
		submitted: false,
		questionIds: questions.map((question) => question.id),
		questionsSnapshot: questions,
		scoring: {
			marks: 4,
			negative: 1
		},
		attemptType: "normal",
		status: "PREVIEW",
		preview: {
			draftId: draft.id,
			mode: "check"
		}
	};
}
var DRAFT_KEY = "cbt_live_test_drafts";
var ACTIVE_DRAFT_KEY = "cbt_live_test_active_draft";
var SCHEDULED_KEY = "cbt_live_tests";
function read(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const value = window.localStorage.getItem(key);
		if (!value) return fallback;
		return JSON.parse(value);
	} catch {
		return fallback;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
}
function getActiveLiveTestDraftId() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem(ACTIVE_DRAFT_KEY) ?? null;
	} catch {
		return null;
	}
}
function setActiveLiveTestDraftId(id) {
	if (typeof window === "undefined") return;
	try {
		if (!id) {
			window.localStorage.removeItem(ACTIVE_DRAFT_KEY);
			return;
		}
		window.localStorage.setItem(ACTIVE_DRAFT_KEY, id);
	} catch {}
}
function createLiveTestDraft(questions, name, examType = "JEE Main") {
	const orderedQuestions = orderQuestionsBySubject(questions);
	const draft = {
		id: `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
		name: name || "Live Test Draft",
		examType,
		questions: orderedQuestions,
		questionIds: orderedQuestions.map((q) => q.id),
		questionCount: orderedQuestions.length,
		createdAt: Date.now(),
		updatedAt: Date.now(),
		durationMin: questions.length ? 180 : 0,
		customSyllabus: void 0,
		status: "draft"
	};
	write(DRAFT_KEY, [...read(DRAFT_KEY, []), draft]);
	setActiveLiveTestDraftId(draft.id);
	return draft;
}
function listLiveTestDrafts() {
	return read(DRAFT_KEY, []);
}
function getLiveTestDraft(id) {
	return listLiveTestDrafts().find((draft) => draft.id === id) ?? null;
}
function saveLiveTestDraft(draft) {
	const next = listLiveTestDrafts().filter((item) => item.id !== draft.id);
	const questions = orderQuestionsBySubject(draft.questions);
	const saved = {
		...draft,
		questions,
		questionIds: questions.map((question) => question.id),
		questionCount: questions.length,
		customSyllabus: normalizeLiveTestSyllabus(draft.customSyllabus),
		updatedAt: Date.now()
	};
	next.push(saved);
	write(DRAFT_KEY, next);
	setActiveLiveTestDraftId(saved.id);
	return saved;
}
function deleteLiveTestDraft(id) {
	write(DRAFT_KEY, listLiveTestDrafts().filter((draft) => draft.id !== id));
	if (getActiveLiveTestDraftId() === id) setActiveLiveTestDraftId(null);
}
function deleteScheduledLiveTest(id) {
	const list = read(SCHEDULED_KEY, []);
	const target = list.find((test) => test.id === id);
	const remaining = list.filter((test) => test.id !== id);
	write(SCHEDULED_KEY, remaining);
	if (target?.draftId) {
		listLiveTestDrafts();
		if (!remaining.some((test) => test.draftId === target.draftId)) deleteLiveTestDraft(target.draftId);
	}
	return remaining;
}
function listScheduledLiveTests() {
	const list = read(SCHEDULED_KEY, []);
	const now = Date.now();
	const processed = list.map((item) => {
		const syllabus = normalizeLiveTestSyllabus(item.syllabus ?? deriveLiveTestSyllabus(item.fixedQuestions ?? []));
		const next = {
			...item,
			syllabus
		};
		if (item.status === "COMPLETED") return next;
		if (now < item.liveStart) return {
			...next,
			status: "UPCOMING"
		};
		if (now <= item.liveEnd) return {
			...next,
			status: "LIVE"
		};
		const missed = {
			...next,
			status: "MISSED"
		};
		if (item.status === "MISSED" || next.attempts.length > 0) return missed;
		applyMissedLiveTestPenalty(next.id, 10);
		return missed;
	});
	write(SCHEDULED_KEY, processed);
	return processed;
}
function listUpcomingLiveTests() {
	return [...listScheduledLiveTests()].filter((test) => test.status === "UPCOMING" || test.status === "LIVE").sort((a, b) => {
		const aLive = a.status === "LIVE";
		if (aLive !== (b.status === "LIVE")) return aLive ? -1 : 1;
		return a.liveStart - b.liveStart;
	});
}
function scheduleLiveTest(draft, input) {
	const now = Date.now();
	const start = (/* @__PURE__ */ new Date(`${input.date}T${input.liveStart}`)).getTime();
	const end = (/* @__PURE__ */ new Date(`${input.date}T${input.liveEnd}`)).getTime();
	if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) throw new Error("Invalid live test window");
	const questions = orderQuestionsBySubject(draft.questions);
	const syllabus = normalizeLiveTestSyllabus(input.customSyllabus ?? draft.customSyllabus ?? deriveLiveTestSyllabus(questions));
	const fixedQuestions = questions.map((question) => cloneQuestionSnapshot(question));
	const scheduled = {
		id: `live_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
		draftId: draft.id,
		testName: input.testName || draft.name,
		examType: draft.examType,
		questionIds: questions.map((question) => question.id),
		fixedQuestions,
		questionCount: questions.length,
		durationMin: Math.max(1, Number(input.durationMin) || draft.durationMin || 180),
		liveStart: start,
		liveEnd: end,
		createdAt: now,
		scheduledAt: now,
		status: now < start ? "UPCOMING" : now <= end ? "LIVE" : "MISSED",
		liveWindowMode: input.liveWindowMode ?? "allow-finish",
		allowStartedTestsToFinish: input.liveWindowMode !== "force-submit",
		attempts: [],
		syllabus
	};
	write(SCHEDULED_KEY, [scheduled, ...read(SCHEDULED_KEY, [])]);
	deleteLiveTestDraft(draft.id);
	return scheduled;
}
function formatLiveTestDate(ts) {
	return new Date(ts).toLocaleDateString(void 0, {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function formatLiveWindowRange(start, end) {
	return `${new Date(start).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	})} – ${new Date(end).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	})}`;
}
function formatLiveDuration(mins) {
	return `${mins} minutes`;
}
function addLiveAttemptToScheduled(testId, attemptId) {
	write(SCHEDULED_KEY, read(SCHEDULED_KEY, []).map((test) => test.id === testId ? {
		...test,
		attempts: [...new Set([...test.attempts, attemptId])]
	} : test));
}
function completeScheduledLiveTest(attempt) {
	if (!attempt.scheduledTestId) return null;
	const next = read(SCHEDULED_KEY, []).map((test) => {
		if (test.id !== attempt.scheduledTestId) return test;
		const completedAt = attempt.submittedAt ?? Date.now();
		const completion = {
			resultId: attempt.resultId ?? attempt.id,
			correct: attempt.correct,
			wrong: attempt.wrong,
			skipped: attempt.skipped,
			score: attempt.score,
			total: attempt.total,
			percent: attempt.percent
		};
		return {
			...test,
			status: "COMPLETED",
			attempts: [...new Set([...test.attempts, attempt.id])],
			completedAttemptId: attempt.id,
			completedAt,
			completion
		};
	});
	write(SCHEDULED_KEY, next);
	return next.find((test) => test.id === attempt.scheduledTestId) ?? null;
}
var DB_NAME = "jee-cbt";
var DB_VERSION = 8;
var dbPromise = null;
function getDB() {
	if (typeof window === "undefined") throw new Error("IndexedDB unavailable on server");
	if (!dbPromise) dbPromise = openDB(DB_NAME, DB_VERSION, { upgrade(db) {
		if (!db.objectStoreNames.contains("tests")) db.createObjectStore("tests", { keyPath: "id" });
		if (!db.objectStoreNames.contains("images")) db.createObjectStore("images", { keyPath: "id" }).createIndex("testId", "testId");
		if (!db.objectStoreNames.contains("attempts")) db.createObjectStore("attempts", { keyPath: "id" }).createIndex("testId", "testId");
		if (!db.objectStoreNames.contains("usage")) db.createObjectStore("usage", { keyPath: "id" });
		if (!db.objectStoreNames.contains("notes")) db.createObjectStore("notes", { keyPath: "id" });
		if (!db.objectStoreNames.contains("library")) db.createObjectStore("library", { keyPath: "id" });
		if (!db.objectStoreNames.contains("audioReflections")) db.createObjectStore("audioReflections", { keyPath: "id" });
		if (!db.objectStoreNames.contains("errorJournal")) db.createObjectStore("errorJournal", { keyPath: "id" }).createIndex("createdAt", "createdAt");
		if (!db.objectStoreNames.contains("errorJournalAudio")) db.createObjectStore("errorJournalAudio", { keyPath: "id" });
		if (!db.objectStoreNames.contains("errorJournalImages")) db.createObjectStore("errorJournalImages", { keyPath: "id" });
	} });
	return dbPromise;
}
function isDraftTestId(id) {
	return id.startsWith("draft_");
}
var LIVE_DRAFT_KEY = "cbt_live_test_drafts";
function readDrafts() {
	if (typeof window === "undefined") return {};
	try {
		const raw = window.localStorage.getItem(LIVE_DRAFT_KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function writeDrafts(map) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(LIVE_DRAFT_KEY, JSON.stringify(map));
}
async function listTests() {
	return (await (await getDB()).getAll("tests")).filter((t) => !isDraftTestId(t.id)).sort((a, b) => b.importedAt - a.importedAt);
}
async function getTest(id) {
	const draftId = id.startsWith("preview_") ? id.replace(/^preview_/, "") : id.startsWith("draft_") ? id : null;
	if (draftId) {
		const draft = getLiveTestDraft(draftId);
		if (!draft) return void 0;
		return {
			id: draft.id,
			name: draft.name,
			description: "Temporary CBT preview draft",
			subjects: [...new Set(draft.questions.map((q) => q.subject))],
			chapters: [...new Set(draft.questions.map((q) => q.chapter))],
			questionCount: draft.questions.length,
			imageCount: draft.questions.reduce((sum, q) => sum + q.images.length, 0),
			missingImages: 0,
			importedAt: draft.createdAt,
			updatedAt: draft.updatedAt,
			source: "custom",
			durationMin: draft.durationMin,
			status: "valid",
			issues: [],
			questions: draft.questions
		};
	}
	return await (await getDB()).get("tests", id);
}
async function putTest(test) {
	if (isDraftTestId(test.id)) {
		const drafts = readDrafts();
		drafts[test.id] = test;
		writeDrafts(drafts);
		return test;
	}
	await (await getDB()).put("tests", test);
	return test;
}
async function deleteTest(id) {
	const db = await getDB();
	await db.delete("tests", id);
	const tx = db.transaction("images", "readwrite");
	let cursor = await tx.store.index("testId").openCursor(IDBKeyRange.only(id));
	while (cursor) {
		await cursor.delete();
		cursor = await cursor.continue();
	}
	await tx.done;
	const atx = db.transaction("attempts", "readwrite");
	let ac = await atx.store.index("testId").openCursor(IDBKeyRange.only(id));
	while (ac) {
		await ac.delete();
		ac = await ac.continue();
	}
	await atx.done;
}
async function putImage(img) {
	await (await getDB()).put("images", img);
}
async function putImages(imgs) {
	const tx = (await getDB()).transaction("images", "readwrite");
	for (const i of imgs) tx.store.put(i);
	await tx.done;
}
async function getImage(id) {
	return await (await getDB()).get("images", id);
}
async function listImages(testId) {
	return await (await getDB()).getAllFromIndex("images", "testId", testId);
}
async function listAllImages() {
	return await (await getDB()).getAll("images");
}
async function countImages() {
	return (await getDB()).count("images");
}
async function deleteImage(id) {
	await (await getDB()).delete("images", id);
}
var urlCache = /* @__PURE__ */ new Map();
async function imageUrl(id) {
	if (urlCache.has(id)) return urlCache.get(id);
	const rec = await getImage(id);
	if (!rec) return null;
	const url = URL.createObjectURL(rec.blob);
	urlCache.set(id, url);
	return url;
}
function forgetImageUrl(id) {
	const u = urlCache.get(id);
	if (u) URL.revokeObjectURL(u);
	urlCache.delete(id);
}
async function listAttempts() {
	return (await (await getDB()).getAll("attempts")).sort((a, b) => b.updatedAt - a.updatedAt);
}
async function getAttempt(id) {
	if (id.startsWith("preview_")) {
		const draft = getLiveTestDraft(id.replace(/^preview_/, ""));
		if (!draft) return void 0;
		return buildLiveTestPreviewAttempt(draft);
	}
	return await (await getDB()).get("attempts", id);
}
async function putAttempt(attempt) {
	const tx = (await getDB()).transaction("attempts", "readwrite");
	if (!(await tx.store.get(attempt.id))?.submitted || attempt.submitted) await tx.store.put(attempt);
	await tx.done;
}
async function deleteAttempt(id) {
	await (await getDB()).delete("attempts", id);
}
async function listUsage() {
	return await (await getDB()).getAll("usage");
}
async function usageMap() {
	return new Map((await listUsage()).map((u) => [u.id, u]));
}
async function bumpUsage(ids) {
	if (ids.length === 0) return;
	const tx = (await getDB()).transaction("usage", "readwrite");
	const now = Date.now();
	for (const id of ids) {
		const cur = await tx.store.get(id);
		tx.store.put({
			id,
			count: (cur?.count ?? 0) + 1,
			lastUsed: now
		});
	}
	await tx.done;
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
var noteKey = (attemptId, questionId) => `${attemptId}::${questionId}`;
function emptyNote(attemptId, questionId) {
	return {
		id: noteKey(attemptId, questionId),
		attemptId,
		questionId,
		tags: [],
		reason: "",
		learning: "",
		note: "",
		revision: false,
		updatedAt: 0
	};
}
async function listNotes(attemptId) {
	const all = await (await getDB()).getAll("notes");
	return attemptId ? all.filter((n) => n.attemptId === attemptId) : all;
}
async function putNote(note) {
	const db = await getDB();
	if (note.tags.length === 0 && !note.reason.trim() && !note.learning.trim() && !note.note.trim() && !note.revision) {
		await db.delete("notes", note.id);
		return;
	}
	await db.put("notes", {
		...note,
		updatedAt: Date.now()
	});
}
var audioReflectionKey = (attemptId, questionId) => `${attemptId}::${questionId}`;
async function getAudioReflection(attemptId, questionId) {
	return await (await getDB()).get("audioReflections", audioReflectionKey(attemptId, questionId));
}
async function putAudioReflection(reflection) {
	await (await getDB()).put("audioReflections", {
		...reflection,
		updatedAt: Date.now()
	});
}
async function deleteAudioReflection(id) {
	await (await getDB()).delete("audioReflections", id);
}
async function listLibraryNotes() {
	return (await (await getDB()).getAll("library")).sort((a, b) => b.createdAt - a.createdAt);
}
async function putLibraryNote(note) {
	await (await getDB()).put("library", note);
}
async function deleteLibraryNote(id) {
	const db = await getDB();
	const u = urlCache.get(`lib:${id}`);
	if (u) URL.revokeObjectURL(u);
	urlCache.delete(`lib:${id}`);
	await db.delete("library", id);
}
/** Cached object URL for a library note (PDF or image). */
async function libraryNoteUrl(id) {
	const key = `lib:${id}`;
	if (urlCache.has(key)) return urlCache.get(key);
	const rec = await (await getDB()).get("library", id);
	if (!rec) return null;
	const url = URL.createObjectURL(rec.blob);
	urlCache.set(key, url);
	return url;
}
async function listErrorJournalEntries() {
	return (await (await getDB()).getAllFromIndex("errorJournal", "createdAt")).reverse();
}
async function putErrorJournalEntry(entry) {
	await (await getDB()).put("errorJournal", {
		...entry,
		updatedAt: Date.now()
	});
}
async function deleteErrorJournalEntry(id) {
	const db = await getDB();
	await db.delete("errorJournal", id);
	await db.delete("errorJournalAudio", id);
	await db.delete("errorJournalImages", id);
}
async function getErrorJournalImage(id) {
	return (await (await getDB()).get("errorJournalImages", id))?.blob;
}
async function putErrorJournalImage(id, blob, mimeType) {
	const tx = (await getDB()).transaction("errorJournalImages", "readwrite");
	await tx.store.put({
		id,
		blob,
		mimeType,
		updatedAt: Date.now()
	});
	await tx.done;
}
async function getErrorJournalAudio(id) {
	return (await (await getDB()).get("errorJournalAudio", id))?.blob;
}
async function putErrorJournalAudio(id, blob, mimeType) {
	const tx = (await getDB()).transaction("errorJournalAudio", "readwrite");
	await tx.store.put({
		id,
		blob,
		mimeType,
		updatedAt: Date.now()
	});
	await tx.done;
}
async function deleteErrorJournalAudio(id) {
	await (await getDB()).delete("errorJournalAudio", id);
}
//#endregion
export { putNote as $, getLiveTestDraft as A, listScheduledLiveTests as B, formatLiveWindowRange as C, getEffectiveLiveTestSyllabus as D, getAudioReflection as E, listAttempts as F, putAttempt as G, listUpcomingLiveTests as H, listErrorJournalEntries as I, putErrorJournalEntry as J, putAudioReflection as K, listImages as L, imageUrl as M, libraryNoteUrl as N, getErrorJournalAudio as O, listAllImages as P, putLibraryNote as Q, listLibraryNotes as R, formatLiveTestDate as S, getAttempt as T, noteKey as U, listTests as V, orderQuestionsBySubject as W, putImage as X, putErrorJournalImage as Y, putImages as Z, deleteScheduledLiveTest as _, cloneQuestionForDraft as a, uid as at, forgetImageUrl as b, createBlankQuestionForDraft as c, deleteAudioReflection as d, putTest as et, deleteErrorJournalAudio as f, deleteLiveTestDraft as g, deleteLibraryNote as h, bumpUsage as i, setActiveLiveTestDraftId as it, getTest as j, getErrorJournalImage as k, createLiveTestDraft as l, deleteImage as m, audioReflectionKey as n, saveLiveTestDraft as nt, completeScheduledLiveTest as o, usageMap as ot, deleteErrorJournalEntry as p, putErrorJournalAudio as q, buildLiveTestPreviewAttempt as r, scheduleLiveTest as rt, countImages as s, addLiveAttemptToScheduled as t, questionAlreadyInDraft as tt, deleteAttempt as u, deleteTest as v, getActiveLiveTestDraftId as w, formatLiveDuration as x, emptyNote as y, listNotes as z };
