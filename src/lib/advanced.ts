/**
 * JEE Advanced module core.
 *
 * Everything here is additive — JEE Main logic (bank.ts, stats.ts, scoring.ts)
 * is untouched and keeps working exactly as before.
 */
import { listAttempts, listTests } from "./db";
import { examOf, type BankItem } from "./bank";
import { questionsForAttempt } from "./stats";
import { validatePool } from "./validate";
import { isCorrect } from "./scoring";
import type { Attempt, Difficulty, Question, QuestionType, TestSet } from "./types";

/* ------------------------------------------------------------------ */
/*                          paper / year tags                          */
/* ------------------------------------------------------------------ */

export type PaperNo = 1 | 2;

/** Detects Paper 1 / Paper 2 from tags or the file name — never asks the user. */
export function detectPaper(name: string, tagged?: PaperNo): PaperNo {
  if (tagged === 1 || tagged === 2) return tagged;
  const n = name.toLowerCase();
  if (/(paper[\s_-]*2|p[\s_-]*2\b|\bpaper2\b|\bii\b)/.test(n)) return 2;
  return 1;
}

export function detectYear(name: string, tagged?: number): number | undefined {
  if (tagged && tagged > 1950) return tagged;
  const m = name.match(/(19|20)\d{2}/);
  return m ? Number(m[0]) : undefined;
}

export const isAdvanced = (t: TestSet) => examOf(t) === "advanced";

export function advancedTests(tests: TestSet[]): TestSet[] {
  return tests.filter(isAdvanced);
}

export function paperOf(t: TestSet): PaperNo {
  return detectPaper(t.name, t.paper);
}

export function yearOf(t: TestSet): number | undefined {
  return detectYear(t.name, t.year);
}

/* ------------------------------------------------------------------ */
/*                        subject arrangement                          */
/* ------------------------------------------------------------------ */

const SUBJECT_ORDER = ["Physics", "Chemistry", "Mathematics"];

function subjectRank(s: string) {
  const i = SUBJECT_ORDER.findIndex((x) => x.toLowerCase() === (s || "").toLowerCase());
  return i === -1 ? SUBJECT_ORDER.length : i;
}

/**
 * Physics → Chemistry → Mathematics, renumbered 1..n so subjects never mix.
 * (Physics 1–25, Chemistry 26–50, Maths 51–75 for a standard 75-question paper.)
 */
export function arrangeBySubject(questions: Question[]): Question[] {
  return [...questions]
    .sort((a, b) => subjectRank(a.subject) - subjectRank(b.subject) || a.number - b.number)
    .map((q, i) => ({ ...q, number: i + 1 }));
}

export function subjectBlocks(questions: Question[]) {
  const blocks: { subject: string; from: number; to: number; count: number }[] = [];
  questions.forEach((q, i) => {
    const last = blocks[blocks.length - 1];
    if (last && last.subject === q.subject) {
      last.to = i + 1;
      last.count += 1;
    } else {
      blocks.push({ subject: q.subject, from: i + 1, to: i + 1, count: 1 });
    }
  });
  return blocks;
}

/* ------------------------------------------------------------------ */
/*                   advanced question pool + indexing                 */
/* ------------------------------------------------------------------ */

export interface AdvItem extends BankItem {
  paper: PaperNo;
  year?: number;
}

/** Flat, memo-friendly pool of every JEE Advanced question. */
export function advancedPool(tests: TestSet[]): AdvItem[] {
  const out: AdvItem[] = [];
  for (const t of advancedTests(tests)) {
    const paper = paperOf(t);
    const year = yearOf(t);
    for (const q of t.questions) out.push({ q, test: t, paper, year: q.year ?? year });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/*                    automatic PYQ bank classification                */
/* ------------------------------------------------------------------ */

/** True when a set name contains "PYQ" anywhere (case-insensitive). */
export function isPyqName(name: string | undefined | null): boolean {
  return /pyq/i.test(String(name ?? ""));
}

/**
 * A set belongs to Advanced → PYQ when it is an Advanced set, or when its name
 * contains "PYQ". Detection is derived from the current name only, so renaming a
 * set instantly adds/removes the automatic classification and nothing is stored.
 * A manual `exam: "advanced"` tag always wins.
 */
export function isPyqTest(t: TestSet): boolean {
  return isAdvanced(t) || isPyqName(t.name);
}

/**
 * Every question available to Advanced → PYQ: the Advanced pool plus any set
 * whose name contains "PYQ", regardless of which library it was imported into.
 */
export function pyqPool(tests: TestSet[]): AdvItem[] {
  const out: AdvItem[] = advancedPool(tests);
  const seen = new Set(out.map((i) => i.test.id));
  for (const t of tests) {
    if (seen.has(t.id) || !isPyqName(t.name)) continue;
    const paper = paperOf(t);
    const year = yearOf(t);
    for (const q of t.questions) out.push({ q, test: t, paper, year: q.year ?? year });
  }
  return out;
}

export interface AdvIndex {
  items: AdvItem[];
  byId: Map<string, AdvItem>;
  subjects: string[];
  chapters: string[];
  topics: string[];
  years: number[];
  types: QuestionType[];
  /** lowercased haystack per question id — built once, reused by search */
  search: Map<string, string>;
}

/** Built once per pool change; keeps filtering O(n) with no per-keystroke work. */
export function buildIndex(items: AdvItem[]): AdvIndex {
  const byId = new Map<string, AdvItem>();
  const search = new Map<string, string>();
  const subjects = new Set<string>();
  const chapters = new Set<string>();
  const topics = new Set<string>();
  const years = new Set<number>();
  const types = new Set<QuestionType>();
  for (const it of items) {
    byId.set(it.q.id, it);
    search.set(
      it.q.id,
      `${it.q.text} ${it.q.chapter} ${it.q.topic} ${it.q.subject} ${it.test.name}`.toLowerCase(),
    );
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
    types: [...types],
  };
}

export type PoolSource =
  "all" | "weak" | "strong" | "wrong" | "unattempted" | "bookmarked" | "imported" | "pyq";

export interface AdvFilters {
  search?: string;
  papers?: PaperNo[];
  years?: number[];
  subjects?: string[];
  chapters?: string[];
  topics?: string[];
  difficulties?: Difficulty[];
  types?: QuestionType[];
  pyqOnly?: boolean;
  source?: PoolSource;
}

export interface CustomPyqFilters {
  papers?: PaperNo[];
  years?: number[];
  subjects?: string[];
  chapters?: string[];
  topics?: string[];
}

export function customPyqSelection(items: AdvItem[], f: CustomPyqFilters): AdvItem[] {
  const hasAny = Boolean(
    f.papers?.length ||
    f.years?.length ||
    f.subjects?.length ||
    f.chapters?.length ||
    f.topics?.length,
  );
  if (!hasAny) return items;

  return items.filter(({ q, paper, year }) => {
    if (f.papers?.length && !f.papers.includes(paper)) return false;
    if (f.years?.length && (!year || !f.years.includes(year))) return false;
    if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
    if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
    if (f.topics?.length && (!q.topic || !f.topics.includes(q.topic))) return false;
    return true;
  });
}

export function filterAdvanced(index: AdvIndex, f: AdvFilters, history?: AdvHistory): AdvItem[] {
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
      if (f.source === "weak" && !history.weakChapters.has(`${q.subject}::${q.chapter}`))
        return false;
      if (f.source === "strong" && !history.strongChapters.has(`${q.subject}::${q.chapter}`))
        return false;
    }
    if (term && !(index.search.get(q.id) ?? "").includes(term)) return false;
    return true;
  });
}

/* ------------------------------------------------------------------ */
/*                     attempt history & used pool                     */
/* ------------------------------------------------------------------ */

export type BookmarkTag = "Revision" | "Doubt" | "Important" | "Formula" | "Favourite";
export const BOOKMARK_TAGS: BookmarkTag[] = [
  "Revision",
  "Doubt",
  "Important",
  "Formula",
  "Favourite",
];

export interface BookmarkEntry {
  question: Question;
  tag?: string;
  attemptId: string;
  testName: string;
  year?: number;
  correct?: boolean;
}

export interface AdvHistory {
  /** ids consumed by completed advanced attempts — released when a test is deleted */
  used: Set<string>;
  attempted: Set<string>;
  correct: Set<string>;
  wrong: Set<string>;
  bookmarks: Set<string>;
  bookmarkList: BookmarkEntry[];
  chapterAccuracy: Map<string, { correct: number; total: number }>;
  weakChapters: Set<string>;
  strongChapters: Set<string>;
}

const EMPTY_HISTORY = (): AdvHistory => ({
  used: new Set(),
  attempted: new Set(),
  correct: new Set(),
  wrong: new Set(),
  bookmarks: new Set(),
  bookmarkList: [],
  chapterAccuracy: new Map(),
  weakChapters: new Set(),
  strongChapters: new Set(),
});

export const isAdvancedAttempt = (a: Attempt) =>
  a.exam === "advanced" || /advanc/i.test(a.testName ?? "");

export async function advancedHistory(): Promise<AdvHistory> {
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
            correct: ans.value != null ? isCorrect(q, ans.value) : undefined,
          });
        }
      }
      if (!completed) continue;
      const answered = ans?.value != null && String(ans.value).length > 0;
      if (!answered) continue;
      h.attempted.add(q.id);
      const key = `${q.subject}::${q.chapter}`;
      const bucket = h.chapterAccuracy.get(key) ?? { correct: 0, total: 0 };
      bucket.total += 1;
      if (isCorrect(q, ans!.value)) {
        bucket.correct += 1;
        h.correct.add(q.id);
        h.wrong.delete(q.id);
      } else {
        h.wrong.add(q.id);
      }
      h.chapterAccuracy.set(key, bucket);
    }
  }
  for (const [key, v] of h.chapterAccuracy) {
    if (v.total < 3) continue;
    if (v.correct / v.total < 0.6) h.weakChapters.add(key);
    else if (v.correct / v.total >= 0.8) h.strongChapters.add(key);
  }
  return h;
}

/* ------------------------------------------------------------------ */
/*                        generation utilities                         */
/* ------------------------------------------------------------------ */

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface PickOptions {
  count: number;
  allowRepeat?: boolean;
  used?: Set<string>;
  /** keep the Physics → Chemistry → Mathematics block layout */
  arrange?: boolean;
}

export function pickQuestions(items: AdvItem[], opts: PickOptions): Question[] {
  // only validated questions may enter a generated paper
  const valid = validatePool(items, (i) => i.q).valid;
  const pool = opts.allowRepeat ? valid : valid.filter((i) => !opts.used?.has(i.q.id));
  const picked = shuffle(pool)
    .slice(0, Math.max(0, opts.count))
    .map((i) => i.q);
  return opts.arrange === false ? picked : arrangeBySubject(picked);
}

/** Even Physics / Chemistry / Maths split for full papers. */
export function pickBalanced(
  items: AdvItem[],
  perSubject: number,
  opts: Omit<PickOptions, "count">,
) {
  const out: Question[] = [];
  for (const s of SUBJECT_ORDER) {
    const subset = items.filter((i) => i.q.subject.toLowerCase() === s.toLowerCase());
    out.push(...pickQuestions(subset, { ...opts, count: perSubject, arrange: false }));
  }
  if (out.length === 0) return pickQuestions(items, { ...opts, count: perSubject * 3 });
  return arrangeBySubject(out);
}

export async function advancedContext() {
  const [tests, history] = await Promise.all([listTests(), advancedHistory()]);
  const pool = advancedPool(tests);
  // PYQ view also includes sets whose name contains "PYQ" (auto-classified)
  return { tests, pool, pyq: pyqPool(tests), index: buildIndex(pool), history };
}
