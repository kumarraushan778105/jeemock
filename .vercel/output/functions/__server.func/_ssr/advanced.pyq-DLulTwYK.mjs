import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Search } from "../_libs/lucide-react.mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { a as arrangeBySubject, m as pickQuestions, n as advancedContext, o as buildIndex, s as customPyqSelection } from "./advanced-D6ylZ9Tw.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAdvancedTest } from "./advanced-start-29FkmR0D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.pyq-DLulTwYK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function AdvancedPyq() {
	const router = useRouter();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["adv", "ctx"],
		queryFn: advancedContext
	});
	const [year, setYear] = (0, import_react.useState)(null);
	const [paper, setPaper] = (0, import_react.useState)(null);
	const [chapterSearch, setChapterSearch] = (0, import_react.useState)("");
	const [customFilters, setCustomFilters] = (0, import_react.useState)({});
	const [customCount, setCustomCount] = (0, import_react.useState)(30);
	const [customMinutes, setCustomMinutes] = (0, import_react.useState)(60);
	const [customAllowRepeat, setCustomAllowRepeat] = (0, import_react.useState)(false);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const pyq = (0, import_react.useMemo)(() => (data?.pyq ?? data?.pool ?? []).filter((i) => i.q.pyq || i.year || /pyq/i.test(i.test.name)), [data]);
	const pyqIndex = (0, import_react.useMemo)(() => buildIndex(pyq), [pyq]);
	const years = (0, import_react.useMemo)(() => [...new Set(pyq.map((i) => i.year).filter((y) => Boolean(y)))].sort((a, b) => b - a), [pyq]);
	const scoped = (0, import_react.useMemo)(() => pyq.filter((i) => (year ? i.year === year : true) && (paper ? i.paper === paper : true)), [
		pyq,
		year,
		paper
	]);
	const toggleCustomFilter = (key, v) => {
		setCustomFilters((prev) => {
			const cur = (prev[key] ?? []).slice();
			const i = cur.indexOf(v);
			if (i === -1) cur.push(v);
			else cur.splice(i, 1);
			return {
				...prev,
				[key]: cur
			};
		});
	};
	const customMatched = (0, import_react.useMemo)(() => customPyqSelection(pyq, customFilters), [pyq, customFilters]);
	const customAvailable = (0, import_react.useMemo)(() => customAllowRepeat ? customMatched : customMatched.filter((i) => !data?.history.used.has(i.q.id)), [
		customMatched,
		customAllowRepeat,
		data
	]);
	const visibleChapters = (0, import_react.useMemo)(() => {
		const term = chapterSearch.trim().toLowerCase();
		return pyqIndex.chapters.filter((chapter) => chapter.toLowerCase().includes(term));
	}, [pyqIndex.chapters, chapterSearch]);
	const byYear = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const i of pyq) {
			if (!i.year) continue;
			const row = m.get(i.year) ?? {
				p1: 0,
				p2: 0,
				total: 0
			};
			row.total += 1;
			if (i.paper === 2) row.p2 += 1;
			else row.p1 += 1;
			m.set(i.year, row);
		}
		return [...m.entries()].sort((a, b) => b[0] - a[0]);
	}, [pyq]);
	const start = useMutation({
		mutationFn: async (opts) => {
			const questions = opts.full ? arrangeBySubject(scoped.map((i) => i.q)) : pickQuestions(scoped, {
				count: opts.count ?? 30,
				allowRepeat: true
			});
			if (questions.length === 0) throw new Error("No PYQ questions for this selection.");
			return (await startAdvancedTest({
				name: `JEE Advanced PYQ ${year ?? "All years"}${paper ? ` Paper ${paper}` : ""}`,
				questions,
				durationMin: opts.full ? 180 : 60,
				paper: paper ?? void 0,
				strictMode: opts.strictMode
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
	const customStart = useMutation({
		mutationFn: async (opts) => {
			const questions = pickQuestions(customMatched, {
				count: customCount,
				allowRepeat: customAllowRepeat,
				used: data?.history.used
			});
			if (questions.length === 0) throw new Error("No PYQ questions match these filters.");
			return (await startAdvancedTest({
				name: "JEE Advanced Custom PYQ Test",
				questions,
				durationMin: customMinutes,
				paper: customFilters.papers && customFilters.papers.length === 1 ? customFilters.papers[0] : void 0,
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
	const launch = async (opts) => {
		setPendingLaunch(() => async (selectedMode) => {
			const id = await start.mutateAsync({
				...opts,
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
	const launchCustom = async () => {
		setPendingLaunch(() => async (selectedMode) => {
			const id = await customStart.mutateAsync({
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
		title: "Previous Year Questions",
		subtitle: "Browse Advanced PYQs year-wise and paper-wise, then attempt a full past paper or a quick set.",
		children: [
			pyq.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border bg-card p-6 text-sm text-muted-foreground",
				children: "No PYQ questions found yet. Import an Advanced set whose name contains the year (e.g. \"JEE Advanced 2022 Paper 1\") or whose questions are tagged as PYQ."
			}),
			pyq.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setYear(null),
						className: cn("rounded-full border px-2.5 py-1 text-xs", year === null ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: "All years"
					}), years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setYear(y),
						className: cn("rounded-full border px-2.5 py-1 text-xs", year === y ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: y
					}, y))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: [
						null,
						1,
						2
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPaper(p),
						className: cn("rounded-full border px-2.5 py-1 text-xs", paper === p ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: p === null ? "Both papers" : `Paper ${p}`
					}, String(p)))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-bold",
									children: scoped.length
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "questions selected"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => launch({ full: true }),
							className: "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
							children: "Attempt full paper (180 min)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => launch({
								full: false,
								count: 30
							}),
							className: "rounded-lg border px-4 py-2 text-sm font-semibold",
							children: "Quick 30-question set"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 lg:grid-cols-[1fr_300px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 rounded-2xl border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-bold uppercase tracking-wide text-muted-foreground",
								children: "Paper"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCustomFilters((prev) => ({
										...prev,
										papers: void 0
									})),
									className: cn("rounded-full border px-2.5 py-1 text-xs", !customFilters.papers?.length ? "border-primary bg-primary text-primary-foreground" : "bg-background"),
									children: "Both papers"
								}), [1, 2].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleCustomFilter("papers", v),
									className: cn("rounded-full border px-2.5 py-1 text-xs", (customFilters.papers ?? []).includes(v) ? "border-primary bg-primary text-primary-foreground" : "bg-background"),
									children: `Paper ${v}`
								}, v))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								label: "Subject",
								values: pyqIndex.subjects,
								selected: customFilters.subjects ?? [],
								onToggle: (v) => toggleCustomFilter("subjects", v)
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
										children: [customFilters.chapters?.length ?? 0, " selected"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "font-semibold text-primary hover:underline",
											onClick: () => {
												for (const chapter of visibleChapters) if (!(customFilters.chapters ?? []).includes(chapter)) toggleCustomFilter("chapters", chapter);
											},
											children: "select all"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-muted-foreground hover:underline",
											onClick: () => setCustomFilters((prev) => ({
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
										const selected = (customFilters.chapters ?? []).includes(chapter);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: cn("flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm", selected && "bg-primary/10"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: selected,
												onChange: () => toggleCustomFilter("chapters", chapter)
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
								values: (pyqIndex.topics ?? []).slice(0, 60),
								selected: customFilters.topics ?? [],
								onToggle: (v) => toggleCustomFilter("topics", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
								label: "Year",
								values: pyqIndex.years,
								selected: customFilters.years ?? [],
								onToggle: (v) => toggleCustomFilter("years", v)
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
										children: customAvailable.length
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
									value: customCount,
									onChange: (e) => setCustomCount(Math.max(1, Number(e.target.value) || 1)),
									className: "mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs font-semibold uppercase text-muted-foreground",
								children: ["Duration (min)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 1,
									value: customMinutes,
									onChange: (e) => setCustomMinutes(Math.max(1, Number(e.target.value) || 1)),
									className: "mt-1 w-full rounded-md border bg-background px-2 py-1.5 text-sm font-normal"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: customAllowRepeat,
									onChange: (e) => setCustomAllowRepeat(e.target.checked)
								}), "Allow repeats"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: launchCustom,
								disabled: customStart.isPending,
								className: "w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
								children: "Create Custom PYQ Test"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setCustomFilters({});
									setCustomCount(30);
									setCustomMinutes(60);
									setCustomAllowRepeat(false);
								},
								className: "w-full rounded-lg border px-4 py-2 text-xs font-semibold",
								children: "Reset filters"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: byYear.map(([y, row]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setYear(y),
						className: "rounded-xl border bg-card p-4 text-left hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold",
							children: y
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								row.total,
								" questions · Paper 1: ",
								row.p1,
								" · Paper 2: ",
								row.p2
							]
						})]
					}, y))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
				open: modePickerOpen,
				onOpenChange: (open) => {
					setModePickerOpen(open);
					if (!open) setPendingLaunch(null);
				},
				onStart: handleModeSelect
			})
		]
	});
}
//#endregion
export { AdvancedPyq as component };
