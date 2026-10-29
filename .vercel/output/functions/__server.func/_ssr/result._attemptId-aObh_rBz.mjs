import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { D as xpForResultAttempt, b as scoreAttempt, o as cn, s as formatClock } from "./xp-CqT-O4I5.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as CircleCheck, bt as CircleX, d as Target, gt as Clock, xt as CircleSlash } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { G as putAttempt, T as getAttempt, j as getTest } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as QuestionView } from "./QuestionView-C1bo6bV-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as isNtaBookmarkCategory, t as NTA_BOOKMARK_CATEGORIES } from "./nta-review-DZoU1Y7j.mjs";
import { t as Route } from "./result._attemptId-Dklg8_ww.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result._attemptId-aObh_rBz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResultPage() {
	const { attemptId } = Route.useParams();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const queryClient = useQueryClient();
	const bookmarkWriteChain = (0, import_react.useRef)(Promise.resolve());
	const q = useQuery({
		queryKey: ["result", attemptId],
		queryFn: async () => {
			const attempt = await getAttempt(attemptId);
			if (!attempt) throw new Error("Attempt not found");
			const test = await getTest(attempt.testId);
			const questions = attempt.questionsSnapshot ?? attempt.questionIds.map((id) => test?.questions.find((x) => x.id === id)).filter((x) => Boolean(x));
			return {
				attempt,
				summary: scoreAttempt({
					...test ?? {},
					questions
				}, attempt)
			};
		},
		retry: false
	});
	const rows = (0, import_react.useMemo)(() => {
		return (q.data?.summary.perQuestion ?? []).filter((r) => {
			if (filter === "all") return true;
			if (filter === "marked") return r.answer?.marked;
			if (filter === "bookmarked") return r.answer?.bookmarked;
			return r.status === filter;
		});
	}, [q.data, filter]);
	const saveNtaBookmark = (0, import_react.useCallback)((questionId, bookmarked, tag) => {
		const operation = bookmarkWriteChain.current.then(async () => {
			const current = await getAttempt(attemptId);
			if (!current || !current.submitted || current.mode !== "nta") throw new Error("This NTA attempt is no longer available.");
			const answer = current.answers[questionId];
			if (!answer) throw new Error("The question response could not be found.");
			const updated = {
				...current,
				updatedAt: Date.now(),
				answers: {
					...current.answers,
					[questionId]: {
						...answer,
						bookmarked,
						tag: bookmarked ? tag : void 0
					}
				}
			};
			await putAttempt(updated);
			queryClient.setQueryData(["result", attemptId], (data) => {
				if (!data) return data;
				return {
					...data,
					attempt: updated,
					summary: {
						...data.summary,
						perQuestion: data.summary.perQuestion.map((item) => item.question.id === questionId ? {
							...item,
							answer: updated.answers[questionId]
						} : item)
					}
				};
			});
			queryClient.invalidateQueries({ queryKey: ["reports"] });
			queryClient.invalidateQueries({ queryKey: ["attempts"] });
			queryClient.invalidateQueries({ queryKey: ["bookmarks", attemptId] });
		});
		bookmarkWriteChain.current = operation.then(() => void 0, () => void 0);
		return operation.catch((error) => {
			console.error("[nta-bookmark] failed to save question bookmark", error);
			toast.error("Could not save this bookmark. Please try again.");
			throw error;
		});
	}, [attemptId, queryClient]);
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading analysis…"
	}) });
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: q.error?.message ?? "Not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/results",
		className: "mt-3 inline-block text-sm text-primary underline",
		children: "Back to results"
	})] });
	const { attempt, summary } = q.data;
	const pct = summary.maxScore ? summary.score / summary.maxScore * 100 : 0;
	const xpEarned = xpForResultAttempt(attempt, q.data.summary.perQuestion.map((r) => r.question));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate text-2xl font-bold tracking-tight",
					children: attempt.testName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Submitted ", new Date(attempt.submittedAt ?? attempt.updatedAt).toLocaleString()]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/review/$attemptId",
					params: { attemptId },
					className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
					children: "Full Test Review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/results",
					className: "rounded-lg border px-3 py-1.5 text-xs font-medium",
					children: "All results"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_minmax(0,1fr)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-5xl font-black tabular-nums",
						children: [summary.score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xl text-muted-foreground",
							children: ["/", summary.maxScore]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [pct.toFixed(1), "% of maximum"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }),
							label: "Correct",
							value: summary.correct
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4 text-destructive" }),
							label: "Wrong",
							value: summary.wrong
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { className: "size-4 text-muted-foreground" }),
							label: "Skipped",
							value: summary.skipped
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-primary" }),
							label: "Accuracy",
							value: `${summary.accuracy.toFixed(1)}%`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-primary" }),
							label: "XP Earned",
							value: `+${xpEarned} XP`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
							label: "Time used",
							value: formatClock(summary.timeSpent)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Negative",
							value: summary.negative
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Avg / question",
							value: formatClock(summary.perQuestion.length ? summary.timeSpent / summary.perQuestion.length : 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Attempted",
							value: summary.correct + summary.wrong
						})
					]
				}),
				attempt.proctor && attempt.proctor.tabSwitches + attempt.proctor.fullscreenExits + attempt.proctor.blurs > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
					children: [
						"Exam integrity: ",
						attempt.proctor.tabSwitches,
						" tab switch(es) ·",
						" ",
						attempt.proctor.fullscreenExits,
						" fullscreen exit(s) · ",
						attempt.proctor.blurs,
						" focus loss(es) recorded during this attempt."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breakdown, {
				title: "Subject-wise",
				rows: summary.bySubject
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breakdown, {
				title: "Chapter-wise (strong vs weak)",
				rows: summary.byChapter
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-lg font-bold",
			children: "Question review"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-1.5",
			children: [
				"all",
				"correct",
				"wrong",
				"skipped",
				"marked",
				"bookmarked"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(f),
				className: cn("rounded-full border px-3 py-1 text-xs capitalize", filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: f
			}, f))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-4",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No questions in this filter."
			}), rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-card p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate text-xs font-semibold text-muted-foreground",
							children: [
								"Q",
								r.question.number || i + 1,
								" · ",
								formatClock(r.answer?.timeSpent ?? 0),
								" spent"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("rounded-full px-2.5 py-1 text-[11px] font-bold capitalize", r.status === "correct" && "bg-answered text-answered-foreground", r.status === "wrong" && "bg-notanswered text-notanswered-foreground", r.status === "skipped" && "bg-notvisited text-notvisited-foreground"),
							children: [
								r.status,
								" ",
								r.score > 0 ? `+${r.score}` : r.score
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionView, {
						question: r.question,
						value: r.answer?.value ?? null,
						readOnly: true,
						showAnswer: true
					}),
					attempt.mode === "nta" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NtaBookmarkCategoryControl, {
						questionId: r.question.id,
						bookmarked: Boolean(r.answer?.bookmarked),
						tag: r.answer?.tag,
						onSave: saveNtaBookmark
					})
				]
			}, r.question.id))]
		})
	] });
}
function NtaBookmarkCategoryControl({ questionId, bookmarked, tag, onSave }) {
	const [category, setCategory] = (0, import_react.useState)(isNtaBookmarkCategory(tag) ? tag : NTA_BOOKMARK_CATEGORIES[0]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async (shouldBookmark) => {
		setSaving(true);
		try {
			await onSave(questionId, shouldBookmark, shouldBookmark ? category : void 0);
		} catch {
			return;
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex flex-wrap items-center gap-2 rounded-lg border bg-surface px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs font-semibold text-muted-foreground",
				htmlFor: `bookmark-${questionId}`,
				children: "Bookmark Category"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: `bookmark-${questionId}`,
				value: category,
				onChange: (event) => {
					if (isNtaBookmarkCategory(event.target.value)) setCategory(event.target.value);
				},
				className: "h-8 rounded-md border bg-background px-2 text-xs font-medium",
				disabled: saving,
				children: NTA_BOOKMARK_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: item,
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void save(true),
				disabled: saving || bookmarked && tag === category,
				className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50",
				children: saving ? "Saving…" : bookmarked ? tag === category ? "Bookmarked" : "Update category" : "Bookmark"
			}),
			bookmarked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void save(false),
				disabled: saving,
				className: "rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-50",
				children: "Remove"
			})
		]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-lg font-bold tabular-nums",
			children: value
		})]
	});
}
function Breakdown({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-3",
			children: rows.map((r) => {
				const attempted = r.correct + r.wrong;
				const acc = attempted ? r.correct / attempted * 100 : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground tabular-nums",
						children: [
							r.correct,
							"/",
							r.total,
							" · ",
							acc.toFixed(0),
							"% · ",
							formatClock(r.time)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex h-2 overflow-hidden rounded-full bg-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-answered",
							style: { width: `${r.correct / r.total * 100}%` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-notanswered",
							style: { width: `${r.wrong / r.total * 100}%` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-notvisited",
							style: { width: `${r.skipped / r.total * 100}%` }
						})
					]
				})] }, r.name);
			})
		})]
	});
}
//#endregion
export { ResultPage as component };
