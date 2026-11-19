import { validQuestions } from "./validate";
import type { Question } from "./types";

export function selectValidBankQuestions(
  questions: Question[],
  count: number,
  random: () => number = Math.random,
): Question[] {
  const valid = validQuestions(questions);
  if (!Number.isInteger(count) || count < 1 || count > valid.length) {
    throw new RangeError(`Select between 1 and ${valid.length} valid questions.`);
  }
  if (count === valid.length) return valid;

  const selected = [...valid];
  for (let index = 0; index < count; index += 1) {
    const randomIndex = index + Math.floor(random() * (selected.length - index));
    [selected[index], selected[randomIndex]] = [selected[randomIndex], selected[index]];
  }
  return selected.slice(0, count);
}
