import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as numericAnswerLabel, o as cn, s as formatClock } from "./xp-CqT-O4I5.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { lt as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as MathText } from "./MathText-DrvVO8lf.mjs";
import { t as QuestionView } from "./QuestionView-C1bo6bV-.mjs";
import { n as CopyQuestion } from "./CopyQuestion-Dcl-ocGO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ReviewList-1RqSeOyz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABEL = {
	all: "All",
	correct: "Correct",
	wrong: "Wrong",
	skipped: "Not Attempted",
	bookmarked: "Bookmarked"
};
var SUBJECT_ORDER = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
function answerText(q, value) {
	if (value === null || value === void 0) return "Not attempted";
	const v = Array.isArray(value) ? value.join(", ") : String(value);
	return v.trim() === "" ? "Not attempted" : v;
}
function correctText(q) {
	if (q.type === "integer" || q.type === "numerical") return numericAnswerLabel(q);
	return q.correct.join(", ") || "—";
}
var dotClass = (s) => s === "correct" ? "bg-answered text-answered-foreground" : s === "wrong" ? "bg-notanswered text-notanswered-foreground" : "bg-notvisited text-notvisited-foreground";
/**
* Single-page review list with a sticky question palette and combined
* status + subject filters. Used by Full Test Review, Wrong Notebook and Bookmarks.
*/
function ReviewList({ items, statuses = [
	"all",
	"correct",
	"wrong",
	"skipped",
	"bookmarked"
], paletteTitle = "Question Palette", emptyText = "No questions in this filter.", renderFooter, sources }) {
	const [status, setStatus] = (0, import_react.useState)("all");
	const [subject, setSubject] = (0, import_react.useState)("All");
	const nodes = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const subjects = (0, import_react.useMemo)(() => {
		return ["All", ...[...new Set(items.map((i) => i.question.subject))].sort((a, b) => SUBJECT_ORDER.indexOf(a) - SUBJECT_ORDER.indexOf(b))];
	}, [items]);
	const visible = (0, import_react.useMemo)(() => items.filter((i) => {
		const okSubject = subject === "All" || i.question.subject === subject;
		const okStatus = status === "all" ? true : status === "bookmarked" ? Boolean(i.answer?.bookmarked) : i.status === status;
		return okSubject && okStatus;
	}), [
		items,
		status,
		subject
	]);
	const jump = (id) => {
		const el = nodes.current.get(id);
		if (!el) return;
		el.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 order-2 lg:order-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: statuses.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStatus(f),
						className: cn("rounded-full border px-3 py-1 text-xs font-medium", status === f ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: STATUS_LABEL[f]
					}, f))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1.5",
					children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSubject(s),
						className: cn("rounded-lg border px-3 py-1 text-xs font-semibold", subject === s ? "border-primary bg-primary/10 text-primary" : "bg-card"),
						children: s === "All" ? "All Subjects" : s
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						"Showing ",
						visible.length,
						" of ",
						items.length,
						" question",
						items.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-4",
					children: [visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: emptyText
					}), visible.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						ref: (el) => {
							if (el) nodes.current.set(r.question.id, el);
							else nodes.current.delete(r.question.id);
						},
						className: "scroll-mt-20 rounded-2xl border bg-card p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-xs font-semibold text-muted-foreground",
										children: [
											"Q",
											r.question.number || i + 1,
											" · ",
											r.question.subject,
											" ·",
											" ",
											formatClock(r.answer?.timeSpent ?? 0),
											" spent"
										]
									}), sources?.[r.question.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/bank",
										search: {
											edit: sources[r.question.id].testId,
											q: r.question.id
										},
										title: "Open this question in the Question Bank",
										className: "mt-1 inline-flex max-w-full items-center gap-1 truncate text-[11px] font-medium text-primary underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: [
												sources[r.question.id].testName,
												" · Q",
												sources[r.question.id].number
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: ["Source set unavailable · ID ", r.question.id]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyQuestion, { question: r.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("rounded-full px-2.5 py-1 text-[11px] font-bold capitalize", dotClass(r.status)),
										children: [r.status === "skipped" ? "not attempted" : r.status, typeof r.score === "number" ? ` ${r.score > 0 ? `+${r.score}` : r.score}` : ""]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
								question: r.question,
								value: r.answer?.value ?? null,
								readOnly: true,
								showAnswer: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-2 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground",
										children: "Your answer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
										className: cn("text-sm font-semibold", r.status === "correct" && "text-success", r.status === "wrong" && "text-destructive"),
										children: answerText(r.question, r.answer?.value ?? null)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground",
										children: "Correct answer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
										className: "text-sm font-semibold text-success",
										children: correctText(r.question)
									})]
								})]
							}),
							renderFooter?.(r)
						]
					}, r.question.id))]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "order-1 lg:order-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-[70px] rounded-2xl border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold uppercase tracking-wide",
						children: paletteTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-6 gap-1.5 lg:grid-cols-5",
						children: visible.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => jump(r.question.id),
							title: `${r.question.subject} · ${r.status}`,
							className: cn("grid h-8 place-items-center rounded-md text-xs font-bold", dotClass(r.status)),
							children: r.question.number || i + 1
						}, r.question.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-1 text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								cls: "bg-answered",
								label: "Correct"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								cls: "bg-notanswered",
								label: "Wrong"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								cls: "bg-notvisited",
								label: "Not attempted"
							})
						]
					})
				]
			})
		})]
	});
}
function Legend({ cls, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3 rounded", cls) }),
			" ",
			label
		]
	});
}
//#endregion
export { correctText as n, ReviewList as t };
