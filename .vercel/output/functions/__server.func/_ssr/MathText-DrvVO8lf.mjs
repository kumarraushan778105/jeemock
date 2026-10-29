import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { n as latexFallback, r as repairLatex, t as hasRawLatex } from "./latex-B1zb5kvO.mjs";
import { n as require_mhchem, r as katex } from "../_libs/katex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MathText-DrvVO8lf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
require_mhchem();
/**
* Renders text containing LaTeX — inside delimiters ($…$, $$…$$, \(…\), \[…\])
* *and* bare commands typed straight into the text (\frac12, H_2O, x^2, \cup …).
*
* Raw LaTeX must never reach the screen: if KaTeX fails, the fragment is
* converted to a readable unicode fallback and the error is logged.
*/
var KATEX_OPTIONS = {
	throwOnError: false,
	strict: false,
	trust: true,
	output: "html",
	macros: {
		"\\RR": "\\mathbb{R}",
		"\\NN": "\\mathbb{N}",
		"\\ZZ": "\\mathbb{Z}",
		"\\QQ": "\\mathbb{Q}",
		"\\CC": "\\mathbb{C}",
		"\\degree": "^\\circ"
	}
};
function escapeHtml(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function fallbackHtml(tex) {
	return `<span class="math-fallback">${escapeHtml(latexFallback(tex))}</span>`;
}
function renderSegment(tex, display) {
	const src = tex.trim();
	if (!src) return "";
	try {
		const html = katex.renderToString(src, {
			...KATEX_OPTIONS,
			displayMode: display
		});
		if (html.includes("katex-error")) {
			console.warn("[math] unsupported latex, using fallback", { tex: src });
			return fallbackHtml(src);
		}
		return html;
	} catch (err) {
		console.error("[math] render failed", {
			tex: src,
			err
		});
		return fallbackHtml(src);
	}
}
var COMMAND = String.raw`\\[a-zA-Z]+\*?(?:\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})*(?:\s*\[[^\]]*\])?`;
var ESCAPED = String.raw`\\[{}()\[\]|$&%#_^]`;
var SCRIPT = String.raw`[A-Za-z0-9\)\]\}][\^_](?:\{[^{}]*\}|[A-Za-z0-9+\-]+)`;
var TOKEN = new RegExp(`${COMMAND}|${ESCAPED}|${SCRIPT}`, "g");
var GAP = /^[\s+\-=*/^_(),.]{0,4}$/;
/** Renders bare LaTeX found inside otherwise plain text. */
function renderPlain(text, preserve) {
	const plainText = (s) => preserve ? escapeHtml(s) : escapeHtml(s).replace(/\n/g, "<br/>");
	if (!hasRawLatex(text)) return plainText(text);
	const matches = [...text.matchAll(TOKEN)];
	if (matches.length === 0) return plainText(text);
	const spans = [];
	for (const m of matches) {
		const start = m.index ?? 0;
		const end = start + m[0].length;
		const last = spans[spans.length - 1];
		if (last && GAP.test(text.slice(last.end, start))) last.end = end;
		else spans.push({
			start,
			end
		});
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
var DELIMS = [
	[
		"$$",
		"$$",
		true
	],
	[
		"\\[",
		"\\]",
		true
	],
	[
		"\\(",
		"\\)",
		false
	],
	[
		"$",
		"$",
		false
	]
];
function mathToHtml(input, preserveWhitespace = false) {
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
		for (const [open, close, display] of DELIMS) if (src.startsWith(open, i)) {
			const end = src.indexOf(close, i + open.length);
			if (end > -1) {
				flush();
				out += renderSegment(src.slice(i + open.length, end), display);
				i = end + close.length;
				matched = true;
				break;
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
var HTML_CACHE = /* @__PURE__ */ new Map();
var HTML_CACHE_MAX = 800;
function cachedHtml(src, preserve) {
	const key = preserve ? `\u0001${src}` : src;
	const hit = HTML_CACHE.get(key);
	if (hit !== void 0) return hit;
	let html;
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
var MathText = (0, import_react.memo)(function MathText({ children, className, as: Tag = "div", preserveWhitespace = false, style }) {
	const html = (0, import_react.useMemo)(() => cachedHtml(children ?? "", preserveWhitespace), [children, preserveWhitespace]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className: cn("math-content leading-relaxed", preserveWhitespace && "whitespace-pre-wrap", className),
		style,
		dangerouslySetInnerHTML: { __html: html }
	});
});
//#endregion
export { mathToHtml as n, MathText as t };
