import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-CiTosRW4.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CdVQ0K__.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini-CZw1GLr8.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var GEMINI_RATE_LIMIT_MESSAGE = "AI Mentor is temporarily unavailable because the AI limit has been reached. Please try again later.";
var DAILY_USAGE_KEY = "jee-gemini-usage-v1";
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
var askMentor = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("da46f129e8889c0f907585c9cd88a735667c300b4a8eba6c0cbccc39c97e2a6c"));
async function testGemini() {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) return "GEMINI_API_KEY is not configured";
	return (await new GoogleGenAI({ apiKey }).models.generateContent({
		model: "gemini-3.6-flash",
		contents: "Reply with a single sentence confirming the API is reachable."
	})).text ?? "No response was returned.";
}
//#endregion
export { getTodayDateKey as a, shouldShortCircuitMentorQuestion as c, getGeminiRequestUsageSummary as i, testGemini as l, askMentor as n, incrementGeminiRequestUsage as o, getGeminiRequestUsage as r, normalizeMentorQuestion as s, GEMINI_RATE_LIMIT_MESSAGE as t };
