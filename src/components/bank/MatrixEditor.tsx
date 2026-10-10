import { Plus, Trash2 } from "lucide-react";
import { MathText } from "@/components/MathText";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

const LETTERS = "ABCDEFGHIJKL".split("");

export type MatrixDraft = NonNullable<Question["matrix"]>;

/**
 * Match the Following / Matrix Match table creator.
 * Column I rows, Column II rows, per-cell editing (LaTeX + mhchem for chemical
 * equations, sub/superscripts and unicode), width and border controls, and the
 * answer stored as explicit pairs (row number → Column II letter).
 */
export function MatrixEditor({
  matrix,
  pairs,
  onMatrix,
  onPairs,
}: {
  matrix: MatrixDraft;
  pairs: Record<string, string>;
  onMatrix: (m: MatrixDraft) => void;
  onPairs: (p: Record<string, string>) => void;
}) {
  const left = matrix.left ?? [];
  const right = matrix.right ?? [];
  const letters = right.map((_, i) => LETTERS[i]);

  const setLeft = (i: number, v: string) =>
    onMatrix({ ...matrix, left: left.map((x, idx) => (idx === i ? v : x)) });
  const setRight = (i: number, v: string) =>
    onMatrix({ ...matrix, right: right.map((x, idx) => (idx === i ? v : x)) });

  const addRow = () => onMatrix({ ...matrix, left: [...left, ""] });
  const delRow = (i: number) => {
    onMatrix({ ...matrix, left: left.filter((_, idx) => idx !== i) });
    const next: Record<string, string> = {};
    left.forEach((_, idx) => {
      if (idx === i) return;
      const from = String(idx + 1);
      const to = String(idx < i ? idx + 1 : idx);
      if (pairs[from]) next[to] = pairs[from];
    });
    onPairs(next);
  };
  const addCol = () => onMatrix({ ...matrix, right: [...right, ""] });
  const delCol = (i: number) => {
    const letter = LETTERS[i];
    onMatrix({ ...matrix, right: right.filter((_, idx) => idx !== i) });
    const next = { ...pairs };
    for (const k of Object.keys(next)) if (next[k] === letter) delete next[k];
    onPairs(next);
  };

  return (
    <div className="space-y-2 rounded-lg border bg-card p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase text-muted-foreground">
          Match the Following table
        </span>
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold hover:bg-accent"
        >
          <Plus className="size-3" /> Row
        </button>
        <button
          type="button"
          onClick={addCol}
          className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold hover:bg-accent"
        >
          <Plus className="size-3" /> Column II item
        </button>
        <label className="ml-auto flex items-center gap-1 text-[11px]">
          Column I width
          <input
            type="number"
            min={80}
            max={600}
            value={matrix.leftWidth ?? 220}
            onChange={(e) => onMatrix({ ...matrix, leftWidth: Number(e.target.value) || 220 })}
            className="w-16 rounded border bg-surface px-1.5 py-0.5"
          />
          px
        </label>
        <label className="flex items-center gap-1 text-[11px]">
          <input
            type="checkbox"
            checked={matrix.borders !== false}
            onChange={(e) => onMatrix({ ...matrix, borders: e.target.checked })}
          />
          Borders
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold uppercase text-muted-foreground">Column I</div>
          {left.map((v, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-5 text-xs font-bold">{i + 1}.</span>
              <input
                value={v}
                onChange={(e) => setLeft(i, e.target.value)}
                placeholder="e.g. $\\ce{H2SO4}$ or $x^2$"
                className="min-w-0 flex-1 rounded border bg-surface px-2 py-1 text-xs"
              />
              <select
                value={pairs[String(i + 1)] ?? ""}
                onChange={(e) => onPairs({ ...pairs, [String(i + 1)]: e.target.value })}
                className="rounded border bg-surface px-1 py-1 text-xs"
                title="Matching Column II option"
              >
                <option value="">—</option>
                {letters.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {left.length > 1 && (
                <button
                  type="button"
                  onClick={() => delRow(i)}
                  title="Delete row"
                  className="rounded border p-1 text-destructive"
                >
                  <Trash2 className="size-3" />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold uppercase text-muted-foreground">Column II</div>
          {right.map((v, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-5 text-xs font-bold">{LETTERS[i]}.</span>
              <input
                value={v}
                onChange={(e) => setRight(i, e.target.value)}
                placeholder="Matching option"
                className="min-w-0 flex-1 rounded border bg-surface px-2 py-1 text-xs"
              />
              {right.length > 1 && (
                <button
                  type="button"
                  onClick={() => delCol(i)}
                  title="Delete column item"
                  className="rounded border p-1 text-destructive"
                >
                  <Trash2 className="size-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-surface p-2">
        <div className="mb-1 text-[11px] font-semibold uppercase text-muted-foreground">
          CBT preview
        </div>
        <table
          className={cn(
            "w-full text-xs",
            matrix.borders !== false && "[&_td]:border [&_th]:border",
          )}
        >
          <thead className="bg-card">
            <tr>
              <th style={{ width: matrix.leftWidth ?? 220 }} className="px-2 py-1 text-left">
                Column I
              </th>
              <th className="px-2 py-1 text-left">Column II</th>
            </tr>
          </thead>
          <tbody>
            {left.map((l, i) => (
              <tr key={i}>
                <td className="px-2 py-1">
                  <MathText as="span">{`${i + 1}. ${l}`}</MathText>
                </td>
                <td className="px-2 py-1">
                  {right[i] !== undefined && (
                    <MathText as="span">{`${LETTERS[i]}. ${right[i]}`}</MathText>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Answer pairs:{" "}
          {Object.entries(pairs)
            .filter(([, v]) => v)
            .map(([k, v]) => `${k} → ${v}`)
            .join(", ") || "—"}
        </p>
      </div>
    </div>
  );
}
