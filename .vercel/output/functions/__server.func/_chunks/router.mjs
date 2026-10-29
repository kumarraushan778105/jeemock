import { o as __toESM } from "../_runtime.mjs";
import { i as createServerFn } from "../_libs/@tanstack/react-start+[...].mjs";
import { a as Overlay2, c as Title2, f as require_jsx_runtime, i as Description2, l as Trigger2, n as Cancel, o as Portal2, p as require_react, r as Content2, s as Root2, t as Action, u as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, h as Outlet, m as createRouter, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Folder, A as NotebookPen, At as Brain, B as Maximize, C as RefreshCcw, Ct as CircleCheck, D as Pen, Dt as Check, E as Pencil, Et as ChevronDown, F as Minimize2, Ft as ArrowRight, G as KeyRound, H as LoaderCircle, I as Mic, J as ImagePlus, K as Image$1, L as MicOff, M as Moon, Mt as Bookmark, N as MonitorCheck, Nt as BookOpen, O as PanelLeftOpen, Ot as ChartColumn, P as Minus, Pt as BookMarked, Q as Gauge, R as MessageSquareText, S as RotateCcw, St as CirclePlay, T as Play, Tt as ChevronLeft, U as Link2, V as Maximize2, W as LayoutGrid, X as History, Y as House, Z as Headphones, _ as Settings, _t as Clock3, a as Trophy, at as FilePlusCorner, b as Save, bt as CircleX, c as TrendingDown, ct as Eye, d as Target, dt as EllipsisVertical, et as FolderInput, f as Sun, ft as Download, g as ShieldCheck, gt as Clock, h as Shuffle, ht as CloudUpload, i as Upload, it as FileText, j as Move, jt as BrainCircuit, k as PanelLeftClose, kt as Calculator$1, l as Trash2, lt as ExternalLink, m as SlidersVertical, mt as Copy, n as Zap, nt as FlaskConical, o as TriangleAlert, ot as FileExclamationPoint, p as Sparkles, pt as Database, q as Images, r as X, rt as Flag, s as TrendingUp, st as FileBraces, t as ZoomIn, tt as FolderArchive, u as TimerReset, ut as Eraser, v as Send, vt as ClipboardList, w as Plus, wt as ChevronRight, x as RotateCw, xt as CircleSlash, y as Search, yt as ClipboardCopy, z as Menu } from "../_libs/lucide-react.mjs";
import { t as openDB } from "../_libs/idb.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, r as QueryClientProvider, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as require_mhchem, r as katex, t as katex_min_default } from "../_libs/katex.mjs";
import { n as toast, t as Toaster$1 } from "../_libs/sonner.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
import { a as XAxis, c as Bar$2, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as BarChart, o as Line, p as Legend$2, r as LineChart, s as CartesianGrid, t as PieChart, u as Cell$1 } from "../_libs/recharts+[...].mjs";
//#region src/styles.css?transform-only
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-BQbjz3bZ.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
//#endregion
//#region src/components/ThemeProvider.tsx
var import_jsx_runtime = require_jsx_runtime();
var ThemeCtx = (0, import_react.createContext)({
	theme: "dark",
	toggle: () => {}
});
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		setTheme(localStorage.getItem("cbt-theme") ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("cbt-theme", theme);
	}, [theme]);
	const toggle = (0, import_react.useCallback)(() => setTheme((t) => t === "dark" ? "light" : "dark"), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			theme,
			toggle
		},
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeCtx);
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Your saved tests and answers are safe on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$35 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "JEE CBT Platform — Main & Advanced Mock Test Engine" },
			{
				name: "description",
				content: "Offline-first computer based test platform for JEE Main and JEE Advanced with imports, diagrams and LaTeX rendering."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: katex_min_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$35.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			richColors: true
		})] })
	});
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/question-type.ts
var LETTERS$3 = "ABCDEFGHIJKL".split("");
/**
* Stable, unique option ids.
* Imported sets sometimes ship options with missing or duplicated ids, which made
* every duplicate toggle together. Falling back to the option letter keeps
* selection and answer-key matching one-to-one.
*/
function optionIds(q) {
	const used = /* @__PURE__ */ new Set();
	return q.options.map((o, i) => {
		const base = String(o.id ?? "").trim() || LETTERS$3[i] || String(i);
		let id = base;
		if (used.has(id)) id = LETTERS$3[i] ?? `${base}_${i}`;
		let n = 1;
		while (used.has(id)) id = `${base}_${n++}`;
		used.add(id);
		return id;
	});
}
/**
* True when the question must accept more than one selection.
* Detected from the stored answer key, so an answer-key import that adds a
* second correct option upgrades a "single" question automatically.
*/
function isMultiCorrect(q) {
	if (q.type === "integer" || q.type === "numerical" || q.matrix) return false;
	if (q.type === "multiple") return true;
	return (q.correct?.length ?? 0) > 1;
}
/**
* Human readable answer key of a match-the-following / matrix question.
* Uses the stored pairs when present, otherwise the positional `correct` array.
*/
function matrixAnswerLabel(q) {
	const rows = q.matrix?.left?.length ?? q.correct.length;
	const pairs = q.matrixPairs;
	const out = [];
	for (let i = 0; i < rows; i++) {
		const key = String(i + 1);
		const val = pairs?.[key] ?? q.correct[i];
		if (val) out.push(`${key} → ${val}`);
	}
	return out.join(", ") || "—";
}
//#endregion
//#region src/lib/types.ts
var QUESTION_TYPE_LABEL = {
	single: "Single Correct",
	multiple: "Multiple Correct",
	integer: "Integer",
	numerical: "Numerical",
	matrix: "Matrix Match",
	assertion: "Assertion Reason",
	paragraph: "Paragraph",
	diagram: "Diagram",
	graph: "Graph",
	table: "Table"
};
var EXAM_LABEL = {
	main: "JEE Main",
	advanced: "JEE Advanced"
};
var SUBJECTS$2 = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
//#endregion
//#region src/lib/validate.ts
/**
* Parses "2", "2,3", "2.5, 3.5" (also `;`/space separated) into a de-duplicated
* list of finite numbers. Used by the answer editor, importer and answer keys so
* numerical questions can hold several acceptable values.
*/
function parseNumericList(input) {
	const raw = Array.isArray(input) ? input : [input];
	const out = [];
	for (const part of raw) {
		if (part === null || part === void 0) continue;
		for (const piece of String(part).split(/[,;|\s]+/)) {
			const t = piece.trim();
			if (!t) continue;
			const n = Number(t);
			if (!Number.isFinite(n)) continue;
			if (!out.some((x) => x === n)) out.push(n);
		}
	}
	return out;
}
/** Every accepted numerical answer of a question (legacy single value included). */
function numericAnswers(q) {
	const many = q.answerValues?.filter((n) => Number.isFinite(n)) ?? [];
	const all = many.length ? [...many] : [];
	if (q.answerValue !== void 0 && Number.isFinite(q.answerValue) && !all.includes(q.answerValue)) all.push(q.answerValue);
	return all;
}
/** Human readable answer key of a numerical question. */
function numericAnswerLabel(q) {
	const list = numericAnswers(q);
	return list.length ? list.join(", ") : "—";
}
var isNumericType = (t) => t === "integer" || t === "numerical";
var VALID_TYPES = new Set(Object.keys(QUESTION_TYPE_LABEL));
/** Normalized content signature used for duplicate detection. */
function contentSignature(q) {
	return `${String(q.text ?? "").toLowerCase().replace(/\s+/g, " ").trim()}##${(q.options ?? []).map((o) => String(o?.text ?? "").toLowerCase().replace(/\s+/g, " ").trim()).join("|")}`;
}
/**
* Validates one question. `seen` (optional) accumulates ids and content
* signatures so duplicates inside the same pool are reported.
*/
function validateQuestion(q, seen) {
	const reasons = [];
	if (!q || typeof q !== "object") return {
		valid: false,
		reasons: ["Corrupted question data"]
	};
	if (!Array.isArray(q.options)) reasons.push("Corrupted question data (options are not a list)");
	const type = q.type;
	if (!type || !VALID_TYPES.has(type)) reasons.push(`Invalid question type "${String(type)}"`);
	const text = String(q.text ?? "").trim();
	const hasImage = Array.isArray(q.images) && q.images.length > 0;
	if (!text && !hasImage) reasons.push("Missing question text");
	const numeric = isNumericType(type);
	const matrix = Boolean(q.matrix);
	const objective = !numeric && !matrix;
	if (numeric) {
		if (numericAnswers(q).length === 0) reasons.push("Invalid or missing numerical answer");
	} else if (objective) {
		/** image-only question: the uploaded image *is* the whole question (stem + options),
		*  so typed option text is not required — only a marked correct option. */
		const imageOnly = !text && hasImage;
		const options = Array.isArray(q.options) ? q.options : [];
		const filled = options.filter((o) => String(o?.text ?? "").trim() || (o?.images?.length ?? 0) > 0);
		if (!imageOnly) {
			if (options.length < 2) reasons.push("Missing options (fewer than 2)");
			else if (filled.length < 2) reasons.push("Incomplete options (empty option text)");
		}
		const correct = (q.correct ?? []).map(String).filter((c) => c.trim());
		if (correct.length === 0) reasons.push("Missing correct answer");
		else if (!imageOnly && options.length >= 2) {
			const ids = new Set(optionIds(q));
			if (!correct.some((c) => ids.has(c))) reasons.push("Correct answer does not match any option");
		}
	} else if ((q.correct ?? []).length === 0) reasons.push("Missing correct answer");
	if (!Number.isFinite(q.marks)) reasons.push("Incomplete data (invalid marks)");
	if (seen) {
		const id = String(q.id ?? "");
		if (!id) reasons.push("Incomplete data (missing question id)");
		else if (seen.ids.has(id)) reasons.push("Duplicate question id");
		else seen.ids.add(id);
		if (text) {
			const sig = contentSignature(q);
			if (seen.signatures.has(sig)) reasons.push("Duplicate question");
			else seen.signatures.add(sig);
		}
	}
	return {
		valid: reasons.length === 0,
		reasons
	};
}
/** Validates a pool, reporting duplicates across the whole pool. */
function validatePool(items, pick) {
	const seen = {
		ids: /* @__PURE__ */ new Set(),
		signatures: /* @__PURE__ */ new Set()
	};
	const report = {
		valid: [],
		invalid: [],
		total: items.length,
		reasonsById: /* @__PURE__ */ new Map()
	};
	for (const item of items) {
		const q = pick(item);
		const res = validateQuestion(q, seen);
		if (res.valid) report.valid.push(item);
		else {
			report.invalid.push({
				item,
				reasons: res.reasons
			});
			report.reasonsById.set(String(q?.id ?? ""), res.reasons);
		}
	}
	return report;
}
/** Valid/invalid counts for a set of questions. */
function validationCounts(questions) {
	const r = validatePool(questions, (q) => q);
	return {
		total: r.total,
		valid: r.valid.length,
		invalid: r.invalid.length
	};
}
//#endregion
//#region src/lib/scoring.ts
function isCorrect(q, value) {
	if (value === null || value === void 0) return false;
	if (q.type === "integer" || q.type === "numerical") {
		const n = Number(Array.isArray(value) ? value[0] : value);
		const accepted = numericAnswers(q);
		if (Number.isNaN(n) || accepted.length === 0) return false;
		const tol = q.type === "integer" ? 0 : q.tolerance ?? .01;
		return accepted.some((a) => Math.abs(n - a) <= tol);
	}
	const given = (Array.isArray(value) ? value : [value]).map(String).sort();
	const want = [...q.correct].map(String).sort();
	if (given.length === 0 || want.length === 0) return false;
	return given.length === want.length && given.every((g, i) => g === want[i]);
}
function isAnswered(value) {
	if (value === null || value === void 0) return false;
	if (Array.isArray(value)) return value.length > 0;
	return String(value).trim() !== "";
}
function scoreAttempt(test, attempt) {
	const perQuestion = test.questions.map((q) => {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value)) return {
			question: q,
			answer,
			status: "skipped",
			score: 0
		};
		const ok = isCorrect(q, answer.value);
		return {
			question: q,
			answer,
			status: ok ? "correct" : "wrong",
			score: ok ? q.marks : -q.negative
		};
	});
	const correct = perQuestion.filter((r) => r.status === "correct").length;
	const wrong = perQuestion.filter((r) => r.status === "wrong").length;
	const skipped = perQuestion.filter((r) => r.status === "skipped").length;
	const score = perQuestion.reduce((a, r) => a + r.score, 0);
	const maxScore = test.questions.reduce((a, q) => a + q.marks, 0);
	const negative = perQuestion.filter((r) => r.score < 0).reduce((a, r) => a + r.score, 0);
	const attempted = correct + wrong;
	const accuracy = attempted ? correct / attempted * 100 : 0;
	const group = (key) => {
		const map = /* @__PURE__ */ new Map();
		for (const r of perQuestion) {
			const k = key(r.question) || "General";
			const cur = map.get(k) ?? {
				name: k,
				correct: 0,
				wrong: 0,
				skipped: 0,
				score: 0,
				total: 0,
				time: 0
			};
			cur.total += 1;
			cur.score += r.score;
			cur.time += r.answer?.timeSpent ?? 0;
			cur[r.status] += 1;
			map.set(k, cur);
		}
		return [...map.values()].sort((a, b) => b.total - a.total);
	};
	return {
		perQuestion,
		correct,
		wrong,
		skipped,
		score,
		maxScore,
		negative,
		accuracy,
		timeSpent: perQuestion.reduce((a, r) => a + (r.answer?.timeSpent ?? 0), 0),
		bySubject: group((q) => q.subject),
		byChapter: group((q) => q.chapter)
	};
}
function formatClock(totalSeconds) {
	const s = Math.max(0, Math.floor(totalSeconds));
	return [
		Math.floor(s / 3600),
		Math.floor(s % 3600 / 60),
		s % 60
	].map((n) => String(n).padStart(2, "0")).join(":");
}
//#endregion
//#region src/lib/xp.ts
var XP_STORAGE_KEY = "cbt_xp";
var ERROR_JOURNAL_XP_SETTING_KEY = "cbt_error_journal_require_xp";
var XP_EVENT = "cbt-xp-change";
var DAY_MS = 1440 * 60 * 1e3;
var WEEK_MS = 7 * DAY_MS;
var memoryStore = /* @__PURE__ */ new Map();
function storage() {
	try {
		const ls = globalThis.localStorage;
		if (ls && typeof ls.getItem === "function" && typeof ls.setItem === "function" && typeof ls.removeItem === "function") return ls;
	} catch {}
	return {
		getItem: (key) => memoryStore.get(key) ?? null,
		setItem: (key, value) => {
			memoryStore.set(key, value);
		},
		removeItem: (key) => {
			memoryStore.delete(key);
		}
	};
}
function readXpState() {
	try {
		const raw = storage().getItem(XP_STORAGE_KEY);
		if (!raw) return makeFreshXpState();
		const parsed = JSON.parse(raw);
		return ensureXpCycle({
			...makeFreshXpState(),
			...parsed,
			transactions: Array.isArray(parsed.transactions) ? parsed.transactions : []
		});
	} catch {
		return makeFreshXpState();
	}
}
function writeXpState(next) {
	storage().setItem(XP_STORAGE_KEY, JSON.stringify(next));
	if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") window.dispatchEvent(new Event(XP_EVENT));
}
function makeFreshXpState() {
	const now = Date.now();
	return {
		balance: 0,
		weeklyEarned: 0,
		weeklySpent: 0,
		cycleStart: new Date(now).toISOString(),
		cycleEnd: new Date(now + WEEK_MS).toISOString(),
		transactions: []
	};
}
function ensureXpCycle(state) {
	const now = Date.now();
	const cycleStart = new Date(state.cycleStart).getTime();
	const cycleEnd = new Date(state.cycleEnd).getTime();
	if (!state.cycleStart || !state.cycleEnd || Number.isNaN(cycleStart) || Number.isNaN(cycleEnd)) return {
		...makeFreshXpState(),
		...state,
		transactions: state.transactions ?? []
	};
	if (now >= cycleEnd) return {
		...state,
		weeklyEarned: 0,
		weeklySpent: 0,
		cycleStart: new Date(now).toISOString(),
		cycleEnd: new Date(now + WEEK_MS).toISOString()
	};
	return state;
}
function getXpState() {
	return ensureXpCycle(readXpState());
}
function getRequireXpForErrorJournal() {
	try {
		const raw = storage().getItem(ERROR_JOURNAL_XP_SETTING_KEY);
		if (raw === null || raw === void 0) return true;
		return raw === "true" || raw === "1";
	} catch {
		return true;
	}
}
function setRequireXpForErrorJournal(enabled) {
	storage().setItem(ERROR_JOURNAL_XP_SETTING_KEY, String(enabled));
	if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") window.dispatchEvent(new Event(XP_EVENT));
}
function formatXp(value) {
	return `${value >= 0 ? "+" : "-"}${Math.abs(value).toLocaleString()} XP`;
}
function hasXpTransaction(source, sourceId) {
	const { transactions } = getXpState();
	return transactions.some((tx) => tx.source === source && tx.sourceId === sourceId);
}
function awardXpForCorrectAnswer(attemptId, questionId, reason = "Correct question") {
	const sourceId = `${attemptId}:${questionId}`;
	if (hasXpTransaction("test-question", sourceId)) return {
		amount: 0,
		transaction: null,
		state: getXpState()
	};
	const state = ensureXpCycle(readXpState());
	const tx = {
		id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
		type: "earn",
		amount: 4,
		source: "test-question",
		sourceId,
		reason,
		timestamp: Date.now(),
		attemptId,
		questionId,
		xpRewarded: 4
	};
	const next = {
		...state,
		balance: state.balance + 4,
		weeklyEarned: state.weeklyEarned + 4,
		transactions: [tx, ...state.transactions]
	};
	writeXpState(next);
	return {
		amount: 4,
		transaction: tx,
		state: next
	};
}
function spendXpForErrorJournal(entryId, amount = 20) {
	const state = ensureXpCycle(readXpState());
	const sourceId = `error-journal:${entryId}`;
	if (hasXpTransaction("error-journal", sourceId)) return {
		amount: 0,
		transaction: null,
		state,
		ok: false
	};
	if (state.balance < amount) return {
		amount: 0,
		transaction: null,
		state,
		ok: false,
		insufficient: true
	};
	const tx = {
		id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
		type: "spend",
		amount,
		source: "error-journal",
		sourceId,
		reason: "Added Error Journal entry",
		timestamp: Date.now()
	};
	const next = {
		...state,
		balance: state.balance - amount,
		weeklySpent: state.weeklySpent + amount,
		transactions: [tx, ...state.transactions]
	};
	writeXpState(next);
	return {
		amount,
		transaction: tx,
		state: next,
		ok: true
	};
}
function applyMissedLiveTestPenalty(testId, amount = 10) {
	const state = ensureXpCycle(readXpState());
	const sourceId = `live-test:${testId}`;
	if (hasXpTransaction("live-test", sourceId)) return {
		amount: 0,
		transaction: null,
		state,
		ok: false,
		alreadyApplied: true
	};
	const available = Math.max(0, state.balance);
	const deduction = Math.min(amount, available);
	if (deduction <= 0) return {
		amount: 0,
		transaction: null,
		state,
		ok: false,
		insufficient: true
	};
	const tx = {
		id: `xp_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`,
		type: "spend",
		amount: deduction,
		source: "live-test",
		sourceId,
		reason: "Missed Live Test",
		timestamp: Date.now()
	};
	const next = {
		...state,
		balance: Math.max(0, state.balance - deduction),
		weeklySpent: state.weeklySpent + deduction,
		transactions: [tx, ...state.transactions]
	};
	writeXpState(next);
	return {
		amount: deduction,
		transaction: tx,
		state: next,
		ok: true
	};
}
async function awardAttemptXp(attempt, questions) {
	if (questions.reduce((sum, q) => {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value)) return sum;
		return isCorrect(q, answer.value) ? sum + 4 : sum;
	}, 0) <= 0) return 0;
	let awarded = 0;
	const seen = /* @__PURE__ */ new Set();
	for (const q of questions) {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value) || !isCorrect(q, answer.value)) continue;
		const sourceId = `${attempt.id}:${q.id}`;
		if (seen.has(sourceId) || hasXpTransaction("test-question", sourceId)) continue;
		seen.add(sourceId);
		const result = awardXpForCorrectAnswer(attempt.id, q.id, `Correct question · ${q.subject}`);
		awarded += result.amount;
	}
	return awarded;
}
function getXpCycleDay() {
	const state = getXpState();
	const start = new Date(state.cycleStart).getTime();
	const elapsed = Date.now() - start;
	return {
		current: Math.min(7, Math.max(1, Math.floor(elapsed / DAY_MS) + 1)),
		total: 7
	};
}
function xpForResultAttempt(attempt, questions) {
	return questions.reduce((sum, q) => {
		const answer = attempt.answers[q.id];
		if (!answer || !isAnswered(answer.value) || !isCorrect(q, answer.value)) return sum;
		return sum + 4;
	}, 0);
}
function xpCycleLabel() {
	const { current, total } = getXpCycleDay();
	return `Day ${current} / ${total}`;
}
//#endregion
//#region src/components/AppShell.tsx
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: House,
		exact: true
	},
	{
		to: "/bank",
		label: "Question Bank",
		icon: LayoutGrid
	},
	{
		to: "/library",
		label: "Chapter Library",
		icon: BookOpen
	},
	{
		to: "/create",
		label: "Create Test",
		icon: FilePlusCorner
	},
	{
		to: "/practice",
		label: "Practice",
		icon: Target
	},
	{
		to: "/live-tests",
		label: "Live Tests",
		icon: CirclePlay
	},
	{
		to: "/advanced",
		label: "JEE Advanced",
		icon: FlaskConical
	},
	{
		to: "/results",
		label: "History",
		icon: History
	},
	{
		to: "/resumes",
		label: "Resume Tests",
		icon: CirclePlay
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/mentor",
		label: "AI Mentor",
		icon: Brain
	},
	{
		to: "/mistakes",
		label: "Mistake Analysis",
		icon: Brain
	},
	{
		to: "/bookmarks",
		label: "Bookmarks",
		icon: Bookmark
	},
	{
		to: "/notebook",
		label: "Wrong Notebook",
		icon: NotebookPen
	},
	{
		to: "/errorjournal",
		label: "Error Journal",
		icon: BookMarked
	},
	{
		to: "/notes",
		label: "Notes Library",
		icon: FileText
	},
	{
		to: "/figures",
		label: "Figures",
		icon: Images
	},
	{
		to: "/import",
		label: "Import",
		icon: FolderInput
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavList({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "space-y-0.5 p-2",
		children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: n.to,
			onClick: onNavigate,
			activeOptions: { exact: Boolean(n.exact) },
			activeProps: { className: "bg-primary/12 text-primary font-semibold" },
			className: "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: n.label
			})]
		}, n.to))
	});
}
function AppShell({ children }) {
	const { theme, toggle } = useTheme();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [xpBalance, setXpBalance] = (0, import_react.useState)(() => getXpState().balance);
	(0, import_react.useEffect)(() => {
		const sync = () => setXpBalance(getXpState().balance);
		sync();
		window.addEventListener("cbt-xp-change", sync);
		return () => window.removeEventListener("cbt-xp-change", sync);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b bg-card/85 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-3 py-2.5 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(true),
						"aria-label": "Open navigation",
						className: "grid size-9 shrink-0 place-items-center rounded-md border bg-card lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-bold tracking-tight",
								children: "JEE CBT Platform"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden truncate text-[11px] text-muted-foreground sm:block",
								children: "Main & Advanced test engine"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/xp",
								className: "hidden items-center gap-1 rounded-lg border bg-card px-2.5 py-1.5 text-xs font-semibold sm:inline-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-primary" }),
									xpBalance.toLocaleString(),
									" XP"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create",
								className: "hidden rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground sm:inline-flex",
								children: "New Test"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggle,
								"aria-label": "Toggle theme",
								className: "grid size-9 shrink-0 place-items-center rounded-md border bg-card transition-colors hover:bg-accent",
								children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "sticky top-[57px] hidden h-[calc(100vh-57px)] w-56 shrink-0 overflow-y-auto border-r bg-card/40 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {})
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-black/60",
						onClick: () => setOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-y-0 left-0 w-64 overflow-y-auto border-r bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold",
								children: "Menu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen(false),
								"aria-label": "Close navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { onNavigate: () => setOpen(false) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: cn("min-w-0 flex-1 px-4 py-6 sm:px-6"),
					children
				})
			]
		})]
	});
}
//#endregion
//#region src/components/StartModeDialog.tsx
function StartModeDialog({ open, onOpenChange, onStart }) {
	const [mode, setMode] = (0, import_react.useState)("normal");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setMode("normal");
			setBusy(false);
		}
	}, [open]);
	if (!open) return null;
	const handleStart = async () => {
		setBusy(true);
		try {
			await onStart(mode);
			onOpenChange(false);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-center justify-center bg-background/75 p-4 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl overflow-hidden rounded-[24px] border border-white/20 bg-card/80 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-white/10 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Exam Mode"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-semibold tracking-tight",
								children: "Start Test"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Choose your exam mode before the test begins."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "rounded-full border border-white/20 bg-background/50 p-2 text-muted-foreground transition-colors hover:bg-background",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("normal"),
							className: cn("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all", mode === "normal" ? "border-primary/40 bg-primary/10 shadow-sm" : "border-border bg-background/40 hover:border-primary/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 rounded-2xl bg-background/70 p-2 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorCheck, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Normal Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Regular exam experience. The test always starts in fullscreen."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("strict"),
							className: cn("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all", mode === "strict" ? "border-amber-500/40 bg-amber-500/10 shadow-sm" : "border-border bg-background/40 hover:border-amber-500/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 rounded-2xl bg-background/70 p-2 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Strict Mode (Recommended)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "The test starts in Fullscreen. Every tab switch, window switch or minimise counts as one violation — after 3 violations your test is submitted automatically."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("nta"),
							className: cn("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all", mode === "nta" ? "border-blue-500/40 bg-blue-500/10 shadow-sm" : "border-border bg-background/40 hover:border-blue-500/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 rounded-2xl bg-background/70 p-2 text-blue-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorCheck, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "NTA-Style CBT Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Experience a JEE Main-style computer-based examination interface in fullscreen."
							})] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse gap-2 border-t border-white/10 bg-background/40 p-4 sm:flex-row sm:justify-end sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onOpenChange(false),
						className: "rounded-xl border bg-background/70 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleStart,
						disabled: busy,
						className: "rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60",
						children: busy ? "Preparing…" : "Start Test"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/lib/question-order.ts
var SUBJECT_ORDER$2 = [
	"chemistry",
	"physics",
	"mathematics"
];
function subjectRank$1(subject) {
	const normalized = subject.trim().toLowerCase();
	const canonical = normalized === "math" || normalized === "maths" ? "mathematics" : normalized;
	const rank = SUBJECT_ORDER$2.indexOf(canonical);
	return rank === -1 ? SUBJECT_ORDER$2.length : rank;
}
function orderQuestionsBySubject(questions) {
	return [...questions].sort((a, b) => subjectRank$1(a.subject) - subjectRank$1(b.subject) || a.number - b.number).map((question, index) => ({
		...question,
		number: index + 1
	}));
}
//#endregion
//#region src/lib/live-tests.ts
var LIVE_TEST_SUBJECTS = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
function makeDraftQuestionId() {
	return `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function createBlankQuestionForDraft(seed) {
	return {
		id: makeDraftQuestionId(),
		number: seed?.number ?? 1,
		subject: seed?.subject ?? "Physics",
		chapter: seed?.chapter ?? "General",
		topic: seed?.topic ?? "",
		difficulty: seed?.difficulty ?? "Medium",
		type: seed?.type ?? "single",
		text: seed?.text ?? "",
		paragraph: seed?.paragraph,
		options: seed?.options ?? [
			{
				id: "A",
				text: ""
			},
			{
				id: "B",
				text: ""
			},
			{
				id: "C",
				text: ""
			},
			{
				id: "D",
				text: ""
			}
		],
		correct: seed?.correct ?? [],
		answerValue: seed?.answerValue,
		answerValues: seed?.answerValues,
		tolerance: seed?.tolerance ?? .01,
		matrix: seed?.matrix,
		matrixPairs: seed?.matrixPairs,
		spacing: seed?.spacing,
		tableHtml: seed?.tableHtml,
		solution: seed?.solution,
		explanation: seed?.explanation,
		images: [...seed?.images ?? []],
		marks: seed?.marks ?? 4,
		negative: seed?.negative ?? 1,
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: false
		},
		tags: seed?.tags,
		hash: seed?.hash,
		pyq: seed?.pyq,
		year: seed?.year,
		formula: seed?.formula,
		concept: seed?.concept,
		altMethod: seed?.altMethod,
		sourceId: seed?.sourceId
	};
}
function cloneQuestionForDraft(question) {
	return {
		...question,
		id: makeDraftQuestionId(),
		sourceId: question.id,
		images: [...question.images],
		options: question.options.map((option) => ({
			...option,
			images: option.images ? [...option.images] : void 0
		}))
	};
}
function questionAlreadyInDraft(draft, question) {
	if (!draft) return false;
	const sourceId = question.sourceId ?? question.id;
	return draft.questions.some((item) => {
		const itemSourceId = item.sourceId ?? item.id;
		return item.id === question.id || itemSourceId === sourceId || item.id === sourceId;
	});
}
function normalizeLiveTestSubject(subject) {
	const value = (subject ?? "").trim().toLowerCase();
	if (!value) return null;
	if (value === "physics") return "Physics";
	if (value === "chemistry") return "Chemistry";
	if (value === "math" || value === "mathematics" || value === "maths") return "Mathematics";
	return null;
}
function normalizeLiveTestSyllabus(syllabus) {
	const next = {};
	if (!syllabus) return next;
	for (const subject of LIVE_TEST_SUBJECTS) {
		const list = syllabus[subject] ?? [];
		const unique = Array.from(new Set((list ?? []).map((item) => item?.trim()).filter(Boolean)));
		if (unique.length > 0) next[subject] = unique;
	}
	return next;
}
function deriveLiveTestSyllabus(questions) {
	const grouped = {};
	for (const question of questions) {
		const subject = normalizeLiveTestSubject(question.subject);
		if (!subject) continue;
		const chapter = (question.chapter ?? "").trim();
		if (!chapter) continue;
		if (!grouped[subject]) grouped[subject] = [];
		if (!grouped[subject]?.includes(chapter)) grouped[subject]?.push(chapter);
	}
	return normalizeLiveTestSyllabus(grouped);
}
function getEffectiveLiveTestSyllabus(draft) {
	const custom = normalizeLiveTestSyllabus(draft.customSyllabus);
	if (Object.keys(custom).length > 0) return custom;
	return deriveLiveTestSyllabus(draft.questions);
}
function cloneQuestionSnapshot(question) {
	if (typeof structuredClone === "function") return structuredClone(question);
	return JSON.parse(JSON.stringify(question));
}
function liveTestPreviewAttemptId(draftId) {
	return `preview_${draftId}`;
}
function buildLiveTestPreviewAttempt(draft) {
	const questions = orderQuestionsBySubject(draft.questions);
	const durationSec = Math.max(1, Math.round((draft.durationMin || 180) * 60));
	const answers = Object.fromEntries(questions.map((question) => [question.id, {
		value: null,
		visited: false,
		marked: false,
		bookmarked: false,
		timeSpent: 0
	}]));
	return {
		id: liveTestPreviewAttemptId(draft.id),
		testId: draft.id,
		testName: draft.name,
		startedAt: Date.now(),
		updatedAt: Date.now(),
		durationSec,
		remainingSec: durationSec,
		currentIndex: 0,
		answers,
		submitted: false,
		questionIds: questions.map((question) => question.id),
		questionsSnapshot: questions,
		scoring: {
			marks: 4,
			negative: 1
		},
		attemptType: "normal",
		status: "PREVIEW",
		preview: {
			draftId: draft.id,
			mode: "check"
		}
	};
}
var DRAFT_KEY = "cbt_live_test_drafts";
var ACTIVE_DRAFT_KEY = "cbt_live_test_active_draft";
var SCHEDULED_KEY = "cbt_live_tests";
function read$1(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const value = window.localStorage.getItem(key);
		if (!value) return fallback;
		return JSON.parse(value);
	} catch {
		return fallback;
	}
}
function write$1(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
}
function getActiveLiveTestDraftId() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage.getItem(ACTIVE_DRAFT_KEY) ?? null;
	} catch {
		return null;
	}
}
function setActiveLiveTestDraftId(id) {
	if (typeof window === "undefined") return;
	try {
		if (!id) {
			window.localStorage.removeItem(ACTIVE_DRAFT_KEY);
			return;
		}
		window.localStorage.setItem(ACTIVE_DRAFT_KEY, id);
	} catch {}
}
function createLiveTestDraft(questions, name, examType = "JEE Main") {
	const orderedQuestions = orderQuestionsBySubject(questions);
	const draft = {
		id: `draft_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
		name: name || "Live Test Draft",
		examType,
		questions: orderedQuestions,
		questionIds: orderedQuestions.map((q) => q.id),
		questionCount: orderedQuestions.length,
		createdAt: Date.now(),
		updatedAt: Date.now(),
		durationMin: questions.length ? 180 : 0,
		customSyllabus: void 0,
		status: "draft"
	};
	write$1(DRAFT_KEY, [...read$1(DRAFT_KEY, []), draft]);
	setActiveLiveTestDraftId(draft.id);
	return draft;
}
function listLiveTestDrafts() {
	return read$1(DRAFT_KEY, []);
}
function getLiveTestDraft(id) {
	return listLiveTestDrafts().find((draft) => draft.id === id) ?? null;
}
function saveLiveTestDraft(draft) {
	const next = listLiveTestDrafts().filter((item) => item.id !== draft.id);
	const questions = orderQuestionsBySubject(draft.questions);
	const saved = {
		...draft,
		questions,
		questionIds: questions.map((question) => question.id),
		questionCount: questions.length,
		customSyllabus: normalizeLiveTestSyllabus(draft.customSyllabus),
		updatedAt: Date.now()
	};
	next.push(saved);
	write$1(DRAFT_KEY, next);
	setActiveLiveTestDraftId(saved.id);
	return saved;
}
function deleteLiveTestDraft(id) {
	write$1(DRAFT_KEY, listLiveTestDrafts().filter((draft) => draft.id !== id));
	if (getActiveLiveTestDraftId() === id) setActiveLiveTestDraftId(null);
}
function deleteScheduledLiveTest(id) {
	const list = read$1(SCHEDULED_KEY, []);
	const target = list.find((test) => test.id === id);
	const remaining = list.filter((test) => test.id !== id);
	write$1(SCHEDULED_KEY, remaining);
	if (target?.draftId) {
		listLiveTestDrafts();
		if (!remaining.some((test) => test.draftId === target.draftId)) deleteLiveTestDraft(target.draftId);
	}
	return remaining;
}
function listScheduledLiveTests() {
	const list = read$1(SCHEDULED_KEY, []);
	const now = Date.now();
	const processed = list.map((item) => {
		const syllabus = normalizeLiveTestSyllabus(item.syllabus ?? deriveLiveTestSyllabus(item.fixedQuestions ?? []));
		const next = {
			...item,
			syllabus
		};
		if (item.status === "COMPLETED") return next;
		if (now < item.liveStart) return {
			...next,
			status: "UPCOMING"
		};
		if (now <= item.liveEnd) return {
			...next,
			status: "LIVE"
		};
		const missed = {
			...next,
			status: "MISSED"
		};
		if (item.status === "MISSED" || next.attempts.length > 0) return missed;
		applyMissedLiveTestPenalty(next.id, 10);
		return missed;
	});
	write$1(SCHEDULED_KEY, processed);
	return processed;
}
function listUpcomingLiveTests() {
	return [...listScheduledLiveTests()].filter((test) => test.status === "UPCOMING" || test.status === "LIVE").sort((a, b) => {
		const aLive = a.status === "LIVE";
		if (aLive !== (b.status === "LIVE")) return aLive ? -1 : 1;
		return a.liveStart - b.liveStart;
	});
}
function scheduleLiveTest(draft, input) {
	const now = Date.now();
	const start = (/* @__PURE__ */ new Date(`${input.date}T${input.liveStart}`)).getTime();
	const end = (/* @__PURE__ */ new Date(`${input.date}T${input.liveEnd}`)).getTime();
	if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) throw new Error("Invalid live test window");
	const questions = orderQuestionsBySubject(draft.questions);
	const syllabus = normalizeLiveTestSyllabus(input.customSyllabus ?? draft.customSyllabus ?? deriveLiveTestSyllabus(questions));
	const fixedQuestions = questions.map((question) => cloneQuestionSnapshot(question));
	const scheduled = {
		id: `live_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
		draftId: draft.id,
		testName: input.testName || draft.name,
		examType: draft.examType,
		questionIds: questions.map((question) => question.id),
		fixedQuestions,
		questionCount: questions.length,
		durationMin: Math.max(1, Number(input.durationMin) || draft.durationMin || 180),
		liveStart: start,
		liveEnd: end,
		createdAt: now,
		scheduledAt: now,
		status: now < start ? "UPCOMING" : now <= end ? "LIVE" : "MISSED",
		liveWindowMode: input.liveWindowMode ?? "allow-finish",
		allowStartedTestsToFinish: input.liveWindowMode !== "force-submit",
		attempts: [],
		syllabus
	};
	write$1(SCHEDULED_KEY, [scheduled, ...read$1(SCHEDULED_KEY, [])]);
	deleteLiveTestDraft(draft.id);
	return scheduled;
}
function formatLiveTestDate(ts) {
	return new Date(ts).toLocaleDateString(void 0, {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function formatLiveWindowRange(start, end) {
	return `${new Date(start).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	})} – ${new Date(end).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	})}`;
}
function formatLiveDuration(mins) {
	return `${mins} minutes`;
}
function addLiveAttemptToScheduled(testId, attemptId) {
	write$1(SCHEDULED_KEY, read$1(SCHEDULED_KEY, []).map((test) => test.id === testId ? {
		...test,
		attempts: [...new Set([...test.attempts, attemptId])]
	} : test));
}
function completeScheduledLiveTest(attempt) {
	if (!attempt.scheduledTestId) return null;
	const next = read$1(SCHEDULED_KEY, []).map((test) => {
		if (test.id !== attempt.scheduledTestId) return test;
		const completedAt = attempt.submittedAt ?? Date.now();
		const completion = {
			resultId: attempt.resultId ?? attempt.id,
			correct: attempt.correct,
			wrong: attempt.wrong,
			skipped: attempt.skipped,
			score: attempt.score,
			total: attempt.total,
			percent: attempt.percent
		};
		return {
			...test,
			status: "COMPLETED",
			attempts: [...new Set([...test.attempts, attempt.id])],
			completedAttemptId: attempt.id,
			completedAt,
			completion
		};
	});
	write$1(SCHEDULED_KEY, next);
	return next.find((test) => test.id === attempt.scheduledTestId) ?? null;
}
//#endregion
//#region src/lib/db.ts
var DB_NAME = "jee-cbt";
var DB_VERSION = 8;
var dbPromise = null;
function getDB() {
	if (typeof window === "undefined") throw new Error("IndexedDB unavailable on server");
	if (!dbPromise) dbPromise = openDB(DB_NAME, DB_VERSION, { upgrade(db) {
		if (!db.objectStoreNames.contains("tests")) db.createObjectStore("tests", { keyPath: "id" });
		if (!db.objectStoreNames.contains("images")) db.createObjectStore("images", { keyPath: "id" }).createIndex("testId", "testId");
		if (!db.objectStoreNames.contains("attempts")) db.createObjectStore("attempts", { keyPath: "id" }).createIndex("testId", "testId");
		if (!db.objectStoreNames.contains("usage")) db.createObjectStore("usage", { keyPath: "id" });
		if (!db.objectStoreNames.contains("notes")) db.createObjectStore("notes", { keyPath: "id" });
		if (!db.objectStoreNames.contains("library")) db.createObjectStore("library", { keyPath: "id" });
		if (!db.objectStoreNames.contains("audioReflections")) db.createObjectStore("audioReflections", { keyPath: "id" });
		if (!db.objectStoreNames.contains("errorJournal")) db.createObjectStore("errorJournal", { keyPath: "id" }).createIndex("createdAt", "createdAt");
		if (!db.objectStoreNames.contains("errorJournalAudio")) db.createObjectStore("errorJournalAudio", { keyPath: "id" });
		if (!db.objectStoreNames.contains("errorJournalImages")) db.createObjectStore("errorJournalImages", { keyPath: "id" });
	} });
	return dbPromise;
}
function isDraftTestId(id) {
	return id.startsWith("draft_");
}
var LIVE_DRAFT_KEY = "cbt_live_test_drafts";
function readDrafts() {
	if (typeof window === "undefined") return {};
	try {
		const raw = window.localStorage.getItem(LIVE_DRAFT_KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
function writeDrafts(map) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(LIVE_DRAFT_KEY, JSON.stringify(map));
}
async function listTests() {
	return (await (await getDB()).getAll("tests")).filter((t) => !isDraftTestId(t.id)).sort((a, b) => b.importedAt - a.importedAt);
}
async function getTest(id) {
	const draftId = id.startsWith("preview_") ? id.replace(/^preview_/, "") : id.startsWith("draft_") ? id : null;
	if (draftId) {
		const draft = getLiveTestDraft(draftId);
		if (!draft) return void 0;
		return {
			id: draft.id,
			name: draft.name,
			description: "Temporary CBT preview draft",
			subjects: [...new Set(draft.questions.map((q) => q.subject))],
			chapters: [...new Set(draft.questions.map((q) => q.chapter))],
			questionCount: draft.questions.length,
			imageCount: draft.questions.reduce((sum, q) => sum + q.images.length, 0),
			missingImages: 0,
			importedAt: draft.createdAt,
			updatedAt: draft.updatedAt,
			source: "custom",
			durationMin: draft.durationMin,
			status: "valid",
			issues: [],
			questions: draft.questions
		};
	}
	return await (await getDB()).get("tests", id);
}
async function putTest(test) {
	if (isDraftTestId(test.id)) {
		const drafts = readDrafts();
		drafts[test.id] = test;
		writeDrafts(drafts);
		return test;
	}
	await (await getDB()).put("tests", test);
	return test;
}
async function deleteTest(id) {
	const db = await getDB();
	await db.delete("tests", id);
	const tx = db.transaction("images", "readwrite");
	let cursor = await tx.store.index("testId").openCursor(IDBKeyRange.only(id));
	while (cursor) {
		await cursor.delete();
		cursor = await cursor.continue();
	}
	await tx.done;
	const atx = db.transaction("attempts", "readwrite");
	let ac = await atx.store.index("testId").openCursor(IDBKeyRange.only(id));
	while (ac) {
		await ac.delete();
		ac = await ac.continue();
	}
	await atx.done;
}
async function putImage(img) {
	await (await getDB()).put("images", img);
}
async function putImages(imgs) {
	const tx = (await getDB()).transaction("images", "readwrite");
	for (const i of imgs) tx.store.put(i);
	await tx.done;
}
async function getImage(id) {
	return await (await getDB()).get("images", id);
}
async function listImages(testId) {
	return await (await getDB()).getAllFromIndex("images", "testId", testId);
}
async function listAllImages() {
	return await (await getDB()).getAll("images");
}
async function countImages() {
	return (await getDB()).count("images");
}
async function deleteImage(id) {
	await (await getDB()).delete("images", id);
}
var urlCache = /* @__PURE__ */ new Map();
async function imageUrl(id) {
	if (urlCache.has(id)) return urlCache.get(id);
	const rec = await getImage(id);
	if (!rec) return null;
	const url = URL.createObjectURL(rec.blob);
	urlCache.set(id, url);
	return url;
}
function forgetImageUrl(id) {
	const u = urlCache.get(id);
	if (u) URL.revokeObjectURL(u);
	urlCache.delete(id);
}
async function listAttempts() {
	return (await (await getDB()).getAll("attempts")).sort((a, b) => b.updatedAt - a.updatedAt);
}
async function getAttempt(id) {
	if (id.startsWith("preview_")) {
		const draft = getLiveTestDraft(id.replace(/^preview_/, ""));
		if (!draft) return void 0;
		return buildLiveTestPreviewAttempt(draft);
	}
	return await (await getDB()).get("attempts", id);
}
async function putAttempt(attempt) {
	const tx = (await getDB()).transaction("attempts", "readwrite");
	if (!(await tx.store.get(attempt.id))?.submitted || attempt.submitted) await tx.store.put(attempt);
	await tx.done;
}
async function deleteAttempt(id) {
	await (await getDB()).delete("attempts", id);
}
async function listUsage() {
	return await (await getDB()).getAll("usage");
}
async function usageMap() {
	return new Map((await listUsage()).map((u) => [u.id, u]));
}
async function bumpUsage(ids) {
	if (ids.length === 0) return;
	const tx = (await getDB()).transaction("usage", "readwrite");
	const now = Date.now();
	for (const id of ids) {
		const cur = await tx.store.get(id);
		tx.store.put({
			id,
			count: (cur?.count ?? 0) + 1,
			lastUsed: now
		});
	}
	await tx.done;
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
var noteKey = (attemptId, questionId) => `${attemptId}::${questionId}`;
function emptyNote(attemptId, questionId) {
	return {
		id: noteKey(attemptId, questionId),
		attemptId,
		questionId,
		tags: [],
		reason: "",
		learning: "",
		note: "",
		revision: false,
		updatedAt: 0
	};
}
async function listNotes(attemptId) {
	const all = await (await getDB()).getAll("notes");
	return attemptId ? all.filter((n) => n.attemptId === attemptId) : all;
}
async function putNote(note) {
	const db = await getDB();
	if (note.tags.length === 0 && !note.reason.trim() && !note.learning.trim() && !note.note.trim() && !note.revision) {
		await db.delete("notes", note.id);
		return;
	}
	await db.put("notes", {
		...note,
		updatedAt: Date.now()
	});
}
var audioReflectionKey = (attemptId, questionId) => `${attemptId}::${questionId}`;
async function getAudioReflection(attemptId, questionId) {
	return await (await getDB()).get("audioReflections", audioReflectionKey(attemptId, questionId));
}
async function putAudioReflection(reflection) {
	await (await getDB()).put("audioReflections", {
		...reflection,
		updatedAt: Date.now()
	});
}
async function deleteAudioReflection(id) {
	await (await getDB()).delete("audioReflections", id);
}
async function listLibraryNotes() {
	return (await (await getDB()).getAll("library")).sort((a, b) => b.createdAt - a.createdAt);
}
async function putLibraryNote(note) {
	await (await getDB()).put("library", note);
}
async function deleteLibraryNote(id) {
	const db = await getDB();
	const u = urlCache.get(`lib:${id}`);
	if (u) URL.revokeObjectURL(u);
	urlCache.delete(`lib:${id}`);
	await db.delete("library", id);
}
/** Cached object URL for a library note (PDF or image). */
async function libraryNoteUrl(id) {
	const key = `lib:${id}`;
	if (urlCache.has(key)) return urlCache.get(key);
	const rec = await (await getDB()).get("library", id);
	if (!rec) return null;
	const url = URL.createObjectURL(rec.blob);
	urlCache.set(key, url);
	return url;
}
async function listErrorJournalEntries() {
	return (await (await getDB()).getAllFromIndex("errorJournal", "createdAt")).reverse();
}
async function putErrorJournalEntry(entry) {
	await (await getDB()).put("errorJournal", {
		...entry,
		updatedAt: Date.now()
	});
}
async function deleteErrorJournalEntry(id) {
	const db = await getDB();
	await db.delete("errorJournal", id);
	await db.delete("errorJournalAudio", id);
	await db.delete("errorJournalImages", id);
}
async function getErrorJournalImage(id) {
	return (await (await getDB()).get("errorJournalImages", id))?.blob;
}
async function putErrorJournalImage(id, blob, mimeType) {
	const tx = (await getDB()).transaction("errorJournalImages", "readwrite");
	await tx.store.put({
		id,
		blob,
		mimeType,
		updatedAt: Date.now()
	});
	await tx.done;
}
async function getErrorJournalAudio(id) {
	return (await (await getDB()).get("errorJournalAudio", id))?.blob;
}
async function putErrorJournalAudio(id, blob, mimeType) {
	const tx = (await getDB()).transaction("errorJournalAudio", "readwrite");
	await tx.store.put({
		id,
		blob,
		mimeType,
		updatedAt: Date.now()
	});
	await tx.done;
}
async function deleteErrorJournalAudio(id) {
	await (await getDB()).delete("errorJournalAudio", id);
}
//#endregion
//#region src/lib/stats.ts
async function questionsForAttempt(attempt) {
	if (attempt.questionsSnapshot?.length) return attempt.questionsSnapshot;
	const test = await getTest(attempt.testId);
	return attempt.questionIds.map((id) => test?.questions.find((q) => q.id === id)).filter((q) => Boolean(q));
}
function asTest(questions, attempt) {
	return {
		id: attempt.testId,
		name: attempt.testName,
		subjects: [...new Set(questions.map((q) => q.subject))],
		chapters: [...new Set(questions.map((q) => q.chapter))],
		questionCount: questions.length,
		imageCount: 0,
		missingImages: 0,
		importedAt: attempt.startedAt,
		updatedAt: attempt.updatedAt,
		source: "custom",
		durationMin: Math.round(attempt.durationSec / 60),
		status: "valid",
		issues: [],
		questions
	};
}
async function buildReport(attempt) {
	const questions = await questionsForAttempt(attempt);
	return {
		attempt,
		questions,
		summary: scoreAttempt(asTest(questions, attempt), attempt)
	};
}
async function allReports() {
	const attempts = (await listAttempts()).filter((a) => a.submitted);
	return Promise.all(attempts.map(buildReport));
}
/** consecutive days (ending today or yesterday) with at least one submission */
function streakFromAttempts(attempts) {
	const days = new Set(attempts.filter((a) => a.submitted).map((a) => new Date(a.submittedAt ?? a.updatedAt).toDateString()));
	if (days.size === 0) return 0;
	const d = /* @__PURE__ */ new Date();
	if (!days.has(d.toDateString())) {
		d.setDate(d.getDate() - 1);
		if (!days.has(d.toDateString())) return 0;
	}
	let streak = 0;
	while (days.has(d.toDateString())) {
		streak += 1;
		d.setDate(d.getDate() - 1);
	}
	return streak;
}
async function dashboardStats() {
	const [tests, attempts] = await Promise.all([listTests(), listAttempts()]);
	const submitted = attempts.filter((a) => a.submitted);
	const reports = await Promise.all(submitted.map(buildReport));
	let correct = 0;
	let attemptedQ = 0;
	let totalTime = 0;
	let answeredCount = 0;
	for (const r of reports) {
		correct += r.summary.correct;
		attemptedQ += r.summary.correct + r.summary.wrong;
		totalTime += r.summary.timeSpent;
		answeredCount += r.questions.filter((q) => isAnswered(r.attempt.answers[q.id]?.value)).length;
	}
	return {
		tests,
		attempts,
		reports,
		testsGiven: submitted.length,
		bankCount: tests.length,
		totalQuestions: tests.reduce((a, t) => a + t.questionCount, 0),
		totalImages: tests.reduce((a, t) => a + t.imageCount, 0),
		accuracy: attemptedQ ? correct / attemptedQ * 100 : 0,
		avgTimePerQuestion: answeredCount ? totalTime / answeredCount : 0,
		streak: streakFromAttempts(attempts)
	};
}
//#endregion
//#region src/lib/sample.ts
function q(p) {
	return {
		id: `sq${p.number}`,
		subject: "Physics",
		chapter: "General",
		topic: "",
		difficulty: "Medium",
		type: "single",
		options: [],
		correct: [],
		images: [],
		marks: 4,
		negative: 1,
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: false
		},
		...p
	};
}
var opts = (a, b, c, d) => [
	{
		id: "A",
		text: a
	},
	{
		id: "B",
		text: b
	},
	{
		id: "C",
		text: c
	},
	{
		id: "D",
		text: d
	}
];
var SAMPLE_QUESTIONS = [
	q({
		number: 1,
		subject: "Physics",
		chapter: "Kinematics",
		topic: "Projectile Motion",
		text: "A particle is projected with speed $u$ at an angle $\\theta$ to the horizontal. The maximum height attained is $H = \\dfrac{u^2\\sin^2\\theta}{2g}$. If $u = 20\\,\\mathrm{m/s}$ and $\\theta = 30^\\circ$, find $H$ (take $g = 10\\,\\mathrm{m/s^2}$).",
		options: opts("$5\\,\\mathrm{m}$", "$10\\,\\mathrm{m}$", "$15\\,\\mathrm{m}$", "$20\\,\\mathrm{m}$"),
		correct: ["A"],
		solution: "$H = \\dfrac{(20)^2 (1/2)^2}{2\\times 10} = \\dfrac{400 \\times 0.25}{20} = 5\\,\\mathrm{m}$"
	}),
	q({
		number: 2,
		subject: "Physics",
		chapter: "Current Electricity",
		type: "numerical",
		difficulty: "Hard",
		text: "In a circuit, three resistors of $2\\,\\Omega$, $3\\,\\Omega$ and $6\\,\\Omega$ are connected in parallel across a $12\\,\\mathrm{V}$ battery of negligible internal resistance. Find the total current (in ampere).",
		answerValue: 12,
		negative: 0,
		solution: "$\\dfrac{1}{R} = \\dfrac12 + \\dfrac13 + \\dfrac16 = 1 \\Rightarrow R = 1\\,\\Omega$, so $I = 12\\,\\mathrm{A}$.",
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: false
		}
	}),
	q({
		number: 3,
		subject: "Chemistry",
		chapter: "Chemical Bonding",
		type: "multiple",
		text: "Which of the following species are paramagnetic? (More than one correct)",
		options: opts("$\\mathrm{O_2}$", "$\\mathrm{N_2}$", "$\\mathrm{O_2^-}$", "$\\mathrm{F_2}$"),
		correct: ["A", "C"],
		marks: 4,
		negative: 2,
		explanation: "$\\mathrm{O_2}$ and $\\mathrm{O_2^-}$ have unpaired electrons in $\\pi^*$ orbitals.",
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: true
		}
	}),
	q({
		number: 4,
		subject: "Chemistry",
		chapter: "Thermodynamics",
		type: "assertion",
		text: "**Assertion (A):** For an isothermal reversible expansion of an ideal gas, $\\Delta U = 0$.\n**Reason (R):** Internal energy of an ideal gas depends only on temperature.",
		options: opts("Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true, R is false", "A is false, R is true"),
		correct: ["A"]
	}),
	q({
		number: 5,
		subject: "Mathematics",
		chapter: "Calculus",
		topic: "Definite Integrals",
		difficulty: "Hard",
		text: "Evaluate $\\displaystyle\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x + \\cos x}\\,dx$.",
		options: opts("$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{3}$", "$\\pi$"),
		correct: ["A"],
		solution: "Using the King property $I = \\int_0^{a} f(a-x)dx$, $2I = \\dfrac{\\pi}{2} \\Rightarrow I = \\dfrac{\\pi}{4}$."
	}),
	q({
		number: 6,
		subject: "Mathematics",
		chapter: "Matrices & Determinants",
		type: "integer",
		text: "If $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, find $\\det(A)$.",
		answerValue: 5,
		negative: 0,
		solution: "$\\det(A) = 2\\times3 - 1\\times1 = 5$"
	}),
	q({
		number: 7,
		subject: "Mathematics",
		chapter: "Matrices & Determinants",
		type: "matrix",
		text: "Match List-I with List-II.",
		matrix: {
			left: [
				"$\\lim_{x\\to0}\\frac{\\sin x}{x}$",
				"$\\frac{d}{dx}(\\ln x)$",
				"$\\int x\\,dx$"
			],
			right: [
				"$1/x$",
				"$1$",
				"$x^2/2 + C$"
			]
		},
		correct: [
			"B",
			"A",
			"C"
		],
		marks: 4,
		negative: 1
	}),
	q({
		number: 8,
		subject: "Physics",
		chapter: "Modern Physics",
		type: "table",
		text: "The table shows stopping potential for different frequencies in a photoelectric experiment. Which conclusion is correct?",
		tableHtml: "<table><thead><tr><th>Frequency (10¹⁴ Hz)</th><th>Stopping potential (V)</th></tr></thead><tbody><tr><td>5.0</td><td>0.4</td></tr><tr><td>6.0</td><td>0.8</td></tr><tr><td>7.0</td><td>1.2</td></tr></tbody></table>",
		options: opts("Slope gives $h/e$", "Slope gives $e/h$", "Intercept gives Planck's constant", "Stopping potential is independent of frequency"),
		correct: ["A"],
		flags: {
			diagram: false,
			graph: false,
			table: true,
			chem: false
		}
	})
];
async function seedSampleTest() {
	const test = {
		id: uid("test"),
		name: "JEE Demo Mock — Paper 1",
		description: "Sample test bundled with the platform to demo the CBT interface.",
		subjects: [
			"Physics",
			"Chemistry",
			"Mathematics"
		],
		chapters: [...new Set(SAMPLE_QUESTIONS.map((x) => x.chapter))],
		questionCount: SAMPLE_QUESTIONS.length,
		imageCount: 0,
		missingImages: 0,
		importedAt: Date.now(),
		updatedAt: Date.now(),
		source: "sample",
		durationMin: 30,
		status: "valid",
		issues: [],
		questions: SAMPLE_QUESTIONS.map((x) => ({
			...x,
			id: `${x.id}_${Math.random().toString(36).slice(2, 6)}`
		}))
	};
	await putTest(test);
	return test;
}
//#endregion
//#region src/lib/attempt.ts
async function startAttempt(test, opts) {
	const selectedQuestions = opts?.questions ?? test.questions;
	const questions = opts?.attemptType === "live" || opts?.attemptType === "missed" ? orderQuestionsBySubject(selectedQuestions) : selectedQuestions;
	const durationSec = Math.round((opts?.durationMin ?? test.durationMin) * 60);
	const attempt = {
		id: uid("att"),
		testId: test.id,
		testName: opts?.name ?? test.name,
		startedAt: Date.now(),
		updatedAt: Date.now(),
		durationSec,
		remainingSec: durationSec,
		currentIndex: 0,
		answers: Object.fromEntries(questions.map((q) => [q.id, {
			value: null,
			visited: false,
			marked: false,
			bookmarked: false,
			timeSpent: 0
		}])),
		submitted: false,
		questionIds: questions.map((q) => q.id),
		questionsSnapshot: opts?.questions ? questions : void 0,
		scoring: {
			marks: 4,
			negative: 1
		},
		exam: opts?.exam,
		paper: opts?.paper,
		paperGroupId: opts?.paperGroupId,
		reattemptOf: opts?.reattemptOf,
		strictMode: opts?.strictMode ?? false,
		mode: opts?.mode ?? (opts?.strictMode ? "strict" : "normal"),
		attemptType: opts?.attemptType ?? "normal",
		scheduledTestId: opts?.scheduledTestId,
		liveStart: opts?.liveStart,
		liveEnd: opts?.liveEnd,
		testDurationMin: opts?.testDurationMin,
		status: "IN_PROGRESS"
	};
	await putAttempt(attempt);
	await bumpUsage(questions.map((q) => q.id));
	return attempt;
}
//#endregion
//#region src/lib/status.ts
var STATUS_LABEL$1 = {
	draft: "Draft",
	"in-progress": "In Progress",
	completed: "Completed"
};
function attemptStatus(a) {
	if (a.submitted || a.submittedAt) return "completed";
	return a.remainingSec < a.durationSec || Object.values(a.answers ?? {}).some((x) => x?.visited || isAnswered(x?.value ?? null)) ? "in-progress" : "draft";
}
var isCompleted = (a) => attemptStatus(a) === "completed";
/** draft + in-progress attempts are resumable; submitted ones never are */
var isResumable = (a) => attemptStatus(a) !== "completed";
//#endregion
//#region src/lib/start-mode.ts
function resolveStartMode(_mode, env) {
	if (!env.fullscreenSupported) return {
		ok: false,
		error: "Fullscreen is not supported in this browser."
	};
	return { ok: true };
}
async function waitForFullscreenActivation() {
	if (typeof document === "undefined") return true;
	if (document.fullscreenElement) return true;
	return await new Promise((resolve) => {
		const cleanup = () => {
			document.removeEventListener("fullscreenchange", onFullscreenChange);
			window.clearTimeout(timeoutId);
		};
		const onFullscreenChange = () => {
			if (document.fullscreenElement) {
				cleanup();
				resolve(true);
			}
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		const timeoutId = window.setTimeout(() => {
			cleanup();
			resolve(false);
		}, 1500);
	});
}
async function prepareStartMode(mode, env) {
	const decision = resolveStartMode(mode, {
		fullscreenSupported: env.fullscreenSupported,
		isFullscreen: env.isFullscreen
	});
	if (!decision.ok) return decision;
	if (!env.fullscreenSupported) return {
		ok: false,
		error: "Fullscreen is not supported in this browser."
	};
	if (env.isFullscreen) return { ok: true };
	if (!await env.requestFullscreen()) return {
		ok: false,
		error: "Fullscreen permission was denied. Please allow fullscreen to start the test."
	};
	if (!await waitForFullscreenActivation()) return {
		ok: false,
		error: "Fullscreen could not be activated. Please allow fullscreen to start the test."
	};
	return { ok: true };
}
//#endregion
//#region src/routes/index.tsx
var Route$34 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "JEE CBT Platform — Take JEE Main & Advanced Mock Tests" },
		{
			name: "description",
			content: "A professional NTA-style CBT engine: import question banks, attempt full-length JEE mocks with timer, palette and calculator, and review detailed analysis."
		},
		{
			property: "og:title",
			content: "JEE CBT Platform — Mock Test Engine"
		},
		{
			property: "og:description",
			content: "Import, attempt and review JEE Main & Advanced mock tests entirely on your device."
		}
	] }),
	component: Home
});
function Home() {
	const qc = useQueryClient();
	const router = useRouter();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const attempts = useQuery({
		queryKey: ["attempts"],
		queryFn: listAttempts
	});
	const stats = useQuery({
		queryKey: ["dashboardStats"],
		queryFn: dashboardStats
	});
	const xp = getXpState();
	const completed = (attempts.data ?? []).filter(isCompleted);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const [liveNow, setLiveNow] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const liveTests = listUpcomingLiveTests();
	(0, import_react.useEffect)(() => {
		const interval = window.setInterval(() => setLiveNow(/* @__PURE__ */ new Date()), 15e3);
		return () => window.clearInterval(interval);
	}, []);
	const handleScheduledLiveTestClick = async (test) => {
		if (!(test.status === "LIVE" || liveNow.getTime() >= test.liveStart && liveNow.getTime() <= test.liveEnd)) {
			await router.navigate({ to: "/live-tests" });
			return;
		}
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
		qc.invalidateQueries({ queryKey: ["attempts"] });
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: attempt.id }
		});
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "exam-grid mb-8 overflow-hidden rounded-2xl border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-primary/12 via-transparent to-transparent p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Exam-grade CBT practice for JEE Main & Advanced"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm text-muted-foreground",
						children: "Import your own question banks, attempt full-length papers in an NTA-style interface with timer, palette, figures and a scientific calculator. Everything is stored on this device, autosaved every few seconds, and works offline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/import",
								className: "hero-action-glow inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderInput, { className: "size-4" }), " Import Test"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/create",
								className: "hero-action-glow inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "size-4" }), " Create Custom Test"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									await seedSampleTest();
									qc.invalidateQueries({ queryKey: ["tests"] });
									toast.success("Demo test added to your Question Bank");
								},
								className: "inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Load demo test"]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$5, {
					label: "Total tests given",
					value: String(stats.data?.testsGiven ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$5, {
					label: "Avg accuracy",
					value: `${(stats.data?.accuracy ?? 0).toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$5, {
					label: "Avg time / question",
					value: `${Math.round(stats.data?.avgTimePerQuestion ?? 0)}s`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$5, {
					label: "Question banks",
					value: String(stats.data?.bankCount ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$5, {
					label: "Total images",
					value: String(stats.data?.totalImages ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$5, {
					label: "Day streak",
					value: `${stats.data?.streak ?? 0} days`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/bank",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-5" }),
					label: "Question Bank",
					value: `${tests.data?.length ?? 0} tests · ${stats.data?.totalQuestions ?? 0} questions`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/xp",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }),
					label: "XP",
					value: `${xp.balance.toLocaleString()} XP`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/practice",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5" }),
					label: "Practice",
					value: "Chapter-wise drills"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/analytics",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" }),
					label: "Analytics",
					value: "Weak & strong areas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/results",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5" }),
					label: "Results",
					value: `${completed.length} attempts`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/resumes",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }),
					label: "Resume Tests",
					value: "Continue in-progress attempts"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Upcoming live tests",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
			children: liveTests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground",
				children: "No scheduled Live Tests are currently upcoming."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: liveTests.map((test) => {
					const isLive = test.status === "LIVE" || liveNow.getTime() >= test.liveStart && liveNow.getTime() <= test.liveEnd;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full max-w-[320px] flex-col rounded-xl border bg-card p-3 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "min-w-0 truncate text-sm font-semibold leading-5",
									children: test.testName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: ["inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]", isLive ? "border-red-500/20 bg-red-500/10 text-red-600" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"].join(" "),
									children: isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "live-status-dot",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-red-600",
										children: "LIVE"
									})] }) : "UPCOMING"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-foreground",
									children: formatLiveTestDate(test.liveStart)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatLiveWindowRange(test.liveStart, test.liveEnd) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-between gap-3 border-t border-border/70 pt-2 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatLiveDuration(test.durationMin) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [test.questionCount, " Q"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void handleScheduledLiveTestClick(test),
									className: ["flex-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold", isLive ? "bg-primary text-primary-foreground hover:opacity-90" : "border bg-card text-foreground hover:bg-accent"].join(" "),
									children: isLive ? "ATTEMPT TEST" : "View Test"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => router.navigate({ to: "/live-tests" }),
									className: "rounded-md border px-2.5 py-1.5 text-[11px] font-medium hover:bg-accent",
									children: "Details"
								})]
							})
						]
					}, test.id);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		}),
		completed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Recent results",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
				children: completed.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/result/$attemptId",
					params: { attemptId: a.id },
					className: "rounded-xl border bg-card p-4 transition-colors hover:border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-semibold",
						children: a.testName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: new Date(a.submittedAt ?? a.updatedAt).toLocaleString()
					})]
				}, a.id))
			})
		})
	] });
}
function Stat$5({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xl font-bold",
			children: value
		})]
	});
}
function Tile({ to, icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "quick-action-tile flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-semibold",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs text-muted-foreground",
				children: value
			})]
		})]
	});
}
function Section({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-3 flex items-center gap-2 text-sm font-bold tracking-wide uppercase",
			children: [
				icon,
				" ",
				title
			]
		}), children]
	});
}
function StatusDot({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title: status,
		className: `mt-1.5 inline-block size-2 shrink-0 rounded-full ${{
			valid: "bg-success",
			warning: "bg-warning",
			invalid: "bg-destructive"
		}[status]}`
	});
}
//#endregion
//#region src/components/advanced/AdvancedShell.tsx
var ADV_TABS = [
	{
		to: "/advanced",
		label: "Overview",
		exact: true
	},
	{
		to: "/advanced/practice",
		label: "Custom Practice"
	},
	{
		to: "/advanced/pyq",
		label: "PYQ"
	},
	{
		to: "/advanced/bank",
		label: "Question Bank"
	},
	{
		to: "/advanced/history",
		label: "Previous Tests"
	},
	{
		to: "/advanced/analytics",
		label: "Analytics"
	},
	{
		to: "/advanced/bookmarks",
		label: "Bookmarks"
	},
	{
		to: "/advanced/import",
		label: "Import Test"
	}
];
function AdvancedShell({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-bold uppercase tracking-widest text-primary",
					children: "JEE Advanced"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold tracking-tight",
					children: title
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-3xl text-sm text-muted-foreground",
					children: subtitle
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll-slim mt-4 flex gap-1.5 overflow-x-auto pb-1",
			children: ADV_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: t.to,
				activeOptions: { exact: Boolean(t.exact) },
				activeProps: { className: "border-primary bg-primary text-primary-foreground" },
				className: "shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent",
				children: t.label
			}, t.to))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})
	] });
}
function AdvancedLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
//#region src/routes/advanced.tsx
var Route$33 = createFileRoute("/advanced")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Module — CBT Test Platform" },
		{
			name: "description",
			content: "Full JEE Advanced test module: Paper 1, Paper 2, full papers, PYQ practice and analytics."
		},
		{
			property: "og:title",
			content: "JEE Advanced Module — CBT Test Platform"
		},
		{
			property: "og:description",
			content: "Take Paper 1 + Paper 2 full tests, practice PYQs and track Advanced analytics."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: AdvancedLayout
});
//#endregion
//#region src/routes/analytics.tsx
var Route$32 = createFileRoute("/analytics")({
	head: () => ({ meta: [
		{ title: "Performance Analytics — JEE CBT Platform" },
		{
			name: "description",
			content: "Subject accuracy, time distribution, weak and strong chapters, difficulty and question-type breakdowns across every attempt."
		},
		{
			property: "og:title",
			content: "Performance Analytics — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Deep analysis of your JEE mock performance across subjects, chapters and time."
		}
	] }),
	component: AnalyticsPage
});
function makeBucket(name) {
	return {
		name,
		total: 0,
		correct: 0,
		wrong: 0,
		skipped: 0,
		time: 0,
		score: 0
	};
}
function AnalyticsPage() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const data = (0, import_react.useMemo)(() => {
		const list = reports.data ?? [];
		const group = (key) => {
			const map = /* @__PURE__ */ new Map();
			for (const r of list) for (const pq of r.summary.perQuestion) {
				const k = key(pq.question) || "General";
				const b = map.get(k) ?? makeBucket(k);
				b.total += 1;
				b.score += pq.score;
				b.time += pq.answer?.timeSpent ?? 0;
				b[pq.status] += 1;
				map.set(k, b);
			}
			return [...map.values()];
		};
		const flat = list.flatMap((r) => r.summary.perQuestion);
		const answered = flat.filter((p) => p.status !== "skipped");
		const timed = answered.filter((p) => (p.answer?.timeSpent ?? 0) > 0);
		const sortedByTime = [...timed].sort((a, b) => (a.answer?.timeSpent ?? 0) - (b.answer?.timeSpent ?? 0));
		const daily = /* @__PURE__ */ new Map();
		for (const r of list) {
			const day = new Date(r.attempt.submittedAt ?? r.attempt.updatedAt).toISOString().slice(0, 10);
			const cur = daily.get(day) ?? {
				day,
				score: 0,
				tests: 0,
				accuracy: 0
			};
			cur.tests += 1;
			cur.score += r.summary.score;
			cur.accuracy = (cur.accuracy * (cur.tests - 1) + r.summary.accuracy) / cur.tests;
			daily.set(day, cur);
		}
		const chapters = group((q) => q.chapter).filter((b) => b.total >= 2);
		const acc = (b) => b.correct + b.wrong ? b.correct / (b.correct + b.wrong) * 100 : 0;
		const wrongEntries = flat.filter((p) => p.status === "wrong");
		const avgWrongTime = wrongEntries.length > 0 ? wrongEntries.reduce((sum, p) => sum + (p.answer?.timeSpent ?? 0), 0) / wrongEntries.length : 0;
		const mistakeTypes = /* @__PURE__ */ new Map();
		const classifyMistake = (question, timeSpent) => {
			const label = `${question.subject} ${question.chapter} ${question.topic} ${question.type}`.toLowerCase();
			if (/formula|derivative|integral|differential|matrix|determinant|algebra|equation|complex|vector|probab|trig|geometry/.test(label)) return "Formula / concept gap";
			if (question.type === "numerical" || question.type === "integer" || question.type === "matrix") return "Calculation error";
			if (timeSpent > avgWrongTime * 1.5) return "Time pressure / careless";
			if (/bond|reaction|mechanism|electro|organic|thermo|kinetics|current|optics|modern|wave/.test(label)) return "Concept misunderstanding";
			return "Concept gap";
		};
		for (const item of wrongEntries) {
			const type = classifyMistake(item.question, item.answer?.timeSpent ?? 0);
			const current = mistakeTypes.get(type) ?? {
				type,
				count: 0,
				marksLost: 0,
				pct: 0
			};
			current.count += 1;
			current.marksLost += item.question.marks;
			mistakeTypes.set(type, current);
		}
		const mistakeTypeRows = [...mistakeTypes.values()].map((row) => ({
			...row,
			pct: wrongEntries.length ? row.count / wrongEntries.length * 100 : 0
		})).sort((a, b) => b.count - a.count || b.marksLost - a.marksLost).slice(0, 5);
		const repeatedQuestions = /* @__PURE__ */ new Map();
		for (const item of wrongEntries) {
			const key = `${item.question.subject}::${item.question.chapter}::${item.question.topic || item.question.id}`;
			const current = repeatedQuestions.get(key) ?? {
				key,
				label: item.question.topic || item.question.chapter,
				subject: item.question.subject,
				chapter: item.question.chapter,
				count: 0,
				attemptId: item.answer ? "" : ""
			};
			current.count += 1;
			repeatedQuestions.set(key, current);
		}
		const repeatedMistakes = [...repeatedQuestions.values()].filter((row) => row.count > 1).sort((a, b) => b.count - a.count).slice(0, 6);
		const topicBuckets = /* @__PURE__ */ new Map();
		for (const r of list) for (const p of r.summary.perQuestion) {
			const q = p.question;
			const key = q.topic || q.chapter || q.subject;
			const cur = topicBuckets.get(key) ?? {
				name: key,
				subject: q.subject,
				chapter: q.chapter,
				total: 0,
				correct: 0,
				wrong: 0,
				repeated: 0,
				time: 0
			};
			cur.total += 1;
			cur.time += p.answer?.timeSpent ?? 0;
			if (p.status === "correct") cur.correct += 1;
			if (p.status === "wrong") cur.wrong += 1;
			topicBuckets.set(key, cur);
		}
		for (const item of repeatedMistakes) {
			const found = [...topicBuckets.values()].find((t) => t.name === item.label);
			if (found) found.repeated = item.count;
		}
		const weakestTopics = [...topicBuckets.values()].filter((b) => b.total >= 2).map((b) => {
			const accuracy = b.total ? b.correct / b.total * 100 : 0;
			const repeatedPenalty = Math.min(35, (b.repeated || 0) * 12);
			const wrongPenalty = Math.min(45, b.wrong * 9);
			const totalPenalty = Math.max(0, 100 - accuracy) + wrongPenalty + repeatedPenalty;
			let priority = "Low";
			if (accuracy < 35 || b.wrong >= 5 || (b.repeated || 0) >= 3) priority = "Critical";
			else if (accuracy < 50 || b.wrong >= 3 || (b.repeated || 0) >= 2) priority = "High";
			else if (accuracy < 70 || b.wrong >= 1) priority = "Medium";
			return {
				...b,
				accuracy,
				score: totalPenalty,
				priority
			};
		}).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, 5);
		const practiceNext = weakestTopics.slice(0, 5).map((topic, idx) => {
			const accuracy = topic.accuracy;
			let priority = "Low";
			let reason = "Your accuracy is improving here — keep reinforcing the fundamentals.";
			if (accuracy < 35 || topic.wrong >= 5 || (topic.repeated || 0) >= 3) {
				priority = "Critical";
				reason = `Very low accuracy and repeated errors in ${topic.name}. Prioritise recall drills and concept review.`;
			} else if (accuracy < 50 || topic.wrong >= 3 || (topic.repeated || 0) >= 2) {
				priority = "High";
				reason = `This topic keeps coming back wrong. Focus on quick revision and error-correction practice.`;
			} else if (accuracy < 70 || topic.wrong >= 1) {
				priority = "Medium";
				reason = `Accuracy is fair but inconsistent. A short focused review should improve consistency.`;
			}
			return {
				id: `${topic.subject}-${topic.chapter}-${topic.name}-${idx}`,
				topic: topic.name,
				subject: topic.subject,
				chapter: topic.chapter,
				reason,
				priority
			};
		});
		return {
			count: list.length,
			correct: flat.filter((p) => p.status === "correct").length,
			wrong: flat.filter((p) => p.status === "wrong").length,
			skipped: flat.filter((p) => p.status === "skipped").length,
			totalScore: list.reduce((a, r) => a + r.summary.score, 0),
			maxScore: list.reduce((a, r) => a + r.summary.maxScore, 0),
			negative: list.reduce((a, r) => a + r.summary.negative, 0),
			accuracy: answered.length ? flat.filter((p) => p.status === "correct").length / answered.length * 100 : 0,
			totalTime: flat.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
			avgTime: timed.length ? timed.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0) / timed.length : 0,
			fastest: sortedByTime[0],
			slowest: sortedByTime[sortedByTime.length - 1],
			subjects: group((q) => q.subject),
			chaptersWeak: [...chapters].sort((a, b) => acc(a) - acc(b)).slice(0, 6),
			chaptersStrong: [...chapters].sort((a, b) => acc(b) - acc(a)).slice(0, 6),
			topics: group((q) => q.topic).filter((b) => b.name !== "General" && b.total >= 2),
			difficulty: group((q) => q.difficulty),
			types: group((q) => q.type),
			daily: [...daily.values()].sort((a, b) => a.day.localeCompare(b.day)),
			acc,
			mistakeTypeRows,
			repeatedMistakes,
			weakestTopics,
			practiceNext,
			hasDiagnosticData: wrongEntries.length >= 3
		};
	}, [reports.data]);
	if (reports.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Crunching your attempts…"
	}) });
	if (data.count === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-bold tracking-tight",
		children: "Analytics"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
		children: "Submit at least one test to unlock analytics."
	})] });
	const acc = data.acc;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" }), " Analytics"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				"Across ",
				data.count,
				" submitted attempt",
				data.count === 1 ? "" : "s",
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Total marks",
					value: `${data.totalScore} / ${data.maxScore}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Percentage",
					value: `${(data.maxScore ? data.totalScore / data.maxScore * 100 : 0).toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Overall accuracy",
					value: `${data.accuracy.toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Negative marks",
					value: String(data.negative),
					tone: "bad"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Correct",
					value: String(data.correct)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Wrong",
					value: String(data.wrong),
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Not attempted",
					value: String(data.skipped)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Avg time / question",
					value: `${Math.round(data.avgTime)}s`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Total time",
					value: formatClock(data.totalTime)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Fastest question",
					value: data.fastest ? `Q${data.fastest.question.number} · ${data.fastest.answer?.timeSpent ?? 0}s` : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$4, {
					label: "Slowest question",
					value: data.slowest ? `Q${data.slowest.question.number} · ${data.slowest.answer?.timeSpent ?? 0}s` : "—"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Subject performance",
			children: data.subjects.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$1, {
				label: b.name,
				pct: acc(b),
				right: `${b.correct}/${b.total} · ${formatClock(b.time)}`
			}, b.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Weak chapters",
				children: [data.chaptersWeak.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$1, {
					label: b.name,
					pct: acc(b),
					tone: "bad",
					right: `${b.correct}/${b.total}`
				}, b.name)), data.chaptersWeak.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Strong chapters",
				children: [data.chaptersStrong.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$1, {
					label: b.name,
					pct: acc(b),
					tone: "good",
					right: `${b.correct}/${b.total}`
				}, b.name)), data.chaptersStrong.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})]
			})]
		}),
		data.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Topic accuracy",
			children: data.topics.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$1, {
				label: b.name,
				pct: acc(b),
				right: `${b.correct}/${b.total}`
			}, b.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Difficulty analysis",
				children: data.difficulty.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$1, {
					label: b.name,
					pct: acc(b),
					right: `${b.correct}/${b.total}`
				}, b.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Question type analysis",
				children: data.types.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$1, {
					label: b.name,
					pct: acc(b),
					right: `${b.correct}/${b.total}`
				}, b.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Attempt analysis",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 text-center text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Correct",
						value: data.subjects.reduce((a, b) => a + b.correct, 0),
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Wrong",
						value: data.subjects.reduce((a, b) => a + b.wrong, 0),
						tone: "bad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Skipped",
						value: data.subjects.reduce((a, b) => a + b.skipped, 0)
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "WHY AM I LOSING MARKS?",
			children: data.mistakeTypeRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.mistakeTypeRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									row.count,
									" · ",
									row.pct.toFixed(0),
									"%"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-2 overflow-hidden rounded-full bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-destructive transition-[width] duration-700 ease-out",
								style: { width: `${Math.min(100, row.pct)}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: ["Marks lost · ", row.marksLost]
						})
					]
				}, row.type))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "REPEATED MISTAKES",
			children: data.repeatedMistakes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.repeatedMistakes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs font-semibold",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate text-[11px] text-muted-foreground",
							children: [
								item.subject,
								" · ",
								item.chapter
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold text-destructive",
							children: [item.count, " times"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notebook",
							className: "rounded-lg border px-2 py-1 text-[11px] font-medium hover:bg-accent",
							children: "Review"
						})]
					})]
				}, item.key))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "WEAKEST TOPICS",
			children: data.weakestTopics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.weakestTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs font-semibold",
								children: topic.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-[11px] text-muted-foreground",
								children: [
									topic.subject,
									" · ",
									topic.chapter
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { level: topic.priority })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [topic.accuracy.toFixed(0), "% accuracy"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							topic.wrong,
							" wrong · ",
							topic.repeated || 0,
							" repeated"
						] })]
					})]
				}, `${topic.subject}-${topic.chapter}-${topic.name}`))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "WHAT SHOULD I PRACTICE NEXT?",
			children: data.practiceNext.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.practiceNext.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs font-semibold",
								children: item.topic
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: item.reason
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { level: item.priority })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practice",
							className: "rounded-lg border px-2 py-1 text-[11px] font-medium hover:bg-accent",
							children: "Practice"
						})
					})]
				}, item.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Daily progress",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end gap-2 overflow-x-auto pb-2",
				children: data.daily.map((d) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-12 shrink-0 flex-col items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-28 w-full items-end rounded bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded bg-primary transition-[height] duration-700 ease-out",
									style: { height: `${Math.max(6, Math.min(100, d.accuracy))}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: d.day.slice(5)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-semibold",
								children: [d.accuracy.toFixed(0), "%"]
							})
						]
					}, d.day);
				})
			})
		})
	] });
}
function Stat$4({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "premium-card rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-1 text-xl font-bold", tone === "bad" && "text-destructive"),
			children: value
		})]
	});
}
function Mini({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "premium-card rounded-lg bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("text-lg font-bold", tone === "good" && "text-answered", tone === "bad" && "text-destructive"),
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground",
			children: label
		})]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "premium-card mt-4 rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children
		})]
	});
}
function Empty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		children: "Not enough data yet."
	});
}
function PriorityBadge({ level }) {
	const palette = {
		Critical: "bg-destructive/10 text-destructive border-destructive/40",
		High: "bg-amber-500/10 text-amber-300 border-amber-500/40",
		Medium: "bg-primary/10 text-primary border-primary/40",
		Low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
	}[level];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide", palette),
		children: level
	});
}
function Bar$1({ label, pct, right, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate font-medium capitalize",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "shrink-0 text-muted-foreground",
			children: [
				right,
				" · ",
				pct.toFixed(0),
				"%"
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-2 overflow-hidden rounded-full bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-700 ease-out", tone === "bad" ? "bg-destructive" : tone === "good" ? "bg-answered" : "bg-primary"),
			style: { width: `${Math.max(2, Math.min(100, pct))}%` }
		})
	})] });
}
//#endregion
//#region src/components/ImageViewer.tsx
function useImageUrl(id) {
	const [url, setUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		if (!id) {
			setUrl(null);
			return;
		}
		imageUrl(id).then((u) => alive && setUrl(u)).catch((e) => console.error("[image] load failed", id, e));
		return () => {
			alive = false;
		};
	}, [id]);
	return url;
}
function LazyImage({ id, alt, className, onClick }) {
	const url = useImageUrl(id);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-28 items-center justify-center rounded-md border border-dashed bg-muted/40 text-xs text-muted-foreground", className),
		children: "image unavailable"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt,
		loading: "lazy",
		decoding: "async",
		onClick,
		className: cn("max-w-full object-contain", onClick && "cursor-zoom-in", className)
	});
}
/** Zoom / pan / rotate / fullscreen viewer for a gallery of stored images. */
function ImageViewer({ ids, startIndex = 0, onClose }) {
	const [index, setIndex] = (0, import_react.useState)(startIndex);
	const [scale, setScale] = (0, import_react.useState)(1);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const drag = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	const url = useImageUrl(ids[index]);
	(0, import_react.useEffect)(() => {
		setScale(1);
		setRotation(0);
		setOffset({
			x: 0,
			y: 0
		});
	}, [index]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "+" || e.key === "=") setScale((s) => Math.min(8, s * 1.2));
			if (e.key === "-") setScale((s) => Math.max(.2, s / 1.2));
			if (e.key === "r") setRotation((r) => (r + 90) % 360);
			if (e.key === "ArrowRight") setIndex((i) => Math.min(ids.length - 1, i + 1));
			if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [ids.length, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: "fixed inset-0 z-100 flex flex-col bg-background/97 backdrop-blur-sm",
		role: "dialog",
		"aria-modal": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground",
					children: [
						"Figure ",
						index + 1,
						" of ",
						ids.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => setScale((s) => Math.max(.2, s / 1.2)),
							label: "Zoom out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-14 text-center font-mono text-xs",
							children: [Math.round(scale * 100), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => setScale((s) => Math.min(8, s * 1.2)),
							label: "Zoom in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => setRotation((r) => (r + 90) % 360),
							label: "Rotate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => {
								const el = shellRef.current;
								if (!el) return;
								if (document.fullscreenElement) document.exitFullscreen();
								else el.requestFullscreen?.();
							},
							label: "Fullscreen",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: onClose,
							label: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 overflow-hidden",
				onWheel: (e) => {
					if (!e.ctrlKey && !e.metaKey) return;
					e.preventDefault();
					setScale((s) => Math.min(8, Math.max(.2, s * (e.deltaY < 0 ? 1.1 : .9))));
				},
				onPointerDown: (e) => {
					drag.current = {
						x: e.clientX - offset.x,
						y: e.clientY - offset.y
					};
					e.target.setPointerCapture?.(e.pointerId);
				},
				onPointerMove: (e) => {
					if (!drag.current) return;
					setOffset({
						x: e.clientX - drag.current.x,
						y: e.clientY - drag.current.y
					});
				},
				onPointerUp: () => drag.current = null,
				children: [url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: `Figure ${index + 1}`,
					draggable: false,
					className: "absolute top-1/2 left-1/2 h-[calc(100vh-8rem)] w-[96vw] object-contain select-none",
					style: {
						transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale}) rotate(${rotation}deg)`,
						transition: drag.current ? "none" : "transform 120ms ease-out",
						imageRendering: "auto"
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center text-sm text-muted-foreground",
					children: "Image unavailable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card/90 px-3 py-1 text-xs text-muted-foreground shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Move, { className: "size-3" }), " drag to pan · ctrl+scroll to zoom · R to rotate"]
				})]
			}),
			ids.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll-slim flex gap-2 overflow-x-auto border-t p-2",
				children: ids.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIndex(i),
					className: cn("size-16 shrink-0 overflow-hidden rounded border-2 bg-muted", i === index ? "border-primary" : "border-transparent"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id,
						alt: `thumb ${i + 1}`,
						className: "size-full object-cover"
					})
				}, id))
			})
		]
	});
}
function ViewerBtn({ children, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		"aria-label": label,
		title: label,
		className: "grid size-8 place-items-center rounded-md border bg-card text-foreground transition-colors hover:bg-accent",
		children
	});
}
require_mhchem();
/**
* LaTeX repair + fallback helpers.
*
* Imported question banks are messy: escaped backslashes, smart quotes, unicode
* math delimiters, unbalanced braces and half-written commands. Everything here
* runs before KaTeX so that raw commands can never reach the screen.
*/
var REPLACEMENTS = [
	[/\\\\(?=[a-zA-Z])/g, "\\"],
	[/[“”]/g, "\""],
	[/[‘’]/g, "'"],
	[/\u00a0/g, " "],
	[/<br\s*\/?>/gi, "\n"],
	[/&nbsp;/gi, " "],
	[/&amp;/gi, "&"],
	[/&lt;/gi, "<"],
	[/&gt;/gi, ">"],
	[/\\(d|t)?frac\s*(\d)\s*(\d)/g, "\\$1frac{$2}{$3}"],
	[/\\left(?![\s(\[{|.\\])/g, ""],
	[/\\right(?![\s)\]}|.\\])/g, ""]
];
/** Balance braces inside a latex fragment so KaTeX does not choke. */
function balanceBraces(src) {
	let depth = 0;
	let out = "";
	for (let i = 0; i < src.length; i++) {
		const ch = src[i];
		const escaped = src[i - 1] === "\\";
		if (ch === "{" && !escaped) depth += 1;
		if (ch === "}" && !escaped) {
			if (depth === 0) continue;
			depth -= 1;
		}
		out += ch;
	}
	return out + "}".repeat(depth);
}
var SUP_MAP = {
	"⁰": "0",
	"¹": "1",
	"²": "2",
	"³": "3",
	"⁴": "4",
	"⁵": "5",
	"⁶": "6",
	"⁷": "7",
	"⁸": "8",
	"⁹": "9",
	"⁺": "+",
	"⁻": "-",
	"⁼": "=",
	"⁽": "(",
	"⁾": ")",
	ⁿ: "n"
};
var SUB_MAP = {
	"₀": "0",
	"₁": "1",
	"₂": "2",
	"₃": "3",
	"₄": "4",
	"₅": "5",
	"₆": "6",
	"₇": "7",
	"₈": "8",
	"₉": "9",
	"₊": "+",
	"₋": "-",
	"₌": "=",
	"₍": "(",
	"₎": ")"
};
/** typed shorthands → LaTeX. Deterministic, no AI / parsing / guessing. */
var SHORTHAND = [
	[/<==>|<=>/g, "\\rightleftharpoons "],
	[/<-->|<->/g, "\\leftrightarrow "],
	[/-->|->/g, "\\to "],
	[/<--|<-/g, "\\leftarrow "],
	[/=>/g, "\\Rightarrow "],
	[/(?<![<>=!+\-*/^_])<=(?![>=])/g, "\\leq "],
	[/(?<![<>=!+\-*/^_])>=/g, "\\geq "],
	[/!=/g, "\\neq "],
	[/\+\/-|\+-(?=\s*[\d.\\A-Za-z])/g, "\\pm "],
	[/\bsqrt\s*\(([^()]*)\)/gi, "\\sqrt{$1}"],
	[/\bcbrt\s*\(([^()]*)\)/gi, "\\sqrt[3]{$1}"],
	[/\bintegral\b/gi, "\\int "],
	[/\binfinity\b/gi, "\\infty "],
	[/×/g, "\\times "],
	[/÷/g, "\\div "],
	[/⇌/g, "\\rightleftharpoons "],
	[/→/g, "\\to "],
	[/←/g, "\\leftarrow "],
	[/⇒/g, "\\Rightarrow "]
];
/** Converts unicode super/subscript runs into LaTeX scripts (x² → x^{2}). */
function unicodeScripts(s) {
	return s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ]+/g, (m) => `^{${[...m].map((c) => SUP_MAP[c] ?? "").join("")}}`).replace(/[₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎]+/g, (m) => `_{${[...m].map((c) => SUB_MAP[c] ?? "").join("")}}`);
}
/**
* Normalizes commonly typed scientific notation into LaTeX the existing renderer
* already understands. Content inside \ce{…} (mhchem) is left untouched so
* chemical reaction arrows keep their mhchem syntax.
*/
function normalizeSymbols(input) {
	const kept = [];
	let s = input.replace(/\\ce\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, (m) => {
		kept.push(m);
		return `\u0000${kept.length - 1}\u0000`;
	});
	s = unicodeScripts(s);
	for (const [re, to] of SHORTHAND) s = s.replace(re, to);
	return s.replace(/\u0000(\d+)\u0000/g, (_m, i) => kept[Number(i)] ?? "");
}
/** Normalise + repair a raw string coming from an imported question bank. */
function repairLatex(input) {
	if (!input) return "";
	let s = String(input);
	for (const [re, to] of REPLACEMENTS) s = s.replace(re, to);
	s = normalizeSymbols(s);
	if ((s.match(/(?<!\\)\$/g) ?? []).length % 2 === 1) s = s.replace(/(?<!\\)\$(?=[^$]*$)/, "");
	return balanceBraces(s);
}
var SYMBOLS = [
	[/\\(d|t)?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($2)/($3)"],
	[/\\sqrt\s*\[\s*(\d+)\s*\]\s*\{([^{}]*)\}/g, "$1√($2)"],
	[/\\sqrt\s*\{([^{}]*)\}/g, "√($1)"],
	[/\\text\s*\{([^{}]*)\}/g, "$1"],
	[/\\mathrm\s*\{([^{}]*)\}/g, "$1"],
	[/\\mathbb\s*\{R\}/g, "ℝ"],
	[/\\mathbb\s*\{N\}/g, "ℕ"],
	[/\\mathbb\s*\{Z\}/g, "ℤ"],
	[/\\mathbb\s*\{Q\}/g, "ℚ"],
	[/\\mathbb\s*\{C\}/g, "ℂ"],
	[/\\mathbb\s*\{([^{}]*)\}/g, "$1"],
	[/\\times/g, "×"],
	[/\\div/g, "÷"],
	[/\\cdot/g, "·"],
	[/\\pm/g, "±"],
	[/\\mp/g, "∓"],
	[/\\leq|\\le\b/g, "≤"],
	[/\\geq|\\ge\b/g, "≥"],
	[/\\neq|\\ne\b/g, "≠"],
	[/\\approx/g, "≈"],
	[/\\propto/g, "∝"],
	[/\\infty/g, "∞"],
	[/\\sum/g, "Σ"],
	[/\\prod/g, "Π"],
	[/\\int/g, "∫"],
	[/\\oint/g, "∮"],
	[/\\partial/g, "∂"],
	[/\\nabla/g, "∇"],
	[/\\lim/g, "lim"],
	[/\\to|\\rightarrow|\\longrightarrow/g, "→"],
	[/\\leftarrow/g, "←"],
	[/\\leftrightarrow|\\rightleftharpoons/g, "⇌"],
	[/\\Rightarrow/g, "⇒"],
	[/\\cup/g, "∪"],
	[/\\cap/g, "∩"],
	[/\\subseteq/g, "⊆"],
	[/\\subset/g, "⊂"],
	[/\\supseteq/g, "⊇"],
	[/\\supset/g, "⊃"],
	[/\\in\b/g, "∈"],
	[/\\notin/g, "∉"],
	[/\\forall/g, "∀"],
	[/\\exists/g, "∃"],
	[/\\emptyset|\\varnothing/g, "∅"],
	[/\\angle/g, "∠"],
	[/\\degree|\\circ/g, "°"],
	[/\\ldots|\\dots|\\cdots/g, "…"],
	[/\\vec\s*\{([^{}]*)\}/g, "$1⃗"],
	[/\\hat\s*\{([^{}]*)\}/g, "$1̂"],
	[/\\overline\s*\{([^{}]*)\}/g, "$1̄"],
	[/\\alpha/g, "α"],
	[/\\beta/g, "β"],
	[/\\gamma/g, "γ"],
	[/\\delta/g, "δ"],
	[/\\epsilon|\\varepsilon/g, "ε"],
	[/\\zeta/g, "ζ"],
	[/\\eta/g, "η"],
	[/\\theta/g, "θ"],
	[/\\kappa/g, "κ"],
	[/\\lambda/g, "λ"],
	[/\\mu/g, "μ"],
	[/\\nu/g, "ν"],
	[/\\xi/g, "ξ"],
	[/\\rho/g, "ρ"],
	[/\\sigma/g, "σ"],
	[/\\tau/g, "τ"],
	[/\\phi|\\varphi/g, "φ"],
	[/\\chi/g, "χ"],
	[/\\psi/g, "ψ"],
	[/\\omega/g, "ω"],
	[/\\Gamma/g, "Γ"],
	[/\\Delta/g, "Δ"],
	[/\\Theta/g, "Θ"],
	[/\\Lambda/g, "Λ"],
	[/\\Sigma/g, "Σ"],
	[/\\Phi/g, "Φ"],
	[/\\Psi/g, "Ψ"],
	[/\\Omega/g, "Ω"],
	[/\\quad|\\qquad|\\,|\\;|\\!|\\ /g, " "],
	[/\\left|\\right/g, ""],
	[/\\\{/g, "{"],
	[/\\\}/g, "}"]
];
var SUB = "₀₁₂₃₄₅₆₇₈₉";
var SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/**
* Human-readable plain text for a fragment KaTeX could not render.
* Guarantees no backslash command survives.
*/
function latexFallback(src) {
	let s = String(src ?? "");
	for (const [re, to] of SYMBOLS) s = s.replace(re, to);
	s = s.replace(/_\{?(\d+)\}?/g, (_m, d) => [...d].map((c) => SUB[Number(c)]).join("")).replace(/\^\{?(\d+)\}?/g, (_m, d) => [...d].map((c) => SUP[Number(c)]).join("")).replace(/\^\{([^{}]*)\}/g, "^($1)").replace(/_\{([^{}]*)\}/g, "_($1)").replace(/\\[a-zA-Z]+\*?/g, "").replace(/[{}]/g, "").replace(/\s{2,}/g, " ");
	return s.trim();
}
/** True when the string still contains a raw LaTeX command. */
function hasRawLatex(s) {
	return /\\[a-zA-Z]+/.test(s) || /[\^_]\{/.test(s);
}
//#endregion
//#region src/components/MathText.tsx
/**
* Renders text containing LaTeX — inside delimiters ($…$, $$…$$, \(…\), \[…\])
* *and* bare commands typed straight into the text (\frac12, H_2O, x^2, \cup …).
*
* Raw LaTeX must never reach the screen: if KaTeX fails, the fragment is
* converted to a readable unicode fallback and the error is logged.
*/
var KATEX_OPTIONS = {
	throwOnError: false,
	strict: false,
	trust: true,
	output: "html",
	macros: {
		"\\RR": "\\mathbb{R}",
		"\\NN": "\\mathbb{N}",
		"\\ZZ": "\\mathbb{Z}",
		"\\QQ": "\\mathbb{Q}",
		"\\CC": "\\mathbb{C}",
		"\\degree": "^\\circ"
	}
};
function escapeHtml$1(s) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function fallbackHtml(tex) {
	return `<span class="math-fallback">${escapeHtml$1(latexFallback(tex))}</span>`;
}
function renderSegment(tex, display) {
	const src = tex.trim();
	if (!src) return "";
	try {
		const html = katex.renderToString(src, {
			...KATEX_OPTIONS,
			displayMode: display
		});
		if (html.includes("katex-error")) {
			console.warn("[math] unsupported latex, using fallback", { tex: src });
			return fallbackHtml(src);
		}
		return html;
	} catch (err) {
		console.error("[math] render failed", {
			tex: src,
			err
		});
		return fallbackHtml(src);
	}
}
var COMMAND = String.raw`\\[a-zA-Z]+\*?(?:\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})*(?:\s*\[[^\]]*\])?`;
var ESCAPED = String.raw`\\[{}()\[\]|$&%#_^]`;
var SCRIPT = String.raw`[A-Za-z0-9\)\]\}][\^_](?:\{[^{}]*\}|[A-Za-z0-9+\-]+)`;
var TOKEN = new RegExp(`${COMMAND}|${ESCAPED}|${SCRIPT}`, "g");
var GAP = /^[\s+\-=*/^_(),.]{0,4}$/;
/** Renders bare LaTeX found inside otherwise plain text. */
function renderPlain(text, preserve) {
	const plainText = (s) => preserve ? escapeHtml$1(s) : escapeHtml$1(s).replace(/\n/g, "<br/>");
	if (!hasRawLatex(text)) return plainText(text);
	const matches = [...text.matchAll(TOKEN)];
	if (matches.length === 0) return plainText(text);
	const spans = [];
	for (const m of matches) {
		const start = m.index ?? 0;
		const end = start + m[0].length;
		const last = spans[spans.length - 1];
		if (last && GAP.test(text.slice(last.end, start))) last.end = end;
		else spans.push({
			start,
			end
		});
	}
	let out = "";
	let cursor = 0;
	for (const s of spans) {
		out += plainText(text.slice(cursor, s.start));
		out += renderSegment(text.slice(s.start, s.end), false);
		cursor = s.end;
	}
	out += plainText(text.slice(cursor));
	return out;
}
var DELIMS = [
	[
		"$$",
		"$$",
		true
	],
	[
		"\\[",
		"\\]",
		true
	],
	[
		"\\(",
		"\\)",
		false
	],
	[
		"$",
		"$",
		false
	]
];
function mathToHtml(input, preserveWhitespace = false) {
	const src = repairLatex(input);
	if (!src) return "";
	let out = "";
	let plain = "";
	let i = 0;
	const flush = () => {
		if (plain) {
			out += renderPlain(plain, preserveWhitespace);
			plain = "";
		}
	};
	while (i < src.length) {
		let matched = false;
		for (const [open, close, display] of DELIMS) if (src.startsWith(open, i)) {
			const end = src.indexOf(close, i + open.length);
			if (end > -1) {
				flush();
				out += renderSegment(src.slice(i + open.length, end), display);
				i = end + close.length;
				matched = true;
				break;
			}
		}
		if (!matched) {
			plain += src[i];
			i += 1;
		}
	}
	flush();
	return out;
}
/**
* Process-wide render cache — KaTeX compilation is the single most expensive
* thing on question-heavy screens and the same strings recur constantly
* (palette, review lists, re-renders). Purely a performance layer.
*/
var HTML_CACHE = /* @__PURE__ */ new Map();
var HTML_CACHE_MAX = 800;
function cachedHtml(src, preserve) {
	const key = preserve ? `\u0001${src}` : src;
	const hit = HTML_CACHE.get(key);
	if (hit !== void 0) return hit;
	let html;
	try {
		html = mathToHtml(src, preserve);
	} catch (err) {
		console.error("[math] pipeline failed", err);
		html = escapeHtml$1(latexFallback(src));
	}
	if (HTML_CACHE.size >= HTML_CACHE_MAX) HTML_CACHE.clear();
	HTML_CACHE.set(key, html);
	return html;
}
var MathText = (0, import_react.memo)(function MathText({ children, className, as: Tag = "div", preserveWhitespace = false, style }) {
	const html = (0, import_react.useMemo)(() => cachedHtml(children ?? "", preserveWhitespace), [children, preserveWhitespace]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className: cn("math-content leading-relaxed", preserveWhitespace && "whitespace-pre-wrap", className),
		style,
		dangerouslySetInnerHTML: { __html: html }
	});
});
//#endregion
//#region src/lib/copy-question.ts
var COPY_MODE_LABEL = {
	question: "Question + Options",
	answer: "Question + Options + Answer",
	full: "Complete Question + Solution"
};
var BULK_COPY_MODE_LABEL = {
	"questions-options-answer": "Questions + Options + Answer",
	"questions-options": "Questions + Options",
	"questions-only": "Questions Only",
	"answers-only": "Answers Only"
};
var IMAGE_NOTE = "Note: This question contains an uploaded image. Verify using the attached image.";
/** Plain-text table for match-the-following questions, preserving rows/columns. */
function matrixText(q) {
	if (!q.matrix) return [];
	const { left, right } = q.matrix;
	const rows = Math.max(left.length, right.length);
	const out = ["Column I | Column II"];
	for (let i = 0; i < rows; i++) {
		const l = left[i] ? `${i + 1}. ${left[i]}` : "";
		const r = right[i] ? `${String.fromCharCode(65 + i)}. ${right[i]}` : "";
		out.push(`${l} | ${r}`);
	}
	return out;
}
function htmlToText(html) {
	return html.replace(/<\s*(br|\/tr)\s*\/?>/gi, "\n").replace(/<\s*\/(td|th)\s*>/gi, " | ").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]+\n/g, "\n").trim();
}
function answerValueText(q) {
	if (isNumericType(q.type)) return numericAnswerLabel(q);
	if (q.matrix) return matrixAnswerLabel(q);
	return q.correct.map(String).join(", ") || "—";
}
function answerLine(q) {
	if (isNumericType(q.type)) return `Answer: ${numericAnswerLabel(q)}`;
	if (q.matrix) return `Answer: ${matrixAnswerLabel(q)}`;
	return `${isMultiCorrect(q) ? "Answer (multiple correct)" : "Answer"}: ${answerValueText(q)}`;
}
function stripQuestionOptions(text) {
	return text.split("\n").filter((rawLine) => {
		const line = rawLine.trim();
		if (!line) return true;
		if (/^\([A-Z0-9]\)\s/.test(line)) return false;
		if (line === "(Numerical answer)") return false;
		return true;
	}).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
/**
* Builds an AI-verification-friendly plain-text version of a question.
* Math/chemistry stay as their original LaTeX, so symbols, sub/superscripts and
* unicode survive the round trip into ChatGPT / Gemini / Claude.
*/
function questionToText(q, mode) {
	const lines = [];
	const meta = [
		q.subject,
		q.chapter,
		q.topic,
		QUESTION_TYPE_LABEL[q.type],
		q.difficulty
	].filter(Boolean).join(" · ");
	lines.push(`[${meta}]`);
	lines.push(`Q${q.number}.`);
	if (q.paragraph?.trim()) lines.push(q.paragraph.trim(), "");
	if (q.text?.trim()) lines.push(q.text.trim());
	if (q.tableHtml?.trim()) lines.push("", htmlToText(q.tableHtml));
	if (q.matrix) lines.push("", ...matrixText(q));
	if (!isNumericType(q.type) && !q.matrix && q.options.length) {
		const ids = optionIds(q);
		lines.push("");
		q.options.forEach((o, i) => lines.push(`(${ids[i]}) ${o.text}`));
	}
	if (isNumericType(q.type)) lines.push("", "(Numerical answer)");
	if (mode !== "question") lines.push("", answerLine(q));
	if (mode === "full") {
		if (q.solution?.trim()) lines.push("", `Solution: ${q.solution.trim()}`);
		if (q.explanation?.trim()) lines.push("", `Explanation: ${q.explanation.trim()}`);
		if (q.formula?.trim()) lines.push("", `Formula: ${q.formula.trim()}`);
		if (q.concept?.trim()) lines.push("", `Concept: ${q.concept.trim()}`);
	}
	if (q.images.length > 0) lines.push("", IMAGE_NOTE);
	return lines.join("\n");
}
function bulkQuestionToText(questions, mode) {
	return questions.map((question) => {
		switch (mode) {
			case "questions-options-answer": return questionToText(question, "answer");
			case "questions-options": return questionToText(question, "question");
			case "questions-only": return stripQuestionOptions(questionToText(question, "question"));
			case "answers-only": return `Q${question.number}. ${answerValueText(question)}`;
			default: return questionToText(question, "answer");
		}
	}).filter(Boolean).join("\n\n");
}
//#endregion
//#region src/components/CopyQuestion.tsx
var MODES = [
	"question",
	"answer",
	"full"
];
/**
* "Copy Question" for AI verification (ChatGPT / Gemini / Claude).
* Never rendered inside the live test screen.
*/
function CopyQuestion({ question, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(null);
	const box = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e) => {
			if (!box.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [open]);
	const copy = async (mode) => {
		const text = questionToText(question, mode);
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = text;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			document.execCommand("copy");
			ta.remove();
		}
		setDone(mode);
		setOpen(false);
		toast.success(`Copied — ${COPY_MODE_LABEL[mode]}`);
		window.setTimeout(() => setDone(null), 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: box,
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			title: "Copy this question for AI verification",
			className: "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold hover:bg-accent",
			children: [
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: "size-3.5" }),
				"Copy Question",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3 transition-transform", open && "rotate-180") })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 z-50 mt-1 w-60 overflow-hidden rounded-lg border bg-card shadow-lg",
			children: [MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => copy(m),
				className: "block w-full px-3 py-2 text-left text-xs hover:bg-accent",
				children: COPY_MODE_LABEL[m]
			}, m)), question.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t px-3 py-2 text-[10px] text-muted-foreground",
				children: "Image question — the copy includes a note to attach the image."
			})]
		})]
	});
}
//#endregion
//#region src/components/bank/QuestionImageEditor.tsx
var OK = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp"
];
/**
* Image-based question support for the Question Bank editor: upload, drag & drop
* or paste (Ctrl+V) a screenshot. Images are stored byte-for-byte — no OCR, no
* conversion — and rendered in CBT exactly as stored.
*/
function QuestionImageEditor({ testId, images, onChange, label = "Question images", hint }) {
	const fileRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [replace, setReplace] = (0, import_react.useState)(null);
	const store = async (files) => {
		const valid = files.filter((f) => OK.includes(f.type.toLowerCase()));
		if (valid.length === 0) {
			toast.error("Only PNG, JPG, JPEG or WEBP images are supported");
			return;
		}
		const ids = [];
		for (const f of valid) {
			const id = `${testId}::img_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
			await putImage({
				id,
				testId,
				name: f.name || "pasted-image.png",
				blob: f,
				kind: "figure"
			});
			ids.push(id);
		}
		if (replace) {
			onChange(images.map((i) => i === replace ? ids[0] : i));
			forgetImageUrl(replace);
			await deleteImage(replace);
			setReplace(null);
			toast.success("Image replaced — save the question to keep it");
		} else {
			onChange([...images, ...ids]);
			toast.success(`${ids.length} image(s) attached — save the question to keep it`);
		}
	};
	const removeAt = async (id) => {
		onChange(images.filter((i) => i !== id));
		forgetImageUrl(id);
		await deleteImage(id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-semibold uppercase text-muted-foreground",
					children: [
						label,
						" (",
						images.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setReplace(null);
						fileRef.current?.click();
					},
					className: "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3.5" }), " Upload image"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setOver(true);
				},
				onDragLeave: () => setOver(false),
				onDrop: (e) => {
					e.preventDefault();
					setOver(false);
					store(Array.from(e.dataTransfer.files));
				},
				onPaste: (e) => {
					const files = Array.from(e.clipboardData.files);
					if (files.length) {
						e.preventDefault();
						store(files);
					}
				},
				tabIndex: 0,
				className: cn("rounded-lg border border-dashed p-3 text-center text-[11px] text-muted-foreground outline-none focus:ring-2 focus:ring-ring", over && "border-primary bg-primary/5"),
				children: hint ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Drag & drop an image here, or click this box and press Ctrl+V to paste a screenshot.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"PNG · JPG · JPEG · WEBP — stored exactly as uploaded."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/png,image/jpeg,image/webp",
				multiple: true,
				className: "hidden",
				onChange: (e) => {
					const files = Array.from(e.target.files ?? []);
					e.target.value = "";
					if (files.length) store(files);
				}
			}),
			images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: images.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-card p-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id,
						alt: `Question image ${i + 1}`,
						className: "max-h-28 rounded",
						onClick: () => setViewer(i)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn$1, {
								label: "Full preview",
								onClick: () => setViewer(i),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn$1, {
								label: "Replace image",
								onClick: () => {
									setReplace(id);
									fileRef.current?.click();
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn$1, {
								label: "Delete image",
								danger: true,
								onClick: () => void removeAt(id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})
						]
					})]
				}, id))
			}),
			viewer !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer, {
				ids: images,
				startIndex: viewer,
				onClose: () => setViewer(null)
			})
		]
	});
}
function IconBtn$1({ children, label, onClick, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		title: label,
		"aria-label": label,
		onClick,
		className: cn("rounded border p-1 hover:bg-accent", danger && "border-destructive/40 text-destructive"),
		children
	});
}
//#endregion
//#region src/components/bank/MatrixEditor.tsx
var LETTERS$2 = "ABCDEFGHIJKL".split("");
/**
* Match the Following / Matrix Match table creator.
* Column I rows, Column II rows, per-cell editing (LaTeX + mhchem for chemical
* equations, sub/superscripts and unicode), width and border controls, and the
* answer stored as explicit pairs (row number → Column II letter).
*/
function MatrixEditor({ matrix, pairs, onMatrix, onPairs }) {
	const left = matrix.left ?? [];
	const right = matrix.right ?? [];
	const letters = right.map((_, i) => LETTERS$2[i]);
	const setLeft = (i, v) => onMatrix({
		...matrix,
		left: left.map((x, idx) => idx === i ? v : x)
	});
	const setRight = (i, v) => onMatrix({
		...matrix,
		right: right.map((x, idx) => idx === i ? v : x)
	});
	const addRow = () => onMatrix({
		...matrix,
		left: [...left, ""]
	});
	const delRow = (i) => {
		onMatrix({
			...matrix,
			left: left.filter((_, idx) => idx !== i)
		});
		const next = {};
		left.forEach((_, idx) => {
			if (idx === i) return;
			const from = String(idx + 1);
			const to = String(idx < i ? idx + 1 : idx);
			if (pairs[from]) next[to] = pairs[from];
		});
		onPairs(next);
	};
	const addCol = () => onMatrix({
		...matrix,
		right: [...right, ""]
	});
	const delCol = (i) => {
		const letter = LETTERS$2[i];
		onMatrix({
			...matrix,
			right: right.filter((_, idx) => idx !== i)
		});
		const next = { ...pairs };
		for (const k of Object.keys(next)) if (next[k] === letter) delete next[k];
		onPairs(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border bg-card p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-semibold uppercase text-muted-foreground",
						children: "Match the Following table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addRow,
						className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Row"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addCol,
						className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Column II item"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex items-center gap-1 text-[11px]",
						children: [
							"Column I width",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 80,
								max: 600,
								value: matrix.leftWidth ?? 220,
								onChange: (e) => onMatrix({
									...matrix,
									leftWidth: Number(e.target.value) || 220
								}),
								className: "w-16 rounded border bg-surface px-1.5 py-0.5"
							}),
							"px"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: matrix.borders !== false,
							onChange: (e) => onMatrix({
								...matrix,
								borders: e.target.checked
							})
						}), "Borders"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase text-muted-foreground",
						children: "Column I"
					}), left.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-5 text-xs font-bold",
								children: [i + 1, "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: v,
								onChange: (e) => setLeft(i, e.target.value),
								placeholder: "e.g. $\\\\ce{H2SO4}$ or $x^2$",
								className: "min-w-0 flex-1 rounded border bg-surface px-2 py-1 text-xs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: pairs[String(i + 1)] ?? "",
								onChange: (e) => onPairs({
									...pairs,
									[String(i + 1)]: e.target.value
								}),
								className: "rounded border bg-surface px-1 py-1 text-xs",
								title: "Matching Column II option",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "—"
								}), letters.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: l,
									children: l
								}, l))]
							}),
							left.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => delRow(i),
								title: "Delete row",
								className: "rounded border p-1 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})
						]
					}, i))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase text-muted-foreground",
						children: "Column II"
					}), right.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-5 text-xs font-bold",
								children: [LETTERS$2[i], "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: v,
								onChange: (e) => setRight(i, e.target.value),
								placeholder: "Matching option",
								className: "min-w-0 flex-1 rounded border bg-surface px-2 py-1 text-xs"
							}),
							right.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => delCol(i),
								title: "Delete column item",
								className: "rounded border p-1 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})
						]
					}, i))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-surface p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[11px] font-semibold uppercase text-muted-foreground",
						children: "CBT preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: cn("w-full text-xs", matrix.borders !== false && "[&_td]:border [&_th]:border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { width: matrix.leftWidth ?? 220 },
								className: "px-2 py-1 text-left",
								children: "Column I"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-1 text-left",
								children: "Column II"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: left.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
								as: "span",
								children: `${i + 1}. ${l}`
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: right[i] !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
								as: "span",
								children: `${LETTERS$2[i]}. ${right[i]}`
							})
						})] }, i)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [
							"Answer pairs:",
							" ",
							Object.entries(pairs).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(", ") || "—"
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/bank/AnswerEditor.tsx
var PAGE$1 = 25;
var DIFFS$2 = [
	"Easy",
	"Medium",
	"Hard"
];
var TYPES = Object.keys(QUESTION_TYPE_LABEL);
var LETTERS$1 = "ABCDEFGHIJKL".split("");
var DIFF_RANK = {
	Easy: 0,
	Medium: 1,
	Hard: 2
};
/**
* Question Bank editor: search / filter / sort every question in a set, edit any
* field (statement, options, keys, metadata), add new questions and delete old
* ones. Saves straight to the bank so every future test uses the change.
*/
function AnswerEditor({ testId, focusQuestionId, onClose, onSave, questions: overrideQuestions, title, onSelect, selectedQuestionIds, onCreateNew, saveLabel = "Save" }) {
	const qc = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("all");
	const [type, setType] = (0, import_react.useState)("all");
	const [difficulty, setDifficulty] = (0, import_react.useState)("all");
	const [validity, setValidity] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [limit, setLimit] = (0, import_react.useState)(PAGE$1);
	const test = useQuery({
		queryKey: ["bank-answers", testId],
		queryFn: () => testId ? getTest(testId) : Promise.resolve(null),
		enabled: !!testId && !overrideQuestions
	}).data ?? null;
	const questions = overrideQuestions ?? test?.questions ?? [];
	const report = (0, import_react.useMemo)(() => validatePool(questions, (q) => q), [questions]);
	const rows = (0, import_react.useMemo)(() => {
		const s = search.trim().toLowerCase();
		let list = questions.filter((q) => {
			if (subject !== "all" && q.subject !== subject) return false;
			if (type !== "all" && q.type !== type) return false;
			if (difficulty !== "all" && q.difficulty !== difficulty) return false;
			const invalid = report.reasonsById.has(String(q.id));
			if (validity === "valid" && invalid) return false;
			if (validity === "invalid" && !invalid) return false;
			if (!s) return true;
			return `${q.id} ${q.number} ${q.text} ${q.subject} ${q.chapter} ${q.topic}`.toLowerCase().includes(s);
		});
		list = [...list].sort((a, b) => {
			if (sort === "subject") return a.subject.localeCompare(b.subject) || a.number - b.number;
			if (sort === "chapter") return a.chapter.localeCompare(b.chapter) || a.number - b.number;
			if (sort === "difficulty") return (DIFF_RANK[a.difficulty] ?? 1) - (DIFF_RANK[b.difficulty] ?? 1) || a.number - b.number;
			if (sort === "oldest") return a.number - b.number;
			return b.number - a.number;
		});
		if (!focusQuestionId) return list;
		return [...list].sort((a, b) => Number(b.id === focusQuestionId) - Number(a.id === focusQuestionId));
	}, [
		questions,
		search,
		subject,
		type,
		difficulty,
		validity,
		sort,
		report,
		focusQuestionId
	]);
	const commit = async (next, message) => {
		await putTest({
			...next,
			subjects: [...new Set(next.questions.map((q) => q.subject).filter(Boolean))],
			chapters: [...new Set(next.questions.map((q) => q.chapter).filter(Boolean))],
			questionCount: next.questions.length,
			updatedAt: Date.now()
		});
		qc.invalidateQueries({ queryKey: ["bank-answers", testId] });
		qc.invalidateQueries({ queryKey: ["tests"] });
		qc.invalidateQueries({ queryKey: ["adv"] });
		toast.success(message);
	};
	const save = async (patch) => {
		if (onSave) {
			await onSave(patch);
			return;
		}
		if (!test) return;
		await commit({
			...test,
			questions: test.questions.map((q) => q.id === patch.id ? patch : q)
		}, `Q${patch.number} saved`);
	};
	const remove = async (q) => {
		if (!test) return;
		if (!window.confirm(`Delete Q${q.number} from "${test.name}"? Existing attempts keep their copy.`)) return;
		await commit({
			...test,
			questions: test.questions.filter((x) => x.id !== q.id)
		}, `Q${q.number} deleted`);
	};
	const add = async () => {
		if (!test) return;
		const number = test.questions.reduce((a, q) => Math.max(a, q.number), 0) + 1;
		const fresh = {
			id: `q_new_${number}_${Math.random().toString(36).slice(2, 8)}`,
			number,
			subject: test.subjects[0] ?? "Physics",
			chapter: test.chapters[0] ?? "General",
			topic: "",
			difficulty: "Medium",
			type: "single",
			text: "",
			options: LETTERS$1.slice(0, 4).map((id) => ({
				id,
				text: ""
			})),
			correct: [],
			tolerance: .01,
			images: [],
			marks: 4,
			negative: 1,
			flags: {
				diagram: false,
				graph: false,
				table: false,
				chem: false
			}
		};
		await commit({
			...test,
			questions: [...test.questions, fresh]
		}, `Q${number} added — fill it in`);
		setSort("newest");
		setValidity("all");
		setSearch("");
	};
	const subjects = [...new Set([...questions.map((q) => q.subject), ...SUBJECTS$2])].filter(Boolean);
	const [copyAllOpen, setCopyAllOpen] = (0, import_react.useState)(false);
	const copyAllBox = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!copyAllOpen) return;
		const onDown = (event) => {
			if (!copyAllBox.current?.contains(event.target)) setCopyAllOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [copyAllOpen]);
	const copyAll = async (mode) => {
		setCopyAllOpen(false);
		if (!questions.length) {
			toast.error("No questions to copy.");
			return;
		}
		const text = bulkQuestionToText(questions, mode);
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied!");
		} catch {
			try {
				const ta = document.createElement("textarea");
				ta.value = text;
				ta.style.position = "fixed";
				ta.style.opacity = "0";
				document.body.appendChild(ta);
				ta.select();
				document.execCommand("copy");
				ta.remove();
				toast.success("Copied!");
			} catch {
				toast.error("Copy failed.");
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[92vh] w-full max-w-4xl flex-col rounded-t-2xl border bg-card sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-semibold",
							children: title ?? `Questions — ${test?.name ?? "…"}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								report.total,
								" questions ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-success",
									children: [report.valid.length, " valid"]
								}),
								" ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("font-semibold", report.invalid.length && "text-destructive"),
									children: [report.invalid.length, " invalid"]
								}),
								" ",
								!onSelect && "— invalid questions are skipped when generating tests."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: copyAllBox,
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setCopyAllOpen((open) => !open),
									className: "inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold",
									children: ["Copy All", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3 transition-transform", copyAllOpen && "rotate-180") })]
								}), copyAllOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-lg border bg-card shadow-lg",
									children: Object.entries(BULK_COPY_MODE_LABEL).map(([mode, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void copyAll(mode),
										className: "block w-full px-3 py-2 text-left text-xs hover:bg-accent",
										children: label
									}, mode))
								})]
							}),
							!onSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: add,
								className: "inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add"]
							}),
							onCreateNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onCreateNew,
								className: "inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Create New Question"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onClose,
								className: "rounded-md border px-3 py-1.5 text-xs",
								children: "Close"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 border-b p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setLimit(PAGE$1);
							},
							placeholder: "Search question text, id, number, subject, chapter or topic…",
							className: "w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: subject,
								onChange: setSubject,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All subjects"
								}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: type,
								onChange: (v) => setType(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All types"
								}), TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: QUESTION_TYPE_LABEL[t]
								}, t))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: difficulty,
								onChange: (v) => setDifficulty(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All difficulty"
								}), DIFFS$2.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d,
									children: d
								}, d))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: validity,
								onChange: (v) => setValidity(v),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "Valid + invalid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "valid",
										children: "Valid only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "invalid",
										children: "Invalid only"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: sort,
								onChange: (v) => setSort(v),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "newest",
										children: "Newest first"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "oldest",
										children: "Oldest first"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "subject",
										children: "Subject"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "chapter",
										children: "Chapter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "difficulty",
										children: "Difficulty"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-slim flex-1 space-y-3 overflow-y-auto p-4",
					children: [
						rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: "No questions match."
						}),
						rows.slice(0, limit).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerRow, {
							testId: testId ?? "bank-selector",
							question: q,
							highlight: q.id === focusQuestionId,
							poolReasons: report.reasonsById.get(String(q.id)),
							onSave: save,
							onDelete: remove,
							onSelect,
							selected: Boolean(selectedQuestionIds?.includes(q.id) || selectedQuestionIds?.includes(q.sourceId ?? "")),
							saveLabel
						}, q.id)),
						rows.length > limit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLimit((l) => l + PAGE$1),
							className: "w-full rounded-lg border py-2 text-sm font-semibold",
							children: "Load more"
						})
					]
				})
			]
		})
	});
}
function Select({ value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "rounded-lg border bg-background px-2 py-1.5 text-xs",
		children
	});
}
function AnswerRow({ testId, question, highlight, poolReasons, onSave, onDelete, onSelect, selected, saveLabel }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(question);
	const ids = (0, import_react.useMemo)(() => optionIds(draft), [draft]);
	const objective = !isNumericType(draft.type) && !Boolean(draft.matrix) && draft.type !== "matrix";
	const [multi, setMulti] = (0, import_react.useState)(isMultiCorrect(question));
	const [correct, setCorrect] = (0, import_react.useState)(question.correct.map(String));
	const [numeric, setNumeric] = (0, import_react.useState)(numericAnswers(question).join(",") || "");
	const [pairs, setPairs] = (0, import_react.useState)(() => {
		if (question.matrixPairs) return { ...question.matrixPairs };
		const out = {};
		(question.matrix?.left ?? []).forEach((_, i) => {
			const v = question.correct[i];
			if (v) out[String(i + 1)] = String(v);
		});
		return out;
	});
	const isMatrix = Boolean(draft.matrix) || draft.type === "matrix";
	const validation = (0, import_react.useMemo)(() => {
		const own = validateQuestion(question);
		const reasons = [...new Set([...own.reasons, ...poolReasons ?? []])];
		return {
			valid: reasons.length === 0,
			reasons
		};
	}, [question, poolReasons]);
	const patch = (p) => setDraft((d) => ({
		...d,
		...p
	}));
	const toggle = (id) => {
		setCorrect((cur) => multi ? cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] : cur.length === 1 && cur[0] === id ? [] : [id]);
	};
	const switchMode = (nextMulti) => {
		setMulti(nextMulti);
		if (!nextMulti) setCorrect((cur) => cur.length > 1 ? [cur[0]] : cur);
	};
	const setOptionText = (i, text) => patch({ options: draft.options.map((o, idx) => idx === i ? {
		...o,
		text
	} : o) });
	/** image-first options: an option may be an image with no text at all */
	const setOptionImages = (i, images) => patch({ options: draft.options.map((o, idx) => idx === i ? {
		...o,
		images: images.length ? images : void 0
	} : o) });
	const addOption = () => patch({ options: [...draft.options, {
		id: LETTERS$1[draft.options.length] ?? String(draft.options.length + 1),
		text: ""
	}] });
	const removeOption = (i) => {
		const removedId = ids[i];
		setCorrect((cur) => cur.filter((x) => x !== removedId));
		patch({ options: draft.options.filter((_, idx) => idx !== i) });
	};
	const commit = async () => {
		const numericList = parseNumericList(numeric);
		if (isMatrix) {
			const ordered = (draft.matrix?.left ?? []).map((_, i) => pairs[String(i + 1)] ?? "");
			if (ordered.every((v) => !v)) {
				toast.error("Match at least one row to a Column II option");
				return;
			}
			await onSave({
				...draft,
				type: "matrix",
				matrixPairs: Object.fromEntries(Object.entries(pairs).filter(([, v]) => v)),
				correct: ordered
			});
			return;
		}
		if (objective && correct.length === 0) {
			toast.error("Pick at least one correct option");
			return;
		}
		if (isNumericType(draft.type) && numericList.length === 0) {
			toast.error("Enter at least one numerical answer");
			return;
		}
		const type = objective ? multi ? "multiple" : draft.type === "single" || draft.type === "multiple" ? "single" : draft.type : draft.type;
		const ordered = ids.filter((id) => correct.includes(id));
		await onSave({
			...draft,
			type,
			text: draft.text,
			correct: objective ? ordered : draft.correct,
			answerValue: objective ? draft.answerValue : numericList[0],
			answerValues: objective ? draft.answerValues : numericList.length > 1 ? numericList : void 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border bg-surface p-3", highlight && "border-primary ring-2 ring-primary/30", !validation.valid && "border-destructive/50"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded bg-primary/10 px-1.5 py-0.5 text-primary",
						children: ["Q", draft.number]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: draft.subject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: draft.chapter }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: QUESTION_TYPE_LABEL[draft.type] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("rounded px-1.5 py-0.5", validation.valid ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"),
						children: validation.valid ? "Valid" : "Invalid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyQuestion, {
						question,
						className: "ml-auto"
					}),
					onSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void onSelect(question),
						disabled: selected,
						className: cn("rounded border px-2 py-0.5 text-[10px] font-semibold", selected ? "cursor-not-allowed border-primary/40 bg-primary/10 text-primary" : "border-primary bg-primary text-primary-foreground"),
						children: selected ? "Selected" : "Add"
					}),
					objective && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => switchMode(false),
							className: cn("rounded border px-2 py-0.5 text-[10px]", !multi && "border-primary bg-primary text-primary-foreground"),
							children: "Single"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => switchMode(true),
							className: cn("rounded border px-2 py-0.5 text-[10px]", multi && "border-primary bg-primary text-primary-foreground"),
							children: "Multiple"
						})]
					})
				]
			}),
			!validation.valid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 flex items-start gap-1.5 text-[11px] text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-px size-3.5 shrink-0" }), validation.reasons.join(" · ")]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: draft.text,
				onChange: (e) => patch({ text: e.target.value }),
				rows: 3,
				placeholder: "Question statement (LaTeX supported)",
				className: "mt-2 w-full rounded-lg border bg-card p-2 text-sm"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 line-clamp-2 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: draft.text || "— empty question —" })
			}),
			objective ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-1.5 sm:grid-cols-2",
				children: [draft.options.map((o, i) => {
					const id = ids[i];
					const on = correct.includes(id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggle(id),
								className: cn("flex min-w-0 flex-1 items-start gap-2 rounded-lg border bg-card p-2 text-left text-xs", on && "border-success bg-success/10"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-5 shrink-0 place-items-center border text-[10px] font-bold", multi ? "rounded" : "rounded-full", on && "border-success bg-success text-background"),
									children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : id
								}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: o.text,
									onClick: (e) => e.stopPropagation(),
									onChange: (e) => setOptionText(i, e.target.value),
									placeholder: `Option ${id} — text, or leave empty and upload an image`,
									className: "min-w-0 flex-1 rounded border bg-surface px-2 py-1"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
									className: "min-w-0",
									children: o.text
								})]
							}), open && draft.options.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeOption(i),
								title: "Remove option",
								className: "rounded border p-1.5 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})]
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border bg-card p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionImageEditor, {
								testId,
								label: `Option ${id} image`,
								hint: "Drop or paste (Ctrl+V) an image of this option — used as-is.",
								images: o.images ?? [],
								onChange: (imgs) => setOptionImages(i, imgs)
							})
						}) : (o.images?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pl-2 text-[11px] text-muted-foreground",
							children: [o.images.length, " option image(s)"]
						})]
					}, id);
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: addOption,
					className: "rounded-lg border border-dashed py-2 text-xs font-semibold text-muted-foreground",
					children: "+ Add option"
				})]
			}) : isMatrix ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-[11px] text-muted-foreground",
				children: [
					"Match the Following question — open “Edit all fields” to build the table and set the matching pairs. Current pairs:",
					" ",
					Object.entries(pairs).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(", ") || "—"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 max-w-[280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: numeric,
					onChange: (e) => setNumeric(e.target.value.replace(/[^0-9.,\s-]/g, "")),
					className: "w-full rounded-lg border bg-card px-3 py-1.5 font-mono text-sm",
					placeholder: "e.g. 2 or 2,3 or 2.5,3.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: "Separate multiple accepted answers with commas — any one of them counts as correct."
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Subject",
								value: draft.subject,
								onChange: (v) => patch({ subject: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Chapter",
								value: draft.chapter,
								onChange: (v) => patch({ chapter: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Topic",
								value: draft.topic,
								onChange: (v) => patch({ topic: v })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
									children: "Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.type,
									onChange: (e) => patch({ type: e.target.value }),
									className: "w-full rounded-lg border bg-card px-2 py-1.5 text-xs",
									children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: QUESTION_TYPE_LABEL[t]
									}, t))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
									children: "Difficulty"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.difficulty,
									onChange: (e) => patch({ difficulty: e.target.value }),
									className: "w-full rounded-lg border bg-card px-2 py-1.5 text-xs",
									children: DIFFS$2.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d,
										children: d
									}, d))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Marks",
								value: String(draft.marks),
								onChange: (v) => patch({ marks: Number(v) || 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Negative",
								value: String(draft.negative),
								onChange: (v) => patch({ negative: Number(v) || 0 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionImages, {
						testId,
						images: draft.images,
						hasText: Boolean(draft.text?.trim()),
						onChange: (images) => patch({
							images,
							flags: {
								...draft.flags,
								diagram: images.length > 0
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpacingControls, {
						spacing: draft.spacing,
						onChange: (spacing) => patch({ spacing })
					}),
					isMatrix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixEditor, {
						matrix: draft.matrix ?? {
							left: [
								"",
								"",
								""
							],
							right: [
								"",
								"",
								""
							]
						},
						pairs,
						onMatrix: (matrix) => patch({ matrix }),
						onPairs: setPairs
					}),
					!isMatrix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({
							type: "matrix",
							matrix: {
								left: [
									"",
									"",
									""
								],
								right: [
									"",
									"",
									""
								],
								borders: true
							}
						}),
						className: "rounded-lg border border-dashed px-3 py-1.5 text-xs font-semibold text-muted-foreground",
						children: "+ Add Match the Following table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Explanation",
						value: draft.explanation ?? "",
						onChange: (v) => patch({ explanation: v || void 0 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Solution",
						value: draft.solution ?? "",
						onChange: (v) => patch({ solution: v || void 0 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: commit,
						className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
						children: saveLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen((o) => !o),
						className: "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform", open && "rotate-180") }), open ? "Hide fields" : "Edit all fields"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onDelete(question),
						className: "inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Delete"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: [
							"Key:",
							" ",
							objective ? correct.join(", ") || "—" : isMatrix ? Object.entries(pairs).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(", ") || "—" : numeric || "—"
						]
					})
				]
			})
		]
	});
}
var GAPS = [
	{
		label: "Small",
		value: 10
	},
	{
		label: "Medium",
		value: 20
	},
	{
		label: "Large",
		value: 32
	}
];
/** Presentation-only gap editor — never touches question, answer or solution text. */
function SpacingControls({ spacing, onChange }) {
	const sp = spacing ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-semibold uppercase text-muted-foreground",
				children: "Gap / spacing (shown the same way in CBT)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(void 0),
				className: "rounded border px-2 py-0.5 text-[11px] font-semibold",
				children: "Reset formatting"
			})]
		}), [
			{
				key: "block",
				label: "Question / paragraph / equation blocks",
				fallback: 20
			},
			{
				key: "options",
				label: "Options",
				fallback: 8
			},
			{
				key: "solution",
				label: "Solution steps",
				fallback: 12
			}
		].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-1.5 text-[11px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-[210px]",
					children: r.label
				}),
				GAPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange({
						...sp,
						[r.key]: g.value
					}),
					className: cn("rounded border px-2 py-0.5 font-semibold", (sp[r.key] ?? r.fallback) === g.value && "border-primary bg-primary text-primary-foreground"),
					children: g.label
				}, g.label)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					min: 0,
					max: 120,
					value: sp[r.key] ?? r.fallback,
					onChange: (e) => onChange({
						...sp,
						[r.key]: Number(e.target.value) || 0
					}),
					className: "w-16 rounded border bg-surface px-1.5 py-0.5",
					title: "Custom gap in px"
				}),
				"px"
			]
		}, r.key))]
	});
}
function Text({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-lg border bg-card px-2 py-1.5 text-xs"
		})]
	});
}
function Area({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			rows: 2,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-lg border bg-card p-2 text-xs"
		})]
	});
}
/**
* Two image upload modes for the existing builder — no schema change:
* the same `images` array is used, the mode only changes the guidance and how
* the CBT renderer treats it (an image-only question with no statement text is
* shown as the question itself).
*/
function QuestionImages({ testId, images, hasText, onChange }) {
	const [mode, setMode] = (0, import_react.useState)(images.length > 0 && !hasText ? "complete" : "support");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: ["complete", "support"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(m),
					className: cn("rounded-md border px-2.5 py-1 text-[11px] font-semibold", mode === m ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground"),
					children: m === "complete" ? "Complete question image" : "Supporting image"
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionImageEditor, {
				testId,
				images,
				onChange,
				label: mode === "complete" ? "Complete question image" : "Supporting images",
				hint: mode === "complete" ? "Upload the scanned / screenshot question. Leave the statement text empty — the image is shown as the question in CBT, byte-for-byte, no OCR or processing. Add options, answer, marks and metadata below as usual." : "Attach graphs, diagrams, circuits, tables, chemical structures or other figures to a typed question. Drag & drop, or click and press Ctrl+V. PNG · JPG · JPEG · WEBP, stored exactly as uploaded."
			}),
			mode === "complete" && hasText && images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-warning",
				children: "This question has statement text, so the image renders as a figure below the text. Clear the statement to show the image as the whole question."
			})
		]
	});
}
//#endregion
//#region src/lib/bank.ts
var import_lib = /* @__PURE__ */ __toESM(require_lib(), 1);
/** Flat pool of every question in every imported set. */
function bankItems(tests) {
	const out = [];
	for (const t of tests) for (const q of t.questions) out.push({
		q,
		test: t
	});
	return out;
}
/** Validation report for a bank pool — invalid questions never enter a test. */
function validateBank(items) {
	return validatePool(items, (i) => i.q);
}
/** Only questions that pass validation. */
function validBankItems(items) {
	return validateBank(items).valid;
}
/** Total / valid / invalid counts per subject. */
function validationBySubject(items) {
	const report = validateBank(items);
	const map = /* @__PURE__ */ new Map();
	const bump = (subject, key) => {
		const s = subject || "General";
		const cur = map.get(s) ?? {
			subject: s,
			total: 0,
			valid: 0,
			invalid: 0
		};
		cur.total += 1;
		cur[key] += 1;
		map.set(s, cur);
	};
	for (const it of report.valid) bump(it.q.subject, "valid");
	for (const { item } of report.invalid) bump(item.q.subject, "invalid");
	return [...map.values()].sort((a, b) => a.subject.localeCompare(b.subject));
}
/** Subject → chapter folder tree. */
function chapterTree(items) {
	const chapters = /* @__PURE__ */ new Map();
	for (const it of items) {
		const subject = it.q.subject || "General";
		const chapter = it.q.chapter || "General";
		const key = `${subject}::${chapter}`;
		let node = chapters.get(key);
		if (!node) {
			node = {
				key,
				subject,
				chapter,
				topics: [],
				total: 0,
				easy: 0,
				medium: 0,
				hard: 0,
				figures: 0,
				items: []
			};
			chapters.set(key, node);
		}
		node.total += 1;
		if (it.q.difficulty === "Easy") node.easy += 1;
		else if (it.q.difficulty === "Hard") node.hard += 1;
		else node.medium += 1;
		node.figures += it.q.images.length;
		if (it.q.topic && !node.topics.includes(it.q.topic)) node.topics.push(it.q.topic);
		node.items.push(it);
	}
	const subjects = /* @__PURE__ */ new Map();
	for (const node of chapters.values()) {
		const s = subjects.get(node.subject) ?? {
			subject: node.subject,
			total: 0,
			chapters: []
		};
		s.total += node.total;
		s.chapters.push(node);
		subjects.set(node.subject, s);
	}
	const list = [...subjects.values()];
	for (const s of list) s.chapters.sort((a, b) => a.chapter.localeCompare(b.chapter));
	return list.sort((a, b) => a.subject.localeCompare(b.subject));
}
/** Library a set belongs to — inferred from its name when not tagged. */
function examOf(test) {
	if (test?.exam) return test.exam;
	return /advanc/i.test(test?.name ?? "") ? "advanced" : "main";
}
function normalizeSearchText(value) {
	const aliases = new Map([
		["mathematics", "math"],
		["mathematical", "math"],
		["maths", "math"],
		["math", "math"],
		["physics", "physics"],
		["phy", "physics"],
		["chemistry", "chemistry"],
		["chem", "chemistry"],
		["biology", "biology"],
		["bio", "biology"]
	]);
	const normalized = (value ?? "").trim().toLowerCase().replace(/&/g, " and ").replace(/[\/\\-]+/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
	if (!normalized) return "";
	return normalized.split(" ").map((token) => aliases.get(token) ?? token).join(" ").replace(/\s+/g, " ").trim();
}
function filterItems(items, f) {
	const term = normalizeSearchText(f.search);
	return items.filter(({ q, test }) => {
		if (f.exams?.length && !f.exams.includes(examOf(test))) return false;
		if (f.banks?.length) {
			const bankName = (test.name ?? "").trim() || "Unknown Question Bank";
			if (!f.banks.includes(bankName)) return false;
		}
		if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
		if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
		if (f.topics?.length && q.topic && !f.topics.includes(q.topic)) return false;
		if (f.difficulties?.length && !f.difficulties.includes(q.difficulty)) return false;
		if (f.types?.length && !f.types.includes(q.type)) return false;
		if (f.pyqOnly && !q.pyq) return false;
		if (term) {
			if (!normalizeSearchText([
				q.id,
				q.text,
				q.chapter,
				q.topic,
				q.subject,
				q.difficulty,
				q.type,
				Array.isArray(q.tags) ? q.tags.join(" ") : "",
				q.formula,
				q.concept,
				q.altMethod
			].filter(Boolean).join(" ")).includes(term)) return false;
		}
		return true;
	});
}
function shuffle$1(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
/**
* Picks `count` questions at random, never repeating inside the test and
* exhausting least-used questions first so a chapter cycles fully before any
* question comes back in a later test.
*/
function smartPick(items, count, usage) {
	if (count <= 0 || items.length === 0) return [];
	const buckets = /* @__PURE__ */ new Map();
	for (const it of items) {
		const used = usage.get(it.q.id)?.count ?? 0;
		const b = buckets.get(used) ?? [];
		b.push(it);
		buckets.set(used, b);
	}
	const out = [];
	for (const level of [...buckets.keys()].sort((a, b) => a - b)) {
		if (out.length >= count) break;
		out.push(...shuffle$1(buckets.get(level)).slice(0, count - out.length));
	}
	return shuffle$1(out);
}
/** Proportional split of `total` across pools, capped by availability. */
function autoDistribute(pools, total) {
	const sum = pools.reduce((a, p) => a + p.available, 0);
	const plan = /* @__PURE__ */ new Map();
	if (sum === 0) return plan;
	let assigned = 0;
	const target = Math.min(total, sum);
	for (const p of pools) {
		const n = Math.min(p.available, Math.floor(p.available / sum * target));
		plan.set(p.key, n);
		assigned += n;
	}
	let i = 0;
	while (assigned < target && pools.length) {
		const p = pools[i % pools.length];
		const cur = plan.get(p.key) ?? 0;
		if (cur < p.available) {
			plan.set(p.key, cur + 1);
			assigned += 1;
		} else if (pools.every((x) => (plan.get(x.key) ?? 0) >= x.available)) break;
		i += 1;
	}
	return plan;
}
/** Builds a paper from per-chapter quotas using the smart random engine. */
function buildFromPlan(groups, plan, usage) {
	const picked = [];
	const seen = /* @__PURE__ */ new Set();
	for (const g of groups) for (const it of smartPick(g.items, plan.get(g.key) ?? 0, usage)) {
		if (seen.has(it.q.id)) continue;
		seen.add(it.q.id);
		picked.push(it);
	}
	return shuffle$1(picked);
}
async function questionHistory() {
	const attempts = (await listAttempts()).filter((a) => a.submitted);
	const h = {
		attempted: /* @__PURE__ */ new Set(),
		correct: /* @__PURE__ */ new Set(),
		wrong: /* @__PURE__ */ new Set(),
		skipped: /* @__PURE__ */ new Set(),
		bookmarked: /* @__PURE__ */ new Set(),
		mastered: /* @__PURE__ */ new Set(),
		chapterAccuracy: /* @__PURE__ */ new Map()
	};
	for (const a of attempts) {
		const questions = await questionsForAttempt(a);
		for (const q of questions) {
			const ans = a.answers[q.id];
			if (ans?.bookmarked) h.bookmarked.add(q.id);
			const key = `${q.subject}::${q.chapter}`;
			const bucket = h.chapterAccuracy.get(key) ?? {
				correct: 0,
				total: 0
			};
			if (!(ans?.value !== null && ans?.value !== void 0 && String(ans?.value).length > 0)) h.skipped.add(q.id);
			else {
				h.attempted.add(q.id);
				bucket.total += 1;
				if (isCorrect(q, ans.value)) {
					h.correct.add(q.id);
					bucket.correct += 1;
				} else h.wrong.add(q.id);
			}
			h.chapterAccuracy.set(key, bucket);
		}
	}
	for (const id of h.correct) if (!h.wrong.has(id) && !h.skipped.has(id)) h.mastered.add(id);
	return h;
}
/**
* Questions still allowed in newly generated tests. A question is locked only when
* every appearance across saved history was answered correctly; deleting those
* attempts from History makes it eligible again.
*/
function eligibleItems(items, mastered) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const it of items) {
		if (mastered.has(it.q.id) || seen.has(it.q.id)) continue;
		seen.add(it.q.id);
		out.push(it);
	}
	return out;
}
async function weakSourcePool(source) {
	const [tests, history] = await Promise.all([listTests(), questionHistory()]);
	const items = bankItems(tests);
	if (source === "wrong") return items.filter((i) => history.wrong.has(i.q.id));
	if (source === "bookmarked") return items.filter((i) => history.bookmarked.has(i.q.id));
	if (source === "unattempted") return items.filter((i) => !history.attempted.has(i.q.id));
	const weakChapters = new Set([...history.chapterAccuracy.entries()].filter(([, v]) => v.total >= 3 && v.correct / v.total < .6).map(([k]) => k));
	return items.filter((i) => weakChapters.has(`${i.q.subject}::${i.q.chapter}`));
}
async function currentUsage() {
	return usageMap();
}
//#endregion
//#region src/lib/advanced.ts
/**
* JEE Advanced module core.
*
* Everything here is additive — JEE Main logic (bank.ts, stats.ts, scoring.ts)
* is untouched and keeps working exactly as before.
*/
/** Detects Paper 1 / Paper 2 from tags or the file name — never asks the user. */
function detectPaper(name, tagged) {
	if (tagged === 1 || tagged === 2) return tagged;
	const n = name.toLowerCase();
	if (/(paper[\s_-]*2|p[\s_-]*2\b|\bpaper2\b|\bii\b)/.test(n)) return 2;
	return 1;
}
function detectYear(name, tagged) {
	if (tagged && tagged > 1950) return tagged;
	const m = name.match(/(19|20)\d{2}/);
	return m ? Number(m[0]) : void 0;
}
var isAdvanced = (t) => examOf(t) === "advanced";
function advancedTests(tests) {
	return tests.filter(isAdvanced);
}
function paperOf(t) {
	return detectPaper(t.name, t.paper);
}
function yearOf(t) {
	return detectYear(t.name, t.year);
}
var SUBJECT_ORDER$1 = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
function subjectRank(s) {
	const i = SUBJECT_ORDER$1.findIndex((x) => x.toLowerCase() === (s || "").toLowerCase());
	return i === -1 ? SUBJECT_ORDER$1.length : i;
}
/**
* Physics → Chemistry → Mathematics, renumbered 1..n so subjects never mix.
* (Physics 1–25, Chemistry 26–50, Maths 51–75 for a standard 75-question paper.)
*/
function arrangeBySubject(questions) {
	return [...questions].sort((a, b) => subjectRank(a.subject) - subjectRank(b.subject) || a.number - b.number).map((q, i) => ({
		...q,
		number: i + 1
	}));
}
function subjectBlocks(questions) {
	const blocks = [];
	questions.forEach((q, i) => {
		const last = blocks[blocks.length - 1];
		if (last && last.subject === q.subject) {
			last.to = i + 1;
			last.count += 1;
		} else blocks.push({
			subject: q.subject,
			from: i + 1,
			to: i + 1,
			count: 1
		});
	});
	return blocks;
}
/** Flat, memo-friendly pool of every JEE Advanced question. */
function advancedPool(tests) {
	const out = [];
	for (const t of advancedTests(tests)) {
		const paper = paperOf(t);
		const year = yearOf(t);
		for (const q of t.questions) out.push({
			q,
			test: t,
			paper,
			year: q.year ?? year
		});
	}
	return out;
}
/** True when a set name contains "PYQ" anywhere (case-insensitive). */
function isPyqName(name) {
	return /pyq/i.test(String(name ?? ""));
}
/**
* Every question available to Advanced → PYQ: the Advanced pool plus any set
* whose name contains "PYQ", regardless of which library it was imported into.
*/
function pyqPool(tests) {
	const out = advancedPool(tests);
	const seen = new Set(out.map((i) => i.test.id));
	for (const t of tests) {
		if (seen.has(t.id) || !isPyqName(t.name)) continue;
		const paper = paperOf(t);
		const year = yearOf(t);
		for (const q of t.questions) out.push({
			q,
			test: t,
			paper,
			year: q.year ?? year
		});
	}
	return out;
}
/** Built once per pool change; keeps filtering O(n) with no per-keystroke work. */
function buildIndex(items) {
	const byId = /* @__PURE__ */ new Map();
	const search = /* @__PURE__ */ new Map();
	const subjects = /* @__PURE__ */ new Set();
	const chapters = /* @__PURE__ */ new Set();
	const topics = /* @__PURE__ */ new Set();
	const years = /* @__PURE__ */ new Set();
	const types = /* @__PURE__ */ new Set();
	for (const it of items) {
		byId.set(it.q.id, it);
		search.set(it.q.id, `${it.q.text} ${it.q.chapter} ${it.q.topic} ${it.q.subject} ${it.test.name}`.toLowerCase());
		subjects.add(it.q.subject || "General");
		chapters.add(it.q.chapter || "General");
		if (it.q.topic) topics.add(it.q.topic);
		if (it.year) years.add(it.year);
		types.add(it.q.type);
	}
	return {
		items,
		byId,
		search,
		subjects: [...subjects].sort(),
		chapters: [...chapters].sort(),
		topics: [...topics].sort(),
		years: [...years].sort((a, b) => b - a),
		types: [...types]
	};
}
function customPyqSelection(items, f) {
	if (!Boolean(f.papers?.length || f.years?.length || f.subjects?.length || f.chapters?.length || f.topics?.length)) return items;
	return items.filter(({ q, paper, year }) => {
		if (f.papers?.length && !f.papers.includes(paper)) return false;
		if (f.years?.length && (!year || !f.years.includes(year))) return false;
		if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
		if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
		if (f.topics?.length && (!q.topic || !f.topics.includes(q.topic))) return false;
		return true;
	});
}
function filterAdvanced(index, f, history) {
	const term = f.search?.trim().toLowerCase() ?? "";
	return index.items.filter(({ q, paper, year }) => {
		if (f.papers?.length && !f.papers.includes(paper)) return false;
		if (f.years?.length && (!year || !f.years.includes(year))) return false;
		if (f.subjects?.length && !f.subjects.includes(q.subject)) return false;
		if (f.chapters?.length && !f.chapters.includes(q.chapter)) return false;
		if (f.topics?.length && (!q.topic || !f.topics.includes(q.topic))) return false;
		if (f.difficulties?.length && !f.difficulties.includes(q.difficulty)) return false;
		if (f.types?.length && !f.types.includes(q.type)) return false;
		if (f.pyqOnly && !q.pyq) return false;
		if (history && f.source && f.source !== "all" && f.source !== "imported") {
			if (f.source === "wrong" && !history.wrong.has(q.id)) return false;
			if (f.source === "unattempted" && history.attempted.has(q.id)) return false;
			if (f.source === "bookmarked" && !history.bookmarks.has(q.id)) return false;
			if (f.source === "pyq" && !q.pyq) return false;
			if (f.source === "weak" && !history.weakChapters.has(`${q.subject}::${q.chapter}`)) return false;
			if (f.source === "strong" && !history.strongChapters.has(`${q.subject}::${q.chapter}`)) return false;
		}
		if (term && !(index.search.get(q.id) ?? "").includes(term)) return false;
		return true;
	});
}
var BOOKMARK_TAGS = [
	"Revision",
	"Doubt",
	"Important",
	"Formula",
	"Favourite"
];
var EMPTY_HISTORY = () => ({
	used: /* @__PURE__ */ new Set(),
	attempted: /* @__PURE__ */ new Set(),
	correct: /* @__PURE__ */ new Set(),
	wrong: /* @__PURE__ */ new Set(),
	bookmarks: /* @__PURE__ */ new Set(),
	bookmarkList: [],
	chapterAccuracy: /* @__PURE__ */ new Map(),
	weakChapters: /* @__PURE__ */ new Set(),
	strongChapters: /* @__PURE__ */ new Set()
});
var isAdvancedAttempt = (a) => a.exam === "advanced" || /advanc/i.test(a.testName ?? "");
async function advancedHistory() {
	const attempts = (await listAttempts()).filter(isAdvancedAttempt);
	const h = EMPTY_HISTORY();
	for (const a of attempts) {
		const questions = await questionsForAttempt(a);
		const completed = Boolean(a.submitted);
		for (const q of questions) {
			const ans = a.answers[q.id];
			if (completed) h.used.add(q.id);
			if (ans?.bookmarked) {
				if (!h.bookmarks.has(q.id)) {
					h.bookmarks.add(q.id);
					h.bookmarkList.push({
						question: q,
						tag: ans.tag,
						attemptId: a.id,
						testName: a.testName,
						year: q.year,
						correct: ans.value != null ? isCorrect(q, ans.value) : void 0
					});
				}
			}
			if (!completed) continue;
			if (!(ans?.value != null && String(ans.value).length > 0)) continue;
			h.attempted.add(q.id);
			const key = `${q.subject}::${q.chapter}`;
			const bucket = h.chapterAccuracy.get(key) ?? {
				correct: 0,
				total: 0
			};
			bucket.total += 1;
			if (isCorrect(q, ans.value)) {
				bucket.correct += 1;
				h.correct.add(q.id);
				h.wrong.delete(q.id);
			} else h.wrong.add(q.id);
			h.chapterAccuracy.set(key, bucket);
		}
	}
	for (const [key, v] of h.chapterAccuracy) {
		if (v.total < 3) continue;
		if (v.correct / v.total < .6) h.weakChapters.add(key);
		else if (v.correct / v.total >= .8) h.strongChapters.add(key);
	}
	return h;
}
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function pickQuestions(items, opts) {
	const valid = validatePool(items, (i) => i.q).valid;
	const picked = shuffle(opts.allowRepeat ? valid : valid.filter((i) => !opts.used?.has(i.q.id))).slice(0, Math.max(0, opts.count)).map((i) => i.q);
	return opts.arrange === false ? picked : arrangeBySubject(picked);
}
/** Even Physics / Chemistry / Maths split for full papers. */
function pickBalanced(items, perSubject, opts) {
	const out = [];
	for (const s of SUBJECT_ORDER$1) {
		const subset = items.filter((i) => i.q.subject.toLowerCase() === s.toLowerCase());
		out.push(...pickQuestions(subset, {
			...opts,
			count: perSubject,
			arrange: false
		}));
	}
	if (out.length === 0) return pickQuestions(items, {
		...opts,
		count: perSubject * 3
	});
	return arrangeBySubject(out);
}
async function advancedContext() {
	const [tests, history] = await Promise.all([listTests(), advancedHistory()]);
	const pool = advancedPool(tests);
	return {
		tests,
		pool,
		pyq: pyqPool(tests),
		index: buildIndex(pool),
		history
	};
}
//#endregion
//#region src/lib/import.ts
var IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i;
var TYPE_ALIASES = {
	single: "single",
	scq: "single",
	mcq: "single",
	singlecorrect: "single",
	singlechoice: "single",
	multiple: "multiple",
	multi: "multiple",
	multiplecorrect: "multiple",
	msq: "multiple",
	integer: "integer",
	int: "integer",
	numerical: "numerical",
	numeric: "numerical",
	nat: "numerical",
	matrix: "matrix",
	matrixmatch: "matrix",
	match: "matrix",
	assertion: "assertion",
	assertionreason: "assertion",
	ar: "assertion",
	paragraph: "paragraph",
	comprehension: "paragraph",
	passage: "paragraph",
	diagram: "diagram",
	graph: "graph",
	table: "table"
};
function normType(raw, q) {
	const key = String(raw ?? "").toLowerCase().replace(/[^a-z]/g, "");
	if (TYPE_ALIASES[key]) return TYPE_ALIASES[key];
	const correct = q.correct ?? q.answer ?? q.correctAnswer;
	if (Array.isArray(correct) && correct.length > 1) return "multiple";
	if (typeof correct === "number") return "numerical";
	const opts = q.options ?? q.choices;
	if (!opts || Array.isArray(opts) && opts.length === 0) return "numerical";
	return "single";
}
function normSubject(raw) {
	const s = String(raw ?? "").trim();
	const l = s.toLowerCase();
	if (l.startsWith("phy")) return "Physics";
	if (l.startsWith("chem")) return "Chemistry";
	if (l.startsWith("math") || l.startsWith("maths")) return "Mathematics";
	return s || "General";
}
function normDifficulty(raw) {
	const l = String(raw ?? "").toLowerCase();
	if (l.startsWith("e")) return "Easy";
	if (l.startsWith("h")) return "Hard";
	return "Medium";
}
var LETTERS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
];
function normOptions(raw) {
	if (!raw) return [];
	if (Array.isArray(raw)) return raw.map((o, i) => {
		if (o && typeof o === "object") {
			const obj = o;
			return {
				id: String(obj.id ?? obj.key ?? obj.label ?? LETTERS[i] ?? i),
				text: String(obj.text ?? obj.value ?? obj.option ?? ""),
				images: toStringArray(obj.images ?? obj.image ?? obj.figure ?? obj.diagram)
			};
		}
		return {
			id: LETTERS[i] ?? String(i),
			text: String(o ?? "")
		};
	}).filter((o) => o.text !== "" || (o.images?.length ?? 0) > 0);
	if (typeof raw === "object") return Object.entries(raw).map(([k, v]) => ({
		id: k.toUpperCase(),
		text: String(v ?? "")
	}));
	return [];
}
function toStringArray(v) {
	if (!v) return [];
	if (Array.isArray(v)) return v.flatMap((x) => toStringArray(x));
	if (typeof v === "object") {
		const o = v;
		return toStringArray(o.src ?? o.path ?? o.url ?? o.file ?? o.name ?? o.image);
	}
	const s = String(v).trim();
	return s ? [s] : [];
}
function normCorrect(raw, options) {
	return (Array.isArray(raw) ? raw : raw === void 0 || raw === null ? [] : [raw]).flatMap((c) => typeof c === "string" && /[,;]/.test(c) ? c.split(/[,;]/) : [c]).map((c) => {
		const s = String(c).trim();
		if (options.some((o) => o.id.toLowerCase() === s.toLowerCase())) return options.find((o) => o.id.toLowerCase() === s.toLowerCase()).id;
		const n = Number(s);
		if (!Number.isNaN(n) && options[n]) return options[n].id;
		if (!Number.isNaN(n) && options[n - 1]) return options[n - 1].id;
		return s;
	}).filter(Boolean);
}
var CHEM_HINT = /(\\ce|reaction|organic|benzene|alkane|alkene|isomer|→|->)/i;
var IMAGE_KEYS = [
	"images",
	"image",
	"img",
	"imgs",
	"figure",
	"figures",
	"diagram",
	"diagrams",
	"image_path",
	"imagePath",
	"imagepaths",
	"image_paths",
	"imageUrl",
	"image_url",
	"asset",
	"assets",
	"picture",
	"pic",
	"photo",
	"fig",
	"attachment",
	"attachments"
];
/** Recursively collect anything that looks like an image reference. */
function collectImageRefs(value, depth = 0, out = []) {
	if (depth > 6 || value == null) return out;
	if (typeof value === "string") {
		const s = value.trim();
		if (s && IMAGE_EXT.test(s) && !/\s/.test(s.replace(/%20/g, ""))) out.push(s);
		return out;
	}
	if (Array.isArray(value)) {
		for (const v of value) collectImageRefs(v, depth + 1, out);
		return out;
	}
	if (typeof value === "object") for (const [k, v] of Object.entries(value)) {
		if (k === "options" || k === "choices") continue;
		collectImageRefs(v, depth + 1, out);
	}
	return out;
}
function questionImageRefs(raw) {
	const direct = [];
	for (const key of IMAGE_KEYS) if (raw[key] !== void 0) direct.push(...toStringArray(raw[key]));
	const deep = collectImageRefs(raw);
	return [...new Set([...direct, ...deep].map((s) => s.trim()).filter(Boolean))];
}
/** Normalizes Windows/Linux/relative/url-encoded paths to a lowercase posix path. */
function normPath(input) {
	let s = String(input ?? "").trim();
	if (!s) return "";
	s = s.replace(/^["']|["']$/g, "");
	s = s.split(/[?#]/)[0];
	try {
		if (/%[0-9a-f]{2}/i.test(s)) s = decodeURIComponent(s);
	} catch {}
	s = s.replace(/\\/g, "/");
	s = s.replace(/^[a-zA-Z]:\//, "");
	s = s.replace(/^file:\/\//, "");
	s = s.replace(/^https?:\/\/[^/]+\//, "");
	const parts = [];
	for (const seg of s.split("/")) {
		if (!seg || seg === ".") continue;
		if (seg === "..") {
			parts.pop();
			continue;
		}
		parts.push(seg);
	}
	return parts.join("/").toLowerCase();
}
function baseName(path) {
	return normPath(path).split("/").pop() ?? path;
}
function stripExt(name) {
	return name.replace(IMAGE_EXT, "");
}
/** Q1.png / q_1.jpg / question-01.webp / 1.png -> 1 */
function questionNumberFromFilename(name) {
	const m = stripExt(baseName(name)).match(/(?:^|[^0-9])(?:q(?:uestion)?[\s_-]*)?(\d{1,4})(?:[^0-9]|$)/i);
	if (!m) return null;
	const n = Number(m[1]);
	return Number.isFinite(n) ? n : null;
}
/**
* Multi-key index so a reference can be matched by full path, any trailing
* path suffix, filename, or filename-without-extension.
*/
var ImageIndex = class {
	map = /* @__PURE__ */ new Map();
	byId = /* @__PURE__ */ new Map();
	add(key, id) {
		if (!key) return;
		const cur = this.map.get(key);
		if (cur) {
			if (!cur.includes(id)) cur.push(id);
		} else this.map.set(key, [id]);
	}
	register(id, rawPath) {
		const path = normPath(rawPath);
		const base = baseName(path);
		this.byId.set(id, {
			path,
			base
		});
		const segs = path.split("/");
		for (let i = 0; i < segs.length; i++) this.add(segs.slice(i).join("/"), id);
		this.add(base, id);
		this.add(stripExt(base), id);
		this.add(stripExt(base).replace(/[\s_-]+/g, ""), id);
	}
	/** Returns the best matching image id, or null. */
	resolve(ref) {
		const p = normPath(ref);
		if (!p) return null;
		const candidateKeys = [p];
		const segs = p.split("/");
		for (let i = 1; i < segs.length; i++) candidateKeys.push(segs.slice(i).join("/"));
		const base = baseName(p);
		candidateKeys.push(base, stripExt(base), stripExt(base).replace(/[\s_-]+/g, ""));
		for (const key of candidateKeys) {
			const hits = this.map.get(key);
			if (!hits?.length) continue;
			if (hits.length === 1) return hits[0];
			return hits.find((id) => {
				const rec = this.byId.get(id);
				return rec.path === p || rec.path.endsWith("/" + p);
			}) ?? hits[0];
		}
		return null;
	}
};
/** Stable content fingerprint: subject + chapter + question text + option texts. */
function questionHash(q) {
	const norm = (v) => String(v ?? "").toLowerCase().replace(/\s+/g, " ").trim();
	const payload = [
		norm(q.subject),
		norm(q.chapter),
		norm(q.text),
		q.options.map((o) => norm(o.text)).join("|"),
		q.answerValue ?? ""
	].join("~");
	let h1 = 2166136261;
	let h2 = 16777619;
	for (let i = 0; i < payload.length; i++) {
		const c = payload.charCodeAt(i);
		h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
		h2 = (Math.imul(h2 + c, 2654435761) ^ h2 >>> 7) >>> 0;
	}
	return `${h1.toString(36)}${h2.toString(36)}${payload.length.toString(36)}`;
}
function normalizeQuestion(raw, index, issues) {
	const type = normType(raw.type ?? raw.questionType ?? raw.qtype, raw);
	const options = normOptions(raw.options ?? raw.choices).map((o) => ({
		...o,
		text: repairLatex(o.text)
	}));
	const text = repairLatex(String(raw.question ?? raw.text ?? raw.statement ?? raw.body ?? "").trim());
	const number = Number(raw.number ?? raw.no ?? raw.qno ?? raw.q_no ?? index + 1) || index + 1;
	if (!text) issues.push({
		level: "warning",
		message: `Q${number}: empty question text`
	});
	const correctRaw = raw.correct ?? raw.answer ?? raw.correctAnswer ?? raw.correctOption ?? raw.correct_option;
	const correct = type === "integer" || type === "numerical" ? [] : normCorrect(correctRaw, options);
	const numericList = type === "integer" || type === "numerical" ? parseNumericList(correctRaw ?? raw.value ?? raw.answers) : [];
	const answerValue = numericList.length ? numericList[0] : void 0;
	const images = questionImageRefs(raw);
	const matrixRaw = raw.matrix ?? raw.match;
	const solution = repairLatex(String(raw.solution ?? "")) || void 0;
	const explanation = repairLatex(String(raw.explanation ?? raw.reason ?? "")) || void 0;
	const tableHtml = raw.table ? String(raw.table) : void 0;
	return {
		id: String(raw.id ?? raw.questionId ?? raw.question_id ?? `q${number}_${index}`),
		number,
		subject: normSubject(raw.subject),
		chapter: String(raw.chapter ?? raw.unit ?? "General").trim() || "General",
		topic: String(raw.topic ?? "").trim(),
		difficulty: normDifficulty(raw.difficulty ?? raw.level),
		type,
		text,
		paragraph: raw.paragraph ? repairLatex(String(raw.paragraph)) : void 0,
		options,
		correct,
		answerValue,
		answerValues: numericList.length > 1 ? numericList : void 0,
		tolerance: Number(raw.tolerance ?? .01),
		matrix: matrixRaw ? {
			left: toStringArray(matrixRaw.left ?? matrixRaw.listI),
			right: toStringArray(matrixRaw.right ?? matrixRaw.listII)
		} : void 0,
		tableHtml,
		solution,
		explanation,
		images,
		marks: Number(raw.marks ?? 4),
		negative: Number(raw.negative ?? raw.negativeMarks ?? (type === "numerical" ? 0 : 1)),
		flags: {
			diagram: type === "diagram" || images.length > 0,
			graph: type === "graph" || /graph/i.test(text),
			table: type === "table" || Boolean(tableHtml),
			chem: normSubject(raw.subject) === "Chemistry" && CHEM_HINT.test(text)
		}
	};
}
var MIME = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	webp: "image/webp",
	gif: "image/gif",
	svg: "image/svg+xml",
	bmp: "image/bmp",
	avif: "image/avif"
};
async function readZip(file) {
	const zip = await import_lib.default.loadAsync(file);
	const jsons = [];
	const texts = [];
	const images = [];
	const entries = Object.values(zip.files).filter((f) => !f.dir && !f.name.split("/").pop().startsWith(".") && !f.name.startsWith("__MACOSX/"));
	for (const entry of entries) if (/\.json$/i.test(entry.name)) jsons.push({
		path: entry.name,
		text: await entry.async("string")
	});
	else if (/\.(csv|txt)$/i.test(entry.name)) texts.push({
		path: entry.name,
		text: await entry.async("string")
	});
	else if (IMAGE_EXT.test(entry.name)) {
		const ext = entry.name.split(".").pop().toLowerCase();
		const raw = await entry.async("blob");
		const blob = raw.type ? raw : new Blob([raw], { type: MIME[ext] ?? "image/png" });
		images.push({
			path: entry.name,
			blob
		});
	}
	return {
		jsons,
		texts,
		images
	};
}
function extractQuestionArray(data) {
	if (Array.isArray(data)) return {
		questions: data,
		meta: {}
	};
	if (data && typeof data === "object") {
		const obj = data;
		for (const key of [
			"questions",
			"data",
			"items",
			"qs",
			"test",
			"question_bank",
			"bank"
		]) {
			const v = obj[key];
			if (Array.isArray(v)) return {
				questions: v,
				meta: obj
			};
			if (v && typeof v === "object" && Array.isArray(v.questions)) return {
				questions: v.questions,
				meta: v
			};
		}
	}
	throw new Error("No question array found in JSON (expected an array or a `questions` field).");
}
/** Applies answer-key rows onto questions, matching by id then by number. */
function applyAnswerKey(questions, entries) {
	const byId = new Map(questions.map((q) => [String(q.id).toLowerCase(), q]));
	const byNumber = new Map(questions.map((q) => [String(q.number), q]));
	let applied = 0;
	let unmatched = 0;
	for (const row of entries) {
		const q = byId.get(row.key.toLowerCase()) ?? byNumber.get(String(Number(row.key) || row.key));
		if (!q) {
			unmatched += 1;
			continue;
		}
		if (q.type === "integer" || q.type === "numerical") {
			const list = parseNumericList(row.answer);
			if (list.length) {
				q.answerValue = list[0];
				q.answerValues = list.length > 1 ? list : void 0;
			}
		} else {
			const c = normCorrect(row.answer, q.options);
			if (c.length) q.correct = c;
		}
		if (row.marks !== void 0 && !Number.isNaN(row.marks)) q.marks = row.marks;
		if (row.negative !== void 0 && !Number.isNaN(row.negative)) q.negative = row.negative;
		if (row.solution) q.solution = q.solution ?? row.solution;
		applied += 1;
	}
	return {
		applied,
		unmatched
	};
}
async function buildTestFromFiles(opts) {
	const issues = [];
	let parsed;
	try {
		parsed = JSON.parse(opts.jsonText);
	} catch (err) {
		throw new Error(`Invalid JSON: ${err.message}`);
	}
	const { questions: rawQs, meta } = extractQuestionArray(parsed);
	if (rawQs.length === 0) throw new Error("The JSON contains zero questions.");
	const testId = uid("test");
	const allNormalized = rawQs.map((q, i) => normalizeQuestion(q, i, issues));
	const existingTests = await listTests();
	const known = /* @__PURE__ */ new Set();
	for (const t of existingTests) for (const q of t.questions) known.add(q.hash ?? questionHash(q));
	const questions = [];
	let duplicates = 0;
	for (const q of allNormalized) {
		const hash = questionHash(q);
		if (known.has(hash)) {
			duplicates += 1;
			continue;
		}
		known.add(hash);
		q.hash = hash;
		q.id = `${testId}::${q.id}`;
		questions.push(q);
	}
	if (duplicates) issues.push({
		level: "warning",
		message: `${duplicates} duplicate question(s) already in your bank were skipped.`
	});
	if (questions.length === 0) throw new Error("Every question in this file already exists in your bank — nothing to import.");
	if (opts.answerKeys?.length) {
		const { applied, unmatched } = applyAnswerKey(questions, opts.answerKeys);
		issues.push({
			level: "warning",
			message: `Answer key: ${applied} answer(s) linked${unmatched ? `, ${unmatched} row(s) had no matching question` : ""}.`
		});
	}
	const seenForValidation = {
		ids: /* @__PURE__ */ new Set(),
		signatures: /* @__PURE__ */ new Set()
	};
	let invalidCount = 0;
	for (const q of questions) {
		const { valid, reasons } = validateQuestion(q, seenForValidation);
		if (valid) continue;
		invalidCount += 1;
		if (invalidCount <= 50) issues.push({
			level: "warning",
			message: `Q${q.number}: ${reasons.join("; ")}`
		});
	}
	if (invalidCount) issues.push({
		level: "warning",
		message: `${invalidCount} question(s) failed validation and will be skipped when generating tests.`
	});
	const index = new ImageIndex();
	const stored = [];
	const seenIds = /* @__PURE__ */ new Set();
	for (const img of opts.images) {
		const path = normPath(img.path);
		let id = `${testId}::${path}`;
		let dup = 1;
		while (seenIds.has(id)) id = `${testId}::${path}#${dup++}`;
		seenIds.add(id);
		stored.push({
			id,
			testId,
			name: baseName(path),
			path,
			kind: /(^|\/)(solutions?|sol)\//.test(path) ? "solution" : "figure",
			blob: img.blob
		});
		index.register(id, path);
	}
	const used = /* @__PURE__ */ new Set();
	let missing = 0;
	const linkRefs = (refs, qNumber) => {
		const out = [];
		for (const ref of refs) {
			const id = index.resolve(ref);
			if (id) {
				if (!out.includes(id)) out.push(id);
				used.add(id);
				const rec = stored.find((s) => s.id === id);
				if (rec && rec.qNumber === void 0) rec.qNumber = qNumber;
			} else {
				missing += 1;
				issues.push({
					level: "warning",
					message: `Q${qNumber}: image "${ref}" not found in archive`
				});
			}
		}
		return out;
	};
	for (const q of questions) {
		q.images = linkRefs(q.images, q.number);
		for (const o of q.options) if (o.images?.length) o.images = linkRefs(o.images, q.number);
	}
	for (const rec of stored) {
		if (used.has(rec.id)) continue;
		const n = questionNumberFromFilename(rec.path ?? rec.name);
		if (n === null) continue;
		const q = questions.find((x) => x.number === n);
		if (!q) continue;
		rec.qNumber = n;
		if (rec.kind === "solution") {
			used.add(rec.id);
			continue;
		}
		if (!q.images.includes(rec.id)) q.images.push(rec.id);
		used.add(rec.id);
	}
	for (const q of questions) if (q.images.length > 0) q.flags.diagram = true;
	const unmatched = stored.filter((s) => !used.has(s.id));
	if (unmatched.length) issues.push({
		level: "warning",
		message: `${unmatched.length} image(s) could not be matched automatically — link them from the Figures page.`
	});
	await putImages(stored);
	const subjects = [...new Set(questions.map((q) => q.subject))];
	const chapters = [...new Set(questions.map((q) => q.chapter))];
	const errors = issues.filter((i) => i.level === "error").length;
	const testName = String(meta.name ?? meta.title ?? opts.name).trim() || opts.name;
	const exam = opts.exam ?? (/advanc/i.test(String(meta.exam ?? opts.name)) ? "advanced" : "main");
	const paper = detectPaper(`${testName} ${String(meta.paper ?? "")}`, meta.paper);
	const year = detectYear(testName, Number(meta.year) || void 0);
	if (year) {
		for (const q of questions) if (!q.year) q.year = year;
	}
	const test = {
		id: testId,
		name: testName,
		description: meta.description ? String(meta.description) : void 0,
		subjects,
		chapters,
		questionCount: questions.length,
		imageCount: stored.length,
		missingImages: missing,
		importedAt: Date.now(),
		updatedAt: Date.now(),
		source: opts.source,
		exam,
		paper: exam === "advanced" ? paper : void 0,
		year,
		durationMin: Number(meta.duration ?? meta.durationMin ?? opts.durationMin ?? 180),
		status: errors > 0 ? "invalid" : issues.length > 0 ? "warning" : "valid",
		issues,
		questions
	};
	await putTest(test);
	return {
		test,
		issues
	};
}
function validateTest(test) {
	const issues = [];
	if (test.questions.length === 0) issues.push({
		level: "error",
		message: "Test has no questions."
	});
	const seen = {
		ids: /* @__PURE__ */ new Set(),
		signatures: /* @__PURE__ */ new Set()
	};
	test.questions.forEach((q) => {
		const { valid, reasons } = validateQuestion(q, seen);
		if (!valid) issues.push({
			level: "error",
			message: `Q${q.number}: ${reasons.join("; ")}.`
		});
	});
	return issues;
}
function exportTestJson(test) {
	const payload = {
		name: test.name,
		duration: test.durationMin,
		questions: test.questions.map((q) => ({
			id: q.id,
			number: q.number,
			subject: q.subject,
			chapter: q.chapter,
			topic: q.topic,
			difficulty: q.difficulty,
			type: q.type,
			question: q.text,
			paragraph: q.paragraph,
			options: q.options.map((o) => ({
				id: o.id,
				text: o.text
			})),
			correct: q.type === "integer" || q.type === "numerical" ? q.answerValues?.length ? q.answerValues.join(",") : q.answerValue : q.correct,
			matrix: q.matrix,
			table: q.tableHtml,
			solution: q.solution,
			explanation: q.explanation,
			marks: q.marks,
			negative: q.negative,
			images: q.images.map((id) => id.split("::")[1] ?? id)
		}))
	};
	return JSON.stringify(payload, null, 2);
}
//#endregion
//#region src/routes/bank.tsx
var Route$31 = createFileRoute("/bank")({
	validateSearch: (search) => ({
		edit: typeof search.edit === "string" ? search.edit : void 0,
		q: typeof search.q === "string" ? search.q : void 0
	}),
	head: () => ({ meta: [
		{ title: "Question Bank — JEE CBT Platform" },
		{
			name: "description",
			content: "Manage imported JEE test sets: open, rename, duplicate, validate, export, edit answer keys and map diagrams to questions."
		},
		{
			property: "og:title",
			content: "Question Bank — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Search, filter and maintain every imported JEE question set on your device."
		}
	] }),
	component: BankPage
});
function BankPage() {
	const qc = useQueryClient();
	const router = useRouter();
	const { edit, q: focusQuestion } = Route$31.useSearch();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("date");
	const [figuresFor, setFiguresFor] = (0, import_react.useState)(null);
	const [answersFor, setAnswersFor] = (0, import_react.useState)(edit ?? null);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		let list = tests.data ?? [];
		if (search.trim()) {
			const s = search.toLowerCase();
			list = list.filter((t) => t.name.toLowerCase().includes(s) || t.chapters.some((c) => c.toLowerCase().includes(s)) || t.subjects.some((c) => c.toLowerCase().includes(s)));
		}
		if (subject !== "all") list = list.filter((t) => t.subjects.includes(subject));
		const sorted = [...list];
		sorted.sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "questions" ? b.questionCount - a.questionCount : b.importedAt - a.importedAt);
		return sorted;
	}, [
		tests.data,
		search,
		subject,
		sort
	]);
	const refresh = () => {
		qc.invalidateQueries({ queryKey: ["tests"] });
		qc.invalidateQueries({ queryKey: ["adv"] });
	};
	const onRename = async (t) => {
		const name = window.prompt("Rename test", t.name);
		if (!name?.trim()) return;
		await putTest({
			...t,
			name: name.trim(),
			updatedAt: Date.now()
		});
		refresh();
		toast.success("Renamed");
	};
	const onDuplicate = async (t) => {
		const copy = {
			...t,
			id: uid("test"),
			name: `${t.name} (copy)`,
			importedAt: Date.now()
		};
		const imgs = await listImages(t.id);
		const idMap = /* @__PURE__ */ new Map();
		await putImages(imgs.map((i) => {
			const nid = `${copy.id}::${i.name.toLowerCase()}_${Math.random().toString(36).slice(2, 6)}`;
			idMap.set(i.id, nid);
			return {
				...i,
				id: nid,
				testId: copy.id
			};
		}));
		copy.questions = t.questions.map((q) => ({
			...q,
			images: q.images.map((id) => idMap.get(id) ?? id)
		}));
		await putTest(copy);
		refresh();
		toast.success("Duplicated");
	};
	const onDelete = async (t) => {
		if (!window.confirm(`Delete "${t.name}"? Attempts and images will be removed.`)) return;
		await deleteTest(t.id);
		refresh();
		qc.invalidateQueries({ queryKey: ["attempts"] });
		toast.success("Deleted");
	};
	const onExport = (t) => {
		const blob = new Blob([exportTestJson(t)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${t.name.replace(/[^\w-]+/g, "_")}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const onValidate = async (t) => {
		const issues = validateTest(t);
		const status = issues.some((i) => i.level === "error") ? "invalid" : issues.length ? "warning" : "valid";
		await putTest({
			...t,
			issues,
			status
		});
		refresh();
		if (status === "valid") toast.success("All questions valid");
		else toast.warning(`${issues.length} issue(s) found — see the test row`);
	};
	const onStart = async (t) => {
		if (t.status === "invalid") return toast.error("Fix validation errors before starting.");
		setPendingLaunch(() => async (selectedMode) => {
			const a = await startAttempt(t, {
				mode: selectedMode,
				strictMode: selectedMode === "strict"
			});
			qc.invalidateQueries({ queryKey: ["attempts"] });
			router.navigate({
				to: "/test/$attemptId",
				params: { attemptId: a.id }
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
	const subjects = [...new Set((tests.data ?? []).flatMap((t) => t.subjects))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Question Bank"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Every imported set lives on this device. Validate before attempting a paper."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search name, subject or chapter…",
						className: "w-full rounded-lg border bg-card py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: subject,
					onChange: (e) => setSubject(e.target.value),
					className: "rounded-lg border bg-card px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All subjects"
					}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: s
					}, s))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: sort,
					onChange: (e) => setSort(e.target.value),
					className: "rounded-lg border bg-card px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "date",
							children: "Newest first"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "name",
							children: "Name A–Z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "questions",
							children: "Most questions"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
				children: [
					"Nothing here yet.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/import",
						className: "text-primary underline",
						children: "Import a test"
					}),
					"."
				]
			}), rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border bg-card p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: t.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-semibold",
									children: t.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionValidity, { test: t }),
									t.subjects.join(" · ") || "—",
									" · ",
									t.chapters.length,
									" chapters · ",
									t.questionCount,
									" ",
									"questions · ",
									t.imageCount,
									" images · imported",
									" ",
									new Date(t.importedAt).toLocaleDateString(),
									" · ",
									t.source.toUpperCase()
								]
							}),
							t.issues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "mt-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "cursor-pointer text-warning",
									children: [t.issues.length, " validation note(s)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-1 max-h-32 list-disc overflow-auto pl-5 text-muted-foreground",
									children: t.issues.slice(0, 40).map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i.message }, idx))
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onStart(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }),
								label: "Open",
								primary: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => setAnswersFor(t.id),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3.5" }),
								label: "Questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => setFiguresFor(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-3.5" }),
								label: "Figures"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onValidate(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }),
								label: "Validate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onRename(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }),
								label: "Rename"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onDuplicate(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
								label: "Duplicate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onExport(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }),
								label: "Export"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onDelete(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
								label: "Delete",
								danger: true
							})
						]
					})]
				})
			}, t.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		}),
		figuresFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiguresManager, {
			testId: figuresFor.id,
			onClose: () => setFiguresFor(null),
			onChanged: refresh
		}),
		answersFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerEditor, {
			testId: answersFor,
			focusQuestionId: answersFor === edit ? focusQuestion : void 0,
			onClose: () => setAnswersFor(null)
		})
	] });
}
function Act({ onClick, icon, label, primary, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent", primary && "border-primary bg-primary text-primary-foreground hover:opacity-90", danger && "border-destructive/40 text-destructive"),
		children: [icon, label]
	});
}
/** Figures panel: thumbnails, linked question, manual upload / replace / mapping. */
function FiguresManager({ testId, onClose, onChanged }) {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const data = useQuery({
		queryKey: ["figures", testId],
		queryFn: async () => {
			const [test, images] = await Promise.all([getTest(testId), listImages(testId)]);
			return {
				test,
				images
			};
		}
	});
	const test = data.data?.test;
	const images = data.data?.images ?? [];
	const reload = () => {
		qc.invalidateQueries({ queryKey: ["figures", testId] });
		onChanged();
	};
	const linkOf = (imgId) => test?.questions.find((q) => q.images.includes(imgId));
	const uploadFiles = async (files) => {
		if (!test) return;
		const stored = [];
		const updated = {
			...test,
			questions: test.questions.map((q) => ({ ...q }))
		};
		let matched = 0;
		for (const f of Array.from(files)) {
			const id = `${testId}::${f.name.toLowerCase()}_${Math.random().toString(36).slice(2, 6)}`;
			stored.push({
				id,
				testId,
				name: f.name,
				blob: f
			});
			const n = questionNumberFromFilename(f.name);
			const q = n !== null ? updated.questions.find((x) => x.number === n) : void 0;
			if (q) {
				q.images = [...q.images, id];
				q.flags = {
					...q.flags,
					diagram: true
				};
				matched += 1;
			}
		}
		await putImages(stored);
		updated.imageCount = images.length + stored.length;
		updated.updatedAt = Date.now();
		await putTest(updated);
		reload();
		toast.success(`${stored.length} image(s) added · ${matched} auto-linked by filename`);
	};
	const mapTo = async (imgId, questionNumber) => {
		if (!test) return;
		const n = Number(questionNumber);
		await putTest({
			...test,
			questions: test.questions.map((q) => {
				const without = q.images.filter((i) => i !== imgId);
				return q.number === n ? {
					...q,
					images: [...without, imgId],
					flags: {
						...q.flags,
						diagram: true
					}
				} : {
					...q,
					images: without
				};
			}),
			updatedAt: Date.now()
		});
		reload();
	};
	const removeImage = async (imgId) => {
		if (!test) return;
		await deleteImage(imgId);
		await putTest({
			...test,
			questions: test.questions.map((q) => ({
				...q,
				images: q.images.filter((i) => i !== imgId)
			})),
			imageCount: Math.max(0, test.imageCount - 1),
			updatedAt: Date.now()
		});
		reload();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[90vh] w-full max-w-5xl flex-col rounded-t-2xl border bg-card sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "truncate font-semibold",
							children: ["Figures — ", test?.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [images.length, " images · click a thumbnail to preview, map it to a question number, or upload more."]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => fileRef.current?.click(),
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
							children: "Upload images"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "rounded-md border px-3 py-1.5 text-xs",
							children: "Close"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/png,image/jpeg,image/webp",
					multiple: true,
					hidden: true,
					onChange: (e) => e.target.files && uploadFiles(e.target.files)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-slim grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-3 lg:grid-cols-4",
					children: [images.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "col-span-full py-10 text-center text-sm text-muted-foreground",
						children: "No figures in this test yet."
					}), images.map((img) => {
						const q = linkOf(img.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border bg-surface p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setViewer([img.id]),
									className: "grid h-28 w-full place-items-center overflow-hidden rounded bg-card",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
										id: img.id,
										alt: img.name,
										className: "max-h-28"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 truncate text-[11px] text-muted-foreground",
									title: img.name,
									children: img.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex items-center gap-1 text-[11px]",
									children: q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-success",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
											" Q",
											q.number,
											" · ",
											q.subject
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-warning",
										children: "unmapped"
									})
								}),
								q?.chapter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: q.chapter
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: q?.number ?? "",
										onChange: (e) => mapTo(img.id, e.target.value),
										className: "min-w-0 flex-1 rounded border bg-card px-1 py-1 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Map to…"
										}), test?.questions.map((qq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: qq.number,
											children: ["Q", qq.number]
										}, qq.id))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeImage(img.id),
										className: "rounded border border-destructive/40 px-1.5 text-[11px] text-destructive",
										children: "del"
									})]
								})
							]
						}, img.id);
					})]
				})
			]
		}), viewer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer, {
			ids: viewer,
			onClose: () => setViewer(null)
		})]
	});
}
/** Valid / invalid question counts for a set, computed from the live questions. */
function QuestionValidity({ test }) {
	const counts = (0, import_react.useMemo)(() => validationCounts(test.questions), [test.questions]);
	if (counts.invalid === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded bg-success/15 px-1.5 py-0.5 font-semibold text-success",
		children: [counts.valid, " valid"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded bg-destructive/15 px-1.5 py-0.5 font-semibold text-destructive",
		children: [
			counts.invalid,
			" invalid · ",
			counts.valid,
			" valid"
		]
	});
}
//#endregion
//#region src/routes/create.tsx
var Route$30 = createFileRoute("/create")({
	validateSearch: (search) => ({ creationContext: search.creationContext === "live" ? "live" : "normal" }),
	head: () => ({ meta: [
		{ title: "Custom Test Builder — JEE CBT Platform" },
		{
			name: "description",
			content: "Build custom JEE papers from any mix of chapters with auto or manual question distribution, difficulty and type filters."
		},
		{
			property: "og:title",
			content: "Custom Test Builder — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Chapter-mix papers with a smart random engine that avoids repeating questions."
		}
	] }),
	component: CreatePage
});
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
var DIFFS$1 = [
	"Easy",
	"Medium",
	"Hard"
];
function CreatePage() {
	const router = useRouter();
	const qc = useQueryClient();
	const { creationContext } = Route$30.useSearch();
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
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
				active: mode === "bank",
				onClick: () => setMode("bank"),
				children: "Chapter mix"
			}), WEAK_SOURCES.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
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
						options: DIFFS$1,
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: "Marks / correct",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: marks,
								onChange: (e) => setMarks(Number(e.target.value)),
								className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
							label: "Hours",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								value: hours,
								onChange: (e) => setHours(Math.max(0, Number(e.target.value))),
								className: "w-full rounded-lg border bg-surface px-3 py-2 text-sm"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field$1, {
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
function Chip$1({ active, onClick, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		title,
		className: cn("rounded-lg border px-3 py-1.5 text-xs font-semibold", active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"),
		children
	});
}
function Field$1({ label, children }) {
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
//#region src/routes/figures.tsx
var Route$29 = createFileRoute("/figures")({
	head: () => ({ meta: [
		{ title: "Figure Library — JEE CBT Platform" },
		{
			name: "description",
			content: "Browse every imported diagram, graph and figure, see which question it belongs to, and manually link unmatched images."
		},
		{
			property: "og:title",
			content: "Figure Library — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every imported figure with its question, subject, chapter and filename."
		}
	] }),
	component: FiguresPage
});
function FiguresPage() {
	const qc = useQueryClient();
	const images = useQuery({
		queryKey: ["images"],
		queryFn: listAllImages
	});
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [mapping, setMapping] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const testMap = (0, import_react.useMemo)(() => new Map((tests.data ?? []).map((t) => [t.id, t])), [tests.data]);
	const rows = (0, import_react.useMemo)(() => {
		const list = (images.data ?? []).map((img) => {
			const test = testMap.get(img.testId);
			return {
				img,
				test,
				q: test?.questions.find((x) => x.images.includes(img.id)) ?? (img.qNumber !== void 0 ? test?.questions.find((x) => x.number === img.qNumber) : void 0),
				linked: Boolean(test?.questions.some((x) => x.images.includes(img.id)))
			};
		});
		const s = search.trim().toLowerCase();
		return list.filter((r) => {
			if (filter === "linked" && !r.linked) return false;
			if (filter === "unlinked" && r.linked) return false;
			if (!s) return true;
			return [
				r.img.name,
				r.img.path,
				r.test?.name,
				r.q?.subject,
				r.q?.chapter,
				String(r.q?.number)
			].filter(Boolean).some((v) => String(v).toLowerCase().includes(s));
		});
	}, [
		images.data,
		testMap,
		search,
		filter
	]);
	const linkImage = async (img, test, questionNumber) => {
		const q = test.questions.find((x) => x.number === questionNumber);
		if (!q) return;
		for (const other of test.questions) other.images = other.images.filter((id) => id !== img.id);
		q.images = [...q.images, img.id];
		q.flags.diagram = true;
		await putTest({
			...test,
			updatedAt: Date.now()
		});
		await putImage({
			...img,
			qNumber: questionNumber
		});
		await qc.invalidateQueries({ queryKey: ["tests"] });
		await qc.invalidateQueries({ queryKey: ["images"] });
		setMapping(null);
		toast.success(`Linked ${img.name} to Q${questionNumber}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-5" }), " Figure Library"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [images.data?.length ?? 0, " images stored on this device. Unlinked images can be mapped to a question manually."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[220px] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search filename, chapter, question…",
					className: "w-full rounded-lg border bg-surface py-2 pl-9 pr-3 text-sm"
				})]
			}), [
				"all",
				"linked",
				"unlinked"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(f),
				className: cn("rounded-lg border px-3 py-2 text-xs font-semibold capitalize", filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: f
			}, f))]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: [
				"No figures yet — import a ZIP containing an ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "images/" }),
				" folder."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: rows.map(({ img, test, q, linked }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPreview({
						img,
						q
					}),
					className: "grid h-36 w-full place-items-center bg-surface p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id: img.id,
						alt: img.name,
						className: "max-h-32"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 border-t p-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-semibold",
							title: img.path ?? img.name,
							children: img.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-muted-foreground",
							children: test?.name ?? "Unknown set"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: linked && q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-answered/15 px-1.5 py-0.5 font-semibold text-answered",
									children: ["Q", q.number]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-surface px-1.5 py-0.5",
									children: q.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate rounded bg-surface px-1.5 py-0.5",
									children: q.chapter
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setMapping(img),
								className: "inline-flex items-center gap-1 rounded bg-warning/15 px-1.5 py-0.5 font-semibold text-warning",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3" }), " Link to question"]
							})
						})
					]
				})]
			}, img.id))
		}),
		preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
			onClose: () => setPreview(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid max-h-[85vh] gap-4 overflow-auto p-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
					id: preview.img.id,
					alt: preview.img.name,
					className: "w-full rounded-lg bg-surface"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: preview.img.path ?? preview.img.name
					}), preview.q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 font-bold",
							children: ["Question ", preview.q.number]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								preview.q.subject,
								" · ",
								preview.q.chapter
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
							className: "mt-3 text-sm",
							children: preview.q.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/bank",
							search: {
								edit: void 0,
								q: void 0
							},
							className: "mt-4 inline-block rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground",
							children: "Open in Question Bank"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "This figure is not linked to a question."
					})]
				})]
			})
		}),
		mapping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
			onClose: () => setMapping(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapDialog, {
				img: mapping,
				test: testMap.get(mapping.testId),
				onLink: (n) => {
					const t = testMap.get(mapping.testId);
					if (t) linkImage(mapping, t, n);
				}
			})
		})
	] });
}
function MapDialog({ img, test, onLink }) {
	const [q, setQ] = (0, import_react.useState)("");
	const list = (test?.questions ?? []).filter((x) => !q.trim() || String(x.number).includes(q.trim()) || x.text.toLowerCase().includes(q.trim().toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-h-[85vh] flex-col p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-sm font-bold",
				children: [
					"Link “",
					img.name,
					"” to a question"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search by number or text",
				className: "mt-3 rounded-lg border bg-surface px-3 py-2 text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-slim mt-3 space-y-1 overflow-auto",
				children: [list.slice(0, 200).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onLink(x.number),
					className: "block w-full truncate rounded-lg border bg-surface px-3 py-2 text-left text-xs hover:border-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: ["Q", x.number]
						}),
						" · ",
						x.subject,
						" — ",
						x.text.slice(0, 90)
					]
				}, x.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "No questions in this set."
				})]
			})
		]
	});
}
function Overlay({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/70",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				"aria-label": "Close",
				className: "absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-md border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}), children]
		})]
	});
}
//#endregion
//#region src/lib/ai/gemini.ts
var GEMINI_RATE_LIMIT_MESSAGE = "AI Mentor is temporarily unavailable because the AI limit has been reached. Please try again later.";
var DAILY_USAGE_KEY = "jee-gemini-usage-v1";
var DEFAULT_GEMINI_RETRY_SECONDS = 35;
var BASIC_QUESTION_ANSWERS = {
	"what is inertia": "Inertia is the tendency of an object to resist a change in its state of motion. A body at rest stays at rest and a body in motion stays in motion unless acted upon by a net external force.",
	"what is inertia?": "Inertia is the tendency of an object to resist a change in its state of motion. A body at rest stays at rest and a body in motion stays in motion unless acted upon by a net external force.",
	"what is gravity": "Gravity is the attractive force between masses. On Earth, it gives objects weight and causes unsupported objects to fall toward the ground.",
	"what is gravity?": "Gravity is the attractive force between masses. On Earth, it gives objects weight and causes unsupported objects to fall toward the ground.",
	"what is momentum": "Momentum is the product of mass and velocity. It tells us how much motion an object has and is a vector quantity.",
	"what is momentum?": "Momentum is the product of mass and velocity. It tells us how much motion an object has and is a vector quantity.",
	"what is force": "Force is any push or pull that can change the state of motion of an object. It is measured in newtons.",
	"what is force?": "Force is any push or pull that can change the state of motion of an object. It is measured in newtons.",
	"what is velocity": "Velocity is the rate of change of displacement with time. It includes both speed and direction.",
	"what is velocity?": "Velocity is the rate of change of displacement with time. It includes both speed and direction.",
	"what is acceleration": "Acceleration is the rate of change of velocity with time. It tells us how quickly speed or direction changes.",
	"what is acceleration?": "Acceleration is the rate of change of velocity with time. It tells us how quickly speed or direction changes.",
	"what is photosynthesis": "Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to make glucose and oxygen.",
	"what is photosynthesis?": "Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to make glucose and oxygen.",
	"what is respiration": "Respiration is the process by which living organisms release energy from food, usually by converting glucose and oxygen into carbon dioxide, water, and energy.",
	"what is respiration?": "Respiration is the process by which living organisms release energy from food, usually by converting glucose and oxygen into carbon dioxide, water, and energy.",
	"what is ph": "pH is a measure of how acidic or basic a solution is. A pH of 7 is neutral, below 7 is acidic, and above 7 is basic.",
	"what is ph?": "pH is a measure of how acidic or basic a solution is. A pH of 7 is neutral, below 7 is acidic, and above 7 is basic.",
	"what is acid": "An acid is a substance that releases hydrogen ions in water and tends to have a sour taste, though tasting chemicals is not safe in practice.",
	"what is acid?": "An acid is a substance that releases hydrogen ions in water and tends to have a sour taste, though tasting chemicals is not safe in practice.",
	"what is a derivative": "A derivative measures how a function changes as its input changes. It is the instantaneous rate of change of a function.",
	"what is a derivative?": "A derivative measures how a function changes as its input changes. It is the instantaneous rate of change of a function.",
	"what is an integral": "An integral is a way to accumulate quantities or find the total area under a curve. It is the reverse process of differentiation in many cases.",
	"what is an integral?": "An integral is a way to accumulate quantities or find the total area under a curve. It is the reverse process of differentiation in many cases.",
	"what is a wave": "A wave is a disturbance that transfers energy from one place to another without permanently moving the medium as a whole.",
	"what is a wave?": "A wave is a disturbance that transfers energy from one place to another without permanently moving the medium as a whole."
};
function normalizeMentorQuestion(question) {
	return question.replace(/\s+/g, " ").trim().toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, "\"").replace(/[^a-z0-9\s'\?]/g, "").trim();
}
function shouldShortCircuitMentorQuestion(question) {
	const normalized = normalizeMentorQuestion(question);
	return BASIC_QUESTION_ANSWERS[normalized] ?? BASIC_QUESTION_ANSWERS[normalized.replace(/\?$/, "")] ?? null;
}
function getTodayDateKey(date = /* @__PURE__ */ new Date()) {
	return date.toISOString().slice(0, 10);
}
function getGeminiRequestUsageSummary({ count, date }) {
	return `AI usage: ${count}/20 today`;
}
function readUsageFromStorage() {
	if (typeof window === "undefined") return {
		date: getTodayDateKey(),
		count: 0
	};
	try {
		const raw = window.localStorage.getItem(DAILY_USAGE_KEY);
		if (!raw) return {
			date: getTodayDateKey(),
			count: 0
		};
		const parsed = JSON.parse(raw);
		return {
			date: typeof parsed.date === "string" ? parsed.date : getTodayDateKey(),
			count: Number.isFinite(parsed.count) ? Number(parsed.count) : 0
		};
	} catch {
		return {
			date: getTodayDateKey(),
			count: 0
		};
	}
}
function getGeminiRequestUsage() {
	const today = getTodayDateKey();
	const usage = readUsageFromStorage();
	if (usage.date !== today) return {
		date: today,
		count: 0
	};
	return usage;
}
function incrementGeminiRequestUsage() {
	const today = getTodayDateKey();
	const usage = readUsageFromStorage();
	const next = {
		date: today,
		count: (usage.date === today ? usage.count : 0) + 1
	};
	if (typeof window !== "undefined") try {
		window.localStorage.setItem(DAILY_USAGE_KEY, JSON.stringify(next));
	} catch {
		return next;
	}
	return next;
}
var getErrorText = (error) => {
	if (!error || typeof error !== "object") return "";
	const value = error;
	const bodyText = typeof value.body === "string" ? value.body : JSON.stringify(value.body ?? {});
	const rawResponseText = typeof value.rawResponse === "string" ? value.rawResponse : JSON.stringify(value.rawResponse ?? {});
	const errorText = typeof value.error === "string" ? value.error : JSON.stringify(value.error ?? {});
	return [
		value.message,
		bodyText,
		rawResponseText,
		errorText
	].filter(Boolean).join(" ");
};
function isGeminiRateLimitError(error) {
	const errorText = getErrorText(error);
	return (error?.statusCode ?? error?.status) === 429 || /RESOURCE_EXHAUSTED|rate limit|quota|429/i.test(errorText);
}
function extractGeminiRetryDelay(error) {
	const errorText = getErrorText(error);
	const retryDelayMatch = errorText.match(/(?:retryDelay|retry_delay|retry delay)[^\d]*(\d+(?:\.\d+)?)\s*(ms|s|m)?/i);
	if (retryDelayMatch) {
		const value = Number(retryDelayMatch[1]);
		const unit = (retryDelayMatch[2] || "s").toLowerCase();
		if (unit === "ms") return value / 1e3;
		if (unit === "m") return value * 60;
		return value;
	}
	const quotedMatch = errorText.match(/"retryDelay"\s*:\s*"?(\d+(?:\.\d+)?)\s*(ms|s|m)?"?/i);
	if (quotedMatch) {
		const value = Number(quotedMatch[1]);
		const unit = (quotedMatch[2] || "s").toLowerCase();
		if (unit === "ms") return value / 1e3;
		if (unit === "m") return value * 60;
		return value;
	}
	return null;
}
var buildMentorSystemPrompt = (data) => {
	return [
		"You are Raushan's personal JEE mentor.",
		"You are not a generic chatbot. You know Raushan's preparation, doubts, mistakes, and progress only from the supplied context.",
		"Use the name Raushan naturally when accountability, warnings, or important performance feedback is needed.",
		"Use only the real data in the Student context. Do not invent scores, attempts, accuracy, time, backlog, weak chapters, progress, achievements, or test results.",
		"Do not claim to access hidden database information or any personal data beyond the supplied context.",
		"Be direct, honest, practical, and supportive. Be strict but supportive when the data shows poor performance.",
		"Do not sugar-coat poor performance, give fake praise, or force a motivational speech when the evidence does not support it.",
		"Answer the actual question first, then give the most useful next step based on the evidence.",
		"If the data is insufficient, say so clearly instead of guessing.",
		"For performance issues, identify the actual pattern, explain why it matters, and tell Raushan what to do next.",
		"If the student asks for question recommendations, prefer the supplied questionContext and explain briefly why it matches the current weakness.",
		"For any question recommendation, never expose internal IDs, database IDs, test IDs, UUIDs, or other technical identifiers to the user.",
		"Use only user-facing metadata already available in the context: question number, chapter, topic, subject, difficulty, Question Bank name, and evidence from recent performance.",
		"Difficulty labels must be exactly: Easy, Medium, Hard.",
		"When giving a recommended question, use a clean label like 'Q7 · Kinematics · Relative Motion · Medium' and include 'Question Bank: <bank name>' for the source. If the bank name is unavailable, use 'Question Bank: Insufficient Evidence'.",
		"The reason for recommending a question must come only from actual evidence in the supplied context (e.g. recent wrong attempts, low accuracy, repeated mistakes, or topic weakness). If there is no evidence, say 'Insufficient Evidence' exactly.",
		"Never invent Hindi/Hinglish filler, random phrases, or malformed reason text.",
		"Do not invent question IDs, chapters, topics, or question-bank contents.",
		"When helping with doubts, explain the concept step by step and focus on the reasoning process instead of just giving the final answer.",
		"Use recent conversation only to understand follow-up references. Do not claim memory beyond the supplied context.",
		"Respond in natural language, not JSON unless the user explicitly asks for structured output.",
		"Speak in English unless the student's message is naturally Hinglish; then reply in simple, natural Hinglish.",
		`Student context:\n${JSON.stringify({
			prompt: data.prompt,
			context: data.context ?? {},
			questionRequest: data.questionRequest ?? null,
			questionContext: (data.questionContext ?? []).slice(0, 8),
			conversation: (data.conversation ?? []).slice(-6),
			relevantHistory: (data.relevantHistory ?? []).slice(0, 3)
		}, null, 2)}`
	].join("\n");
};
async function generateMentorResponse(ai, data) {
	return (await ai.models.generateContent({
		model: "gemini-3.6-flash",
		contents: buildMentorSystemPrompt(data)
	})).text ?? "I do not have a reliable answer for that request right now.";
}
var askMentor = createServerFn({ method: "POST" }).validator((data) => data).handler(async ({ data }) => {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) throw new Error("GEMINI_API_KEY is not configured on the server.");
	const ai = new GoogleGenAI({ apiKey });
	try {
		return await generateMentorResponse(ai, data);
	} catch (error) {
		if (!isGeminiRateLimitError(error)) throw new Error("AI Mentor is temporarily unavailable. Please try again shortly.");
		const retryDelaySeconds = extractGeminiRetryDelay(error) ?? DEFAULT_GEMINI_RETRY_SECONDS;
		await new Promise((resolve) => setTimeout(resolve, Math.max(0, retryDelaySeconds) * 1e3));
		try {
			return await generateMentorResponse(ai, data);
		} catch (retryError) {
			if (isGeminiRateLimitError(retryError)) throw new Error(JSON.stringify({
				kind: "rate_limit",
				retryDelaySeconds,
				message: GEMINI_RATE_LIMIT_MESSAGE
			}));
			throw new Error("AI Mentor is temporarily unavailable. Please try again shortly.");
		}
	}
});
async function testGemini() {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) return "GEMINI_API_KEY is not configured";
	return (await new GoogleGenAI({ apiKey }).models.generateContent({
		model: "gemini-3.6-flash",
		contents: "Reply with a single sentence confirming the API is reachable."
	})).text ?? "No response was returned.";
}
//#endregion
//#region src/routes/gemini-test.tsx
var Route$28 = createFileRoute("/gemini-test")({ component: GeminiTest });
function GeminiTest() {
	const [result, setResult] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleTest() {
		setLoading(true);
		setResult("");
		try {
			setResult(await testGemini() ?? "No response");
		} catch (error) {
			setResult(error instanceof Error ? error.message : "Gemini test failed");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: 40 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Gemini API Test" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleTest,
				disabled: loading,
				children: loading ? "Testing..." : "Test Gemini"
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				style: { marginTop: 20 },
				children: result
			})
		]
	});
}
//#endregion
//#region src/routes/import.tsx
var Route$27 = createFileRoute("/import")({
	head: () => ({ meta: [
		{ title: "Import Tests — JEE CBT Platform" },
		{
			name: "description",
			content: "Import JEE question sets from ZIP archives or JSON files with automatic image detection, nested folder handling and validation."
		},
		{
			property: "og:title",
			content: "Import Tests — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "ZIP and JSON importer with automatic diagram linking and import validation."
		}
	] }),
	component: ImportPage
});
function ImportPage() {
	const router = useRouter();
	const qc = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [log, setLog] = (0, import_react.useState)([]);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const [exam, setExam] = (0, import_react.useState)("main");
	const examRef = (0, import_react.useRef)(exam);
	examRef.current = exam;
	const handleFiles = (0, import_react.useCallback)(async (files) => {
		if (files.length === 0) return;
		setBusy(true);
		setLog([]);
		const issues = [];
		try {
			const pdf = files.find((f) => /\.pdf$/i.test(f.name));
			if (pdf) issues.push({
				level: "error",
				message: `PDF import is not supported by this platform — "${pdf.name}" was skipped. Convert questions to JSON (with images as PNG/JPG) and re-import.`
			});
			let jsonText = null;
			let jsonName = "Imported test";
			const images = [];
			for (const f of files) if (/\.zip$/i.test(f.name)) {
				const { jsons, images: zipImages } = await readZip(f);
				issues.push({
					level: "warning",
					message: `${f.name}: found ${jsons.length} JSON file(s) and ${zipImages.length} image(s).`
				});
				images.push(...zipImages);
				if (!jsonText && jsons.length) {
					jsonText = [...jsons].sort((a, b) => a.path.split("/").length - b.path.split("/").length || b.text.length - a.text.length)[0].text;
					jsonName = f.name.replace(/\.zip$/i, "");
				}
			} else if (/\.json$/i.test(f.name)) {
				if (!jsonText) {
					jsonText = await f.text();
					jsonName = f.name.replace(/\.json$/i, "");
				}
			} else if (/\.(png|jpe?g|webp)$/i.test(f.name)) images.push({
				path: f.name,
				blob: f
			});
			if (!jsonText) {
				issues.push({
					level: "error",
					message: "No JSON question file was found. Add a .json file (or a ZIP containing one)."
				});
				setLog(issues);
				toast.error("Import failed — no question JSON found");
				return;
			}
			const { test, issues: buildIssues } = await buildTestFromFiles({
				name: jsonName,
				jsonText,
				images,
				source: images.length ? "zip" : "json",
				exam: examRef.current
			});
			setLog([...issues, ...buildIssues]);
			qc.invalidateQueries({ queryKey: ["tests"] });
			qc.invalidateQueries({ queryKey: ["adv"] });
			toast.success(`Imported "${test.name}" — ${test.questionCount} questions, ${test.imageCount} images`);
			setTimeout(() => router.navigate({
				to: "/bank",
				search: {
					edit: void 0,
					q: void 0
				}
			}), 900);
		} catch (err) {
			console.error("[import] failed", err);
			setLog([...issues, {
				level: "error",
				message: err.message
			}]);
			toast.error("Import failed — see the report below");
		} finally {
			setBusy(false);
		}
	}, [qc, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Import Test"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted-foreground",
			children: "Drop a ZIP bundle (questions JSON + images folder), a standalone JSON file, or loose images. Nested folders and relative image paths are resolved automatically, and the import continues even when some images are missing."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold uppercase text-muted-foreground",
				children: "Import into"
			}), ["main", "advanced"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setExam(k),
				className: cn("rounded-full border px-3 py-1 text-xs font-semibold", exam === k ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: EXAM_LABEL[k]
			}, k))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onDragOver: (e) => {
				e.preventDefault();
				setDrag(true);
			},
			onDragLeave: () => setDrag(false),
			onDrop: (e) => {
				e.preventDefault();
				setDrag(false);
				handleFiles(Array.from(e.dataTransfer.files));
			},
			className: cn("mt-6 grid place-items-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors", drag ? "border-primary bg-primary/5" : "bg-card"),
			children: [
				busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-8 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm font-medium",
					children: busy ? "Processing import…" : "Drag & drop files here"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => inputRef.current?.click(),
					disabled: busy,
					className: "mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50",
					children: "Browse files"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					multiple: true,
					hidden: true,
					accept: ".zip,.json,.png,.jpg,.jpeg,.webp,.pdf",
					onChange: (e) => e.target.files && handleFiles(Array.from(e.target.files))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderArchive, { className: "size-4" }),
					title: "ZIP (preferred)",
					desc: "JSON + images/ in any nested layout"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBraces, { className: "size-4" }),
					title: "JSON",
					desc: "Array of questions or { questions: [...] }"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
					title: "Images",
					desc: "PNG · JPG · JPEG · WEBP, Q1.png auto-links to Q1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "size-4" }),
					title: "PDF",
					desc: "Not supported — reported, never silently dropped"
				})
			]
		}),
		log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-sm font-bold uppercase",
				children: "Import report"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "scroll-slim max-h-72 space-y-1 overflow-auto text-xs",
				children: log.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("rounded px-2 py-1", i.level === "error" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"),
					children: i.message
				}, idx))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "mt-6 rounded-xl border bg-card p-4 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer font-semibold",
				children: "Expected JSON format"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "scroll-slim mt-3 overflow-auto rounded-lg bg-surface p-3 text-xs",
				children: `{
  "name": "JEE Main Mock 01",
  "duration": 180,
  "questions": [
    {
      "number": 1,
      "subject": "Physics",
      "chapter": "Kinematics",
      "topic": "Projectile",
      "difficulty": "Medium",
      "type": "single",           // single | multiple | integer | numerical |
                                  // matrix | assertion | paragraph | diagram | graph | table
      "question": "Find $H$ if $u=20$ m/s and $\\\\theta=30^\\\\circ$.",
      "options": ["$5$ m", "$10$ m", "$15$ m", "$20$ m"],
      "correct": "A",             // or ["A","C"], or 5 for integer/numerical
      "images": ["images/q1.png"],
      "solution": "$H=\\\\dfrac{u^2\\\\sin^2\\\\theta}{2g}$",
      "marks": 4,
      "negative": 1
    }
  ]
}`
			})]
		})
	] });
}
function Fmt({ icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm font-semibold",
			children: [
				icon,
				" ",
				title
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: desc
		})]
	});
}
//#endregion
//#region src/routes/library.tsx
var Route$26 = createFileRoute("/library")({
	head: () => ({ meta: [
		{ title: "Chapter Library — JEE CBT Platform" },
		{
			name: "description",
			content: "Every chapter in your question bank with question counts, difficulty spread and one-click chapter practice."
		},
		{
			property: "og:title",
			content: "Chapter Library — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Browse chapters across all imported JEE sets and launch chapter-wise practice."
		}
	] }),
	component: LibraryPage
});
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
//#region src/routes/live-tests.tsx
var Route$25 = createFileRoute("/live-tests")({
	validateSearch: (search) => ({ draft: typeof search.draft === "string" ? search.draft : void 0 }),
	head: () => ({ meta: [{ title: "Live Tests — JEE CBT Platform" }, {
		name: "description",
		content: "Upcoming, live, completed and missed scheduled JEE tests."
	}] }),
	component: LiveTestsPage
});
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
	const { draft: draftId } = Route$25.useSearch();
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
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/card.tsx
var Card$1 = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card$1.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/lib/mentor.ts
function buildMentorContext(analysis, memory, prompt) {
	const total = analysis.subjectPerformance.reduce((sum, item) => sum + item.total, 0);
	const correct = analysis.subjectPerformance.reduce((sum, item) => sum + item.correct, 0);
	const wrong = analysis.subjectPerformance.reduce((sum, item) => sum + item.wrong, 0);
	const skipped = analysis.subjectPerformance.reduce((sum, item) => sum + item.skipped, 0);
	const answered = Math.max(1, correct + wrong);
	return {
		prompt,
		overall: {
			accuracy: Number((correct / answered * 100).toFixed(1)),
			totalQuestions: total,
			correct,
			wrong,
			skipped,
			attempts: analysis.recentPerformance.length
		},
		subjects: analysis.subjectPerformance.map((item) => ({
			subject: item.subject,
			accuracy: Number(item.accuracy.toFixed(1)),
			total: item.total,
			correct: item.correct,
			wrong: item.wrong,
			skipped: item.skipped,
			avgTime: Number(item.avgTime.toFixed(1))
		})),
		weakTopics: analysis.priorityTopics.slice(0, 5).map((item) => ({
			subject: item.subject,
			chapter: item.chapter,
			topic: item.topic,
			accuracy: Number(item.accuracy.toFixed(1)),
			wrong: item.wrong,
			skipped: item.skipped,
			avgTime: Number(item.avgTime.toFixed(1)),
			priority: item.priority
		})),
		strongTopics: memory.strongTopics.slice(0, 3),
		repeatedMistakes: analysis.repeatedMistakes.slice(0, 5).map((item) => ({
			subject: item.subject,
			topic: item.topic,
			count: item.count
		})),
		recentPerformance: analysis.recentPerformance.slice(0, 5),
		recentProgress: memory.recentProgress,
		previousRecommendations: memory.previousRecommendations.slice(0, 4),
		recentGoals: memory.recentGoals.slice(0, 3)
	};
}
function buildMentorAnalysis(reports) {
	if (!reports.length) return {
		summary: "I do not have enough practice data yet to judge your current preparation reliably. Keep taking timed tests and then I’ll compare your trends.",
		strengths: ["No completed attempts yet. Start with a mock or chapter test to unlock mentor analysis."],
		weaknesses: ["Lack of data means I can’t judge weak topics reliably yet."],
		priorityTopics: [],
		recommendations: ["Attempt one timed test to create a baseline.", "Revise your most recent weak chapters before the next mock."],
		nextActions: [{
			title: "Baseline test",
			detail: "Take a timed mock and let the mentor compare your accuracy and time per question."
		}],
		recentPerformance: [],
		subjectPerformance: [],
		repeatedMistakes: [],
		hasEnoughData: false
	};
	const flat = reports.flatMap((r) => r.summary.perQuestion);
	const answered = flat.filter((p) => p.status !== "skipped");
	const correctCount = flat.filter((p) => p.status === "correct").length;
	const wrongCount = flat.filter((p) => p.status === "wrong").length;
	flat.filter((p) => p.status === "skipped").length;
	const totalAccuracy = answered.length ? correctCount / answered.length * 100 : 0;
	const subjectMap = /* @__PURE__ */ new Map();
	for (const item of flat) {
		const bucket = subjectMap.get(item.question.subject) ?? {
			subject: item.question.subject,
			correct: 0,
			wrong: 0,
			skipped: 0,
			total: 0,
			time: 0
		};
		bucket.total += 1;
		bucket.time += item.answer?.timeSpent ?? 0;
		if (item.status === "correct") bucket.correct += 1;
		else if (item.status === "wrong") bucket.wrong += 1;
		else bucket.skipped += 1;
		subjectMap.set(item.question.subject, bucket);
	}
	const subjectPerformance = [...subjectMap.values()].map((bucket) => ({
		subject: bucket.subject,
		correct: bucket.correct,
		wrong: bucket.wrong,
		skipped: bucket.skipped,
		total: bucket.total,
		accuracy: bucket.total ? bucket.correct / bucket.total * 100 : 0,
		avgTime: bucket.total ? bucket.time / bucket.total : 0
	})).sort((a, b) => a.accuracy - b.accuracy);
	const topicMap = /* @__PURE__ */ new Map();
	for (const item of flat) {
		const q = item.question;
		const key = `${q.subject}::${q.chapter}::${q.topic || q.chapter}`;
		const bucket = topicMap.get(key) ?? {
			key,
			subject: q.subject,
			chapter: q.chapter,
			topic: q.topic || q.chapter,
			total: 0,
			correct: 0,
			wrong: 0,
			skipped: 0,
			time: 0,
			repeated: 0,
			repeatedQuestionIds: /* @__PURE__ */ new Set()
		};
		bucket.total += 1;
		bucket.time += item.answer?.timeSpent ?? 0;
		if (item.status === "correct") bucket.correct += 1;
		else if (item.status === "wrong") bucket.wrong += 1;
		else bucket.skipped += 1;
		if (item.status === "wrong") bucket.repeatedQuestionIds.add(q.id);
		topicMap.set(key, bucket);
	}
	const repeatedQuestionCounts = /* @__PURE__ */ new Map();
	const repeatedQuestionIdsByTopic = /* @__PURE__ */ new Map();
	for (const item of flat) {
		if (item.status !== "wrong") continue;
		const q = item.question;
		repeatedQuestionCounts.set(q.id, (repeatedQuestionCounts.get(q.id) ?? 0) + 1);
		const topicKey = `${q.subject}::${q.chapter}::${q.topic || q.chapter}`;
		const set = repeatedQuestionIdsByTopic.get(topicKey) ?? /* @__PURE__ */ new Set();
		set.add(q.id);
		repeatedQuestionIdsByTopic.set(topicKey, set);
	}
	const repeatedMistakes = [...repeatedQuestionCounts.entries()].filter(([, count]) => count > 1).map(([id, count]) => {
		return {
			id,
			q: flat.find((p) => p.question.id === id)?.question,
			count
		};
	}).filter((entry) => Boolean(entry.q)).sort((a, b) => b.count - a.count).slice(0, 6).map(({ q, count }) => ({
		subject: q.subject,
		chapter: q.chapter,
		topic: q.topic || q.chapter,
		count,
		questionIds: [q.id],
		message: `${q.subject} ${q.chapter} — ${q.topic || q.chapter} is repeating across ${count} wrong attempts.`
	}));
	for (const [topicKey, ids] of repeatedQuestionIdsByTopic.entries()) {
		if (ids.size === 0) continue;
		const [subject, chapter, topic] = topicKey.split("::");
		const existing = repeatedMistakes.find((item) => item.subject === subject && item.chapter === chapter && item.topic === topic);
		if (existing) {
			existing.questionIds = [...new Set([...existing.questionIds, ...ids])];
			existing.message = `${subject} ${chapter} — ${topic} is repeating and is harming consistency.`;
		} else repeatedMistakes.push({
			subject,
			chapter,
			topic,
			count: ids.size,
			questionIds: [...ids],
			message: `${subject} ${chapter} — ${topic} has repeated mistakes.`
		});
	}
	const priorityTopics = [...topicMap.values()].filter((bucket) => bucket.total >= 2).map((bucket) => {
		const accuracy = bucket.total ? bucket.correct / bucket.total * 100 : 0;
		const avgTime = bucket.total ? bucket.time / bucket.total : 0;
		const repeated = bucket.repeatedQuestionIds.size || bucket.repeated;
		100 - accuracy + Math.min(25, repeated * 8) + Math.max(0, (bucket.wrong - bucket.correct) * 6);
		let priority = "Low";
		if (accuracy < 40 || repeated >= 3 || bucket.wrong >= 5) priority = "Critical";
		else if (accuracy < 55 || repeated >= 2 || bucket.wrong >= 3) priority = "High";
		else if (accuracy < 70 || bucket.wrong >= 1) priority = "Medium";
		const reason = accuracy < 40 ? `Accuracy is ${accuracy.toFixed(1)}% with repeated wrong attempts and slow solving.` : accuracy < 60 ? `Accuracy is ${accuracy.toFixed(1)}% and the same concepts keep resurfacing as errors.` : `Accuracy is ${accuracy.toFixed(1)}%, but the topic still needs more timed repetition.`;
		return {
			key: bucket.key,
			subject: bucket.subject,
			chapter: bucket.chapter,
			topic: bucket.topic,
			total: bucket.total,
			correct: bucket.correct,
			wrong: bucket.wrong,
			skipped: bucket.skipped,
			accuracy,
			avgTime,
			repeatedMistakes: repeated,
			priority,
			reason
		};
	}).sort((a, b) => {
		if (b.priority === a.priority) return b.accuracy - a.accuracy;
		const rank = {
			Critical: 4,
			High: 3,
			Medium: 2,
			Low: 1
		};
		return rank[b.priority] - rank[a.priority];
	}).filter((topic) => topic.total >= 2).slice(0, 5);
	const recentPerformance = [...reports].slice(-5).reverse().map((r) => ({
		label: r.attempt.testName || `Attempt ${r.attempt.id.slice(0, 4)}`,
		accuracy: r.summary.accuracy,
		score: r.summary.score,
		date: new Date(r.attempt.submittedAt ?? r.attempt.updatedAt).toLocaleDateString()
	}));
	const strengths = subjectPerformance.filter((bucket) => bucket.accuracy >= 70 && bucket.total >= 2).sort((a, b) => b.accuracy - a.accuracy).slice(0, 3).map((bucket) => `${bucket.subject} is holding up at ${bucket.accuracy.toFixed(1)}% accuracy with ${bucket.correct} correct answers.`);
	const weaknesses = priorityTopics.slice(0, 3).map((topic) => `${topic.subject} — ${topic.topic} (${topic.accuracy.toFixed(1)}% accuracy, ${topic.wrong} wrong) needs urgent revision.`);
	const recommendations = [
		...priorityTopics.slice(0, 3).map((topic) => `Revise ${topic.topic} in ${topic.subject} for ${Math.max(20, topic.total * 5)} minutes and solve ${Math.min(20, Math.max(8, topic.total))} targeted questions.`),
		...wrongCount > 0 ? [`Review your last ${Math.min(5, wrongCount)} wrong questions to stop repeating the same idea errors.`] : ["You are not seeing repeated mistakes yet; continue building a clean error log."],
		...correctCount > 0 && totalAccuracy < 60 ? ["Your questions are not being chosen well enough; focus on easier, high-confidence chapters before moving to difficult sets."] : []
	].slice(0, 5);
	const nextActions = priorityTopics.slice(0, 3).map((topic) => ({
		title: `Revise ${topic.topic}`,
		detail: `Target ${topic.subject} → ${topic.chapter}. Solve ${Math.min(20, Math.max(10, topic.total))} questions, review the error log, and re-attempt a timed set of ${Math.min(10, topic.total)} questions.`
	}));
	return {
		summary: [
			`Across ${reports.length} submitted attempt${reports.length === 1 ? "" : "s"}, your overall accuracy is ${totalAccuracy.toFixed(1)}%.`,
			priorityTopics.length ? `Your weakest current focus is ${priorityTopics[0].subject} — ${priorityTopics[0].topic} (${priorityTopics[0].accuracy.toFixed(1)}% accuracy, ${priorityTopics[0].wrong} wrong).` : "I do not have enough weak-topic signal yet to call out a single priority area.",
			`Strongest subject trend is ${subjectPerformance.filter((bucket) => bucket.total >= 2).sort((a, b) => b.accuracy - a.accuracy)[0]?.subject ?? "your recent work"}.`
		].join(" "),
		strengths: strengths.length ? strengths : ["Your recent accuracy is still being established; keep taking tests to reveal stronger chapters."],
		weaknesses: weaknesses.length ? weaknesses : ["No clear weak topic has emerged yet because the sample size is still small."],
		priorityTopics,
		recommendations,
		nextActions: nextActions.length ? nextActions : [{
			title: "Expand the sample",
			detail: "Take another test and I’ll identify the exact topic pattern more reliably."
		}],
		recentPerformance,
		subjectPerformance,
		repeatedMistakes,
		hasEnoughData: reports.length >= 2
	};
}
function resolveMentorAction(prompt, analysis) {
	const text = prompt.toLowerCase();
	if (!(text.includes("question") || text.includes("practice") || text.includes("give me") || text.includes("find"))) return null;
	const bestTopic = analysis.priorityTopics[0];
	bestTopic?.subject;
	const topic = bestTopic?.topic ?? "Motion";
	const count = text.includes("20") ? 20 : text.includes("15") ? 15 : text.includes("10") ? 10 : text.includes("30") ? 30 : 12;
	const request = {
		subject: /physics|chem|math/.test(text) ? text.includes("physics") ? "Physics" : text.includes("chem") ? "Chemistry" : "Mathematics" : void 0,
		chapter: void 0,
		topic: bestTopic ? topic : void 0,
		count,
		previouslyWrong: text.includes("wrong") || text.includes("mistake") || text.includes("repeated"),
		unattempted: text.includes("unattempted") || text.includes("new"),
		pyq: text.includes("pyq") || text.includes("previous year")
	};
	if (request.subject && request.topic && request.topic === "Motion" && bestTopic) request.topic = bestTopic.topic;
	if (!request.subject && bestTopic) request.subject = bestTopic.subject;
	if (!request.topic && bestTopic) request.topic = bestTopic.topic;
	return request;
}
function findRecommendedQuestions(tests, request, analysis) {
	const items = bankItems(tests).map((it) => it.q);
	const repeatedIds = new Set(analysis?.repeatedMistakes.flatMap((item) => item.questionIds) ?? []);
	const matchesBase = (q) => {
		if (request.subject && q.subject !== request.subject) return false;
		if (request.chapter && q.chapter !== request.chapter) return false;
		if (request.difficulty && q.difficulty !== request.difficulty) return false;
		if (request.pyq && !q.pyq) return false;
		return true;
	};
	const exact = items.filter((q) => matchesBase(q) && (!request.topic || q.topic === request.topic));
	const related = request.topic ? items.filter((q) => matchesBase(q) && q.chapter === (request.chapter ?? analysis?.priorityTopics[0]?.chapter) && q.topic !== request.topic) : [];
	const repeated = items.filter((q) => matchesBase(q) && repeatedIds.has(q.id));
	const fallback = items.filter((q) => matchesBase(q));
	const ordered = [
		...exact,
		...related,
		...repeated,
		...fallback
	];
	let filtered = [];
	const seen = /* @__PURE__ */ new Set();
	for (const question of ordered) {
		if (seen.has(question.id)) continue;
		if (request.previouslyWrong && analysis && !repeatedIds.has(question.id)) continue;
		seen.add(question.id);
		filtered.push(question);
	}
	if (request.previouslyWrong && analysis && filtered.length === 0) filtered.push(...items.filter((q) => repeatedIds.has(q.id) && matchesBase(q)));
	if (request.count && filtered.length > request.count) filtered = filtered.slice(0, request.count);
	return filtered.slice(0, 30);
}
//#endregion
//#region src/lib/mentor-memory.ts
var MEMORY_KEY = "jee-mentor-memory-v1";
var CHAT_KEY = "jee-mentor-chat-v1";
var CONVERSATIONS_KEY = "jee-mentor-conversations-v1";
var RESPONSE_CACHE_KEY = "jee-mentor-response-cache-v1";
var MAX_CONVERSATIONS = 30;
var MAX_CACHED_RESPONSES = 8;
var RESPONSE_CACHE_TTL = 1440 * 60 * 1e3;
var JEE_2028_TARGET_DATE = "2028-01-24";
var emptyMemory = {
	exam: "JEE 2028",
	targetDate: JEE_2028_TARGET_DATE,
	currentPreparationStage: "building a reliable preparation baseline",
	studyPreferences: [],
	importantPreviousDecisions: [],
	weakTopics: [],
	strongTopics: [],
	recentGoals: [],
	previousRecommendations: [],
	recentProgress: "No earlier Mentor performance snapshot is stored.",
	repeatedMistakes: [],
	performanceFingerprint: "",
	updatedAt: 0
};
function read(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const value = window.localStorage.getItem(key);
		return value ? JSON.parse(value) : fallback;
	} catch {
		return fallback;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
	} catch {
		return;
	}
}
function makeConversationId() {
	return `mentor_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function formatConversationTitle(messages) {
	const first = messages.find((message) => message.role === "user")?.text.trim() ?? "";
	const lower = first.toLowerCase();
	if (lower.includes("kinematic") || lower.includes("physics")) return "Physics Weak Topics";
	if (lower.includes("mock") || lower.includes("test") || lower.includes("accuracy")) return "Mock Test Analysis";
	if (lower.includes("backlog")) return "Backlog Plan";
	if (lower.includes("today") || lower.includes("study")) return "Today's Study Plan";
	if (lower.includes("chem")) return "Chemistry Weak Topics";
	if (lower.includes("strategy") || lower.includes("jee")) return "JEE 2028 Strategy";
	return first ? first.replace(/\s+/g, " ").slice(0, 42) : "Mentor Session";
}
function normalizeConversation(conversation) {
	const messages = conversation.messages.filter((message) => (message.role === "user" || message.role === "mentor") && typeof message.text === "string").slice(-20);
	return {
		...conversation,
		title: conversation.title || formatConversationTitle(messages),
		messages,
		tags: [...new Set(conversation.tags ?? [])].slice(0, 8),
		summary: conversation.summary || messages.filter((message) => message.role === "user").slice(-2).map((message) => message.text).join(" | ").slice(0, 240)
	};
}
function loadMentorMemory() {
	return {
		...emptyMemory,
		...read(MEMORY_KEY, {})
	};
}
function saveMentorMemory(memory) {
	write(MEMORY_KEY, memory);
}
function loadMentorConversations() {
	const stored = read(CONVERSATIONS_KEY, []);
	if (stored.length) return stored.map(normalizeConversation).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_CONVERSATIONS);
	const legacy = read(CHAT_KEY, []).filter((message) => (message.role === "user" || message.role === "mentor") && typeof message.text === "string");
	if (!legacy.length) return [];
	const now = Date.now();
	const migrated = normalizeConversation({
		id: makeConversationId(),
		title: formatConversationTitle(legacy),
		createdAt: legacy[0]?.timestamp ?? now,
		updatedAt: legacy.at(-1)?.timestamp ?? now,
		messages: legacy,
		tags: [],
		summary: ""
	});
	saveMentorConversations([migrated]);
	return [migrated];
}
function saveMentorConversations(conversations) {
	write(CONVERSATIONS_KEY, conversations.map(normalizeConversation).sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_CONVERSATIONS));
}
function createMentorConversation() {
	const now = Date.now();
	return {
		id: makeConversationId(),
		title: "Today's Study Plan",
		createdAt: now,
		updatedAt: now,
		messages: [],
		tags: [],
		summary: ""
	};
}
function updateMentorConversation(conversation, messages) {
	const nextMessages = messages.slice(-20);
	return normalizeConversation({
		...conversation,
		title: conversation.messages.length ? conversation.title : formatConversationTitle(nextMessages),
		updatedAt: nextMessages.at(-1)?.timestamp ?? Date.now(),
		messages: nextMessages,
		summary: nextMessages.filter((message) => message.role === "user").slice(-3).map((message) => message.text).join(" | ").slice(0, 360)
	});
}
function searchMentorConversations(conversations, query) {
	const terms = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter(Boolean);
	if (!terms.length) return conversations;
	return conversations.filter((conversation) => {
		const haystack = `${conversation.title} ${conversation.summary} ${conversation.tags.join(" ")} ${conversation.messages.map((message) => message.text).join(" ")}`.toLowerCase().replace(/[^a-z0-9]+/g, " ");
		return terms.every((term) => haystack.includes(term));
	});
}
function relevantMentorHistory(conversations, query, activeId) {
	const terms = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).filter((term) => term.length > 2);
	return conversations.filter((conversation) => conversation.id !== activeId).map((conversation) => {
		const text = `${conversation.title} ${conversation.summary} ${conversation.tags.join(" ")} ${conversation.messages.map((message) => message.text).join(" ")}`.toLowerCase().replace(/[^a-z0-9]+/g, " ");
		return {
			conversation,
			score: terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0)
		};
	}).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || b.conversation.updatedAt - a.conversation.updatedAt).slice(0, 3).map(({ conversation }) => ({
		title: conversation.title,
		summary: conversation.summary,
		recentMessages: conversation.messages.slice(-2).map(({ role, text }) => ({
			role,
			text: text.slice(0, 280)
		}))
	}));
}
function buildJeeTimeContext(now = /* @__PURE__ */ new Date(), targetDate = JEE_2028_TARGET_DATE) {
	const nowDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
	const target = /* @__PURE__ */ new Date(`${targetDate}T00:00:00Z`);
	const targetDateUtc = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate()));
	const days = Math.max(0, Math.round((targetDateUtc.getTime() - nowDate.getTime()) / 864e5));
	return {
		exam: "JEE 2028",
		targetDate,
		currentDate: nowDate.toISOString().slice(0, 10),
		daysRemaining: days,
		weeksRemaining: Math.ceil(days / 7),
		approximateMonthsRemaining: Math.round(days / 30.44 * 10) / 10
	};
}
function getCachedMentorResponse(key) {
	const now = Date.now();
	const valid = read(RESPONSE_CACHE_KEY, []).filter((item) => typeof item.response === "string" && now - item.createdAt < RESPONSE_CACHE_TTL);
	write(RESPONSE_CACHE_KEY, valid);
	return valid.find((item) => item.key === key)?.response;
}
function cacheMentorResponse(key, response) {
	const entries = read(RESPONSE_CACHE_KEY, []).filter((item) => item.key !== key && Date.now() - item.createdAt < RESPONSE_CACHE_TTL);
	write(RESPONSE_CACHE_KEY, [{
		key,
		response,
		createdAt: Date.now()
	}, ...entries].slice(0, MAX_CACHED_RESPONSES));
}
function updateMentorMemory(analysis, previous) {
	const weakTopics = analysis.priorityTopics.slice(0, 5).map((item) => ({
		subject: item.subject,
		topic: item.topic,
		accuracy: Number(item.accuracy.toFixed(1))
	}));
	const strongTopics = analysis.subjectPerformance.filter((item) => item.total >= 2).sort((a, b) => b.accuracy - a.accuracy).slice(0, 3).map((item) => ({
		subject: item.subject,
		topic: "subject trend",
		accuracy: Number(item.accuracy.toFixed(1))
	}));
	const fingerprint = JSON.stringify({
		weakTopics,
		recent: analysis.recentPerformance,
		subjects: analysis.subjectPerformance
	});
	const previousWeak = previous.weakTopics.map((item) => `${item.subject}:${item.topic}:${item.accuracy}`);
	const currentWeak = weakTopics.map((item) => `${item.subject}:${item.topic}:${item.accuracy}`);
	return {
		...previous,
		exam: "JEE 2028",
		targetDate: previous.targetDate || "2028-01-24",
		weakTopics,
		strongTopics,
		previousRecommendations: analysis.recommendations.slice(0, 4),
		recentProgress: previousWeak.join("|") !== currentWeak.join("|") ? `Current priorities: ${currentWeak.join(", ") || "none"}. Previous priorities: ${previousWeak.join(", ") || "none"}.` : previous.recentProgress,
		repeatedMistakes: analysis.repeatedMistakes.slice(0, 5).map((item) => ({
			subject: item.subject,
			topic: item.topic,
			count: item.count
		})),
		performanceFingerprint: fingerprint,
		updatedAt: Date.now()
	};
}
function rememberGoal(memory, goal) {
	const trimmed = goal.trim();
	if (!trimmed) return memory;
	return {
		...memory,
		recentGoals: [trimmed, ...memory.recentGoals.filter((item) => item !== trimmed)].slice(0, 3)
	};
}
//#endregion
//#region src/routes/mentor.tsx
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}
function historyGroup(timestamp) {
	const date = new Date(timestamp);
	const today = /* @__PURE__ */ new Date();
	const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
	const daysAgo = Math.floor((startToday - new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) / 864e5);
	if (daysAgo <= 0) return "TODAY";
	if (daysAgo === 1) return "YESTERDAY";
	if (daysAgo < 7) return "THIS WEEK";
	return "OLDER";
}
function renderInlineMarkdown(text) {
	let html = "";
	let cursor = 0;
	for (const matches of text.matchAll(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\([^\n]+?\\\)|\\\[[\s\S]+?\\\]|\\(?:d?frac|tfrac|sqrt|text|mathrm|mathbb|sin|cos|tan|log|ln|sum|prod|int|cdot|times|leq|geq|neq|infty)\s*(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}){1,2}|[A-Za-z0-9)\]}]\s*[\^_]\s*(?:\{[^{}]+\}|[A-Za-z0-9+\-]+))/g)) {
		const matchIndex = matches.index ?? 0;
		const matchText = matches[0];
		html += renderPlainMarkdown(text.slice(cursor, matchIndex));
		html += mathToHtml(matchText, false);
		cursor = matchIndex + matchText.length;
	}
	html += renderPlainMarkdown(text.slice(cursor));
	return html;
}
function renderPlainMarkdown(text) {
	let html = escapeHtml(text);
	html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
	html = html.replace(/(^|\s)\*([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
	html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
	html = html.replace(/_([^_\n]+?)_/g, "<em>$1</em>");
	html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
	return html;
}
function renderMentorMessageHtml(message) {
	const normalized = message.replace(/\r\n/g, "\n").trim();
	if (!normalized) return "";
	const lines = normalized.split("\n");
	const blocks = [];
	let paragraph = [];
	let listType = null;
	let listItems = [];
	const flushParagraph = () => {
		if (paragraph.length) {
			blocks.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
			paragraph = [];
		}
	};
	const flushList = () => {
		if (!listItems.length) return;
		const tag = listType === "ol" ? "ol" : "ul";
		blocks.push(`<${tag}>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</${tag}>`);
		listItems = [];
		listType = null;
	};
	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line) {
			flushParagraph();
			flushList();
			continue;
		}
		const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
		if (headingMatch) {
			flushParagraph();
			flushList();
			const level = headingMatch[1].length;
			blocks.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
			continue;
		}
		if (/^[-*]\s+/.test(line)) {
			flushParagraph();
			const item = line.replace(/^[-*]\s+/, "");
			if (listType !== "ul") {
				flushList();
				listType = "ul";
			}
			listItems.push(item);
			continue;
		}
		if (/^\d+\.\s+/.test(line)) {
			flushParagraph();
			const item = line.replace(/^\d+\.\s+/, "");
			if (listType !== "ol") {
				flushList();
				listType = "ol";
			}
			listItems.push(item);
			continue;
		}
		paragraph.push(line);
	}
	flushParagraph();
	flushList();
	return blocks.join("");
}
function MentorMessage({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mentor-markdown prose prose-sm max-w-none space-y-2 text-sm leading-7 text-foreground [&_h1]:mt-0 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:mt-0 [&_h2]:text-sm [&_h2]:font-semibold [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs",
		dangerouslySetInnerHTML: { __html: renderMentorMessageHtml(text) }
	});
}
var Route$24 = createFileRoute("/mentor")({
	head: () => ({ meta: [{ title: "AI Mentor — JEE CBT Platform" }, {
		name: "description",
		content: "Personalized JEE mentor that analyses real attempts, finds weak topics, and recommends focused revision and practice."
	}] }),
	component: Mentor
});
function Mentor() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const reports = useQuery({
		queryKey: ["mentor", "reports"],
		queryFn: allReports
	});
	const tests = useQuery({
		queryKey: ["mentor", "tests"],
		queryFn: listTests
	});
	const analysis = (0, import_react.useMemo)(() => buildMentorAnalysis(reports.data ?? []), [reports.data]);
	const [mentorMemory, setMentorMemory] = (0, import_react.useState)(() => loadMentorMemory());
	const [conversations, setConversations] = (0, import_react.useState)(() => loadMentorConversations());
	const [activeConversationId, setActiveConversationId] = (0, import_react.useState)(() => loadMentorConversations()[0]?.id ?? "");
	const [historyQuery, setHistoryQuery] = (0, import_react.useState)("");
	const [historyOpen, setHistoryOpen] = (0, import_react.useState)(true);
	const [retryStatus, setRetryStatus] = (0, import_react.useState)("");
	const [retryCountdown, setRetryCountdown] = (0, import_react.useState)(0);
	const [quickBankMatchLoading, setQuickBankMatchLoading] = (0, import_react.useState)(false);
	const [quickBankMatchResult, setQuickBankMatchResult] = (0, import_react.useState)(null);
	const [geminiUsage, setGeminiUsage] = (0, import_react.useState)(() => getGeminiRequestUsage());
	const requestInFlightRef = (0, import_react.useRef)(null);
	const activeConversation = conversations.find((item) => item.id === activeConversationId) ?? conversations[0];
	const chat = activeConversation?.messages ?? [];
	function updateActiveChat(nextMessages) {
		if (!activeConversation) return;
		setConversations((current) => current.map((item) => item.id === activeConversation.id ? updateMentorConversation(item, nextMessages) : item));
	}
	(0, import_react.useEffect)(() => {
		const updated = updateMentorMemory(analysis, mentorMemory);
		if (updated.performanceFingerprint !== mentorMemory.performanceFingerprint) setMentorMemory(updated);
	}, [analysis, mentorMemory]);
	(0, import_react.useEffect)(() => {
		saveMentorMemory(mentorMemory);
	}, [mentorMemory]);
	(0, import_react.useEffect)(() => {
		saveMentorConversations(conversations);
	}, [conversations]);
	(0, import_react.useEffect)(() => {
		if (retryCountdown <= 0) return;
		const timer = window.setTimeout(() => {
			setRetryCountdown((current) => Math.max(0, current - 1));
			setRetryStatus(`AI limit reached. Retrying in ${Math.max(0, retryCountdown - 1)}s…`);
		}, 1e3);
		return () => window.clearTimeout(timer);
	}, [retryCountdown]);
	(0, import_react.useEffect)(() => {
		if (!activeConversationId && analysis.summary) {
			const conversation = updateMentorConversation(createMentorConversation(), [{
				role: "mentor",
				text: analysis.summary,
				timestamp: Date.now()
			}]);
			setConversations([conversation]);
			setActiveConversationId(conversation.id);
		}
	}, [analysis.summary, activeConversationId]);
	const trendData = (0, import_react.useMemo)(() => {
		const history = [...reports.data ?? []].sort((a, b) => (a.attempt.submittedAt ?? a.attempt.updatedAt) - (b.attempt.submittedAt ?? b.attempt.updatedAt)).map((report) => ({
			label: new Date(report.attempt.submittedAt ?? report.attempt.updatedAt).toLocaleDateString(void 0, {
				month: "short",
				day: "numeric"
			}),
			accuracy: Number(report.summary.accuracy.toFixed(1)),
			score: report.summary.score,
			timeSpent: Math.max(0, Math.round(report.summary.timeSpent / 60))
		}));
		return history.length > 0 ? history : [];
	}, [reports.data]);
	const subjectPerformanceData = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const report of reports.data ?? []) for (const item of report.summary.bySubject ?? []) {
			const current = map.get(item.name) ?? {
				correct: 0,
				total: 0,
				score: 0,
				time: 0
			};
			current.correct += item.correct;
			current.total += item.total;
			current.score += item.score;
			current.time += item.time;
			map.set(item.name, current);
		}
		return [...map.entries()].map(([name, values]) => ({
			name,
			accuracy: values.total ? values.correct / values.total * 100 : 0,
			score: values.score,
			time: values.time
		})).sort((a, b) => a.accuracy - b.accuracy).slice(0, 6);
	}, [reports.data]);
	(0, import_react.useMemo)(() => {
		const request = analysis.priorityTopics[0] ? resolveMentorAction(`Give me 10 questions on ${analysis.priorityTopics[0].topic} in ${analysis.priorityTopics[0].subject}`, analysis) : null;
		if (!request || !tests.data) return [];
		return findRecommendedQuestions(tests.data, request, analysis).slice(0, request.count ?? 10);
	}, [analysis, tests.data]);
	const targetedRequest = (0, import_react.useMemo)(() => analysis.priorityTopics[0] ? resolveMentorAction(`Give me 10 questions on ${analysis.priorityTopics[0].topic} in ${analysis.priorityTopics[0].subject}`, analysis) : null, [analysis]);
	const targetedQuestions = (0, import_react.useMemo)(() => targetedRequest && tests.data ? findRecommendedQuestions(tests.data, targetedRequest, analysis).slice(0, targetedRequest.count ?? 10) : [], [
		analysis,
		targetedRequest,
		tests.data
	]);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const [prompt, setPrompt] = (0, import_react.useState)("What should I study today?");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const visibleConversations = searchMentorConversations(conversations, historyQuery);
	const groupedConversations = [
		"TODAY",
		"YESTERDAY",
		"THIS WEEK",
		"OLDER"
	].map((group) => ({
		group,
		items: visibleConversations.filter((conversation) => historyGroup(conversation.updatedAt) === group)
	})).filter((section) => section.items.length > 0);
	function startNewConversation() {
		const conversation = createMentorConversation();
		setConversations((current) => [conversation, ...current]);
		setActiveConversationId(conversation.id);
	}
	function deleteConversation(id) {
		const remaining = conversations.filter((conversation) => conversation.id !== id);
		setConversations(remaining);
		if (id === activeConversation?.id) setActiveConversationId(remaining[0]?.id ?? "");
	}
	async function handleQuickBankMatch() {
		if (!targetedQuestions.length || !tests.data?.length) {
			setQuickBankMatchResult(0);
			setQuickBankMatchLoading(false);
			return;
		}
		setQuickBankMatchLoading(true);
		setQuickBankMatchResult(null);
		await new Promise((resolve) => setTimeout(resolve, 150));
		const matched = findRecommendedQuestions(tests.data, targetedRequest ?? { count: 5 }, analysis).slice(0, 5).length;
		setQuickBankMatchResult(matched);
		setQuickBankMatchLoading(false);
	}
	function openTargetedPractice() {
		if (!tests.data?.length || targetedQuestions.length === 0) {
			toast.error("There are not enough suitable bank questions for a targeted practice test yet.");
			return;
		}
		const base = tests.data[0];
		const topic = analysis.priorityTopics[0];
		setPendingLaunch(() => async (selectedMode) => {
			const durationMin = Math.max(30, Math.ceil(targetedQuestions.length * 2));
			const attempt = await startAttempt({
				...base,
				name: `Mentor Practice — ${topic?.topic ?? "Priority Revision"}`,
				questions: targetedQuestions,
				questionCount: targetedQuestions.length,
				durationMin
			}, {
				questions: targetedQuestions,
				durationMin,
				name: `Mentor Practice — ${topic?.topic ?? "Priority Revision"}`,
				mode: selectedMode,
				strictMode: selectedMode === "strict"
			});
			queryClient.invalidateQueries({ queryKey: ["attempts"] });
			router.navigate({
				to: "/test/$attemptId",
				params: { attemptId: attempt.id }
			});
		});
		setModePickerOpen(true);
	}
	async function handleModeSelect(selectedMode) {
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
			const launch = pendingLaunch;
			setPendingLaunch(null);
			await launch(selectedMode);
		}
	}
	async function handleAsk() {
		const value = prompt.trim();
		if (!value) return;
		const normalizedPrompt = normalizeMentorQuestion(value);
		if (requestInFlightRef.current === normalizedPrompt) return;
		const staticAnswer = shouldShortCircuitMentorQuestion(value);
		const cachedAnswer = getCachedMentorResponse(normalizedPrompt);
		if (staticAnswer || cachedAnswer) {
			const answer = staticAnswer ?? cachedAnswer;
			const userMessage = {
				role: "user",
				text: value,
				timestamp: Date.now()
			};
			updateActiveChat([
				...chat,
				userMessage,
				{
					role: "mentor",
					text: answer,
					timestamp: Date.now()
				}
			]);
			setPrompt("");
			if (staticAnswer && !cachedAnswer) cacheMentorResponse(normalizedPrompt, answer);
			return;
		}
		const userMessage = {
			role: "user",
			text: value,
			timestamp: Date.now()
		};
		updateActiveChat([...chat, userMessage]);
		setMentorMemory((current) => rememberGoal(current, value));
		setPrompt("");
		setLoading(true);
		setRetryStatus("");
		requestInFlightRef.current = normalizedPrompt;
		try {
			const request = resolveMentorAction(value, analysis);
			const candidates = request && tests.data ? findRecommendedQuestions(tests.data, request, analysis).slice(0, 5) : [];
			const questionBankById = /* @__PURE__ */ new Map();
			for (const test of tests.data ?? []) for (const question of test.questions) questionBankById.set(question.id, test.name || "Insufficient Evidence");
			const candidatesForGemini = candidates.map((q) => {
				const normalizedDifficulty = q.difficulty === "Easy" || q.difficulty === "Medium" || q.difficulty === "Hard" ? q.difficulty : "Medium";
				const evidence = analysis.priorityTopics.find((item) => item.subject === q.subject && item.topic === q.topic)?.reason ?? "Insufficient Evidence";
				const questionBank = questionBankById.get(q.id) ?? "Insufficient Evidence";
				return {
					reference: `Q${q.number} · ${q.chapter} · ${q.topic} · ${normalizedDifficulty}`,
					questionBank,
					subject: q.subject,
					chapter: q.chapter,
					topic: q.topic,
					difficulty: normalizedDifficulty,
					type: q.type,
					pyq: q.pyq,
					reason: evidence
				};
			});
			const compactContext = buildMentorContext(analysis, rememberGoal(mentorMemory, value), value);
			const conversation = chat.slice(-6).map(({ role, text }) => ({
				role,
				text
			}));
			const relevantHistory = relevantMentorHistory(conversations, value, activeConversation?.id);
			const answer = await askMentor({ data: {
				prompt: value,
				context: {
					...compactContext,
					jeeTime: buildJeeTimeContext(),
					longTermMemory: mentorMemory
				},
				questionRequest: request ? { ...request } : null,
				questionContext: candidatesForGemini,
				conversation,
				relevantHistory
			} }) || "I need a little more data before I can answer confidently.";
			cacheMentorResponse(normalizedPrompt, answer);
			incrementGeminiRequestUsage();
			setGeminiUsage(getGeminiRequestUsage());
			updateActiveChat([
				...chat,
				userMessage,
				{
					role: "mentor",
					text: answer,
					timestamp: Date.now()
				}
			]);
		} catch (error) {
			const parsedRateLimit = error instanceof Error && error.message.startsWith("{") ? (() => {
				try {
					return JSON.parse(error.message);
				} catch {
					return null;
				}
			})() : null;
			const isRateLimit = Boolean(parsedRateLimit?.kind === "rate_limit") || error instanceof Error && /rate limit|quota|RESOURCE_EXHAUSTED|429/i.test(error.message);
			const retryDelaySeconds = typeof parsedRateLimit?.retryDelaySeconds === "number" ? parsedRateLimit.retryDelaySeconds : 35;
			const fallback = isRateLimit ? GEMINI_RATE_LIMIT_MESSAGE : "AI Mentor is temporarily unavailable. Please try again shortly.";
			if (isRateLimit && retryDelaySeconds > 0) {
				setRetryCountdown(retryDelaySeconds);
				setRetryStatus(`AI limit reached. Retrying in ${retryDelaySeconds}s…`);
			}
			updateActiveChat([
				...chat,
				userMessage,
				{
					role: "mentor",
					timestamp: Date.now(),
					text: `${fallback}\n\nBased on your data: ${analysis.summary}`
				}
			]);
		} finally {
			requestInFlightRef.current = null;
			setLoading(false);
			setRetryStatus("");
		}
	}
	const overallAccuracy = analysis.subjectPerformance.length ? analysis.subjectPerformance.reduce((sum, item) => sum + item.accuracy, 0) / analysis.subjectPerformance.length : 0;
	if (reports.isLoading || tests.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
		children: "Loading your mentor dashboard…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.22em] text-muted-foreground",
							children: "AI Mentor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold tracking-tight",
							children: "Personalized preparation coach"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-sm text-muted-foreground",
						children: analysis.summary
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					className: "w-fit gap-2 px-3 py-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), "Live from your practice data"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4" }),
						label: "Overall accuracy",
						value: `${((analysis.priorityTopics[0]?.accuracy ?? overallAccuracy) || 0).toFixed(1)}%`,
						tone: "default"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }),
						label: "Recent tests",
						value: String(analysis.recentPerformance.length),
						tone: "default"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }),
						label: "Priority topics",
						value: String(analysis.priorityTopics.length),
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, { className: "size-4" }),
						label: "Weak themes",
						value: String(analysis.repeatedMistakes.length || analysis.priorityTopics.length),
						tone: "danger"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorChartCard, {
						title: "Accuracy over time",
						emptyLabel: "Not enough data yet for a trend chart.",
						children: trendData.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: trendData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										tick: { fontSize: 10 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										domain: [0, 100],
										tick: { fontSize: 10 },
										unit: "%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										animationDuration: 220,
										animationEasing: "ease-out",
										formatter: (value) => [`${value}%`, "Accuracy"],
										contentStyle: {
											background: "var(--card)",
											border: "1px solid var(--border)",
											borderRadius: 12,
											color: "var(--foreground)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "accuracy",
										stroke: "var(--primary)",
										strokeWidth: 2,
										dot: {
											r: 3,
											fill: "var(--primary)",
											strokeWidth: 0
										},
										isAnimationActive: true,
										animationDuration: 700,
										animationEasing: "ease-out"
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChartState, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorChartCard, {
						title: "Score over time",
						emptyLabel: "Not enough data yet for a score graph.",
						children: trendData.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: trendData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										tick: { fontSize: 10 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 10 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										animationDuration: 220,
										animationEasing: "ease-out",
										formatter: (value) => [String(value), "Score"],
										contentStyle: {
											background: "var(--card)",
											border: "1px solid var(--border)",
											borderRadius: 12,
											color: "var(--foreground)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
										dataKey: "score",
										fill: "var(--primary)",
										radius: [
											4,
											4,
											0,
											0
										],
										isAnimationActive: true,
										animationDuration: 700,
										animationEasing: "ease-out"
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChartState, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorChartCard, {
						title: "Minutes spent per test",
						emptyLabel: "Not enough data yet for time trend.",
						children: trendData.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: trendData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										tick: { fontSize: 10 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 10 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										animationDuration: 220,
										animationEasing: "ease-out",
										formatter: (value) => [`${value} min`, "Time spent"],
										contentStyle: {
											background: "var(--card)",
											border: "1px solid var(--border)",
											borderRadius: 12,
											color: "var(--foreground)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
										dataKey: "timeSpent",
										fill: "var(--success)",
										radius: [
											4,
											4,
											0,
											0
										],
										isAnimationActive: true,
										animationDuration: 700,
										animationEasing: "ease-out"
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChartState, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorChartCard, {
						title: "Subject performance",
						emptyLabel: "Not enough subject data yet.",
						children: subjectPerformanceData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: subjectPerformanceData,
								layout: "vertical",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										horizontal: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										domain: [0, 100],
										unit: "%",
										tick: { fontSize: 10 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "name",
										width: 80,
										tick: { fontSize: 10 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										animationDuration: 220,
										animationEasing: "ease-out",
										formatter: (value) => [`${Number(value).toFixed(1)}%`, "Accuracy"],
										contentStyle: {
											background: "var(--card)",
											border: "1px solid var(--border)",
											borderRadius: 12,
											color: "var(--foreground)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
										dataKey: "accuracy",
										fill: "var(--warning)",
										radius: [
											0,
											4,
											4,
											0
										],
										isAnimationActive: true,
										animationDuration: 700,
										animationEasing: "ease-out"
									})
								]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyChartState, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1.3fr_0.7fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Overall preparation analysis"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "What your real data is telling you right now." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Mentor status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-base leading-7 text-foreground",
						children: analysis.summary
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Current strengths"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2 text-sm text-foreground",
							children: (analysis.strengths.length ? analysis.strengths : ["Not enough data yet to identify strong areas."]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "mt-0.5 size-4 shrink-0 text-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Current weaknesses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2 text-sm text-foreground",
							children: (analysis.weaknesses.length ? analysis.weaknesses : ["No major weakness is visible yet because the sample size is still small."]).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						})] })]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), " Recommended actions"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: analysis.recommendations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border bg-accent/30 p-3 text-sm text-foreground",
						children: item
					}, item))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Priority topics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Weaknesses ranked by actual performance, time, and repetition." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: analysis.priorityTopics.length ? analysis.priorityTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold text-foreground",
									children: [
										topic.subject,
										" · ",
										topic.topic
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: topic.chapter
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: topic.priority === "Critical" ? "destructive" : topic.priority === "High" ? "secondary" : "outline",
									children: topic.priority
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Accuracy ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-foreground",
										children: [topic.accuracy.toFixed(1), "%"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Wrong ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: topic.wrong
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Avg time ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-foreground",
										children: [Math.round(topic.avgTime), "s"]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: topic.reason
							})
						]
					}, topic.key)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "I need more attempts before I can rank your weak topics reliably."
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Recent performance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Trend across your latest submitted tests." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: analysis.recentPerformance.length ? analysis.recentPerformance.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border bg-card p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: item.date
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold text-foreground",
								children: [item.accuracy.toFixed(1), "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [item.score, " marks"]
							})]
						})]
					}, `${item.label}-${item.date}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Submit a mock test to build a recent performance trend."
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Quick Bank Match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Find suitable questions for your weakest area without dumping a full list into chat." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: quickBankMatchLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border border-dashed bg-accent/20 p-3 text-sm text-muted-foreground",
						children: "Matching suitable questions from your Question Bank…"
					}) : quickBankMatchResult !== null ? quickBankMatchResult > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-medium text-foreground",
							children: [quickBankMatchResult, " questions matched"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: openTargetedPractice,
							className: "w-fit gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }), " Start Practice"]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No suitable questions found in your Question Bank."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleQuickBankMatch,
						className: "w-fit gap-2",
						disabled: !targetedQuestions.length || !tests.data?.length,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }), " Quick Bank Match"]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg",
					children: "Next study block"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Concrete steps for the next one to two hours." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-3",
					children: analysis.nextActions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-card p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: action.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: action.detail
						})]
					}, action.title))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2 text-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-4" }), " Chat with Mentor"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Ask about your weak areas, revision plan, or next mock strategy." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "w-fit gap-2 lg:hidden",
					onClick: () => setHistoryOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "size-4" }), " History"]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: historyOpen ? "grid gap-4 lg:grid-cols-[176px_1fr]" : "grid gap-4 lg:grid-cols-[40px_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: historyOpen ? "fixed inset-y-0 left-0 z-50 w-[min(82vw,280px)] overflow-y-auto border-r bg-card p-3 shadow-xl lg:static lg:w-auto lg:rounded-xl lg:border lg:shadow-none" : "hidden lg:block lg:rounded-xl lg:border lg:bg-card lg:p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [historyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
										children: "History"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										className: "gap-1",
										onClick: () => setHistoryOpen((open) => !open),
										"aria-label": historyOpen ? "Collapse history" : "Expand history",
										children: [historyOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "size-4" }), historyOpen && "Collapse"]
									})]
								}),
								historyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: historyQuery,
									onChange: (event) => setHistoryQuery(event.target.value),
									placeholder: "Search history",
									className: "mt-3 w-full rounded-lg border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary"
								}),
								historyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "mt-2 w-full",
									onClick: startNewConversation,
									children: "+ New Chat"
								}),
								historyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 max-h-[calc(100vh-180px)] space-y-1 overflow-y-auto",
									children: [groupedConversations.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-2 pb-1 pt-2 text-[10px] font-semibold tracking-wide text-muted-foreground",
										children: section.group
									}), section.items.map((conversation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setActiveConversationId(conversation.id),
											className: `min-w-0 flex-1 rounded-lg px-2 py-2 text-left text-xs ${conversation.id === activeConversation?.id ? "bg-primary/10 text-primary" : "hover:bg-accent"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-medium",
												children: conversation.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground",
												children: new Date(conversation.updatedAt).toLocaleDateString()
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => deleteConversation(conversation.id),
											className: "px-1 text-xs text-muted-foreground hover:text-destructive",
											"aria-label": `Delete ${conversation.title}`,
											children: "×"
										})]
									}, conversation.id))] }, section.group)), !visibleConversations.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "py-3 text-xs text-muted-foreground",
										children: "No saved conversations."
									})]
								})
							]
						}),
						historyOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Close history",
							onClick: () => setHistoryOpen(false),
							className: "fixed inset-0 z-40 bg-background/60 lg:hidden"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3 rounded-xl border bg-card p-3",
							children: chat.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: message.role === "user" ? "ml-auto max-w-[85%] rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground" : "mr-auto max-w-[85%] rounded-xl border bg-accent/20 px-3 py-2 text-sm text-foreground",
								children: message.role === "mentor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MentorMessage, { text: message.text }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "whitespace-pre-wrap",
									children: message.text
								})
							}, `${message.role}-${index}`))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: prompt,
							onChange: (event) => setPrompt(event.target.value),
							rows: 3,
							placeholder: "Example: Why am I getting weak in Physics? Which topic should I revise today?",
							className: "min-h-[90px] w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 focus:border-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: getGeminiRequestUsageSummary({
								count: geminiUsage.count,
								date: getTodayDateKey()
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "self-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: handleAsk,
							disabled: loading || !prompt.trim(),
							children: loading ? retryStatus || "Thinking…" : "Ask Mentor"
						})
					})]
				})]
			})] })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
		open: modePickerOpen,
		onOpenChange: setModePickerOpen,
		onStart: handleModeSelect
	})] });
}
function StatCard({ icon, label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `premium-card rounded-xl border p-4 ${tone === "warning" ? "border-amber-500/20 bg-amber-500/5" : tone === "danger" ? "border-red-500/20 bg-red-500/5" : "border-primary/20 bg-primary/5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-2xl font-bold tracking-tight text-foreground",
			children: value
		})]
	});
}
function MentorChartCard({ title, children, emptyLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card$1, {
		className: "premium-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base font-semibold",
				children: title
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chart-animated h-40",
				children
			})
		})]
	});
}
function EmptyChartState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center rounded-lg border border-dashed bg-accent/10 p-4 text-center text-xs text-muted-foreground",
		children: "Not enough data yet."
	});
}
//#endregion
//#region src/routes/mistakes.tsx
var Route$23 = createFileRoute("/mistakes")({
	head: () => ({ meta: [
		{ title: "Smart Mistake Analysis — JEE CBT Platform" },
		{
			name: "description",
			content: "Automatic mistake analysis after every test: accuracy by subject, chapter, topic, difficulty and question type, time analysis, trends and what to revise next."
		},
		{
			property: "og:title",
			content: "Smart Mistake Analysis — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Interactive charts on your real attempts plus dynamic recommendations for what to practise next."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: MistakesPage
});
var COLORS = [
	"var(--primary)",
	"var(--destructive)",
	"var(--muted-foreground)"
];
function MistakesPage() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const data = (0, import_react.useMemo)(() => {
		const list = [...reports.data ?? []].sort((a, b) => (a.attempt.submittedAt ?? a.attempt.updatedAt) - (b.attempt.submittedAt ?? b.attempt.updatedAt));
		const group = (key, min = 1) => {
			const map = /* @__PURE__ */ new Map();
			for (const r of list) for (const pq of r.summary.perQuestion) {
				const k = key(pq.question) || "General";
				const b = map.get(k) ?? {
					name: k,
					total: 0,
					correct: 0,
					wrong: 0,
					skipped: 0,
					time: 0,
					accuracy: 0
				};
				b.total += 1;
				b.time += pq.answer?.timeSpent ?? 0;
				b[pq.status] += 1;
				map.set(k, b);
			}
			return [...map.values()].filter((b) => b.total >= min).map((b) => ({
				...b,
				accuracy: b.correct + b.wrong ? b.correct / (b.correct + b.wrong) * 100 : 0
			}));
		};
		const flat = list.flatMap((r) => r.summary.perQuestion);
		const correct = flat.filter((p) => p.status === "correct").length;
		const wrong = flat.filter((p) => p.status === "wrong").length;
		const skipped = flat.filter((p) => p.status === "skipped").length;
		const attempted = correct + wrong;
		const timed = flat.filter((p) => (p.answer?.timeSpent ?? 0) > 0);
		const subjects = group((q) => q.subject);
		const chapters = group((q) => q.chapter, 3);
		const topics = group((q) => q.topic, 3).filter((b) => b.name !== "General");
		const best = (arr) => [...arr].sort((a, b) => b.accuracy - a.accuracy)[0];
		const worst = (arr) => [...arr].sort((a, b) => a.accuracy - b.accuracy)[0];
		const trend = list.map((r, i) => ({
			name: `T${i + 1}`,
			accuracy: Number(r.summary.accuracy.toFixed(1)),
			score: r.summary.score,
			test: r.attempt.testName
		}));
		const timeByStatus = [
			{
				name: "Correct",
				seconds: Math.round(flat.filter((p) => p.status === "correct").reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0))
			},
			{
				name: "Wrong",
				seconds: Math.round(flat.filter((p) => p.status === "wrong").reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0))
			},
			{
				name: "Skipped",
				seconds: Math.round(flat.filter((p) => p.status === "skipped").reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0))
			}
		];
		const weakChapters = [...chapters].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5);
		const slowWrong = [...flat].filter((p) => p.status === "wrong").sort((a, b) => (b.answer?.timeSpent ?? 0) - (a.answer?.timeSpent ?? 0)).slice(0, 3);
		const recommendations = [];
		const overall = attempted ? correct / attempted * 100 : 0;
		for (const c of weakChapters.slice(0, 3)) recommendations.push(`Revise "${c.name}" — accuracy ${c.accuracy.toFixed(0)}% over ${c.total} questions.`);
		const weakSubject = worst(subjects);
		if (weakSubject) recommendations.push(`${weakSubject.name} is your weakest subject (${weakSubject.accuracy.toFixed(0)}%). Add a focused ${weakSubject.name} practice set.`);
		if (skipped > attempted * .25) recommendations.push(`You skipped ${skipped} questions. Practise timed sets to improve coverage before accuracy.`);
		if (wrong > 0 && overall < 60) recommendations.push("Negative marking is hurting you — attempt only questions you can justify in under 2 minutes.");
		for (const p of slowWrong) recommendations.push(`Q${p.question.number} (${p.question.chapter}) took ${p.answer?.timeSpent ?? 0}s and was wrong — review the concept, not just the answer.`);
		const weakType = worst(group((q) => QUESTION_TYPE_LABEL[q.type], 3));
		if (weakType) recommendations.push(`Drill ${weakType.name} questions — only ${weakType.accuracy.toFixed(0)}% accuracy so far.`);
		return {
			count: list.length,
			correct,
			wrong,
			skipped,
			overall,
			totalTime: flat.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
			avgTime: timed.length ? timed.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0) / timed.length : 0,
			subjects,
			chapters: [...chapters].sort((a, b) => a.accuracy - b.accuracy).slice(0, 10),
			topics: [...topics].sort((a, b) => a.accuracy - b.accuracy).slice(0, 10),
			difficulty: group((q) => q.difficulty),
			types: group((q) => QUESTION_TYPE_LABEL[q.type]),
			trend,
			timeByStatus,
			pie: [
				{
					name: "Correct",
					value: correct
				},
				{
					name: "Wrong",
					value: wrong
				},
				{
					name: "Skipped",
					value: skipped
				}
			],
			strongSubject: best(subjects),
			weakSubject,
			strongChapter: best(chapters),
			weakChapter: worst(chapters),
			strongTopic: best(topics),
			weakTopic: worst(topics),
			recommendations: recommendations.slice(0, 6)
		};
	}, [reports.data]);
	if (reports.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Analysing your mistakes…"
	}) });
	if (data.count === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-bold tracking-tight",
		children: "Smart Mistake Analysis"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
		children: [
			"Submit a test to unlock mistake analysis.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/create",
				className: "text-primary underline",
				children: "Create a test"
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-5" }), " Smart Mistake Analysis"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				"Updated automatically after every completed test · ",
				data.count,
				" attempt",
				data.count === 1 ? "" : "s",
				" analysed."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Overall accuracy",
					value: `${data.overall.toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Correct",
					value: String(data.correct),
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Wrong",
					value: String(data.wrong),
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Skipped",
					value: String(data.skipped)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Total time",
					value: formatClock(data.totalTime)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Avg time / question",
					value: `${Math.round(data.avgTime)}s`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$3, {
					label: "Strongest subject",
					value: data.strongSubject ? `${data.strongSubject.name}` : "—",
					tone: "good"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Accuracy by subject",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: data.subjects,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--border)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							unit: "%",
							domain: [0, 100],
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
							dataKey: "accuracy",
							name: "Accuracy %",
							fill: "var(--primary)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 750,
							animationEasing: "ease-out"
						})
					]
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Answer distribution",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: data.pie,
						dataKey: "value",
						nameKey: "name",
						outerRadius: 90,
						label: true,
						isAnimationActive: true,
						animationDuration: 800,
						animationEasing: "ease-out",
						children: data.pie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell$1, { fill: COLORS[i % COLORS.length] }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend$2, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip })
				] }) })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			title: "Performance trend",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: data.trend,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						strokeDasharray: "3 3",
						stroke: "var(--border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend$2, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "accuracy",
						name: "Accuracy %",
						stroke: "var(--primary)",
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: "var(--primary)",
							strokeWidth: 0
						},
						isAnimationActive: true,
						animationDuration: 700,
						animationEasing: "ease-out"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "score",
						name: "Score",
						stroke: "var(--success)",
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: "var(--success)",
							strokeWidth: 0
						},
						isAnimationActive: true,
						animationDuration: 700,
						animationEasing: "ease-out"
					})
				]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Weakest chapters",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, {
					height: Math.max(220, data.chapters.length * 32),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data.chapters,
						layout: "vertical",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								unit: "%",
								domain: [0, 100],
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "name",
								width: 120,
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
								dataKey: "accuracy",
								name: "Accuracy %",
								fill: "var(--destructive)",
								radius: [
									0,
									6,
									6,
									0
								],
								isAnimationActive: true,
								animationDuration: 700,
								animationEasing: "ease-out"
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Weakest topics",
				children: data.topics.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Not enough topic data yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, {
					height: Math.max(220, data.topics.length * 32),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data.topics,
						layout: "vertical",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								unit: "%",
								domain: [0, 100],
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "name",
								width: 120,
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
								dataKey: "accuracy",
								name: "Accuracy %",
								fill: "var(--warning)",
								radius: [
									0,
									6,
									6,
									0
								],
								isAnimationActive: true,
								animationDuration: 700,
								animationEasing: "ease-out"
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Accuracy by difficulty",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: data.difficulty,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--border)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							unit: "%",
							domain: [0, 100],
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
							dataKey: "accuracy",
							name: "Accuracy %",
							fill: "var(--primary)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 700,
							animationEasing: "ease-out"
						})
					]
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Accuracy by question type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: data.types,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--border)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 10 },
							interval: 0,
							angle: -15,
							height: 50
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							unit: "%",
							domain: [0, 100],
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
							dataKey: "accuracy",
							name: "Accuracy %",
							fill: "var(--success)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 700,
							animationEasing: "ease-out"
						})
					]
				}) })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			title: "Time analysis (seconds by outcome)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: data.timeByStatus,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						strokeDasharray: "3 3",
						stroke: "var(--border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar$2, {
						dataKey: "seconds",
						name: "Seconds",
						fill: "var(--primary)",
						radius: [
							6,
							6,
							0,
							0
						],
						isAnimationActive: true,
						animationDuration: 700,
						animationEasing: "ease-out"
					})
				]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Weakest subject",
					b: data.weakSubject,
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Weakest chapter",
					b: data.weakChapter,
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Weakest topic",
					b: data.weakTopic,
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Strongest subject",
					b: data.strongSubject,
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Strongest chapter",
					b: data.strongChapter,
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Strongest topic",
					b: data.strongTopic,
					tone: "good"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			title: "What to practise next",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-sm",
				children: [data.recommendations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted-foreground",
					children: "Nothing critical — keep attempting full-length papers."
				}), data.recommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-lg border bg-surface p-3",
					children: r
				}, i))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
					children: "Start targeted practice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/notebook",
					className: "rounded-lg border px-3 py-1.5 text-xs font-semibold",
					children: "Open Wrong Notebook"
				})]
			})]
		})
	] });
}
var tooltip = {
	animationDuration: 220,
	animationEasing: "ease-out",
	contentStyle: {
		background: "var(--card)",
		border: "1px solid var(--border)",
		borderRadius: 12,
		fontSize: 12,
		color: "var(--foreground)",
		padding: "0.7rem 0.8rem"
	},
	itemStyle: {
		color: "var(--foreground)",
		padding: 0
	},
	labelStyle: {
		color: "var(--foreground)",
		fontWeight: 600
	}
};
function ChartBox({ children, height = 260 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		className: "chart-animated w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children
		})
	});
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "premium-card mt-4 rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide",
			children: title
		}), children]
	});
}
function Stat$3({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-1 text-xl font-bold", tone === "bad" && "text-destructive", tone === "good" && "text-success"),
			children: value
		})]
	});
}
function Extreme({ label, b, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold uppercase text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1 truncate text-sm font-bold", tone === "bad" ? "text-destructive" : "text-success"),
				children: b ? b.name : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-muted-foreground",
				children: b ? `${b.accuracy.toFixed(0)}% · ${b.correct}/${b.total} correct` : "Not enough data"
			})
		]
	});
}
//#endregion
//#region src/lib/notes-library.ts
function groupLibraryNotesBySubjectAndChapter(notes) {
	const grouped = /* @__PURE__ */ new Map();
	for (const note of notes) {
		const subject = note.subject?.trim() || "General";
		const chapter = note.chapter?.trim() || "General";
		const key = `${subject}::${chapter}`;
		if (!grouped.has(key)) grouped.set(key, {
			subject,
			chapter,
			notes: []
		});
		grouped.get(key).notes.push(note);
	}
	return Array.from(grouped.values()).sort((a, b) => {
		if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
		return a.chapter.localeCompare(b.chapter);
	});
}
//#endregion
//#region src/routes/notes.tsx
var Route$22 = createFileRoute("/notes")({
	head: () => ({ meta: [
		{ title: "Notes Library — Revision PDFs & Images" },
		{
			name: "description",
			content: "Upload, organise and read revision notes as PDFs or images, sorted by subject and chapter, entirely offline."
		},
		{
			property: "og:title",
			content: "Notes Library — Revision PDFs & Images"
		},
		{
			property: "og:description",
			content: "Subject and chapter wise revision notes with a built-in PDF and image viewer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: NotesLibrary
});
var OK_IMAGE = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp",
	"image/gif"
];
function NotesLibrary() {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [subject, setSubject] = (0, import_react.useState)(SUBJECTS$2[0]);
	const [chapter, setChapter] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [fSubject, setFSubject] = (0, import_react.useState)("all");
	const [fChapter, setFChapter] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)(null);
	const [activeGroupKey, setActiveGroupKey] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const notes = useQuery({
		queryKey: ["library-notes"],
		queryFn: listLibraryNotes
	}).data ?? [];
	const chapters = (0, import_react.useMemo)(() => [...new Set(notes.map((n) => n.chapter).filter(Boolean))].sort(), [notes]);
	const chapterGroups = (0, import_react.useMemo)(() => groupLibraryNotesBySubjectAndChapter(notes), [notes]);
	const filteredGroups = (0, import_react.useMemo)(() => {
		const s = search.trim().toLowerCase();
		return chapterGroups.filter((group) => {
			if (fSubject !== "all" && group.subject !== fSubject) return false;
			if (fChapter !== "all" && group.chapter !== fChapter) return false;
			if (!s) return true;
			return `${group.subject} ${group.chapter}`.toLowerCase().includes(s) || group.notes.some((note) => `${note.title} ${note.name}`.toLowerCase().includes(s));
		});
	}, [
		chapterGroups,
		fSubject,
		fChapter,
		search
	]);
	const selectedGroup = (0, import_react.useMemo)(() => {
		if (!activeGroupKey) return null;
		return chapterGroups.find((group) => `${group.subject}::${group.chapter}` === activeGroupKey) ?? null;
	}, [activeGroupKey, chapterGroups]);
	(0, import_react.useEffect)(() => {
		if (!search.trim().toLowerCase()) {
			setActiveGroupKey(null);
			return;
		}
		const match = filteredGroups[0];
		if (match) setActiveGroupKey(`${match.subject}::${match.chapter}`);
	}, [filteredGroups, search]);
	const upload = async (files) => {
		const valid = files.filter((f) => f.type === "application/pdf" || OK_IMAGE.includes(f.type));
		if (valid.length === 0) {
			toast.error("Upload a PDF or an image (PNG, JPG, WEBP)");
			return;
		}
		setBusy(true);
		try {
			for (const f of valid) await putLibraryNote({
				id: uid("note"),
				title: f.name.replace(/\.[^.]+$/, ""),
				subject,
				chapter: chapter.trim() || "General",
				kind: f.type === "application/pdf" ? "pdf" : "image",
				name: f.name,
				type: f.type,
				size: f.size,
				blob: f,
				createdAt: Date.now()
			});
			qc.invalidateQueries({ queryKey: ["library-notes"] });
			toast.success(`${valid.length} note(s) added to ${subject} · ${chapter.trim() || "General"}`);
		} finally {
			setBusy(false);
		}
	};
	const remove = async (n) => {
		if (!window.confirm(`Delete "${n.title}"?`)) return;
		await deleteLibraryNote(n.id);
		qc.invalidateQueries({ queryKey: ["library-notes"] });
		toast.success("Note deleted");
	};
	const downloadNote = (n) => {
		const url = URL.createObjectURL(n.blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = n.name;
		link.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold tracking-tight",
				children: "Notes Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Revision material only — PDFs and note images organised by subject and chapter. Kept fully separate from the question bank and CBT engine."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
									children: "Subject"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: subject,
									onChange: (e) => setSubject(e.target.value),
									className: "w-full rounded-lg border bg-background px-2 py-1.5 text-sm",
									children: [...new Set([...SUBJECTS$2, ...notes.map((n) => n.subject)])].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
										children: "Chapter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: chapter,
										onChange: (e) => setChapter(e.target.value),
										placeholder: "e.g. Rotational Motion",
										list: "note-chapters",
										className: "w-full rounded-lg border bg-background px-2 py-1.5 text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: "note-chapters",
										children: chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c }, c))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy,
									onClick: () => fileRef.current?.click(),
									className: "inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
										" ",
										busy ? "Saving…" : "Upload notes"
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						multiple: true,
						accept: "application/pdf,image/png,image/jpeg,image/webp,image/gif",
						className: "hidden",
						onChange: (e) => {
							const files = Array.from(e.target.files ?? []);
							e.target.value = "";
							if (files.length) upload(files);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "PDF · PNG · JPG · WEBP — stored offline on this device, exactly as uploaded."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search notes by title, file name, subject or chapter…",
						className: "w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: fSubject,
						onChange: (e) => setFSubject(e.target.value),
						className: "rounded-lg border bg-background px-2 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All subjects"
						}), [...new Set(notes.map((n) => n.subject))].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: fChapter,
						onChange: (e) => setFChapter(e.target.value),
						className: "rounded-lg border bg-background px-2 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All chapters"
						}), chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					})]
				})]
			}),
			filteredGroups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
				children: "No notes yet — upload a PDF or a screenshot of your notes to start your revision library."
			}) : selectedGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-background/70 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: selectedGroup.chapter
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: selectedGroup.subject
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveGroupKey(null),
						className: "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }), " Back to library"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 md:grid-cols-2",
					children: selectedGroup.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-xl border bg-card p-3 shadow-sm transition-colors hover:border-primary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-9 shrink-0 place-items-center rounded-lg", n.kind === "pdf" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"),
							children: n.kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setView(n),
								className: "w-full text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold",
									children: n.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-[11px] text-muted-foreground",
									children: [
										n.name,
										" · ",
										(n.size / 1024).toFixed(0),
										" KB"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setView(n),
										className: "rounded border px-2 py-1 text-[11px] font-medium",
										children: "Open"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => downloadNote(n),
										className: "rounded border px-2 py-1 text-[11px] font-medium",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), " Download"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void remove(n),
										title: "Delete note",
										"aria-label": "Delete note",
										className: "rounded border border-destructive/40 px-2 py-1 text-[11px] font-medium text-destructive",
										children: "Delete"
									})
								]
							})]
						})]
					}, n.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: filteredGroups.map((group) => {
					const lastUpdated = new Date(Math.max(...group.notes.map((note) => note.createdAt))).toLocaleDateString();
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveGroupKey(`${group.subject}::${group.chapter}`),
						className: "flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: group.chapter
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: group.subject
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground",
									children: [
										group.notes.length,
										" note",
										group.notes.length === 1 ? "" : "s"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-center justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Updated ", lastUpdated] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: "Open"
							})]
						})]
					}, `${group.subject}-${group.chapter}`);
				})
			})
		]
	}), view && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteViewer, {
		note: view,
		onClose: () => setView(null),
		chapterNotes: selectedGroup?.notes ?? [],
		onNavigate: setView
	})] });
}
function NoteViewer({ note, onClose, chapterNotes = [], onNavigate }) {
	const shellRef = (0, import_react.useRef)(null);
	const viewerRef = (0, import_react.useRef)(null);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [displayMode, setDisplayMode] = (0, import_react.useState)("fit-width");
	const [page, setPage] = (0, import_react.useState)(1);
	const [viewerSize, setViewerSize] = (0, import_react.useState)({
		width: 0,
		height: 0
	});
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const zoomRef = (0, import_react.useRef)(1);
	zoomRef.current = zoom;
	const url = useQuery({
		queryKey: ["library-note-url", note.id],
		queryFn: () => libraryNoteUrl(note.id)
	}).data;
	const currentIndex = chapterNotes.findIndex((item) => item.id === note.id);
	const canGoPrev = currentIndex > 0;
	const canGoNext = currentIndex >= 0 && currentIndex < chapterNotes.length - 1;
	const zoomPresets = [
		.25,
		.5,
		.75,
		1,
		1.25,
		1.5,
		1.75,
		1.9,
		2,
		2.5,
		3,
		4,
		5,
		8
	];
	(0, import_react.useEffect)(() => {
		setPage(1);
		setDisplayMode("fit-width");
		setZoom(1);
	}, [note.id]);
	(0, import_react.useEffect)(() => {
		if (!viewerRef.current) return;
		const updateViewerSize = () => {
			if (!viewerRef.current) return;
			const rect = viewerRef.current.getBoundingClientRect();
			setViewerSize({
				width: rect.width - 24,
				height: rect.height - 24
			});
		};
		updateViewerSize();
		const observer = new ResizeObserver(updateViewerSize);
		observer.observe(viewerRef.current);
		window.addEventListener("resize", updateViewerSize);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateViewerSize);
		};
	}, [note.id, isFullscreen]);
	(0, import_react.useEffect)(() => {
		if (!viewerSize.width) return;
		if (displayMode === "fit-width") setZoom(Math.max(.25, Math.min(8, viewerSize.width / 816)));
		else if (displayMode === "fit-page") setZoom(Math.max(.25, Math.min(8, Math.min(viewerSize.width / 816, viewerSize.height / 1056))));
	}, [
		displayMode,
		viewerSize.height,
		viewerSize.width
	]);
	(0, import_react.useEffect)(() => {
		const onFullscreenChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement));
		};
		const onKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "=")) {
				event.preventDefault();
				setDisplayMode("actual-size");
				setZoom((value) => Math.min(8, Number((value + .1).toFixed(2))));
			}
			if ((event.ctrlKey || event.metaKey) && event.key === "-") {
				event.preventDefault();
				setDisplayMode("actual-size");
				setZoom((value) => Math.max(.25, Number((value - .1).toFixed(2))));
			}
			if ((event.ctrlKey || event.metaKey) && event.key === "0") {
				event.preventDefault();
				setDisplayMode("actual-size");
				setZoom(1);
			}
			if (event.key === "Escape" && document.fullscreenElement) {
				event.preventDefault();
				document.exitFullscreen();
				setIsFullscreen(false);
			}
			if (event.key === "ArrowLeft" && canGoPrev && onNavigate) {
				event.preventDefault();
				onNavigate(chapterNotes[currentIndex - 1]);
			}
			if (event.key === "ArrowRight" && canGoNext && onNavigate) {
				event.preventDefault();
				onNavigate(chapterNotes[currentIndex + 1]);
			}
			if (event.key === "PageUp") {
				event.preventDefault();
				viewerRef.current?.scrollBy({
					top: -400,
					behavior: "smooth"
				});
			}
			if (event.key === "PageDown") {
				event.preventDefault();
				viewerRef.current?.scrollBy({
					top: 400,
					behavior: "smooth"
				});
			}
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("fullscreenchange", onFullscreenChange);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [
		canGoNext,
		canGoPrev,
		chapterNotes,
		currentIndex,
		note.id,
		onNavigate
	]);
	const applyZoom = (next) => {
		setDisplayMode("actual-size");
		setZoom(Math.min(8, Math.max(.25, Number(next.toFixed(3)))));
	};
	/**
	* Cursor-anchored, delta-proportional zoom. Kept in a ref so the native
	* non-passive wheel listener below never reads stale state.
	*/
	const wheelZoom = (event) => {
		const el = viewerRef.current;
		if (!el) return;
		const dy = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
		const current = zoomRef.current;
		const next = Math.min(8, Math.max(.25, current * Math.exp(-dy * .0018)));
		if (next === current) return;
		const rect = el.getBoundingClientRect();
		const px = event.clientX - rect.left + el.scrollLeft;
		const py = event.clientY - rect.top + el.scrollTop;
		const k = next / current;
		setDisplayMode("actual-size");
		setZoom(next);
		requestAnimationFrame(() => {
			const node = viewerRef.current;
			if (!node) return;
			node.scrollLeft += px * (k - 1);
			node.scrollTop += py * (k - 1);
		});
	};
	const wheelRef = (0, import_react.useRef)(wheelZoom);
	wheelRef.current = wheelZoom;
	(0, import_react.useEffect)(() => {
		const el = viewerRef.current;
		if (!el) return;
		const onWheel = (event) => {
			if (!(event.ctrlKey || event.metaKey)) return;
			event.preventDefault();
			wheelRef.current(event);
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [
		note.id,
		isFullscreen,
		url
	]);
	const setViewMode = (mode) => {
		setDisplayMode(mode);
	};
	const toggleFullscreen = async () => {
		const el = shellRef.current;
		if (!el) return;
		if (document.fullscreenElement) {
			await document.exitFullscreen();
			setIsFullscreen(false);
		} else await el.requestFullscreen?.();
	};
	const zoomLabel = displayMode === "fit-width" ? "Fit Width" : displayMode === "fit-page" ? "Fit Page" : `${Math.round(zoom * 100)}%`;
	const pdfZoomParam = displayMode === "fit-width" ? "page-width" : displayMode === "fit-page" ? "page-fit" : `${Math.round(zoom * 100)}`;
	const pdfSrc = url ? `${url}#page=${page}&toolbar=0&navpanes=0&zoom=${encodeURIComponent(pdfZoomParam)}` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: cn("fixed inset-0 z-50 flex flex-col bg-black/80 p-2 sm:p-6", isFullscreen && "bg-black p-0 sm:p-0"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mb-2 flex items-center gap-2 text-sm text-white", isFullscreen && "justify-end"),
			children: [!isFullscreen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1 truncate font-semibold",
				children: [
					note.title,
					" — ",
					note.subject,
					" · ",
					note.chapter
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					chapterNotes.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canGoPrev,
						onClick: () => onNavigate?.(chapterNotes[currentIndex - 1]),
						"aria-label": "Previous note",
						title: "Previous note",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20 disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canGoNext,
						onClick: () => onNavigate?.(chapterNotes[currentIndex + 1]),
						"aria-label": "Next note",
						title: "Next note",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20 disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => applyZoom(zoom - .1),
						"aria-label": "Zoom out",
						title: "Zoom out",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: displayMode === "actual-size" ? `${Math.round(zoom * 100)}%` : displayMode,
						onChange: (event) => {
							const value = event.target.value;
							if (value === "fit-width") setViewMode("fit-width");
							else if (value === "fit-page") setViewMode("fit-page");
							else if (value === "actual-size") setViewMode("actual-size");
							else applyZoom(Number(value) / 100);
						},
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fit-width",
								children: "Fit Width"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fit-page",
								children: "Fit Page"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "actual-size",
								children: "Actual Size"
							}),
							zoomPresets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: Math.round(preset * 100),
								children: [Math.round(preset * 100), "%"]
							}, preset))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => applyZoom(zoom + .1),
						"aria-label": "Zoom in",
						title: "Zoom in",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setViewMode("fit-width"),
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-medium",
						children: "Fit Width"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setViewMode("fit-page"),
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-medium",
						children: "Fit Page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setDisplayMode("actual-size");
							setZoom(1);
						},
						"aria-label": "Reset zoom",
						title: "Reset zoom",
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-semibold",
						children: zoomLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleFullscreen,
						"aria-label": isFullscreen ? "Exit full screen" : "Full screen",
						title: isFullscreen ? "Exit full screen" : "Full screen",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close viewer",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: viewerRef,
			className: cn("flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-xl bg-card p-4", isFullscreen && "rounded-none p-2 sm:p-2"),
			children: !url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) : note.kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("embed", {
					src: pdfSrc,
					type: "application/pdf",
					title: note.title,
					className: "min-h-[75vh] w-full rounded-xl border-0 bg-white"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full items-start justify-center",
				style: {
					transform: `scale(${zoom})`,
					transformOrigin: "top center",
					width: `${100 / zoom}%`,
					minHeight: `${100 / zoom}%`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: note.title,
					className: "max-h-full max-w-full object-contain"
				})
			})
		})]
	});
}
//#endregion
//#region src/routes/practice.tsx
var Route$21 = createFileRoute("/practice")({
	head: () => ({ meta: [
		{ title: "Practice Mode — JEE CBT Platform" },
		{
			name: "description",
			content: "Quick chapter-wise and subject-wise practice sessions with difficulty filters and an instant timed runner."
		},
		{
			property: "og:title",
			content: "Practice Mode — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Spin up a focused practice set by subject, chapter and difficulty in one click."
		}
	] }),
	component: PracticePage
});
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
//#region src/routes/results.tsx
var Route$20 = createFileRoute("/results")({
	head: () => ({ meta: [
		{ title: "Test History — JEE CBT Platform" },
		{
			name: "description",
			content: "Permanent history of every submitted JEE mock: marks, percentage, accuracy, time taken, correct, wrong, unattempted and negative marks."
		},
		{
			property: "og:title",
			content: "Test History — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every completed attempt with full score, accuracy and timing breakdown."
		}
	] }),
	component: ResultsPage
});
function ResultsPage() {
	const qc = useQueryClient();
	const router = useRouter();
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const rows = [...reports.data ?? []].sort((a, b) => (b.attempt.submittedAt ?? b.attempt.updatedAt) - (a.attempt.submittedAt ?? a.attempt.updatedAt));
	const remove = async (id) => {
		await deleteAttempt(id);
		qc.invalidateQueries({ queryKey: ["reports"] });
		qc.invalidateQueries({ queryKey: ["attempts"] });
		qc.invalidateQueries({ queryKey: ["dashboardStats"] });
	};
	/** Starts the same paper again as a brand-new attempt; past attempts stay untouched. */
	const reattempt = async ({ attempt: a, questions }) => {
		if (questions.length === 0) return toast.error("Original questions are no longer available.");
		const fresh = await startAttempt(asTest(questions, a), {
			questions,
			durationMin: Math.round(a.durationSec / 60),
			name: a.testName,
			exam: a.exam,
			paper: a.paper,
			reattemptOf: a.id,
			strictMode: a.strictMode
		});
		qc.invalidateQueries({ queryKey: ["attempts"] });
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: fresh.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5" }), " Test History"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Every completed attempt is stored permanently on this device."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [
				reports.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Loading history…"
				}),
				!reports.isLoading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
					children: "No completed attempts yet. Submitted tests appear here automatically."
				}),
				rows.map((report) => {
					const { attempt: a, summary: s, questions } = report;
					const pct = s.maxScore ? s.score / s.maxScore * 100 : 0;
					const subjects = [...new Set(questions.map((q) => q.subject))];
					const chapters = [...new Set(questions.map((q) => q.chapter))];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/review/$attemptId",
										params: { attemptId: a.id },
										className: "truncate text-base font-semibold hover:underline",
										children: a.testName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											new Date(a.submittedAt ?? a.updatedAt).toLocaleString(),
											" · ",
											questions.length,
											" ",
											"questions · ",
											subjects.join(", ") || "—"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 truncate text-[11px] text-muted-foreground",
										children: [
											"Chapters: ",
											chapters.slice(0, 6).join(", "),
											chapters.length > 6 ? ` +${chapters.length - 6} more` : ""
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/review/$attemptId",
										params: { attemptId: a.id },
										className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
										children: "Full Test Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/result/$attemptId",
										params: { attemptId: a.id },
										className: "rounded-md border px-3 py-1.5 text-xs font-semibold",
										children: "Analysis"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => void reattempt(report),
										className: "flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Reattempt Test"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(a.id),
										className: "rounded-md border border-destructive/40 p-1.5 text-destructive",
										"aria-label": "Delete attempt",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Marks",
									value: `${s.score}/${s.maxScore}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Percentage",
									value: `${pct.toFixed(1)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Accuracy",
									value: `${s.accuracy.toFixed(1)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Correct",
									value: s.correct,
									tone: "good"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Wrong",
									value: s.wrong,
									tone: "bad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Not attempted",
									value: s.skipped
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Negative",
									value: s.negative,
									tone: "bad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
									label: "Time taken",
									value: formatClock(a.durationSec - a.remainingSec)
								})
							]
						})]
					}, a.id);
				})
			]
		})
	] });
}
function Cell({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-bold tabular-nums " + (tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : ""),
			children: value
		})]
	});
}
//#endregion
//#region src/components/ui/alert-dialog.tsx
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
//#endregion
//#region src/routes/resumes.tsx
var Route$19 = createFileRoute("/resumes")({
	head: () => ({ meta: [{ title: "Resume Tests — Continue unfinished mock attempts" }, {
		name: "description",
		content: "Manage resumed mock tests in one place and continue any unfinished attempt instantly."
	}] }),
	component: ResumeTestsPage
});
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
								children: STATUS_LABEL$1[attemptStatus(attempt)]
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
//#region src/routes/settings.tsx
var Route$18 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — JEE CBT Platform" },
		{
			name: "description",
			content: "Appearance, local storage usage and data management for your offline JEE CBT test platform."
		},
		{
			property: "og:title",
			content: "Settings — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Manage theme, stored tests, figures and attempt history."
		}
	] }),
	component: SettingsPage
});
function SettingsPage() {
	const { theme, toggle } = useTheme();
	const qc = useQueryClient();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const attempts = useQuery({
		queryKey: ["attempts"],
		queryFn: listAttempts
	});
	const images = useQuery({
		queryKey: ["imageCount"],
		queryFn: countImages
	});
	const [requireXpForErrorJournal, setRequireXpForErrorJournalState] = (0, import_react.useState)(() => typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true);
	(0, import_react.useEffect)(() => {
		setRequireXpForErrorJournalState(typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true);
	}, []);
	const refresh = () => Promise.all([
		qc.invalidateQueries({ queryKey: ["tests"] }),
		qc.invalidateQueries({ queryKey: ["attempts"] }),
		qc.invalidateQueries({ queryKey: ["reports"] }),
		qc.invalidateQueries({ queryKey: ["images"] }),
		qc.invalidateQueries({ queryKey: ["imageCount"] })
	]);
	const clearAttempts = async () => {
		if (!confirm("Delete all attempt history? Question banks are kept.")) return;
		for (const a of attempts.data ?? []) await deleteAttempt(a.id);
		await refresh();
		toast.success("Attempt history cleared");
	};
	const clearAll = async () => {
		if (!confirm("Delete every test, figure and attempt stored on this device?")) return;
		for (const a of attempts.data ?? []) await deleteAttempt(a.id);
		for (const t of tests.data ?? []) await deleteTest(t.id);
		await refresh();
		toast.success("All local data deleted");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" }), " Settings"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold uppercase tracking-wide",
				children: "Appearance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: toggle,
				className: "mt-3 inline-flex items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm font-semibold",
				children: [
					theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }),
					"Switch to ",
					theme === "dark" ? "light" : "dark",
					" mode"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold uppercase tracking-wide",
				children: "Error Journal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between gap-3 rounded-lg border bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Require XP to add Error Journal entries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: requireXpForErrorJournal ? "Costs 20 XP" : "Free"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						const next = !requireXpForErrorJournal;
						setRequireXpForErrorJournal(next);
						setRequireXpForErrorJournalState(next);
					},
					"aria-pressed": requireXpForErrorJournal,
					className: cn("relative inline-flex h-7 w-12 items-center rounded-full border transition-colors", requireXpForErrorJournal ? "bg-primary" : "bg-muted"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block h-5 w-5 rounded-full bg-white transition-transform", requireXpForErrorJournal ? "translate-x-6" : "translate-x-1") })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-bold uppercase tracking-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-4" }), " Local storage"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
							label: "Test sets",
							value: tests.data?.length ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
							label: "Questions",
							value: (tests.data ?? []).reduce((a, t) => a + t.questionCount, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
							label: "Figures",
							value: images.data ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$2, {
							label: "Attempts",
							value: attempts.data?.length ?? 0
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Everything is stored offline in this browser (IndexedDB). Clearing browser data removes it."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl border border-destructive/40 bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold uppercase tracking-wide text-destructive",
				children: "Danger zone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Danger, {
					onClick: clearAttempts,
					children: "Clear attempt history"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Danger, {
					onClick: clearAll,
					children: "Delete all data"
				})]
			})]
		})
	] });
}
function Stat$2({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground",
			children: label
		})]
	});
}
function Danger({ children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("inline-flex items-center gap-2 rounded-lg border border-destructive/50 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
			" ",
			children
		]
	});
}
//#endregion
//#region src/routes/sitemap[.]xml.ts
var BASE_URL = "";
var Route$17 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/bank",
				changefreq: "weekly",
				priority: "0.8"
			},
			{
				path: "/import",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/create",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/results",
				changefreq: "weekly",
				priority: "0.6"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routes/xp.tsx
var Route$16 = createFileRoute("/xp")({
	head: () => ({ meta: [{ title: "XP History — JEE CBT Platform" }, {
		name: "description",
		content: "Track your JEE CBT XP, weekly cycle progress, and every earn/spend transaction."
	}] }),
	component: XpPage
});
function XpPage() {
	const state = getXpState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-5 text-primary" }), " XP Overview"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Correct answers earn +4 XP. Error Journal entries cost 20 XP."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "Total XP",
					value: `${state.balance.toLocaleString()} XP`,
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "This week",
					value: formatXp(state.weeklyEarned),
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat$1, {
					label: "Spent this week",
					value: formatXp(-state.weeklySpent),
					tone: "bad"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "7-Day Cycle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: xpCycleLabel()
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cycle starts" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: new Date(state.cycleStart).toLocaleDateString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(state.cycleEnd).toLocaleDateString() })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-bold",
				children: "Transaction history"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [state.transactions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground",
					children: "No XP transactions yet."
				}), state.transactions.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 rounded-xl border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: tx.type === "earn" ? "text-success" : "text-destructive",
									children: tx.type === "earn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [
										tx.type === "earn" ? "+" : "-",
										tx.amount,
										" XP"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: tx.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-muted-foreground",
								children: [
									tx.source,
									" · ",
									new Date(tx.timestamp).toLocaleString()
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: tx.type === "earn" ? "text-success" : "text-destructive",
						children: tx.type === "earn" ? "Earn" : "Spend"
					})]
				}, tx.id))]
			})]
		})
	] });
}
function Stat$1({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-xl font-bold " + (tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : ""),
			children: value
		})]
	});
}
//#endregion
//#region src/lib/advanced-start.ts
/** Wraps an arbitrary set of questions into a throwaway TestSet and starts it. */
async function startAdvancedTest(opts) {
	return startAttempt({
		id: uid("advtest"),
		name: opts.name,
		subjects: [...new Set(opts.questions.map((q) => q.subject))],
		chapters: [...new Set(opts.questions.map((q) => q.chapter))],
		questionCount: opts.questions.length,
		imageCount: 0,
		missingImages: 0,
		importedAt: Date.now(),
		updatedAt: Date.now(),
		source: "custom",
		exam: "advanced",
		paper: opts.paper,
		durationMin: opts.durationMin,
		status: "valid",
		issues: [],
		questions: opts.questions
	}, {
		questions: opts.questions,
		durationMin: opts.durationMin,
		name: opts.name,
		exam: "advanced",
		paper: opts.paper,
		paperGroupId: opts.paperGroupId,
		reattemptOf: opts.reattemptOf,
		strictMode: opts.strictMode
	});
}
//#endregion
//#region src/routes/advanced.index.tsx
var Route$15 = createFileRoute("/advanced/")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Overview — Paper 1 & Paper 2 Tests" },
		{
			name: "description",
			content: "Start a JEE Advanced full test (Paper 1 + Paper 2), single-paper test, resume drafts or re-attempt past papers."
		},
		{
			property: "og:title",
			content: "JEE Advanced Overview — Paper 1 & Paper 2 Tests"
		},
		{
			property: "og:description",
			content: "Full test, Paper 1, Paper 2, resume management and re-attempts."
		}
	] }),
	component: AdvancedHome
});
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
//#region src/routes/advanced.analytics.tsx
var Route$14 = createFileRoute("/advanced/analytics")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Analytics — Subject & Chapter Performance" },
		{
			name: "description",
			content: "Separate JEE Advanced analytics: subject, chapter, difficulty and paper-wise accuracy plus score trend."
		},
		{
			property: "og:title",
			content: "JEE Advanced Analytics"
		},
		{
			property: "og:description",
			content: "Subject, chapter, difficulty and paper-wise Advanced performance breakdowns."
		}
	] }),
	component: AdvancedAnalytics
});
function Bar({ label, correct, total }) {
	const pct = total ? correct / total * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted-foreground",
			children: [
				correct,
				"/",
				total,
				" · ",
				pct.toFixed(0),
				"%"
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-2 rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2 rounded-full bg-primary",
			style: { width: `${pct}%` }
		})
	})] });
}
function AdvancedAnalytics() {
	const { data } = useQuery({
		queryKey: ["adv", "analytics"],
		queryFn: async () => {
			const attempts = (await listAttempts()).filter((a) => isAdvancedAttempt(a) && a.submitted);
			return Promise.all(attempts.map(buildReport));
		}
	});
	const agg = (0, import_react.useMemo)(() => {
		const subject = /* @__PURE__ */ new Map();
		const chapter = /* @__PURE__ */ new Map();
		const difficulty = /* @__PURE__ */ new Map();
		const paper = /* @__PURE__ */ new Map();
		let score = 0;
		let correct = 0;
		let attempted = 0;
		for (const r of data ?? []) {
			score += r.summary.score;
			for (const q of r.questions) {
				const ans = r.attempt.answers[q.id];
				if (ans?.value == null || String(ans.value).length === 0) continue;
				const ok = isCorrect(q, ans.value);
				attempted += 1;
				if (ok) correct += 1;
				for (const [map, key] of [
					[subject, q.subject],
					[chapter, `${q.subject} · ${q.chapter}`],
					[difficulty, q.difficulty],
					[paper, `Paper ${r.attempt.paper ?? 1}`]
				]) {
					const b = map.get(key) ?? {
						correct: 0,
						total: 0
					};
					b.total += 1;
					if (ok) b.correct += 1;
					map.set(key, b);
				}
			}
		}
		const sort = (m) => [...m.entries()].sort((a, b) => b[1].total - a[1].total);
		return {
			subject: sort(subject),
			chapter: sort(chapter),
			difficulty: sort(difficulty),
			paper: sort(paper),
			score,
			accuracy: attempted ? correct / attempted * 100 : 0,
			tests: (data ?? []).length
		};
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Advanced Analytics",
		subtitle: "Performance across your JEE Advanced tests only — Main analytics stay separate.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				["Tests taken", agg.tests],
				["Total marks", agg.score],
				["Accuracy", `${agg.accuracy.toFixed(1)}%`]
			].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase text-muted-foreground",
					children: l
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-2xl font-bold",
					children: v
				})]
			}, l))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-4 lg:grid-cols-2",
			children: [
				["Subject-wise", agg.subject],
				["Paper-wise", agg.paper],
				["Difficulty-wise", agg.difficulty],
				["Chapter-wise", agg.chapter.slice(0, 25)]
			].map(([title, rows]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold uppercase tracking-wide",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3",
					children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No data yet."
					}), rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: k,
						correct: v.correct,
						total: v.total
					}, k))]
				})]
			}, title))
		})]
	});
}
//#endregion
//#region src/routes/advanced.bank.tsx
var Route$13 = createFileRoute("/advanced/bank")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Question Bank — Chapter & Topic Browser" },
		{
			name: "description",
			content: "Search and browse the full JEE Advanced question bank by subject, chapter, topic, paper and year — built to stay fast with 100k+ questions."
		},
		{
			property: "og:title",
			content: "JEE Advanced Question Bank"
		},
		{
			property: "og:description",
			content: "Fast search across the entire Advanced bank with chapter and topic filters."
		}
	] }),
	component: AdvancedBank
});
var PAGE = 40;
function AdvancedBank() {
	const { data } = useQuery({
		queryKey: ["adv", "ctx"],
		queryFn: advancedContext
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)(null);
	const [chapter, setChapter] = (0, import_react.useState)(null);
	const [chapterSearch, setChapterSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const filters = (0, import_react.useMemo)(() => ({
		search,
		subjects: subject ? [subject] : void 0,
		chapters: chapter ? [chapter] : void 0
	}), [
		search,
		subject,
		chapter
	]);
	const results = (0, import_react.useMemo)(() => data ? filterAdvanced(data.index, filters, data.history) : [], [data, filters]);
	const chapters = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const it of data?.pool ?? []) {
			if (subject && it.q.subject !== subject) continue;
			m.set(it.q.chapter || "General", (m.get(it.q.chapter || "General") ?? 0) + 1);
		}
		return [...m.entries()].sort((a, b) => b[1] - a[1]);
	}, [data, subject]);
	const shown = results.slice(0, page * PAGE);
	const visibleChapters = (0, import_react.useMemo)(() => {
		const term = chapterSearch.trim().toLowerCase();
		return chapters.filter(([name]) => name.toLowerCase().includes(term));
	}, [chapters, chapterSearch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Advanced Question Bank",
		subtitle: "Only JEE Advanced sets are shown here. Your JEE Main bank stays exactly as it is.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: search,
				onChange: (e) => {
					setSearch(e.target.value);
					setPage(1);
				},
				placeholder: "Search questions, chapters, topics…",
				className: "min-w-[220px] flex-1 rounded-lg border bg-background px-3 py-2 text-sm"
			}), [null, ...data?.index.subjects ?? []].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					setSubject(s);
					setChapter(null);
					setPage(1);
				},
				className: cn("rounded-full border px-3 py-1.5 text-xs font-semibold", subject === s ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: s ?? "All subjects"
			}, String(s)))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-[240px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-fit rounded-xl border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-bold uppercase text-muted-foreground",
						children: "Chapters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: chapterSearch,
							onChange: (e) => setChapterSearch(e.target.value),
							placeholder: "Search chapter...",
							className: "w-full rounded-lg border bg-surface py-2 pr-3 pl-9 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "scroll-slim mt-2 max-h-[520px] space-y-1 overflow-y-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setChapter(null),
							className: cn("w-full rounded-md px-2 py-1.5 text-left text-xs", chapter === null ? "bg-primary text-primary-foreground" : "hover:bg-accent"),
							children: "All chapters"
						}), visibleChapters.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-2 text-xs text-muted-foreground",
							children: "No chapters found"
						}) : visibleChapters.map(([c, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setChapter(c);
								setPage(1);
							},
							className: cn("flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs", chapter === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: c
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "opacity-70",
								children: n
							})]
						}, c))]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						results.length,
						" question(s) · showing ",
						shown.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: shown.map(({ q, paper, year, test }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-primary/10 px-1.5 py-0.5 text-primary",
									children: ["Paper ", paper]
								}),
								year && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: q.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: q.chapter
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: QUESTION_TYPE_LABEL[q.type]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded border px-1.5 py-0.5",
									children: q.difficulty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate opacity-60",
									children: test.name
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 line-clamp-3 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: q.text })
						})]
					}, q.id))
				}),
				shown.length < results.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPage((p) => p + 1),
					className: "mt-3 w-full rounded-lg border py-2 text-sm font-semibold",
					children: "Load more"
				})
			] })]
		})]
	});
}
//#endregion
//#region src/lib/blocks.ts
var LABEL = String.raw`Assertion|Reason|Statements?\s*(?:IV|I{1,3}|[1-4]|[A-D])\b|Paragraph|Case\s*Study|Comprehension|Passage|Directions?|Column\s*(?:I{1,2})|List\s*(?:I{1,2})|Given|To\s*Find|Note`;
/**
* Lead-in phrases that introduce the answer choices of a statement-based
* question. Splitting before them puts the choices lead-in in its own block so
* it gets the same spacing as the statements above it.
*/
var TAIL_RE = /In\s+(?:the\s+)?light\s+of\s+the\s+above|Choose\s+the\s+(?:correct|most)|Which\s+of\s+the\s+(?:above|following)\s+(?:is|are|statements?)|In\s+respect\s+of\s+the\s+above/i;
/** Splits a chunk once, right before the answer-choices lead-in. */
function splitTail(chunk) {
	const m = TAIL_RE.exec(chunk);
	if (!m || m.index <= 0) return [chunk];
	return [chunk.slice(0, m.index), chunk.slice(m.index)];
}
/** e.g. "Assertion (A):", "Reason (R) -", "Passage:" at the start of a chunk */
var HEAD_RE = new RegExp(String.raw`^\s*((?:${LABEL})\s*(?:\([^)\n]{1,12}\))?)\s*[:\-–—.]\s*`, "i");
/** split point right before a known section label */
var SPLIT_RE = new RegExp(String.raw`(?=(?:${LABEL})\s*(?:\([^)\n]{1,12}\))?\s*[:\-–—])`, "gi");
/** generic "Some Heading:" line followed by its own content */
var GENERIC_HEAD_RE = /^\s*([A-Z][A-Za-z ]{2,28})\s*:\s*(?=\S)/;
function chunkToBlock(chunk) {
	const raw = chunk.replace(/^\s+|\s+$/g, "");
	if (!raw) return null;
	const known = HEAD_RE.exec(raw);
	if (known) {
		const body = raw.slice(known[0].length).trim();
		return {
			heading: known[1].replace(/\s+/g, " ").trim(),
			body
		};
	}
	return { body: raw };
}
/**
* Splits text into logical blocks. Returns a single unlabelled block when no
* section structure is detected (the overwhelmingly common case), so existing
* questions render byte-for-byte as before.
*/
function splitBlocks(input) {
	const src = String(input ?? "");
	if (!src.trim()) return [{ body: src }];
	const out = [];
	for (const para of src.split(/\n\s*\n+/)) {
		if (!para.trim()) continue;
		const pieces = para.split(SPLIT_RE).flatMap(splitTail);
		for (const piece of pieces) {
			const block = chunkToBlock(piece);
			if (!block) continue;
			if (!block.heading) {
				const generic = GENERIC_HEAD_RE.exec(block.body);
				if (generic && block.body.length > generic[0].length + 8) {
					out.push({
						heading: generic[1].trim(),
						body: block.body.slice(generic[0].length).trim()
					});
					continue;
				}
			}
			out.push(block);
		}
	}
	if (out.length === 0) return [{ body: src }];
	return out;
}
/**
* True when the author deliberately formatted the text themselves — blank
* lines, leading indentation on a line, or runs of 2+ spaces. Such text must be
* rendered verbatim instead of being re-flowed by the automatic block splitter.
*/
function hasManualFormatting(input) {
	const src = String(input ?? "");
	if (!src) return false;
	return /\n[ \t]*\n/.test(src) || /(^|\n)[ \t]+\S/.test(src) || /\S[ \t]{2,}\S/.test(src);
}
//#endregion
//#region src/components/MathBlocks.tsx
/**
* Renders text with automatically detected logical sections (Assertion, Reason,
* Paragraph, Passage, Case Study, Comprehension, "Heading: content" …) using the
* question's existing spacing configuration.
*
* Manual formatting always wins: when the author typed blank lines, indentation
* or intentional multi-space runs, the text is rendered verbatim (whitespace
* preserved) instead of being re-flowed. Section headings are still labelled
* when they are detected, but nothing inside a block is collapsed.
*
* Falls back to a plain <MathText> when no section structure is present, so
* existing questions render exactly as before.
*/
var MathBlocks = (0, import_react.memo)(function MathBlocks({ children, className, gap = 12, style }) {
	const src = children ?? "";
	const blocks = (0, import_react.useMemo)(() => splitBlocks(src), [src]);
	const manual = (0, import_react.useMemo)(() => hasManualFormatting(src), [src]);
	const structured = blocks.length > 1 || Boolean(blocks[0]?.heading);
	const labelled = blocks.some((b) => b.heading);
	if (!structured || manual && !labelled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
		className,
		preserveWhitespace: manual,
		style,
		children: src
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col",
		style: { rowGap: gap },
		children: blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: b.heading ? "pl-3" : void 0,
			children: [b.heading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mb-1 text-[11px] font-semibold uppercase text-muted-foreground"),
				children: b.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
				className,
				preserveWhitespace: manual,
				style,
				children: b.body
			})]
		}, i))
	});
});
//#endregion
//#region src/components/QuestionView.tsx
function QuestionView({ question, value, onChange, readOnly = false, showAnswer = false, fontScale = 1 }) {
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const selected = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];
	const ids = (0, import_react.useMemo)(() => optionIds(question), [question]);
	const multi = isMultiCorrect(question);
	const toggle = (id) => {
		if (readOnly || !onChange) return;
		if (multi) {
			const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
			onChange(next.length ? next : []);
		} else onChange(selected.length === 1 && selected[0] === id ? [] : [id]);
	};
	const sp = question.spacing ?? {};
	/** an uploaded question image with no typed statement renders as the stem */
	const stemImage = !question.text?.trim() && question.images.length > 0;
	/** image-only question whose options live inside the image — offer A–D choices */
	const imageOnlyChoices = stemImage && !question.matrix && question.type !== "integer" && question.type !== "numerical" ? question.options.length < 2 : false;
	const fallbackOptions = [
		"A",
		"B",
		"C",
		"D"
	];
	const scale = Math.min(1.5, Math.max(.8, fontScale));
	const size = (base) => `${Math.round(base * scale)}px`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		style: { rowGap: sp.block ?? 20 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-[11px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.subject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.chapter }),
					question.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.topic }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: multi ? "Multiple Correct" : QUESTION_TYPE_LABEL[question.type] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.difficulty }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						tone: "good",
						children: ["+", question.marks]
					}),
					question.negative > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						tone: "bad",
						children: ["−", question.negative]
					})
				]
			}),
			question.paragraph && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border-l-4 border-primary bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 text-xs font-semibold text-muted-foreground uppercase",
					children: "Paragraph"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
					className: "text-sm",
					gap: sp.block ?? 20,
					children: question.paragraph
				})]
			}),
			question.text?.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
				className: "font-medium",
				gap: sp.block ?? 20,
				style: { fontSize: size(15) },
				children: question.text
			}),
			question.tableHtml && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "math-content overflow-x-auto rounded-lg border [&_table]:w-full [&_td]:border [&_td]:px-3 [&_td]:py-1.5 [&_th]:border [&_th]:bg-surface [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left",
				dangerouslySetInnerHTML: { __html: question.tableHtml }
			}),
			question.images.length > 0 && (stemImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full space-y-3",
				children: question.images.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id,
						alt: `Q${question.number} question image ${i + 1}`,
						className: "block h-auto max-h-[350px] max-w-full w-auto rounded-none border-0 bg-transparent p-0 shadow-none object-contain object-left",
						onClick: () => setViewer(i)
					})
				}, id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: question.images.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
							id,
							alt: `Q${question.number} figure ${i + 1}`,
							className: "block h-auto max-h-[350px] max-w-full w-auto rounded-none border-0 bg-transparent p-0 shadow-none object-contain object-left",
							onClick: () => setViewer(i)
						})
					}, id))
				})
			})),
			question.matrix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixMatch, {
				question,
				selected,
				readOnly,
				onChange: (v) => onChange?.(v)
			}) : question.type === "integer" || question.type === "numerical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-xs font-semibold text-muted-foreground uppercase",
					children: "Your answer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					inputMode: "decimal",
					disabled: readOnly,
					value: Array.isArray(value) ? value[0] ?? "" : value ?? "",
					onChange: (e) => onChange?.(e.target.value.replace(/[^0-9.\-]/g, "")),
					placeholder: question.type === "integer" ? "Integer value" : "Numerical value",
					className: "w-full rounded-lg border bg-card px-3 py-2 font-mono outline-none focus:ring-2 focus:ring-ring",
					style: { fontSize: size(18) }
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid",
				style: { rowGap: sp.options ?? 8 },
				children: [multi && !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Select all correct options — tap again to deselect"
				}), (imageOnlyChoices ? fallbackOptions.map((id) => ({
					id,
					text: "",
					images: []
				})) : question.options).map((o, i) => {
					const oid = imageOnlyChoices ? fallbackOptions[i] : ids[i];
					const isSel = selected.includes(oid);
					const isRight = question.correct.map(String).includes(oid);
					const missed = showAnswer && isRight && !isSel;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: readOnly,
						"aria-pressed": isSel,
						onClick: () => toggle(oid),
						className: cn("flex items-start gap-3 rounded-lg border p-3 text-left transition-colors", !readOnly && "hover:border-primary/60 hover:bg-accent/40", isSel && "border-primary bg-primary/10", showAnswer && isRight && "border-success bg-success/10", showAnswer && isSel && !isRight && "border-destructive bg-destructive/10", missed && "border-dashed"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 grid size-6 shrink-0 place-items-center border text-xs font-bold", multi ? "rounded" : "rounded-full", isSel && "border-primary bg-primary text-primary-foreground", showAnswer && isRight && "border-success bg-success text-background"),
							children: oid
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								o.text?.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
									className: "min-w-0",
									style: { fontSize: size(14) },
									children: o.text
								}),
								(o.images?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 flex flex-wrap gap-2",
									children: o.images.map((imgId, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
										id: imgId,
										alt: `Option ${oid} image ${k + 1}`,
										className: "max-h-32 rounded-none border-0 bg-transparent p-0 shadow-none"
									}, imgId))
								}),
								showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 flex flex-wrap gap-1 text-[10px] font-bold uppercase",
									children: [
										isSel && isRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-success/15 px-1.5 py-0.5 text-success",
											children: "Selected · correct"
										}),
										isSel && !isRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-destructive/15 px-1.5 py-0.5 text-destructive",
											children: "Selected · wrong"
										}),
										missed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-warning/15 px-1.5 py-0.5 text-warning",
											children: "Missed correct option"
										})
									]
								})
							]
						})]
					}, oid);
				})]
			}),
			showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col rounded-lg border bg-surface p-4",
				style: { rowGap: sp.solution ?? 12 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold text-muted-foreground uppercase",
						children: "Correct answer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
						className: "font-semibold",
						style: { fontSize: size(14) },
						children: question.type === "integer" || question.type === "numerical" ? numericAnswerLabel(question) : question.matrix ? matrixAnswerLabel(question) : question.correct.join(", ") || "—"
					}),
					question.solution && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-xs font-semibold text-muted-foreground uppercase",
						children: "Solution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
						className: "",
						gap: sp.solution ?? 12,
						style: { fontSize: size(14) },
						children: question.solution
					})] }),
					question.explanation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-xs font-semibold text-muted-foreground uppercase",
						children: "Explanation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
						className: "",
						gap: sp.solution ?? 12,
						style: { fontSize: size(14) },
						children: question.explanation
					})] })
				]
			}),
			viewer !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer, {
				ids: question.images,
				startIndex: viewer,
				onClose: () => setViewer(null)
			})
		]
	});
}
function MatrixMatch({ question, selected, readOnly, onChange }) {
	const left = question.matrix?.left ?? [];
	const right = question.matrix?.right ?? [];
	const letters = right.map((_, i) => String.fromCharCode(65 + i));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: cn("w-full text-sm", question.matrix?.borders !== false && "[&_td]:border [&_th]:border"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-surface text-xs uppercase",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: { width: question.matrix?.leftWidth ?? void 0 },
					className: "px-3 py-2 text-left",
					children: "List I"
				}), letters.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-3 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
						as: "span",
						children: `${l}. ${right[i]}`
					})
				}, l))] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: left.map((item, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-3 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
						as: "span",
						children: `${r + 1}. ${item}`
					})
				}), letters.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-3 py-2 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						disabled: readOnly,
						checked: selected[r] === l,
						onChange: () => {
							const next = [...selected];
							next[r] = l;
							onChange(next);
						},
						className: "size-4 accent-[var(--primary)]"
					})
				}, l))]
			}, r)) })]
		})
	});
}
function Chip({ children, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full border px-2 py-0.5 font-medium", tone === "good" && "border-success/40 bg-success/10 text-success", tone === "bad" && "border-destructive/40 bg-destructive/10 text-destructive", !tone && "bg-surface text-muted-foreground"),
		children
	});
}
//#endregion
//#region src/components/review/ReviewList.tsx
var STATUS_LABEL = {
	all: "All",
	correct: "Correct",
	wrong: "Wrong",
	skipped: "Not Attempted",
	bookmarked: "Bookmarked"
};
var SUBJECT_ORDER = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
function answerText(q, value) {
	if (value === null || value === void 0) return "Not attempted";
	const v = Array.isArray(value) ? value.join(", ") : String(value);
	return v.trim() === "" ? "Not attempted" : v;
}
function correctText(q) {
	if (q.type === "integer" || q.type === "numerical") return numericAnswerLabel(q);
	return q.correct.join(", ") || "—";
}
var dotClass = (s) => s === "correct" ? "bg-answered text-answered-foreground" : s === "wrong" ? "bg-notanswered text-notanswered-foreground" : "bg-notvisited text-notvisited-foreground";
/**
* Single-page review list with a sticky question palette and combined
* status + subject filters. Used by Full Test Review, Wrong Notebook and Bookmarks.
*/
function ReviewList({ items, statuses = [
	"all",
	"correct",
	"wrong",
	"skipped",
	"bookmarked"
], paletteTitle = "Question Palette", emptyText = "No questions in this filter.", renderFooter, sources }) {
	const [status, setStatus] = (0, import_react.useState)("all");
	const [subject, setSubject] = (0, import_react.useState)("All");
	const nodes = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const subjects = (0, import_react.useMemo)(() => {
		return ["All", ...[...new Set(items.map((i) => i.question.subject))].sort((a, b) => SUBJECT_ORDER.indexOf(a) - SUBJECT_ORDER.indexOf(b))];
	}, [items]);
	const visible = (0, import_react.useMemo)(() => items.filter((i) => {
		const okSubject = subject === "All" || i.question.subject === subject;
		const okStatus = status === "all" ? true : status === "bookmarked" ? Boolean(i.answer?.bookmarked) : i.status === status;
		return okSubject && okStatus;
	}), [
		items,
		status,
		subject
	]);
	const jump = (id) => {
		const el = nodes.current.get(id);
		if (!el) return;
		el.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 order-2 lg:order-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: statuses.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStatus(f),
						className: cn("rounded-full border px-3 py-1 text-xs font-medium", status === f ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
						children: STATUS_LABEL[f]
					}, f))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1.5",
					children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSubject(s),
						className: cn("rounded-lg border px-3 py-1 text-xs font-semibold", subject === s ? "border-primary bg-primary/10 text-primary" : "bg-card"),
						children: s === "All" ? "All Subjects" : s
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						"Showing ",
						visible.length,
						" of ",
						items.length,
						" question",
						items.length === 1 ? "" : "s"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-4",
					children: [visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: emptyText
					}), visible.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						ref: (el) => {
							if (el) nodes.current.set(r.question.id, el);
							else nodes.current.delete(r.question.id);
						},
						className: "scroll-mt-20 rounded-2xl border bg-card p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-xs font-semibold text-muted-foreground",
										children: [
											"Q",
											r.question.number || i + 1,
											" · ",
											r.question.subject,
											" ·",
											" ",
											formatClock(r.answer?.timeSpent ?? 0),
											" spent"
										]
									}), sources?.[r.question.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/bank",
										search: {
											edit: sources[r.question.id].testId,
											q: r.question.id
										},
										title: "Open this question in the Question Bank",
										className: "mt-1 inline-flex max-w-full items-center gap-1 truncate text-[11px] font-medium text-primary underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: [
												sources[r.question.id].testName,
												" · Q",
												sources[r.question.id].number
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: ["Source set unavailable · ID ", r.question.id]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyQuestion, { question: r.question }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("rounded-full px-2.5 py-1 text-[11px] font-bold capitalize", dotClass(r.status)),
										children: [r.status === "skipped" ? "not attempted" : r.status, typeof r.score === "number" ? ` ${r.score > 0 ? `+${r.score}` : r.score}` : ""]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
								question: r.question,
								value: r.answer?.value ?? null,
								readOnly: true,
								showAnswer: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-2 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground",
										children: "Your answer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
										className: cn("text-sm font-semibold", r.status === "correct" && "text-success", r.status === "wrong" && "text-destructive"),
										children: answerText(r.question, r.answer?.value ?? null)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase text-muted-foreground",
										children: "Correct answer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
										className: "text-sm font-semibold text-success",
										children: correctText(r.question)
									})]
								})]
							}),
							renderFooter?.(r)
						]
					}, r.question.id))]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "order-1 lg:order-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-[70px] rounded-2xl border bg-card p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold uppercase tracking-wide",
						children: paletteTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-6 gap-1.5 lg:grid-cols-5",
						children: visible.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => jump(r.question.id),
							title: `${r.question.subject} · ${r.status}`,
							className: cn("grid h-8 place-items-center rounded-md text-xs font-bold", dotClass(r.status)),
							children: r.question.number || i + 1
						}, r.question.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-1 text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend$1, {
								cls: "bg-answered",
								label: "Correct"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend$1, {
								cls: "bg-notanswered",
								label: "Wrong"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend$1, {
								cls: "bg-notvisited",
								label: "Not attempted"
							})
						]
					})
				]
			})
		})]
	});
}
function Legend$1({ cls, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3 rounded", cls) }),
			" ",
			label
		]
	});
}
//#endregion
//#region src/routes/advanced.bookmarks.tsx
var Route$12 = createFileRoute("/advanced/bookmarks")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Bookmarks — Tagged Questions & Solutions" },
		{
			name: "description",
			content: "All bookmarked JEE Advanced questions with tags like Revision, Doubt, Important and Formula, plus full solutions."
		},
		{
			property: "og:title",
			content: "JEE Advanced Bookmarks"
		},
		{
			property: "og:description",
			content: "Tagged Advanced bookmarks with solutions and one-click revision tests."
		}
	] }),
	component: AdvancedBookmarks
});
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
//#region src/routes/advanced.history.tsx
var Route$11 = createFileRoute("/advanced/history")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Test History & Re-attempts" },
		{
			name: "description",
			content: "Every JEE Advanced test you have taken with score, accuracy, review and one-click re-attempt."
		},
		{
			property: "og:title",
			content: "JEE Advanced Test History"
		},
		{
			property: "og:description",
			content: "Scores, accuracy and re-attempts for all your Advanced papers."
		}
	] }),
	component: AdvancedHistory
});
function AdvancedHistory() {
	const router = useRouter();
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["adv", "history-list"],
		queryFn: async () => {
			const attempts = (await listAttempts()).filter(isAdvancedAttempt);
			return Promise.all(attempts.map(async (a) => ({
				a,
				report: a.submitted ? await buildReport(a) : null
			})));
		}
	});
	const del = useMutation({
		mutationFn: (id) => deleteAttempt(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["adv"] });
			qc.invalidateQueries({ queryKey: ["attempts"] });
			toast.success("Deleted");
		}
	});
	const reattempt = useMutation({
		mutationFn: async (a) => {
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
		onSuccess: (id) => router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: id }
		}),
		onError: (e) => toast.error(e.message)
	});
	const rows = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Previous Tests",
		subtitle: "All JEE Advanced attempts — in progress and completed.",
		children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl border bg-card p-6 text-sm text-muted-foreground",
			children: "No Advanced tests yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: rows.map(({ a, report }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[180px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: a.testName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								new Date(a.submittedAt ?? a.updatedAt).toLocaleString(),
								" · ",
								a.questionIds.length,
								" ",
								"questions",
								a.paper ? ` · Paper ${a.paper}` : ""
							]
						})]
					}),
					report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "text-base",
								children: report.summary.score
							}), " marks"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-status-answered",
								children: [report.summary.correct, " correct"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-destructive",
								children: [report.summary.wrong, " wrong"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [report.summary.accuracy.toFixed(1), "% accuracy"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase text-primary",
						children: "In progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [a.submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => router.navigate({
								to: "/result/$attemptId",
								params: { attemptId: a.id }
							}),
							className: "rounded-md border px-3 py-1.5 text-xs font-semibold",
							children: "Review"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => reattempt.mutate(a),
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
							children: "Re-attempt"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => router.navigate({
								to: "/test/$attemptId",
								params: { attemptId: a.id }
							}),
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
							children: "Resume"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => del.mutate(a.id),
							className: "rounded-md border px-3 py-1.5 text-xs font-semibold text-destructive",
							children: "Delete"
						})]
					})
				]
			}, a.id))
		})]
	});
}
//#endregion
//#region src/routes/advanced.import.tsx
var Route$10 = createFileRoute("/advanced/import")({
	head: () => ({ meta: [
		{ title: "Import JEE Advanced Papers — JSON & ZIP Sets" },
		{
			name: "description",
			content: "Import JEE Advanced question sets with images, answer keys and year/paper tags detected automatically."
		},
		{
			property: "og:title",
			content: "Import JEE Advanced Papers"
		},
		{
			property: "og:description",
			content: "Add Advanced sets with automatic Paper 1 / Paper 2 and year detection."
		}
	] }),
	component: AdvancedImport
});
function AdvancedImport() {
	const { data: tests } = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const sets = advancedTests(tests ?? []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Import Advanced Sets",
		subtitle: "Name your files like “JEE Advanced 2022 Paper 1” — the year and paper are detected automatically.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/import",
				className: "inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
				children: "Open importer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "In the importer, choose “Import into: Advanced” so the set joins this library."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-6 text-sm font-bold uppercase tracking-wide",
				children: [
					"Advanced sets (",
					sets.length,
					")"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2",
				children: [sets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[180px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								t.questionCount,
								" questions · ",
								t.imageCount,
								" images · Paper ",
								paperOf(t),
								yearOf(t) ? ` · ${yearOf(t)}` : ""
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: new Date(t.importedAt).toLocaleDateString()
					})]
				}, t.id)), sets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border bg-card p-6 text-sm text-muted-foreground",
					children: "No Advanced sets imported yet."
				})]
			})
		]
	});
}
//#endregion
//#region src/routes/advanced.practice.tsx
var Route$9 = createFileRoute("/advanced/practice")({
	head: () => ({ meta: [
		{ title: "Custom JEE Advanced Practice Test Generator" },
		{
			name: "description",
			content: "Build a custom JEE Advanced test by subject, chapter, topic, difficulty, question type, paper and year."
		},
		{
			property: "og:title",
			content: "Custom JEE Advanced Practice Test Generator"
		},
		{
			property: "og:description",
			content: "Filter by chapter, difficulty, type and year, then generate a timed test."
		}
	] }),
	component: AdvancedPractice
});
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
function Chips$1({ values, selected, onToggle, label, render }) {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips$1, {
						label: "Paper",
						values: [1, 2],
						selected: f.papers ?? [],
						onToggle: (v) => toggle("papers", v),
						render: (v) => `Paper ${v}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips$1, {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips$1, {
						label: "Topic",
						values: (idx?.topics ?? []).slice(0, 60),
						selected: f.topics ?? [],
						onToggle: (v) => toggle("topics", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips$1, {
						label: "Difficulty",
						values: [
							"Easy",
							"Medium",
							"Hard"
						],
						selected: f.difficulties ?? [],
						onToggle: (v) => toggle("difficulties", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips$1, {
						label: "Question type",
						values: idx?.types ?? [],
						selected: f.types ?? [],
						onToggle: (v) => toggle("types", v),
						render: (v) => QUESTION_TYPE_LABEL[v]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips$1, {
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
//#region src/routes/advanced.pyq.tsx
var Route$8 = createFileRoute("/advanced/pyq")({
	head: () => ({ meta: [
		{ title: "JEE Advanced PYQ — Year-wise Previous Year Papers" },
		{
			name: "description",
			content: "Practise JEE Advanced previous year questions year-wise and paper-wise, or attempt a full past paper in exam mode."
		},
		{
			property: "og:title",
			content: "JEE Advanced PYQ — Year-wise Previous Year Papers"
		},
		{
			property: "og:description",
			content: "Year-wise and paper-wise Advanced PYQ practice with full-paper exam mode."
		}
	] }),
	component: AdvancedPyq
});
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
//#region src/lib/nta-review.ts
var NTA_BOOKMARK_CATEGORIES = [
	"Revision",
	"Doubt",
	"Important",
	"Practice Again"
];
function isNtaBookmarkCategory(value) {
	return NTA_BOOKMARK_CATEGORIES.some((category) => category === value);
}
function addMarkedQuestionsToBookmarks(answers, questions, alreadyBookmarkedQuestionIds) {
	let nextAnswers = answers;
	for (const question of questions) {
		const answer = nextAnswers[question.id];
		if (!answer?.marked || answer.bookmarked || alreadyBookmarkedQuestionIds.has(question.id)) continue;
		if (nextAnswers === answers) nextAnswers = { ...answers };
		nextAnswers[question.id] = {
			...answer,
			bookmarked: true
		};
	}
	return nextAnswers;
}
//#endregion
//#region src/routes/bookmarks.index.tsx
var Route$7 = createFileRoute("/bookmarks/")({
	head: () => ({ meta: [
		{ title: "Bookmarks by Test — JEE CBT Platform" },
		{
			name: "description",
			content: "Bookmarked questions grouped by test. Open any test to review only its bookmarked questions with notes."
		},
		{
			property: "og:title",
			content: "Bookmarks by Test — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every test with its bookmarked-question count."
		}
	] }),
	component: BookmarksIndex
});
function BookmarksIndex() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const allRows = (reports.data ?? []).map((report) => {
		const categoryCounts = {};
		for (const category of NTA_BOOKMARK_CATEGORIES) categoryCounts[category] = report.summary.perQuestion.filter((item) => item.answer?.bookmarked && item.answer.tag === category).length;
		return {
			id: report.attempt.id,
			name: report.attempt.testName,
			when: report.attempt.submittedAt ?? report.attempt.updatedAt,
			count: report.summary.perQuestion.filter((item) => item.answer?.bookmarked).length,
			total: report.questions.length,
			isNta: report.attempt.mode === "nta",
			categoryCounts
		};
	}).filter((row) => row.count > 0).sort((a, b) => b.when - a.when);
	const rows = categoryFilter === "all" ? allRows : allRows.filter((row) => row.isNta && (row.categoryCounts[categoryFilter] ?? 0) > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }), " Bookmarks"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Pick a test to review only its bookmarked questions."
		}),
		allRows.some((row) => row.isNta) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCategoryFilter("all"),
				className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
				children: "All categories"
			}), NTA_BOOKMARK_CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCategoryFilter(category),
				className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === category ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
				children: category
			}, category))]
		}),
		reports.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		!reports.isLoading && allRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "Nothing bookmarked yet — tap the bookmark icon while taking a test."
		}) : !reports.isLoading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "No bookmarks in this category yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-2",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/bookmarks/$attemptId",
				params: { attemptId: r.id },
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-semibold",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							new Date(r.when).toLocaleString(),
							" · ",
							r.total,
							" questions"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary",
					children: [
						r.count,
						" Bookmark",
						r.count === 1 ? "" : "s"
					]
				})]
			}) }, r.id))
		})
	] });
}
//#endregion
//#region src/components/review/NoteEditor.tsx
var REASON_TAGS = [
	"Formula Mistake",
	"Concept Weak",
	"Calculation Error",
	"Reading Mistake",
	"Silly Mistake",
	"Guess",
	"Time Pressure",
	"Need Revision"
];
function formatDuration(totalSeconds) {
	if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00";
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function AudioReflectionSection({ attemptId, questionId }) {
	const [audio, setAudio] = (0, import_react.useState)(null);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [error, setError] = (0, import_react.useState)(null);
	const [supported, setSupported] = (0, import_react.useState)(true);
	const [microphones, setMicrophones] = (0, import_react.useState)([]);
	const [microphoneId, setMicrophoneId] = (0, import_react.useState)("");
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const audioContextRef = (0, import_react.useRef)(null);
	const audioSourceRef = (0, import_react.useRef)(null);
	const gainNodeRef = (0, import_react.useRef)(null);
	const compressorRef = (0, import_react.useRef)(null);
	const destinationRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const audioRef = (0, import_react.useRef)(null);
	const startTimeRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		(async () => {
			const recording = await getAudioReflection(attemptId, questionId);
			if (!active || !recording) {
				setAudio(null);
				setAudioUrl((prev) => {
					if (prev) URL.revokeObjectURL(prev);
					return null;
				});
				return;
			}
			const url = URL.createObjectURL(recording.blob);
			setAudio(recording);
			setAudioUrl((prev) => {
				if (prev) URL.revokeObjectURL(prev);
				return url;
			});
		})();
		return () => {
			active = false;
			if (audioUrl) URL.revokeObjectURL(audioUrl);
			if (timerRef.current) window.clearInterval(timerRef.current);
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
			cleanupAudioProcessing();
		};
	}, [attemptId, questionId]);
	(0, import_react.useEffect)(() => {
		if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
			setSupported(false);
			return;
		}
		const loadMicrophones = async () => {
			try {
				setMicrophones((await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === "audioinput"));
			} catch {
				setMicrophones([]);
			}
		};
		loadMicrophones();
		navigator.mediaDevices.addEventListener?.("devicechange", loadMicrophones);
		return () => navigator.mediaDevices.removeEventListener?.("devicechange", loadMicrophones);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!audioRef.current) return;
		audioRef.current.playbackRate = speed;
	}, [audioUrl, speed]);
	const clearTimer = () => {
		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};
	const stopStream = () => {
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
	};
	const cleanupAudioProcessing = () => {
		audioSourceRef.current?.disconnect();
		gainNodeRef.current?.disconnect();
		compressorRef.current?.disconnect();
		destinationRef.current?.stream.getTracks().forEach((track) => track.stop());
		audioSourceRef.current = null;
		gainNodeRef.current = null;
		compressorRef.current = null;
		destinationRef.current = null;
		const context = audioContextRef.current;
		audioContextRef.current = null;
		if (context && context.state !== "closed") context.close();
	};
	const stopRecording = () => {
		if (!mediaRecorderRef.current) return;
		clearTimer();
		setIsRecording(false);
		if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
		stopStream();
	};
	const startRecording = async () => {
		if (!supported) {
			setError("This browser does not support audio recording.");
			return;
		}
		try {
			const constraints = {
				echoCancellation: { ideal: true },
				noiseSuppression: { ideal: true },
				autoGainControl: { ideal: true },
				channelCount: { ideal: 1 },
				sampleRate: { ideal: 48e3 },
				...microphoneId ? { deviceId: { exact: microphoneId } } : {}
			};
			let stream;
			try {
				stream = await navigator.mediaDevices.getUserMedia({ audio: constraints });
			} catch (constraintError) {
				if (constraintError instanceof DOMException && constraintError.name === "NotAllowedError") throw constraintError;
				stream = await navigator.mediaDevices.getUserMedia({ audio: microphoneId ? { deviceId: { exact: microphoneId } } : true });
			}
			streamRef.current = stream;
			try {
				setMicrophones((await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === "audioinput"));
			} catch {}
			let recordingStream = stream;
			const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;
			if (AudioContextConstructor) {
				const context = new AudioContextConstructor();
				const source = context.createMediaStreamSource(stream);
				const gain = context.createGain();
				const compressor = context.createDynamicsCompressor();
				const destination = context.createMediaStreamDestination();
				gain.gain.value = 1.35;
				compressor.threshold.value = -24;
				compressor.knee.value = 24;
				compressor.ratio.value = 4;
				compressor.attack.value = .003;
				compressor.release.value = .25;
				source.connect(gain).connect(compressor).connect(destination);
				audioContextRef.current = context;
				audioSourceRef.current = source;
				gainNodeRef.current = gain;
				compressorRef.current = compressor;
				destinationRef.current = destination;
				recordingStream = destination.stream;
				if (context.state === "suspended") await context.resume();
			}
			const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
			const recorder = new MediaRecorder(recordingStream, MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : void 0);
			chunksRef.current = [];
			startTimeRef.current = Date.now();
			recorder.ondataavailable = (event) => {
				if (event.data.size > 0) chunksRef.current.push(event.data);
			};
			recorder.onerror = () => {
				setError("The microphone could not be accessed. Please try again.");
				stopStream();
				cleanupAudioProcessing();
				setIsRecording(false);
			};
			recorder.onstop = async () => {
				clearTimer();
				stopStream();
				cleanupAudioProcessing();
				const blob = new Blob(chunksRef.current, { type: mimeType });
				if (blob.size === 0) {
					setError("No audio was captured. Please try again.");
					return;
				}
				const finalDuration = elapsed > 0 ? elapsed : 0;
				const nextAudio = {
					id: audioReflectionKey(attemptId, questionId),
					attemptId,
					questionId,
					blob,
					mimeType: blob.type || "audio/webm",
					duration: finalDuration,
					createdAt: Date.now(),
					updatedAt: Date.now()
				};
				await putAudioReflection(nextAudio);
				setAudio(nextAudio);
				setAudioUrl((prev) => {
					if (prev) URL.revokeObjectURL(prev);
					return URL.createObjectURL(blob);
				});
				setError(null);
			};
			mediaRecorderRef.current = recorder;
			recorder.start();
			setElapsed(0);
			setIsRecording(true);
			timerRef.current = window.setInterval(() => {
				if (!startTimeRef.current) return;
				setElapsed((Date.now() - startTimeRef.current) / 1e3);
			}, 250);
		} catch (error) {
			setError(error instanceof DOMException && error.name === "NotAllowedError" ? "Microphone permission was denied. Please allow access and try again." : "Your browser could not access the microphone.");
			setIsRecording(false);
			stopStream();
			cleanupAudioProcessing();
		}
	};
	const handleDelete = async () => {
		if (isRecording) stopRecording();
		await deleteAudioReflection(audioReflectionKey(attemptId, questionId));
		setAudio(null);
		setAudioUrl((prev) => {
			if (prev) URL.revokeObjectURL(prev);
			return null;
		});
		setError(null);
	};
	const durationLabel = audio ? formatDuration(audio.duration) : formatDuration(elapsed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 rounded-xl border border-dashed bg-card/80 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground",
					children: "🎙️ MY AUDIO REFLECTION"
				}), isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-red-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-red-500 animate-pulse" }), " LIVE"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			}),
			!supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Voice recording is not supported in this browser."
			}),
			!audio && !isRecording && supported && microphones.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: microphoneId,
				onChange: (event) => setMicrophoneId(event.target.value),
				className: "rounded-lg border bg-background px-3 py-2 text-sm",
				"aria-label": "Microphone",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Default microphone"
				}), microphones.map((microphone, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: microphone.deviceId,
					children: microphone.label || `Microphone ${index + 1}`
				}, microphone.deviceId))]
			}),
			!audio && !isRecording && supported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startRecording,
				className: "inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), " Start Recording"]
			}),
			isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: stopRecording,
					className: "inline-flex items-center gap-2 rounded-lg border border-destructive bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }), " Stop Recording"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-md border bg-card px-2 py-1 text-xs font-semibold tabular-nums",
					children: formatDuration(elapsed)
				})]
			}),
			audio && !isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: startRecording,
							className: "inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-4" }), " Re-record / Replace"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleDelete,
							className: "inline-flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete recording"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						ref: audioRef,
						controls: true,
						src: audioUrl ?? void 0,
						className: "w-full",
						onLoadedMetadata: () => {
							if (!audioRef.current) return;
							audioRef.current.playbackRate = speed;
						}
					}, audioUrl ?? audio.id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground",
							children: ["Duration · ", durationLabel]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								.5,
								1,
								1.5,
								2
							].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSpeed(rate);
									if (audioRef.current) audioRef.current.playbackRate = rate;
								},
								className: cn("rounded-md border px-2 py-1 text-[11px] font-semibold", speed === rate ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
								"aria-pressed": speed === rate,
								children: [
									rate,
									"×",
									" ",
									rate === .5 ? "Slow" : rate === 1 ? "Normal" : rate === 1.5 ? "Fast" : "Very Fast"
								]
							}, rate))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] leading-relaxed text-muted-foreground",
				children: "Record in your own words: Why did I get this wrong? What did I learn? What will I remember next time?"
			})
		]
	});
}
function NoteEditor({ attemptId, questionId, initial, mode }) {
	const [note, setNote] = (0, import_react.useState)(initial ?? emptyNote(attemptId, questionId));
	const [saved, setSaved] = (0, import_react.useState)(false);
	const first = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		if (first.current) {
			first.current = false;
			return;
		}
		const t = setTimeout(() => {
			putNote(note).then(() => {
				setSaved(true);
				setTimeout(() => setSaved(false), 1200);
			});
		}, 600);
		return () => clearTimeout(t);
	}, [note]);
	const patch = (p) => setNote((n) => ({
		...n,
		...p
	}));
	const clear = () => setNote((n) => ({
		...n,
		tags: [],
		reason: "",
		learning: "",
		note: "",
		revision: false
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 space-y-3 rounded-xl border border-dashed bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: mode === "wrong" ? "Why did I get this wrong?" : "Personal notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-[11px] text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Saved"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: clear,
						className: "flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Delete"]
					})]
				})]
			}),
			mode === "wrong" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: REASON_TAGS.map((t) => {
						const on = note.tags.includes(t);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => patch({ tags: on ? note.tags.filter((x) => x !== t) : [...note.tags, t] }),
							className: cn("rounded-full border px-2.5 py-1 text-[11px] font-medium", on ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
							children: t
						}, t);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note.reason,
					onChange: (e) => patch({ reason: e.target.value }),
					rows: 3,
					placeholder: "In your own words — e.g. I forgot the sign convention.",
					className: "w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: "What did I learn?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note.learning,
					onChange: (e) => patch({ learning: e.target.value }),
					rows: 3,
					placeholder: "Formula to remember, trick, shortcut, concept, mistake to avoid…",
					className: "w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: note.note,
				onChange: (e) => patch({ note: e.target.value }),
				rows: 3,
				placeholder: "Your notes on this question…",
				className: "w-full rounded-lg border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-xs font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: note.revision,
					onChange: (e) => patch({ revision: e.target.checked }),
					className: "size-4 accent-[var(--primary)]"
				}), "Mark for revision"]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioReflectionSection, {
				attemptId,
				questionId
			})
		]
	});
}
//#endregion
//#region src/lib/origin.ts
/**
* Maps question ids to their source Question Bank set. Works even when the same
* question is reused across many tests, because it resolves by question id.
*/
async function originMap(questionIds) {
	const want = new Set(questionIds);
	const tests = await listTests();
	const out = {};
	for (const t of tests) for (const q of t.questions ?? []) {
		if (!want.has(q.id) || out[q.id]) continue;
		out[q.id] = {
			testId: t.id,
			testName: t.name,
			number: q.number,
			questionId: q.id
		};
	}
	return out;
}
//#endregion
//#region src/routes/bookmarks.$attemptId.tsx
var Route$6 = createFileRoute("/bookmarks/$attemptId")({
	head: () => ({ meta: [
		{ title: "Bookmarked Questions Review — JEE CBT Platform" },
		{
			name: "description",
			content: "Only the bookmarked questions from this attempt, with sticky palette, subject filters, notes and revision flags."
		},
		{
			property: "og:title",
			content: "Bookmarked Questions Review"
		},
		{
			property: "og:description",
			content: "Review bookmarked questions from one test on a single page."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: BookmarksAttempt
});
function BookmarksAttempt() {
	const { attemptId } = Route$6.useParams();
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const q = useQuery({
		queryKey: ["bookmarks", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const [report, notes] = await Promise.all([buildReport(attempt), listNotes(attemptId)]);
			return {
				report,
				notes,
				sources: await originMap(report.questions.map((q) => q.id))
			};
		},
		retry: false
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading bookmarks…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/bookmarks",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to bookmarks"
	})] });
	const { report, notes, sources } = q.data;
	const allItems = report.summary.perQuestion.filter((p) => p.answer?.bookmarked).map((p) => ({
		question: p.question,
		answer: p.answer,
		status: p.status,
		score: p.score
	}));
	const items = report.attempt.mode === "nta" && categoryFilter !== "all" ? allItems.filter((item) => item.answer?.tag === categoryFilter) : allItems;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "flex items-center gap-2 truncate text-2xl font-bold tracking-tight",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5" }),
						" ",
						report.attempt.testName
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [items.length, " bookmarked questions"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/bookmarks",
				className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
				children: "All tests"
			})]
		}),
		report.attempt.mode === "nta" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCategoryFilter("all"),
				className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
				children: [
					"All categories (",
					allItems.length,
					")"
				]
			}), NTA_BOOKMARK_CATEGORIES.map((category) => {
				const count = allItems.filter((item) => item.answer?.tag === category).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCategoryFilter(category),
					className: `rounded-full border px-3 py-1 text-xs font-medium ${categoryFilter === category ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
					children: [
						category,
						" (",
						count,
						")"
					]
				}, category);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
			items,
			sources,
			statuses: [
				"all",
				"correct",
				"wrong",
				"skipped"
			],
			paletteTitle: "Bookmarked",
			emptyText: "No bookmarked questions for this filter.",
			renderFooter: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [report.attempt.mode === "nta" && r.answer?.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary",
					children: r.answer.tag
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteEditor, {
					attemptId,
					questionId: r.question.id,
					mode: "bookmark",
					initial: notes.find((n) => n.id === noteKey(attemptId, r.question.id))
				})]
			})
		})
	] });
}
//#endregion
//#region src/lib/chapter-utils.ts
/**
* Utility functions for handling chapter organization and normalization
*/
/**
* Normalize chapter name for consistent grouping
* - Trim whitespace
* - Preserve original casing for display
* Returns normalized version for comparison
*/
function normalizeChapter(chapter) {
	return chapter.trim().toLowerCase();
}
function groupEntriesByChapter(entries) {
	const subjectMap = /* @__PURE__ */ new Map();
	for (const entry of entries) {
		const subject = entry.subject || "General";
		const chapter = entry.chapter || "General";
		const normalizedChapter = normalizeChapter(chapter);
		if (!subjectMap.has(subject)) subjectMap.set(subject, /* @__PURE__ */ new Map());
		const chaptersMap = subjectMap.get(subject);
		if (!chaptersMap.has(normalizedChapter)) chaptersMap.set(normalizedChapter, {
			subject,
			normalizedChapter,
			displayChapter: chapter,
			entries: []
		});
		chaptersMap.get(normalizedChapter).entries.push(entry);
	}
	const result = [];
	for (const [subject, chaptersMap] of subjectMap) {
		const chapters = Array.from(chaptersMap.values()).sort((a, b) => a.displayChapter.localeCompare(b.displayChapter));
		result.push({
			subject,
			chapters
		});
	}
	result.sort((a, b) => a.subject.localeCompare(b.subject));
	return result;
}
//#endregion
//#region src/components/review/ErrorJournalList.tsx
var ERROR_TYPES$1 = [
	"Wrong Answer",
	"Couldn't Solve",
	"Concept",
	"Formula",
	"Calculation",
	"Misread",
	"Time Pressure",
	"Wrong Approach",
	"Guess"
];
var SUBJECTS$1 = [
	"All",
	"Physics",
	"Chemistry",
	"Mathematics"
];
var DIFFICULTIES$1 = [
	"All",
	"Easy",
	"Medium",
	"Hard"
];
var STATUSES$1 = [
	"All",
	"Need Review",
	"Learning",
	"Mastered"
];
function ErrorJournalList({ entries, onNew, onView, onEdit, onDelete }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedSubject, setSelectedSubject] = (0, import_react.useState)("All");
	const [selectedDifficulty, setSelectedDifficulty] = (0, import_react.useState)("All");
	const [selectedStatus, setSelectedStatus] = (0, import_react.useState)("All");
	const [selectedErrorType, setSelectedErrorType] = (0, import_react.useState)("All");
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	const [expandedChapters, setExpandedChapters] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const filtered = (0, import_react.useMemo)(() => {
		let result = entries.filter((e) => {
			const q = search.toLowerCase();
			const matchesSearch = e.questionText.toLowerCase().includes(q) || e.chapter.toLowerCase().includes(q) || e.topic.toLowerCase().includes(q) || e.mistakeMade.toLowerCase().includes(q) || e.whatLearned.toLowerCase().includes(q);
			const matchesSubject = selectedSubject === "All" || e.subject === selectedSubject;
			const matchesDifficulty = selectedDifficulty === "All" || e.difficulty === selectedDifficulty;
			const matchesStatus = selectedStatus === "All" || e.status === selectedStatus;
			const matchesErrorType = selectedErrorType === "All" || e.errorType === selectedErrorType;
			return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus && matchesErrorType;
		});
		result.sort((a, b) => sortBy === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);
		return result;
	}, [
		entries,
		search,
		selectedSubject,
		selectedDifficulty,
		selectedStatus,
		selectedErrorType,
		sortBy
	]);
	const groupedEntries = (0, import_react.useMemo)(() => {
		return groupEntriesByChapter(filtered);
	}, [filtered]);
	const hasFilters = search || selectedSubject !== "All" || selectedDifficulty !== "All" || selectedStatus !== "All" || selectedErrorType !== "All";
	const toggleChapter = (key) => {
		const newSet = new Set(expandedChapters);
		if (newSet.has(key)) newSet.delete(key);
		else newSet.add(key);
		setExpandedChapters(newSet);
	};
	const getChapterKey = (subject, normalizedChapter) => {
		return `${subject}::${normalizedChapter}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "📓 Error Journal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onNew,
					className: "inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New Entry"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				placeholder: "Search by question, chapter, topic, notes...",
				className: "w-full rounded-lg border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 rounded-lg border bg-card/50 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 text-xs font-semibold uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Filters:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedSubject,
							onChange: (e) => setSelectedSubject(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: SUBJECTS$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedDifficulty,
							onChange: (e) => setSelectedDifficulty(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: DIFFICULTIES$1.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d,
								children: d
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: selectedStatus,
							onChange: (e) => setSelectedStatus(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: STATUSES$1.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedErrorType,
							onChange: (e) => setSelectedErrorType(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "All",
								children: "All Error Types"
							}), ERROR_TYPES$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: t
							}, t))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sortBy,
							onChange: (e) => setSortBy(e.target.value),
							className: "rounded-md border bg-card px-2 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest First"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "oldest",
								children: "Oldest First"
							})]
						}),
						hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSearch("");
								setSelectedSubject("All");
								setSelectedDifficulty("All");
								setSelectedStatus("All");
								setSelectedErrorType("All");
							},
							className: "rounded-md border border-destructive px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10",
							children: "Clear Filters"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted-foreground",
				children: [
					"Showing ",
					filtered.length,
					" of ",
					entries.length,
					" entry",
					entries.length !== 1 ? "ies" : "",
					hasFilters && " (filtered)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground",
					children: entries.length === 0 ? "No entries yet — create your first Error Journal entry!" : "No entries match your filters."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1 rounded-lg border bg-card p-2",
					children: groupedEntries.map((subjectGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 py-1 text-sm font-semibold text-primary",
							children: ["📚 ", subjectGroup.subject]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-2 space-y-1 border-l border-border/50",
							children: subjectGroup.chapters.map((chapterGroup) => {
								const chapterKey = getChapterKey(subjectGroup.subject, chapterGroup.normalizedChapter);
								const isExpanded = expandedChapters.has(chapterKey);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => toggleChapter(chapterKey),
										className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-foreground hover:bg-accent",
										children: [
											isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 flex-shrink-0" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-4 flex-shrink-0 text-yellow-500" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1 text-left",
												children: chapterGroup.displayChapter
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: chapterGroup.entries.length
											})
										]
									}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ml-2 space-y-1 border-l border-border/30 py-1",
										children: chapterGroup.entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "group flex items-start gap-2 rounded px-2 py-2 hover:bg-accent/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mt-1 size-3 flex-shrink-0 text-muted-foreground" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-sm font-medium line-clamp-1",
															children: entry.questionText || "Untitled"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground",
															children: [
																entry.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.topic }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", entry.difficulty === "Easy" ? "bg-green-500/10 text-green-600" : entry.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-600" : "bg-red-500/10 text-red-600"),
																	children: entry.difficulty
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", entry.status === "Need Review" ? "bg-red-500/10 text-red-600" : entry.status === "Learning" ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"),
																	children: [
																		entry.status === "Need Review" && "🔴",
																		entry.status === "Learning" && "🟡",
																		entry.status === "Mastered" && "🟢"
																	]
																}),
																entry.hasAudio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎙️" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px]",
																	children: new Date(entry.createdAt).toLocaleDateString()
																})
															]
														}),
														entry.mistakeMade && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-1 text-xs line-clamp-1 text-foreground/70",
															children: entry.mistakeMade
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "ml-2 flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => onView(entry),
															className: "rounded p-1 hover:bg-primary/20",
															title: "View",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3 text-primary" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => onEdit(entry),
															className: "rounded p-1 hover:bg-blue-500/20",
															title: "Edit",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3 text-blue-500" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => {
																if (confirm("Delete this entry?")) onDelete(entry.id);
															},
															className: "rounded p-1 hover:bg-destructive/20",
															title: "Delete",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3 text-destructive" })
														})
													]
												})
											]
										}, entry.id))
									})]
								}, chapterKey);
							})
						})]
					}, subjectGroup.subject))
				})
			})
		]
	});
}
//#endregion
//#region src/components/review/ErrorJournalEditor.tsx
var ERROR_TYPES = [
	"Wrong Answer",
	"Couldn't Solve",
	"Concept",
	"Formula",
	"Calculation",
	"Misread",
	"Time Pressure",
	"Wrong Approach",
	"Guess"
];
var SUBJECTS = [
	"Physics",
	"Chemistry",
	"Mathematics"
];
var DIFFICULTIES = [
	"Easy",
	"Medium",
	"Hard"
];
var STATUSES = [
	"Need Review",
	"Learning",
	"Mastered"
];
function AudioRecorder({ entryId, onAudioChange }) {
	const [mode, setMode] = (0, import_react.useState)("microphone");
	const [isRecording, setIsRecording] = (0, import_react.useState)(false);
	const [hasAudio, setHasAudio] = (0, import_react.useState)(false);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [error, setError] = (0, import_react.useState)(null);
	const [supported, setSupported] = (0, import_react.useState)(true);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const chunksRef = (0, import_react.useRef)([]);
	const audioRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	const stoppingRef = (0, import_react.useRef)(false);
	const startingRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadAudio = async () => {
			try {
				const blob = await getErrorJournalAudio(entryId);
				if (active && blob) {
					const url = URL.createObjectURL(blob);
					urlRef.current = url;
					setAudioUrl(url);
					setHasAudio(true);
				}
			} catch (err) {
				console.error("Failed to load audio:", err);
			}
		};
		loadAudio();
		return () => {
			active = false;
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
			if (timerRef.current) window.clearInterval(timerRef.current);
			if (streamRef.current) streamRef.current.getTracks().forEach((track) => track.stop());
			if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
				stoppingRef.current = true;
				mediaRecorderRef.current.stop();
			}
		};
	}, [entryId]);
	(0, import_react.useEffect)(() => {
		if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) setSupported(false);
	}, []);
	const startRecording = async () => {
		if (isRecording || startingRef.current) return;
		startingRef.current = true;
		let captureStream = null;
		try {
			setError(null);
			if (!window.MediaRecorder) throw new Error("This browser does not support audio recording.");
			if (mode === "class") {
				if (!navigator.mediaDevices?.getDisplayMedia) throw new Error("Class Audio requires Chrome screen or window sharing, which is unavailable in this browser.");
				captureStream = await navigator.mediaDevices.getDisplayMedia({
					video: true,
					audio: true
				});
				if (captureStream.getAudioTracks().length === 0) {
					captureStream.getTracks().forEach((track) => track.stop());
					throw new Error("Chrome did not provide audio for the selected window or screen. Enable audio sharing and try again.");
				}
			} else captureStream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = captureStream;
			const recordingStream = mode === "class" ? new MediaStream(captureStream.getAudioTracks()) : captureStream;
			const mimeType = [
				"audio/webm;codecs=opus",
				"audio/webm",
				"audio/ogg;codecs=opus"
			].find((type) => MediaRecorder.isTypeSupported(type));
			if (!mimeType) throw new Error("This browser does not support a compatible audio recording format.");
			const recorder = new MediaRecorder(recordingStream, { mimeType });
			mediaRecorderRef.current = recorder;
			stoppingRef.current = false;
			chunksRef.current = [];
			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunksRef.current.push(e.data);
			};
			recorder.onstop = async () => {
				mediaRecorderRef.current = null;
				const chunks = chunksRef.current;
				chunksRef.current = [];
				if (chunks.length === 0) {
					setError("No audio was captured. Confirm that audio sharing is enabled for the selected window or screen.");
					return;
				}
				const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
				try {
					await putErrorJournalAudio(entryId, blob, blob.type);
					const url = URL.createObjectURL(blob);
					if (urlRef.current) URL.revokeObjectURL(urlRef.current);
					urlRef.current = url;
					setAudioUrl(url);
					setHasAudio(true);
					onAudioChange(true);
					setElapsed(0);
				} catch (err) {
					setError(err.message || "Failed to save audio");
				}
			};
			const handleCaptureEnded = () => {
				if (!stoppingRef.current && mediaRecorderRef.current === recorder && recorder.state !== "inactive") {
					stoppingRef.current = true;
					setError("Audio sharing ended before recording was stopped.");
					recorder.stop();
					captureStream?.getTracks().forEach((track) => track.stop());
					streamRef.current = null;
					if (timerRef.current) {
						window.clearInterval(timerRef.current);
						timerRef.current = null;
					}
					setIsRecording(false);
				}
			};
			captureStream.getTracks().forEach((track) => {
				track.addEventListener("ended", handleCaptureEnded, { once: true });
			});
			recorder.start();
			setIsRecording(true);
			setElapsed(0);
			timerRef.current = window.setInterval(() => {
				setElapsed((e) => e + 1);
			}, 1e3);
			startingRef.current = false;
			recorder.onerror = () => {
				stoppingRef.current = true;
				setError("The audio recorder failed while recording. Please try again.");
				captureStream?.getTracks().forEach((track) => track.stop());
				streamRef.current = null;
				setIsRecording(false);
			};
		} catch (e) {
			captureStream?.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
			const error = e;
			setError(error.name === "NotAllowedError" ? mode === "class" ? "Class Audio sharing was cancelled or denied. Select the Edge lecture window and allow audio sharing." : "Microphone access was cancelled or denied." : error.message || "Failed to start audio recording.");
			startingRef.current = false;
		}
	};
	const stopRecording = () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
			stoppingRef.current = true;
			mediaRecorderRef.current.stop();
		}
		const stream = streamRef.current;
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
		}
		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
		setIsRecording(false);
	};
	const handleDelete = async () => {
		try {
			if (isRecording) stopRecording();
			await deleteErrorJournalAudio(entryId);
			setHasAudio(false);
			onAudioChange(false);
			if (urlRef.current) {
				URL.revokeObjectURL(urlRef.current);
				urlRef.current = null;
			}
			setAudioUrl(null);
			setError(null);
		} catch (err) {
			setError(err.message || "Failed to delete audio");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border border-dashed bg-card/50 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: mode === "microphone" ? "🎙️ Microphone" : "🎧 Class Audio"
				}), isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-red-500 animate-pulse" }), " Recording"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				role: "group",
				"aria-label": "Audio recording mode",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => !isRecording && setMode("microphone"),
					disabled: isRecording,
					className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold", mode === "microphone" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3" }), " Microphone"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => !isRecording && setMode("class"),
					disabled: isRecording,
					className: cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold", mode === "class" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "size-3" }), " Class Audio"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			}),
			!supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Audio recording is not supported in this browser."
			}),
			mode === "class" && !isRecording && supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] leading-relaxed text-muted-foreground",
				children: "Chrome will open its sharing picker. Select the Edge lecture window or screen and enable audio sharing."
			}),
			!hasAudio && !isRecording && supported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startRecording,
				className: "inline-flex items-center gap-1 rounded-lg bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-3" }), " Start"]
			}),
			isRecording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: stopRecording,
				className: "inline-flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-3" }), " Stop"]
			}),
			hasAudio && audioUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						ref: audioRef,
						src: audioUrl,
						controls: true,
						className: "w-full rounded-lg bg-card text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: [
							.5,
							1,
							1.5,
							2
						].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setSpeed(rate);
								if (audioRef.current) audioRef.current.playbackRate = rate;
							},
							className: cn("rounded-md border px-1.5 py-0.5 text-[10px] font-semibold", speed === rate ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"),
							children: [rate, "×"]
						}, rate))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleDelete,
						className: "flex items-center gap-1 rounded-md border border-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-2.5" }), " Delete"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleDelete,
						className: "flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-2.5" }), " Replace"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] leading-relaxed text-muted-foreground",
				children: "Record your reflection: Why did I make this mistake? What did I learn?"
			})
		]
	});
}
function ImageUploadSection({ entryId, onImageSelect }) {
	const [imageUrl, setImageUrl] = (0, import_react.useState)(null);
	const [imageLoading, setImageLoading] = (0, import_react.useState)(true);
	const fileInputRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadImage = async () => {
			try {
				const blob = await getErrorJournalImage(entryId);
				if (active && blob) {
					const url = URL.createObjectURL(blob);
					urlRef.current = url;
					setImageUrl(url);
				}
			} finally {
				if (active) setImageLoading(false);
			}
		};
		loadImage();
		return () => {
			active = false;
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
		};
	}, [entryId]);
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			const blob = new Blob([event.target?.result], { type: file.type });
			const url = URL.createObjectURL(blob);
			if (urlRef.current) URL.revokeObjectURL(urlRef.current);
			urlRef.current = url;
			setImageUrl(url);
			onImageSelect(blob);
		};
		reader.readAsArrayBuffer(file);
	};
	const handlePaste = (e) => {
		const items = e.clipboardData?.items || [];
		for (let i = 0; i < items.length; i++) if (items[i].type.includes("image")) {
			const blob = items[i].getAsFile();
			if (blob) {
				const url = URL.createObjectURL(blob);
				if (urlRef.current) URL.revokeObjectURL(urlRef.current);
				urlRef.current = url;
				setImageUrl(url);
				onImageSelect(blob);
			}
		}
	};
	const handleRemove = () => {
		if (urlRef.current) {
			URL.revokeObjectURL(urlRef.current);
			urlRef.current = null;
		}
		setImageUrl(null);
	};
	(0, import_react.useEffect)(() => {
		window.addEventListener("paste", handlePaste);
		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
					children: "📷 Question Image"
				}), imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleRemove,
					className: "flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5" }), " Remove"]
				})]
			}),
			imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: "Question",
				className: "max-h-48 max-w-full rounded-lg border object-contain"
			}),
			!imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed border-muted-foreground/30 p-2 text-center",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					e.preventDefault();
					const file = e.dataTransfer.files[0];
					if (file?.type.includes("image")) {
						const reader = new FileReader();
						reader.onload = (event) => {
							const blob = new Blob([event.target?.result], { type: file.type });
							const url = URL.createObjectURL(blob);
							if (urlRef.current) URL.revokeObjectURL(urlRef.current);
							urlRef.current = url;
							setImageUrl(url);
							onImageSelect(blob);
						};
						reader.readAsArrayBuffer(file);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => fileInputRef.current?.click(),
						className: "inline-flex items-center gap-1 rounded-lg bg-card px-2 py-1 text-xs font-medium hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3" }), " Upload"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: "image/*",
						onChange: handleFileUpload,
						className: "hidden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] text-muted-foreground",
						children: "Upload, paste, or drag & drop"
					})
				]
			})
		]
	});
}
function ErrorJournalEditor({ entry, onSave, onCancel }) {
	const [entryId] = (0, import_react.useState)(() => entry?.id || `ej_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`);
	const [data, setData] = (0, import_react.useState)(entry || {
		questionText: "",
		subject: "Physics",
		chapter: "",
		topic: "",
		difficulty: "Medium",
		source: "",
		questionNumber: "",
		errorType: "Wrong Answer",
		mistakeMade: "",
		whatLearned: "",
		rememberNext: "",
		additionalNotes: "",
		status: "Need Review",
		hasAudio: false,
		tryAgainCount: 0
	});
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [imageBlob, setImageBlob] = (0, import_react.useState)();
	const [saveError, setSaveError] = (0, import_react.useState)(null);
	const handleSave = async () => {
		if (isSaving) return;
		try {
			setIsSaving(true);
			setSaveError(null);
			const requireXp = typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true;
			const xp = getXpState();
			if (requireXp) {
				if (xp.balance < 20) {
					setSaveError("Not enough XP. You need 20 XP to add this error.");
					setIsSaving(false);
					return;
				}
				if (!window.confirm(`Add Error to Error Journal?\n\nCost: ⚡ 20 XP\nCurrent XP: ${xp.balance} XP`)) {
					setIsSaving(false);
					return;
				}
			}
			if (imageBlob) await putErrorJournalImage(entryId, imageBlob, imageBlob.type || "image/png");
			const chapterInput = data.chapter?.trim() || "";
			const topicInput = data.topic?.trim() || "";
			const fullEntry = {
				id: entryId,
				questionText: data.questionText || "",
				subject: data.subject || "Physics",
				chapter: chapterInput,
				topic: topicInput,
				difficulty: data.difficulty || "Medium",
				source: data.source || "",
				questionNumber: data.questionNumber || "",
				errorType: data.errorType || "Wrong Answer",
				imageId: imageBlob ? entryId : entry?.imageId,
				mistakeMade: data.mistakeMade || "",
				whatLearned: data.whatLearned || "",
				rememberNext: data.rememberNext || "",
				additionalNotes: data.additionalNotes || "",
				status: data.status || "Need Review",
				hasAudio: data.hasAudio || false,
				tryAgainCount: data.tryAgainCount || 0,
				lastTryAgainStatus: data.lastTryAgainStatus,
				createdAt: entry?.createdAt || Date.now(),
				updatedAt: Date.now()
			};
			await putErrorJournalEntry(fullEntry);
			if (requireXp) {
				if (!spendXpForErrorJournal(fullEntry.id, 20).ok) {
					setSaveError("Could not complete XP spend. The Error Journal entry was not saved.");
					setIsSaving(false);
					return;
				}
			}
			setSaved(true);
			setTimeout(() => {
				onSave(fullEntry);
			}, 1e3);
		} catch (error) {
			setSaveError(error.message || "Failed to save entry");
			setIsSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[85vh] w-full max-w-[600px] overflow-y-auto rounded-2xl bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						children: entry ? "Edit Entry" : "New Entry"
					}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Saved"]
					})]
				}),
				saveError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive",
					children: ["Error: ", saveError]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "Question / Issue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.questionText || "",
							onChange: (e) => setData((d) => ({
								...d,
								questionText: e.target.value
							})),
							rows: 2,
							placeholder: "Describe the question or issue...",
							className: "mt-1 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadSection, {
							entryId,
							onImageSelect: setImageBlob
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase",
									children: "Subject"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: data.subject || "Physics",
									onChange: (e) => setData((d) => ({
										...d,
										subject: e.target.value
									})),
									className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring",
									children: SUBJECTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase",
									children: "Difficulty"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: data.difficulty || "Medium",
									onChange: (e) => setData((d) => ({
										...d,
										difficulty: e.target.value
									})),
									className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring",
									children: DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d,
										children: d
									}, d))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold uppercase",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: data.status || "Need Review",
									onChange: (e) => setData((d) => ({
										...d,
										status: e.target.value
									})),
									className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: s,
										children: [
											s === "Need Review" ? "🔴" : s === "Learning" ? "🟡" : "🟢",
											" ",
											s
										]
									}, s))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Chapter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.chapter || "",
								onChange: (e) => setData((d) => ({
									...d,
									chapter: e.target.value
								})),
								placeholder: "Chapter...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Topic"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.topic || "",
								onChange: (e) => setData((d) => ({
									...d,
									topic: e.target.value
								})),
								placeholder: "Topic...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Source / Test"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.source || "",
								onChange: (e) => setData((d) => ({
									...d,
									source: e.target.value
								})),
								placeholder: "e.g., JEE 2023...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase",
								children: "Question #"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: data.questionNumber || "",
								onChange: (e) => setData((d) => ({
									...d,
									questionNumber: e.target.value
								})),
								placeholder: "e.g., Q45...",
								className: "mt-0.5 w-full rounded-lg border bg-card px-2 py-1 text-xs focus:ring-2 focus:ring-ring"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs font-semibold uppercase mb-1",
								children: "Error Type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: ERROR_TYPES.slice(0, 5).map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setData((d) => ({
										...d,
										errorType: type
									})),
									className: cn("rounded-full border px-2 py-0.5 text-[10px] font-medium transition", data.errorType === type ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-accent"),
									children: type
								}, type))
							}),
							ERROR_TYPES.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1 mt-1",
								children: ERROR_TYPES.slice(5).map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setData((d) => ({
										...d,
										errorType: type
									})),
									className: cn("rounded-full border px-2 py-0.5 text-[10px] font-medium transition", data.errorType === type ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-accent"),
									children: type
								}, type))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "❌ Mistake"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.mistakeMade || "",
							onChange: (e) => setData((d) => ({
								...d,
								mistakeMade: e.target.value
							})),
							rows: 2,
							placeholder: "What went wrong...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "✅ Learned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.whatLearned || "",
							onChange: (e) => setData((d) => ({
								...d,
								whatLearned: e.target.value
							})),
							rows: 2,
							placeholder: "Key concepts...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "💡 Remember"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.rememberNext || "",
							onChange: (e) => setData((d) => ({
								...d,
								rememberNext: e.target.value
							})),
							rows: 1,
							placeholder: "Quick reminder...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold uppercase",
							children: "📝 Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: data.additionalNotes || "",
							onChange: (e) => setData((d) => ({
								...d,
								additionalNotes: e.target.value
							})),
							rows: 1,
							placeholder: "Extra notes...",
							className: "mt-0.5 w-full rounded-lg border bg-card p-2 text-xs outline-none focus:ring-2 focus:ring-ring"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioRecorder, {
							entryId,
							onAudioChange: (hasAudio) => setData((d) => ({
								...d,
								hasAudio
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleSave,
								disabled: isSaving,
								className: "flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50",
								children: isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline size-3 animate-spin" }), " Saving..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 inline size-3" }), " Save"] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onCancel,
								disabled: isSaving,
								className: "flex-1 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50",
								children: "Cancel"
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/review/ErrorJournalViewer.tsx
var AUDIO_SPEEDS = [
	.5,
	1,
	1.5,
	2
];
/**
* ErrorJournalViewer: READ-ONLY display of a preserved mistake.
* Shows the original question, image, audio, and your mistake notes.
* No solving, no reattempt, no practice.
*/
function ErrorJournalViewer({ entry, onClose }) {
	const [imageUrl, setImageUrl] = (0, import_react.useState)(null);
	const [imageLoading, setImageLoading] = (0, import_react.useState)(true);
	const [audioUrl, setAudioUrl] = (0, import_react.useState)(null);
	const [audioSpeed, setAudioSpeed] = (0, import_react.useState)(1);
	const [audioLoading, setAudioLoading] = (0, import_react.useState)(true);
	const [viewerOpen, setViewerOpen] = (0, import_react.useState)(false);
	const [viewerScale, setViewerScale] = (0, import_react.useState)(1);
	const [defaultImageScale, setDefaultImageScale] = (0, import_react.useState)(1);
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const audioRef = (0, import_react.useRef)(null);
	const viewerBackdropRef = (0, import_react.useRef)(null);
	const questionViewerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadImage = async () => {
			try {
				const blob = await getErrorJournalImage(entry.id);
				if (active && blob) setImageUrl(URL.createObjectURL(blob));
			} finally {
				if (active) setImageLoading(false);
			}
		};
		loadImage();
		return () => {
			active = false;
			if (imageUrl) URL.revokeObjectURL(imageUrl);
		};
	}, [entry.id]);
	(0, import_react.useEffect)(() => {
		let active = true;
		const loadAudio = async () => {
			try {
				const blob = await getErrorJournalAudio(entry.id);
				if (active && blob) setAudioUrl(URL.createObjectURL(blob));
			} finally {
				if (active) setAudioLoading(false);
			}
		};
		loadAudio();
		return () => {
			active = false;
			if (audioUrl) URL.revokeObjectURL(audioUrl);
		};
	}, [entry.id]);
	const handleSpeedChange = (rate) => {
		setAudioSpeed(rate);
		if (audioRef.current) audioRef.current.playbackRate = rate;
	};
	(0, import_react.useEffect)(() => {
		if (!viewerOpen) return;
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				if (document.fullscreenElement && questionViewerRef.current) {
					document.exitFullscreen();
					return;
				}
				setViewerOpen(false);
				return;
			}
			if (event.key === "+" || event.key === "=") {
				event.preventDefault();
				setViewerScale((s) => Math.min(4, Number((s + .25).toFixed(2))));
			}
			if (event.key === "-") {
				event.preventDefault();
				setViewerScale((s) => Math.max(.5, Number((s - .25).toFixed(2))));
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [viewerOpen]);
	(0, import_react.useEffect)(() => {
		const onFullscreenChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement && questionViewerRef.current && document.fullscreenElement === questionViewerRef.current));
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!viewerOpen || !imageUrl) return;
		const img = new Image();
		img.onload = () => {
			const viewport = questionViewerRef.current;
			if (!viewport) {
				setDefaultImageScale(1);
				return;
			}
			const rect = viewport.getBoundingClientRect();
			const availableWidth = Math.max(rect.width - 32, 320);
			const availableHeight = Math.max(rect.height - 32, 220);
			const ratio = Math.min(availableWidth / img.naturalWidth, availableHeight / img.naturalHeight);
			setDefaultImageScale(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
		};
		img.src = imageUrl;
	}, [viewerOpen, imageUrl]);
	const closeQuestionViewer = () => {
		if (document.fullscreenElement && questionViewerRef.current) document.exitFullscreen();
		setViewerOpen(false);
		setIsFullscreen(false);
	};
	const toggleFullscreen = async () => {
		const target = questionViewerRef.current;
		if (!target) return;
		try {
			if (!document.fullscreenElement) {
				if (typeof target.requestFullscreen === "function") await target.requestFullscreen();
			} else if (document.fullscreenElement === target) {
				if (typeof document.exitFullscreen === "function") await document.exitFullscreen();
			}
		} catch {}
	};
	const openQuestionViewer = () => {
		setViewerScale(1);
		setDefaultImageScale(1);
		setViewerOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [viewerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: viewerBackdropRef,
		className: "fixed inset-0 z-[60] flex items-center justify-center bg-background/75 p-2 sm:p-6 backdrop-blur-sm",
		onClick: (event) => {
			if (event.target === event.currentTarget) closeQuestionViewer();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: questionViewerRef,
			className: "flex h-full max-h-[100vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border/70 px-3 py-2 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wide text-muted-foreground",
					children: "Original Question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold text-foreground",
					children: "Full Screen Viewer"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setViewerScale((s) => Math.max(.5, Number((s - .25).toFixed(2)))),
							className: "rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground hover:bg-accent",
							"aria-label": "Zoom out",
							children: "−"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-12 text-center text-xs font-medium text-muted-foreground",
							children: [Math.round(viewerScale * 100), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setViewerScale((s) => Math.min(4, Number((s + .25).toFixed(2)))),
							className: "rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground hover:bg-accent",
							"aria-label": "Zoom in",
							children: "+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleFullscreen,
							className: "rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground hover:bg-accent",
							"aria-label": isFullscreen ? "Exit fullscreen" : "Enter fullscreen",
							children: isFullscreen ? "⛶ Exit Fullscreen" : "⛶ Fullscreen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setViewerScale(1),
							className: "rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground hover:bg-accent",
							children: "Reset"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: closeQuestionViewer,
							className: "rounded-md border border-border bg-card p-2 text-foreground hover:bg-accent",
							"aria-label": "Close viewer",
							title: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-auto p-3 sm:p-5",
				children: [entry.questionText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-xl border border-border/70 bg-card/60 p-3 text-sm text-foreground shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground",
						children: "Question Text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "whitespace-pre-wrap break-words leading-relaxed",
						children: entry.questionText
					})]
				}), imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[50vh] items-center justify-center rounded-xl border border-border/70 bg-background/60 p-2 sm:p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: imageUrl,
						alt: "Original question",
						draggable: false,
						className: "block select-none transition-transform duration-150 ease-out",
						style: {
							transform: `scale(${viewerScale * defaultImageScale})`,
							transformOrigin: "center center",
							maxWidth: "none",
							maxHeight: "none"
						}
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[50vh] items-center justify-center rounded-xl border border-dashed border-border/70 bg-card/30 p-4 text-sm text-muted-foreground",
					children: "No question image saved for this entry."
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/80 bg-card p-6 shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "📖 Review Mistake"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-lg border p-2 hover:bg-accent",
					title: "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg border bg-card/50 p-3 text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [
								entry.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Subject:"
									}),
									" ",
									entry.subject
								] }),
								entry.difficulty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Difficulty:"
									}),
									" ",
									entry.difficulty
								] }),
								entry.source && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Source:"
									}),
									" ",
									entry.source
								] }),
								entry.questionNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Question #:"
									}),
									" ",
									entry.questionNumber
								] }),
								entry.chapter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Chapter:"
									}),
									" ",
									entry.chapter
								] }),
								entry.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Topic:"
									}),
									" ",
									entry.topic
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Error Type:"
									}),
									" ",
									entry.errorType
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Status:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("ml-1 rounded-full px-2 py-0.5", entry.status === "Need Review" ? "bg-red-500/10 text-red-600" : entry.status === "Learning" ? "bg-yellow-500/10 text-yellow-600" : "bg-green-500/10 text-green-600"),
									children: [
										entry.status === "Need Review" && "🔴",
										entry.status === "Learning" && "🟡",
										entry.status === "Mastered" && "🟢",
										" " + entry.status
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Created:"
									}),
									" ",
									new Date(entry.createdAt).toLocaleString()
								] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "button",
						tabIndex: 0,
						onClick: openQuestionViewer,
						onKeyDown: (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								openQuestionViewer();
							}
						},
						className: "cursor-pointer space-y-2 rounded-lg border bg-card/50 p-4 transition hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold",
							children: "❓ Original Question"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-foreground",
							children: entry.questionText || "(No question text recorded)"
						})]
					}),
					!imageLoading && imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "button",
						tabIndex: 0,
						onClick: openQuestionViewer,
						onKeyDown: (event) => {
							if (event.key === "Enter" || event.key === " ") {
								event.preventDefault();
								openQuestionViewer();
							}
						},
						className: "cursor-pointer space-y-2 rounded-lg border bg-card/50 p-4 transition hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold",
							children: "📷 Original Question Image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageUrl,
							alt: "Original question",
							className: "max-h-96 max-w-full rounded-lg border object-contain"
						})]
					}),
					entry.mistakeMade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-red-500/30 bg-red-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-red-600",
							children: "❌ What Went Wrong"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.mistakeMade
						})]
					}),
					entry.whatLearned && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-green-500/30 bg-green-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-green-600",
							children: "✅ What I Learned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.whatLearned
						})]
					}),
					entry.rememberNext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-blue-600",
							children: "💡 Remember Next Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.rememberNext
						})]
					}),
					entry.additionalNotes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-purple-600",
							children: "📝 Additional Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: entry.additionalNotes
						})]
					}),
					(audioUrl || entry.hasAudio) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-lg border border-dashed bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold",
								children: "🎙️ My Audio Reflection"
							}),
							audioLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Loading audio..."
							}),
							audioUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
									ref: audioRef,
									src: audioUrl,
									controls: true,
									className: "w-full rounded-lg bg-card"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: AUDIO_SPEEDS.map((speed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleSpeedChange(speed),
										className: cn("rounded-md border px-2 py-1 text-xs font-semibold transition", audioSpeed === speed ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"),
										children: [speed, "×"]
									}, speed))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Click to play · Use speed controls · Your original recording"
								})
							] }) : !audioLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "No audio recording found for this entry."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90",
						children: "Done"
					})
				]
			})]
		})
	})] });
}
//#endregion
//#region src/components/review/ErrorJournalStats.tsx
function ErrorJournalStats({ entries }) {
	const stats = {
		total: entries.length,
		needReview: entries.filter((e) => e.status === "Need Review").length,
		learning: entries.filter((e) => e.status === "Learning").length,
		mastered: entries.filter((e) => e.status === "Mastered").length,
		withAudio: entries.filter((e) => e.hasAudio).length,
		withPhoto: entries.filter((e) => e.imageId).length
	};
	const errorCounts = {};
	entries.forEach((e) => {
		errorCounts[e.errorType] = (errorCounts[e.errorType] || 0) + 1;
	});
	const repeatedIssues = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground",
				children: "📊 Your Stats"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					{
						label: "Total Entries",
						value: stats.total,
						icon: "📝"
					},
					{
						label: "Need Review",
						value: stats.needReview,
						icon: "🔴"
					},
					{
						label: "Learning",
						value: stats.learning,
						icon: "🟡"
					},
					{
						label: "Mastered",
						value: stats.mastered,
						icon: "🟢"
					},
					{
						label: "With Audio",
						value: stats.withAudio,
						icon: "🎙️"
					},
					{
						label: "With Photo",
						value: stats.withPhoto,
						icon: "📷"
					}
				].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-lg font-bold",
						children: [
							stat.icon,
							" ",
							stat.value
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: stat.label
					})]
				}, stat.label))
			}),
			repeatedIssues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg bg-card p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs font-bold uppercase text-muted-foreground",
					children: "⚠️ Common Issues"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1",
					children: repeatedIssues.map(([errorType, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorType }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/20 px-2 py-0.5 font-semibold text-primary",
							children: count
						})]
					}, errorType))
				})]
			}),
			stats.total === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground italic",
				children: "Create your first entry to see stats"
			})
		]
	});
}
//#endregion
//#region src/routes/errorjournal.index.tsx
var Route$5 = createFileRoute("/errorjournal/")({
	head: () => ({ meta: [
		{ title: "Error Journal — JEE CBT Platform" },
		{
			name: "description",
			content: "Your personal Error Journal for tracking learning gaps, mistakes, and reflections."
		},
		{
			property: "og:title",
			content: "Error Journal"
		},
		{
			property: "og:description",
			content: "Track your errors and learning progress."
		}
	] }),
	component: ErrorJournalIndex
});
function ErrorJournalIndex() {
	const [editingEntry, setEditingEntry] = (0, import_react.useState)();
	const [showEditor, setShowEditor] = (0, import_react.useState)(false);
	const [viewingEntry, setViewingEntry] = (0, import_react.useState)();
	const errorEntries = useQuery({
		queryKey: ["errorJournal"],
		queryFn: listErrorJournalEntries
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "size-5" }), " Error Journal"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Review your preserved mistakes and learning notes. This is your personal archive for reflection and growth."
		}),
		errorEntries.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		!errorEntries.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalStats, { entries: errorEntries.data ?? [] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalList, {
				entries: errorEntries.data ?? [],
				onNew: () => {
					setEditingEntry(void 0);
					setShowEditor(true);
				},
				onView: (entry) => {
					setViewingEntry(entry);
				},
				onEdit: (entry) => {
					setEditingEntry(entry);
					setShowEditor(true);
				},
				onDelete: async (id) => {
					await deleteErrorJournalEntry(id);
					await errorEntries.refetch();
				}
			})
		})] }),
		showEditor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalEditor, {
			entry: editingEntry,
			onSave: async (entry) => {
				setShowEditor(false);
				setEditingEntry(void 0);
				await errorEntries.refetch();
			},
			onCancel: () => {
				setShowEditor(false);
				setEditingEntry(void 0);
			}
		}),
		viewingEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorJournalViewer, {
			entry: viewingEntry,
			onClose: () => {
				setViewingEntry(void 0);
			}
		})
	] });
}
//#endregion
//#region src/routes/notebook.index.tsx
var Route$4 = createFileRoute("/notebook/")({
	head: () => ({ meta: [
		{ title: "Wrong Notebook — JEE CBT Platform" },
		{
			name: "description",
			content: "Your mistakes grouped by test. Open any test to review only its wrong questions with reasons and learnings."
		},
		{
			property: "og:title",
			content: "Wrong Notebook — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every test you attempted with its wrong-question count."
		}
	] }),
	component: NotebookIndex
});
function NotebookIndex() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const rows = (reports.data ?? []).map((r) => ({
		id: r.attempt.id,
		name: r.attempt.testName,
		when: r.attempt.submittedAt ?? r.attempt.updatedAt,
		wrong: r.summary.wrong,
		total: r.questions.length
	})).filter((r) => r.wrong > 0).sort((a, b) => b.when - a.when);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-5" }), " Wrong Notebook"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Pick a test to review only the questions you got wrong."
		}),
		reports.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted-foreground",
			children: "Loading…"
		}),
		!reports.isLoading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "No mistakes recorded yet — submit a test to build your notebook."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-2",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/notebook/$attemptId",
				params: { attemptId: r.id },
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-semibold",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							new Date(r.when).toLocaleString(),
							" · ",
							r.total,
							" questions"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive",
					children: [r.wrong, " Wrong"]
				})]
			}) }, r.id))
		})
	] });
}
//#endregion
//#region src/routes/notebook.$attemptId.tsx
var Route$3 = createFileRoute("/notebook/$attemptId")({
	head: () => ({ meta: [
		{ title: "Wrong Questions Review — JEE CBT Platform" },
		{
			name: "description",
			content: "Only the wrong questions from this attempt, with sticky palette, subject filters, reasons and learnings."
		},
		{
			property: "og:title",
			content: "Wrong Questions Review"
		},
		{
			property: "og:description",
			content: "Review your mistakes from one test on a single page."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: NotebookAttempt
});
function NotebookAttempt() {
	const { attemptId } = Route$3.useParams();
	const q = useQuery({
		queryKey: ["notebook", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const [report, notes] = await Promise.all([buildReport(attempt), listNotes(attemptId)]);
			return {
				report,
				notes,
				sources: await originMap(report.questions.map((q) => q.id))
			};
		},
		retry: false
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading mistakes…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/notebook",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to notebook"
	})] });
	const { report, notes, sources } = q.data;
	const items = report.summary.perQuestion.filter((p) => p.status === "wrong").map((p) => ({
		question: p.question,
		answer: p.answer,
		status: p.status,
		score: p.score
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex items-center gap-2 truncate text-2xl font-bold tracking-tight",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-5" }),
					" ",
					report.attempt.testName
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [items.length, " wrong questions"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/notebook",
			className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
			children: "All tests"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
		items,
		sources,
		statuses: ["all"],
		paletteTitle: "Wrong Questions",
		emptyText: "No wrong questions for this subject.",
		renderFooter: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteEditor, {
			attemptId,
			questionId: r.question.id,
			mode: "wrong",
			initial: notes.find((n) => n.id === noteKey(attemptId, r.question.id))
		})
	})] });
}
//#endregion
//#region src/routes/result.$attemptId.tsx
var Route$2 = createFileRoute("/result/$attemptId")({
	head: () => ({ meta: [
		{ title: "Attempt analysis — JEE CBT Platform" },
		{
			name: "description",
			content: "Detailed JEE mock analysis: score, accuracy, negative marking, subject and chapter breakdown, time per question and full solutions."
		},
		{
			property: "og:title",
			content: "Attempt analysis — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Score, accuracy, timing and solution review for your attempt."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: ResultPage
});
function ResultPage() {
	const { attemptId } = Route$2.useParams();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const queryClient = useQueryClient();
	const bookmarkWriteChain = (0, import_react.useRef)(Promise.resolve());
	const q = useQuery({
		queryKey: ["result", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const test = await getTest(attempt.testId);
			const questions = attempt.questionsSnapshot ?? attempt.questionIds.map((id) => test?.questions.find((x) => x.id === id)).filter((x) => Boolean(x));
			return {
				attempt,
				summary: scoreAttempt({
					...test ?? {},
					questions
				}, attempt)
			};
		},
		retry: false
	});
	const rows = (0, import_react.useMemo)(() => {
		return (q.data?.summary.perQuestion ?? []).filter((r) => {
			if (filter === "all") return true;
			if (filter === "marked") return r.answer?.marked;
			if (filter === "bookmarked") return r.answer?.bookmarked;
			return r.status === filter;
		});
	}, [q.data, filter]);
	const saveNtaBookmark = (0, import_react.useCallback)((questionId, bookmarked, tag) => {
		const operation = bookmarkWriteChain.current.then(async () => {
			const current = await getAttempt(attemptId);
			if (!current || !current.submitted || current.mode !== "nta") throw new Error("This NTA attempt is no longer available.");
			const answer = current.answers[questionId];
			if (!answer) throw new Error("The question response could not be found.");
			const updated = {
				...current,
				updatedAt: Date.now(),
				answers: {
					...current.answers,
					[questionId]: {
						...answer,
						bookmarked,
						tag: bookmarked ? tag : void 0
					}
				}
			};
			await putAttempt(updated);
			queryClient.setQueryData(["result", attemptId], (data) => {
				if (!data) return data;
				return {
					...data,
					attempt: updated,
					summary: {
						...data.summary,
						perQuestion: data.summary.perQuestion.map((item) => item.question.id === questionId ? {
							...item,
							answer: updated.answers[questionId]
						} : item)
					}
				};
			});
			queryClient.invalidateQueries({ queryKey: ["reports"] });
			queryClient.invalidateQueries({ queryKey: ["attempts"] });
			queryClient.invalidateQueries({ queryKey: ["bookmarks", attemptId] });
		});
		bookmarkWriteChain.current = operation.then(() => void 0, () => void 0);
		return operation.catch((error) => {
			console.error("[nta-bookmark] failed to save question bookmark", error);
			toast.error("Could not save this bookmark. Please try again.");
			throw error;
		});
	}, [attemptId, queryClient]);
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading analysis…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/results",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to results"
	})] });
	const { attempt, summary } = q.data;
	const pct = summary.maxScore ? summary.score / summary.maxScore * 100 : 0;
	const xpEarned = xpForResultAttempt(attempt, q.data.summary.perQuestion.map((r) => r.question));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate text-2xl font-bold tracking-tight",
					children: attempt.testName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Submitted ", new Date(attempt.submittedAt ?? attempt.updatedAt).toLocaleString()]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/review/$attemptId",
					params: { attemptId },
					className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
					children: "Full Test Review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/results",
					className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
					children: "All results"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_minmax(0,1fr)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-5xl font-black tabular-nums",
						children: [summary.score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xl text-muted-foreground",
							children: ["/", summary.maxScore]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [pct.toFixed(1), "% of maximum"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }),
							label: "Correct",
							value: summary.correct
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 text-destructive" }),
							label: "Wrong",
							value: summary.wrong
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { className: "size-4 text-muted-foreground" }),
							label: "Skipped",
							value: summary.skipped
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-primary" }),
							label: "Accuracy",
							value: `${summary.accuracy.toFixed(1)}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-primary" }),
							label: "XP Earned",
							value: `+${xpEarned} XP`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
							label: "Time used",
							value: formatClock(summary.timeSpent)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Negative",
							value: summary.negative
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Avg / question",
							value: formatClock(summary.perQuestion.length ? summary.timeSpent / summary.perQuestion.length : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Attempted",
							value: summary.correct + summary.wrong
						})
					]
				}),
				attempt.proctor && attempt.proctor.tabSwitches + attempt.proctor.fullscreenExits + attempt.proctor.blurs > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
					children: [
						"Exam integrity: ",
						attempt.proctor.tabSwitches,
						" tab switch(es) ·",
						" ",
						attempt.proctor.fullscreenExits,
						" fullscreen exit(s) · ",
						attempt.proctor.blurs,
						" focus loss(es) recorded during this attempt."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breakdown, {
				title: "Subject-wise",
				rows: summary.bySubject
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breakdown, {
				title: "Chapter-wise (strong vs weak)",
				rows: summary.byChapter
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-lg font-bold",
			children: "Question review"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children: [
				"all",
				"correct",
				"wrong",
				"skipped",
				"marked",
				"bookmarked"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(f),
				className: cn("rounded-full border px-3 py-1 text-xs capitalize", filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: f
			}, f))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-4",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No questions in this filter."
			}), rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate text-xs font-semibold text-muted-foreground",
							children: [
								"Q",
								r.question.number || i + 1,
								" · ",
								formatClock(r.answer?.timeSpent ?? 0),
								" spent"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("rounded-full px-2.5 py-1 text-[11px] font-bold capitalize", r.status === "correct" && "bg-answered text-answered-foreground", r.status === "wrong" && "bg-notanswered text-notanswered-foreground", r.status === "skipped" && "bg-notvisited text-notvisited-foreground"),
							children: [
								r.status,
								" ",
								r.score > 0 ? `+${r.score}` : r.score
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
						question: r.question,
						value: r.answer?.value ?? null,
						readOnly: true,
						showAnswer: true
					}),
					attempt.mode === "nta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaBookmarkCategoryControl, {
						questionId: r.question.id,
						bookmarked: Boolean(r.answer?.bookmarked),
						tag: r.answer?.tag,
						onSave: saveNtaBookmark
					})
				]
			}, r.question.id))]
		})
	] });
}
function NtaBookmarkCategoryControl({ questionId, bookmarked, tag, onSave }) {
	const [category, setCategory] = (0, import_react.useState)(isNtaBookmarkCategory(tag) ? tag : NTA_BOOKMARK_CATEGORIES[0]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async (shouldBookmark) => {
		setSaving(true);
		try {
			await onSave(questionId, shouldBookmark, shouldBookmark ? category : void 0);
		} catch {
			return;
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex flex-wrap items-center gap-2 rounded-lg border bg-surface px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs font-semibold text-muted-foreground",
				htmlFor: `bookmark-${questionId}`,
				children: "Bookmark Category"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: `bookmark-${questionId}`,
				value: category,
				onChange: (event) => {
					if (isNtaBookmarkCategory(event.target.value)) setCategory(event.target.value);
				},
				className: "h-8 rounded-md border bg-background px-2 text-xs font-medium",
				disabled: saving,
				children: NTA_BOOKMARK_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: item,
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void save(true),
				disabled: saving || bookmarked && tag === category,
				className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50",
				children: saving ? "Saving…" : bookmarked ? tag === category ? "Bookmarked" : "Update category" : "Bookmark"
			}),
			bookmarked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void save(false),
				disabled: saving,
				className: "rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-50",
				children: "Remove"
			})
		]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-lg font-bold tabular-nums",
			children: value
		})]
	});
}
function Breakdown({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-3",
			children: rows.map((r) => {
				const attempted = r.correct + r.wrong;
				const acc = attempted ? r.correct / attempted * 100 : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground tabular-nums",
						children: [
							r.correct,
							"/",
							r.total,
							" · ",
							acc.toFixed(0),
							"% · ",
							formatClock(r.time)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex h-2 overflow-hidden rounded-full bg-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-answered",
							style: { width: `${r.correct / r.total * 100}%` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-notanswered",
							style: { width: `${r.wrong / r.total * 100}%` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-notvisited",
							style: { width: `${r.skipped / r.total * 100}%` }
						})
					]
				})] }, r.name);
			})
		})]
	});
}
//#endregion
//#region src/routes/review.$attemptId.tsx
var Route$1 = createFileRoute("/review/$attemptId")({
	head: () => ({ meta: [
		{ title: "Full Test Review — JEE CBT Platform" },
		{
			name: "description",
			content: "Review every question of a completed JEE attempt on one page with a sticky palette, status and subject filters, answers and solutions."
		},
		{
			property: "og:title",
			content: "Full Test Review — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "All questions, your answers, correct answers and solutions on a single page."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: ReviewPage
});
function ReviewPage() {
	const { attemptId } = Route$1.useParams();
	const q = useQuery({
		queryKey: ["review", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const report = await buildReport(attempt);
			const sources = await originMap(report.questions.map((q) => q.id));
			return {
				...report,
				sources
			};
		},
		retry: false
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading review…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/results",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to history"
	})] });
	const { attempt, summary, sources } = q.data;
	const items = summary.perQuestion.map((p) => ({
		question: p.question,
		answer: p.answer,
		status: p.status,
		score: p.score
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "flex items-center gap-2 truncate text-2xl font-bold tracking-tight",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
					" ",
					attempt.testName
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Full test review · ",
					summary.correct,
					" correct · ",
					summary.wrong,
					" wrong · ",
					summary.skipped,
					" ",
					"not attempted"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/result/$attemptId",
			params: { attemptId },
			className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
			children: "Score analysis"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {
		items,
		sources
	})] });
}
//#endregion
//#region src/components/Calculator.tsx
var KEYS = [
	{
		label: "sin",
		expr: "Math.sin(",
		kind: "fn"
	},
	{
		label: "cos",
		expr: "Math.cos(",
		kind: "fn"
	},
	{
		label: "tan",
		expr: "Math.tan(",
		kind: "fn"
	},
	{
		label: "ln",
		expr: "Math.log(",
		kind: "fn"
	},
	{
		label: "log",
		expr: "Math.log10(",
		kind: "fn"
	},
	{
		label: "√",
		expr: "Math.sqrt(",
		kind: "fn"
	},
	{
		label: "x²",
		expr: "**2",
		kind: "fn"
	},
	{
		label: "xʸ",
		expr: "**",
		kind: "fn"
	},
	{
		label: "π",
		expr: "Math.PI",
		kind: "fn"
	},
	{
		label: "e",
		expr: "Math.E",
		kind: "fn"
	},
	{
		label: "(",
		expr: "(",
		kind: "op"
	},
	{
		label: ")",
		expr: ")",
		kind: "op"
	},
	{
		label: "7",
		kind: "num"
	},
	{
		label: "8",
		kind: "num"
	},
	{
		label: "9",
		kind: "num"
	},
	{
		label: "÷",
		expr: "/",
		kind: "op"
	},
	{
		label: "4",
		kind: "num"
	},
	{
		label: "5",
		kind: "num"
	},
	{
		label: "6",
		kind: "num"
	},
	{
		label: "×",
		expr: "*",
		kind: "op"
	},
	{
		label: "1",
		kind: "num"
	},
	{
		label: "2",
		kind: "num"
	},
	{
		label: "3",
		kind: "num"
	},
	{
		label: "−",
		expr: "-",
		kind: "op"
	},
	{
		label: "0",
		kind: "num"
	},
	{
		label: ".",
		kind: "num"
	},
	{
		label: "E",
		expr: "e",
		kind: "num"
	},
	{
		label: "+",
		expr: "+",
		kind: "op"
	}
];
function Calculator({ onClose, initialExpr = "", onExprChange }) {
	const [expr, setExprState] = (0, import_react.useState)(initialExpr);
	const setExpr = (v) => setExprState((cur) => {
		const next = typeof v === "function" ? v(cur) : v;
		onExprChange?.(next);
		return next;
	});
	const [out, setOut] = (0, import_react.useState)("0");
	const evaluate = () => {
		try {
			const value = Function(`"use strict"; return (${expr || "0"})`)();
			if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("bad");
			setOut(String(Number(value.toPrecision(12))));
		} catch {
			setOut("Error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-72 rounded-xl border bg-card p-3 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
					children: "Scientific Calculator"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "close"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 rounded-lg border bg-surface p-2 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: expr,
					onChange: (e) => setExpr(e.target.value),
					onKeyDown: (e) => {
						e.stopPropagation();
						if (e.key === "Enter") evaluate();
					},
					className: "w-full bg-transparent text-right font-mono text-sm outline-none",
					placeholder: "0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-lg font-semibold",
					children: out
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-4 gap-1",
				children: [
					KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setExpr((v) => v + (k.expr ?? k.label)),
						className: cn("rounded-md py-2 font-mono text-sm transition-colors", k.kind === "num" ? "bg-secondary hover:bg-accent" : "bg-muted hover:bg-accent"),
						children: k.label
					}, k.label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setExpr("");
							setOut("0");
						},
						className: "rounded-md bg-destructive/15 py-2 text-sm text-destructive",
						children: "AC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setExpr((v) => v.slice(0, -1)),
						className: "rounded-md bg-muted py-2 text-sm",
						children: "⌫"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: evaluate,
						className: "col-span-2 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground",
						children: "="
					})
				]
			})
		]
	});
}
//#endregion
//#region src/routes/test.$attemptId.tsx
/** Strict Mode auto-submits after this many violations. */
var STRICT_LIMIT = 3;
function isNumericalQuestion(question) {
	return question?.type === "integer" || question?.type === "numerical";
}
var Route = createFileRoute("/test/$attemptId")({
	head: () => ({ meta: [
		{ title: "Test in progress — JEE CBT Platform" },
		{
			name: "description",
			content: "NTA-style CBT test window with countdown timer, question palette, figures gallery and scientific calculator."
		},
		{
			property: "og:title",
			content: "Test in progress — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Attempt your JEE mock in an exam-grade interface."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: TestRunner
});
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator$1, { className: "size-4" })
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {
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
//#region src/routeTree.gen.ts
var IndexRoute = Route$34.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$35
});
var AdvancedRoute = Route$33.update({
	id: "/advanced",
	path: "/advanced",
	getParentRoute: () => Route$35
});
var AnalyticsRoute = Route$32.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$35
});
var BankRoute = Route$31.update({
	id: "/bank",
	path: "/bank",
	getParentRoute: () => Route$35
});
var CreateRoute = Route$30.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => Route$35
});
var FiguresRoute = Route$29.update({
	id: "/figures",
	path: "/figures",
	getParentRoute: () => Route$35
});
var GeminiTestRoute = Route$28.update({
	id: "/gemini-test",
	path: "/gemini-test",
	getParentRoute: () => Route$35
});
var ImportRoute = Route$27.update({
	id: "/import",
	path: "/import",
	getParentRoute: () => Route$35
});
var LibraryRoute = Route$26.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$35
});
var LiveTestsRoute = Route$25.update({
	id: "/live-tests",
	path: "/live-tests",
	getParentRoute: () => Route$35
});
var MentorRoute = Route$24.update({
	id: "/mentor",
	path: "/mentor",
	getParentRoute: () => Route$35
});
var MistakesRoute = Route$23.update({
	id: "/mistakes",
	path: "/mistakes",
	getParentRoute: () => Route$35
});
var NotesRoute = Route$22.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => Route$35
});
var PracticeRoute = Route$21.update({
	id: "/practice",
	path: "/practice",
	getParentRoute: () => Route$35
});
var ResultsRoute = Route$20.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => Route$35
});
var ResumesRoute = Route$19.update({
	id: "/resumes",
	path: "/resumes",
	getParentRoute: () => Route$35
});
var SettingsRoute = Route$18.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$35
});
var SitemapDotxmlRoute = Route$17.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$35
});
var XpRoute = Route$16.update({
	id: "/xp",
	path: "/xp",
	getParentRoute: () => Route$35
});
var AdvancedIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdvancedRoute
});
var AdvancedAnalyticsRoute = Route$14.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AdvancedRoute
});
var AdvancedBankRoute = Route$13.update({
	id: "/bank",
	path: "/bank",
	getParentRoute: () => AdvancedRoute
});
var AdvancedBookmarksRoute = Route$12.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => AdvancedRoute
});
var AdvancedHistoryRoute = Route$11.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => AdvancedRoute
});
var AdvancedImportRoute = Route$10.update({
	id: "/import",
	path: "/import",
	getParentRoute: () => AdvancedRoute
});
var AdvancedPracticeRoute = Route$9.update({
	id: "/practice",
	path: "/practice",
	getParentRoute: () => AdvancedRoute
});
var AdvancedPyqRoute = Route$8.update({
	id: "/pyq",
	path: "/pyq",
	getParentRoute: () => AdvancedRoute
});
var BookmarksIndexRoute = Route$7.update({
	id: "/bookmarks/",
	path: "/bookmarks/",
	getParentRoute: () => Route$35
});
var BookmarksAttemptIdRoute = Route$6.update({
	id: "/bookmarks/$attemptId",
	path: "/bookmarks/$attemptId",
	getParentRoute: () => Route$35
});
var ErrorjournalIndexRoute = Route$5.update({
	id: "/errorjournal/",
	path: "/errorjournal/",
	getParentRoute: () => Route$35
});
var NotebookIndexRoute = Route$4.update({
	id: "/notebook/",
	path: "/notebook/",
	getParentRoute: () => Route$35
});
var NotebookAttemptIdRoute = Route$3.update({
	id: "/notebook/$attemptId",
	path: "/notebook/$attemptId",
	getParentRoute: () => Route$35
});
var ResultAttemptIdRoute = Route$2.update({
	id: "/result/$attemptId",
	path: "/result/$attemptId",
	getParentRoute: () => Route$35
});
var ReviewAttemptIdRoute = Route$1.update({
	id: "/review/$attemptId",
	path: "/review/$attemptId",
	getParentRoute: () => Route$35
});
var TestAttemptIdRoute = Route.update({
	id: "/test/$attemptId",
	path: "/test/$attemptId",
	getParentRoute: () => Route$35
});
var AdvancedRouteChildren = {
	AdvancedAnalyticsRoute,
	AdvancedBankRoute,
	AdvancedBookmarksRoute,
	AdvancedHistoryRoute,
	AdvancedImportRoute,
	AdvancedPracticeRoute,
	AdvancedPyqRoute,
	AdvancedIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdvancedRoute: AdvancedRoute._addFileChildren(AdvancedRouteChildren),
	AnalyticsRoute,
	BankRoute,
	CreateRoute,
	FiguresRoute,
	GeminiTestRoute,
	ImportRoute,
	LibraryRoute,
	LiveTestsRoute,
	MentorRoute,
	MistakesRoute,
	NotesRoute,
	PracticeRoute,
	ResultsRoute,
	ResumesRoute,
	SettingsRoute,
	SitemapDotxmlRoute,
	XpRoute,
	BookmarksAttemptIdRoute,
	NotebookAttemptIdRoute,
	ResultAttemptIdRoute,
	ReviewAttemptIdRoute,
	TestAttemptIdRoute,
	BookmarksIndexRoute,
	ErrorjournalIndexRoute,
	NotebookIndexRoute
};
var routeTree = Route$35._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: { queries: {
			staleTime: 3e4,
			gcTime: 5 * 6e4,
			refetchOnWindowFocus: false,
			retry: 0
		} } }) },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadDelay: 40,
		defaultPreloadStaleTime: 3e4
	});
};
//#endregion
export { getRouter };
