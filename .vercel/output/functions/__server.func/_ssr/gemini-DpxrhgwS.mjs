import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-CiTosRW4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini-DpxrhgwS.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var GEMINI_RATE_LIMIT_MESSAGE = "AI Mentor is temporarily unavailable because the AI limit has been reached. Please try again later.";
var DEFAULT_GEMINI_RETRY_SECONDS = 35;
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
var askMentor_createServerFn_handler = createServerRpc({
	id: "da46f129e8889c0f907585c9cd88a735667c300b4a8eba6c0cbccc39c97e2a6c",
	name: "askMentor",
	filename: "src/lib/ai/gemini.ts"
}, (opts) => askMentor.__executeServer(opts));
var askMentor = createServerFn({ method: "POST" }).validator((data) => data).handler(askMentor_createServerFn_handler, async ({ data }) => {
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
//#endregion
export { askMentor_createServerFn_handler };
