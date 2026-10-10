import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Check, ChevronDown, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { MathText } from "@/components/MathText";
import { CopyQuestion } from "@/components/CopyQuestion";
import { QuestionImageEditor } from "@/components/bank/QuestionImageEditor";
import { MatrixEditor } from "@/components/bank/MatrixEditor";
import { getTest, putTest } from "@/lib/db";
import { BULK_COPY_MODE_LABEL, bulkQuestionToText, type BulkCopyMode } from "@/lib/copy-question";
import { isMultiCorrect, optionIds } from "@/lib/question-type";
import {
  isNumericType,
  numericAnswers,
  parseNumericList,
  validateQuestion,
  validatePool,
} from "@/lib/validate";
import {
  QUESTION_TYPE_LABEL,
  SUBJECTS,
  type Difficulty,
  type Question,
  type QuestionType,
  type TestSet,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const PAGE = 25;
const DIFFS: Difficulty[] = ["Easy", "Medium", "Hard"];
const TYPES = Object.keys(QUESTION_TYPE_LABEL) as QuestionType[];
const LETTERS = "ABCDEFGHIJKL".split("");

type SortKey = "newest" | "oldest" | "subject" | "chapter" | "difficulty";
const DIFF_RANK: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

/**
 * Question Bank editor: search / filter / sort every question in a set, edit any
 * field (statement, options, keys, metadata), add new questions and delete old
 * ones. Saves straight to the bank so every future test uses the change.
 */
export function AnswerEditor({
  testId,
  focusQuestionId,
  onClose,
  onSave,
  questions: overrideQuestions,
  title,
  onSelect,
  selectedQuestionIds,
  onCreateNew,
  saveLabel = "Save",
}: {
  testId?: string;
  focusQuestionId?: string;
  onClose: () => void;
  onSave?: (question: Question) => Promise<void> | void;
  questions?: Question[];
  title?: string;
  onSelect?: (question: Question) => Promise<void> | void;
  selectedQuestionIds?: string[];
  onCreateNew?: () => void;
  saveLabel?: string;
}) {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [type, setType] = useState<"all" | QuestionType>("all");
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");
  const [validity, setValidity] = useState<"all" | "valid" | "invalid">("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [limit, setLimit] = useState(PAGE);
  const data = useQuery({
    queryKey: ["bank-answers", testId],
    queryFn: () => (testId ? getTest(testId) : Promise.resolve(null)),
    enabled: !!testId && !overrideQuestions,
  });
  const test = data.data ?? null;

  const questions = overrideQuestions ?? test?.questions ?? [];

  const report = useMemo(() => validatePool(questions, (q) => q), [questions]);

  const rows = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = questions.filter((q) => {
      if (subject !== "all" && q.subject !== subject) return false;
      if (type !== "all" && q.type !== type) return false;
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      const invalid = report.reasonsById.has(String(q.id));
      if (validity === "valid" && invalid) return false;
      if (validity === "invalid" && !invalid) return false;
      if (!s) return true;
      return `${q.id} ${q.number} ${q.text} ${q.subject} ${q.chapter} ${q.topic}`
        .toLowerCase()
        .includes(s);
    });
    list = [...list].sort((a, b) => {
      if (sort === "subject") return a.subject.localeCompare(b.subject) || a.number - b.number;
      if (sort === "chapter") return a.chapter.localeCompare(b.chapter) || a.number - b.number;
      if (sort === "difficulty")
        return (
          (DIFF_RANK[a.difficulty] ?? 1) - (DIFF_RANK[b.difficulty] ?? 1) || a.number - b.number
        );
      if (sort === "oldest") return a.number - b.number;
      return b.number - a.number;
    });
    if (!focusQuestionId) return list;
    return [...list].sort(
      (a, b) => Number(b.id === focusQuestionId) - Number(a.id === focusQuestionId),
    );
  }, [questions, search, subject, type, difficulty, validity, sort, report, focusQuestionId]);

  const commit = async (next: TestSet, message: string) => {
    await putTest({
      ...next,
      subjects: [...new Set(next.questions.map((q) => q.subject).filter(Boolean))],
      chapters: [...new Set(next.questions.map((q) => q.chapter).filter(Boolean))],
      questionCount: next.questions.length,
      updatedAt: Date.now(),
    });
    qc.invalidateQueries({ queryKey: ["bank-answers", testId] });
    qc.invalidateQueries({ queryKey: ["tests"] });
    qc.invalidateQueries({ queryKey: ["adv"] });
    toast.success(message);
  };

  const save = async (patch: Question) => {
    if (onSave) {
      await onSave(patch);
      return;
    }
    if (!test) return;
    await commit(
      { ...test, questions: test.questions.map((q) => (q.id === patch.id ? patch : q)) },
      `Q${patch.number} saved`,
    );
  };

  const remove = async (q: Question) => {
    if (!test) return;
    if (
      !window.confirm(`Delete Q${q.number} from "${test.name}"? Existing attempts keep their copy.`)
    )
      return;
    await commit(
      { ...test, questions: test.questions.filter((x) => x.id !== q.id) },
      `Q${q.number} deleted`,
    );
  };

  const add = async () => {
    if (!test) return;
    const number = test.questions.reduce((a, q) => Math.max(a, q.number), 0) + 1;
    const fresh: Question = {
      id: `q_new_${number}_${Math.random().toString(36).slice(2, 8)}`,
      number,
      subject: test.subjects[0] ?? "Physics",
      chapter: test.chapters[0] ?? "General",
      topic: "",
      difficulty: "Medium",
      type: "single",
      text: "",
      options: LETTERS.slice(0, 4).map((id) => ({ id, text: "" })),
      correct: [],
      tolerance: 0.01,
      images: [],
      marks: 4,
      negative: 1,
      flags: { diagram: false, graph: false, table: false, chem: false },
    };
    await commit(
      { ...test, questions: [...test.questions, fresh] },
      `Q${number} added — fill it in`,
    );
    setSort("newest");
    setValidity("all");
    setSearch("");
  };

  const subjects = [...new Set([...questions.map((q) => q.subject), ...SUBJECTS])].filter(Boolean);
  const [copyAllOpen, setCopyAllOpen] = useState(false);
  const copyAllBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!copyAllOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!copyAllBox.current?.contains(event.target as Node)) setCopyAllOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [copyAllOpen]);

  const copyAll = async (mode: BulkCopyMode) => {
    setCopyAllOpen(false);
    if (!questions.length) {
      toast.error("No questions to copy.");
      return;
    }

    const text = bulkQuestionToText(questions, mode);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        toast.success("Copied!");
      } catch {
        toast.error("Copy failed.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col rounded-t-2xl border bg-card sm:rounded-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b p-4">
          <div className="min-w-0">
            <h2 className="truncate font-semibold">{title ?? `Questions — ${test?.name ?? "…"}`}</h2>
            <p className="text-xs text-muted-foreground">
              {report.total} questions ·{" "}
              <span className="font-semibold text-success">{report.valid.length} valid</span> ·{" "}
              <span className={cn("font-semibold", report.invalid.length && "text-destructive")}>
                {report.invalid.length} invalid
              </span>{" "}
              {!onSelect && "— invalid questions are skipped when generating tests."}
            </p>
          </div>
          <div className="flex gap-2">
            <div ref={copyAllBox} className="relative">
              <button
                type="button"
                onClick={() => setCopyAllOpen((open) => !open)}
                className="inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold"
              >
                Copy All
                <ChevronDown className={cn("size-3 transition-transform", copyAllOpen && "rotate-180")} />
              </button>
              {copyAllOpen && (
                <div className="absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-lg border bg-card shadow-lg">
                  {(
                    Object.entries(BULK_COPY_MODE_LABEL) as [BulkCopyMode, string][]
                  ).map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => void copyAll(mode)}
                      className="block w-full px-3 py-2 text-left text-xs hover:bg-accent"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {!onSelect && (
              <button
                onClick={add}
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                <Plus className="size-3.5" /> Add
              </button>
            )}
            {onCreateNew && (
              <button
                type="button"
                onClick={onCreateNew}
                className="inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold"
              >
                <Plus className="size-3.5" /> Create New Question
              </button>
            )}
            <button onClick={onClose} className="rounded-md border px-3 py-1.5 text-xs">
              Close
            </button>
          </div>
        </div>

        <div className="space-y-2 border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Search question text, id, number, subject, chapter or topic…"
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Select value={subject} onChange={setSubject}>
              <option value="all">All subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <Select value={type} onChange={(v) => setType(v as "all" | QuestionType)}>
              <option value="all">All types</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {QUESTION_TYPE_LABEL[t]}
                </option>
              ))}
            </Select>
            <Select value={difficulty} onChange={(v) => setDifficulty(v as "all" | Difficulty)}>
              <option value="all">All difficulty</option>
              {DIFFS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            <Select
              value={validity}
              onChange={(v) => setValidity(v as "all" | "valid" | "invalid")}
            >
              <option value="all">Valid + invalid</option>
              <option value="valid">Valid only</option>
              <option value="invalid">Invalid only</option>
            </Select>
            <Select value={sort} onChange={(v) => setSort(v as SortKey)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="subject">Subject</option>
              <option value="chapter">Chapter</option>
              <option value="difficulty">Difficulty</option>
            </Select>
          </div>
        </div>

        <div className="scroll-slim flex-1 space-y-3 overflow-y-auto p-4">
          {rows.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No questions match.</p>
          )}
          {rows.slice(0, limit).map((q) => (
            <AnswerRow
              key={q.id}
              testId={testId ?? "bank-selector"}
              question={q}
              highlight={q.id === focusQuestionId}
              poolReasons={report.reasonsById.get(String(q.id))}
              onSave={save}
              onDelete={remove}
              onSelect={onSelect}
              selected={Boolean(
                selectedQuestionIds?.includes(q.id) ||
                  selectedQuestionIds?.includes((q as Question & { sourceId?: string }).sourceId ?? ""),
              )}
              saveLabel={saveLabel}
            />
          ))}
          {rows.length > limit && (
            <button
              onClick={() => setLimit((l) => l + PAGE)}
              className="w-full rounded-lg border py-2 text-sm font-semibold"
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border bg-background px-2 py-1.5 text-xs"
    >
      {children}
    </select>
  );
}

function AnswerRow({
  testId,
  question,
  highlight,
  poolReasons,
  onSave,
  onDelete,
  onSelect,
  selected,
  saveLabel,
}: {
  testId: string;
  question: Question;
  highlight?: boolean;
  poolReasons?: string[];
  onSave: (q: Question) => Promise<void>;
  onDelete: (q: Question) => Promise<void>;
  onSelect?: (q: Question) => Promise<void> | void;
  selected?: boolean;
  saveLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Question>(question);
  const ids = useMemo(() => optionIds(draft), [draft]);
  // matrix-match questions still use option keys; only integer/numerical use numeric input
  const objective = !isNumericType(draft.type) && !Boolean(draft.matrix) && draft.type !== "matrix";
  const [multi, setMulti] = useState(isMultiCorrect(question));
  const [correct, setCorrect] = useState<string[]>(question.correct.map(String));
  const [numeric, setNumeric] = useState(numericAnswers(question).join(",") || "");
  const [pairs, setPairs] = useState<Record<string, string>>(() => {
    if (question.matrixPairs) return { ...question.matrixPairs };
    const out: Record<string, string> = {};
    (question.matrix?.left ?? []).forEach((_, i) => {
      const v = question.correct[i];
      if (v) out[String(i + 1)] = String(v);
    });
    return out;
  });
  const isMatrix = Boolean(draft.matrix) || draft.type === "matrix";
  const validation = useMemo(() => {
    const own = validateQuestion(question);
    const reasons = [...new Set([...own.reasons, ...(poolReasons ?? [])])];
    return { valid: reasons.length === 0, reasons };
  }, [question, poolReasons]);

  const patch = (p: Partial<Question>) => setDraft((d) => ({ ...d, ...p }));

  const toggle = (id: string) => {
    setCorrect((cur) =>
      multi
        ? cur.includes(id)
          ? cur.filter((x) => x !== id)
          : [...cur, id]
        : cur.length === 1 && cur[0] === id
          ? []
          : [id],
    );
  };

  const switchMode = (nextMulti: boolean) => {
    setMulti(nextMulti);
    if (!nextMulti) setCorrect((cur) => (cur.length > 1 ? [cur[0]] : cur));
  };

  const setOptionText = (i: number, text: string) =>
    patch({ options: draft.options.map((o, idx) => (idx === i ? { ...o, text } : o)) });

  /** image-first options: an option may be an image with no text at all */
  const setOptionImages = (i: number, images: string[]) =>
    patch({
      options: draft.options.map((o, idx) =>
        idx === i ? { ...o, images: images.length ? images : undefined } : o,
      ),
    });

  const addOption = () =>
    patch({
      options: [
        ...draft.options,
        { id: LETTERS[draft.options.length] ?? String(draft.options.length + 1), text: "" },
      ],
    });

  const removeOption = (i: number) => {
    const removedId = ids[i];
    setCorrect((cur) => cur.filter((x) => x !== removedId));
    patch({ options: draft.options.filter((_, idx) => idx !== i) });
  };

  const commit = async () => {
    const numericList = parseNumericList(numeric);
    if (isMatrix) {
      const rows = draft.matrix?.left ?? [];
      const ordered = rows.map((_, i) => pairs[String(i + 1)] ?? "");
      if (ordered.every((v) => !v)) {
        toast.error("Match at least one row to a Column II option");
        return;
      }
      await onSave({
        ...draft,
        type: "matrix",
        matrixPairs: Object.fromEntries(Object.entries(pairs).filter(([, v]) => v)),
        correct: ordered,
      });
      return;
    }
    if (objective && correct.length === 0) {
      toast.error("Pick at least one correct option");
      return;
    }
    if (isNumericType(draft.type) && numericList.length === 0) {
      toast.error("Enter at least one numerical answer");
      return;
    }
    const type: QuestionType = objective
      ? multi
        ? "multiple"
        : draft.type === "single" || draft.type === "multiple"
          ? "single"
          : draft.type
      : draft.type;
    const ordered = ids.filter((id) => correct.includes(id));
    await onSave({
      ...draft,
      type,
      text: draft.text,
      correct: objective ? ordered : draft.correct,
      answerValue: objective ? draft.answerValue : numericList[0],
      answerValues: objective
        ? draft.answerValues
        : numericList.length > 1
          ? numericList
          : undefined,
    });
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-surface p-3",
        highlight && "border-primary ring-2 ring-primary/30",
        !validation.valid && "border-destructive/50",
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground">
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">Q{draft.number}</span>
        <span>{draft.subject}</span>
        <span>{draft.chapter}</span>
        <span>{QUESTION_TYPE_LABEL[draft.type]}</span>
        <span
          className={cn(
            "rounded px-1.5 py-0.5",
            validation.valid ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
          )}
        >
          {validation.valid ? "Valid" : "Invalid"}
        </span>
        <CopyQuestion question={question} className="ml-auto" />
        {onSelect && (
          <button
            type="button"
            onClick={() => void onSelect(question)}
            disabled={selected}
            className={cn(
              "rounded border px-2 py-0.5 text-[10px] font-semibold",
              selected
                ? "cursor-not-allowed border-primary/40 bg-primary/10 text-primary"
                : "border-primary bg-primary text-primary-foreground",
            )}
          >
            {selected ? "Selected" : "Add"}
          </button>
        )}
        {objective && (
          <span className="flex gap-1">
            <button
              onClick={() => switchMode(false)}
              className={cn(
                "rounded border px-2 py-0.5 text-[10px]",
                !multi && "border-primary bg-primary text-primary-foreground",
              )}
            >
              Single
            </button>
            <button
              onClick={() => switchMode(true)}
              className={cn(
                "rounded border px-2 py-0.5 text-[10px]",
                multi && "border-primary bg-primary text-primary-foreground",
              )}
            >
              Multiple
            </button>
          </span>
        )}
      </div>

      {!validation.valid && (
        <p className="mt-2 flex items-start gap-1.5 text-[11px] text-destructive">
          <AlertTriangle className="mt-px size-3.5 shrink-0" />
          {validation.reasons.join(" · ")}
        </p>
      )}

      {open ? (
        <textarea
          value={draft.text}
          onChange={(e) => patch({ text: e.target.value })}
          rows={3}
          placeholder="Question statement (LaTeX supported)"
          className="mt-2 w-full rounded-lg border bg-card p-2 text-sm"
        />
      ) : (
        <div className="mt-2 line-clamp-2 text-sm">
          <MathText>{draft.text || "— empty question —"}</MathText>
        </div>
      )}

      {objective ? (
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {draft.options.map((o, i) => {
            const id = ids[i];
            const on = correct.includes(id);
            return (
              <div key={id} className="space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <button
                    onClick={() => toggle(id)}
                    className={cn(
                      "flex min-w-0 flex-1 items-start gap-2 rounded-lg border bg-card p-2 text-left text-xs",
                      on && "border-success bg-success/10",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-5 shrink-0 place-items-center border text-[10px] font-bold",
                        multi ? "rounded" : "rounded-full",
                        on && "border-success bg-success text-background",
                      )}
                    >
                      {on ? <Check className="size-3" /> : id}
                    </span>
                    {open ? (
                      <input
                        value={o.text}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setOptionText(i, e.target.value)}
                        placeholder={`Option ${id} — text, or leave empty and upload an image`}
                        className="min-w-0 flex-1 rounded border bg-surface px-2 py-1"
                      />
                    ) : (
                      <MathText className="min-w-0">{o.text}</MathText>
                    )}
                  </button>
                  {open && draft.options.length > 2 && (
                    <button
                      onClick={() => removeOption(i)}
                      title="Remove option"
                      className="rounded border p-1.5 text-destructive"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  )}
                </div>
                {open ? (
                  <div className="rounded-lg border bg-card p-2">
                    <QuestionImageEditor
                      testId={testId}
                      label={`Option ${id} image`}
                      hint="Drop or paste (Ctrl+V) an image of this option — used as-is."
                      images={o.images ?? []}
                      onChange={(imgs) => setOptionImages(i, imgs)}
                    />
                  </div>
                ) : (
                  (o.images?.length ?? 0) > 0 && (
                    <p className="pl-2 text-[11px] text-muted-foreground">
                      {o.images!.length} option image(s)
                    </p>
                  )
                )}
              </div>
            );
          })}
          {open && (
            <button
              onClick={addOption}
              className="rounded-lg border border-dashed py-2 text-xs font-semibold text-muted-foreground"
            >
              + Add option
            </button>
          )}
        </div>
      ) : isMatrix ? (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Match the Following question — open “Edit all fields” to build the table and set the
          matching pairs. Current pairs:{" "}
          {Object.entries(pairs)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k} → ${v}`)
            .join(", ") || "—"}
        </p>
      ) : (
        <div className="mt-2 max-w-[280px]">
          <input
            value={numeric}
            onChange={(e) => setNumeric(e.target.value.replace(/[^0-9.,\s-]/g, ""))}
            className="w-full rounded-lg border bg-card px-3 py-1.5 font-mono text-sm"
            placeholder="e.g. 2 or 2,3 or 2.5,3.5"
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            Separate multiple accepted answers with commas — any one of them counts as correct.
          </p>
        </div>
      )}

      {open && (
        <div className="mt-3 space-y-2">
          <div className="grid gap-2 sm:grid-cols-3">
            <Text label="Subject" value={draft.subject} onChange={(v) => patch({ subject: v })} />
            <Text label="Chapter" value={draft.chapter} onChange={(v) => patch({ chapter: v })} />
            <Text label="Topic" value={draft.topic} onChange={(v) => patch({ topic: v })} />
          </div>
          <div className="grid gap-2 sm:grid-cols-4">
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase text-muted-foreground">
                Type
              </span>
              <select
                value={draft.type}
                onChange={(e) => patch({ type: e.target.value as QuestionType })}
                className="w-full rounded-lg border bg-card px-2 py-1.5 text-xs"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {QUESTION_TYPE_LABEL[t]}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase text-muted-foreground">
                Difficulty
              </span>
              <select
                value={draft.difficulty}
                onChange={(e) => patch({ difficulty: e.target.value as Difficulty })}
                className="w-full rounded-lg border bg-card px-2 py-1.5 text-xs"
              >
                {DIFFS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
            <Text
              label="Marks"
              value={String(draft.marks)}
              onChange={(v) => patch({ marks: Number(v) || 0 })}
            />
            <Text
              label="Negative"
              value={String(draft.negative)}
              onChange={(v) => patch({ negative: Number(v) || 0 })}
            />
          </div>
          <QuestionImages
            testId={testId}
            images={draft.images}
            hasText={Boolean(draft.text?.trim())}
            onChange={(images) =>
              patch({ images, flags: { ...draft.flags, diagram: images.length > 0 } })
            }
          />

          <SpacingControls spacing={draft.spacing} onChange={(spacing) => patch({ spacing })} />

          {isMatrix && (
            <MatrixEditor
              matrix={draft.matrix ?? { left: ["", "", ""], right: ["", "", ""] }}
              pairs={pairs}
              onMatrix={(matrix) => patch({ matrix })}
              onPairs={setPairs}
            />
          )}
          {!isMatrix && (
            <button
              type="button"
              onClick={() =>
                patch({
                  type: "matrix",
                  matrix: { left: ["", "", ""], right: ["", "", ""], borders: true },
                })
              }
              className="rounded-lg border border-dashed px-3 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              + Add Match the Following table
            </button>
          )}

          <Area
            label="Explanation"
            value={draft.explanation ?? ""}
            onChange={(v) => patch({ explanation: v || undefined })}
          />
          <Area
            label="Solution"
            value={draft.solution ?? ""}
            onChange={(v) => patch({ solution: v || undefined })}
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={commit}
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
        >
          {saveLabel}
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold"
        >
          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
          {open ? "Hide fields" : "Edit all fields"}
        </button>
        <button
          onClick={() => onDelete(question)}
          className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive"
        >
          <Trash2 className="size-3.5" /> Delete
        </button>
        <span className="text-[11px] text-muted-foreground">
          Key:{" "}
          {objective
            ? correct.join(", ") || "—"
            : isMatrix
              ? Object.entries(pairs)
                  .filter(([, v]) => v)
                  .map(([k, v]) => `${k} → ${v}`)
                  .join(", ") || "—"
              : numeric || "—"}
        </span>
      </div>
    </div>
  );
}

const GAPS: { label: string; value: number }[] = [
  { label: "Small", value: 10 },
  { label: "Medium", value: 20 },
  { label: "Large", value: 32 },
];

/** Presentation-only gap editor — never touches question, answer or solution text. */
function SpacingControls({
  spacing,
  onChange,
}: {
  spacing?: Question["spacing"];
  onChange: (s: Question["spacing"]) => void;
}) {
  const sp = spacing ?? {};
  const rows: { key: keyof NonNullable<Question["spacing"]>; label: string; fallback: number }[] = [
    { key: "block", label: "Question / paragraph / equation blocks", fallback: 20 },
    { key: "options", label: "Options", fallback: 8 },
    { key: "solution", label: "Solution steps", fallback: 12 },
  ];
  return (
    <div className="space-y-2 rounded-lg border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase text-muted-foreground">
          Gap / spacing (shown the same way in CBT)
        </span>
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="rounded border px-2 py-0.5 text-[11px] font-semibold"
        >
          Reset formatting
        </button>
      </div>
      {rows.map((r) => (
        <div key={r.key} className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="min-w-[210px]">{r.label}</span>
          {GAPS.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() => onChange({ ...sp, [r.key]: g.value })}
              className={cn(
                "rounded border px-2 py-0.5 font-semibold",
                (sp[r.key] ?? r.fallback) === g.value &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              {g.label}
            </button>
          ))}
          <input
            type="number"
            min={0}
            max={120}
            value={sp[r.key] ?? r.fallback}
            onChange={(e) => onChange({ ...sp, [r.key]: Number(e.target.value) || 0 })}
            className="w-16 rounded border bg-surface px-1.5 py-0.5"
            title="Custom gap in px"
          />
          px
        </div>
      ))}
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border bg-card px-2 py-1.5 text-xs"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase text-muted-foreground">
        {label}
      </span>
      <textarea
        value={value}
        rows={2}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border bg-card p-2 text-xs"
      />
    </label>
  );
}

/**
 * Two image upload modes for the existing builder — no schema change:
 * the same `images` array is used, the mode only changes the guidance and how
 * the CBT renderer treats it (an image-only question with no statement text is
 * shown as the question itself).
 */
function QuestionImages({
  testId,
  images,
  hasText,
  onChange,
}: {
  testId: string;
  images: string[];
  hasText: boolean;
  onChange: (ids: string[]) => void;
}) {
  const [mode, setMode] = useState<"complete" | "support">(
    images.length > 0 && !hasText ? "complete" : "support",
  );

  return (
    <div className="space-y-2 rounded-lg border p-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {(["complete", "support"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-[11px] font-semibold",
              mode === m ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground",
            )}
          >
            {m === "complete" ? "Complete question image" : "Supporting image"}
          </button>
        ))}
      </div>

      <QuestionImageEditor
        testId={testId}
        images={images}
        onChange={onChange}
        label={mode === "complete" ? "Complete question image" : "Supporting images"}
        hint={
          mode === "complete"
            ? "Upload the scanned / screenshot question. Leave the statement text empty — the image is shown as the question in CBT, byte-for-byte, no OCR or processing. Add options, answer, marks and metadata below as usual."
            : "Attach graphs, diagrams, circuits, tables, chemical structures or other figures to a typed question. Drag & drop, or click and press Ctrl+V. PNG · JPG · JPEG · WEBP, stored exactly as uploaded."
        }
      />

      {mode === "complete" && hasText && images.length > 0 && (
        <p className="text-[11px] text-warning">
          This question has statement text, so the image renders as a figure below the text. Clear
          the statement to show the image as the whole question.
        </p>
      )}
    </div>
  );
}
