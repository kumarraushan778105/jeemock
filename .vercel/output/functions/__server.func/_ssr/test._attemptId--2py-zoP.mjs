import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as awardAttemptXp, d as isAnswered, o as cn, p as isMultiCorrect, s as formatClock, v as optionIds } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Maximize, Dt as Check, Mt as Bookmark, Tt as ChevronLeft, b as Save, dt as EllipsisVertical, kt as Calculator, q as Images, rt as Flag, ut as Eraser, v as Send, wt as ChevronRight } from "../_libs/lucide-react.mjs";
import { A as getLiveTestDraft, F as listAttempts, G as putAttempt, T as getAttempt, W as orderQuestionsBySubject, j as getTest, o as completeScheduledLiveTest } from "./db-CAmn2mwk.mjs";
import { t as BOOKMARK_TAGS } from "./advanced-D6ylZ9Tw.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as LazyImage } from "./ImageViewer-CLGX6jid.mjs";
import { t as QuestionView } from "./QuestionView-C1bo6bV-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as addMarkedQuestionsToBookmarks } from "./nta-review-DZoU1Y7j.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DkEF5Esg.mjs";
import { n as Route, t as Calculator$1 } from "./test._attemptId-Bqfa9oXF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test._attemptId--2py-zoP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Strict Mode auto-submits after this many violations. */
var STRICT_LIMIT = 3;
function isNumericalQuestion(question) {
	return question?.type === "integer" || question?.type === "numerical";
}
function TestRunner() {
	const { attemptId } = Route.useParams();
	const router = useRouter();
	const data = useQuery({
		queryKey: ["attempt", attemptId],
		queryFn: async () => {
			if (attemptId.startsWith("preview_")) {
				const draftId = attemptId.replace(/^preview_/, "");
				const draft = getLiveTestDraft(draftId);
				if (!draft) throw new Error("Preview draft not found");
				const questions = orderQuestionsBySubject(draft.questions);
				return {
					attempt: {
						id: attemptId,
						testId: draft.id,
						testName: draft.name,
						startedAt: Date.now(),
						updatedAt: Date.now(),
						durationSec: Math.max(1, draft.durationMin || draft.questions.length * 2) * 60,
						remainingSec: Math.max(1, draft.durationMin || draft.questions.length * 2) * 60,
						currentIndex: 0,
						answers: Object.fromEntries(questions.map((question) => [question.id, {
							value: null,
							visited: false,
							marked: false,
							bookmarked: false,
							timeSpent: 0
						}])),
						submitted: false,
						questionIds: questions.map((question) => question.id),
						questionsSnapshot: questions,
						scoring: {
							marks: 4,
							negative: 1
						},
						attemptType: "normal",
						uiState: { subjectFilter: "all" },
						status: "IN_PROGRESS",
						preview: {
							draftId,
							mode: "check"
						}
					},
					questions,
					preview: { draftId }
				};
			}
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const test = await getTest(attempt.testId);
			const questions = attempt.questionsSnapshot ?? attempt.questionIds.map((id) => test?.questions.find((q) => q.id === id)).filter((q) => Boolean(q));
			if (questions.length === 0) throw new Error("This attempt has no questions available.");
			return {
				attempt,
				questions
			};
		},
		staleTime: 0,
		refetchOnMount: true,
		retry: false
	});
	if (data.isLoading || data.isFetching) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center text-sm text-muted-foreground",
		children: "Loading test…"
	});
	if (data.error || !data.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center px-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: "Could not open this test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: data.error?.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => router.navigate({ to: "/" }),
				className: "mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground",
				children: "Back home"
			})
		] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Runner, {
		initial: data.data.attempt,
		questions: data.data.questions,
		preview: "preview" in data.data ? data.data.preview : void 0
	});
}
function SaveIndicator({ state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "hidden w-[86px] shrink-0 select-none items-center justify-center gap-1 rounded-lg border bg-surface px-2 py-1.5 text-[11px] font-semibold text-muted-foreground sm:inline-flex",
		children: state === "saving" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-warning" }), " Saving"] }) : state === "saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3 text-success" }), " Saved"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "opacity-0",
			children: "Saved"
		})
	});
}
function Runner({ initial, questions, preview }) {
	const router = useRouter();
	const qc = useQueryClient();
	const isPreview = Boolean(preview);
	const [attempt, setAttempt] = (0, import_react.useState)(initial);
	const [index, setIndex] = (0, import_react.useState)(initial.currentIndex ?? 0);
	const [pendingAnswer, setPendingAnswer] = (0, import_react.useState)(null);
	const [fullscreenActive, setFullscreenActive] = (0, import_react.useState)(() => typeof document !== "undefined" && Boolean(document.fullscreenElement));
	const [fullscreenError, setFullscreenError] = (0, import_react.useState)(null);
	const [showCalc, setShowCalc] = (0, import_react.useState)(Boolean(initial.uiState?.calcOpen));
	const [showFigures, setShowFigures] = (0, import_react.useState)(false);
	const [showPalette, setShowPalette] = (0, import_react.useState)(true);
	const [submitConfirmationOpen, setSubmitConfirmationOpen] = (0, import_react.useState)(false);
	const [saveState, setSaveState] = (0, import_react.useState)("idle");
	const [strictWarning, setStrictWarning] = (0, import_react.useState)(null);
	const strictCount = (0, import_react.useRef)(0);
	const lastViolation = (0, import_react.useRef)(0);
	const [subjectFilter, setSubjectFilter] = (0, import_react.useState)(initial.uiState?.subjectFilter ?? "all");
	const [fontScale, setFontScale] = (0, import_react.useState)(initial.uiState?.fontScale ?? 1);
	const dirty = (0, import_react.useRef)(false);
	const lastChange = (0, import_react.useRef)(0);
	const lastWrite = (0, import_react.useRef)(Date.now());
	const savedSignature = (0, import_react.useRef)("");
	const writeChain = (0, import_react.useRef)(Promise.resolve());
	const attemptRef = (0, import_react.useRef)(attempt);
	attemptRef.current = attempt;
	const indexRef = (0, import_react.useRef)(index);
	indexRef.current = index;
	const submitted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const syncFullscreen = () => setFullscreenActive(Boolean(document.fullscreenElement));
		document.addEventListener("fullscreenchange", syncFullscreen);
		syncFullscreen();
		return () => document.removeEventListener("fullscreenchange", syncFullscreen);
	}, []);
	const enterFullscreen = async () => {
		if (!document.fullscreenEnabled) {
			setFullscreenError("Fullscreen is not supported in this browser.");
			return;
		}
		try {
			await document.documentElement.requestFullscreen();
			setFullscreenError(null);
		} catch (error) {
			console.error("[fullscreen] failed to enter fullscreen", error);
			setFullscreenError("Fullscreen permission was denied. Allow fullscreen to continue.");
		}
	};
	const persist = (0, import_react.useCallback)((snapshot) => {
		if (isPreview) return Promise.resolve(snapshot);
		writeChain.current = writeChain.current.catch(() => void 0).then(() => putAttempt(snapshot));
		return writeChain.current;
	}, [isPreview]);
	const syncAttemptList = (0, import_react.useCallback)((snapshot) => {
		if (isPreview || snapshot.preview) return;
		qc.setQueryData(["attempts"], (current) => {
			const attempts = current ?? [];
			return attempts.some((attempt) => attempt.id === snapshot.id) ? attempts.map((attempt) => attempt.id === snapshot.id ? snapshot : attempt) : [snapshot, ...attempts];
		});
	}, [isPreview, qc]);
	const question = questions[index];
	const answers = attempt.answers;
	(0, import_react.useEffect)(() => {
		setPendingAnswer(null);
	}, [question?.id]);
	const attemptedCount = questions.reduce((count, item) => count + (isAnswered(answers[item.id]?.value) ? 1 : 0), 0);
	const subjects = (0, import_react.useMemo)(() => [...new Set(questions.map((q) => q.subject))], [questions]);
	const update = (0, import_react.useCallback)((fn) => {
		dirty.current = true;
		lastChange.current = Date.now();
		const next = fn({
			...attemptRef.current,
			updatedAt: Date.now()
		});
		attemptRef.current = next;
		setAttempt(next);
		persist(next);
	}, [persist]);
	(0, import_react.useEffect)(() => {
		update((a) => ({
			...a,
			uiState: {
				...a.uiState,
				calcOpen: showCalc,
				subjectFilter,
				fontScale
			}
		}));
	}, [
		showCalc,
		subjectFilter,
		fontScale,
		update
	]);
	const patchAnswer = (0, import_react.useCallback)((qid, patch) => {
		update((a) => ({
			...a,
			answers: {
				...a.answers,
				[qid]: {
					...a.answers[qid] ?? {
						value: null,
						visited: true,
						marked: false,
						bookmarked: false,
						timeSpent: 0
					},
					...patch
				}
			}
		}));
	}, [update]);
	const savePendingAnswer = (0, import_react.useCallback)((questionId) => {
		if (pendingAnswer?.questionId === questionId) patchAnswer(questionId, { value: pendingAnswer.value });
		setPendingAnswer(null);
	}, [patchAnswer, pendingAnswer]);
	const clearAnswer = (0, import_react.useCallback)((questionId) => {
		setPendingAnswer((current) => current?.questionId === questionId ? null : current);
		patchAnswer(questionId, { value: null });
	}, [patchAnswer]);
	(0, import_react.useEffect)(() => {
		if (question && !attemptRef.current.answers[question.id]?.visited) patchAnswer(question.id, { visited: true });
	}, [question, patchAnswer]);
	(0, import_react.useEffect)(() => {
		const tick = setInterval(() => {
			if (submitted.current) return;
			if (!isPreview && !document.fullscreenElement) return;
			const q = questions[indexRef.current];
			const a = attemptRef.current;
			{
				const remaining = Math.max(0, a.remainingSec - 1);
				const next = {
					...a,
					remainingSec: remaining,
					currentIndex: indexRef.current,
					updatedAt: Date.now(),
					answers: q ? {
						...a.answers,
						[q.id]: {
							...a.answers[q.id] ?? {
								value: null,
								visited: true,
								marked: false,
								bookmarked: false,
								timeSpent: 0
							},
							timeSpent: (a.answers[q.id]?.timeSpent ?? 0) + 1
						}
					} : a.answers
				};
				dirty.current = true;
				lastChange.current = Date.now();
				if (remaining <= 0 && !submitted.current) setTimeout(() => doSubmit(true), 0);
				attemptRef.current = next;
				setAttempt(next);
			}
		}, 1e3);
		return () => clearInterval(tick);
	}, [questions]);
	/**
	* Background autosave: debounced after the last change, plus a periodic flush
	* so remaining time is persisted too. Writes are async, never block input and
	* never affect layout — only the fixed-size header indicator changes.
	*/
	(0, import_react.useEffect)(() => {
		let alive = true;
		const flush = async () => {
			if (submitted.current) return;
			const snapshot = {
				...attemptRef.current,
				currentIndex: indexRef.current
			};
			const signature = JSON.stringify({
				a: snapshot.answers,
				i: snapshot.currentIndex,
				r: snapshot.remainingSec,
				u: snapshot.uiState,
				p: snapshot.proctor
			});
			if (signature === savedSignature.current) return;
			dirty.current = false;
			lastWrite.current = Date.now();
			if (alive) setSaveState("saving");
			try {
				await persist(snapshot);
				savedSignature.current = signature;
				if (alive) setSaveState("saved");
			} catch (e) {
				console.error("[autosave] failed", e);
				dirty.current = true;
				if (alive) setSaveState("idle");
			}
		};
		const loop = setInterval(() => {
			const now = Date.now();
			const debounced = dirty.current && now - lastChange.current >= 1e3;
			const periodic = now - lastWrite.current >= 1e4;
			if (debounced || periodic) flush();
		}, 500);
		return () => {
			alive = false;
			clearInterval(loop);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onLeave = () => {
			if (submitted.current || attemptRef.current.preview) return;
			const snapshot = {
				...attemptRef.current,
				currentIndex: indexRef.current
			};
			persist(snapshot).then(() => syncAttemptList(snapshot));
		};
		window.addEventListener("beforeunload", onLeave);
		return () => {
			onLeave();
			window.removeEventListener("beforeunload", onLeave);
		};
	}, [persist, syncAttemptList]);
	const bumpProctor = (0, import_react.useCallback)((key, message) => {
		update((a) => ({
			...a,
			proctor: {
				tabSwitches: a.proctor?.tabSwitches ?? 0,
				fullscreenExits: a.proctor?.fullscreenExits ?? 0,
				blurs: a.proctor?.blurs ?? 0,
				[key]: (a.proctor?.[key] ?? 0) + 1
			}
		}));
		toast.warning(message);
	}, [update]);
	/**
	* Strict Mode: every tab switch, window switch, minimize or fullscreen exit is
	* one violation. 3 violations → the attempt is auto-submitted.
	*/
	const registerViolation = (0, import_react.useCallback)((reason) => {
		if (!attemptRef.current.strictMode || submitted.current) return;
		const now = Date.now();
		if (now - lastViolation.current < 1200) return;
		lastViolation.current = now;
		const count = strictCount.current + 1;
		strictCount.current = count;
		setStrictWarning({
			count,
			reason
		});
		if (count >= STRICT_LIMIT) {
			toast.error("Strict Mode: 3/3 violations — test submitted automatically");
			doSubmit(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const onVisibility = () => {
			if (attemptRef.current.mode === "nta") return;
			if (document.hidden) {
				bumpProctor("tabSwitches", "Tab switch detected — this is recorded");
				registerViolation("You switched tabs or minimised the window.");
			}
		};
		const onBlur = () => {
			if (attemptRef.current.mode === "nta") return;
			bumpProctor("blurs", "Window lost focus — this is recorded");
			registerViolation("You left the exam window.");
		};
		const onFsChange = () => {
			if (attemptRef.current.mode === "nta") return;
			if (!document.fullscreenElement) {
				bumpProctor("fullscreenExits", "You exited fullscreen — this is recorded");
				registerViolation("You exited fullscreen.");
			}
		};
		const block = (e) => e.preventDefault();
		document.addEventListener("visibilitychange", onVisibility);
		window.addEventListener("blur", onBlur);
		document.addEventListener("fullscreenchange", onFsChange);
		document.addEventListener("contextmenu", block);
		document.addEventListener("copy", block);
		document.addEventListener("cut", block);
		return () => {
			document.removeEventListener("visibilitychange", onVisibility);
			window.removeEventListener("blur", onBlur);
			document.removeEventListener("fullscreenchange", onFsChange);
			document.removeEventListener("contextmenu", block);
			document.removeEventListener("copy", block);
			document.removeEventListener("cut", block);
		};
	}, [bumpProctor, registerViolation]);
	const doSubmit = async (auto = false) => {
		if (isPreview) {
			submitted.current = true;
			toast.info("Preview closed — back to live test draft");
			router.navigate({
				to: "/live-tests",
				search: preview?.draftId ? { draft: preview.draftId } : void 0
			});
			return;
		}
		if (submitted.current) return;
		submitted.current = true;
		const submissionAttempt = attemptRef.current;
		let submittedAnswers = submissionAttempt.answers;
		if (submissionAttempt.mode === "nta" && questions.some((item) => submissionAttempt.answers[item.id]?.marked)) try {
			const previousAttempts = await listAttempts();
			const alreadyBookmarkedQuestionIds = new Set(previousAttempts.filter((previous) => previous.submitted && previous.id !== submissionAttempt.id && previous.testId === submissionAttempt.testId).flatMap((previous) => Object.entries(previous.answers).filter(([, answer]) => answer.bookmarked).map(([questionId]) => questionId)));
			submittedAnswers = addMarkedQuestionsToBookmarks(submissionAttempt.answers, questions, alreadyBookmarkedQuestionIds);
		} catch (error) {
			console.error("[submission] failed to load existing bookmarks", error);
			submitted.current = false;
			toast.error("Could not check existing bookmarks. Please try submitting again.");
			return;
		}
		const finished = {
			...submissionAttempt,
			currentIndex: indexRef.current,
			answers: submittedAnswers,
			submitted: true,
			submittedAt: Date.now(),
			updatedAt: Date.now(),
			questionsSnapshot: submissionAttempt.questionsSnapshot ?? questions,
			status: "COMPLETED"
		};
		const xpEarned = await awardAttemptXp(finished, questions);
		const withXp = {
			...finished,
			xpRewarded: (finished.xpRewarded ?? 0) + xpEarned,
			xpAwardedAt: Date.now()
		};
		const completedAttempt = {
			...withXp,
			resultId: withXp.id
		};
		await persist(completedAttempt);
		syncAttemptList(completedAttempt);
		completeScheduledLiveTest({
			id: completedAttempt.id,
			scheduledTestId: completedAttempt.scheduledTestId,
			submittedAt: completedAttempt.submittedAt,
			resultId: completedAttempt.resultId
		});
		await qc.invalidateQueries({
			queryKey: ["attempts"],
			refetchType: "all"
		});
		await qc.invalidateQueries({
			queryKey: ["reports"],
			refetchType: "all"
		});
		await qc.invalidateQueries({
			queryKey: ["dashboardStats"],
			refetchType: "all"
		});
		qc.removeQueries({ queryKey: ["attempt", completedAttempt.id] });
		toast[auto ? "warning" : "success"](auto ? "Time up — test submitted" : "Test submitted");
		router.navigate({
			to: "/result/$attemptId",
			params: { attemptId: withXp.id }
		});
	};
	const requestSubmit = () => {
		if (!submitted.current) setSubmitConfirmationOpen(true);
	};
	const confirmSubmit = () => {
		if (submitted.current) return;
		setSubmitConfirmationOpen(false);
		doSubmit();
	};
	const go = (0, import_react.useCallback)(async (i, allowSubjectChange = false, allowSectionChange = false) => {
		let nextIndex = Math.max(0, Math.min(questions.length - 1, i));
		const currentIndex = indexRef.current;
		const currentQuestion = questions[currentIndex];
		const currentSubject = currentQuestion?.subject;
		const violatesNtaNavigationScope = (candidate) => !allowSubjectChange && Boolean(currentSubject) && candidate?.subject !== currentSubject || !allowSectionChange && isNumericalQuestion(candidate) !== isNumericalQuestion(currentQuestion);
		if (attemptRef.current.mode === "nta" && violatesNtaNavigationScope(questions[nextIndex])) {
			const direction = i >= currentIndex ? 1 : -1;
			while (nextIndex >= 0 && nextIndex < questions.length && violatesNtaNavigationScope(questions[nextIndex])) nextIndex += direction;
			if (nextIndex < 0 || nextIndex >= questions.length) return;
		}
		const snapshot = {
			...attemptRef.current,
			currentIndex: nextIndex,
			updatedAt: Date.now()
		};
		indexRef.current = nextIndex;
		setIndex(nextIndex);
		attemptRef.current = snapshot;
		setAttempt(snapshot);
		dirty.current = true;
		lastChange.current = Date.now();
		setSaveState("saving");
		try {
			await persist(snapshot);
			savedSignature.current = JSON.stringify({
				a: snapshot.answers,
				i: snapshot.currentIndex,
				r: snapshot.remainingSec,
				u: snapshot.uiState,
				p: snapshot.proctor
			});
			lastWrite.current = Date.now();
			if (attemptRef.current === snapshot) {
				dirty.current = false;
				setSaveState("saved");
			}
		} catch (error) {
			console.error("[navigation] failed to save attempt", error);
			setSaveState("idle");
			toast.error("Could not save your answer. Please try again.");
		}
	}, [persist, questions]);
	const setValue = (v) => setPendingAnswer({
		questionId: question.id,
		value: v
	});
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.key === "ArrowRight" || e.key === "n") go(indexRef.current + 1);
			else if (e.key === "ArrowLeft" || e.key === "p") go(indexRef.current - 1);
			else if ([
				"1",
				"2",
				"3",
				"4",
				"5",
				"6"
			].includes(e.key)) {
				const q = questions[indexRef.current];
				const opt = (q ? optionIds(q) : [])[Number(e.key) - 1];
				if (q && opt) {
					const cur = pendingAnswer?.questionId === q.id ? pendingAnswer.value : attemptRef.current.answers[q.id]?.value;
					const sel = Array.isArray(cur) ? cur.map(String) : cur ? [String(cur)] : [];
					setPendingAnswer({
						questionId: q.id,
						value: isMultiCorrect(q) ? sel.includes(opt) ? sel.filter((x) => x !== opt) : [...sel, opt] : [opt]
					});
				}
			} else if (e.key === "c") {
				const q = questions[indexRef.current];
				if (q) clearAnswer(q.id);
			} else if (e.key === "m") {
				const q = questions[indexRef.current];
				if (q) patchAnswer(q.id, { marked: !attemptRef.current.answers[q.id]?.marked });
			} else if (e.key === "b") {
				const q = questions[indexRef.current];
				if (q) patchAnswer(q.id, { bookmarked: !attemptRef.current.answers[q.id]?.bookmarked });
			} else if (e.key === "k") setShowCalc((s) => !s);
			else if (e.key === "f") if (document.fullscreenElement) document.exitFullscreen();
			else document.documentElement.requestFullscreen?.();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		clearAnswer,
		go,
		pendingAnswer,
		patchAnswer,
		questions
	]);
	const adjustFontScale = (delta) => {
		setFontScale((current) => {
			const next = Math.min(1.4, Math.max(.8, Number((current + delta).toFixed(2))));
			update((a) => ({
				...a,
				uiState: {
					...a.uiState,
					fontScale: next
				}
			}));
			return next;
		});
	};
	const counts = (0, import_react.useMemo)(() => {
		let answered = 0, marked = 0, notAnswered = 0, notVisited = 0;
		for (const q of questions) {
			const a = answers[q.id];
			if (!a?.visited) notVisited += 1;
			else if (isAnswered(a.value)) answered += 1;
			else notAnswered += 1;
			if (a?.marked) marked += 1;
		}
		return {
			answered,
			marked,
			notAnswered,
			notVisited
		};
	}, [answers, questions]);
	const figureQuestions = questions.filter((q) => q.images.length > 0);
	const lowTime = attempt.remainingSec <= 300;
	const violations = (attempt.proctor?.tabSwitches ?? 0) + (attempt.proctor?.fullscreenExits ?? 0) + (attempt.proctor?.blurs ?? 0);
	if (!isPreview && !fullscreenActive) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-[#f4f8fc] px-4 text-slate-800",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "mx-auto size-8 text-blue-700" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-bold",
					children: "Fullscreen required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate-600",
					children: "Your test will continue in fullscreen. The timer is paused until fullscreen is active."
				}),
				fullscreenError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-3 text-sm text-red-600",
					children: fullscreenError
				}),
				document.fullscreenEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void enterFullscreen(),
					className: "mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600",
					children: "Enter fullscreen to continue"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-5 text-sm font-semibold text-red-600",
					children: "Fullscreen is not supported in this browser, so the test cannot continue."
				})
			]
		})
	});
	if (attempt.mode === "nta") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaExamScreen, {
		attempt,
		questions,
		index,
		answers,
		subjects,
		subjectFilter,
		setSubjectFilter,
		fontScale,
		adjustFontScale,
		showCalc,
		setShowCalc,
		showPalette,
		setShowPalette,
		initial,
		update,
		setValue,
		pendingAnswer,
		value: pendingAnswer?.questionId === question.id ? pendingAnswer.value : answers[question.id]?.value ?? null,
		patchAnswer,
		clearAnswer,
		savePendingAnswer,
		go,
		requestSubmit
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitConfirmationDialog, {
		open: submitConfirmationOpen,
		onOpenChange: setSubmitConfirmationOpen,
		total: questions.length,
		attempted: attemptedCount,
		remainingSeconds: attempt.remainingSec,
		onConfirm: confirmSubmit
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			isPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b bg-amber-500/10 px-4 py-2 text-center text-[11px] font-medium text-amber-700 dark:text-amber-200",
				children: "Preview mode: temporary CBT check only. Answers and timer state are not saved."
			}),
			strictWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[90] flex items-center justify-center bg-background/80 px-4 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold uppercase tracking-[0.24em] text-destructive",
							children: "Strict Mode"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mt-2 text-xl font-semibold",
							children: [
								"Warning ",
								Math.min(strictWarning.count, STRICT_LIMIT),
								"/",
								STRICT_LIMIT
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								strictWarning.reason,
								" ",
								strictWarning.count >= STRICT_LIMIT ? "This was your third violation — your test has been submitted automatically." : `Leaving the exam again will count as another violation. The test is submitted automatically after ${STRICT_LIMIT} violations.`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setStrictWarning(null),
							className: "mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
							children: "Continue"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-bold",
							children: attempt.testName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate text-[11px] text-muted-foreground",
							children: [
								"Question ",
								index + 1,
								" of ",
								questions.length,
								" · ",
								question.subject
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							violations > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								title: `${attempt.proctor?.tabSwitches ?? 0} tab switches · ${attempt.proctor?.fullscreenExits ?? 0} fullscreen exits · ${attempt.proctor?.blurs ?? 0} focus losses`,
								className: "rounded-lg border border-destructive/50 bg-destructive/10 px-2 py-1 text-[11px] font-semibold text-destructive",
								children: [
									violations,
									" violation",
									violations === 1 ? "" : "s"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveIndicator, { state: saveState }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("rounded-lg border px-3 py-1.5 font-mono text-sm font-bold tabular-nums", lowTime ? "border-destructive bg-destructive/10 text-destructive" : "bg-surface"),
								children: formatClock(attempt.remainingSec)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 rounded-lg border bg-surface px-2 py-1 text-sm font-semibold text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => adjustFontScale(-.1),
										className: "grid size-7 place-items-center rounded-md hover:bg-accent",
										"aria-label": "Decrease text size",
										children: "A-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1 text-[10px] uppercase tracking-wide",
										children: "Text size"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => adjustFontScale(.1),
										className: "grid size-7 place-items-center rounded-md hover:bg-accent",
										"aria-label": "Increase text size",
										children: "A+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								onClick: () => setShowFigures((s) => !s),
								label: "Figures",
								active: showFigures,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								onClick: () => setShowCalc((s) => !s),
								label: "Calculator (K)",
								active: showCalc,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								onClick: () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(),
								label: "Fullscreen (F)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-4" })
							}),
							isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (window.confirm("Exit preview and return to the live test draft?")) doSubmit();
								},
								className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Exit Preview"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: requestSubmit,
								className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Submit"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 w-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full transition-all", lowTime ? "bg-destructive" : "bg-primary"),
						style: { width: `${attempt.remainingSec / attempt.durationSec * 100}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid flex-1 lg:grid-cols-[minmax(0,1fr)_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 px-3 py-4 sm:px-4 sm:py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-5xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
								question,
								value: pendingAnswer?.questionId === question.id ? pendingAnswer.value : answers[question.id]?.value ?? null,
								onChange: setValue,
								fontScale
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky bottom-0 grid grid-cols-2 gap-2 border-t bg-card p-3 sm:flex sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionBtn, {
									onClick: () => clearAnswer(question.id),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-4" }),
									children: ["Clear ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "C" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionBtn, {
									onClick: () => patchAnswer(question.id, { marked: !answers[question.id]?.marked }),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }),
									active: answers[question.id]?.marked,
									children: ["Review ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "M" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionBtn, {
									onClick: () => patchAnswer(question.id, { bookmarked: !answers[question.id]?.bookmarked }),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }),
									active: answers[question.id]?.bookmarked,
									children: ["Bookmark ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kbd, { children: "B" })]
								}),
								answers[question.id]?.bookmarked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: answers[question.id]?.tag ?? "",
									onChange: (e) => patchAnswer(question.id, { tag: e.target.value || void 0 }),
									className: "rounded-lg border bg-background px-2 py-2 text-sm",
									"aria-label": "Bookmark tag",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Tag…"
									}), BOOKMARK_TAGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
								onClick: () => go(index - 1),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }),
								children: "Previous"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									savePendingAnswer(question.id);
									go(index + 1);
								},
								className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
								children: ["Save & Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "border-t bg-surface p-4 lg:border-t-0 lg:border-l",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 grid grid-cols-2 gap-2 text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									className: "bg-answered text-answered-foreground",
									n: counts.answered,
									label: "Answered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									className: "bg-notanswered text-notanswered-foreground",
									n: counts.notAnswered,
									label: "Not answered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									className: "bg-marked text-marked-foreground",
									n: counts.marked,
									label: "Marked"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									className: "bg-notvisited text-notvisited-foreground",
									n: counts.notVisited,
									label: "Not visited"
								})
							]
						}),
						subjects.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex flex-wrap gap-1",
							children: ["all", ...subjects].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSubjectFilter(s),
								className: cn("rounded-full border px-2.5 py-1 text-[11px]", subjectFilter === s ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
								children: s === "all" ? "All" : s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scroll-slim grid max-h-[46vh] grid-cols-6 gap-1.5 overflow-y-auto pr-1 lg:max-h-[calc(100vh-320px)]",
							children: questions.map((q, i) => {
								if (subjectFilter !== "all" && q.subject !== subjectFilter) return null;
								const a = answers[q.id];
								const ans = isAnswered(pendingAnswer?.questionId === q.id ? pendingAnswer.value : a?.value);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => go(i),
									title: `Q${q.number ?? i + 1} · ${q.subject} · ${q.chapter}`,
									className: cn("relative grid aspect-square place-items-center rounded-md border text-xs font-bold transition-transform hover:scale-105", !a?.visited && "bg-notvisited text-notvisited-foreground", a?.visited && !ans && !a?.marked && "bg-notanswered text-notanswered-foreground", ans && !a?.marked && "bg-answered text-answered-foreground", a?.marked && !ans && "bg-marked text-marked-foreground", a?.marked && ans && "bg-answeredmarked text-marked-foreground", i === index && "ring-2 ring-primary ring-offset-2 ring-offset-surface"),
									children: [
										q.number ?? i + 1,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "absolute right-0.5 bottom-0.5 flex gap-px",
											children: [
												q.flags.diagram && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-physics" }),
												q.flags.graph && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-maths" }),
												q.flags.table && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-warning" }),
												q.flags.chem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-chemistry" })
											]
										}),
										a?.bookmarked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "absolute top-0.5 left-0.5 size-2.5 fill-current opacity-80" })
									]
								}, q.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-1 text-[10px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-physics" }), " diagram"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-maths" }), " graph"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-warning" }), " table"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "bg-chemistry" }), " chem structure"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Shortcuts: 1–4 options · N/P navigate · C clear · M review · B bookmark · K calculator · F fullscreen" })]
						})
					]
				})]
			}),
			showCalc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed right-4 bottom-20 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator$1, {
					initialExpr: initial.uiState?.calcExpr ?? "",
					onExprChange: (calcExpr) => update((a) => ({
						...a,
						uiState: {
							...a.uiState,
							calcExpr
						}
					})),
					onClose: () => setShowCalc(false)
				})
			}),
			showFigures && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-y-0 right-0 z-50 flex w-80 flex-col border-l bg-card shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						children: "Figures panel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowFigures(false),
						className: "text-xs text-muted-foreground",
						children: "close"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-slim flex-1 space-y-3 overflow-y-auto p-3",
					children: [figureQuestions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "This paper has no figures."
					}), figureQuestions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							go(questions.findIndex((x) => x.id === q.id));
							setShowFigures(false);
						},
						className: "w-full rounded-lg border bg-surface p-2 text-left hover:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-1",
								children: q.images.slice(0, 3).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
									id,
									alt: `Q${q.number}`,
									className: "h-14 w-full object-cover rounded"
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[11px] font-semibold",
								children: [
									"Q",
									q.number,
									" · ",
									q.subject
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: q.chapter
							})
						]
					}, q.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitConfirmationDialog, {
				open: submitConfirmationOpen,
				onOpenChange: setSubmitConfirmationOpen,
				total: questions.length,
				attempted: attemptedCount,
				remainingSeconds: attempt.remainingSec,
				onConfirm: confirmSubmit
			})
		]
	});
}
function SubmitConfirmationDialog({ open, onOpenChange, total, attempted, remainingSeconds, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Submit Test?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Check your progress before submitting. You cannot change your answers afterward." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-1 gap-2 rounded-md border bg-muted/40 p-3 text-sm sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Total Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums",
							children: total
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Attempted Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums",
							children: attempted
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Not Attempted Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums",
							children: total - attempted
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Remaining Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold tabular-nums",
							children: formatClock(remainingSeconds)
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Go Back to Test" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: onConfirm,
						children: "Submit Test"
					})]
				})
			]
		})
	});
}
function NtaExamScreen({ attempt, questions, index, answers, subjects, subjectFilter, setSubjectFilter, fontScale, adjustFontScale, showCalc, setShowCalc, showPalette, setShowPalette, initial, update, setValue, pendingAnswer, value, patchAnswer, clearAnswer, savePendingAnswer, go, requestSubmit }) {
	const question = questions[index];
	const [activeSection, setActiveSection] = (0, import_react.useState)(question.type === "integer" || question.type === "numerical" ? "numerical" : "mcq");
	const selectedSubject = subjectFilter === "all" ? question.subject : subjectFilter;
	const subjectQuestions = questions.map((item, questionIndex) => ({
		item,
		questionIndex
	})).filter(({ item }) => item.subject === selectedSubject);
	const sectionQuestions = subjectQuestions.filter(({ item }) => isNumericalQuestion(item) === (activeSection === "numerical"));
	const hasNumerical = subjectQuestions.some(({ item }) => item.type === "integer" || item.type === "numerical");
	(0, import_react.useEffect)(() => {
		setActiveSection(question.type === "integer" || question.type === "numerical" ? "numerical" : "mcq");
	}, [question.type]);
	const answered = sectionQuestions.filter(({ item }) => isAnswered(answers[item.id]?.value) && !answers[item.id]?.marked).length;
	const notAnswered = sectionQuestions.filter(({ item }) => answers[item.id]?.visited && !isAnswered(answers[item.id]?.value) && !answers[item.id]?.marked).length;
	const notVisited = sectionQuestions.filter(({ item }) => !answers[item.id]?.visited).length;
	const marked = sectionQuestions.filter(({ item }) => answers[item.id]?.marked && !isAnswered(answers[item.id]?.value)).length;
	const answeredMarked = sectionQuestions.filter(({ item }) => answers[item.id]?.marked && isAnswered(answers[item.id]?.value)).length;
	const selectSection = (section) => {
		const nextQuestion = subjectQuestions.find(({ item }) => section === "numerical" ? item.type === "integer" || item.type === "numerical" : item.type !== "integer" && item.type !== "numerical");
		if (!nextQuestion) return;
		setActiveSection(section);
		go(nextQuestion.questionIndex, false, true);
	};
	const selectSubject = (subject) => {
		const candidates = questions.map((item, questionIndex) => ({
			item,
			questionIndex
		})).filter(({ item }) => item.subject === subject);
		const nextQuestion = candidates.find(({ item }) => activeSection === "numerical" ? item.type === "integer" || item.type === "numerical" : item.type !== "integer" && item.type !== "numerical") ?? candidates[0];
		setSubjectFilter(subject);
		if (nextQuestion) {
			setActiveSection(nextQuestion.item.type === "integer" || nextQuestion.item.type === "numerical" ? "numerical" : "mcq");
			go(nextQuestion.questionIndex, true, true);
		}
	};
	const navigateWithinSection = (direction) => {
		const nextQuestion = (direction > 0 ? sectionQuestions : [...sectionQuestions].reverse()).find(({ questionIndex }) => direction > 0 ? questionIndex > index : questionIndex < index);
		if (nextQuestion) go(nextQuestion.questionIndex, false, true);
	};
	const questionType = question.type === "single" ? "Single-select MCQ" : question.type === "multiple" ? "Multiple-select MCQ" : question.type === "integer" || question.type === "numerical" ? "Numerical" : question.type;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#f4f8fc] text-slate-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-10 items-center justify-between bg-[#2c6098] px-5 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "JEE Main Practice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(),
						className: "grid size-7 place-items-center hover:bg-white/10",
						"aria-label": "Toggle fullscreen",
						title: "Toggle fullscreen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-7 place-items-center text-lg leading-none hover:bg-white/10",
						"aria-label": "More exam options",
						title: "More exam options",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[72px] flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold leading-tight",
					children: attempt.testName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-slate-500",
					children: ["Chapter-wise · ", question.subject]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "whitespace-nowrap text-sm text-slate-600",
						children: [
							"Time Left :",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "ml-2 font-mono text-xl text-slate-900",
								children: formatClock(attempt.remainingSec)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 border-l border-slate-200 pl-3 text-sm text-slate-600",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-1 whitespace-nowrap text-xs",
								children: "Text size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => adjustFontScale(-.1),
								className: "h-9 min-w-10 rounded border border-slate-300 bg-white px-2 font-medium hover:bg-slate-50",
								"aria-label": "Decrease text size",
								children: "A−"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => adjustFontScale(.1),
								className: "h-9 min-w-10 rounded border border-slate-300 bg-white px-2 font-medium hover:bg-slate-50",
								"aria-label": "Increase text size",
								children: "A+"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("grid min-h-[calc(100vh-112px)]", showPalette ? "xl:grid-cols-[minmax(0,1fr)_325px]" : "grid-cols-1"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: cn("flex min-w-0 flex-col bg-white", showPalette && "border-r border-slate-200"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex min-h-12 flex-wrap items-center gap-1 border-b border-slate-200 bg-[#e9f1f9] px-6 py-1",
							children: subjects.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => selectSubject(subject),
								className: cn("min-w-24 rounded px-4 py-2 text-sm transition-colors", selectedSubject === subject ? "bg-[#2878c7] font-semibold text-white" : "text-slate-600 hover:bg-white/70"),
								children: subject
							}, subject))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-11 items-center justify-between gap-3 border-b border-slate-200 px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => selectSection("mcq"),
									disabled: !subjectQuestions.some(({ item }) => item.type !== "integer" && item.type !== "numerical"),
									className: cn("h-full border-b-2 px-1 text-sm", activeSection === "mcq" ? "border-blue-600 font-semibold text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"),
									children: "Section A - MCQ"
								}), hasNumerical && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => selectSection("numerical"),
									className: cn("h-full border-b-2 px-1 text-sm", activeSection === "numerical" ? "border-blue-600 font-semibold text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"),
									children: "Section B - Numerical"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 whitespace-nowrap text-sm text-slate-600",
								children: ["View in :", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "h-8 rounded border border-slate-300 bg-white px-2 text-sm text-slate-700",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "English" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-base font-bold",
								children: ["Question No. ", question.number ?? index + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Question Type : ", questionType] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-green-700",
										children: ["Marks : +", question.marks]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-red-600",
										children: ["Negative Marks : -", question.negative]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-[260px] flex-1 px-4 py-5 sm:px-6",
							style: { fontSize: `${fontScale}rem` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mx-auto w-full", showPalette ? "max-w-5xl" : "max-w-none"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
									question,
									value,
									onChange: setValue,
									fontScale
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-0 z-20 border-y border-slate-200 bg-white px-6 py-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => clearAnswer(question.id),
										className: "rounded border border-blue-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50",
										children: "Clear Response"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											savePendingAnswer(question.id);
											patchAnswer(question.id, {
												marked: !answers[question.id]?.marked,
												visited: true
											});
											navigateWithinSection(1);
										},
										className: "rounded border border-blue-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50",
										children: answers[question.id]?.marked ? "Unmark for Review & Next" : "Mark for Review & Next"
									})]
								}), !showPalette && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPalette(true),
										className: "rounded border border-blue-300 bg-white px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50",
										children: "Show Question Palette"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaSubmitActions, {
										goNext: () => {
											savePendingAnswer(question.id);
											navigateWithinSection(1);
										},
										requestSubmit
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => navigateWithinSection(-1),
									className: "rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-slate-50",
									children: "‹ \xA0 Previous"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => navigateWithinSection(1),
									className: "rounded border border-slate-300 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-slate-50",
									children: "Next \xA0 ›"
								})]
							})]
						})
					]
				}), showPalette && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 flex max-h-[calc(100vh-112px)] flex-col self-start overflow-y-auto border-l border-slate-200 bg-[#f5f9fd]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-x-3 gap-y-3 border-b border-slate-200 bg-white px-5 py-4 text-xs text-slate-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaLegend, {
									variant: "answered",
									count: answered,
									label: "Answered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaLegend, {
									variant: "not-answered",
									count: notAnswered,
									label: "Not Answered"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaLegend, {
									variant: "square",
									count: notVisited,
									label: "Not Visited"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaLegend, {
									variant: "circle",
									count: marked,
									label: "Marked for Review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaLegend, {
										variant: "answered-marked",
										count: answeredMarked,
										label: "Answered & Marked for Review"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-y border-[#b9cddd] bg-[#d8e6f3] px-5 py-3 text-sm text-slate-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: selectedSubject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-slate-500",
								children: [sectionQuestions.length, " questions"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-5 justify-items-center gap-x-2 gap-y-4 px-5 py-4",
							children: sectionQuestions.map(({ item, questionIndex }) => {
								const answer = answers[item.id];
								const hasAnswer = isAnswered(pendingAnswer?.questionId === item.id ? pendingAnswer.value : answer?.value);
								const status = answer?.marked ? hasAnswer ? "answered-marked" : "marked" : hasAnswer ? "answered" : answer?.visited ? "not-answered" : "not-visited";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										go(questionIndex, false, true);
										setActiveSection(item.type === "integer" || item.type === "numerical" ? "numerical" : "mcq");
									},
									className: cn("relative grid size-8 place-items-center text-xs font-bold transition-colors", status === "answered" && "bg-[#4f8d35] text-white", status === "not-answered" && "bg-[#c84e20] text-white", status === "marked" && "rounded-full bg-[#7952aa] text-white", status === "answered-marked" && "rounded-full bg-[#7952aa] text-white", status === "not-visited" && "rounded-sm border border-[#b9b9b9] bg-[#e9e9e9] text-slate-600 shadow-sm", questionIndex === index && "z-10 rounded-sm ring-2 ring-[#2675b8] ring-offset-2 ring-offset-[#f5f9fd]"),
									style: { clipPath: status === "answered" ? "polygon(50% 0, 100% 28%, 100% 100%, 0 100%, 0 28%)" : status === "not-answered" ? "polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)" : void 0 },
									"aria-current": questionIndex === index ? "step" : void 0,
									title: `Question ${item.number ?? questionIndex + 1}`,
									children: [item.number ?? questionIndex + 1, status === "answered-marked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute right-[-2px] bottom-[-2px] grid size-3 place-items-center rounded-sm border border-white bg-green-600 text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-2" })
									})]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 text-xs leading-5 text-slate-500",
							children: [
								activeSection === "numerical" ? "Numerical" : "MCQ",
								" questions",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Answered and marked for review responses will be evaluated."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPalette(false),
								className: "w-full rounded border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50",
								children: "Hide Question Palette"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3 border-t border-slate-300 bg-[#edf4fa] px-5 py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaSubmitActions, {
								goNext: () => {
									savePendingAnswer(question.id);
									navigateWithinSection(1);
								},
								requestSubmit
							})
						})
					]
				})]
			}),
			showCalc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed right-4 bottom-20 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator$1, {
					initialExpr: initial.uiState?.calcExpr ?? "",
					onExprChange: (calcExpr) => update((current) => ({
						...current,
						uiState: {
							...current.uiState,
							calcExpr
						}
					})),
					onClose: () => setShowCalc(false)
				})
			})
		]
	});
}
function NtaSubmitActions({ goNext, requestSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: goNext,
		className: "rounded bg-[#368b2c] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#2d7525]",
		children: "Save & Next"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: requestSubmit,
		className: "rounded bg-[#2465a2] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#1d548a]",
		children: "Submit Test"
	})] });
}
function NtaLegend({ variant, count, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("relative grid size-5 shrink-0 place-items-center text-[10px] font-bold", variant === "answered" ? "bg-[#4f8d35] text-white" : variant === "not-answered" ? "bg-[#c84e20] text-white" : variant === "square" ? "rounded-sm border border-[#b9b9b9] bg-[#e9e9e9] text-slate-600" : "rounded-full bg-[#7952aa] text-white", (variant === "answered" || variant === "not-answered") && "rounded-none"),
			style: variant === "answered" ? { clipPath: "polygon(50% 0, 100% 28%, 100% 100%, 0 100%, 0 28%)" } : variant === "not-answered" ? { clipPath: "polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)" } : void 0,
			children: [count, variant === "answered-marked" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-[-2px] bottom-[-2px] grid size-2.5 place-items-center rounded-sm border border-white bg-green-600 text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-1.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function Dot({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block size-1.5 rounded-full", className) });
}
function Legend({ className, n, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid size-5 place-items-center rounded text-[10px] font-bold", className),
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate text-muted-foreground",
			children: label
		})]
	});
}
function IconBtn({ children, onClick, label, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		title: label,
		"aria-label": label,
		className: cn("hidden size-9 place-items-center rounded-lg border transition-colors hover:bg-accent sm:grid", active ? "border-primary bg-primary/10 text-primary" : "bg-card"),
		children
	});
}
function ActionBtn({ children, onClick, icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-accent", active && "border-primary bg-primary/10 text-primary"),
		children: [icon, children]
	});
}
function Kbd({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "hidden rounded border bg-surface px-1 font-mono text-[10px] text-muted-foreground sm:inline",
		children
	});
}
//#endregion
export { Runner, TestRunner as component };
