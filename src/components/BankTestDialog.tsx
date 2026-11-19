import { useEffect, useMemo, useState } from "react";
import { MonitorCheck, ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { START_MODE_CONFIG, type StartMode } from "@/lib/start-mode";
import { validQuestions } from "@/lib/validate";
import type { TestSet } from "@/lib/types";
import { cn } from "@/lib/utils";

const QUESTION_PRESETS = [10, 20, 30, 45, 60];
const DURATION_PRESETS = [30, 60, 90, 120, 180];

export function BankTestDialog({
  test,
  open,
  onOpenChange,
  onStart,
}: {
  test: TestSet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (options: {
    questionCount: number;
    durationMin: number;
    mode: StartMode;
  }) => Promise<void>;
}) {
  const questions = useMemo(() => validQuestions(test?.questions ?? []), [test?.questions]);
  const [questionCount, setQuestionCount] = useState("");
  const [durationMin, setDurationMin] = useState("60");
  const [mode, setMode] = useState<StartMode>("normal");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuestionCount("");
      setDurationMin("60");
      setMode("normal");
      setBusy(false);
    } else {
      setQuestionCount(String(Math.min(10, questions.length)));
    }
  }, [open, test?.id, questions.length]);

  if (!open || !test) return null;

  const parsedCount = Number(questionCount);
  const parsedDuration = Number(durationMin);
  const validCount =
    Number.isInteger(parsedCount) && parsedCount >= 1 && parsedCount <= questions.length;
  const validDuration =
    Number.isSafeInteger(parsedDuration) && parsedDuration >= 1 && durationMin.trim() !== "";

  const handleCountChange = (value: string) => {
    const parsed = Number(value);
    setQuestionCount(
      value !== "" && Number.isFinite(parsed) && parsed > questions.length
        ? String(questions.length)
        : value,
    );
  };

  const handleStart = async () => {
    if (!validCount || !validDuration || busy) return;
    setBusy(true);
    try {
      await onStart({ questionCount: parsedCount, durationMin: parsedDuration, mode });
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to start the test.");
    } finally {
      setBusy(false);
    }
  };

  const modeIcons = {
    normal: <MonitorCheck className="size-4" />,
    strict: <ShieldCheck className="size-4" />,
    nta: <MonitorCheck className="size-4" />,
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/75 p-4 backdrop-blur-xl">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bank-test-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[24px] border border-white/20 bg-card/95 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-5 sm:p-7">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-3.5" /> Test setup
            </div>
            <h2
              id="bank-test-title"
              className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Go Test
            </h2>
            <p className="mt-1 truncate text-sm text-muted-foreground">{test.name}</p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full border border-white/20 bg-background/50 p-2 text-muted-foreground transition-colors hover:bg-background"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="scroll-slim space-y-6 overflow-y-auto p-5 sm:p-7">
          <section aria-labelledby="bank-test-questions">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 id="bank-test-questions" className="text-sm font-semibold">
                Number of Questions
              </h3>
              <span className="text-xs text-muted-foreground">
                {questions.length} valid question{questions.length === 1 ? "" : "s"} available
              </span>
            </div>
            <input
              type="number"
              min={questions.length > 0 ? 1 : undefined}
              max={questions.length}
              step={1}
              value={questionCount}
              onChange={(event) => handleCountChange(event.target.value)}
              disabled={questions.length === 0}
              aria-label="Number of questions"
              className="mt-3 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {QUESTION_PRESETS.filter((count) => count <= questions.length).map((count) => (
                <PresetButton
                  key={count}
                  selected={questionCount === String(count)}
                  onClick={() => setQuestionCount(String(count))}
                >
                  {count}
                </PresetButton>
              ))}
              {questions.length > 0 && (
                <PresetButton
                  selected={questionCount === String(questions.length)}
                  onClick={() => setQuestionCount(String(questions.length))}
                >
                  All
                </PresetButton>
              )}
            </div>
            {questions.length === 0 && (
              <p className="mt-2 text-xs text-destructive">
                This question bank has no valid questions to start a test.
              </p>
            )}
          </section>

          <section aria-labelledby="bank-test-duration">
            <h3 id="bank-test-duration" className="text-sm font-semibold">
              Test Duration
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {DURATION_PRESETS.map((minutes) => (
                <PresetButton
                  key={minutes}
                  selected={durationMin === String(minutes)}
                  onClick={() => setDurationMin(String(minutes))}
                >
                  {minutes} min
                </PresetButton>
              ))}
            </div>
            <label className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              Custom duration
              <input
                type="number"
                min={1}
                step={1}
                value={durationMin}
                onChange={(event) => setDurationMin(event.target.value)}
                aria-label="Custom duration in minutes"
                className="w-28 rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              min
            </label>
          </section>

          <section aria-labelledby="bank-test-mode">
            <h3 id="bank-test-mode" className="text-sm font-semibold">
              Test Mode
            </h3>
            <div role="radiogroup" aria-labelledby="bank-test-mode" className="mt-3 grid gap-2">
              {(["normal", "strict", "nta"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={mode === option}
                  onClick={() => setMode(option)}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 text-left transition-colors",
                    mode === option
                      ? "border-primary/40 bg-primary/10"
                      : "border-border bg-background/40 hover:border-primary/20",
                  )}
                >
                  <span className="mt-0.5 text-primary">{modeIcons[option]}</span>
                  <span>
                    <span className="block text-sm font-semibold">
                      {START_MODE_CONFIG[option].label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {START_MODE_CONFIG[option].description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-white/10 bg-background/40 p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border bg-background/70 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStart}
            disabled={!validCount || !validDuration || busy}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Preparing…" : "Start Test"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PresetButton({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
        selected ? "border-primary bg-primary/10 text-primary" : "bg-background hover:bg-accent",
      )}
    >
      {children}
    </button>
  );
}
