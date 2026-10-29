import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { s as formatClock } from "./xp-CqT-O4I5.mjs";
import { b as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as RotateCcw, a as Trophy, l as Trash2 } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { u as deleteAttempt } from "./db-CAmn2mwk.mjs";
import { n as asTest, t as allReports } from "./stats-B0uMixd3.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-CIxK6tzd.js
var import_jsx_runtime = require_jsx_runtime();
function ResultsPage() {
	const qc = useQueryClient();
	const router = useRouter();
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const rows = [...reports.data ?? []].sort((a, b) => (b.attempt.submittedAt ?? b.attempt.updatedAt) - (a.attempt.submittedAt ?? a.attempt.updatedAt));
	const remove = async (id) => {
		await deleteAttempt(id);
		qc.invalidateQueries({ queryKey: ["reports"] });
		qc.invalidateQueries({ queryKey: ["attempts"] });
		qc.invalidateQueries({ queryKey: ["dashboardStats"] });
	};
	/** Starts the same paper again as a brand-new attempt; past attempts stay untouched. */
	const reattempt = async ({ attempt: a, questions }) => {
		if (questions.length === 0) return toast.error("Original questions are no longer available.");
		const fresh = await startAttempt(asTest(questions, a), {
			questions,
			durationMin: Math.round(a.durationSec / 60),
			name: a.testName,
			exam: a.exam,
			paper: a.paper,
			reattemptOf: a.id,
			strictMode: a.strictMode
		});
		qc.invalidateQueries({ queryKey: ["attempts"] });
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: fresh.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5" }), " Test History"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Every completed attempt is stored permanently on this device."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [
				reports.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Loading history…"
				}),
				!reports.isLoading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
					children: "No completed attempts yet. Submitted tests appear here automatically."
				}),
				rows.map((report) => {
					const { attempt: a, summary: s, questions } = report;
					const pct = s.maxScore ? s.score / s.maxScore * 100 : 0;
					const subjects = [...new Set(questions.map((q) => q.subject))];
					const chapters = [...new Set(questions.map((q) => q.chapter))];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/review/$attemptId",
										params: { attemptId: a.id },
										className: "truncate text-base font-semibold hover:underline",
										children: a.testName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											new Date(a.submittedAt ?? a.updatedAt).toLocaleString(),
											" · ",
											questions.length,
											" ",
											"questions · ",
											subjects.join(", ") || "—"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 truncate text-[11px] text-muted-foreground",
										children: [
											"Chapters: ",
											chapters.slice(0, 6).join(", "),
											chapters.length > 6 ? ` +${chapters.length - 6} more` : ""
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/review/$attemptId",
										params: { attemptId: a.id },
										className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
										children: "Full Test Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/result/$attemptId",
										params: { attemptId: a.id },
										className: "rounded-md border px-3 py-1.5 text-xs font-semibold",
										children: "Analysis"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => void reattempt(report),
										className: "flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Reattempt Test"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(a.id),
										className: "rounded-md border border-destructive/40 p-1.5 text-destructive",
										"aria-label": "Delete attempt",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Marks",
									value: `${s.score}/${s.maxScore}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Percentage",
									value: `${pct.toFixed(1)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Accuracy",
									value: `${s.accuracy.toFixed(1)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Correct",
									value: s.correct,
									tone: "good"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Wrong",
									value: s.wrong,
									tone: "bad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Not attempted",
									value: s.skipped
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Negative",
									value: s.negative,
									tone: "bad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Time taken",
									value: formatClock(a.durationSec - a.remainingSec)
								})
							]
						})]
					}, a.id);
				})
			]
		})
	] });
}
function Cell({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-bold tabular-nums " + (tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : ""),
			children: value
		})]
	});
}
//#endregion
export { ResultsPage as component };
