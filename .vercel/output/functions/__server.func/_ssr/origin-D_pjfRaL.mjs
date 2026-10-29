import { V as listTests } from "./db-CAmn2mwk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/origin-D_pjfRaL.js
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
export { originMap as t };
