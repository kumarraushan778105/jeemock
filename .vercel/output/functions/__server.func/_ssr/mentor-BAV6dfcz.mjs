import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ft as ArrowRight, Nt as BookOpen, O as PanelLeftOpen, Q as Gauge, R as MessageSquareText, d as Target, jt as BrainCircuit, k as PanelLeftClose, o as TriangleAlert, p as Sparkles, s as TrendingUp, u as TimerReset } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { V as listTests } from "./db-CAmn2mwk.mjs";
import { t as allReports } from "./stats-B0uMixd3.mjs";
import { n as bankItems } from "./bank-Q2zv39_H.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as mathToHtml } from "./MathText-DrvVO8lf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
import { a as getTodayDateKey, c as shouldShortCircuitMentorQuestion, i as getGeminiRequestUsageSummary, n as askMentor, o as incrementGeminiRequestUsage, r as getGeminiRequestUsage, s as normalizeMentorQuestion, t as GEMINI_RATE_LIMIT_MESSAGE } from "./gemini-CZw1GLr8.mjs";
import { t as Button } from "./button-PUICoR6j.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, n as BarChart, o as Line, r as LineChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mentor-BAV6dfcz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
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
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
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
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
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
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
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
export { Mentor as component, renderMentorMessageHtml };
