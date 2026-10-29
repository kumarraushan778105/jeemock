import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as getXpState } from "./xp-CqT-O4I5.mjs";
import { b as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ot as ChartColumn, W as LayoutGrid, a as Trophy, at as FilePlusCorner, d as Target, et as FolderInput, gt as Clock, p as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { C as formatLiveWindowRange, F as listAttempts, H as listUpcomingLiveTests, S as formatLiveTestDate, V as listTests, at as uid, et as putTest, x as formatLiveDuration } from "./db-CAmn2mwk.mjs";
import { i as dashboardStats } from "./stats-B0uMixd3.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
import { r as isCompleted } from "./status-ChWuIqI9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWtgfQn7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function q(p) {
	return {
		id: `sq${p.number}`,
		subject: "Physics",
		chapter: "General",
		topic: "",
		difficulty: "Medium",
		type: "single",
		options: [],
		correct: [],
		images: [],
		marks: 4,
		negative: 1,
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: false
		},
		...p
	};
}
var opts = (a, b, c, d) => [
	{
		id: "A",
		text: a
	},
	{
		id: "B",
		text: b
	},
	{
		id: "C",
		text: c
	},
	{
		id: "D",
		text: d
	}
];
var SAMPLE_QUESTIONS = [
	q({
		number: 1,
		subject: "Physics",
		chapter: "Kinematics",
		topic: "Projectile Motion",
		text: "A particle is projected with speed $u$ at an angle $\\theta$ to the horizontal. The maximum height attained is $H = \\dfrac{u^2\\sin^2\\theta}{2g}$. If $u = 20\\,\\mathrm{m/s}$ and $\\theta = 30^\\circ$, find $H$ (take $g = 10\\,\\mathrm{m/s^2}$).",
		options: opts("$5\\,\\mathrm{m}$", "$10\\,\\mathrm{m}$", "$15\\,\\mathrm{m}$", "$20\\,\\mathrm{m}$"),
		correct: ["A"],
		solution: "$H = \\dfrac{(20)^2 (1/2)^2}{2\\times 10} = \\dfrac{400 \\times 0.25}{20} = 5\\,\\mathrm{m}$"
	}),
	q({
		number: 2,
		subject: "Physics",
		chapter: "Current Electricity",
		type: "numerical",
		difficulty: "Hard",
		text: "In a circuit, three resistors of $2\\,\\Omega$, $3\\,\\Omega$ and $6\\,\\Omega$ are connected in parallel across a $12\\,\\mathrm{V}$ battery of negligible internal resistance. Find the total current (in ampere).",
		answerValue: 12,
		negative: 0,
		solution: "$\\dfrac{1}{R} = \\dfrac12 + \\dfrac13 + \\dfrac16 = 1 \\Rightarrow R = 1\\,\\Omega$, so $I = 12\\,\\mathrm{A}$.",
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: false
		}
	}),
	q({
		number: 3,
		subject: "Chemistry",
		chapter: "Chemical Bonding",
		type: "multiple",
		text: "Which of the following species are paramagnetic? (More than one correct)",
		options: opts("$\\mathrm{O_2}$", "$\\mathrm{N_2}$", "$\\mathrm{O_2^-}$", "$\\mathrm{F_2}$"),
		correct: ["A", "C"],
		marks: 4,
		negative: 2,
		explanation: "$\\mathrm{O_2}$ and $\\mathrm{O_2^-}$ have unpaired electrons in $\\pi^*$ orbitals.",
		flags: {
			diagram: false,
			graph: false,
			table: false,
			chem: true
		}
	}),
	q({
		number: 4,
		subject: "Chemistry",
		chapter: "Thermodynamics",
		type: "assertion",
		text: "**Assertion (A):** For an isothermal reversible expansion of an ideal gas, $\\Delta U = 0$.\n**Reason (R):** Internal energy of an ideal gas depends only on temperature.",
		options: opts("Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true, R is false", "A is false, R is true"),
		correct: ["A"]
	}),
	q({
		number: 5,
		subject: "Mathematics",
		chapter: "Calculus",
		topic: "Definite Integrals",
		difficulty: "Hard",
		text: "Evaluate $\\displaystyle\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x + \\cos x}\\,dx$.",
		options: opts("$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{3}$", "$\\pi$"),
		correct: ["A"],
		solution: "Using the King property $I = \\int_0^{a} f(a-x)dx$, $2I = \\dfrac{\\pi}{2} \\Rightarrow I = \\dfrac{\\pi}{4}$."
	}),
	q({
		number: 6,
		subject: "Mathematics",
		chapter: "Matrices & Determinants",
		type: "integer",
		text: "If $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, find $\\det(A)$.",
		answerValue: 5,
		negative: 0,
		solution: "$\\det(A) = 2\\times3 - 1\\times1 = 5$"
	}),
	q({
		number: 7,
		subject: "Mathematics",
		chapter: "Matrices & Determinants",
		type: "matrix",
		text: "Match List-I with List-II.",
		matrix: {
			left: [
				"$\\lim_{x\\to0}\\frac{\\sin x}{x}$",
				"$\\frac{d}{dx}(\\ln x)$",
				"$\\int x\\,dx$"
			],
			right: [
				"$1/x$",
				"$1$",
				"$x^2/2 + C$"
			]
		},
		correct: [
			"B",
			"A",
			"C"
		],
		marks: 4,
		negative: 1
	}),
	q({
		number: 8,
		subject: "Physics",
		chapter: "Modern Physics",
		type: "table",
		text: "The table shows stopping potential for different frequencies in a photoelectric experiment. Which conclusion is correct?",
		tableHtml: "<table><thead><tr><th>Frequency (10¹⁴ Hz)</th><th>Stopping potential (V)</th></tr></thead><tbody><tr><td>5.0</td><td>0.4</td></tr><tr><td>6.0</td><td>0.8</td></tr><tr><td>7.0</td><td>1.2</td></tr></tbody></table>",
		options: opts("Slope gives $h/e$", "Slope gives $e/h$", "Intercept gives Planck's constant", "Stopping potential is independent of frequency"),
		correct: ["A"],
		flags: {
			diagram: false,
			graph: false,
			table: true,
			chem: false
		}
	})
];
async function seedSampleTest() {
	const test = {
		id: uid("test"),
		name: "JEE Demo Mock — Paper 1",
		description: "Sample test bundled with the platform to demo the CBT interface.",
		subjects: [
			"Physics",
			"Chemistry",
			"Mathematics"
		],
		chapters: [...new Set(SAMPLE_QUESTIONS.map((x) => x.chapter))],
		questionCount: SAMPLE_QUESTIONS.length,
		imageCount: 0,
		missingImages: 0,
		importedAt: Date.now(),
		updatedAt: Date.now(),
		source: "sample",
		durationMin: 30,
		status: "valid",
		issues: [],
		questions: SAMPLE_QUESTIONS.map((x) => ({
			...x,
			id: `${x.id}_${Math.random().toString(36).slice(2, 6)}`
		}))
	};
	await putTest(test);
	return test;
}
function Home() {
	const qc = useQueryClient();
	const router = useRouter();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const attempts = useQuery({
		queryKey: ["attempts"],
		queryFn: listAttempts
	});
	const stats = useQuery({
		queryKey: ["dashboardStats"],
		queryFn: dashboardStats
	});
	const xp = getXpState();
	const completed = (attempts.data ?? []).filter(isCompleted);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const [liveNow, setLiveNow] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const liveTests = listUpcomingLiveTests();
	(0, import_react.useEffect)(() => {
		const interval = window.setInterval(() => setLiveNow(/* @__PURE__ */ new Date()), 15e3);
		return () => window.clearInterval(interval);
	}, []);
	const handleScheduledLiveTestClick = async (test) => {
		if (!(test.status === "LIVE" || liveNow.getTime() >= test.liveStart && liveNow.getTime() <= test.liveEnd)) {
			await router.navigate({ to: "/live-tests" });
			return;
		}
		const attempt = await startAttempt({
			id: test.id,
			name: test.testName,
			durationMin: test.durationMin,
			questionCount: test.questionCount,
			questions: test.fixedQuestions,
			subjects: [...new Set(test.fixedQuestions.map((q) => q.subject))],
			chapters: [...new Set(test.fixedQuestions.map((q) => q.chapter))],
			importedAt: Date.now(),
			updatedAt: Date.now(),
			valid: true,
			source: "custom",
			imageCount: 0,
			missingImages: 0,
			status: "valid",
			issues: []
		}, {
			questions: test.fixedQuestions,
			durationMin: test.durationMin,
			name: test.testName,
			attemptType: "live",
			scheduledTestId: test.id,
			liveStart: test.liveStart,
			liveEnd: test.liveEnd,
			testDurationMin: test.durationMin
		});
		qc.invalidateQueries({ queryKey: ["attempts"] });
		router.navigate({
			to: "/test/$attemptId",
			params: { attemptId: attempt.id }
		});
	};
	const handleModeSelect = async (selectedMode) => {
		const decision = await prepareStartMode(selectedMode, {
			fullscreenSupported: !!document.fullscreenEnabled,
			isFullscreen: !!document.fullscreenElement,
			requestFullscreen: async () => {
				try {
					await document.documentElement.requestFullscreen();
					return true;
				} catch {
					return false;
				}
			}
		});
		if (!decision.ok) {
			toast.error(decision.error);
			return;
		}
		if (pendingLaunch) {
			const currentLaunch = pendingLaunch;
			setPendingLaunch(null);
			await currentLaunch(selectedMode);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "exam-grid mb-8 overflow-hidden rounded-2xl border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-primary/12 via-transparent to-transparent p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Exam-grade CBT practice for JEE Main & Advanced"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm text-muted-foreground",
						children: "Import your own question banks, attempt full-length papers in an NTA-style interface with timer, palette, figures and a scientific calculator. Everything is stored on this device, autosaved every few seconds, and works offline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/import",
								className: "hero-action-glow inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderInput, { className: "size-4" }), " Import Test"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/create",
								className: "hero-action-glow inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "size-4" }), " Create Custom Test"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									await seedSampleTest();
									qc.invalidateQueries({ queryKey: ["tests"] });
									toast.success("Demo test added to your Question Bank");
								},
								className: "inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Load demo test"]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total tests given",
					value: String(stats.data?.testsGiven ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Avg accuracy",
					value: `${(stats.data?.accuracy ?? 0).toFixed(1)}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Avg time / question",
					value: `${Math.round(stats.data?.avgTimePerQuestion ?? 0)}s`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Question banks",
					value: String(stats.data?.bankCount ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total images",
					value: String(stats.data?.totalImages ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Day streak",
					value: `${stats.data?.streak ?? 0} days`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/bank",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-5" }),
					label: "Question Bank",
					value: `${tests.data?.length ?? 0} tests · ${stats.data?.totalQuestions ?? 0} questions`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/xp",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }),
					label: "XP",
					value: `${xp.balance.toLocaleString()} XP`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/practice",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5" }),
					label: "Practice",
					value: "Chapter-wise drills"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/analytics",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" }),
					label: "Analytics",
					value: "Weak & strong areas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/results",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5" }),
					label: "Results",
					value: `${completed.length} attempts`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					to: "/resumes",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }),
					label: "Resume Tests",
					value: "Continue in-progress attempts"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Upcoming live tests",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
			children: liveTests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground",
				children: "No scheduled Live Tests are currently upcoming."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: liveTests.map((test) => {
					const isLive = test.status === "LIVE" || liveNow.getTime() >= test.liveStart && liveNow.getTime() <= test.liveEnd;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full max-w-[320px] flex-col rounded-xl border bg-card p-3 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "min-w-0 truncate text-sm font-semibold leading-5",
									children: test.testName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: ["inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]", isLive ? "border-red-500/20 bg-red-500/10 text-red-600" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"].join(" "),
									children: isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "live-status-dot",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-red-600",
										children: "LIVE"
									})] }) : "UPCOMING"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-foreground",
									children: formatLiveTestDate(test.liveStart)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatLiveWindowRange(test.liveStart, test.liveEnd) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-between gap-3 border-t border-border/70 pt-2 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatLiveDuration(test.durationMin) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [test.questionCount, " Q"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void handleScheduledLiveTestClick(test),
									className: ["flex-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold", isLive ? "bg-primary text-primary-foreground hover:opacity-90" : "border bg-card text-foreground hover:bg-accent"].join(" "),
									children: isLive ? "ATTEMPT TEST" : "View Test"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => router.navigate({ to: "/live-tests" }),
									className: "rounded-md border px-2.5 py-1.5 text-[11px] font-medium hover:bg-accent",
									children: "Details"
								})]
							})
						]
					}, test.id);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		}),
		completed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Recent results",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
				children: completed.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/result/$attemptId",
					params: { attemptId: a.id },
					className: "rounded-xl border bg-card p-4 transition-colors hover:border-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate font-semibold",
						children: a.testName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: new Date(a.submittedAt ?? a.updatedAt).toLocaleString()
					})]
				}, a.id))
			})
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xl font-bold",
			children: value
		})]
	});
}
function Tile({ to, icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "quick-action-tile flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-semibold",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs text-muted-foreground",
				children: value
			})]
		})]
	});
}
function Section({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-3 flex items-center gap-2 text-sm font-bold tracking-wide uppercase",
			children: [
				icon,
				" ",
				title
			]
		}), children]
	});
}
function StatusDot({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title: status,
		className: `mt-1.5 inline-block size-2 shrink-0 rounded-full ${{
			valid: "bg-success",
			warning: "bg-warning",
			invalid: "bg-destructive"
		}[status]}`
	});
}
//#endregion
export { StatusDot, Home as component };
