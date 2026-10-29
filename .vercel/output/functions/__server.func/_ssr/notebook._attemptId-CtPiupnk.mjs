import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as NotebookPen } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { T as getAttempt, U as noteKey, z as listNotes } from "./db-CAmn2mwk.mjs";
import { r as buildReport } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as ReviewList } from "./ReviewList-1RqSeOyz.mjs";
import { t as NoteEditor } from "./NoteEditor-uBuyijsy.mjs";
import { t as originMap } from "./origin-D_pjfRaL.mjs";
import { t as Route } from "./notebook._attemptId-Do6gQ6Dn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notebook._attemptId-CtPiupnk.js
var import_jsx_runtime = require_jsx_runtime();
function NotebookAttempt() {
	const { attemptId } = Route.useParams();
	const q = useQuery({
		queryKey: ["notebook", attemptId],
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
		children: "Loading mistakes…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/notebook",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to notebook"
	})] });
	const { report, notes, sources } = q.data;
	const items = report.summary.perQuestion.filter((p) => p.status === "wrong").map((p) => ({
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-5" }),
					" ",
					report.attempt.testName
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [items.length, " wrong questions"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/notebook",
			className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
			children: "All tests"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
		items,
		sources,
		statuses: ["all"],
		paletteTitle: "Wrong Questions",
		emptyText: "No wrong questions for this subject.",
		renderFooter: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteEditor, {
			attemptId,
			questionId: r.question.id,
			mode: "wrong",
			initial: notes.find((n) => n.id === noteKey(attemptId, r.question.id))
		})
	})] });
}
//#endregion
export { NotebookAttempt as component };
