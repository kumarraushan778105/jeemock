import { useState } from "react";
import { cn } from "@/lib/utils";

const KEYS: Array<{ label: string; expr?: string; kind?: "fn" | "num" | "op" | "eq" }> = [
  { label: "sin", expr: "Math.sin(", kind: "fn" },
  { label: "cos", expr: "Math.cos(", kind: "fn" },
  { label: "tan", expr: "Math.tan(", kind: "fn" },
  { label: "ln", expr: "Math.log(", kind: "fn" },
  { label: "log", expr: "Math.log10(", kind: "fn" },
  { label: "√", expr: "Math.sqrt(", kind: "fn" },
  { label: "x²", expr: "**2", kind: "fn" },
  { label: "xʸ", expr: "**", kind: "fn" },
  { label: "π", expr: "Math.PI", kind: "fn" },
  { label: "e", expr: "Math.E", kind: "fn" },
  { label: "(", expr: "(", kind: "op" },
  { label: ")", expr: ")", kind: "op" },
  { label: "7", kind: "num" },
  { label: "8", kind: "num" },
  { label: "9", kind: "num" },
  { label: "÷", expr: "/", kind: "op" },
  { label: "4", kind: "num" },
  { label: "5", kind: "num" },
  { label: "6", kind: "num" },
  { label: "×", expr: "*", kind: "op" },
  { label: "1", kind: "num" },
  { label: "2", kind: "num" },
  { label: "3", kind: "num" },
  { label: "−", expr: "-", kind: "op" },
  { label: "0", kind: "num" },
  { label: ".", kind: "num" },
  { label: "E", expr: "e", kind: "num" },
  { label: "+", expr: "+", kind: "op" },
];

export function Calculator({
  onClose,
  initialExpr = "",
  onExprChange,
}: {
  onClose: () => void;
  initialExpr?: string;
  onExprChange?: (expr: string) => void;
}) {
  const [expr, setExprState] = useState(initialExpr);
  const setExpr = (v: React.SetStateAction<string>) =>
    setExprState((cur) => {
      const next = typeof v === "function" ? (v as (p: string) => string)(cur) : v;
      onExprChange?.(next);
      return next;
    });
  const [out, setOut] = useState("0");

  const evaluate = () => {
    try {
      // eslint-disable-next-line no-new-func
      const value = Function(`"use strict"; return (${expr || "0"})`)();
      if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("bad");
      setOut(String(Number(value.toPrecision(12))));
    } catch {
      setOut("Error");
    }
  };

  return (
    <div className="w-72 rounded-xl border bg-card p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Scientific Calculator
        </span>
        <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">
          close
        </button>
      </div>
      <div className="mb-2 rounded-lg border bg-surface p-2 text-right">
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter") evaluate();
          }}
          className="w-full bg-transparent text-right font-mono text-sm outline-none"
          placeholder="0"
        />
        <div className="font-mono text-lg font-semibold">{out}</div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {KEYS.map((k) => (
          <button
            key={k.label}
            onClick={() => setExpr((v) => v + (k.expr ?? k.label))}
            className={cn(
              "rounded-md py-2 font-mono text-sm transition-colors",
              k.kind === "num" ? "bg-secondary hover:bg-accent" : "bg-muted hover:bg-accent",
            )}
          >
            {k.label}
          </button>
        ))}
        <button
          onClick={() => {
            setExpr("");
            setOut("0");
          }}
          className="rounded-md bg-destructive/15 py-2 text-sm text-destructive"
        >
          AC
        </button>
        <button
          onClick={() => setExpr((v) => v.slice(0, -1))}
          className="rounded-md bg-muted py-2 text-sm"
        >
          ⌫
        </button>
        <button
          onClick={evaluate}
          className="col-span-2 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground"
        >
          =
        </button>
      </div>
    </div>
  );
}
