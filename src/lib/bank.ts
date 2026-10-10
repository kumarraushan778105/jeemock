import { bumpUsage, listAttempts, listTests, usageMap, type QuestionUsage } from "./db";
import { questionsForAttempt } from "./stats";
import { isCorrect } from "./scoring";
import { validatePool } from "./validate";
import type { Difficulty, ExamKind, Question, QuestionType, TestSet } from "./types";

export interface BankItem {
  q: Question;
  test: TestSet;
}

export interface ChapterNode {
  key: string;
  subject: string;
  chapter: string;
  topics: string[];
  total: number;
  easy: number;
  medium: number;
  hard: number;
  figures: number;
  items: BankItem[];
}

export interface SubjectNode {
  subject: string;
  total: number;
  chapters: ChapterNode[];
}

/** Flat pool of every question in every imported set. */
export function bankItems(tests: TestSet[]): BankItem[] {
  const out: BankItem[] = [];
  for (const t of tests) for (const q of t.questions) out.push({ q, test: t });
  return out;
}

/** Validation report for a bank pool — invalid questions never enter a test. */
export function validateBank(items: BankItem[]) {
  return validatePool(items, (i) => i.q);
}

/** Only questions that pass validation. */
export function validBankItems(items: BankItem[]): BankItem[] {
  return validateBank(items).valid;
}

/** Total / valid / invalid counts per subject. */
export function validationBySubject(items: BankItem[]) {
  const report = validateBank(items);
  const map = new Map<string, { subject: string; total: number; valid: number; invalid: number }>();
  const bump = (subject: string, key: "valid" | "invalid") => {
    const s = subject || "General";
    const cur = map.get(s) ?? { subject: s, total: 0, valid: 0, invalid: 0 };
    cur.total += 1;
    cur[key] += 1;
    map.set(s, cur);
  };
  for (const it of report.valid) bump(it.q.subject, "valid");
  for (const { item } of report.invalid) bump(item.q.subject, "invalid");
  return [...map.values()].sort((a, b) => a.subject.localeCompare(b.subject));
}

/** Subject → chapter folder tree. */
export function chapterTree(items: BankItem[]): SubjectNode[] {
  const chapters = new Map<string, ChapterNode>();
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
        items: [],
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

  const subjects = new Map<string, SubjectNode>();
  for (const node of chapters.values()) {
    const s = subjects.get(node.subject) ?? { subject: node.subject, total: 0, chapters: [] };
    s.total += node.total;
    s.chapters.push(node);
    subjects.set(node.subject, s);
  }
  const list = [...subjects.values()];
  for (const s of list) s.chapters.sort((a, b) => a.chapter.localeCompare(b.chapter));
  return list.sort((a, b) => a.subject.localeCompare(b.subject));
}

/** Library a set belongs to — inferred from its name when not tagged. */
export function examOf(test: TestSet | undefined): ExamKind {
  if (test?.exam) return test.exam;
  return /advanc/i.test(test?.name ?? "") ? "advanced" : "main";
}

export interface BankFilters {
  search?: string;
  exams?: ExamKind[];
  banks?: string[];
  subjects?: string[];
  chapters?: string[];
  topics?: string[];
  difficulties?: Difficulty[];
  types?: QuestionType[];
  pyqOnly?: boolean;
}

function normalizeSearchText(value: string | undefined | null): string {
  const aliases = new Map<string, string>([
    ["mathematics", "math"],
    ["mathematical", "math"],
    ["maths", "math"],
    ["math", "math"],
    ["physics", "physics"],
    ["phy", "physics"],
    ["chemistry", "chemistry"],
    ["chem", "chemistry"],
    ["biology", "biology"],
    ["bio", "biology"],
  ]);

  const normalized = (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[\/\\-]+/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return "";

  return normalized
    .split(" ")
    .map((token) => aliases.get(token) ?? token)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function filterItems(items: BankItem[], f: BankFilters): BankItem[] {
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
      const hay = normalizeSearchText(
        [
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
          q.altMethod,
        ]
          .filter(Boolean)
          .join(" "),
      );
      if (!hay.includes(term)) return false;
    }
    return true;
  });
}

/* ------------------------------------------------------------------ */
/*                        smart random selection                       */
/* ------------------------------------------------------------------ */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestionBankPool(
  questions: Question[],
  requested: number | "all",
  existingIds: Set<string> = new Set(),
) {
  const unique: Question[] = [];
  const seen = new Set<string>();

  for (const question of questions) {
    const key = question.id;
    if (!key || seen.has(key) || existingIds.has(key)) continue;
    seen.add(key);
    unique.push(question);
  }

  const available = unique.length;
  if (requested === "all") {
    return { questions: unique, available, requested: available, exceeded: false };
  }

  if (requested <= 0) {
    return { questions: [], available, requested: 0, exceeded: false };
  }

  if (requested > available) {
    return { questions: [], available, requested, exceeded: true };
  }

  return {
    questions: shuffle(unique).slice(0, requested),
    available,
    requested,
    exceeded: false,
  };
}

export function resolveBankItemsFromQuestions(
  questions: Question[],
  tests: TestSet[],
  existingIds: Set<string> = new Set(),
) {
  const items: BankItem[] = [];
  const seen = new Set<string>();
  const duplicates: string[] = [];
  const missing: string[] = [];

  for (const question of questions) {
    const id = question.id;
    if (!id) {
      missing.push(String(id ?? "unknown"));
      continue;
    }

    if (seen.has(id) || existingIds.has(id)) {
      if (!duplicates.includes(id)) duplicates.push(id);
      continue;
    }

    const sourceTest = tests.find((test) => test.questions.some((item) => item.id === id));
    if (!sourceTest) {
      missing.push(id);
      continue;
    }

    seen.add(id);
    items.push({ q: question, test: sourceTest });
  }

  return { items, duplicates, missing };
}

/**
 * Picks `count` questions at random, never repeating inside the test and
 * exhausting least-used questions first so a chapter cycles fully before any
 * question comes back in a later test.
 */
export function smartPick(
  items: BankItem[],
  count: number,
  usage: Map<string, QuestionUsage>,
): BankItem[] {
  if (count <= 0 || items.length === 0) return [];
  const buckets = new Map<number, BankItem[]>();
  for (const it of items) {
    const used = usage.get(it.q.id)?.count ?? 0;
    const b = buckets.get(used) ?? [];
    b.push(it);
    buckets.set(used, b);
  }
  const out: BankItem[] = [];
  for (const level of [...buckets.keys()].sort((a, b) => a - b)) {
    if (out.length >= count) break;
    out.push(...shuffle(buckets.get(level)!).slice(0, count - out.length));
  }
  return shuffle(out);
}

/** Proportional split of `total` across pools, capped by availability. */
export function autoDistribute(pools: { key: string; available: number }[], total: number) {
  const sum = pools.reduce((a, p) => a + p.available, 0);
  const plan = new Map<string, number>();
  if (sum === 0) return plan;
  let assigned = 0;
  const target = Math.min(total, sum);
  for (const p of pools) {
    const n = Math.min(p.available, Math.floor((p.available / sum) * target));
    plan.set(p.key, n);
    assigned += n;
  }
  // distribute the remainder to pools that still have room
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
export function buildFromPlan(
  groups: { key: string; items: BankItem[] }[],
  plan: Map<string, number>,
  usage: Map<string, QuestionUsage>,
): BankItem[] {
  const picked: BankItem[] = [];
  const seen = new Set<string>();
  for (const g of groups) {
    for (const it of smartPick(g.items, plan.get(g.key) ?? 0, usage)) {
      if (seen.has(it.q.id)) continue;
      seen.add(it.q.id);
      picked.push(it);
    }
  }
  return shuffle(picked);
}

export async function recordUsage(questions: Question[]) {
  await bumpUsage(questions.map((q) => q.id));
}

/* ------------------------------------------------------------------ */
/*                          question history                           */
/* ------------------------------------------------------------------ */

export interface QuestionHistory {
  attempted: Set<string>;
  correct: Set<string>;
  wrong: Set<string>;
  skipped: Set<string>;
  bookmarked: Set<string>;
  /** Seen in history and every single occurrence was correct — locked out of new tests. */
  mastered: Set<string>;
  chapterAccuracy: Map<string, { correct: number; total: number }>;
}

export async function questionHistory(): Promise<QuestionHistory> {
  const attempts = (await listAttempts()).filter((a) => a.submitted);
  const h: QuestionHistory = {
    attempted: new Set(),
    correct: new Set(),
    wrong: new Set(),
    skipped: new Set(),
    bookmarked: new Set(),
    mastered: new Set(),
    chapterAccuracy: new Map(),
  };
  for (const a of attempts) {
    const questions = await questionsForAttempt(a);
    for (const q of questions) {
      const ans = a.answers[q.id];
      if (ans?.bookmarked) h.bookmarked.add(q.id);
      const key = `${q.subject}::${q.chapter}`;
      const bucket = h.chapterAccuracy.get(key) ?? { correct: 0, total: 0 };
      const answered =
        ans?.value !== null && ans?.value !== undefined && String(ans?.value).length > 0;
      if (!answered) {
        h.skipped.add(q.id);
      } else {
        h.attempted.add(q.id);
        bucket.total += 1;
        if (isCorrect(q, ans!.value)) {
          h.correct.add(q.id);
          bucket.correct += 1;
        } else {
          h.wrong.add(q.id);
        }
      }
      h.chapterAccuracy.set(key, bucket);
    }
  }
  for (const id of h.correct) {
    if (!h.wrong.has(id) && !h.skipped.has(id)) h.mastered.add(id);
  }
  return h;
}

/**
 * Questions still allowed in newly generated tests. A question is locked only when
 * every appearance across saved history was answered correctly; deleting those
 * attempts from History makes it eligible again.
 */
export function eligibleItems(items: BankItem[], mastered: Set<string>): BankItem[] {
  const seen = new Set<string>();
  const out: BankItem[] = [];
  for (const it of items) {
    if (mastered.has(it.q.id) || seen.has(it.q.id)) continue;
    seen.add(it.q.id);
    out.push(it);
  }
  return out;
}

export type WeakSource = "wrong" | "weak" | "bookmarked" | "unattempted";

export async function weakSourcePool(source: WeakSource): Promise<BankItem[]> {
  const [tests, history] = await Promise.all([listTests(), questionHistory()]);
  const items = bankItems(tests);
  if (source === "wrong") return items.filter((i) => history.wrong.has(i.q.id));
  if (source === "bookmarked") return items.filter((i) => history.bookmarked.has(i.q.id));
  if (source === "unattempted") return items.filter((i) => !history.attempted.has(i.q.id));
  const weakChapters = new Set(
    [...history.chapterAccuracy.entries()]
      .filter(([, v]) => v.total >= 3 && v.correct / v.total < 0.6)
      .map(([k]) => k),
  );
  return items.filter((i) => weakChapters.has(`${i.q.subject}::${i.q.chapter}`));
}

export async function currentUsage() {
  return usageMap();
}
