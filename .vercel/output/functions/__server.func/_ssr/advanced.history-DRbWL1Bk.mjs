import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { F as listAttempts, u as deleteAttempt } from "./db-CAmn2mwk.mjs";
import { r as buildReport } from "./stats-B0uMixd3.mjs";
import { a as arrangeBySubject, d as isAdvancedAttempt } from "./advanced-D6ylZ9Tw.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as startAdvancedTest } from "./advanced-start-29FkmR0D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.history-DRbWL1Bk.js
var import_jsx_runtime = require_jsx_runtime();
function AdvancedHistory() {
	const router = useRouter();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["adv", "history-list"],
		queryFn: async () => {
			const attempts = (await listAttempts()).filter(isAdvancedAttempt);
			return Promise.all(attempts.map(async (a) => ({
				a,
				report: a.submitted ? await buildReport(a) : null
			})));
		}
	});
	const del = useMutation({
		mutationFn: (id) => deleteAttempt(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["adv"] });
			qc.invalidateQueries({ queryKey: ["attempts"] });
			toast.success("Deleted");
		}
	});
	const reattempt = useMutation({
		mutationFn: async (a) => {
			const questions = a.questionsSnapshot ?? [];
			if (questions.length === 0) throw new Error("Original questions are no longer available.");
			return (await startAdvancedTest({
				name: `${a.testName} (Re-attempt)`,
				questions: arrangeBySubject(questions),
				durationMin: Math.round(a.durationSec / 60),
				paper: a.paper,
				reattemptOf: a.id
			})).id;
		},
		onSuccess: (id) => router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: id }
		}),
		onError: (e) => toast.error(e.message)
	});
	const rows = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Previous Tests",
		subtitle: "All JEE Advanced attempts — in progress and completed.",
		children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border bg-card p-6 text-sm text-muted-foreground",
			children: "No Advanced tests yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: rows.map(({ a, report }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[180px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: a.testName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								new Date(a.submittedAt ?? a.updatedAt).toLocaleString(),
								" · ",
								a.questionIds.length,
								" ",
								"questions",
								a.paper ? ` · Paper ${a.paper}` : ""
							]
						})]
					}),
					report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-base",
								children: report.summary.score
							}), " marks"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-status-answered",
								children: [report.summary.correct, " correct"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-destructive",
								children: [report.summary.wrong, " wrong"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [report.summary.accuracy.toFixed(1), "% accuracy"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase text-primary",
						children: "In progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [a.submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => router.navigate({
								to: "/result/$attemptId",
								params: { attemptId: a.id }
							}),
							className: "rounded-md border px-3 py-1.5 text-xs font-semibold",
							children: "Review"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => reattempt.mutate(a),
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
							children: "Re-attempt"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => router.navigate({
								to: "/test/$attemptId",
								params: { attemptId: a.id }
							}),
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
							children: "Resume"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => del.mutate(a.id),
							className: "rounded-md border px-3 py-1.5 text-xs font-semibold text-destructive",
							children: "Delete"
						})]
					})
				]
			}, a.id))
		})]
	});
}
//#endregion
export { AdvancedHistory as component };
