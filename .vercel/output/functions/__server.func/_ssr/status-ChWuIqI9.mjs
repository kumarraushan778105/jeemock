import { d as isAnswered } from "./xp-CqT-O4I5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-ChWuIqI9.js
var STATUS_LABEL = {
	draft: "Draft",
	"in-progress": "In Progress",
	completed: "Completed"
};
function attemptStatus(a) {
	if (a.submitted || a.submittedAt) return "completed";
	return a.remainingSec < a.durationSec || Object.values(a.answers ?? {}).some((x) => x?.visited || isAnswered(x?.value ?? null)) ? "in-progress" : "draft";
}
var isCompleted = (a) => attemptStatus(a) === "completed";
/** draft + in-progress attempts are resumable; submitted ones never are */
var isResumable = (a) => attemptStatus(a) !== "completed";
//#endregion
export { isResumable as i, attemptStatus as n, isCompleted as r, STATUS_LABEL as t };
