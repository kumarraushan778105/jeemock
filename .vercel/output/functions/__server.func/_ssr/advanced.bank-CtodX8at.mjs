import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as QUESTION_TYPE_LABEL, o as cn } from "./xp-CqT-O4I5.mjs";
import { y as Search } from "../_libs/lucide-react.mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { n as advancedContext, u as filterAdvanced } from "./advanced-D6ylZ9Tw.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as MathText } from "./MathText-DrvVO8lf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.bank-CtodX8at.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 40;
function AdvancedBank() {
	const { data } = useQuery({
		queryKey: ["adv", "ctx"],
		queryFn: advancedContext
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)(null);
	const [chapter, setChapter] = (0, import_react.useState)(null);
	const [chapterSearch, setChapterSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const filters = (0, import_react.useMemo)(() => ({
		search,
		subjects: subject ? [subject] : void 0,
		chapters: chapter ? [chapter] : void 0
	}), [
		search,
		subject,
		chapter
	]);
	const results = (0, import_react.useMemo)(() => data ? filterAdvanced(data.index, filters, data.history) : [], [data, filters]);
	const chapters = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const it of data?.pool ?? []) {
			if (subject && it.q.subject !== subject) continue;
			m.set(it.q.chapter || "General", (m.get(it.q.chapter || "General") ?? 0) + 1);
		}
		return [...m.entries()].sort((a, b) => b[1] - a[1]);
	}, [data, subject]);
	const shown = results.slice(0, page * PAGE);
	const visibleChapters = (0, import_react.useMemo)(() => {
		const term = chapterSearch.trim().toLowerCase();
		return chapters.filter(([name]) => name.toLowerCase().includes(term));
	}, [chapters, chapterSearch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Advanced Question Bank",
		subtitle: "Only JEE Advanced sets are shown here. Your JEE Main bank stays exactly as it is.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: search,
				onChange: (e) => {
					setSearch(e.target.value);
					setPage(1);
				},
				placeholder: "Search questions, chapters, topics…",
				className: "min-w-[220px] flex-1 rounded-lg border bg-background px-3 py-2 text-sm"
			}), [null, ...data?.index.subjects ?? []].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					setSubject(s);
					setChapter(null);
					setPage(1);
				},
				className: cn("rounded-full border px-3 py-1.5 text-xs font-semibold", subject === s ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: s ?? "All subjects"
			}, String(s)))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-[240px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-fit rounded-xl border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-bold uppercase text-muted-foreground",
						children: "Chapters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: chapterSearch,
							onChange: (e) => setChapterSearch(e.target.value),
							placeholder: "Search chapter...",
							className: "w-full rounded-lg border bg-surface py-2 pr-3 pl-9 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "scroll-slim mt-2 max-h-[520px] space-y-1 overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setChapter(null),
							className: cn("w-full rounded-md px-2 py-1.5 text-left text-xs", chapter === null ? "bg-primary text-primary-foreground" : "hover:bg-accent"),
							children: "All chapters"
						}), visibleChapters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-2 text-xs text-muted-foreground",
							children: "No chapters found"
						}) : visibleChapters.map(([c, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setChapter(c);
								setPage(1);
							},
							className: cn("flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs", chapter === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: c
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-70",
								children: n
							})]
						}, c))]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						results.length,
						" question(s) · showing ",
						shown.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: shown.map(({ q, paper, year, test }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-primary/10 px-1.5 py-0.5 text-primary",
									children: ["Paper ", paper]
								}),
								year && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: q.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: q.chapter
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: QUESTION_TYPE_LABEL[q.type]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: q.difficulty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate opacity-60",
									children: test.name
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 line-clamp-3 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: q.text })
						})]
					}, q.id))
				}),
				shown.length < results.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPage((p) => p + 1),
					className: "mt-3 w-full rounded-lg border py-2 text-sm font-semibold",
					children: "Load more"
				})
			] })]
		})]
	});
}
//#endregion
export { AdvancedBank as component };
