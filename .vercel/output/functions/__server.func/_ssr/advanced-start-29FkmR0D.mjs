import { at as uid } from "./db-CAmn2mwk.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced-start-29FkmR0D.js
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
export { startAdvancedTest as t };
