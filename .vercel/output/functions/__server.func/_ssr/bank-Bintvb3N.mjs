import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as validationCounts, o as cn } from "./xp-CqT-O4I5.mjs";
import { b as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as CircleCheck, E as Pencil, G as KeyRound, T as Play, ft as Download, g as ShieldCheck, l as Trash2, mt as Copy, q as Images, y as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { L as listImages, V as listTests, Z as putImages, at as uid, et as putTest, j as getTest, m as deleteImage, v as deleteTest } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as LazyImage, t as ImageViewer } from "./ImageViewer-CLGX6jid.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as prepareStartMode, t as StartModeDialog } from "./start-mode-CmP8nz0c.mjs";
import { t as startAttempt } from "./attempt-Bn78nzqR.mjs";
import { r as StatusDot, t as Route } from "./bank-Eou_w4RV.mjs";
import { t as AnswerEditor } from "./AnswerEditor-CHmpDiRg.mjs";
import { a as validateTest, n as exportTestJson, r as questionNumberFromFilename } from "./import-DJ_vCnim.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bank-Bintvb3N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BankPage() {
	const qc = useQueryClient();
	const router = useRouter();
	const { edit, q: focusQuestion } = Route.useSearch();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("date");
	const [figuresFor, setFiguresFor] = (0, import_react.useState)(null);
	const [answersFor, setAnswersFor] = (0, import_react.useState)(edit ?? null);
	const [modePickerOpen, setModePickerOpen] = (0, import_react.useState)(false);
	const [pendingLaunch, setPendingLaunch] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		let list = tests.data ?? [];
		if (search.trim()) {
			const s = search.toLowerCase();
			list = list.filter((t) => t.name.toLowerCase().includes(s) || t.chapters.some((c) => c.toLowerCase().includes(s)) || t.subjects.some((c) => c.toLowerCase().includes(s)));
		}
		if (subject !== "all") list = list.filter((t) => t.subjects.includes(subject));
		const sorted = [...list];
		sorted.sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "questions" ? b.questionCount - a.questionCount : b.importedAt - a.importedAt);
		return sorted;
	}, [
		tests.data,
		search,
		subject,
		sort
	]);
	const refresh = () => {
		qc.invalidateQueries({ queryKey: ["tests"] });
		qc.invalidateQueries({ queryKey: ["adv"] });
	};
	const onRename = async (t) => {
		const name = window.prompt("Rename test", t.name);
		if (!name?.trim()) return;
		await putTest({
			...t,
			name: name.trim(),
			updatedAt: Date.now()
		});
		refresh();
		toast.success("Renamed");
	};
	const onDuplicate = async (t) => {
		const copy = {
			...t,
			id: uid("test"),
			name: `${t.name} (copy)`,
			importedAt: Date.now()
		};
		const imgs = await listImages(t.id);
		const idMap = /* @__PURE__ */ new Map();
		await putImages(imgs.map((i) => {
			const nid = `${copy.id}::${i.name.toLowerCase()}_${Math.random().toString(36).slice(2, 6)}`;
			idMap.set(i.id, nid);
			return {
				...i,
				id: nid,
				testId: copy.id
			};
		}));
		copy.questions = t.questions.map((q) => ({
			...q,
			images: q.images.map((id) => idMap.get(id) ?? id)
		}));
		await putTest(copy);
		refresh();
		toast.success("Duplicated");
	};
	const onDelete = async (t) => {
		if (!window.confirm(`Delete "${t.name}"? Attempts and images will be removed.`)) return;
		await deleteTest(t.id);
		refresh();
		qc.invalidateQueries({ queryKey: ["attempts"] });
		toast.success("Deleted");
	};
	const onExport = (t) => {
		const blob = new Blob([exportTestJson(t)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${t.name.replace(/[^\w-]+/g, "_")}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const onValidate = async (t) => {
		const issues = validateTest(t);
		const status = issues.some((i) => i.level === "error") ? "invalid" : issues.length ? "warning" : "valid";
		await putTest({
			...t,
			issues,
			status
		});
		refresh();
		if (status === "valid") toast.success("All questions valid");
		else toast.warning(`${issues.length} issue(s) found — see the test row`);
	};
	const onStart = async (t) => {
		if (t.status === "invalid") return toast.error("Fix validation errors before starting.");
		setPendingLaunch(() => async (selectedMode) => {
			const a = await startAttempt(t, {
				mode: selectedMode,
				strictMode: selectedMode === "strict"
			});
			qc.invalidateQueries({ queryKey: ["attempts"] });
			router.navigate({
				to: "/test/$attemptId",
				params: { attemptId: a.id }
			});
		});
		setModePickerOpen(true);
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
	const subjects = [...new Set((tests.data ?? []).flatMap((t) => t.subjects))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Question Bank"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Every imported set lives on this device. Validate before attempting a paper."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search name, subject or chapter…",
						className: "w-full rounded-lg border bg-card py-2 pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: subject,
					onChange: (e) => setSubject(e.target.value),
					className: "rounded-lg border bg-card px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All subjects"
					}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s,
						children: s
					}, s))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: sort,
					onChange: (e) => setSort(e.target.value),
					className: "rounded-lg border bg-card px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "date",
							children: "Newest first"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "name",
							children: "Name A–Z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "questions",
							children: "Most questions"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
				children: [
					"Nothing here yet.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/import",
						className: "text-primary underline",
						children: "Import a test"
					}),
					"."
				]
			}), rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border bg-card p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: t.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-semibold",
									children: t.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex flex-wrap items-center gap-x-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionValidity, { test: t }),
									t.subjects.join(" · ") || "—",
									" · ",
									t.chapters.length,
									" chapters · ",
									t.questionCount,
									" ",
									"questions · ",
									t.imageCount,
									" images · imported",
									" ",
									new Date(t.importedAt).toLocaleDateString(),
									" · ",
									t.source.toUpperCase()
								]
							}),
							t.issues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "mt-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "cursor-pointer text-warning",
									children: [t.issues.length, " validation note(s)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-1 max-h-32 list-disc overflow-auto pl-5 text-muted-foreground",
									children: t.issues.slice(0, 40).map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i.message }, idx))
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onStart(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }),
								label: "Open",
								primary: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => setAnswersFor(t.id),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3.5" }),
								label: "Questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => setFiguresFor(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-3.5" }),
								label: "Figures"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onValidate(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }),
								label: "Validate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onRename(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }),
								label: "Rename"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onDuplicate(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
								label: "Duplicate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onExport(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }),
								label: "Export"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								onClick: () => onDelete(t),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
								label: "Delete",
								danger: true
							})
						]
					})]
				})
			}, t.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartModeDialog, {
			open: modePickerOpen,
			onOpenChange: (open) => {
				setModePickerOpen(open);
				if (!open) setPendingLaunch(null);
			},
			onStart: handleModeSelect
		}),
		figuresFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiguresManager, {
			testId: figuresFor.id,
			onClose: () => setFiguresFor(null),
			onChanged: refresh
		}),
		answersFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerEditor, {
			testId: answersFor,
			focusQuestionId: answersFor === edit ? focusQuestion : void 0,
			onClose: () => setAnswersFor(null)
		})
	] });
}
function Act({ onClick, icon, label, primary, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent", primary && "border-primary bg-primary text-primary-foreground hover:opacity-90", danger && "border-destructive/40 text-destructive"),
		children: [icon, label]
	});
}
/** Figures panel: thumbnails, linked question, manual upload / replace / mapping. */
function FiguresManager({ testId, onClose, onChanged }) {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const data = useQuery({
		queryKey: ["figures", testId],
		queryFn: async () => {
			const [test, images] = await Promise.all([getTest(testId), listImages(testId)]);
			return {
				test,
				images
			};
		}
	});
	const test = data.data?.test;
	const images = data.data?.images ?? [];
	const reload = () => {
		qc.invalidateQueries({ queryKey: ["figures", testId] });
		onChanged();
	};
	const linkOf = (imgId) => test?.questions.find((q) => q.images.includes(imgId));
	const uploadFiles = async (files) => {
		if (!test) return;
		const stored = [];
		const updated = {
			...test,
			questions: test.questions.map((q) => ({ ...q }))
		};
		let matched = 0;
		for (const f of Array.from(files)) {
			const id = `${testId}::${f.name.toLowerCase()}_${Math.random().toString(36).slice(2, 6)}`;
			stored.push({
				id,
				testId,
				name: f.name,
				blob: f
			});
			const n = questionNumberFromFilename(f.name);
			const q = n !== null ? updated.questions.find((x) => x.number === n) : void 0;
			if (q) {
				q.images = [...q.images, id];
				q.flags = {
					...q.flags,
					diagram: true
				};
				matched += 1;
			}
		}
		await putImages(stored);
		updated.imageCount = images.length + stored.length;
		updated.updatedAt = Date.now();
		await putTest(updated);
		reload();
		toast.success(`${stored.length} image(s) added · ${matched} auto-linked by filename`);
	};
	const mapTo = async (imgId, questionNumber) => {
		if (!test) return;
		const n = Number(questionNumber);
		await putTest({
			...test,
			questions: test.questions.map((q) => {
				const without = q.images.filter((i) => i !== imgId);
				return q.number === n ? {
					...q,
					images: [...without, imgId],
					flags: {
						...q.flags,
						diagram: true
					}
				} : {
					...q,
					images: without
				};
			}),
			updatedAt: Date.now()
		});
		reload();
	};
	const removeImage = async (imgId) => {
		if (!test) return;
		await deleteImage(imgId);
		await putTest({
			...test,
			questions: test.questions.map((q) => ({
				...q,
				images: q.images.filter((i) => i !== imgId)
			})),
			imageCount: Math.max(0, test.imageCount - 1),
			updatedAt: Date.now()
		});
		reload();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[90vh] w-full max-w-5xl flex-col rounded-t-2xl border bg-card sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "truncate font-semibold",
							children: ["Figures — ", test?.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [images.length, " images · click a thumbnail to preview, map it to a question number, or upload more."]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => fileRef.current?.click(),
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
							children: "Upload images"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "rounded-md border px-3 py-1.5 text-xs",
							children: "Close"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/png,image/jpeg,image/webp",
					multiple: true,
					hidden: true,
					onChange: (e) => e.target.files && uploadFiles(e.target.files)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-slim grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-3 lg:grid-cols-4",
					children: [images.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "col-span-full py-10 text-center text-sm text-muted-foreground",
						children: "No figures in this test yet."
					}), images.map((img) => {
						const q = linkOf(img.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border bg-surface p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setViewer([img.id]),
									className: "grid h-28 w-full place-items-center overflow-hidden rounded bg-card",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
										id: img.id,
										alt: img.name,
										className: "max-h-28"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 truncate text-[11px] text-muted-foreground",
									title: img.name,
									children: img.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex items-center gap-1 text-[11px]",
									children: q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-success",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }),
											" Q",
											q.number,
											" · ",
											q.subject
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-warning",
										children: "unmapped"
									})
								}),
								q?.chapter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: q.chapter
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: q?.number ?? "",
										onChange: (e) => mapTo(img.id, e.target.value),
										className: "min-w-0 flex-1 rounded border bg-card px-1 py-1 text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Map to…"
										}), test?.questions.map((qq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: qq.number,
											children: ["Q", qq.number]
										}, qq.id))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeImage(img.id),
										className: "rounded border border-destructive/40 px-1.5 text-[11px] text-destructive",
										children: "del"
									})]
								})
							]
						}, img.id);
					})]
				})
			]
		}), viewer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer, {
			ids: viewer,
			onClose: () => setViewer(null)
		})]
	});
}
/** Valid / invalid question counts for a set, computed from the live questions. */
function QuestionValidity({ test }) {
	const counts = (0, import_react.useMemo)(() => validationCounts(test.questions), [test.questions]);
	if (counts.invalid === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded bg-success/15 px-1.5 py-0.5 font-semibold text-success",
		children: [counts.valid, " valid"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded bg-destructive/15 px-1.5 py-0.5 font-semibold text-destructive",
		children: [
			counts.invalid,
			" invalid · ",
			counts.valid,
			" valid"
		]
	});
}
//#endregion
export { BankPage as component };
