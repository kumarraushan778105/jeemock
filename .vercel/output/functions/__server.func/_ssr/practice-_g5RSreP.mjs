import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as validatePool, o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Play, d as Target } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { V as listTests } from "./db-CAmn2mwk.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-_g5RSreP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIFFS = [
	"Easy",
	"Medium",
	"Hard"
];
function useQuestionPool() {
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	return (0, import_react.useMemo)(() => {
		const list = tests.data ?? [];
		const all = [];
		for (const t of list) for (const q of t.questions) all.push({
			q,
			test: t
		});
		return {
			tests: list,
			pool: validatePool(all, (i) => i.q).valid,
			loading: tests.isLoading
		};
	}, [tests.data, tests.isLoading]);
}
function PracticePage() {
	const router = useRouter();
	const { pool, loading } = useQuestionPool();
	const [subject, setSubject] = (0, import_react.useState)("All");
	const [chapter, setChapter] = (0, import_react.useState)("All");
	const [diffs, setDiffs] = (0, import_react.useState)([]);
	const [count, setCount] = (0, import_react.useState)(15);
	const [minutes, setMinutes] = (0, import_react.useState)(30);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const subjects = (0, import_react.useMemo)(() => ["All", ...new Set(pool.map((p) => p.q.subject))], [pool]);
	const chapters = (0, import_react.useMemo)(() => ["All", ...new Set(pool.filter((p) => subject === "All" || p.q.subject === subject).map((p) => p.q.chapter))], [pool, subject]);
	const matched = (0, import_react.useMemo)(() => pool.filter((p) => (subject === "All" || p.q.subject === subject) && (chapter === "All" || p.q.chapter === chapter) && (diffs.length === 0 || diffs.includes(p.q.difficulty))), [
		pool,
		subject,
		chapter,
		diffs
	]);
	const start = async () => {
		const picked = [...matched].sort(() => Math.random() - .5).slice(0, count);
		if (picked.length === 0) {
			toast.error("No questions match these filters");
			return;
		}
		setPendingLaunch(() => async (selectedMode) => {
			const attempt = await startAttempt(picked[0].test, {
				questions: picked.map((p) => p.q),
				durationMin: minutes,
				name: `Practice · ${subject === "All" ? "Mixed" : subject}${chapter === "All" ? "" : ` — ${chapter}`}`,
				mode: selectedMode,
				strictMode: selectedMode === "strict"
			});
			router.navigate({
				to: "/test/$attemptId",
				params: { attemptId: attempt.id }
			});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5" }), " Practice"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Build a focused, timed set from your imported question banks."
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading question pool…"
		}) : pool.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "Import a test first to start practising."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-[1fr_300px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Subject",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
							options: subjects,
							value: subject,
							onChange: (v) => {
								setSubject(v);
								setChapter("All");
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Chapter",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: chapter,
							onChange: (e) => setChapter(e.target.value),
							className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm",
							children: chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Difficulty",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: DIFFS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDiffs((cur) => cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]),
								className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold", diffs.includes(d) ? "border-primary bg-primary text-primary-foreground" : "bg-surface"),
								children: d
							}, d))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Questions: ${count}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 5,
								max: Math.max(5, Math.min(90, matched.length || 5)),
								value: Math.min(count, Math.max(5, matched.length || 5)),
								onChange: (e) => setCount(Number(e.target.value)),
								className: "w-full"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Duration: ${minutes} min`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 5,
								max: 180,
								step: 5,
								value: minutes,
								onChange: (e) => setMinutes(Number(e.target.value)),
								className: "w-full"
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-fit rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase text-muted-foreground",
						children: "Matching pool"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-3xl font-bold",
						children: matched.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [Math.min(count, matched.length), " will be picked at random."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: start,
						className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50",
						disabled: matched.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), " Start practice"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1.5 text-xs font-semibold uppercase text-muted-foreground",
		children: label
	}), children] });
}
function Pills({ options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onChange(o),
			className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold", value === o ? "border-primary bg-primary text-primary-foreground" : "bg-surface"),
			children: o
		}, o))
	});
}
//#endregion
export { PracticePage as component, useQuestionPool };
