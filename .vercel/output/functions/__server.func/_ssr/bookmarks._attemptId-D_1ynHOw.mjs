import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Mt as Bookmark } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { T as getAttempt, U as noteKey, z as listNotes } from "./db-CAmn2mwk.mjs";
import { r as buildReport } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as ReviewList } from "./ReviewList-1RqSeOyz.mjs";
import { t as Route } from "./bookmarks._attemptId-BQJZNdxW.mjs";
import { t as NTA_BOOKMARK_CATEGORIES } from "./nta-review-DZoU1Y7j.mjs";
import { t as NoteEditor } from "./NoteEditor-uBuyijsy.mjs";
import { t as originMap } from "./origin-D_pjfRaL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookmarks._attemptId-D_1ynHOw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookmarksAttempt() {
	const { attemptId } = Route.useParams();
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const q = useQuery({
		queryKey: ["bookmarks", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const [report, notes] = await Promise.all([buildReport(attempt), listNotes(attemptId)]);
			return {
				report,
				notes,
				sources: await originMap(report.questions.map((q) => q.id))
			};
		},
		retry: false
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading bookmarks…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/bookmarks",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to bookmarks"
	})] });
	const { report, notes, sources } = q.data;
	const allItems = report.summary.perQuestion.filter((p) => p.answer?.bookmarked).map((p) => ({
		question: p.question,
		answer: p.answer,
		status: p.status,
		score: p.score
	}));
	const items = report.attempt.mode === "nta" && categoryFilter !== "all" ? allItems.filter((item) => item.answer?.tag === categoryFilter) : allItems;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "flex items-center gap-2 truncate text-2xl font-bold tracking-tight",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }),
						" ",
						report.attempt.testName
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [items.length, " bookmarked questions"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/bookmarks",
				className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
				children: "All tests"
			})]
		}),
		report.attempt.mode === "nta" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCategoryFilter("all"),
				className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
				children: [
					"All categories (",
					allItems.length,
					")"
				]
			}), NTA_BOOKMARK_CATEGORIES.map((category) => {
				const count = allItems.filter((item) => item.answer?.tag === category).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCategoryFilter(category),
					className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === category ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
					children: [
						category,
						" (",
						count,
						")"
					]
				}, category);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
			items,
			sources,
			statuses: [
				"all",
				"correct",
				"wrong",
				"skipped"
			],
			paletteTitle: "Bookmarked",
			emptyText: "No bookmarked questions for this filter.",
			renderFooter: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [report.attempt.mode === "nta" && r.answer?.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary",
					children: r.answer.tag
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteEditor, {
					attemptId,
					questionId: r.question.id,
					mode: "bookmark",
					initial: notes.find((n) => n.id === noteKey(attemptId, r.question.id))
				})]
			})
		})
	] });
}
//#endregion
export { BookmarksAttempt as component };
