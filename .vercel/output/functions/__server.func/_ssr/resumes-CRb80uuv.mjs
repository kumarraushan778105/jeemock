import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { s as formatClock } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { St as CirclePlay, _t as Clock3, l as Trash2 } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { F as listAttempts, u as deleteAttempt } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DkEF5Esg.mjs";
import { i as isResumable, n as attemptStatus, t as STATUS_LABEL } from "./status-ChWuIqI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resumes-CRb80uuv.js
var import_jsx_runtime = require_jsx_runtime();
function ResumeTestsPage() {
	const qc = useQueryClient();
	const router = useRouter();
	const { data: attempts = [], isLoading } = useQuery({
		queryKey: ["attempts"],
		queryFn: listAttempts,
		refetchOnMount: "always"
	});
	const resumable = attempts.filter(isResumable);
	const remove = useMutation({
		mutationFn: async (id) => {
			await deleteAttempt(id);
			return id;
		},
		onSuccess: (id) => {
			qc.setQueryData(["attempts"], (current) => (current ?? []).filter((attempt) => attempt.id !== id));
			qc.invalidateQueries({ queryKey: ["attempts"] });
			toast.success("Resumed test deleted");
		},
		onError: () => toast.error("Unable to delete resumed test")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border bg-card p-6 shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
						children: "Resume Tests"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-2xl font-semibold tracking-tight",
						children: "Pick up where you left off"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: "All in-progress and draft attempts live here so you can resume them without cluttering the dashboard."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4" }),
						resumable.length,
						" ",
						resumable.length === 1 ? "attempt" : "attempts"
					]
				})]
			})
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed bg-card/60 p-10 text-center text-sm text-muted-foreground",
			children: "Loading resumed tests…"
		}) : resumable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed bg-card/60 p-10 text-center text-sm text-muted-foreground",
			children: "No resumed tests available"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: resumable.map((attempt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate text-base font-semibold",
								children: attempt.testName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning",
								children: STATUS_LABEL[attemptStatus(attempt)]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								attempt.questionIds.length,
								" questions • started",
								" ",
								new Date(attempt.startedAt).toLocaleString()
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 rounded-lg bg-warning/10 px-2.5 py-1 text-sm font-semibold text-warning",
						children: formatClock(attempt.remainingSec)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => router.navigate({
							to: "/test/$attemptId",
							params: { attemptId: attempt.id }
						}),
						className: "inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4" }), " Resume"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete resumed test?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Are you sure you want to delete this resumed test?" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: () => remove.mutate(attempt.id),
						children: "Delete"
					})] })] })] })]
				})]
			}, attempt.id))
		})]
	}) });
}
//#endregion
export { ResumeTestsPage as component };
