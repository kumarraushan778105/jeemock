import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { F as listAttempts, at as uid, u as deleteAttempt } from "./db-CAmn2mwk.mjs";
import { a as arrangeBySubject, d as isAdvancedAttempt, h as subjectBlocks, n as advancedContext, p as pickBalanced } from "./advanced-D6ylZ9Tw.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAdvancedTest } from "./advanced-start-29FkmR0D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.index-DtZfr59M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdvancedHome() {
	const router = useRouter();
	const qc = useQueryClient();
	const [mode, setMode] = (0, import_react.useState)("full");
	const [allowRepeat, setAllowRepeat] = (0, import_react.useState)(false);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const { data } = useQuery({
		queryKey: ["adv", "ctx"],
		queryFn: advancedContext
	});
	const { data: attempts } = useQuery({
		queryKey: ["attempts"],
		queryFn: async () => (await listAttempts()).filter(isAdvancedAttempt)
	});
	const pool = data?.pool ?? [];
	const used = data?.history.used ?? /* @__PURE__ */ new Set();
	const fresh = (0, import_react.useMemo)(() => pool.filter((i) => !used.has(i.q.id)), [pool, used]);
	const resumables = (attempts ?? []).filter((a) => !a.submitted);
	const completed = (attempts ?? []).filter((a) => a.submitted).slice(0, 6);
	const start = useMutation({
		mutationFn: async (opts) => {
			if (pool.length === 0) throw new Error("Import a JEE Advanced set first.");
			const groupId = uid("grp");
			const papers = mode === "full" ? [1, 2] : mode === "p1" ? [1] : [2];
			let firstId = "";
			for (const p of papers) {
				const scoped = pool.filter((i) => i.paper === p);
				const questions = pickBalanced(scoped.length >= 18 ? scoped : pool, 18, {
					allowRepeat,
					used
				});
				if (questions.length === 0) throw new Error("No unused questions left — allow repeats.");
				const att = await startAdvancedTest({
					name: `JEE Advanced ${mode === "full" ? "Full Test" : ""} Paper ${p}`.replace(/\s+/g, " "),
					questions: arrangeBySubject(questions),
					durationMin: 180,
					paper: p,
					paperGroupId: mode === "full" ? groupId : void 0,
					strictMode: opts?.strictMode
				});
				if (!firstId) firstId = att.id;
			}
			return firstId;
		},
		onSuccess: (id) => {
			qc.invalidateQueries({ queryKey: ["attempts"] });
			router.navigate({
				to: "/test/$attemptId",
				params: { attemptId: id }
			});
		},
		onError: (e) => toast.error(e.message)
	});
	const launch = async () => {
		setPendingLaunch(() => async (selectedMode) => {
			const id = await start.mutateAsync({
				mode: selectedMode,
				strictMode: selectedMode === "strict"
			});
			if (id) {
				qc.invalidateQueries({ queryKey: ["attempts"] });
				router.navigate({
					to: "/test/$attemptId",
					params: { attemptId: id }
				});
			}
		});
		setModePickerOpen(true);
	};
	const handleModeSelect = async (selectedMode) => {
		const decision = await prepareStartMode(selectedMode, {
			fullscreenSupported: !!document.fullscreenEnabled,
			isFullscreen: !!document.fullscreenElement,
			requestFullscreen: async () => {
				try {
					await document.documentElement.requestFullscreen();
					return true;
				} catch {
					return false;
				}
			}
		});
		if (!decision.ok) {
			toast.error(decision.error);
			return;
		}
		if (pendingLaunch) {
			const currentLaunch = pendingLaunch;
			setPendingLaunch(null);
			await currentLaunch(selectedMode);
		}
	};
	const del = useMutation({
		mutationFn: (id) => deleteAttempt(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["attempts"] });
			qc.invalidateQueries({ queryKey: ["adv"] });
			toast.success("Resume deleted — those questions are available again");
		}
	});
	const reattempt = useMutation({
		mutationFn: async (attemptId) => {
			const a = (await listAttempts()).find((x) => x.id === attemptId);
			if (!a) throw new Error("Attempt not found");
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
		onSuccess: (id) => {
			qc.invalidateQueries({ queryKey: ["attempts"] });
			router.navigate({
				to: "/test/$attemptId",
				params: { attemptId: id }
			});
		},
		onError: (e) => toast.error(e.message)
	});
	const preview = (0, import_react.useMemo)(() => subjectBlocks(arrangeBySubject(fresh.slice(0, 54).map((i) => i.q))), [fresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Advanced Overview",
		subtitle: "Generate a full Paper 1 + Paper 2 test, single papers, or continue where you left off. Questions used in completed tests are never repeated unless you allow it.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-4",
				children: [
					["Advanced questions", pool.length],
					["Unused pool", fresh.length],
					["Completed tests", (attempts ?? []).filter((a) => a.submitted).length],
					["In progress", resumables.length]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-2xl font-bold",
						children: value
					})]
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-2xl border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold uppercase tracking-wide",
						children: "Start a test"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							["full", "Full Test (P1 + P2)"],
							["p1", "Paper 1 only"],
							["p2", "Paper 2 only"]
						].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMode(k),
							className: cn("rounded-full border px-3 py-1.5 text-xs font-semibold", mode === k ? "border-primary bg-primary text-primary-foreground" : "bg-background"),
							children: label
						}, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: allowRepeat,
							onChange: (e) => setAllowRepeat(e.target.checked)
						}), "Allow questions from completed tests to repeat"]
					}),
					preview.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground",
						children: preview.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-md border px-2 py-1",
							children: [
								b.subject,
								": Q",
								b.from,
								"–",
								b.to
							]
						}, b.subject))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: launch,
						disabled: start.isPending,
						className: "mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: start.isPending ? "Preparing…" : "Start test"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
				open: modePickerOpen,
				onOpenChange: (open) => {
					setModePickerOpen(open);
					if (!open) setPendingLaunch(null);
				},
				onStart: handleModeSelect
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold uppercase tracking-wide",
							children: "Resume"
						}),
						resumables.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Nothing in progress."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: resumables.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 rounded-lg border p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-semibold",
											children: a.testName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: [
												a.questionIds.length,
												" questions · ",
												Math.round(a.remainingSec / 60),
												" min left"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => router.navigate({
											to: "/test/$attemptId",
											params: { attemptId: a.id }
										}),
										className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
										children: "Resume"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => del.mutate(a.id),
										className: "rounded-md border px-3 py-1.5 text-xs font-semibold text-destructive",
										children: "Delete"
									})
								]
							}, a.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold uppercase tracking-wide",
							children: "Recent completed"
						}),
						completed.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "No completed Advanced tests yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: completed.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 rounded-lg border p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-semibold",
											children: a.testName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: new Date(a.submittedAt ?? a.updatedAt).toLocaleString()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => router.navigate({
											to: "/result/$attemptId",
											params: { attemptId: a.id }
										}),
										className: "rounded-md border px-3 py-1.5 text-xs font-semibold",
										children: "Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => reattempt.mutate(a.id),
										className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
										children: "Re-attempt"
									})
								]
							}, a.id))
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { AdvancedHome as component };
