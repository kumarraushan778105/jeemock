import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as QUESTION_TYPE_LABEL, o as cn, s as formatClock } from "./xp-CqT-O4I5.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as Brain } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { t as allReports } from "./stats-B0uMixd3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as BarChart, o as Line, p as Legend, r as LineChart, s as CartesianGrid, t as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mistakes-sxGwcbC6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"var(--primary)",
	"var(--destructive)",
	"var(--muted-foreground)"
];
function MistakesPage() {
	const reports = useQuery({
		queryKey: ["reports"],
		queryFn: allReports
	});
	const data = (0, import_react.useMemo)(() => {
		const list = [...reports.data ?? []].sort((a, b) => (a.attempt.submittedAt ?? a.attempt.updatedAt) - (b.attempt.submittedAt ?? b.attempt.updatedAt));
		const group = (key, min = 1) => {
			const map = /* @__PURE__ */ new Map();
			for (const r of list) for (const pq of r.summary.perQuestion) {
				const k = key(pq.question) || "General";
				const b = map.get(k) ?? {
					name: k,
					total: 0,
					correct: 0,
					wrong: 0,
					skipped: 0,
					time: 0,
					accuracy: 0
				};
				b.total += 1;
				b.time += pq.answer?.timeSpent ?? 0;
				b[pq.status] += 1;
				map.set(k, b);
			}
			return [...map.values()].filter((b) => b.total >= min).map((b) => ({
				...b,
				accuracy: b.correct + b.wrong ? b.correct / (b.correct + b.wrong) * 100 : 0
			}));
		};
		const flat = list.flatMap((r) => r.summary.perQuestion);
		const correct = flat.filter((p) => p.status === "correct").length;
		const wrong = flat.filter((p) => p.status === "wrong").length;
		const skipped = flat.filter((p) => p.status === "skipped").length;
		const attempted = correct + wrong;
		const timed = flat.filter((p) => (p.answer?.timeSpent ?? 0) > 0);
		const subjects = group((q) => q.subject);
		const chapters = group((q) => q.chapter, 3);
		const topics = group((q) => q.topic, 3).filter((b) => b.name !== "General");
		const best = (arr) => [...arr].sort((a, b) => b.accuracy - a.accuracy)[0];
		const worst = (arr) => [...arr].sort((a, b) => a.accuracy - b.accuracy)[0];
		const trend = list.map((r, i) => ({
			name: `T${i + 1}`,
			accuracy: Number(r.summary.accuracy.toFixed(1)),
			score: r.summary.score,
			test: r.attempt.testName
		}));
		const timeByStatus = [
			{
				name: "Correct",
				seconds: Math.round(flat.filter((p) => p.status === "correct").reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0))
			},
			{
				name: "Wrong",
				seconds: Math.round(flat.filter((p) => p.status === "wrong").reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0))
			},
			{
				name: "Skipped",
				seconds: Math.round(flat.filter((p) => p.status === "skipped").reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0))
			}
		];
		const weakChapters = [...chapters].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5);
		const slowWrong = [...flat].filter((p) => p.status === "wrong").sort((a, b) => (b.answer?.timeSpent ?? 0) - (a.answer?.timeSpent ?? 0)).slice(0, 3);
		const recommendations = [];
		const overall = attempted ? correct / attempted * 100 : 0;
		for (const c of weakChapters.slice(0, 3)) recommendations.push(`Revise "${c.name}" — accuracy ${c.accuracy.toFixed(0)}% over ${c.total} questions.`);
		const weakSubject = worst(subjects);
		if (weakSubject) recommendations.push(`${weakSubject.name} is your weakest subject (${weakSubject.accuracy.toFixed(0)}%). Add a focused ${weakSubject.name} practice set.`);
		if (skipped > attempted * .25) recommendations.push(`You skipped ${skipped} questions. Practise timed sets to improve coverage before accuracy.`);
		if (wrong > 0 && overall < 60) recommendations.push("Negative marking is hurting you — attempt only questions you can justify in under 2 minutes.");
		for (const p of slowWrong) recommendations.push(`Q${p.question.number} (${p.question.chapter}) took ${p.answer?.timeSpent ?? 0}s and was wrong — review the concept, not just the answer.`);
		const weakType = worst(group((q) => QUESTION_TYPE_LABEL[q.type], 3));
		if (weakType) recommendations.push(`Drill ${weakType.name} questions — only ${weakType.accuracy.toFixed(0)}% accuracy so far.`);
		return {
			count: list.length,
			correct,
			wrong,
			skipped,
			overall,
			totalTime: flat.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0),
			avgTime: timed.length ? timed.reduce((a, p) => a + (p.answer?.timeSpent ?? 0), 0) / timed.length : 0,
			subjects,
			chapters: [...chapters].sort((a, b) => a.accuracy - b.accuracy).slice(0, 10),
			topics: [...topics].sort((a, b) => a.accuracy - b.accuracy).slice(0, 10),
			difficulty: group((q) => q.difficulty),
			types: group((q) => QUESTION_TYPE_LABEL[q.type]),
			trend,
			timeByStatus,
			pie: [
				{
					name: "Correct",
					value: correct
				},
				{
					name: "Wrong",
					value: wrong
				},
				{
					name: "Skipped",
					value: skipped
				}
			],
			strongSubject: best(subjects),
			weakSubject,
			strongChapter: best(chapters),
			weakChapter: worst(chapters),
			strongTopic: best(topics),
			weakTopic: worst(topics),
			recommendations: recommendations.slice(0, 6)
		};
	}, [reports.data]);
	if (reports.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Analysing your mistakes…"
	}) });
	if (data.count === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-bold tracking-tight",
		children: "Smart Mistake Analysis"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-6 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
		children: [
			"Submit a test to unlock mistake analysis.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/create",
				className: "text-primary underline",
				children: "Create a test"
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-5" }), " Smart Mistake Analysis"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				"Updated automatically after every completed test · ",
				data.count,
				" attempt",
				data.count === 1 ? "" : "s",
				" analysed."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Overall accuracy",
					value: `${data.overall.toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Correct",
					value: String(data.correct),
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Wrong",
					value: String(data.wrong),
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Skipped",
					value: String(data.skipped)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total time",
					value: formatClock(data.totalTime)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Avg time / question",
					value: `${Math.round(data.avgTime)}s`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Strongest subject",
					value: data.strongSubject ? `${data.strongSubject.name}` : "—",
					tone: "good"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Accuracy by subject",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: data.subjects,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--border)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							unit: "%",
							domain: [0, 100],
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "accuracy",
							name: "Accuracy %",
							fill: "var(--primary)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 750,
							animationEasing: "ease-out"
						})
					]
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Answer distribution",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: data.pie,
						dataKey: "value",
						nameKey: "name",
						outerRadius: 90,
						label: true,
						isAnimationActive: true,
						animationDuration: 800,
						animationEasing: "ease-out",
						children: data.pie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip })
				] }) })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			title: "Performance trend",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: data.trend,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						strokeDasharray: "3 3",
						stroke: "var(--border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "accuracy",
						name: "Accuracy %",
						stroke: "var(--primary)",
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: "var(--primary)",
							strokeWidth: 0
						},
						isAnimationActive: true,
						animationDuration: 700,
						animationEasing: "ease-out"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "score",
						name: "Score",
						stroke: "var(--success)",
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: "var(--success)",
							strokeWidth: 0
						},
						isAnimationActive: true,
						animationDuration: 700,
						animationEasing: "ease-out"
					})
				]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Weakest chapters",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, {
					height: Math.max(220, data.chapters.length * 32),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data.chapters,
						layout: "vertical",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								unit: "%",
								domain: [0, 100],
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "name",
								width: 120,
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "accuracy",
								name: "Accuracy %",
								fill: "var(--destructive)",
								radius: [
									0,
									6,
									6,
									0
								],
								isAnimationActive: true,
								animationDuration: 700,
								animationEasing: "ease-out"
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Weakest topics",
				children: data.topics.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Not enough topic data yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, {
					height: Math.max(220, data.topics.length * 32),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: data.topics,
						layout: "vertical",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								unit: "%",
								domain: [0, 100],
								tick: { fontSize: 11 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "name",
								width: 120,
								tick: { fontSize: 10 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "accuracy",
								name: "Accuracy %",
								fill: "var(--warning)",
								radius: [
									0,
									6,
									6,
									0
								],
								isAnimationActive: true,
								animationDuration: 700,
								animationEasing: "ease-out"
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Accuracy by difficulty",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: data.difficulty,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--border)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							unit: "%",
							domain: [0, 100],
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "accuracy",
							name: "Accuracy %",
							fill: "var(--primary)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 700,
							animationEasing: "ease-out"
						})
					]
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				title: "Accuracy by question type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: data.types,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--border)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: { fontSize: 10 },
							interval: 0,
							angle: -15,
							height: 50
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							unit: "%",
							domain: [0, 100],
							tick: { fontSize: 11 }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "accuracy",
							name: "Accuracy %",
							fill: "var(--success)",
							radius: [
								6,
								6,
								0,
								0
							],
							isAnimationActive: true,
							animationDuration: 700,
							animationEasing: "ease-out"
						})
					]
				}) })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			title: "Time analysis (seconds by outcome)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartBox, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: data.timeByStatus,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						strokeDasharray: "3 3",
						stroke: "var(--border)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "name",
						tick: { fontSize: 11 }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { ...tooltip }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "seconds",
						name: "Seconds",
						fill: "var(--primary)",
						radius: [
							6,
							6,
							0,
							0
						],
						isAnimationActive: true,
						animationDuration: 700,
						animationEasing: "ease-out"
					})
				]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Weakest subject",
					b: data.weakSubject,
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Weakest chapter",
					b: data.weakChapter,
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Weakest topic",
					b: data.weakTopic,
					tone: "bad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Strongest subject",
					b: data.strongSubject,
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Strongest chapter",
					b: data.strongChapter,
					tone: "good"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Extreme, {
					label: "Strongest topic",
					b: data.strongTopic,
					tone: "good"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			title: "What to practise next",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-sm",
				children: [data.recommendations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted-foreground",
					children: "Nothing critical — keep attempting full-length papers."
				}), data.recommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-lg border bg-surface p-3",
					children: r
				}, i))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
					children: "Start targeted practice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/notebook",
					className: "rounded-lg border px-3 py-1.5 text-xs font-semibold",
					children: "Open Wrong Notebook"
				})]
			})]
		})
	] });
}
var tooltip = {
	animationDuration: 220,
	animationEasing: "ease-out",
	contentStyle: {
		background: "var(--card)",
		border: "1px solid var(--border)",
		borderRadius: 12,
		fontSize: 12,
		color: "var(--foreground)",
		padding: "0.7rem 0.8rem"
	},
	itemStyle: {
		color: "var(--foreground)",
		padding: 0
	},
	labelStyle: {
		color: "var(--foreground)",
		fontWeight: 600
	}
};
function ChartBox({ children, height = 260 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		className: "chart-animated w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children
		})
	});
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "premium-card mt-4 rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-bold uppercase tracking-wide",
			children: title
		}), children]
	});
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mt-1 text-xl font-bold", tone === "bad" && "text-destructive", tone === "good" && "text-success"),
			children: value
		})]
	});
}
function Extreme({ label, b, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] font-semibold uppercase text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1 truncate text-sm font-bold", tone === "bad" ? "text-destructive" : "text-success"),
				children: b ? b.name : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-muted-foreground",
				children: b ? `${b.accuracy.toFixed(0)}% · ${b.correct}/${b.total} correct` : "Not enough data"
			})
		]
	});
}
//#endregion
export { MistakesPage as component };
