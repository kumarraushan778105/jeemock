import { memo, useMemo } from "react";
import { MathText } from "./MathText";
import { hasManualFormatting, splitBlocks } from "@/lib/blocks";
import { cn } from "@/lib/utils";

/**
 * Renders text with automatically detected logical sections (Assertion, Reason,
 * Paragraph, Passage, Case Study, Comprehension, "Heading: content" …) using the
 * question's existing spacing configuration.
 *
 * Manual formatting always wins: when the author typed blank lines, indentation
 * or intentional multi-space runs, the text is rendered verbatim (whitespace
 * preserved) instead of being re-flowed. Section headings are still labelled
 * when they are detected, but nothing inside a block is collapsed.
 *
 * Falls back to a plain <MathText> when no section structure is present, so
 * existing questions render exactly as before.
 */
export const MathBlocks = memo(function MathBlocks({
  children,
  className,
  gap = 12,
  style,
}: {
  children: string | undefined | null;
  className?: string;
  /** row gap in px — comes from question.spacing */
  gap?: number;
  style?: React.CSSProperties;
}) {
  const src = children ?? "";
  const blocks = useMemo(() => splitBlocks(src), [src]);
  const manual = useMemo(() => hasManualFormatting(src), [src]);

  const structured = blocks.length > 1 || Boolean(blocks[0]?.heading);
  const labelled = blocks.some((b) => b.heading);

  // manual formatting with no detected section labels → render exactly as typed
  if (!structured || (manual && !labelled)) {
    return (
      <MathText className={className} preserveWhitespace={manual} style={style}>
        {src}
      </MathText>
    );
  }

  return (
    <div className="flex flex-col" style={{ rowGap: gap }}>
      {blocks.map((b, i) => (
        <div key={i} className={b.heading ? "pl-3" : undefined}>
          {b.heading && (
            <div className={cn("mb-1 text-[11px] font-semibold uppercase text-muted-foreground")}>
              {b.heading}
            </div>
          )}
          <MathText className={className} preserveWhitespace={manual} style={style}>
            {b.body}
          </MathText>
        </div>
      ))}
    </div>
  );
});
