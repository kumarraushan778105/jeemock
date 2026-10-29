//#region node_modules/.nitro/vite/services/ssr/assets/nta-review-DZoU1Y7j.js
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
export { addMarkedQuestionsToBookmarks as n, isNtaBookmarkCategory as r, NTA_BOOKMARK_CATEGORIES as t };
