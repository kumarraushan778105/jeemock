import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as isCorrect } from "./xp-CqT-O4I5.mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { F as listAttempts } from "./db-CAmn2mwk.mjs";
import { r as buildReport } from "./stats-B0uMixd3.mjs";
import { d as isAdvancedAttempt } from "./advanced-D6ylZ9Tw.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.analytics-DqrO_WkO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Bar({ label, correct, total }) {
	const pct = total ? correct / total * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted-foreground",
			children: [
				correct,
				"/",
				total,
				" · ",
				pct.toFixed(0),
				"%"
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-2 rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2 rounded-full bg-primary",
			style: { width: `${pct}%` }
		})
	})] });
}
function AdvancedAnalytics() {
	const { data } = useQuery({
		queryKey: ["adv", "analytics"],
		queryFn: async () => {
			const attempts = (await listAttempts()).filter((a) => isAdvancedAttempt(a) && a.submitted);
			return Promise.all(attempts.map(buildReport));
		}
	});
	const agg = (0, import_react.useMemo)(() => {
		const subject = /* @__PURE__ */ new Map();
		const chapter = /* @__PURE__ */ new Map();
		const difficulty = /* @__PURE__ */ new Map();
		const paper = /* @__PURE__ */ new Map();
		let score = 0;
		let correct = 0;
		let attempted = 0;
		for (const r of data ?? []) {
			score += r.summary.score;
			for (const q of r.questions) {
				const ans = r.attempt.answers[q.id];
				if (ans?.value == null || String(ans.value).length === 0) continue;
				const ok = isCorrect(q, ans.value);
				attempted += 1;
				if (ok) correct += 1;
				for (const [map, key] of [
					[subject, q.subject],
					[chapter, `${q.subject} · ${q.chapter}`],
					[difficulty, q.difficulty],
					[paper, `Paper ${r.attempt.paper ?? 1}`]
				]) {
					const b = map.get(key) ?? {
						correct: 0,
						total: 0
					};
					b.total += 1;
					if (ok) b.correct += 1;
					map.set(key, b);
				}
			}
		}
		const sort = (m) => [...m.entries()].sort((a, b) => b[1].total - a[1].total);
		return {
			subject: sort(subject),
			chapter: sort(chapter),
			difficulty: sort(difficulty),
			paper: sort(paper),
			score,
			accuracy: attempted ? correct / attempted * 100 : 0,
			tests: (data ?? []).length
		};
	}, [data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Advanced Analytics",
		subtitle: "Performance across your JEE Advanced tests only — Main analytics stay separate.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				["Tests taken", agg.tests],
				["Total marks", agg.score],
				["Accuracy", `${agg.accuracy.toFixed(1)}%`]
			].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase text-muted-foreground",
					children: l
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-2xl font-bold",
					children: v
				})]
			}, l))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-4 lg:grid-cols-2",
			children: [
				["Subject-wise", agg.subject],
				["Paper-wise", agg.paper],
				["Difficulty-wise", agg.difficulty],
				["Chapter-wise", agg.chapter.slice(0, 25)]
			].map(([title, rows]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold uppercase tracking-wide",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3",
					children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No data yet."
					}), rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: k,
						correct: v.correct,
						total: v.total
					}, k))]
				})]
			}, title))
		})]
	});
}
//#endregion
export { AdvancedAnalytics as component };
