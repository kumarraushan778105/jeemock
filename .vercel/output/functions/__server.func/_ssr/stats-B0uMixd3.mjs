import { b as scoreAttempt, d as isAnswered } from "./xp-CqT-O4I5.mjs";
import { F as listAttempts, V as listTests, j as getTest } from "./db-CAmn2mwk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-B0uMixd3.js
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
export { questionsForAttempt as a, dashboardStats as i, asTest as n, buildReport as r, allReports as t };
