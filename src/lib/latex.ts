/**
 * LaTeX repair + fallback helpers.
 *
 * Imported question banks are messy: escaped backslashes, smart quotes, unicode
 * math delimiters, unbalanced braces and half-written commands. Everything here
 * runs before KaTeX so that raw commands can never reach the screen.
 */

const REPLACEMENTS: Array<[RegExp, string]> = [
  // JSON round-trips often double-escape backslashes
  [/\\\\(?=[a-zA-Z])/g, "\\"],
  // unicode / typographic delimiters
  [/[“”]/g, '"'],
  [/[‘’]/g, "'"],
  [/\u00a0/g, " "],
  // common html leftovers
  [/<br\s*\/?>/gi, "\n"],
  [/&nbsp;/gi, " "],
  [/&amp;/gi, "&"],
  [/&lt;/gi, "<"],
  [/&gt;/gi, ">"],
  // \dfrac/\tfrac are fine, but \frac12 style needs braces
  [/\\(d|t)?frac\s*(\d)\s*(\d)/g, "\\$1frac{$2}{$3}"],
  // stray \left / \right without a delimiter
  [/\\left(?![\s(\[{|.\\])/g, ""],
  [/\\right(?![\s)\]}|.\\])/g, ""],
];

/** Balance braces inside a latex fragment so KaTeX does not choke. */
function balanceBraces(src: string): string {
  let depth = 0;
  let out = "";
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    const escaped = src[i - 1] === "\\";
    if (ch === "{" && !escaped) depth += 1;
    if (ch === "}" && !escaped) {
      if (depth === 0) continue; // drop the unmatched closer
      depth -= 1;
    }
    out += ch;
  }
  return out + "}".repeat(depth);
}

/* ------------------------------------------------------------------ */
/*        deterministic scientific / mathematical symbol support        */
/* ------------------------------------------------------------------ */

const SUP_MAP: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁺": "+",
  "⁻": "-",
  "⁼": "=",
  "⁽": "(",
  "⁾": ")",
  ⁿ: "n",
};
const SUB_MAP: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "₊": "+",
  "₋": "-",
  "₌": "=",
  "₍": "(",
  "₎": ")",
};

/** typed shorthands → LaTeX. Deterministic, no AI / parsing / guessing. */
const SHORTHAND: Array<[RegExp, string]> = [
  [/<==>|<=>/g, "\\rightleftharpoons "],
  [/<-->|<->/g, "\\leftrightarrow "],
  [/-->|->/g, "\\to "],
  [/<--|<-/g, "\\leftarrow "],
  [/=>/g, "\\Rightarrow "],
  [/(?<![<>=!+\-*/^_])<=(?![>=])/g, "\\leq "],
  [/(?<![<>=!+\-*/^_])>=/g, "\\geq "],
  [/!=/g, "\\neq "],
  [/\+\/-|\+-(?=\s*[\d.\\A-Za-z])/g, "\\pm "],
  [/\bsqrt\s*\(([^()]*)\)/gi, "\\sqrt{$1}"],
  [/\bcbrt\s*\(([^()]*)\)/gi, "\\sqrt[3]{$1}"],
  [/\bintegral\b/gi, "\\int "],
  [/\binfinity\b/gi, "\\infty "],
  // unicode operators typed straight into the text
  [/×/g, "\\times "],
  [/÷/g, "\\div "],
  [/⇌/g, "\\rightleftharpoons "],
  [/→/g, "\\to "],
  [/←/g, "\\leftarrow "],
  [/⇒/g, "\\Rightarrow "],
];

/** Converts unicode super/subscript runs into LaTeX scripts (x² → x^{2}). */
function unicodeScripts(s: string): string {
  return s
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ]+/g, (m) => `^{${[...m].map((c) => SUP_MAP[c] ?? "").join("")}}`)
    .replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎]+/g, (m) => `_{${[...m].map((c) => SUB_MAP[c] ?? "").join("")}}`);
}

/**
 * Normalizes commonly typed scientific notation into LaTeX the existing renderer
 * already understands. Content inside \ce{…} (mhchem) is left untouched so
 * chemical reaction arrows keep their mhchem syntax.
 */
export function normalizeSymbols(input: string): string {
  const kept: string[] = [];
  let s = input.replace(/\\ce\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, (m) => {
    kept.push(m);
    return `\u0000${kept.length - 1}\u0000`;
  });
  s = unicodeScripts(s);
  for (const [re, to] of SHORTHAND) s = s.replace(re, to);
  return s.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => kept[Number(i)] ?? "");
}

/** Normalise + repair a raw string coming from an imported question bank. */
export function repairLatex(input: string | undefined | null): string {
  if (!input) return "";
  let s = String(input);
  for (const [re, to] of REPLACEMENTS) s = s.replace(re, to);
  s = normalizeSymbols(s);
  // balance $ delimiters — an odd count would swallow the rest of the text
  const dollars = (s.match(/(?<!\\)\$/g) ?? []).length;
  if (dollars % 2 === 1) s = s.replace(/(?<!\\)\$(?=[^$]*$)/, "");
  return balanceBraces(s);
}

const SYMBOLS: Array<[RegExp, string]> = [
  [/\\(d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($2)/($3)"],
  [/\\sqrt\s*\[\s*(\d+)\s*\]\s*\{([^{}]*)\}/g, "$1√($2)"],
  [/\\sqrt\s*\{([^{}]*)\}/g, "√($1)"],
  [/\\text\s*\{([^{}]*)\}/g, "$1"],
  [/\\mathrm\s*\{([^{}]*)\}/g, "$1"],
  [/\\mathbb\s*\{R\}/g, "ℝ"],
  [/\\mathbb\s*\{N\}/g, "ℕ"],
  [/\\mathbb\s*\{Z\}/g, "ℤ"],
  [/\\mathbb\s*\{Q\}/g, "ℚ"],
  [/\\mathbb\s*\{C\}/g, "ℂ"],
  [/\\mathbb\s*\{([^{}]*)\}/g, "$1"],
  [/\\times/g, "×"],
  [/\\div/g, "÷"],
  [/\\cdot/g, "·"],
  [/\\pm/g, "±"],
  [/\\mp/g, "∓"],
  [/\\leq|\\le\b/g, "≤"],
  [/\\geq|\\ge\b/g, "≥"],
  [/\\neq|\\ne\b/g, "≠"],
  [/\\approx/g, "≈"],
  [/\\propto/g, "∝"],
  [/\\infty/g, "∞"],
  [/\\sum/g, "Σ"],
  [/\\prod/g, "Π"],
  [/\\int/g, "∫"],
  [/\\oint/g, "∮"],
  [/\\partial/g, "∂"],
  [/\\nabla/g, "∇"],
  [/\\lim/g, "lim"],
  [/\\to|\\rightarrow|\\longrightarrow/g, "→"],
  [/\\leftarrow/g, "←"],
  [/\\leftrightarrow|\\rightleftharpoons/g, "⇌"],
  [/\\Rightarrow/g, "⇒"],
  [/\\cup/g, "∪"],
  [/\\cap/g, "∩"],
  [/\\subseteq/g, "⊆"],
  [/\\subset/g, "⊂"],
  [/\\supseteq/g, "⊇"],
  [/\\supset/g, "⊃"],
  [/\\in\b/g, "∈"],
  [/\\notin/g, "∉"],
  [/\\forall/g, "∀"],
  [/\\exists/g, "∃"],
  [/\\emptyset|\\varnothing/g, "∅"],
  [/\\angle/g, "∠"],
  [/\\degree|\\circ/g, "°"],
  [/\\ldots|\\dots|\\cdots/g, "…"],
  [/\\vec\s*\{([^{}]*)\}/g, "$1⃗"],
  [/\\hat\s*\{([^{}]*)\}/g, "$1̂"],
  [/\\overline\s*\{([^{}]*)\}/g, "$1̄"],
  [/\\alpha/g, "α"],
  [/\\beta/g, "β"],
  [/\\gamma/g, "γ"],
  [/\\delta/g, "δ"],
  [/\\epsilon|\\varepsilon/g, "ε"],
  [/\\zeta/g, "ζ"],
  [/\\eta/g, "η"],
  [/\\theta/g, "θ"],
  [/\\kappa/g, "κ"],
  [/\\lambda/g, "λ"],
  [/\\mu/g, "μ"],
  [/\\nu/g, "ν"],
  [/\\xi/g, "ξ"],
  [/\\rho/g, "ρ"],
  [/\\sigma/g, "σ"],
  [/\\tau/g, "τ"],
  [/\\phi|\\varphi/g, "φ"],
  [/\\chi/g, "χ"],
  [/\\psi/g, "ψ"],
  [/\\omega/g, "ω"],
  [/\\Gamma/g, "Γ"],
  [/\\Delta/g, "Δ"],
  [/\\Theta/g, "Θ"],
  [/\\Lambda/g, "Λ"],
  [/\\Sigma/g, "Σ"],
  [/\\Phi/g, "Φ"],
  [/\\Psi/g, "Ψ"],
  [/\\Omega/g, "Ω"],
  [/\\quad|\\qquad|\\,|\\;|\\!|\\ /g, " "],
  [/\\left|\\right/g, ""],
  [/\\\{/g, "{"],
  [/\\\}/g, "}"],
];

const SUB = "₀₁₂₃₄₅₆₇₈₉";
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/**
 * Human-readable plain text for a fragment KaTeX could not render.
 * Guarantees no backslash command survives.
 */
export function latexFallback(src: string): string {
  let s = String(src ?? "");
  for (const [re, to] of SYMBOLS) s = s.replace(re, to);
  s = s
    .replace(/_\{?(\d+)\}?/g, (_m, d: string) => [...d].map((c) => SUB[Number(c)]).join(""))
    .replace(/\^\{?(\d+)\}?/g, (_m, d: string) => [...d].map((c) => SUP[Number(c)]).join(""))
    .replace(/\^\{([^{}]*)\}/g, "^($1)")
    .replace(/_\{([^{}]*)\}/g, "_($1)")
    // anything still starting with a backslash is dropped, never displayed raw
    .replace(/\\[a-zA-Z]+\*?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s{2,}/g, " ");
  return s.trim();
}

/** True when the string still contains a raw LaTeX command. */
export function hasRawLatex(s: string): boolean {
  return /\\[a-zA-Z]+/.test(s) || /[\^_]\{/.test(s);
}
