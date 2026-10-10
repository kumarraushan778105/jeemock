import { useMemo, useState } from "react";
import { Images } from "lucide-react";
import { MathText } from "./MathText";
import { MathBlocks } from "./MathBlocks";

import { ImageViewer, LazyImage } from "./ImageViewer";
import { isMultiCorrect, matrixAnswerLabel, optionIds } from "@/lib/question-type";
import { numericAnswerLabel } from "@/lib/validate";
import { QUESTION_TYPE_LABEL, type Question } from "@/lib/types";
import { cn } from "@/lib/utils";

export type AnswerValue = string[] | string | null;

export function QuestionView({
  question,
  value,
  onChange,
  readOnly = false,
  showAnswer = false,
  fontScale = 1,
}: {
  question: Question;
  value: AnswerValue;
  onChange?: (v: AnswerValue) => void;
  readOnly?: boolean;
  showAnswer?: boolean;
  fontScale?: number;
}) {
  const [viewer, setViewer] = useState<number | null>(null);
  const selected = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];
  const ids = useMemo(() => optionIds(question), [question]);
  const multi = isMultiCorrect(question);

  const toggle = (id: string) => {
    if (readOnly || !onChange) return;
    if (multi) {
      const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
      onChange(next.length ? next : []);
    } else {
      onChange(selected.length === 1 && selected[0] === id ? [] : [id]);
    }
  };

  const sp = question.spacing ?? {};
  /** an uploaded question image with no typed statement renders as the stem */
  const stemImage = !question.text?.trim() && question.images.length > 0;
  /** image-only question whose options live inside the image — offer A–D choices */
  const imageOnlyChoices =
    stemImage && !question.matrix && question.type !== "integer" && question.type !== "numerical"
      ? question.options.length < 2
      : false;
  const fallbackOptions = ["A", "B", "C", "D"];
  const scale = Math.min(1.5, Math.max(0.8, fontScale));
  const size = (base: number) => `${Math.round(base * scale)}px`;

  return (
    <div className="flex flex-col" style={{ rowGap: sp.block ?? 20 }}>
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <Chip>{question.subject}</Chip>
        <Chip>{question.chapter}</Chip>
        {question.topic && <Chip>{question.topic}</Chip>}
        <Chip>{multi ? "Multiple Correct" : QUESTION_TYPE_LABEL[question.type]}</Chip>
        <Chip>{question.difficulty}</Chip>
        <Chip tone="good">+{question.marks}</Chip>
        {question.negative > 0 && <Chip tone="bad">−{question.negative}</Chip>}
      </div>

      {question.paragraph && (
        <div className="rounded-lg border-l-4 border-primary bg-surface p-4">
          <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase">
            Paragraph
          </div>
          <MathBlocks className="text-sm" gap={sp.block ?? 20}>
            {question.paragraph}
          </MathBlocks>
        </div>
      )}

      {question.text?.trim() && (
        <MathBlocks className="font-medium" gap={sp.block ?? 20} style={{ fontSize: size(15) }}>
          {question.text}
        </MathBlocks>
      )}

      {question.tableHtml && (
        <div
          className="math-content overflow-x-auto rounded-lg border [&_table]:w-full [&_td]:border [&_td]:px-3 [&_td]:py-1.5 [&_th]:border [&_th]:bg-surface [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left"
          dangerouslySetInnerHTML={{ __html: question.tableHtml }}
        />
      )}

      {question.images.length > 0 &&
        (stemImage ? (
          /* image-only question — the uploaded image *is* the question */
          <div className="w-full space-y-3">
            {question.images.map((id, i) => (
              <div key={id} className="w-full">
                <LazyImage
                  id={id}
                  alt={`Q${question.number} question image ${i + 1}`}
                  className="h-auto max-h-[min(65vh,600px)] w-full object-contain object-left"
                  onClick={() => setViewer(i)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase">
              <Images className="size-3.5" /> Figures ({question.images.length})
            </div>
            <div className="space-y-3">
              {question.images.map((id, i) => (
                <div key={id} className="w-full">
                  <LazyImage
                    id={id}
                    alt={`Q${question.number} figure ${i + 1}`}
                    className="h-auto max-h-[min(65vh,600px)] w-full object-contain object-left"
                    onClick={() => setViewer(i)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      {question.matrix ? (
        <MatrixMatch
          question={question}
          selected={selected}
          readOnly={readOnly}
          onChange={(v) => onChange?.(v)}
        />
      ) : question.type === "integer" || question.type === "numerical" ? (
        <div className="max-w-xs">
          <label className="mb-1 block text-xs font-semibold text-muted-foreground uppercase">
            Your answer
          </label>
          <input
            type="text"
            inputMode="decimal"
            disabled={readOnly}
            value={Array.isArray(value) ? (value[0] ?? "") : (value ?? "")}
            onChange={(e) => onChange?.(e.target.value.replace(/[^0-9.\-]/g, ""))}
            placeholder={question.type === "integer" ? "Integer value" : "Numerical value"}
            className="w-full rounded-lg border bg-card px-3 py-2 font-mono outline-none focus:ring-2 focus:ring-ring"
            style={{ fontSize: size(18) }}
          />
        </div>
      ) : (
        <div className="grid" style={{ rowGap: sp.options ?? 8 }}>
          {multi && !readOnly && (
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Select all correct options — tap again to deselect
            </p>
          )}
          {(imageOnlyChoices
            ? fallbackOptions.map((id) => ({ id, text: "", images: [] as string[] }))
            : question.options
          ).map((o, i) => {
            const oid = imageOnlyChoices ? fallbackOptions[i] : ids[i];

            const isSel = selected.includes(oid);
            const isRight = question.correct.map(String).includes(oid);
            const missed = showAnswer && isRight && !isSel;
            return (
              <button
                key={oid}
                type="button"
                disabled={readOnly}
                aria-pressed={isSel}
                onClick={() => toggle(oid)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                  !readOnly && "hover:border-primary/60 hover:bg-accent/40",
                  isSel && "border-primary bg-primary/10",
                  showAnswer && isRight && "border-success bg-success/10",
                  showAnswer && isSel && !isRight && "border-destructive bg-destructive/10",
                  missed && "border-dashed",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center border text-xs font-bold",
                    multi ? "rounded" : "rounded-full",
                    isSel && "border-primary bg-primary text-primary-foreground",
                    showAnswer && isRight && "border-success bg-success text-background",
                  )}
                >
                  {oid}
                </span>
                <span className="min-w-0 flex-1">
                  {o.text?.trim() && (
                    <MathText className="min-w-0" style={{ fontSize: size(14) }}>
                      {o.text}
                    </MathText>
                  )}
                  {(o.images?.length ?? 0) > 0 && (
                    <span className="mt-1 flex flex-wrap gap-2">
                      {o.images!.map((imgId, k) => (
                        <LazyImage
                          key={imgId}
                          id={imgId}
                          alt={`Option ${oid} image ${k + 1}`}
                          className="max-h-32 rounded border bg-card p-1"
                        />
                      ))}
                    </span>
                  )}

                  {showAnswer && (
                    <span className="mt-1 flex flex-wrap gap-1 text-[10px] font-bold uppercase">
                      {isSel && isRight && (
                        <span className="rounded bg-success/15 px-1.5 py-0.5 text-success">
                          Selected · correct
                        </span>
                      )}
                      {isSel && !isRight && (
                        <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-destructive">
                          Selected · wrong
                        </span>
                      )}
                      {missed && (
                        <span className="rounded bg-warning/15 px-1.5 py-0.5 text-warning">
                          Missed correct option
                        </span>
                      )}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {showAnswer && (
        <div
          className="flex flex-col rounded-lg border bg-surface p-4"
          style={{ rowGap: sp.solution ?? 12 }}
        >
          <div className="text-xs font-semibold text-muted-foreground uppercase">
            Correct answer
          </div>
          <MathText className="font-semibold" style={{ fontSize: size(14) }}>
            {question.type === "integer" || question.type === "numerical"
              ? numericAnswerLabel(question)
              : question.matrix
                ? matrixAnswerLabel(question)
                : question.correct.join(", ") || "—"}
          </MathText>
          {question.solution && (
            <div>
              <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase">
                Solution
              </div>
              <MathBlocks className="" gap={sp.solution ?? 12} style={{ fontSize: size(14) }}>
                {question.solution}
              </MathBlocks>
            </div>
          )}
          {question.explanation && (
            <div>
              <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase">
                Explanation
              </div>
              <MathBlocks className="" gap={sp.solution ?? 12} style={{ fontSize: size(14) }}>
                {question.explanation}
              </MathBlocks>
            </div>
          )}
        </div>
      )}

      {viewer !== null && (
        <ImageViewer ids={question.images} startIndex={viewer} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}

function MatrixMatch({
  question,
  selected,
  readOnly,
  onChange,
}: {
  question: Question;
  selected: string[];
  readOnly: boolean;
  onChange: (v: string[]) => void;
}) {
  const left = question.matrix?.left ?? [];
  const right = question.matrix?.right ?? [];
  const letters = right.map((_, i) => String.fromCharCode(65 + i));

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table
        className={cn(
          "w-full text-sm",
          question.matrix?.borders !== false && "[&_td]:border [&_th]:border",
        )}
      >
        <thead className="bg-surface text-xs uppercase">
          <tr>
            <th
              style={{ width: question.matrix?.leftWidth ?? undefined }}
              className="px-3 py-2 text-left"
            >
              List I
            </th>
            {letters.map((l, i) => (
              <th key={l} className="px-3 py-2">
                <MathText as="span">{`${l}. ${right[i]}`}</MathText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {left.map((item, r) => (
            <tr key={r} className="border-t">
              <td className="px-3 py-2">
                <MathText as="span">{`${r + 1}. ${item}`}</MathText>
              </td>
              {letters.map((l) => (
                <td key={l} className="px-3 py-2 text-center">
                  <input
                    type="radio"
                    disabled={readOnly}
                    checked={selected[r] === l}
                    onChange={() => {
                      const next = [...selected];
                      next[r] = l;
                      onChange(next);
                    }}
                    className="size-4 accent-[var(--primary)]"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Chip({ children, tone }: { children: React.ReactNode; tone?: "good" | "bad" }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 font-medium",
        tone === "good" && "border-success/40 bg-success/10 text-success",
        tone === "bad" && "border-destructive/40 bg-destructive/10 text-destructive",
        !tone && "bg-surface text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
