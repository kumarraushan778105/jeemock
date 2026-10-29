import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as QUESTION_TYPE_LABEL, o as cn, t as EXAM_LABEL } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ShieldCheck, h as Shuffle, m as SlidersVertical, r as X, y as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { V as listTests, W as orderQuestionsBySubject, l as createLiveTestDraft } from "./db-CAmn2mwk.mjs";
import { a as currentUsage, c as filterItems, d as validBankItems, f as validationBySubject, i as chapterTree, l as questionHistory, n as bankItems, o as eligibleItems, p as weakSourcePool, r as buildFromPlan, t as autoDistribute, u as smartPick } from "./bank-Q2zv39_H.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
import { t as Route } from "./create-G-SJRERi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-D3Vj5QVN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	{
		key: "main",
		label: "JEE Main",
		minutes: 180,
		marks: 4,
		negative: 1,
		count: 75
	},
	{
		key: "adv1",
		label: "JEE Advanced Paper 1",
		minutes: 180,
		marks: 4,
		negative: 2,
		count: 54
	},
	{
		key: "adv2",
		label: "JEE Advanced Paper 2",
		minutes: 180,
		marks: 4,
		negative: 2,
		count: 54
	},
	{
		key: "advfull",
		label: "Full Advanced (P1 + break + P2)",
		minutes: 420,
		marks: 4,
		negative: 2,
		count: 108
	}
];
var WEAK_SOURCES = [
	{
		key: "wrong",
		label: "Wrong questions",
		desc: "Everything you answered incorrectly"
	},
	{
		key: "weak",
		label: "Weak chapters",
		desc: "Chapters below 60% accuracy"
	},
	{
		key: "bookmarked",
		label: "Bookmarked",
		desc: "Questions you flagged"
	},
	{
		key: "unattempted",
		label: "Not attempted",
		desc: "Never answered before"
	}
];
var DIFFS = [
	"Easy",
	"Medium",
	"Hard"
];
function CreatePage() {
	const router = useRouter();
	const qc = useQueryClient();
	const { creationContext } = Route.useSearch();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const mastered = useQuery({
		queryKey: ["bank", "history"],
		queryFn: questionHistory,
		staleTime: 0
	}).data?.mastered;
	const [mode, setMode] = (0, import_react.useState)("bank");
	const [exam, setExam] = (0, import_react.useState)("both");
	const [subjects, setSubjects] = (0, import_react.useState)([]);
	const [chapterKeys, setChapterKeys] = (0, import_react.useState)([]);
	const [topics, setTopics] = (0, import_react.useState)([]);
	const [difficulties, setDifficulties] = (0, import_react.useState)([]);
	const [types, setTypes] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [pyqOnly, setPyqOnly] = (0, import_react.useState)(false);
	const [count, setCount] = (0, import_react.useState)(30);
	const [manual, setManual] = (0, import_react.useState)(false);
	const [quota, setQuota] = (0, import_react.useState)({});
	const [marks, setMarks] = (0, import_react.useState)(4);
	const [negative, setNegative] = (0, import_react.useState)(1);
	const [hours, setHours] = (0, import_react.useState)(3);
	const [minutes, setMinutes] = (0, import_react.useState)(0);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const searchInputRef = (0, import_react.useRef)(null);
	const [name, setName] = (0, import_react.useState)("Custom Test");
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const libraryItems = (0, import_react.useMemo)(() => filterItems(bankItems(tests.data ?? []), { exams: exam === "both" ? void 0 : [exam] }), [tests.data, exam]);
	/** Total / valid / invalid per subject for the selected library. */
	const validitySummary = (0, import_react.useMemo)(() => validationBySubject(libraryItems), [libraryItems]);
	const invalidTotal = validitySummary.reduce((a, s) => a + s.invalid, 0);
	const items = (0, import_react.useMemo)(() => eligibleItems(validBankItems(libraryItems), mastered ?? /* @__PURE__ */ new Set()), [libraryItems, mastered]);
	const tree = (0, import_react.useMemo)(() => chapterTree(items), [items]);
	const [weakPool, setWeakPool] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (mode === "bank") return;
		let alive = true;
		weakSourcePool(mode).then((pool) => {
			if (alive) setWeakPool(eligibleItems(validBankItems(pool), mastered ?? /* @__PURE__ */ new Set()));
		});
		return () => {
			alive = false;
		};
	}, [mode, mastered]);
	const visibleChapters = (0, import_react.useMemo)(() => {
		const selected = new Set(chapterKeys);
		return tree.filter((s) => subjects.length === 0 || subjects.includes(s.subject)).flatMap((s) => s.chapters).filter((c) => {
			if (selected.has(c.key)) return true;
			return filterItems(c.items, {
				search,
				topics,
				difficulties,
				types,
				pyqOnly
			}).length > 0;
		});
	}, [
		tree,
		subjects,
		chapterKeys,
		search,
		topics,
		difficulties,
		types,
		pyqOnly
	]);
	const topicOptions = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const c of visibleChapters) if (chapterKeys.length === 0 || chapterKeys.includes(c.key)) c.topics.forEach((t) => set.add(t));
		return [...set].sort();
	}, [visibleChapters, chapterKeys]);
	const groups = (0, import_react.useMemo)(() => {
		return visibleChapters.filter((c) => chapterKeys.length === 0 || chapterKeys.includes(c.key)).map((c) => ({
			key: c.key,
			subject: c.subject,
			chapter: c.chapter,
			items: filterItems(c.items, {
				search,
				topics,
				difficulties,
				types,
				pyqOnly
			})
		})).filter((g) => g.items.length > 0);
	}, [
		visibleChapters,
		chapterKeys,
		search,
		topics,
		difficulties,
		types,
		pyqOnly
	]);
	const pool = (0, import_react.useMemo)(() => mode === "bank" ? groups.flatMap((g) => g.items) : filterItems(weakPool, {
		search,
		subjects,
		difficulties,
		types,
		pyqOnly
	}), [
		mode,
		groups,
		weakPool,
		search,
		subjects,
		difficulties,
		types,
		pyqOnly
	]);
	const autoPlan = (0, import_react.useMemo)(() => autoDistribute(groups.map((g) => ({
		key: g.key,
		available: g.items.length
	})), count), [groups, count]);
	const manualTotal = groups.reduce((a, g) => a + (quota[g.key] ?? 0), 0);
	const willUse = mode === "bank" && manual ? manualTotal : Math.min(count, pool.length);
	const applyPreset = (p) => {
		setHours(Math.floor(p.minutes / 60));
		setMinutes(p.minutes % 60);
		setMarks(p.marks);
		setNegative(p.negative);
		setCount(p.count);
		setName(p.label);
	};
	const build = async () => {
		const duration = hours * 60 + minutes;
		if (pool.length === 0) return toast.error("No questions match this selection.");
		const usage = await currentUsage();
		let chosen;
		if (mode === "bank" && groups.length > 0) chosen = buildFromPlan(groups, manual ? new Map(groups.map((g) => [g.key, Math.min(quota[g.key] ?? 0, g.items.length)])) : autoPlan, usage);
		else chosen = smartPick(pool, count, usage);
		const unique = [];
		const seen = /* @__PURE__ */ new Set();
		for (const it of chosen) {
			if (seen.has(it.q.id)) continue;
			seen.add(it.q.id);
			unique.push(it);
		}
		if (unique.length === 0) return toast.error("Distribution produced zero questions.");
		const picked = orderQuestionsBySubject(unique.map((it) => ({
			...it.q,
			marks,
			negative
		})));
		const base = (tests.data ?? [])[0];
		if (!base) return toast.error("Import a question set first.");
		if (creationContext === "live") {
			const draft = createLiveTestDraft(picked, name || "Live Test Draft", exam === "both" ? "JEE Main" : EXAM_LABEL[exam]);
			router.navigate({
				to: "/live-tests",
				search: { draft: draft.id }
			});
			toast.success("Live Test Preview opened");
			return;
		}
		setPendingLaunch(() => async (selectedMode) => {
			const attempt = await startAttempt({
				...base,
				name,
				questions: picked,
				questionCount: picked.length,
				durationMin: duration
			}, {
				questions: picked,
				durationMin: duration,
				name,
				mode: selectedMode,
				strictMode: selectedMode === "strict"
			});
			qc.invalidateQueries({ queryKey: ["attempts"] });
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
	if (!tests.isLoading && (tests.data?.length ?? 0) === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-bold",
		children: "Custom Test Builder"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
		children: "Import at least one question set first — the builder draws from your chapter library."
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "size-5" }), " Custom Test Builder"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Mix any chapters, pick how many questions you want, and the smart random engine builds the paper — no duplicates, least-used questions first."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => applyPreset(p),
				className: "rounded-lg border bg-card px-3 py-2 text-xs font-semibold hover:border-primary",
				children: [p.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 text-muted-foreground",
					children: [p.minutes, " min"]
				})]
			}, p.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 text-xs font-semibold uppercase text-muted-foreground",
				children: "Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					"main",
					"advanced",
					"both"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: exam === k,
					onClick: () => {
						setExam(k);
						setChapterKeys([]);
					},
					children: k === "both" ? "Main + Advanced" : EXAM_LABEL[k]
				}, k))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: mode === "bank",
				onClick: () => setMode("bank"),
				children: "Chapter mix"
			}), WEAK_SOURCES.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: mode === w.key,
				onClick: () => setMode(w.key),
				title: w.desc,
				children: w.label
			}, w.key))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Test name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase text-muted-foreground",
								children: "Filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (searchOpen && !search.trim()) {
										setSearchOpen(false);
										return;
									}
									setSearchOpen((prev) => !prev);
									if (!searchOpen) requestAnimationFrame(() => searchInputRef.current?.focus());
								},
								className: "inline-flex items-center gap-1 rounded-md border bg-surface px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground",
								"aria-label": searchOpen ? "Close search" : "Open search",
								title: searchOpen ? "Close search" : "Open search",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search" })]
							})]
						}),
						searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden rounded-lg border bg-surface transition-all duration-200 ease-out animate-in fade-in",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: searchInputRef,
								type: "search",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search questions...",
								className: "w-full rounded-lg border-0 bg-transparent py-2 pr-9 pl-3 text-sm outline-none ring-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSearch("");
									setSearchOpen(false);
									searchInputRef.current?.blur();
								},
								className: "absolute top-1/2 right-2 -translate-y-1/2 rounded-full border bg-background p-1 text-muted-foreground hover:text-foreground",
								"aria-label": "Clear and close search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})]
						}),
						!searchOpen && search.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: [
								pool.length,
								" matching question",
								pool.length === 1 ? "" : "s"
							]
						}),
						searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: search.trim() ? `${pool.length} matching question${pool.length === 1 ? "" : "s"}` : "Search by question text, ID, chapter, topic, subject or tags"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Multi, {
						label: "Subject",
						options: tree.map((s) => s.subject),
						values: subjects,
						onToggle: (v) => {
							setSubjects((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);
							setChapterKeys([]);
						}
					}),
					mode === "bank" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold uppercase text-muted-foreground",
							children: [
								"Chapters (",
								chapterKeys.length || "all",
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "underline",
								onClick: () => setChapterKeys(visibleChapters.map((c) => c.key)),
								children: "select all"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "underline",
								onClick: () => setChapterKeys([]),
								children: "clear"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-slim max-h-64 space-y-1 overflow-auto rounded-lg border bg-surface p-2",
						children: visibleChapters.map((c) => {
							const on = chapterKeys.includes(c.key);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: cn("flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm", on && "bg-primary/10"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: on,
										onChange: () => setChapterKeys((s) => on ? s.filter((x) => x !== c.key) : [...s, c.key])
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1 truncate",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-semibold uppercase text-primary",
												children: c.subject.slice(0, 4)
											}),
											" ",
											c.chapter
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: c.total
									})
								]
							}, c.key);
						})
					})] }),
					topicOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Multi, {
						label: "Topic",
						options: topicOptions,
						values: topics,
						onToggle: (v) => setTopics((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Multi, {
						label: "Difficulty",
						options: DIFFS,
						values: difficulties,
						onToggle: (v) => setDifficulties((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Multi, {
						label: "Question type",
						options: Object.keys(QUESTION_TYPE_LABEL).map((k) => QUESTION_TYPE_LABEL[k]),
						values: types.map((t) => QUESTION_TYPE_LABEL[t]),
						onToggle: (label) => {
							const key = Object.keys(QUESTION_TYPE_LABEL).find((k) => QUESTION_TYPE_LABEL[k] === label);
							setTypes((s) => s.includes(key) ? s.filter((x) => x !== key) : [...s, key]);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: pyqOnly,
							onChange: (e) => setPyqOnly(e.target.checked)
						}), "Previous year questions only"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-surface p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary",
								children: pool.length
							}),
							" valid questions available · using ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: willUse
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-surface p-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex items-center gap-1.5 font-semibold uppercase text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), " Validation"]
							}),
							validitySummary.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "No questions in this library."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1",
								children: validitySummary.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 truncate",
											children: s.subject
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["Total ", s.total]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-success",
											children: ["Valid ", s.valid]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: cn("font-semibold", s.invalid ? "text-destructive" : "text-muted-foreground"),
											children: ["Invalid ", s.invalid]
										})
									]
								}, s.subject))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[11px] text-muted-foreground",
								children: invalidTotal > 0 ? `${invalidTotal} invalid question(s) are excluded automatically — open the Question Bank to see why.` : "All questions passed validation."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Question count",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							min: 1,
							value: count,
							onChange: (e) => setCount(Math.max(1, Number(e.target.value))),
							className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							10,
							20,
							30,
							50,
							75,
							90,
							100,
							200,
							500
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCount(n),
							className: cn("rounded-md border px-2 py-1 text-xs", count === n ? "border-primary bg-primary text-primary-foreground" : "bg-surface"),
							children: n
						}, n))
					}),
					mode === "bank" && groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: manual,
								onChange: (e) => setManual(e.target.checked)
							}), "Manual distribution"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scroll-slim mt-2 max-h-56 space-y-1 overflow-auto rounded-lg border bg-surface p-2 text-xs",
							children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate",
										children: g.chapter
									}),
									manual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										max: g.items.length,
										value: quota[g.key] ?? 0,
										onChange: (e) => setQuota((s) => ({
											...s,
											[g.key]: Math.max(0, Math.min(g.items.length, Number(e.target.value)))
										})),
										className: "w-16 rounded border bg-card px-2 py-1 text-right"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-16 text-right font-semibold",
										children: autoPlan.get(g.key) ?? 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-10 text-right text-muted-foreground",
										children: ["/", g.items.length]
									})
								]
							}, g.key))
						}),
						manual && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-right text-xs text-muted-foreground",
							children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: manualTotal
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Marks / correct",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: marks,
								onChange: (e) => setMarks(Number(e.target.value)),
								className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Negative marks",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: negative,
								onChange: (e) => setNegative(Number(e.target.value)),
								className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hours",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: hours,
								onChange: (e) => setHours(Math.max(0, Number(e.target.value))),
								className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Minutes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								max: 59,
								value: minutes,
								onChange: (e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value)))),
								className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: build,
						className: "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }), " Generate & start test"]
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
function Chip({ active, onClick, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		title,
		className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold", active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"),
		children
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
			children: label
		}), children]
	});
}
function Multi({ label, options, values, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1 block text-xs font-semibold uppercase text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-1.5",
		children: [options.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: "—"
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onToggle(o),
			className: cn("max-w-full truncate rounded-full border px-2.5 py-1 text-xs transition-colors", values.includes(o) ? "border-primary bg-primary text-primary-foreground" : "bg-surface hover:bg-accent"),
			children: o
		}, o))]
	})] });
}
//#endregion
export { CreatePage as component };
