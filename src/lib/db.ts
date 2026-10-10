import { openDB, type IDBPDatabase } from "idb";
import { buildLiveTestPreviewAttempt, getLiveTestDraft } from "./live-tests";
import type { Attempt, StoredImage, TestSet } from "./types";

const DB_NAME = "jee-cbt";
const DB_VERSION = 8;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (typeof window === "undefined") throw new Error("IndexedDB unavailable on server");
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("tests")) {
          db.createObjectStore("tests", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("images")) {
          const s = db.createObjectStore("images", { keyPath: "id" });
          s.createIndex("testId", "testId");
        }
        if (!db.objectStoreNames.contains("attempts")) {
          const s = db.createObjectStore("attempts", { keyPath: "id" });
          s.createIndex("testId", "testId");
        }
        if (!db.objectStoreNames.contains("usage")) {
          db.createObjectStore("usage", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("library")) {
          db.createObjectStore("library", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("audioReflections")) {
          db.createObjectStore("audioReflections", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("errorJournal")) {
          const s = db.createObjectStore("errorJournal", { keyPath: "id" });
          s.createIndex("createdAt", "createdAt");
        }
        if (!db.objectStoreNames.contains("errorJournalAudio")) {
          db.createObjectStore("errorJournalAudio", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("errorJournalImages")) {
          db.createObjectStore("errorJournalImages", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

/* ---------------- tests ---------------- */

function isDraftTestId(id: string) {
  return id.startsWith("draft_");
}

const LIVE_DRAFT_KEY = "cbt_live_test_drafts";

function readDrafts(): Record<string, TestSet> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(LIVE_DRAFT_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, TestSet>;
  } catch {
    return {};
  }
}

function writeDrafts(map: Record<string, TestSet>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LIVE_DRAFT_KEY, JSON.stringify(map));
}

export async function listTests(): Promise<TestSet[]> {
  const db = await getDB();
  const all = (await db.getAll("tests")) as TestSet[];
  return all.filter((t) => !isDraftTestId(t.id)).sort((a, b) => b.importedAt - a.importedAt);
}

export async function getTest(id: string): Promise<TestSet | undefined> {
  const draftId = id.startsWith("preview_") ? id.replace(/^preview_/, "") : id.startsWith("draft_") ? id : null;
  if (draftId) {
    const draft = getLiveTestDraft(draftId);
    if (!draft) return undefined;
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
      questions: draft.questions,
    } satisfies TestSet;
  }
  const db = await getDB();
  return (await db.get("tests", id)) as TestSet | undefined;
}

export async function putTest(test: TestSet) {
  if (isDraftTestId(test.id)) {
    const drafts = readDrafts();
    drafts[test.id] = test;
    writeDrafts(drafts);
    return test;
  }
  const db = await getDB();
  await db.put("tests", test);
  return test;
}

export async function deleteTest(id: string) {
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

/* ---------------- images ---------------- */

export async function putImage(img: StoredImage) {
  const db = await getDB();
  await db.put("images", img);
}

export async function putImages(imgs: StoredImage[]) {
  const db = await getDB();
  const tx = db.transaction("images", "readwrite");
  for (const i of imgs) tx.store.put(i);
  await tx.done;
}

export async function getImage(id: string): Promise<StoredImage | undefined> {
  const db = await getDB();
  return (await db.get("images", id)) as StoredImage | undefined;
}

export async function listImages(testId: string): Promise<StoredImage[]> {
  const db = await getDB();
  return (await db.getAllFromIndex("images", "testId", testId)) as StoredImage[];
}

export async function listAllImages(): Promise<StoredImage[]> {
  const db = await getDB();
  return (await db.getAll("images")) as StoredImage[];
}

export async function countImages(): Promise<number> {
  const db = await getDB();
  return db.count("images");
}

export async function deleteImage(id: string) {
  const db = await getDB();
  await db.delete("images", id);
}

const urlCache = new Map<string, string>();

export async function imageUrl(id: string): Promise<string | null> {
  if (urlCache.has(id)) return urlCache.get(id)!;
  const rec = await getImage(id);
  if (!rec) return null;
  const url = URL.createObjectURL(rec.blob);
  urlCache.set(id, url);
  return url;
}

export function forgetImageUrl(id: string) {
  const u = urlCache.get(id);
  if (u) URL.revokeObjectURL(u);
  urlCache.delete(id);
}

/* ---------------- attempts ---------------- */

export async function listAttempts(): Promise<Attempt[]> {
  const db = await getDB();
  const all = (await db.getAll("attempts")) as Attempt[];
  return all.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getAttempt(id: string): Promise<Attempt | undefined> {
  if (id.startsWith("preview_")) {
    const draftId = id.replace(/^preview_/, "");
    const draft = getLiveTestDraft(draftId);
    if (!draft) return undefined;
    return buildLiveTestPreviewAttempt(draft);
  }
  const db = await getDB();
  return (await db.get("attempts", id)) as Attempt | undefined;
}

export async function putAttempt(attempt: Attempt) {
  const db = await getDB();
  const tx = db.transaction("attempts", "readwrite");
  const current = (await tx.store.get(attempt.id)) as Attempt | undefined;
  if (!current?.submitted || attempt.submitted) await tx.store.put(attempt);
  await tx.done;
}

export async function deleteAttempt(id: string) {
  const db = await getDB();
  await db.delete("attempts", id);
}

/* ---------------- question usage history ---------------- */

export interface QuestionUsage {
  id: string;
  count: number;
  lastUsed: number;
}

export async function listUsage(): Promise<QuestionUsage[]> {
  const db = await getDB();
  return (await db.getAll("usage")) as QuestionUsage[];
}

export async function usageMap(): Promise<Map<string, QuestionUsage>> {
  return new Map((await listUsage()).map((u) => [u.id, u]));
}

export async function bumpUsage(ids: string[]) {
  if (ids.length === 0) return;
  const db = await getDB();
  const tx = db.transaction("usage", "readwrite");
  const now = Date.now();
  for (const id of ids) {
    const cur = (await tx.store.get(id)) as QuestionUsage | undefined;
    void tx.store.put({ id, count: (cur?.count ?? 0) + 1, lastUsed: now });
  }
  await tx.done;
}

export async function resetUsage() {
  const db = await getDB();
  await db.clear("usage");
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

/* ---------------- per-question revision notes ---------------- */

/**
 * Notes are stored separately from attempts so question data is never duplicated.
 * One record per (attempt, question) pair.
 */
export interface QuestionNote {
  id: string;
  attemptId: string;
  questionId: string;
  /** quick reason tags for the Wrong Notebook */
  tags: string[];
  /** "Why did I get this wrong?" free text */
  reason: string;
  /** "What did I learn?" free text */
  learning: string;
  /** generic personal note (bookmarks) */
  note: string;
  /** mark for revision (bookmarks) */
  revision: boolean;
  updatedAt: number;
}

export const noteKey = (attemptId: string, questionId: string) => `${attemptId}::${questionId}`;

export function emptyNote(attemptId: string, questionId: string): QuestionNote {
  return {
    id: noteKey(attemptId, questionId),
    attemptId,
    questionId,
    tags: [],
    reason: "",
    learning: "",
    note: "",
    revision: false,
    updatedAt: 0,
  };
}

export async function listNotes(attemptId?: string): Promise<QuestionNote[]> {
  const db = await getDB();
  const all = (await db.getAll("notes")) as QuestionNote[];
  return attemptId ? all.filter((n) => n.attemptId === attemptId) : all;
}

export async function putNote(note: QuestionNote) {
  const db = await getDB();
  const empty =
    note.tags.length === 0 &&
    !note.reason.trim() &&
    !note.learning.trim() &&
    !note.note.trim() &&
    !note.revision;
  if (empty) {
    await db.delete("notes", note.id);
    return;
  }
  await db.put("notes", { ...note, updatedAt: Date.now() });
}

export async function deleteNote(id: string) {
  const db = await getDB();
  await db.delete("notes", id);
}

/* ---------------- per-question audio reflections ---------------- */

export interface QuestionAudioReflection {
  id: string;
  attemptId: string;
  questionId: string;
  blob: Blob;
  mimeType: string;
  duration: number;
  createdAt: number;
  updatedAt: number;
}

export const audioReflectionKey = (attemptId: string, questionId: string) =>
  `${attemptId}::${questionId}`;

export async function getAudioReflection(
  attemptId: string,
  questionId: string,
): Promise<QuestionAudioReflection | undefined> {
  const db = await getDB();
  return (await db.get("audioReflections", audioReflectionKey(attemptId, questionId))) as
    QuestionAudioReflection | undefined;
}

export async function putAudioReflection(reflection: QuestionAudioReflection) {
  const db = await getDB();
  await db.put("audioReflections", { ...reflection, updatedAt: Date.now() });
}

export async function deleteAudioReflection(id: string) {
  const db = await getDB();
  await db.delete("audioReflections", id);
}

/* ---------------- notes library (revision PDFs / images) ---------------- */

/**
 * Standalone revision material store. Completely independent of the question
 * bank, tests, attempts and the CBT engine — nothing here is ever read by them.
 */
export interface LibraryNote {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  kind: "pdf" | "image";
  /** original file name */
  name: string;
  type: string;
  size: number;
  blob: Blob;
  createdAt: number;
}

export async function listLibraryNotes(): Promise<LibraryNote[]> {
  const db = await getDB();
  const all = (await db.getAll("library")) as LibraryNote[];
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function putLibraryNote(note: LibraryNote) {
  const db = await getDB();
  await db.put("library", note);
}

export async function deleteLibraryNote(id: string) {
  const db = await getDB();
  const u = urlCache.get(`lib:${id}`);
  if (u) URL.revokeObjectURL(u);
  urlCache.delete(`lib:${id}`);
  await db.delete("library", id);
}

/** Cached object URL for a library note (PDF or image). */
export async function libraryNoteUrl(id: string): Promise<string | null> {
  const key = `lib:${id}`;
  if (urlCache.has(key)) return urlCache.get(key)!;
  const db = await getDB();
  const rec = (await db.get("library", id)) as LibraryNote | undefined;
  if (!rec) return null;
  const url = URL.createObjectURL(rec.blob);
  urlCache.set(key, url);
  return url;
}

/* ---------------- error journal entries ---------------- */

export interface ErrorJournalImage {
  id: string;
  blob: Blob;
  mimeType: string;
}

export interface ErrorJournalEntry {
  id: string;
  questionId?: string; // Reference to original question in test
  questionText: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | string;
  chapter: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  source: string;
  questionNumber: string;
  errorType:
    | "Wrong Answer"
    | "Couldn't Solve"
    | "Concept"
    | "Formula"
    | "Calculation"
    | "Misread"
    | "Time Pressure"
    | "Wrong Approach"
    | "Guess";
  imageId?: string;
  mistakeMade: string;
  whatLearned: string;
  rememberNext: string;
  additionalNotes: string;
  status: "Need Review" | "Learning" | "Mastered";
  hasAudio: boolean;
  tryAgainCount: number;
  lastTryAgainStatus?: "Solved this time" | "Still couldn't solve";
  createdAt: number;
  updatedAt: number;
}

export async function listErrorJournalEntries(): Promise<ErrorJournalEntry[]> {
  const db = await getDB();
  const all = (await db.getAllFromIndex("errorJournal", "createdAt")) as ErrorJournalEntry[];
  return all.reverse();
}

export async function getErrorJournalEntry(id: string): Promise<ErrorJournalEntry | undefined> {
  const db = await getDB();
  return (await db.get("errorJournal", id)) as ErrorJournalEntry | undefined;
}

export async function putErrorJournalEntry(entry: ErrorJournalEntry) {
  const db = await getDB();
  await db.put("errorJournal", { ...entry, updatedAt: Date.now() });
}

export async function deleteErrorJournalEntry(id: string) {
  const db = await getDB();
  await db.delete("errorJournal", id);
  await db.delete("errorJournalAudio", id);
  await db.delete("errorJournalImages", id);
}

export async function getErrorJournalImage(id: string): Promise<Blob | undefined> {
  const db = await getDB();
  const data = (await db.get("errorJournalImages", id)) as { blob: Blob } | undefined;
  return data?.blob;
}

export async function putErrorJournalImage(id: string, blob: Blob, mimeType: string) {
  const db = await getDB();
  const tx = db.transaction("errorJournalImages", "readwrite");
  await tx.store.put({ id, blob, mimeType, updatedAt: Date.now() });
  await tx.done;
}

export async function getErrorJournalAudio(id: string): Promise<Blob | undefined> {
  const db = await getDB();
  const data = (await db.get("errorJournalAudio", id)) as { blob: Blob } | undefined;
  return data?.blob;
}

export async function putErrorJournalAudio(id: string, blob: Blob, mimeType: string) {
  const db = await getDB();
  const tx = db.transaction("errorJournalAudio", "readwrite");
  await tx.store.put({ id, blob, mimeType, updatedAt: Date.now() });
  await tx.done;
}

export async function deleteErrorJournalAudio(id: string) {
  const db = await getDB();
  await db.delete("errorJournalAudio", id);
}

export const errorJournalImageUrl = async (entryId: string): Promise<string | null> => {
  const key = `ej:${entryId}`;
  if (urlCache.has(key)) return urlCache.get(key)!;
  const blob = await getErrorJournalImage(entryId);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(key, url);
  return url;
};

export const forgetErrorJournalImageUrl = (entryId: string) => {
  const key = `ej:${entryId}`;
  const u = urlCache.get(key);
  if (u) URL.revokeObjectURL(u);
  urlCache.delete(key);
};
