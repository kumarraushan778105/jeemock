import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn, s as formatClock } from "./xp-CqT-O4I5.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ot as ChartColumn } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { t as allReports } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BqKo7wlm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function makeBucket(name) {
	return {
		name,
		total: 0,
		correct: 0,
		wrong: 0,
		skipped: 0,
		time: 0,
		score: 0
	};
}
function AnalyticsPage() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const data = (0, import_react.useMemo)(() => {
		const list = reports.data ?? [];
		const group = (key) => {
			const map = /* @__PURE__ */ new Map();
			for (const r of list) for (const pq of r.summary.perQuestion) {
				const k = key(pq.question) || "General";
				const b = map.get(k) ?? makeBucket(k);
				b.total += 1;
				b.score += pq.score;
				b.time += pq.answer?.timeSpent ?? 0;
				b[pq.status] += 1;
				map.set(k, b);
			}
			return [...map.values()];
		};
		const flat = list.flatMap((r) => r.summary.perQuestion);
		const answered = flat.filter((p) => p.status !== "skipped");
		const timed = answered.filter((p) => (p.answer?.timeSpent ?? 0) > 0);
		const sortedByTime = [...timed].sort((a, b) => (a.answer?.timeSpent ?? 0) - (b.answer?.timeSpent ?? 0));
		const daily = /* @__PURE__ */ new Map();
		for (const r of list) {
			const day = new Date(r.attempt.submittedAt ?? r.attempt.updatedAt).toISOString().slice(0, 10);
			const cur = daily.get(day) ?? {
				day,
				score: 0,
				tests: 0,
				accuracy: 0
			};
			cur.tests += 1;
			cur.score += r.summary.score;
			cur.accuracy = (cur.accuracy * (cur.tests - 1) + r.summary.accuracy) / cur.tests;
			daily.set(day, cur);
		}
		const chapters = group((q) => q.chapter).filter((b) => b.total >= 2);
		const acc = (b) => b.correct + b.wrong ? b.correct / (b.correct + b.wrong) * 100 : 0;
		const wrongEntries = flat.filter((p) => p.status === "wrong");
		const avgWrongTime = wrongEntries.length > 0 ? wrongEntries.reduce((sum, p) => sum + (p.answer?.timeSpent ?? 0), 0) / wrongEntries.length : 0;
		const mistakeTypes = /* @__PURE__ */ new Map();
		const classifyMistake = (question, timeSpent) => {
			const label = `${question.subject} ${question.chapter} ${question.topic} ${question.type}`.toLowerCase();
			if (/formula|derivative|integral|differential|matrix|determinant|algebra|equation|complex|vector|probab|trig|geometry/.test(label)) return "Formula / concept gap";
			if (question.type === "numerical" || question.type === "integer" || question.type === "matrix") return "Calculation error";
			if (timeSpent > avgWrongTime * 1.5) return "Time pressure / careless";
			if (/bond|reaction|mechanism|electro|organic|thermo|kinetics|current|optics|modern|wave/.test(label)) return "Concept misunderstanding";
			return "Concept gap";
		};
		for (const item of wrongEntries) {
			const type = classifyMistake(item.question, item.answer?.timeSpent ?? 0);
			const current = mistakeTypes.get(type) ?? {
				type,
				count: 0,
				marksLost: 0,
				pct: 0
			};
			current.count += 1;
			current.marksLost += item.question.marks;
			mistakeTypes.set(type, current);
		}
		const mistakeTypeRows = [...mistakeTypes.values()].map((row) => ({
			...row,
			pct: wrongEntries.length ? row.count / wrongEntries.length * 100 : 0
		})).sort((a, b) => b.count - a.count || b.marksLost - a.marksLost).slice(0, 5);
		const repeatedQuestions = /* @__PURE__ */ new Map();
		for (const item of wrongEntries) {
			const key = `${item.question.subject}::${item.question.chapter}::${item.question.topic || item.question.id}`;
			const current = repeatedQuestions.get(key) ?? {
				key,
				label: item.question.topic || item.question.chapter,
				subject: item.question.subject,
				chapter: item.question.chapter,
				count: 0,
				attemptId: item.answer ? "" : ""
			};
			current.count += 1;
			repeatedQuestions.set(key, current);
		}
		const repeatedMistakes = [...repeatedQuestions.values()].filter((row) => row.count > 1).sort((a, b) => b.count - a.count).slice(0, 6);
		const topicBuckets = /* @__PURE__ */ new Map();
		for (const r of list) for (const p of r.summary.perQuestion) {
			const q = p.question;
			const key = q.topic || q.chapter || q.subject;
			const cur = topicBuckets.get(key) ?? {
				name: key,
				subject: q.subject,
				chapter: q.chapter,
				total: 0,
				correct: 0,
				wrong: 0,
				repeated: 0,
				time: 0
			};
			cur.total += 1;
			cur.time += p.answer?.timeSpent ?? 0;
			if (p.status === "correct") cur.correct += 1;
			if (p.status === "wrong") cur.wrong += 1;
			topicBuckets.set(key, cur);
		}
		for (const item of repeatedMistakes) {
			const found = [...topicBuckets.values()].find((t) => t.name === item.label);
			if (found) found.repeated = item.count;
		}
		const weakestTopics = [...topicBuckets.values()].filter((b) => b.total >= 2).map((b) => {
			const accuracy = b.total ? b.correct / b.total * 100 : 0;
			const repeatedPenalty = Math.min(35, (b.repeated || 0) * 12);
			const wrongPenalty = Math.min(45, b.wrong * 9);
			const totalPenalty = Math.max(0, 100 - accuracy) + wrongPenalty + repeatedPenalty;
			let priority = "Low";
			if (accuracy < 35 || b.wrong >= 5 || (b.repeated || 0) >= 3) priority = "Critical";
			else if (accuracy < 50 || b.wrong >= 3 || (b.repeated || 0) >= 2) priority = "High";
			else if (accuracy < 70 || b.wrong >= 1) priority = "Medium";
			return {
				...b,
				accuracy,
				score: totalPenalty,
				priority
			};
		}).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, 5);
		const practiceNext = weakestTopics.slice(0, 5).map((topic, idx) => {
			const accuracy = topic.accuracy;
			let priority = "Low";
			let reason = "Your accuracy is improving here — keep reinforcing the fundamentals.";
			if (accuracy < 35 || topic.wrong >= 5 || (topic.repeated || 0) >= 3) {
				priority = "Critical";
				reason = `Very low accuracy and repeated errors in ${topic.name}. Prioritise recall drills and concept review.`;
			} else if (accuracy < 50 || topic.wrong >= 3 || (topic.repeated || 0) >= 2) {
				priority = "High";
				reason = `This topic keeps coming back wrong. Focus on quick revision and error-correction practice.`;
			} else if (accuracy < 70 || topic.wrong >= 1) {
				priority = "Medium";
				reason = `Accuracy is fair but inconsistent. A short focused review should improve consistency.`;
			}
			return {
				id: `${topic.subject}-${topic.chapter}-${topic.name}-${idx}`,
				topic: topic.name,
				subject: topic.subject,
				chapter: topic.chapter,
				reason,
				priority
			};
		});
		return {
			count: list.length,
			correct: flat.filter((p) => p.status === "correct").length,
			wrong: flat.filter((p) => p.status === "wrong").length,
			skipped: flat.filter((p) => p.status === "skipped").length,
			totalScore: list.reduce((a, r) => a + r.summary.score, 0),
			maxScore: list.reduce((a, r) => a + r.summary.maxScore, 0),
			negative: list.reduce((a, r) => a + r.summary.negative, 0),
			accuracy: answered.length ? flat.filter((p) => p.status === "correct").length / answered.length * 100 : 0,
			totalTime: flat.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
			avgTime: timed.length ? timed.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0) / timed.length : 0,
			fastest: sortedByTime[0],
			slowest: sortedByTime[sortedByTime.length - 1],
			subjects: group((q) => q.subject),
			chaptersWeak: [...chapters].sort((a, b) => acc(a) - acc(b)).slice(0, 6),
			chaptersStrong: [...chapters].sort((a, b) => acc(b) - acc(a)).slice(0, 6),
			topics: group((q) => q.topic).filter((b) => b.name !== "General" && b.total >= 2),
			difficulty: group((q) => q.difficulty),
			types: group((q) => q.type),
			daily: [...daily.values()].sort((a, b) => a.day.localeCompare(b.day)),
			acc,
			mistakeTypeRows,
			repeatedMistakes,
			weakestTopics,
			practiceNext,
			hasDiagnosticData: wrongEntries.length >= 3
		};
	}, [reports.data]);
	if (reports.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Crunching your attempts…"
	}) });
	if (data.count === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-bold tracking-tight",
		children: "Analytics"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
		children: "Submit at least one test to unlock analytics."
	})] });
	const acc = data.acc;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" }), " Analytics"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				"Across ",
				data.count,
				" submitted attempt",
				data.count === 1 ? "" : "s",
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total marks",
					value: `${data.totalScore} / ${data.maxScore}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Percentage",
					value: `${(data.maxScore ? data.totalScore / data.maxScore * 100 : 0).toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Overall accuracy",
					value: `${data.accuracy.toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Negative marks",
					value: String(data.negative),
					tone: "bad"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Correct",
					value: String(data.correct)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Wrong",
					value: String(data.wrong),
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Not attempted",
					value: String(data.skipped)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Avg time / question",
					value: `${Math.round(data.avgTime)}s`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total time",
					value: formatClock(data.totalTime)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Fastest question",
					value: data.fastest ? `Q${data.fastest.question.number} · ${data.fastest.answer?.timeSpent ?? 0}s` : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Slowest question",
					value: data.slowest ? `Q${data.slowest.question.number} · ${data.slowest.answer?.timeSpent ?? 0}s` : "—"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Subject performance",
			children: data.subjects.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				label: b.name,
				pct: acc(b),
				right: `${b.correct}/${b.total} · ${formatClock(b.time)}`
			}, b.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Weak chapters",
				children: [data.chaptersWeak.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: b.name,
					pct: acc(b),
					tone: "bad",
					right: `${b.correct}/${b.total}`
				}, b.name)), data.chaptersWeak.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Strong chapters",
				children: [data.chaptersStrong.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: b.name,
					pct: acc(b),
					tone: "good",
					right: `${b.correct}/${b.total}`
				}, b.name)), data.chaptersStrong.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})]
			})]
		}),
		data.topics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Topic accuracy",
			children: data.topics.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				label: b.name,
				pct: acc(b),
				right: `${b.correct}/${b.total}`
			}, b.name))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Difficulty analysis",
				children: data.difficulty.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: b.name,
					pct: acc(b),
					right: `${b.correct}/${b.total}`
				}, b.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Question type analysis",
				children: data.types.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: b.name,
					pct: acc(b),
					right: `${b.correct}/${b.total}`
				}, b.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Attempt analysis",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 text-center text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Correct",
						value: data.subjects.reduce((a, b) => a + b.correct, 0),
						tone: "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Wrong",
						value: data.subjects.reduce((a, b) => a + b.wrong, 0),
						tone: "bad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Skipped",
						value: data.subjects.reduce((a, b) => a + b.skipped, 0)
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "WHY AM I LOSING MARKS?",
			children: data.mistakeTypeRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.mistakeTypeRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									row.count,
									" · ",
									row.pct.toFixed(0),
									"%"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-2 overflow-hidden rounded-full bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-destructive transition-[width] duration-700 ease-out",
								style: { width: `${Math.min(100, row.pct)}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: ["Marks lost · ", row.marksLost]
						})
					]
				}, row.type))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "REPEATED MISTAKES",
			children: data.repeatedMistakes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.repeatedMistakes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs font-semibold",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate text-[11px] text-muted-foreground",
							children: [
								item.subject,
								" · ",
								item.chapter
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold text-destructive",
							children: [item.count, " times"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notebook",
							className: "rounded-lg border px-2 py-1 text-[11px] font-medium hover:bg-accent",
							children: "Review"
						})]
					})]
				}, item.key))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "WEAKEST TOPICS",
			children: data.weakestTopics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.weakestTopics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs font-semibold",
								children: topic.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-[11px] text-muted-foreground",
								children: [
									topic.subject,
									" · ",
									topic.chapter
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { level: topic.priority })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [topic.accuracy.toFixed(0), "% accuracy"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							topic.wrong,
							" wrong · ",
							topic.repeated || 0,
							" repeated"
						] })]
					})]
				}, `${topic.subject}-${topic.chapter}-${topic.name}`))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "WHAT SHOULD I PRACTICE NEXT?",
			children: data.practiceNext.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.practiceNext.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs font-semibold",
								children: item.topic
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: item.reason
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { level: item.priority })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practice",
							className: "rounded-lg border px-2 py-1 text-[11px] font-medium hover:bg-accent",
							children: "Practice"
						})
					})]
				}, item.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Daily progress",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end gap-2 overflow-x-auto pb-2",
				children: data.daily.map((d) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-12 shrink-0 flex-col items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-28 w-full items-end rounded bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded bg-primary transition-[height] duration-700 ease-out",
									style: { height: `${Math.max(6, Math.min(100, d.accuracy))}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground",
								children: d.day.slice(5)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-semibold",
								children: [d.accuracy.toFixed(0), "%"]
							})
						]
					}, d.day);
				})
			})
		})
	] });
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "premium-card rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-1 text-xl font-bold", tone === "bad" && "text-destructive"),
			children: value
		})]
	});
}
function Mini({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "premium-card rounded-lg bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("text-lg font-bold", tone === "good" && "text-answered", tone === "bad" && "text-destructive"),
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground",
			children: label
		})]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "premium-card mt-4 rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children
		})]
	});
}
function Empty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		children: "Not enough data yet."
	});
}
function PriorityBadge({ level }) {
	const palette = {
		Critical: "bg-destructive/10 text-destructive border-destructive/40",
		High: "bg-amber-500/10 text-amber-300 border-amber-500/40",
		Medium: "bg-primary/10 text-primary border-primary/40",
		Low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
	}[level];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide", palette),
		children: level
	});
}
function Bar({ label, pct, right, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate font-medium capitalize",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "shrink-0 text-muted-foreground",
			children: [
				right,
				" · ",
				pct.toFixed(0),
				"%"
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-2 overflow-hidden rounded-full bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full transition-[width] duration-700 ease-out", tone === "bad" ? "bg-destructive" : tone === "good" ? "bg-answered" : "bg-primary"),
			style: { width: `${Math.max(2, Math.min(100, pct))}%` }
		})
	})] });
}
//#endregion
export { AnalyticsPage as component };
