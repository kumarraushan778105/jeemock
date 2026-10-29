import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as QUESTION_TYPE_LABEL, o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Search } from "../_libs/lucide-react.mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { m as pickQuestions, n as advancedContext, u as filterAdvanced } from "./advanced-D6ylZ9Tw.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAdvancedTest } from "./advanced-start-29FkmR0D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.practice-BLkXElZG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOURCES = [
	{
		key: "all",
		label: "Whole bank"
	},
	{
		key: "weak",
		label: "Weak chapters"
	},
	{
		key: "strong",
		label: "Strong chapters"
	},
	{
		key: "wrong",
		label: "Previously wrong"
	},
	{
		key: "unattempted",
		label: "Unattempted"
	},
	{
		key: "bookmarked",
		label: "Bookmarked"
	},
	{
		key: "pyq",
		label: "PYQ only"
	}
];
function Chips({ values, selected, onToggle, label, render }) {
	if (values.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1.5 flex flex-wrap gap-1.5",
		children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onToggle(v),
			className: cn("rounded-full border px-2.5 py-1 text-xs", selected.includes(v) ? "border-primary bg-primary text-primary-foreground" : "bg-background"),
			children: render ? render(v) : String(v)
		}, String(v)))
	})] });
}
function AdvancedPractice() {
	const router = useRouter();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["adv", "ctx"],
		queryFn: advancedContext
	});
	const [f, setF] = (0, import_react.useState)({ source: "all" });
	const [chapterSearch, setChapterSearch] = (0, import_react.useState)("");
	const [count, setCount] = (0, import_react.useState)(30);
	const [minutes, setMinutes] = (0, import_react.useState)(60);
	const [allowRepeat, setAllowRepeat] = (0, import_react.useState)(false);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const toggle = (key, v) => setF((prev) => {
		const cur = (prev[key] ?? []).slice();
		const i = cur.indexOf(v);
		if (i === -1) cur.push(v);
		else cur.splice(i, 1);
		return {
			...prev,
			[key]: cur
		};
	});
	const matched = (0, import_react.useMemo)(() => {
		if (!data) return [];
		return filterAdvanced(data.index, f, data.history);
	}, [data, f]);
	const available = (0, import_react.useMemo)(() => allowRepeat ? matched : matched.filter((i) => !data?.history.used.has(i.q.id)), [
		matched,
		allowRepeat,
		data
	]);
	const idx = data?.index;
	const visibleChapters = (0, import_react.useMemo)(() => {
		const term = chapterSearch.trim().toLowerCase();
		return (idx?.chapters ?? []).filter((chapter) => chapter.toLowerCase().includes(term));
	}, [idx?.chapters, chapterSearch]);
	const start = useMutation({
		mutationFn: async (opts) => {
			const questions = pickQuestions(matched, {
				count,
				allowRepeat,
				used: data?.history.used
			});
			if (questions.length === 0) throw new Error("No questions match these filters.");
			return (await startAdvancedTest({
				name: "JEE Advanced Custom Practice",
				questions,
				durationMin: minutes,
				strictMode: opts?.strictMode
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Custom Practice",
		subtitle: "Pick exactly what you want to practise. Questions from completed tests are excluded automatically.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_300px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-2xl border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
						children: "Source"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-1.5",
						children: SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setF((p) => ({
								...p,
								source: s.key
							})),
							className: cn("rounded-full border px-2.5 py-1 text-xs", f.source === s.key ? "border-primary bg-primary text-primary-foreground" : "bg-background"),
							children: s.label
						}, s.key))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Paper",
						values: [1, 2],
						selected: f.papers ?? [],
						onToggle: (v) => toggle("papers", v),
						render: (v) => `Paper ${v}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Subject",
						values: idx?.subjects ?? [],
						selected: f.subjects ?? [],
						onToggle: (v) => toggle("subjects", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
							children: "Chapter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: chapterSearch,
								onChange: (e) => setChapterSearch(e.target.value),
								placeholder: "Search chapter...",
								className: "w-full rounded-lg border bg-surface py-2 pr-3 pl-9 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex items-center justify-between text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [f.chapters?.length ?? 0, " selected"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-semibold text-primary hover:underline",
									onClick: () => {
										for (const chapter of visibleChapters) if (!(f.chapters ?? []).includes(chapter)) toggle("chapters", chapter);
									},
									children: "select all"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-muted-foreground hover:underline",
									onClick: () => setF((prev) => ({
										...prev,
										chapters: void 0
									})),
									children: "clear"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scroll-slim mt-1.5 max-h-64 space-y-1 overflow-auto rounded-lg border bg-surface p-2",
							children: visibleChapters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-2 text-xs text-muted-foreground",
								children: "No chapters found"
							}) : visibleChapters.map((chapter) => {
								const selected = (f.chapters ?? []).includes(chapter);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: cn("flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm", selected && "bg-primary/10"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: selected,
										onChange: () => toggle("chapters", chapter)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: chapter
									})]
								}, chapter);
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Topic",
						values: (idx?.topics ?? []).slice(0, 60),
						selected: f.topics ?? [],
						onToggle: (v) => toggle("topics", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Difficulty",
						values: [
							"Easy",
							"Medium",
							"Hard"
						],
						selected: f.difficulties ?? [],
						onToggle: (v) => toggle("difficulties", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Question type",
						values: idx?.types ?? [],
						selected: f.types ?? [],
						onToggle: (v) => toggle("types", v),
						render: (v) => QUESTION_TYPE_LABEL[v]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
						label: "Year",
						values: idx?.years ?? [],
						selected: f.years ?? [],
						onToggle: (v) => toggle("years", v)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-fit space-y-3 rounded-2xl border bg-card p-5 lg:sticky lg:top-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-bold",
								children: available.length
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "questions available"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold uppercase text-muted-foreground",
						children: ["Questions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: count,
							onChange: (e) => setCount(Math.max(1, Number(e.target.value) || 1)),
							className: "mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs font-semibold uppercase text-muted-foreground",
						children: ["Duration (min)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: minutes,
							onChange: (e) => setMinutes(Math.max(1, Number(e.target.value) || 1)),
							className: "mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: allowRepeat,
							onChange: (e) => setAllowRepeat(e.target.checked)
						}), "Allow repeats"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: launch,
						disabled: start.isPending,
						className: "w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
						children: "Generate test"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setF({ source: "all" }),
						className: "w-full rounded-lg border px-4 py-2 text-xs font-semibold",
						children: "Reset filters"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		})]
	});
}
//#endregion
export { AdvancedPractice as component };
