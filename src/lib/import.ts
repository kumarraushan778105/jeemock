import JSZip from "jszip";
import { listTests, putImages, putTest, uid } from "./db";
import { repairLatex } from "./latex";
import { detectPaper, detectYear } from "./advanced";
import { parseNumericList, validateQuestion } from "./validate";

import type {
  Difficulty,
  ExamKind,
  ImportIssue,
  QOption,
  Question,
  QuestionType,
  StoredImage,
  TestSet,
} from "./types";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i;

export interface ImportResult {
  test: TestSet;
  issues: ImportIssue[];
}

const TYPE_ALIASES: Record<string, QuestionType> = {
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
  table: "table",
};

function normType(raw: unknown, q: Record<string, unknown>): QuestionType {
  const key = String(raw ?? "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  if (TYPE_ALIASES[key]) return TYPE_ALIASES[key];
  const correct = q.correct ?? q.answer ?? q.correctAnswer;
  if (Array.isArray(correct) && correct.length > 1) return "multiple";
  if (typeof correct === "number") return "numerical";
  const opts = q.options ?? q.choices;
  if (!opts || (Array.isArray(opts) && opts.length === 0)) return "numerical";
  return "single";
}

function normSubject(raw: unknown): string {
  const s = String(raw ?? "").trim();
  const l = s.toLowerCase();
  if (l.startsWith("phy")) return "Physics";
  if (l.startsWith("chem")) return "Chemistry";
  if (l.startsWith("math") || l.startsWith("maths")) return "Mathematics";
  return s || "General";
}

function normDifficulty(raw: unknown): Difficulty {
  const l = String(raw ?? "").toLowerCase();
  if (l.startsWith("e")) return "Easy";
  if (l.startsWith("h")) return "Hard";
  return "Medium";
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function normOptions(raw: unknown): QOption[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((o, i) => {
        if (o && typeof o === "object") {
          const obj = o as Record<string, unknown>;
          return {
            id: String(obj.id ?? obj.key ?? obj.label ?? LETTERS[i] ?? i),
            text: String(obj.text ?? obj.value ?? obj.option ?? ""),
            images: toStringArray(obj.images ?? obj.image ?? obj.figure ?? obj.diagram),
          };
        }
        return { id: LETTERS[i] ?? String(i), text: String(o ?? "") };
      })
      .filter((o) => o.text !== "" || (o.images?.length ?? 0) > 0);
  }
  if (typeof raw === "object") {
    return Object.entries(raw as Record<string, unknown>).map(([k, v]) => ({
      id: k.toUpperCase(),
      text: String(v ?? ""),
    }));
  }
  return [];
}

function toStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.flatMap((x) => toStringArray(x));
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    return toStringArray(o.src ?? o.path ?? o.url ?? o.file ?? o.name ?? o.image);
  }
  const s = String(v).trim();
  return s ? [s] : [];
}

function normCorrect(raw: unknown, options: QOption[]): string[] {
  const arr = Array.isArray(raw) ? raw : raw === undefined || raw === null ? [] : [raw];
  return arr
    .flatMap((c) => (typeof c === "string" && /[,;]/.test(c) ? c.split(/[,;]/) : [c]))
    .map((c) => {
      const s = String(c).trim();
      if (options.some((o) => o.id.toLowerCase() === s.toLowerCase())) {
        return options.find((o) => o.id.toLowerCase() === s.toLowerCase())!.id;
      }
      const n = Number(s);
      if (!Number.isNaN(n) && options[n]) return options[n].id;
      if (!Number.isNaN(n) && options[n - 1]) return options[n - 1].id;
      return s;
    })
    .filter(Boolean);
}

const CHEM_HINT = /(\\ce|reaction|organic|benzene|alkane|alkene|isomer|→|->)/i;

/* ------------------------------------------------------------------ */
/*                        image reference gathering                     */
/* ------------------------------------------------------------------ */

const IMAGE_KEYS = [
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
  "attachments",
];

/** Recursively collect anything that looks like an image reference. */
function collectImageRefs(value: unknown, depth = 0, out: string[] = []): string[] {
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
  if (typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === "options" || k === "choices") continue;
      collectImageRefs(v, depth + 1, out);
    }
  }
  return out;
}

function questionImageRefs(raw: Record<string, unknown>): string[] {
  const direct: string[] = [];
  for (const key of IMAGE_KEYS) {
    if (raw[key] !== undefined) direct.push(...toStringArray(raw[key]));
  }
  const deep = collectImageRefs(raw);
  return [...new Set([...direct, ...deep].map((s) => s.trim()).filter(Boolean))];
}

/* ------------------------------------------------------------------ */
/*                            path handling                            */
/* ------------------------------------------------------------------ */

/** Normalizes Windows/Linux/relative/url-encoded paths to a lowercase posix path. */
export function normPath(input: string): string {
  let s = String(input ?? "").trim();
  if (!s) return "";
  s = s.replace(/^["']|["']$/g, "");
  s = s.split(/[?#]/)[0];
  try {
    if (/%[0-9a-f]{2}/i.test(s)) s = decodeURIComponent(s);
  } catch {
    /* keep raw */
  }
  s = s.replace(/\\/g, "/");
  s = s.replace(/^[a-zA-Z]:\//, ""); // C:/...
  s = s.replace(/^file:\/\//, "");
  s = s.replace(/^https?:\/\/[^/]+\//, "");
  const parts: string[] = [];
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

function baseName(path: string) {
  return normPath(path).split("/").pop() ?? path;
}

function stripExt(name: string) {
  return name.replace(IMAGE_EXT, "");
}

/** Q1.png / q_1.jpg / question-01.webp / 1.png -> 1 */
export function questionNumberFromFilename(name: string): number | null {
  const base = stripExt(baseName(name));
  const m = base.match(/(?:^|[^0-9])(?:q(?:uestion)?[\s_-]*)?(\d{1,4})(?:[^0-9]|$)/i);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export interface RawImageFile {
  path: string;
  blob: Blob;
}

/**
 * Multi-key index so a reference can be matched by full path, any trailing
 * path suffix, filename, or filename-without-extension.
 */
class ImageIndex {
  private map = new Map<string, string[]>();
  readonly byId = new Map<string, { path: string; base: string }>();

  private add(key: string, id: string) {
    if (!key) return;
    const cur = this.map.get(key);
    if (cur) {
      if (!cur.includes(id)) cur.push(id);
    } else this.map.set(key, [id]);
  }

  register(id: string, rawPath: string) {
    const path = normPath(rawPath);
    const base = baseName(path);
    this.byId.set(id, { path, base });
    const segs = path.split("/");
    for (let i = 0; i < segs.length; i++) this.add(segs.slice(i).join("/"), id);
    this.add(base, id);
    this.add(stripExt(base), id);
    this.add(stripExt(base).replace(/[\s_-]+/g, ""), id);
  }

  /** Returns the best matching image id, or null. */
  resolve(ref: string): string | null {
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
      // duplicate filenames: prefer the one whose full path ends with the ref
      const exact = hits.find((id) => {
        const rec = this.byId.get(id)!;
        return rec.path === p || rec.path.endsWith("/" + p);
      });
      return exact ?? hits[0];
    }
    return null;
  }
}

/** Stable content fingerprint: subject + chapter + question text + option texts. */
export function questionHash(q: {
  subject: string;
  chapter: string;
  text: string;
  options: { text: string }[];
  answerValue?: number;
}): string {
  const norm = (v: string) =>
    String(v ?? "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  const payload = [
    norm(q.subject),
    norm(q.chapter),
    norm(q.text),
    q.options.map((o) => norm(o.text)).join("|"),
    q.answerValue ?? "",
  ].join("~");
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < payload.length; i++) {
    const c = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
    h2 = (Math.imul(h2 + c, 2654435761) ^ (h2 >>> 7)) >>> 0;
  }
  return `${h1.toString(36)}${h2.toString(36)}${payload.length.toString(36)}`;
}

export function normalizeQuestion(
  raw: Record<string, unknown>,
  index: number,
  issues: ImportIssue[],
): Question {
  const type = normType(raw.type ?? raw.questionType ?? raw.qtype, raw);
  const options = normOptions(raw.options ?? raw.choices).map((o) => ({
    ...o,
    text: repairLatex(o.text),
  }));
  const text = repairLatex(
    String(raw.question ?? raw.text ?? raw.statement ?? raw.body ?? "").trim(),
  );
  const number = Number(raw.number ?? raw.no ?? raw.qno ?? raw.q_no ?? index + 1) || index + 1;

  if (!text) issues.push({ level: "warning", message: `Q${number}: empty question text` });

  const correctRaw =
    raw.correct ?? raw.answer ?? raw.correctAnswer ?? raw.correctOption ?? raw.correct_option;
  const correct =
    type === "integer" || type === "numerical" ? [] : normCorrect(correctRaw, options);
  const numericList =
    type === "integer" || type === "numerical"
      ? parseNumericList(correctRaw ?? raw.value ?? raw.answers)
      : [];
  const answerValue = numericList.length ? numericList[0] : undefined;

  const images = questionImageRefs(raw);
  const matrixRaw = (raw.matrix ?? raw.match) as
    { left?: unknown; right?: unknown; listI?: unknown; listII?: unknown } | undefined;

  const solution = repairLatex(String(raw.solution ?? "")) || undefined;
  const explanation = repairLatex(String(raw.explanation ?? raw.reason ?? "")) || undefined;
  const tableHtml = raw.table ? String(raw.table) : undefined;

  return {
    id: String(raw.id ?? raw.questionId ?? raw.question_id ?? `q${number}_${index}`),
    number,
    subject: normSubject(raw.subject),
    chapter: String(raw.chapter ?? raw.unit ?? "General").trim() || "General",
    topic: String(raw.topic ?? "").trim(),
    difficulty: normDifficulty(raw.difficulty ?? raw.level),
    type,
    text,
    paragraph: raw.paragraph ? repairLatex(String(raw.paragraph)) : undefined,
    options,
    correct,
    answerValue,
    answerValues: numericList.length > 1 ? numericList : undefined,
    tolerance: Number(raw.tolerance ?? 0.01),

    matrix: matrixRaw
      ? {
          left: toStringArray(matrixRaw.left ?? matrixRaw.listI),
          right: toStringArray(matrixRaw.right ?? matrixRaw.listII),
        }
      : undefined,
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
      chem: normSubject(raw.subject) === "Chemistry" && CHEM_HINT.test(text),
    },
  };
}

/* ------------------------------------------------------------------ */
/*                                 ZIP                                 */
/* ------------------------------------------------------------------ */

export interface ZipContents {
  jsons: { path: string; text: string }[];
  texts: { path: string; text: string }[];
  images: RawImageFile[];
}

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  bmp: "image/bmp",
  avif: "image/avif",
};

export async function readZip(file: File): Promise<ZipContents> {
  const zip = await JSZip.loadAsync(file);
  const jsons: { path: string; text: string }[] = [];
  const texts: { path: string; text: string }[] = [];
  const images: RawImageFile[] = [];
  const entries = Object.values(zip.files).filter(
    (f) => !f.dir && !f.name.split("/").pop()!.startsWith(".") && !f.name.startsWith("__MACOSX/"),
  );
  for (const entry of entries) {
    if (/\.json$/i.test(entry.name)) {
      jsons.push({ path: entry.name, text: await entry.async("string") });
    } else if (/\.(csv|txt)$/i.test(entry.name)) {
      texts.push({ path: entry.name, text: await entry.async("string") });
    } else if (IMAGE_EXT.test(entry.name)) {
      const ext = entry.name.split(".").pop()!.toLowerCase();
      const raw = await entry.async("blob");
      const blob = raw.type ? raw : new Blob([raw], { type: MIME[ext] ?? "image/png" });
      images.push({ path: entry.name, blob });
    }
  }
  return { jsons, texts, images };
}

function extractQuestionArray(data: unknown): {
  questions: Record<string, unknown>[];
  meta: Record<string, unknown>;
} {
  if (Array.isArray(data)) return { questions: data as Record<string, unknown>[], meta: {} };
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["questions", "data", "items", "qs", "test", "question_bank", "bank"]) {
      const v = obj[key];
      if (Array.isArray(v)) return { questions: v as Record<string, unknown>[], meta: obj };
      if (v && typeof v === "object" && Array.isArray((v as Record<string, unknown>).questions)) {
        return {
          questions: (v as Record<string, unknown>).questions as Record<string, unknown>[],
          meta: v as Record<string, unknown>,
        };
      }
    }
  }
  throw new Error("No question array found in JSON (expected an array or a `questions` field).");
}

/* ------------------------------------------------------------------ */
/*                            answer keys                              */
/* ------------------------------------------------------------------ */

export interface AnswerKeyEntry {
  key: string; // question id or number as string
  answer: unknown;
  marks?: number;
  negative?: number;
  solution?: string;
}

export function parseAnswerKeyJson(text: string): AnswerKeyEntry[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return [];
  }
  const rows: AnswerKeyEntry[] = [];
  const pushRow = (r: Record<string, unknown>) => {
    const key = String(
      r.id ?? r.questionId ?? r.question_id ?? r.number ?? r.qno ?? r.q_no ?? r.q ?? "",
    ).trim();
    const answer = r.answer ?? r.correct ?? r.correctAnswer ?? r.correct_answer ?? r.key;
    if (key && answer !== undefined)
      rows.push({
        key,
        answer,
        marks: r.marks === undefined ? undefined : Number(r.marks),
        negative: r.negative === undefined ? undefined : Number(r.negative),
        solution: r.solution ? String(r.solution) : undefined,
      });
  };
  const walk = (v: unknown) => {
    if (Array.isArray(v))
      v.forEach((x) => x && typeof x === "object" && pushRow(x as Record<string, unknown>));
    else if (v && typeof v === "object") {
      const obj = v as Record<string, unknown>;
      const nested = obj.answers ?? obj.answer_key ?? obj.answerKey ?? obj.keys ?? obj.data;
      if (nested) walk(nested);
      else
        for (const [k, val] of Object.entries(obj)) {
          if (val !== null && typeof val === "object") pushRow(val as Record<string, unknown>);
          else if (val !== undefined) rows.push({ key: String(k), answer: val });
        }
    }
  };
  walk(data);
  return rows;
}

export function parseAnswerKeyCsv(text: string): AnswerKeyEntry[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return [];
  const split = (l: string) => l.split(/[,;\t]/).map((c) => c.trim().replace(/^"|"$/g, ""));
  const header = split(lines[0]).map((h) => h.toLowerCase());
  const hasHeader =
    header.some((h) => /(id|q|no|number)/.test(h)) &&
    header.some((h) => /(ans|correct|key)/.test(h));
  const idIdx = hasHeader ? header.findIndex((h) => /(id|qno|q_no|number|^q$)/.test(h)) : 0;
  const ansIdx = hasHeader ? header.findIndex((h) => /(ans|correct|key)/.test(h)) : 1;
  const solIdx = hasHeader ? header.findIndex((h) => /(sol|expl)/.test(h)) : -1;
  const rows: AnswerKeyEntry[] = [];
  for (const line of lines.slice(hasHeader ? 1 : 0)) {
    const cells = split(line);
    const key = cells[idIdx < 0 ? 0 : idIdx];
    const answer = cells[ansIdx < 0 ? 1 : ansIdx];
    if (!key || answer === undefined || answer === "") continue;
    rows.push({ key, answer, solution: solIdx >= 0 ? cells[solIdx] : undefined });
  }
  return rows;
}

/** Applies answer-key rows onto questions, matching by id then by number. */
export function applyAnswerKey(questions: Question[], entries: AnswerKeyEntry[]) {
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
        q.answerValues = list.length > 1 ? list : undefined;
      }
    } else {
      const c = normCorrect(row.answer, q.options);
      if (c.length) q.correct = c;
    }
    if (row.marks !== undefined && !Number.isNaN(row.marks)) q.marks = row.marks;
    if (row.negative !== undefined && !Number.isNaN(row.negative)) q.negative = row.negative;
    if (row.solution) q.solution = q.solution ?? row.solution;
    applied += 1;
  }
  return { applied, unmatched };
}

/* ------------------------------------------------------------------ */
/*                             build test                              */
/* ------------------------------------------------------------------ */

export async function buildTestFromFiles(opts: {
  name: string;
  jsonText: string;
  images: RawImageFile[];
  source: "zip" | "json";
  durationMin?: number;
  answerKeys?: AnswerKeyEntry[];
  /** which library this set belongs to */
  exam?: ExamKind;
}): Promise<ImportResult> {
  const issues: ImportIssue[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(opts.jsonText);
  } catch (err) {
    throw new Error(`Invalid JSON: ${(err as Error).message}`);
  }
  const { questions: rawQs, meta } = extractQuestionArray(parsed);
  if (rawQs.length === 0) throw new Error("The JSON contains zero questions.");

  const testId = uid("test");
  const allNormalized = rawQs.map((q, i) => normalizeQuestion(q, i, issues));

  /* ---- global de-duplication: never store the same question twice ---- */
  const existingTests = await listTests();
  const known = new Set<string>();
  for (const t of existingTests) for (const q of t.questions) known.add(q.hash ?? questionHash(q));

  const questions: Question[] = [];
  let duplicates = 0;
  for (const q of allNormalized) {
    const hash = questionHash(q);
    if (known.has(hash)) {
      duplicates += 1;
      continue;
    }
    known.add(hash);
    q.hash = hash;
    // ids must stay globally unique across unlimited imports
    q.id = `${testId}::${q.id}`;
    questions.push(q);
  }
  if (duplicates) {
    issues.push({
      level: "warning",
      message: `${duplicates} duplicate question(s) already in your bank were skipped.`,
    });
  }
  if (questions.length === 0)
    throw new Error("Every question in this file already exists in your bank — nothing to import.");

  if (opts.answerKeys?.length) {
    const { applied, unmatched } = applyAnswerKey(questions, opts.answerKeys);
    issues.push({
      level: "warning",
      message: `Answer key: ${applied} answer(s) linked${unmatched ? `, ${unmatched} row(s) had no matching question` : ""}.`,
    });
  }

  const seenForValidation = { ids: new Set<string>(), signatures: new Set<string>() };
  let invalidCount = 0;
  for (const q of questions) {
    const { valid, reasons } = validateQuestion(q, seenForValidation);
    if (valid) continue;
    invalidCount += 1;
    if (invalidCount <= 50)
      issues.push({ level: "warning", message: `Q${q.number}: ${reasons.join("; ")}` });
  }
  if (invalidCount)
    issues.push({
      level: "warning",
      message: `${invalidCount} question(s) failed validation and will be skipped when generating tests.`,
    });

  /* ---------------- image indexing & linking ---------------- */
  const index = new ImageIndex();
  const stored: StoredImage[] = [];
  const seenIds = new Set<string>();

  for (const img of opts.images) {
    const path = normPath(img.path);
    let id = `${testId}::${path}`;
    let dup = 1;
    while (seenIds.has(id)) id = `${testId}::${path}#${dup++}`; // resolve duplicate entries
    seenIds.add(id);
    stored.push({
      id,
      testId,
      name: baseName(path),
      path,
      kind: /(^|\/)(solutions?|sol)\//.test(path) ? "solution" : "figure",
      blob: img.blob,
    });
    index.register(id, path);
  }

  const used = new Set<string>();
  let missing = 0;

  const linkRefs = (refs: string[], qNumber: number) => {
    const out: string[] = [];
    for (const ref of refs) {
      const id = index.resolve(ref);
      if (id) {
        if (!out.includes(id)) out.push(id);
        used.add(id);
        const rec = stored.find((s) => s.id === id);
        if (rec && rec.qNumber === undefined) rec.qNumber = qNumber;
      } else {
        missing += 1;
        issues.push({
          level: "warning",
          message: `Q${qNumber}: image "${ref}" not found in archive`,
        });
      }
    }
    return out;
  };

  for (const q of questions) {
    q.images = linkRefs(q.images, q.number);
    for (const o of q.options) {
      if (o.images?.length) o.images = linkRefs(o.images, q.number);
    }
  }

  // filename-based auto matching for unreferenced images (q1.png -> question 1)
  for (const rec of stored) {
    if (used.has(rec.id)) continue;
    const n = questionNumberFromFilename(rec.path ?? rec.name);
    if (n === null) continue;
    const q = questions.find((x) => x.number === n);
    if (!q) continue;
    rec.qNumber = n;
    if (rec.kind === "solution") {
      used.add(rec.id);
      continue; // solution figures stay in the library, not on the question stem
    }
    if (!q.images.includes(rec.id)) q.images.push(rec.id);
    used.add(rec.id);
  }

  for (const q of questions) {
    if (q.images.length > 0) q.flags.diagram = true;
  }

  const unmatched = stored.filter((s) => !used.has(s.id));
  if (unmatched.length) {
    issues.push({
      level: "warning",
      message: `${unmatched.length} image(s) could not be matched automatically — link them from the Figures page.`,
    });
  }

  await putImages(stored);

  const subjects = [...new Set(questions.map((q) => q.subject))];
  const chapters = [...new Set(questions.map((q) => q.chapter))];
  const errors = issues.filter((i) => i.level === "error").length;

  const testName = String(meta.name ?? meta.title ?? opts.name).trim() || opts.name;
  const exam = opts.exam ?? (/advanc/i.test(String(meta.exam ?? opts.name)) ? "advanced" : "main");
  const paper = detectPaper(`${testName} ${String(meta.paper ?? "")}`, meta.paper as 1 | 2);
  const year = detectYear(testName, Number(meta.year) || undefined);
  // year/paper tags make PYQ browsing work without any manual tagging
  if (year) for (const q of questions) if (!q.year) q.year = year;

  const test: TestSet = {
    id: testId,
    name: testName,
    description: meta.description ? String(meta.description) : undefined,
    subjects,
    chapters,
    questionCount: questions.length,
    imageCount: stored.length,
    missingImages: missing,
    importedAt: Date.now(),
    updatedAt: Date.now(),
    source: opts.source,
    exam,
    paper: exam === "advanced" ? paper : undefined,
    year,
    durationMin: Number(meta.duration ?? meta.durationMin ?? opts.durationMin ?? 180),
    status: errors > 0 ? "invalid" : issues.length > 0 ? "warning" : "valid",
    issues,
    questions,
  };

  await putTest(test);
  return { test, issues };
}

export function validateTest(test: TestSet): ImportIssue[] {
  const issues: ImportIssue[] = [];
  if (test.questions.length === 0)
    issues.push({ level: "error", message: "Test has no questions." });
  const seen = { ids: new Set<string>(), signatures: new Set<string>() };
  test.questions.forEach((q) => {
    const { valid, reasons } = validateQuestion(q, seen);
    if (!valid) issues.push({ level: "error", message: `Q${q.number}: ${reasons.join("; ")}.` });
  });
  return issues;
}

export function exportTestJson(test: TestSet) {
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
      options: q.options.map((o) => ({ id: o.id, text: o.text })),
      correct:
        q.type === "integer" || q.type === "numerical"
          ? q.answerValues?.length
            ? q.answerValues.join(",")
            : q.answerValue
          : q.correct,

      matrix: q.matrix,
      table: q.tableHtml,
      solution: q.solution,
      explanation: q.explanation,
      marks: q.marks,
      negative: q.negative,
      images: q.images.map((id) => id.split("::")[1] ?? id),
    })),
  };
  return JSON.stringify(payload, null, 2);
}
