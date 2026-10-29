import type { Attempt, Question } from "./types";

export const NTA_BOOKMARK_CATEGORIES = [
  "Revision",
  "Doubt",
  "Important",
  "Practice Again",
] as const;

export type NtaBookmarkCategory = (typeof NTA_BOOKMARK_CATEGORIES)[number];

export function isNtaBookmarkCategory(value: string | undefined): value is NtaBookmarkCategory {
  return NTA_BOOKMARK_CATEGORIES.some((category) => category === value);
}

export function addMarkedQuestionsToBookmarks(
  answers: Attempt["answers"],
  questions: Question[],
  alreadyBookmarkedQuestionIds: ReadonlySet<string>,
): Attempt["answers"] {
  let nextAnswers = answers;

  for (const question of questions) {
    const answer = nextAnswers[question.id];
    if (!answer?.marked || answer.bookmarked || alreadyBookmarkedQuestionIds.has(question.id)) {
      continue;
    }

    if (nextAnswers === answers) nextAnswers = { ...answers };
    nextAnswers[question.id] = { ...answer, bookmarked: true };
  }

  return nextAnswers;
}
