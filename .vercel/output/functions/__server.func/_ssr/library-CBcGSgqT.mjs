import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Nt as BookOpen, T as Play, y as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { V as listTests } from "./db-CAmn2mwk.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-CBcGSgqT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	const router = useRouter();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("All");
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const { subjects, chapters } = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const t of tests.data ?? []) for (const q of t.questions) {
			const key = `${q.subject}::${q.chapter}`;
			const cur = map.get(key) ?? {
				subject: q.subject,
				chapter: q.chapter,
				total: 0,
				easy: 0,
				medium: 0,
				hard: 0,
				figures: 0,
				items: []
			};
			cur.total += 1;
			if (q.difficulty === "Easy") cur.easy += 1;
			else if (q.difficulty === "Hard") cur.hard += 1;
			else cur.medium += 1;
			cur.figures += q.images.length;
			cur.items.push({
				q,
				test: t
			});
			map.set(key, cur);
		}
		const all = [...map.values()].sort((a, b) => a.subject.localeCompare(b.subject) || b.total - a.total);
		return {
			subjects: ["All", ...new Set(all.map((c) => c.subject))],
			chapters: all
		};
	}, [tests.data]);
	const visible = chapters.filter((c) => (subject === "All" || c.subject === subject) && (!search.trim() || c.chapter.toLowerCase().includes(search.trim().toLowerCase())));
	const practice = async (items, name) => {
		const picked = items.slice(0, 30);
		setPendingLaunch(() => async (selectedMode) => {
			const attempt = await startAttempt(picked[0].test, {
				questions: picked.map((p) => p.q),
				durationMin: Math.max(10, picked.length * 2),
				name: `Practice · ${name}`,
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" }), " Chapter Library"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				chapters.length,
				" chapters across ",
				tests.data?.length ?? 0,
				" imported sets."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[220px] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search chapters…",
					className: "w-full rounded-lg border bg-surface py-2 pl-9 pr-3 text-sm"
				})]
			}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setSubject(s),
				className: cn("rounded-lg border px-3 py-2 text-xs font-semibold", subject === s ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: s
			}, s))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		}),
		visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "No chapters found — import a question set first."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: visible.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase text-primary",
						children: c.subject
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 truncate text-sm font-bold",
						title: c.chapter,
						children: c.chapter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-1.5 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, { children: [c.total, " questions"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, { children: [c.figures, " figures"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex h-1.5 overflow-hidden rounded-full bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-answered",
								style: { width: `${c.easy / c.total * 100}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-warning",
								style: { width: `${c.medium / c.total * 100}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-destructive",
								style: { width: `${c.hard / c.total * 100}%` }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [
							c.easy,
							" easy · ",
							c.medium,
							" medium · ",
							c.hard,
							" hard"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => practice(c.items, c.chapter),
						className: "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-surface px-3 py-2 text-xs font-semibold hover:border-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), " Practice chapter"]
					})
				]
			}, `${c.subject}-${c.chapter}`))
		})
	] });
}
function Tag({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded bg-surface px-1.5 py-0.5 text-muted-foreground",
		children
	});
}
//#endregion
export { LibraryPage as component };
