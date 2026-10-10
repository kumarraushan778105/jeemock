import { useEffect, useState } from "react";
import { MonitorCheck, ShieldCheck, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type StartMode = "normal" | "strict" | "nta";

export function StartModeDialog({
  open,
  onOpenChange,
  onStart,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (mode: StartMode) => Promise<void> | void;
}) {
  const [mode, setMode] = useState<StartMode>("normal");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) {
      setMode("normal");
      setBusy(false);
    }
  }, [open]);

  if (!open) return null;

  const handleStart = async () => {
    setBusy(true);
    try {
      await onStart(mode);
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/75 p-4 backdrop-blur-xl">
      <div className="w-full max-w-xl overflow-hidden rounded-[24px] border border-white/20 bg-card/80 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <div className="border-b border-white/10 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                <Sparkles className="size-3.5" /> Exam Mode
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Start Test</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose your exam mode before the test begins.
              </p>
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
        </div>

        <div className="space-y-3 p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setMode("normal")}
            className={cn(
              "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              mode === "normal"
                ? "border-primary/40 bg-primary/10 shadow-sm"
                : "border-border bg-background/40 hover:border-primary/20",
            )}
          >
            <div className="mt-0.5 rounded-2xl bg-background/70 p-2 text-primary">
              <MonitorCheck className="size-4" />
            </div>
            <div>
              <div className="font-semibold">Normal Mode</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Regular exam experience. The test always starts in fullscreen.
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMode("strict")}
            className={cn(
              "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              mode === "strict"
                ? "border-amber-500/40 bg-amber-500/10 shadow-sm"
                : "border-border bg-background/40 hover:border-amber-500/20",
            )}
          >
            <div className="mt-0.5 rounded-2xl bg-background/70 p-2 text-amber-600">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <div className="font-semibold">Strict Mode (Recommended)</div>
              <div className="mt-1 text-sm text-muted-foreground">
                The test starts in Fullscreen. Every tab switch, window switch or minimise counts as
                one violation — after 3 violations your test is submitted automatically.
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMode("nta")}
            className={cn(
              "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
              mode === "nta"
                ? "border-blue-500/40 bg-blue-500/10 shadow-sm"
                : "border-border bg-background/40 hover:border-blue-500/20",
            )}
          >
            <div className="mt-0.5 rounded-2xl bg-background/70 p-2 text-blue-600">
              <MonitorCheck className="size-4" />
            </div>
            <div>
              <div className="font-semibold">NTA-Style CBT Mode</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Experience a JEE Main-style computer-based examination interface in fullscreen.
              </div>
            </div>
          </button>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-white/10 bg-background/40 p-4 sm:flex-row sm:justify-end sm:p-6">
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
            disabled={busy}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Preparing…" : "Start Test"}
          </button>
        </div>
      </div>
    </div>
  );
}
