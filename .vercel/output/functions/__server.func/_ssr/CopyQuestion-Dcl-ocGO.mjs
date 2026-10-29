import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as numericAnswerLabel, h as matrixAnswerLabel, m as isNumericType, n as QUESTION_TYPE_LABEL, o as cn, p as isMultiCorrect, v as optionIds } from "./xp-CqT-O4I5.mjs";
import { Dt as Check, Et as ChevronDown, yt as ClipboardCopy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CopyQuestion-Dcl-ocGO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COPY_MODE_LABEL = {
	question: "Question + Options",
	answer: "Question + Options + Answer",
	full: "Complete Question + Solution"
};
var BULK_COPY_MODE_LABEL = {
	"questions-options-answer": "Questions + Options + Answer",
	"questions-options": "Questions + Options",
	"questions-only": "Questions Only",
	"answers-only": "Answers Only"
};
var IMAGE_NOTE = "Note: This question contains an uploaded image. Verify using the attached image.";
/** Plain-text table for match-the-following questions, preserving rows/columns. */
function matrixText(q) {
	if (!q.matrix) return [];
	const { left, right } = q.matrix;
	const rows = Math.max(left.length, right.length);
	const out = ["Column I | Column II"];
	for (let i = 0; i < rows; i++) {
		const l = left[i] ? `${i + 1}. ${left[i]}` : "";
		const r = right[i] ? `${String.fromCharCode(65 + i)}. ${right[i]}` : "";
		out.push(`${l} | ${r}`);
	}
	return out;
}
function htmlToText(html) {
	return html.replace(/<\s*(br|\/tr)\s*\/?>/gi, "\n").replace(/<\s*\/(td|th)\s*>/gi, " | ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]+\n/g, "\n").trim();
}
function answerValueText(q) {
	if (isNumericType(q.type)) return numericAnswerLabel(q);
	if (q.matrix) return matrixAnswerLabel(q);
	return q.correct.map(String).join(", ") || "—";
}
function answerLine(q) {
	if (isNumericType(q.type)) return `Answer: ${numericAnswerLabel(q)}`;
	if (q.matrix) return `Answer: ${matrixAnswerLabel(q)}`;
	return `${isMultiCorrect(q) ? "Answer (multiple correct)" : "Answer"}: ${answerValueText(q)}`;
}
function stripQuestionOptions(text) {
	return text.split("\n").filter((rawLine) => {
		const line = rawLine.trim();
		if (!line) return true;
		if (/^\([A-Z0-9]\)\s/.test(line)) return false;
		if (line === "(Numerical answer)") return false;
		return true;
	}).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
/**
* Builds an AI-verification-friendly plain-text version of a question.
* Math/chemistry stay as their original LaTeX, so symbols, sub/superscripts and
* unicode survive the round trip into ChatGPT / Gemini / Claude.
*/
function questionToText(q, mode) {
	const lines = [];
	const meta = [
		q.subject,
		q.chapter,
		q.topic,
		QUESTION_TYPE_LABEL[q.type],
		q.difficulty
	].filter(Boolean).join(" · ");
	lines.push(`[${meta}]`);
	lines.push(`Q${q.number}.`);
	if (q.paragraph?.trim()) lines.push(q.paragraph.trim(), "");
	if (q.text?.trim()) lines.push(q.text.trim());
	if (q.tableHtml?.trim()) lines.push("", htmlToText(q.tableHtml));
	if (q.matrix) lines.push("", ...matrixText(q));
	if (!isNumericType(q.type) && !q.matrix && q.options.length) {
		const ids = optionIds(q);
		lines.push("");
		q.options.forEach((o, i) => lines.push(`(${ids[i]}) ${o.text}`));
	}
	if (isNumericType(q.type)) lines.push("", "(Numerical answer)");
	if (mode !== "question") lines.push("", answerLine(q));
	if (mode === "full") {
		if (q.solution?.trim()) lines.push("", `Solution: ${q.solution.trim()}`);
		if (q.explanation?.trim()) lines.push("", `Explanation: ${q.explanation.trim()}`);
		if (q.formula?.trim()) lines.push("", `Formula: ${q.formula.trim()}`);
		if (q.concept?.trim()) lines.push("", `Concept: ${q.concept.trim()}`);
	}
	if (q.images.length > 0) lines.push("", IMAGE_NOTE);
	return lines.join("\n");
}
function bulkQuestionToText(questions, mode) {
	return questions.map((question) => {
		switch (mode) {
			case "questions-options-answer": return questionToText(question, "answer");
			case "questions-options": return questionToText(question, "question");
			case "questions-only": return stripQuestionOptions(questionToText(question, "question"));
			case "answers-only": return `Q${question.number}. ${answerValueText(question)}`;
			default: return questionToText(question, "answer");
		}
	}).filter(Boolean).join("\n\n");
}
var MODES = [
	"question",
	"answer",
	"full"
];
/**
* "Copy Question" for AI verification (ChatGPT / Gemini / Claude).
* Never rendered inside the live test screen.
*/
function CopyQuestion({ question, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	const box = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e) => {
			if (!box.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [open]);
	const copy = async (mode) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: box,
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			title: "Copy this question for AI verification",
			className: "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent",
			children: [
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: "size-3.5" }),
				"Copy Question",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3 transition-transform", open && "rotate-180") })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 z-50 mt-1 w-60 overflow-hidden rounded-lg border bg-card shadow-lg",
			children: [MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => copy(m),
				className: "block w-full px-3 py-2 text-left text-xs hover:bg-accent",
				children: COPY_MODE_LABEL[m]
			}, m)), question.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t px-3 py-2 text-[10px] text-muted-foreground",
				children: "Image question — the copy includes a note to attach the image."
			})]
		})]
	});
}
//#endregion
export { CopyQuestion as n, bulkQuestionToText as r, BULK_COPY_MODE_LABEL as t };
