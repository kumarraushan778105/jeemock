/**
 * Logical section detection for question / paragraph / solution text.
 *
 * Question banks type Assertion–Reason, Comprehension, Passage and Case Study
 * questions as one long string. This splits that string into logical blocks so
 * the *existing* spacing configuration (`question.spacing.block`) can be applied
 * automatically — no manual line breaks, HTML or Markdown required.
 *
 * Purely presentational: the original text is never modified or reordered.
 */

export interface TextBlock {
  /** detected section label, e.g. "Assertion (A)" */
  heading?: string;
  body: string;
}

const LABEL = String.raw`Assertion|Reason|Statements?\s*(?:IV|I{1,3}|[1-4]|[A-D])\b|Paragraph|Case\s*Study|Comprehension|Passage|Directions?|Column\s*(?:I{1,2})|List\s*(?:I{1,2})|Given|To\s*Find|Note`;

/**
 * Lead-in phrases that introduce the answer choices of a statement-based
 * question. Splitting before them puts the choices lead-in in its own block so
 * it gets the same spacing as the statements above it.
 */
const TAIL_RE =
  /In\s+(?:the\s+)?light\s+of\s+the\s+above|Choose\s+the\s+(?:correct|most)|Which\s+of\s+the\s+(?:above|following)\s+(?:is|are|statements?)|In\s+respect\s+of\s+the\s+above/i;

/** Splits a chunk once, right before the answer-choices lead-in. */
function splitTail(chunk: string): string[] {
  const m = TAIL_RE.exec(chunk);
  if (!m || m.index <= 0) return [chunk];
  return [chunk.slice(0, m.index), chunk.slice(m.index)];
}

/** e.g. "Assertion (A):", "Reason (R) -", "Passage:" at the start of a chunk */
const HEAD_RE = new RegExp(
  String.raw`^\s*((?:${LABEL})\s*(?:\([^)\n]{1,12}\))?)\s*[:\-–—.]\s*`,
  "i",
);

/** split point right before a known section label */
const SPLIT_RE = new RegExp(String.raw`(?=(?:${LABEL})\s*(?:\([^)\n]{1,12}\))?\s*[:\-–—])`, "gi");

/** generic "Some Heading:" line followed by its own content */
const GENERIC_HEAD_RE = /^\s*([A-Z][A-Za-z ]{2,28})\s*:\s*(?=\S)/;

function chunkToBlock(chunk: string): TextBlock | null {
  const raw = chunk.replace(/^\s+|\s+$/g, "");
  if (!raw) return null;
  const known = HEAD_RE.exec(raw);
  if (known) {
    const body = raw.slice(known[0].length).trim();
    return { heading: known[1].replace(/\s+/g, " ").trim(), body };
  }
  return { body: raw };
}

/**
 * Splits text into logical blocks. Returns a single unlabelled block when no
 * section structure is detected (the overwhelmingly common case), so existing
 * questions render byte-for-byte as before.
 */
export function splitBlocks(input: string | undefined | null): TextBlock[] {
  const src = String(input ?? "");
  if (!src.trim()) return [{ body: src }];

  const out: TextBlock[] = [];
  for (const para of src.split(/\n\s*\n+/)) {
    if (!para.trim()) continue;
    const pieces = para.split(SPLIT_RE).flatMap(splitTail);
    for (const piece of pieces) {
      const block = chunkToBlock(piece);
      if (!block) continue;
      if (!block.heading) {
        const generic = GENERIC_HEAD_RE.exec(block.body);
        // only treat as a heading when real content follows on the same chunk
        if (generic && block.body.length > generic[0].length + 8) {
          out.push({
            heading: generic[1].trim(),
            body: block.body.slice(generic[0].length).trim(),
          });
          continue;
        }
      }
      out.push(block);
    }
  }

  if (out.length === 0) return [{ body: src }];
  return out;
}

/**
 * True when the author deliberately formatted the text themselves — blank
 * lines, leading indentation on a line, or runs of 2+ spaces. Such text must be
 * rendered verbatim instead of being re-flowed by the automatic block splitter.
 */
export function hasManualFormatting(input: string | undefined | null): boolean {
  const src = String(input ?? "");
  if (!src) return false;
  return (
    /\n[ \t]*\n/.test(src) || // blank line
    /(^|\n)[ \t]+\S/.test(src) || // indentation
    /\S[ \t]{2,}\S/.test(src) // intentional inline spacing
  );
}

/** True when the text has more than one detected logical section. */
export function hasSections(input: string | undefined | null): boolean {
  const blocks = splitBlocks(input);
  return blocks.length > 1 || Boolean(blocks[0]?.heading);
}
