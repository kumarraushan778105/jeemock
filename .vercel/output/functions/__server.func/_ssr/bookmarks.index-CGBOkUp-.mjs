import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Mt as Bookmark } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { t as allReports } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as NTA_BOOKMARK_CATEGORIES } from "./nta-review-DZoU1Y7j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookmarks.index-CGBOkUp-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookmarksIndex() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const allRows = (reports.data ?? []).map((report) => {
		const categoryCounts = {};
		for (const category of NTA_BOOKMARK_CATEGORIES) categoryCounts[category] = report.summary.perQuestion.filter((item) => item.answer?.bookmarked && item.answer.tag === category).length;
		return {
			id: report.attempt.id,
			name: report.attempt.testName,
			when: report.attempt.submittedAt ?? report.attempt.updatedAt,
			count: report.summary.perQuestion.filter((item) => item.answer?.bookmarked).length,
			total: report.questions.length,
			isNta: report.attempt.mode === "nta",
			categoryCounts
		};
	}).filter((row) => row.count > 0).sort((a, b) => b.when - a.when);
	const rows = categoryFilter === "all" ? allRows : allRows.filter((row) => row.isNta && (row.categoryCounts[categoryFilter] ?? 0) > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }), " Bookmarks"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Pick a test to review only its bookmarked questions."
		}),
		allRows.some((row) => row.isNta) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCategoryFilter("all"),
				className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
				children: "All categories"
			}), NTA_BOOKMARK_CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCategoryFilter(category),
				className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === category ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
				children: category
			}, category))]
		}),
		reports.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		!reports.isLoading && allRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "Nothing bookmarked yet — tap the bookmark icon while taking a test."
		}) : !reports.isLoading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "No bookmarks in this category yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-2",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/bookmarks/$attemptId",
				params: { attemptId: r.id },
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-semibold",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							new Date(r.when).toLocaleString(),
							" · ",
							r.total,
							" questions"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary",
					children: [
						r.count,
						" Bookmark",
						r.count === 1 ? "" : "s"
					]
				})]
			}) }, r.id))
		})
	] });
}
//#endregion
export { BookmarksIndex as component };
