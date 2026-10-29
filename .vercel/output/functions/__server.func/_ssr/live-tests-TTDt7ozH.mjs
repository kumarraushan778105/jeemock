import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as validatePool, o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as CircleCheck, _t as Clock3, o as TriangleAlert, p as Sparkles, r as X, w as Plus } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { A as getLiveTestDraft, B as listScheduledLiveTests, C as formatLiveWindowRange, D as getEffectiveLiveTestSyllabus, F as listAttempts, S as formatLiveTestDate, V as listTests, _ as deleteScheduledLiveTest, a as cloneQuestionForDraft, c as createBlankQuestionForDraft, g as deleteLiveTestDraft, it as setActiveLiveTestDraftId, nt as saveLiveTestDraft, r as buildLiveTestPreviewAttempt, rt as scheduleLiveTest, t as addLiveAttemptToScheduled, tt as questionAlreadyInDraft, w as getActiveLiveTestDraftId, x as formatLiveDuration } from "./db-CAmn2mwk.mjs";
import { d as validBankItems, n as bankItems } from "./bank-Q2zv39_H.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
import { t as AnswerEditor } from "./AnswerEditor-CHmpDiRg.mjs";
import { t as Route } from "./live-tests-B8DZ2s3g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-tests-TTDt7ozH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SyllabusPanel({ syllabus }) {
	const subjects = [
		"Physics",
		"Chemistry",
		"Mathematics"
	];
	const subjectStyles = {
		Physics: "border-sky-200 bg-sky-50/90 text-sky-950 dark:border-sky-800/70 dark:bg-sky-950/20 dark:text-sky-100",
		Chemistry: "border-violet-200 bg-violet-50/90 text-violet-950 dark:border-violet-800/70 dark:bg-violet-950/20 dark:text-violet-100",
		Mathematics: "border-emerald-200 bg-emerald-50/90 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/20 dark:text-emerald-100"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-3",
		children: subjects.map((subject) => {
			const chapters = syllabus?.[subject] ?? [];
			const subjectClass = subjectStyles[subject];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `space-y-2 rounded-xl border p-4 shadow-sm ${subjectClass}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold tracking-tight",
					children: subject
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-base font-medium leading-relaxed opacity-95",
					children: chapters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-current/70",
						children: "—"
					}) : chapters.map((chapter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "mt-2 size-1.5 shrink-0 rounded-full bg-current/80"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: chapter
						})]
					}, `${subject}-${chapter}`))
				})]
			}, subject);
		})
	});
}
function LiveTestsPage() {
	const router = useRouter();
	const { draft: draftId } = Route.useSearch();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	useQuery({
		queryKey: ["attempts"],
		queryFn: listAttempts
	});
	const [activeDraftId, setActiveDraftId] = (0, import_react.useState)(draftId ?? null);
	const [draft, setDraft] = (0, import_react.useState)(draftId ? getLiveTestDraft(draftId) : null);
	const [scheduleOpen, setScheduleOpen] = (0, import_react.useState)(false);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [bankFilter, setBankFilter] = (0, import_react.useState)("all");
	const [creatingNewQuestion, setCreatingNewQuestion] = (0, import_react.useState)(false);
	const [editingQuestionId, setEditingQuestionId] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Upcoming");
	const [syllabusEditorOpen, setSyllabusEditorOpen] = (0, import_react.useState)(false);
	const [draftSyllabusEditor, setDraftSyllabusEditor] = (0, import_react.useState)({});
	const [draftSyllabusInputs, setDraftSyllabusInputs] = (0, import_react.useState)({
		Physics: "",
		Chemistry: "",
		Mathematics: ""
	});
	const [selectedSyllabusTestId, setSelectedSyllabusTestId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		testName: "",
		date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		liveStart: "10:00",
		liveEnd: "22:00",
		durationMin: 180,
		liveWindowMode: "allow-finish"
	});
	(0, import_react.useEffect)(() => {
		const activeId = draftId ?? getActiveLiveTestDraftId();
		if (!activeId) {
			setDraft(null);
			return;
		}
		const next = getLiveTestDraft(activeId);
		if (!next) {
			setActiveLiveTestDraftId(null);
			setDraft(null);
			return;
		}
		setDraft(next);
		if (draftId !== next.id) router.navigate({
			to: "/live-tests",
			search: { draft: next.id }
		});
	}, [draftId, router]);
	(0, import_react.useEffect)(() => {
		if (draft && draft.id !== activeDraftId) {
			setActiveDraftId(draft.id);
			setActiveLiveTestDraftId(draft.id);
		}
	}, [draft, activeDraftId]);
	const bankQuestionItems = (0, import_react.useMemo)(() => validBankItems(bankItems(tests.data ?? [])), [tests.data]);
	const bankQuestions = (0, import_react.useMemo)(() => bankQuestionItems.map((item) => ({
		...item.q,
		__sourceBankName: item.test.name
	})), [bankQuestionItems]);
	const bankOptions = (0, import_react.useMemo)(() => [...new Set(bankQuestionItems.map((item) => item.test.name).filter(Boolean))].sort(), [bankQuestionItems]);
	const validSummary = (0, import_react.useMemo)(() => {
		if (!draft) return {
			total: 0,
			valid: 0,
			invalid: 0
		};
		const report = validatePool(draft.questions, (q) => q);
		return {
			total: report.total,
			valid: report.valid.length,
			invalid: report.invalid.length
		};
	}, [draft]);
	const refreshDraft = (next) => {
		setDraft(next);
		if (next) {
			const saved = saveLiveTestDraft(next);
			setActiveDraftId(saved.id);
			setActiveLiveTestDraftId(saved.id);
		}
	};
	const validateDraftNow = () => {
		if (!draft) return;
		const report = validatePool(draft.questions, (q) => q);
		const next = {
			...draft,
			status: report.invalid.length > 0 ? "invalid" : "valid",
			validation: {
				total: report.total,
				valid: report.valid.length,
				invalid: report.invalid.length,
				warnings: 0,
				reasons: Object.fromEntries(report.invalid.map((entry) => [String(entry.item.id), entry.reasons]))
			},
			updatedAt: Date.now()
		};
		setDraft(next);
		const saved = saveLiveTestDraft(next);
		setActiveDraftId(saved.id);
		setActiveLiveTestDraftId(saved.id);
		toast.success(report.invalid.length === 0 ? "Draft validated" : `${report.invalid.length} issue(s) found`);
	};
	const openCbtPreview = () => {
		if (!draft) return;
		const attempt = buildLiveTestPreviewAttempt(draft);
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: attempt.id }
		});
	};
	const saveDraftQuestion = async (updatedQuestion) => {
		if (!draft) return;
		refreshDraft({
			...draft,
			questions: draft.questions.map((q) => q.id === updatedQuestion.id ? updatedQuestion : q),
			questionIds: draft.questions.map((q) => q.id === updatedQuestion.id ? updatedQuestion.id : q.id),
			updatedAt: Date.now()
		});
		toast.success(`Q${updatedQuestion.number} saved`);
	};
	const removeQuestion = (questionId) => {
		if (!draft) return;
		if (!window.confirm("Remove this question from the test?")) return;
		refreshDraft({
			...draft,
			questions: draft.questions.filter((q) => q.id !== questionId),
			questionIds: draft.questions.filter((q) => q.id !== questionId).map((q) => q.id),
			questionCount: draft.questions.filter((q) => q.id !== questionId).length,
			updatedAt: Date.now()
		});
	};
	const addQuestion = (question) => {
		if (!draft) return;
		if (questionAlreadyInDraft(draft, question)) {
			toast.error("Question already exists in this test.");
			return;
		}
		const snapshot = question.sourceId ? cloneQuestionForDraft(question) : {
			...question,
			id: question.id || `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
		};
		refreshDraft({
			...draft,
			questions: [...draft.questions, snapshot],
			questionIds: [...draft.questionIds, snapshot.id],
			questionCount: draft.questions.length + 1,
			updatedAt: Date.now()
		});
		setAddOpen(false);
		setCreatingNewQuestion(false);
		toast.success(`${question.subject} · Q${question.number} added`);
	};
	const moveQuestion = (from, to) => {
		if (!draft) return;
		const nextQ = [...draft.questions];
		const [item] = nextQ.splice(from, 1);
		nextQ.splice(to, 0, item);
		refreshDraft({
			...draft,
			questions: nextQ,
			questionIds: nextQ.map((q) => q.id),
			updatedAt: Date.now()
		});
	};
	const discardDraft = () => {
		if (!draft) return;
		if (!window.confirm("Discard this unscheduled Live Test draft? This will remove the saved draft permanently.")) return;
		deleteLiveTestDraft(draft.id);
		setDraft(null);
		setActiveDraftId(null);
		setActiveLiveTestDraftId(null);
		router.navigate({
			to: "/live-tests",
			search: { draft: void 0 }
		});
		toast.success("Draft discarded");
	};
	const openDraftSyllabusEditor = () => {
		if (!draft) return;
		setDraftSyllabusEditor(draft.customSyllabus && Object.keys(draft.customSyllabus).length > 0 ? draft.customSyllabus : getEffectiveLiveTestSyllabus(draft));
		setDraftSyllabusInputs({
			Physics: "",
			Chemistry: "",
			Mathematics: ""
		});
		setSyllabusEditorOpen(true);
	};
	const addDraftSyllabusChapter = (subject) => {
		const value = (draftSyllabusInputs[subject] ?? "").trim();
		if (!value) return;
		setDraftSyllabusEditor((current) => {
			const existing = [...current[subject] ?? []];
			const nextChapters = Array.from(new Set([...existing, value]));
			return {
				...current,
				[subject]: nextChapters
			};
		});
		setDraftSyllabusInputs((current) => ({
			...current,
			[subject]: ""
		}));
	};
	const removeDraftSyllabusChapter = (subject, chapter) => {
		setDraftSyllabusEditor((current) => ({
			...current,
			[subject]: (current[subject] ?? []).filter((item) => item !== chapter)
		}));
	};
	const saveDraftSyllabus = () => {
		if (!draft) return;
		const nextCustomSyllabus = {};
		Object.entries(draftSyllabusEditor).forEach(([subject, chapters]) => {
			const cleaned = Array.from(new Set((chapters ?? []).map((item) => item.trim()).filter(Boolean)));
			if (cleaned.length > 0) nextCustomSyllabus[subject] = cleaned;
		});
		refreshDraft({
			...draft,
			customSyllabus: Object.keys(nextCustomSyllabus).length > 0 ? nextCustomSyllabus : void 0,
			updatedAt: Date.now()
		});
		setSyllabusEditorOpen(false);
		toast.success("Syllabus saved");
	};
	const scheduleDraft = () => {
		if (!draft) return;
		const next = {
			...draft,
			name: form.testName || draft.name,
			updatedAt: Date.now()
		};
		const scheduled = scheduleLiveTest(next, {
			testName: form.testName || next.name,
			date: form.date,
			liveStart: form.liveStart,
			liveEnd: form.liveEnd,
			durationMin: form.durationMin,
			liveWindowMode: form.liveWindowMode,
			customSyllabus: next.customSyllabus
		});
		setDraft(null);
		setActiveDraftId(null);
		setActiveLiveTestDraftId(null);
		router.navigate({
			to: "/live-tests",
			search: { draft: void 0 }
		});
		toast.success(`Live test scheduled: ${scheduled.testName}`);
	};
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = scheduleOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [scheduleOpen]);
	const scheduled = listScheduledLiveTests();
	const upcoming = scheduled.filter((test) => test.status === "UPCOMING");
	const liveNow = scheduled.filter((test) => test.status === "LIVE");
	const completed = scheduled.filter((test) => test.status === "COMPLETED");
	const missed = scheduled.filter((test) => test.status === "MISSED");
	const startLiveTest = async (test) => {
		const attempt = await startAttempt({
			id: test.id,
			name: test.testName,
			durationMin: test.durationMin,
			questionCount: test.questionCount,
			questions: test.fixedQuestions,
			subjects: [...new Set(test.fixedQuestions.map((q) => q.subject))],
			chapters: [...new Set(test.fixedQuestions.map((q) => q.chapter))],
			importedAt: Date.now(),
			updatedAt: Date.now(),
			valid: true,
			source: "custom",
			imageCount: 0,
			missingImages: 0,
			status: "valid",
			issues: []
		}, {
			questions: test.fixedQuestions,
			durationMin: test.durationMin,
			name: test.testName,
			attemptType: "live",
			scheduledTestId: test.id,
			liveStart: test.liveStart,
			liveEnd: test.liveEnd,
			testDurationMin: test.durationMin
		});
		addLiveAttemptToScheduled(test.id, attempt.id);
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: attempt.id }
		});
	};
	const attemptLater = async (test) => {
		const attempt = await startAttempt({
			id: test.id,
			name: test.testName,
			durationMin: test.durationMin,
			questionCount: test.questionCount,
			questions: test.fixedQuestions,
			subjects: [...new Set(test.fixedQuestions.map((q) => q.subject))],
			chapters: [...new Set(test.fixedQuestions.map((q) => q.chapter))],
			importedAt: Date.now(),
			updatedAt: Date.now(),
			valid: true,
			source: "custom",
			imageCount: 0,
			missingImages: 0,
			status: "valid",
			issues: []
		}, {
			questions: test.fixedQuestions,
			durationMin: test.durationMin,
			name: test.testName,
			attemptType: "missed",
			scheduledTestId: test.id,
			liveStart: test.liveStart,
			liveEnd: test.liveEnd,
			testDurationMin: test.durationMin
		});
		addLiveAttemptToScheduled(test.id, attempt.id);
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: attempt.id }
		});
	};
	const deleteScheduledTest = (test) => {
		if (test.status !== "UPCOMING") return;
		if (!window.confirm("Delete this scheduled Live Test?\nThis will remove the scheduled test and its schedule.")) return;
		deleteScheduledLiveTest(test.id);
		router.navigate({
			to: "/live-tests",
			search: { draft: void 0 }
		});
		toast.success(`Scheduled Live Test deleted: ${test.testName}`);
	};
	if (draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Preview & Check"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: ["Draft: ", draft.name]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: openCbtPreview,
						className: "rounded-lg border px-3 py-1.5 text-xs font-semibold",
						children: "Check Test in CBT Mode"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => validateDraftNow(),
						className: "rounded-lg border px-3 py-1.5 text-xs font-semibold",
						children: "Check Test Again"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: discardDraft,
						className: "rounded-lg border px-3 py-1.5 text-xs font-semibold text-destructive",
						children: "Close / Discard Draft"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setScheduleOpen((v) => !v),
						disabled: validSummary.invalid > 0,
						className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40",
						children: "Schedule Live Test"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-xl border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [draft.questions.length, " questions"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"✓ ",
							validSummary.valid,
							" valid"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"✕ ",
							validSummary.invalid,
							" invalid"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: openDraftSyllabusEditor,
						className: "rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground",
						children: "Add Syllabus"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: draft.questions.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-surface p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-semibold uppercase text-muted-foreground",
									children: [
										"Q",
										index + 1,
										" · ",
										question.subject
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => moveQuestion(index, Math.max(0, index - 1)),
											className: "rounded border px-2 py-1 text-[10px]",
											children: "↑"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => moveQuestion(index, Math.min(draft.questions.length - 1, index + 1)),
											className: "rounded border px-2 py-1 text-[10px]",
											children: "↓"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setEditingQuestionId(question.id),
											className: "rounded border px-2 py-1 text-[10px]",
											children: "Edit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeQuestion(question.id),
											className: "rounded border px-2 py-1 text-[10px] text-destructive",
											children: "Remove"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-sm text-foreground",
								children: question.text || "Question text missing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Chapter: ", question.chapter] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Topic: ", question.topic] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Type: ", question.type] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Difficulty: ", question.difficulty] })
								]
							})
						]
					}, question.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setAddOpen(true),
				className: "inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add Question"]
			})
		}),
		scheduleOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm",
			onClick: (e) => {
				if (e.target === e.currentTarget) setScheduleOpen(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_90px_rgba(0,0,0,0.25)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b bg-surface/60 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Schedule Live Test"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScheduleOpen(false),
						className: "rounded-full border bg-background p-2 text-muted-foreground hover:text-foreground",
						"aria-label": "Close schedule form",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Test Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.testName || draft.name,
									onChange: (e) => setForm((s) => ({
										...s,
										testName: e.target.value
									})),
									className: "w-full rounded-lg border bg-surface px-3 py-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: form.date,
									onChange: (e) => setForm((s) => ({
										...s,
										date: e.target.value
									})),
									className: "w-full rounded-lg border bg-surface px-3 py-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Live Start"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: form.liveStart,
									onChange: (e) => setForm((s) => ({
										...s,
										liveStart: e.target.value
									})),
									className: "w-full rounded-lg border bg-surface px-3 py-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Live End"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: form.liveEnd,
									onChange: (e) => setForm((s) => ({
										...s,
										liveEnd: e.target.value
									})),
									className: "w-full rounded-lg border bg-surface px-3 py-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Test Duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 1,
									value: form.durationMin,
									onChange: (e) => setForm((s) => ({
										...s,
										durationMin: Number(e.target.value) || 1
									})),
									className: "w-full rounded-lg border bg-surface px-3 py-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block font-medium",
									children: "Live window behavior"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: form.liveWindowMode,
									onChange: (e) => setForm((s) => ({
										...s,
										liveWindowMode: e.target.value
									})),
									className: "w-full rounded-lg border bg-surface px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "allow-finish",
										children: "Allow started tests to finish"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "force-submit",
										children: "Force submit at live window end"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setScheduleOpen(false),
							className: "rounded-lg border px-3 py-2 text-sm",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setScheduleOpen(false);
								scheduleDraft();
							},
							disabled: validSummary.invalid > 0,
							className: "rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40",
							children: "Confirm Schedule"
						})]
					})]
				})]
			})
		}),
		syllabusEditorOpen && draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm",
			onClick: (e) => {
				if (e.target === e.currentTarget) setSyllabusEditorOpen(false);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_90px_rgba(0,0,0,0.25)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b bg-surface/60 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Add Syllabus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSyllabusEditorOpen(false),
						className: "rounded-full border bg-background p-2 text-muted-foreground hover:text-foreground",
						"aria-label": "Close syllabus editor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[75vh] overflow-y-auto p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: [
							"Physics",
							"Chemistry",
							"Mathematics"
						].map((subject) => {
							const availableChapters = Array.from(new Set(draft.questions.filter((question) => question.subject === subject).map((question) => question.chapter).filter(Boolean).concat(bankQuestions.filter((question) => question.subject === subject).map((question) => question.chapter).filter(Boolean))));
							const chapterList = draftSyllabusEditor[subject] ?? [];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-xl border p-3 ${{
									Physics: "border-sky-200 bg-sky-50/80 dark:border-sky-800/70 dark:bg-sky-950/20",
									Chemistry: "border-violet-200 bg-violet-50/80 dark:border-violet-800/70 dark:bg-violet-950/20",
									Mathematics: "border-emerald-200 bg-emerald-50/80 dark:border-emerald-800/70 dark:bg-emerald-950/20"
								}[subject]}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-2 flex items-center justify-between gap-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-semibold text-foreground",
											children: subject
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 sm:flex-row",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												list: `${subject}-chapter-suggestions`,
												value: draftSyllabusInputs[subject] ?? "",
												onChange: (e) => setDraftSyllabusInputs((current) => ({
													...current,
													[subject]: e.target.value
												})),
												placeholder: `Add ${subject} chapter`,
												className: "w-full rounded-lg border bg-background px-3 py-2 text-sm"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => addDraftSyllabusChapter(subject),
												className: "rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground",
												children: "Add"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
												id: `${subject}-chapter-suggestions`,
												children: availableChapters.map((chapter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: chapter }, `${subject}-${chapter}`))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: chapterList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "No chapters added"
										}) : chapterList.map((chapter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => removeDraftSyllabusChapter(subject, chapter),
											className: "rounded-full border border-border bg-background px-2.5 py-1 text-sm text-foreground hover:border-destructive hover:text-destructive",
											children: [chapter, " ×"]
										}, `${subject}-${chapter}`))
									})
								]
							}, subject);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSyllabusEditorOpen(false),
							className: "rounded-lg border px-3 py-2 text-sm",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: saveDraftSyllabus,
							className: "rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground",
							children: "Save Syllabus"
						})]
					})]
				})]
			})
		}),
		addOpen && draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerEditor, {
			questions: creatingNewQuestion ? [createBlankQuestionForDraft({
				number: draft.questions.length + 1,
				subject: draft.questions[0]?.subject ?? "Physics"
			})] : bankQuestions,
			title: creatingNewQuestion ? "Create New Question" : "Add Question to Live Test",
			bankOptions,
			bankFilter,
			onBankFilterChange: setBankFilter,
			onClose: () => {
				setAddOpen(false);
				setCreatingNewQuestion(false);
				setBankFilter("all");
			},
			onSelect: creatingNewQuestion ? void 0 : async (question) => {
				addQuestion(question);
			},
			onCreateNew: creatingNewQuestion ? void 0 : () => setCreatingNewQuestion(true),
			onSave: creatingNewQuestion ? async (question) => {
				addQuestion({
					...question,
					id: `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
					number: question.number || draft.questions.length + 1,
					sourceId: void 0
				});
			} : void 0,
			saveLabel: creatingNewQuestion ? "Add to Live Test" : "Save",
			selectedQuestionIds: draft.questions.map((q) => q.sourceId ?? q.id)
		}),
		editingQuestionId && draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerEditor, {
			testId: draft.id,
			focusQuestionId: editingQuestionId,
			onClose: () => setEditingQuestionId(null),
			onSave: saveDraftQuestion
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Live Tests"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Upcoming, live, completed and missed tests remain fixed to their scheduled paper."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/create",
				search: { creationContext: "live" },
				className: "rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground",
				children: "Create Test"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: [
				"Upcoming",
				"Live Now",
				"Completed",
				"Missed"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(item),
				className: cn("rounded-full border px-3 py-1.5 text-xs font-semibold", tab === item ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: item
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-3",
			children: [
				(tab === "Upcoming" ? upcoming : tab === "Live Now" ? liveNow : tab === "Completed" ? completed : missed).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
					children: [
						"No ",
						tab.toLowerCase(),
						" tests yet."
					]
				}),
				(tab === "Upcoming" ? upcoming : tab === "Live Now" ? liveNow : tab === "Completed" ? completed : missed).map((test) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border bg-card p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 cursor-pointer",
							onClick: tab === "Upcoming" ? () => setSelectedSyllabusTestId(test.id) : void 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										tab === "Upcoming" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-amber-500" }),
										tab === "Live Now" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-red-500" }),
										tab === "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-green-500" }),
										tab === "Missed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-amber-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-base font-semibold",
											children: test.testName
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										formatLiveTestDate(test.liveStart),
										" · ",
										formatLiveWindowRange(test.liveStart, test.liveEnd)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										test.questionCount,
										" questions · ",
										formatLiveDuration(test.durationMin)
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								tab === "Upcoming" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										disabled: true,
										className: "rounded-lg border px-3 py-2 text-xs font-semibold text-muted-foreground",
										children: "Locked"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => deleteScheduledTest(test),
										className: "rounded-lg border border-destructive/40 px-3 py-2 text-xs font-semibold text-destructive",
										children: "Delete Test"
									})]
								}),
								tab === "Live Now" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void startLiveTest(test),
									className: "rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground",
									children: "Start Test"
								}),
								tab === "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg border px-3 py-2 text-xs font-semibold",
									children: "Completed"
								}),
								tab === "Missed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void attemptLater(test),
									className: "rounded-lg border px-3 py-2 text-xs font-semibold",
									children: "Attempt Later"
								})
							]
						})]
					})
				}, test.id)),
				selectedSyllabusTestId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-[80] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm",
					onClick: (e) => {
						if (e.target === e.currentTarget) setSelectedSyllabusTestId(null);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_90px_rgba(0,0,0,0.25)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b bg-surface/60 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Syllabus"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedSyllabusTestId(null),
								className: "rounded-full border bg-background p-2 text-muted-foreground hover:text-foreground",
								"aria-label": "Close syllabus view",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4",
							children: (() => {
								const selectedTest = listScheduledLiveTests().find((item) => item.id === selectedSyllabusTestId);
								if (!selectedTest) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "No syllabus available."
								});
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyllabusPanel, { syllabus: selectedTest.syllabus });
							})()
						})]
					})
				})
			]
		})
	] });
}
//#endregion
export { LiveTestsPage as component };
