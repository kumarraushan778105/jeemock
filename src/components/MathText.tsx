import katex from "katex";
import "katex/dist/contrib/mhchem.js";
import { memo, useMemo } from "react";
import { hasRawLatex, latexFallback, repairLatex } from "@/lib/latex";
import { cn } from "@/lib/utils";

/**
 * Renders text containing LaTeX — inside delimiters ($…$, $$…$$, \(…\), \[…\])
 * *and* bare commands typed straight into the text (\frac12, H_2O, x^2, \cup …).
 *
 * Raw LaTeX must never reach the screen: if KaTeX fails, the fragment is
 * converted to a readable unicode fallback and the error is logged.
 */

const KATEX_OPTIONS = {
  throwOnError: false,
  strict: false as const,
  trust: true,
  output: "html" as const,
  macros: {
    "\\RR": "\\mathbb{R}",
    "\\NN": "\\mathbb{N}",
    "\\ZZ": "\\mathbb{Z}",
    "\\QQ": "\\mathbb{Q}",
    "\\CC": "\\mathbb{C}",
    "\\degree": "^\\circ",
  },
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fallbackHtml(tex: string) {
  return `<span class="math-fallback">${escapeHtml(latexFallback(tex))}</span>`;
}

function renderSegment(tex: string, display: boolean): string {
  const src = tex.trim();
  if (!src) return "";
  try {
    const html = katex.renderToString(src, { ...KATEX_OPTIONS, displayMode: display });
    // KaTeX in non-throwing mode paints unknown commands red — prefer the fallback
    if (html.includes("katex-error")) {
      console.warn("[math] unsupported latex, using fallback", { tex: src });
      return fallbackHtml(src);
    }
    return html;
  } catch (err) {
    console.error("[math] render failed", { tex: src, err });
    return fallbackHtml(src);
  }
}

/* ---------- bare (undelimited) latex detection ---------- */

const COMMAND = String.raw`\\[a-zA-Z]+\*?(?:\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})*(?:\s*\[[^\]]*\])?`;
const ESCAPED = String.raw`\\[{}()\[\]|$&%#_^]`;
const SCRIPT = String.raw`[A-Za-z0-9\)\]\}][\^_](?:\{[^{}]*\}|[A-Za-z0-9+\-]+)`;
const TOKEN = new RegExp(`${COMMAND}|${ESCAPED}|${SCRIPT}`, "g");
// gaps small enough to be part of the same expression
const GAP = /^[\s+\-=*/^_(),.]{0,4}$/;

/** Renders bare LaTeX found inside otherwise plain text. */
function renderPlain(text: string, preserve: boolean): string {
  const plainText = (s: string) =>
    preserve ? escapeHtml(s) : escapeHtml(s).replace(/\n/g, "<br/>");

  if (!hasRawLatex(text)) {
    return plainText(text);
  }

  const matches = [...text.matchAll(TOKEN)];
  if (matches.length === 0) return plainText(text);

  // merge neighbouring tokens separated only by operators/whitespace
  const spans: Array<{ start: number; end: number }> = [];
  for (const m of matches) {
    const start = m.index ?? 0;
    const end = start + m[0].length;
    const last = spans[spans.length - 1];
    if (last && GAP.test(text.slice(last.end, start))) last.end = end;
    else spans.push({ start, end });
  }

  let out = "";
  let cursor = 0;
  for (const s of spans) {
    out += plainText(text.slice(cursor, s.start));
    out += renderSegment(text.slice(s.start, s.end), false);
    cursor = s.end;
  }
  out += plainText(text.slice(cursor));
  return out;
}

const DELIMS: Array<[string, string, boolean]> = [
  ["$$", "$$", true],
  ["\\[", "\\]", true],
  ["\\(", "\\)", false],
  ["$", "$", false],
];

export function mathToHtml(input: string, preserveWhitespace = false): string {
  const src = repairLatex(input);
  if (!src) return "";

  let out = "";
  let plain = "";
  let i = 0;

  const flush = () => {
    if (plain) {
      out += renderPlain(plain, preserveWhitespace);
      plain = "";
    }
  };

  while (i < src.length) {
    let matched = false;
    for (const [open, close, display] of DELIMS) {
      if (src.startsWith(open, i)) {
        const end = src.indexOf(close, i + open.length);
        if (end > -1) {
          flush();
          out += renderSegment(src.slice(i + open.length, end), display);
          i = end + close.length;
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      plain += src[i];
      i += 1;
    }
  }
  flush();
  return out;
}

/**
 * Process-wide render cache — KaTeX compilation is the single most expensive
 * thing on question-heavy screens and the same strings recur constantly
 * (palette, review lists, re-renders). Purely a performance layer.
 */
const HTML_CACHE = new Map<string, string>();
const HTML_CACHE_MAX = 800;

function cachedHtml(src: string, preserve: boolean): string {
  const key = preserve ? `\u0001${src}` : src;
  const hit = HTML_CACHE.get(key);
  if (hit !== undefined) return hit;
  let html: string;
  try {
    html = mathToHtml(src, preserve);
  } catch (err) {
    console.error("[math] pipeline failed", err);
    html = escapeHtml(latexFallback(src));
  }
  if (HTML_CACHE.size >= HTML_CACHE_MAX) HTML_CACHE.clear();
  HTML_CACHE.set(key, html);
  return html;
}

export const MathText = memo(function MathText({
  children,
  className,
  as: Tag = "div",
  preserveWhitespace = false,
  style,
}: {
  children: string | undefined | null;
  className?: string;
  as?: "div" | "span" | "p";
  /** keep authored blank lines / indentation exactly as typed */
  preserveWhitespace?: boolean;
  style?: React.CSSProperties;
}) {
  const html = useMemo(
    () => cachedHtml(children ?? "", preserveWhitespace),
    [children, preserveWhitespace],
  );

  return (
    <Tag
      className={cn(
        "math-content leading-relaxed",
        preserveWhitespace && "whitespace-pre-wrap",
        className,
      )}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
