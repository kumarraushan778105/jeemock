import { G as putAttempt, W as orderQuestionsBySubject, at as uid, i as bumpUsage } from "./db-CAmn2mwk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attempt-Bn78nzqR.js
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
export { startAttempt as t };
