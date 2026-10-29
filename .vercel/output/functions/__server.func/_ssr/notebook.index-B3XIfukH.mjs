import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as NotebookPen } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { t as allReports } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notebook.index-B3XIfukH.js
var import_jsx_runtime = require_jsx_runtime();
function NotebookIndex() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const rows = (reports.data ?? []).map((r) => ({
		id: r.attempt.id,
		name: r.attempt.testName,
		when: r.attempt.submittedAt ?? r.attempt.updatedAt,
		wrong: r.summary.wrong,
		total: r.questions.length
	})).filter((r) => r.wrong > 0).sort((a, b) => b.when - a.when);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-5" }), " Wrong Notebook"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Pick a test to review only the questions you got wrong."
		}),
		reports.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		!reports.isLoading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "No mistakes recorded yet — submit a test to build your notebook."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-2",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/notebook/$attemptId",
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
					className: "rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive",
					children: [r.wrong, " Wrong"]
				})]
			}) }, r.id))
		})
	] });
}
//#endregion
export { NotebookIndex as component };
