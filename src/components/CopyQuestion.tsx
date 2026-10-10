import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { COPY_MODE_LABEL, questionToText, type CopyMode } from "@/lib/copy-question";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

const MODES: CopyMode[] = ["question", "answer", "full"];

/**
 * "Copy Question" for AI verification (ChatGPT / Gemini / Claude).
 * Never rendered inside the live test screen.
 */
export function CopyQuestion({ question, className }: { question: Question; className?: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<CopyMode | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const copy = async (mode: CopyMode) => {
    const text = questionToText(question, mode);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(mode);
    setOpen(false);
    toast.success(`Copied — ${COPY_MODE_LABEL[mode]}`);
    window.setTimeout(() => setDone(null), 1500);
  };

  return (
    <div ref={box} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Copy this question for AI verification"
        className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent"
      >
        {done ? (
          <Check className="size-3.5 text-success" />
        ) : (
          <ClipboardCopy className="size-3.5" />
        )}
        Copy Question
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-60 overflow-hidden rounded-lg border bg-card shadow-lg">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => copy(m)}
              className="block w-full px-3 py-2 text-left text-xs hover:bg-accent"
            >
              {COPY_MODE_LABEL[m]}
            </button>
          ))}
          {question.images.length > 0 && (
            <p className="border-t px-3 py-2 text-[10px] text-muted-foreground">
              Image question — the copy includes a note to attach the image.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
