import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { m as pickQuestions, r as advancedHistory, t as BOOKMARK_TAGS } from "./advanced-D6ylZ9Tw.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as MathText } from "./MathText-DrvVO8lf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as correctText } from "./ReviewList-1RqSeOyz.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAdvancedTest } from "./advanced-start-29FkmR0D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.bookmarks-C3B_wsZ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdvancedBookmarks() {
	const router = useRouter();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["adv", "bookmarks"],
		queryFn: advancedHistory
	});
	const [tag, setTag] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(null);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const list = (0, import_react.useMemo)(() => (data?.bookmarkList ?? []).filter((b) => tag ? b.tag === tag : true), [data, tag]);
	const start = useMutation({
		mutationFn: async (opts) => {
			const items = list.map((b) => ({
				q: b.question,
				test: null,
				paper: 1
			}));
			const questions = pickQuestions(items, {
				count: items.length,
				allowRepeat: true
			});
			if (questions.length === 0) throw new Error("No bookmarked questions.");
			return (await startAdvancedTest({
				name: "JEE Advanced Bookmark Revision",
				questions,
				durationMin: Math.max(10, questions.length * 2),
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
		title: "Bookmarks",
		subtitle: "Questions you flagged during Advanced tests, with their tags, solutions and metadata.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTag(null),
						className: cn("rounded-full border px-2.5 py-1 text-xs", tag === null ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: [
							"All (",
							data?.bookmarkList.length ?? 0,
							")"
						]
					}),
					BOOKMARK_TAGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTag(t),
						className: cn("rounded-full border px-2.5 py-1 text-xs", tag === t ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: t
					}, t)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: launch,
						disabled: list.length === 0,
						className: "ml-auto rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50",
						children: [
							"Revise these (",
							list.length,
							")"
						]
					})
				]
			}),
			list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-xl border bg-card p-6 text-sm text-muted-foreground",
				children: "No bookmarks yet — tap the bookmark icon during an Advanced test."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase text-muted-foreground",
							children: [
								b.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-primary/10 px-1.5 py-0.5 text-primary",
									children: b.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: b.question.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: b.question.chapter
								}),
								b.question.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: b.question.topic
								}),
								b.year && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: b.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: b.question.difficulty
								}),
								b.correct !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded px-1.5 py-0.5", b.correct ? "bg-status-answered/15" : "bg-destructive/15 text-destructive"),
									children: b.correct ? "Correct" : "Wrong"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate opacity-60",
									children: b.testName
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: b.question.text })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setOpen(open === b.question.id ? null : b.question.id),
							className: "mt-2 text-xs font-semibold text-primary",
							children: open === b.question.id ? "Hide solution" : "Show solution"
						}),
						open === b.question.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-2 rounded-lg border bg-background p-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase text-muted-foreground",
									children: "Answer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: correctText(b.question) })] }),
								b.question.formula && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase text-muted-foreground",
									children: "Formula"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: b.question.formula })] }),
								b.question.concept && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase text-muted-foreground",
									children: "Concept"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: b.question.concept })] }),
								(b.question.solution || b.question.explanation) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase text-muted-foreground",
									children: "Solution"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: b.question.solution ?? b.question.explanation })] }),
								b.question.altMethod && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase text-muted-foreground",
									children: "Alternative method"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: b.question.altMethod })] })
							]
						})
					]
				}, b.question.id))
			}),
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
export { AdvancedBookmarks as component };
