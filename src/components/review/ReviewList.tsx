import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { QuestionView } from "@/components/QuestionView";
import { CopyQuestion } from "@/components/CopyQuestion";
import { MathText } from "@/components/MathText";
import type { QuestionOrigin } from "@/lib/origin";
import type { AnswerState, Question } from "@/lib/types";
import { formatClock } from "@/lib/scoring";
import { numericAnswerLabel } from "@/lib/validate";
import { cn } from "@/lib/utils";

export type ReviewStatus = "correct" | "wrong" | "skipped";

export interface ReviewItem {
  question: Question;
  answer?: AnswerState;
  status: ReviewStatus;
  score?: number;
}

export type StatusFilter = "all" | ReviewStatus | "bookmarked";

const STATUS_LABEL: Record<StatusFilter, string> = {
  all: "All",
  correct: "Correct",
  wrong: "Wrong",
  skipped: "Not Attempted",
  bookmarked: "Bookmarked",
};

const SUBJECT_ORDER = ["Physics", "Chemistry", "Mathematics"];

export function answerText(q: Question, value: AnswerState["value"]) {
  if (value === null || value === undefined) return "Not attempted";
  const v = Array.isArray(value) ? value.join(", ") : String(value);
  return v.trim() === "" ? "Not attempted" : v;
}

export function correctText(q: Question) {
  if (q.type === "integer" || q.type === "numerical") return numericAnswerLabel(q);
  return q.correct.join(", ") || "—";
}

const dotClass = (s: ReviewStatus) =>
  s === "correct"
    ? "bg-answered text-answered-foreground"
    : s === "wrong"
      ? "bg-notanswered text-notanswered-foreground"
      : "bg-notvisited text-notvisited-foreground";

/**
 * Single-page review list with a sticky question palette and combined
 * status + subject filters. Used by Full Test Review, Wrong Notebook and Bookmarks.
 */
export function ReviewList({
  items,
  statuses = ["all", "correct", "wrong", "skipped", "bookmarked"],
  paletteTitle = "Question Palette",
  emptyText = "No questions in this filter.",
  renderFooter,
  sources,
}: {
  items: ReviewItem[];
  statuses?: StatusFilter[];
  paletteTitle?: string;
  emptyText?: string;
  renderFooter?: (item: ReviewItem) => ReactNode;
  /** question id → original Question Bank set, for edit links */
  sources?: Record<string, QuestionOrigin>;
}) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [subject, setSubject] = useState("All");
  const nodes = useRef(new Map<string, HTMLElement>());

  const subjects = useMemo(() => {
    const found = [...new Set(items.map((i) => i.question.subject))].sort(
      (a, b) => SUBJECT_ORDER.indexOf(a) - SUBJECT_ORDER.indexOf(b),
    );
    return ["All", ...found];
  }, [items]);

  const visible = useMemo(
    () =>
      items.filter((i) => {
        const okSubject = subject === "All" || i.question.subject === subject;
        const okStatus =
          status === "all"
            ? true
            : status === "bookmarked"
              ? Boolean(i.answer?.bookmarked)
              : i.status === status;
        return okSubject && okStatus;
      }),
    [items, status, subject],
  );

  const jump = (id: string) => {
    const el = nodes.current.get(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
      <div className="min-w-0 order-2 lg:order-1">
        <div className="flex flex-wrap gap-1.5">
          {statuses.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                status === f ? "border-primary bg-primary text-primary-foreground" : "bg-card",
              )}
            >
              {STATUS_LABEL[f]}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={cn(
                "rounded-lg border px-3 py-1 text-xs font-semibold",
                subject === s ? "border-primary bg-primary/10 text-primary" : "bg-card",
              )}
            >
              {s === "All" ? "All Subjects" : s}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Showing {visible.length} of {items.length} question{items.length === 1 ? "" : "s"}
        </p>

        <div className="mt-3 space-y-4">
          {visible.length === 0 && <p className="text-sm text-muted-foreground">{emptyText}</p>}
          {visible.map((r, i) => (
            <article
              key={r.question.id}
              ref={(el) => {
                if (el) nodes.current.set(r.question.id, el);
                else nodes.current.delete(r.question.id);
              }}
              className="scroll-mt-20 rounded-2xl border bg-card p-4 sm:p-5"
            >
              <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-muted-foreground">
                    Q{r.question.number || i + 1} · {r.question.subject} ·{" "}
                    {formatClock(r.answer?.timeSpent ?? 0)} spent
                  </div>
                  {sources?.[r.question.id] ? (
                    <Link
                      to="/bank"
                      search={{
                        edit: sources[r.question.id].testId,
                        q: r.question.id,
                      }}
                      title="Open this question in the Question Bank"
                      className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-[11px] font-medium text-primary underline"
                    >
                      <ExternalLink className="size-3 shrink-0" />
                      <span className="truncate">
                        {sources[r.question.id].testName} · Q{sources[r.question.id].number}
                      </span>
                    </Link>
                  ) : (
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      Source set unavailable · ID {r.question.id}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <CopyQuestion question={r.question} />
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-bold capitalize",
                      dotClass(r.status),
                    )}
                  >
                    {r.status === "skipped" ? "not attempted" : r.status}
                    {typeof r.score === "number" ? ` ${r.score > 0 ? `+${r.score}` : r.score}` : ""}
                  </span>
                </div>
              </div>

              <QuestionView
                question={r.question}
                value={r.answer?.value ?? null}
                readOnly
                showAnswer
              />

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border bg-surface p-3">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                    Your answer
                  </div>
                  <MathText
                    className={cn(
                      "text-sm font-semibold",
                      r.status === "correct" && "text-success",
                      r.status === "wrong" && "text-destructive",
                    )}
                  >
                    {answerText(r.question, r.answer?.value ?? null)}
                  </MathText>
                </div>
                <div className="rounded-lg border bg-surface p-3">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                    Correct answer
                  </div>
                  <MathText className="text-sm font-semibold text-success">
                    {correctText(r.question)}
                  </MathText>
                </div>
              </div>

              {renderFooter?.(r)}
            </article>
          ))}
        </div>
      </div>

      {/* sticky palette */}
      <aside className="order-1 lg:order-2">
        <div className="sticky top-[70px] rounded-2xl border bg-card p-3">
          <div className="text-xs font-bold uppercase tracking-wide">{paletteTitle}</div>
          <div className="mt-3 grid grid-cols-6 gap-1.5 lg:grid-cols-5">
            {visible.map((r, i) => (
              <button
                key={r.question.id}
                onClick={() => jump(r.question.id)}
                title={`${r.question.subject} · ${r.status}`}
                className={cn(
                  "grid h-8 place-items-center rounded-md text-xs font-bold",
                  dotClass(r.status),
                )}
              >
                {r.question.number || i + 1}
              </button>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
            <Legend cls="bg-answered" label="Correct" />
            <Legend cls="bg-notanswered" label="Wrong" />
            <Legend cls="bg-notvisited" label="Not attempted" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("size-3 rounded", cls)} /> {label}
    </div>
  );
}
