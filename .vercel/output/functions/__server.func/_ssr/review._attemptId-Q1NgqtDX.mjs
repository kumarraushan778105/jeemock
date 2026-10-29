import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { vt as ClipboardList } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { T as getAttempt } from "./db-CAmn2mwk.mjs";
import { r as buildReport } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as ReviewList } from "./ReviewList-1RqSeOyz.mjs";
import { t as originMap } from "./origin-D_pjfRaL.mjs";
import { t as Route } from "./review._attemptId-B-aMgfhl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review._attemptId-Q1NgqtDX.js
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const { attemptId } = Route.useParams();
	const q = useQuery({
		queryKey: ["review", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const report = await buildReport(attempt);
			const sources = await originMap(report.questions.map((q) => q.id));
			return {
				...report,
				sources
			};
		},
		retry: false
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading review…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/results",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to history"
	})] });
	const { attempt, summary, sources } = q.data;
	const items = summary.perQuestion.map((p) => ({
		question: p.question,
		answer: p.answer,
		status: p.status,
		score: p.score
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex items-center gap-2 truncate text-2xl font-bold tracking-tight",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
					" ",
					attempt.testName
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Full test review · ",
					summary.correct,
					" correct · ",
					summary.wrong,
					" wrong · ",
					summary.skipped,
					" ",
					"not attempted"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/result/$attemptId",
			params: { attemptId },
			className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
			children: "Score analysis"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
		items,
		sources
	})] });
}
//#endregion
export { ReviewPage as component };
