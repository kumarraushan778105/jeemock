import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as validatePool, _ as numericAnswers, m as isNumericType, n as QUESTION_TYPE_LABEL, o as cn, p as isMultiCorrect, r as SUBJECTS, v as optionIds, w as validateQuestion, y as parseNumericList } from "./xp-CqT-O4I5.mjs";
import { Dt as Check, Et as ChevronDown, J as ImagePlus, l as Trash2, o as TriangleAlert, t as ZoomIn, w as Plus, y as Search } from "../_libs/lucide-react.mjs";
import { X as putImage, b as forgetImageUrl, et as putTest, j as getTest, m as deleteImage } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as MathText } from "./MathText-DrvVO8lf.mjs";
import { n as LazyImage, t as ImageViewer } from "./ImageViewer-CLGX6jid.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as CopyQuestion, r as bulkQuestionToText, t as BULK_COPY_MODE_LABEL } from "./CopyQuestion-Dcl-ocGO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AnswerEditor-CHmpDiRg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OK = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp"
];
/**
* Image-based question support for the Question Bank editor: upload, drag & drop
* or paste (Ctrl+V) a screenshot. Images are stored byte-for-byte — no OCR, no
* conversion — and rendered in CBT exactly as stored.
*/
function QuestionImageEditor({ testId, images, onChange, label = "Question images", hint }) {
	const fileRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [replace, setReplace] = (0, import_react.useState)(null);
	const store = async (files) => {
		const valid = files.filter((f) => OK.includes(f.type.toLowerCase()));
		if (valid.length === 0) {
			toast.error("Only PNG, JPG, JPEG or WEBP images are supported");
			return;
		}
		const ids = [];
		for (const f of valid) {
			const id = `${testId}::img_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
			await putImage({
				id,
				testId,
				name: f.name || "pasted-image.png",
				blob: f,
				kind: "figure"
			});
			ids.push(id);
		}
		if (replace) {
			onChange(images.map((i) => i === replace ? ids[0] : i));
			forgetImageUrl(replace);
			await deleteImage(replace);
			setReplace(null);
			toast.success("Image replaced — save the question to keep it");
		} else {
			onChange([...images, ...ids]);
			toast.success(`${ids.length} image(s) attached — save the question to keep it`);
		}
	};
	const removeAt = async (id) => {
		onChange(images.filter((i) => i !== id));
		forgetImageUrl(id);
		await deleteImage(id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-semibold uppercase text-muted-foreground",
					children: [
						label,
						" (",
						images.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setReplace(null);
						fileRef.current?.click();
					},
					className: "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3.5" }), " Upload image"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setOver(true);
				},
				onDragLeave: () => setOver(false),
				onDrop: (e) => {
					e.preventDefault();
					setOver(false);
					store(Array.from(e.dataTransfer.files));
				},
				onPaste: (e) => {
					const files = Array.from(e.clipboardData.files);
					if (files.length) {
						e.preventDefault();
						store(files);
					}
				},
				tabIndex: 0,
				className: cn("rounded-lg border border-dashed p-3 text-center text-[11px] text-muted-foreground outline-none focus:ring-2 focus:ring-ring", over && "border-primary bg-primary/5"),
				children: hint ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Drag & drop an image here, or click this box and press Ctrl+V to paste a screenshot.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"PNG · JPG · JPEG · WEBP — stored exactly as uploaded."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/png,image/jpeg,image/webp",
				multiple: true,
				className: "hidden",
				onChange: (e) => {
					const files = Array.from(e.target.files ?? []);
					e.target.value = "";
					if (files.length) store(files);
				}
			}),
			images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: images.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border bg-card p-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id,
						alt: `Question image ${i + 1}`,
						className: "max-h-28 rounded",
						onClick: () => setViewer(i)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "Full preview",
								onClick: () => setViewer(i),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "Replace image",
								onClick: () => {
									setReplace(id);
									fileRef.current?.click();
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "Delete image",
								danger: true,
								onClick: () => void removeAt(id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})
						]
					})]
				}, id))
			}),
			viewer !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer, {
				ids: images,
				startIndex: viewer,
				onClose: () => setViewer(null)
			})
		]
	});
}
function IconBtn({ children, label, onClick, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		title: label,
		"aria-label": label,
		onClick,
		className: cn("rounded border p-1 hover:bg-accent", danger && "border-destructive/40 text-destructive"),
		children
	});
}
var LETTERS$1 = "ABCDEFGHIJKL".split("");
/**
* Match the Following / Matrix Match table creator.
* Column I rows, Column II rows, per-cell editing (LaTeX + mhchem for chemical
* equations, sub/superscripts and unicode), width and border controls, and the
* answer stored as explicit pairs (row number → Column II letter).
*/
function MatrixEditor({ matrix, pairs, onMatrix, onPairs }) {
	const left = matrix.left ?? [];
	const right = matrix.right ?? [];
	const letters = right.map((_, i) => LETTERS$1[i]);
	const setLeft = (i, v) => onMatrix({
		...matrix,
		left: left.map((x, idx) => idx === i ? v : x)
	});
	const setRight = (i, v) => onMatrix({
		...matrix,
		right: right.map((x, idx) => idx === i ? v : x)
	});
	const addRow = () => onMatrix({
		...matrix,
		left: [...left, ""]
	});
	const delRow = (i) => {
		onMatrix({
			...matrix,
			left: left.filter((_, idx) => idx !== i)
		});
		const next = {};
		left.forEach((_, idx) => {
			if (idx === i) return;
			const from = String(idx + 1);
			const to = String(idx < i ? idx + 1 : idx);
			if (pairs[from]) next[to] = pairs[from];
		});
		onPairs(next);
	};
	const addCol = () => onMatrix({
		...matrix,
		right: [...right, ""]
	});
	const delCol = (i) => {
		const letter = LETTERS$1[i];
		onMatrix({
			...matrix,
			right: right.filter((_, idx) => idx !== i)
		});
		const next = { ...pairs };
		for (const k of Object.keys(next)) if (next[k] === letter) delete next[k];
		onPairs(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border bg-card p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-semibold uppercase text-muted-foreground",
						children: "Match the Following table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addRow,
						className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Row"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addCol,
						className: "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold hover:bg-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Column II item"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex items-center gap-1 text-[11px]",
						children: [
							"Column I width",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 80,
								max: 600,
								value: matrix.leftWidth ?? 220,
								onChange: (e) => onMatrix({
									...matrix,
									leftWidth: Number(e.target.value) || 220
								}),
								className: "w-16 rounded border bg-surface px-1.5 py-0.5"
							}),
							"px"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: matrix.borders !== false,
							onChange: (e) => onMatrix({
								...matrix,
								borders: e.target.checked
							})
						}), "Borders"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase text-muted-foreground",
						children: "Column I"
					}), left.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-5 text-xs font-bold",
								children: [i + 1, "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: v,
								onChange: (e) => setLeft(i, e.target.value),
								placeholder: "e.g. $\\\\ce{H2SO4}$ or $x^2$",
								className: "min-w-0 flex-1 rounded border bg-surface px-2 py-1 text-xs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: pairs[String(i + 1)] ?? "",
								onChange: (e) => onPairs({
									...pairs,
									[String(i + 1)]: e.target.value
								}),
								className: "rounded border bg-surface px-1 py-1 text-xs",
								title: "Matching Column II option",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "—"
								}), letters.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: l,
									children: l
								}, l))]
							}),
							left.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => delRow(i),
								title: "Delete row",
								className: "rounded border p-1 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})
						]
					}, i))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase text-muted-foreground",
						children: "Column II"
					}), right.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-5 text-xs font-bold",
								children: [LETTERS$1[i], "."]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: v,
								onChange: (e) => setRight(i, e.target.value),
								placeholder: "Matching option",
								className: "min-w-0 flex-1 rounded border bg-surface px-2 py-1 text-xs"
							}),
							right.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => delCol(i),
								title: "Delete column item",
								className: "rounded border p-1 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})
						]
					}, i))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-surface p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[11px] font-semibold uppercase text-muted-foreground",
						children: "CBT preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: cn("w-full text-xs", matrix.borders !== false && "[&_td]:border [&_th]:border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								style: { width: matrix.leftWidth ?? 220 },
								className: "px-2 py-1 text-left",
								children: "Column I"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-1 text-left",
								children: "Column II"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: left.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
								as: "span",
								children: `${i + 1}. ${l}`
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-1",
							children: right[i] !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
								as: "span",
								children: `${LETTERS$1[i]}. ${right[i]}`
							})
						})] }, i)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [
							"Answer pairs:",
							" ",
							Object.entries(pairs).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(", ") || "—"
						]
					})
				]
			})
		]
	});
}
var PAGE = 25;
var DIFFS = [
	"Easy",
	"Medium",
	"Hard"
];
var TYPES = Object.keys(QUESTION_TYPE_LABEL);
var LETTERS = "ABCDEFGHIJKL".split("");
var DIFF_RANK = {
	Easy: 0,
	Medium: 1,
	Hard: 2
};
/**
* Question Bank editor: search / filter / sort every question in a set, edit any
* field (statement, options, keys, metadata), add new questions and delete old
* ones. Saves straight to the bank so every future test uses the change.
*/
function AnswerEditor({ testId, focusQuestionId, onClose, onSave, questions: overrideQuestions, title, onSelect, selectedQuestionIds, onCreateNew, saveLabel = "Save" }) {
	const qc = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("all");
	const [type, setType] = (0, import_react.useState)("all");
	const [difficulty, setDifficulty] = (0, import_react.useState)("all");
	const [validity, setValidity] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [limit, setLimit] = (0, import_react.useState)(PAGE);
	const test = useQuery({
		queryKey: ["bank-answers", testId],
		queryFn: () => testId ? getTest(testId) : Promise.resolve(null),
		enabled: !!testId && !overrideQuestions
	}).data ?? null;
	const questions = overrideQuestions ?? test?.questions ?? [];
	const report = (0, import_react.useMemo)(() => validatePool(questions, (q) => q), [questions]);
	const rows = (0, import_react.useMemo)(() => {
		const s = search.trim().toLowerCase();
		let list = questions.filter((q) => {
			if (subject !== "all" && q.subject !== subject) return false;
			if (type !== "all" && q.type !== type) return false;
			if (difficulty !== "all" && q.difficulty !== difficulty) return false;
			const invalid = report.reasonsById.has(String(q.id));
			if (validity === "valid" && invalid) return false;
			if (validity === "invalid" && !invalid) return false;
			if (!s) return true;
			return `${q.id} ${q.number} ${q.text} ${q.subject} ${q.chapter} ${q.topic}`.toLowerCase().includes(s);
		});
		list = [...list].sort((a, b) => {
			if (sort === "subject") return a.subject.localeCompare(b.subject) || a.number - b.number;
			if (sort === "chapter") return a.chapter.localeCompare(b.chapter) || a.number - b.number;
			if (sort === "difficulty") return (DIFF_RANK[a.difficulty] ?? 1) - (DIFF_RANK[b.difficulty] ?? 1) || a.number - b.number;
			if (sort === "oldest") return a.number - b.number;
			return b.number - a.number;
		});
		if (!focusQuestionId) return list;
		return [...list].sort((a, b) => Number(b.id === focusQuestionId) - Number(a.id === focusQuestionId));
	}, [
		questions,
		search,
		subject,
		type,
		difficulty,
		validity,
		sort,
		report,
		focusQuestionId
	]);
	const commit = async (next, message) => {
		await putTest({
			...next,
			subjects: [...new Set(next.questions.map((q) => q.subject).filter(Boolean))],
			chapters: [...new Set(next.questions.map((q) => q.chapter).filter(Boolean))],
			questionCount: next.questions.length,
			updatedAt: Date.now()
		});
		qc.invalidateQueries({ queryKey: ["bank-answers", testId] });
		qc.invalidateQueries({ queryKey: ["tests"] });
		qc.invalidateQueries({ queryKey: ["adv"] });
		toast.success(message);
	};
	const save = async (patch) => {
		if (onSave) {
			await onSave(patch);
			return;
		}
		if (!test) return;
		await commit({
			...test,
			questions: test.questions.map((q) => q.id === patch.id ? patch : q)
		}, `Q${patch.number} saved`);
	};
	const remove = async (q) => {
		if (!test) return;
		if (!window.confirm(`Delete Q${q.number} from "${test.name}"? Existing attempts keep their copy.`)) return;
		await commit({
			...test,
			questions: test.questions.filter((x) => x.id !== q.id)
		}, `Q${q.number} deleted`);
	};
	const add = async () => {
		if (!test) return;
		const number = test.questions.reduce((a, q) => Math.max(a, q.number), 0) + 1;
		const fresh = {
			id: `q_new_${number}_${Math.random().toString(36).slice(2, 8)}`,
			number,
			subject: test.subjects[0] ?? "Physics",
			chapter: test.chapters[0] ?? "General",
			topic: "",
			difficulty: "Medium",
			type: "single",
			text: "",
			options: LETTERS.slice(0, 4).map((id) => ({
				id,
				text: ""
			})),
			correct: [],
			tolerance: .01,
			images: [],
			marks: 4,
			negative: 1,
			flags: {
				diagram: false,
				graph: false,
				table: false,
				chem: false
			}
		};
		await commit({
			...test,
			questions: [...test.questions, fresh]
		}, `Q${number} added — fill it in`);
		setSort("newest");
		setValidity("all");
		setSearch("");
	};
	const subjects = [...new Set([...questions.map((q) => q.subject), ...SUBJECTS])].filter(Boolean);
	const [copyAllOpen, setCopyAllOpen] = (0, import_react.useState)(false);
	const copyAllBox = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!copyAllOpen) return;
		const onDown = (event) => {
			if (!copyAllBox.current?.contains(event.target)) setCopyAllOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		return () => document.removeEventListener("mousedown", onDown);
	}, [copyAllOpen]);
	const copyAll = async (mode) => {
		setCopyAllOpen(false);
		if (!questions.length) {
			toast.error("No questions to copy.");
			return;
		}
		const text = bulkQuestionToText(questions, mode);
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied!");
		} catch {
			try {
				const ta = document.createElement("textarea");
				ta.value = text;
				ta.style.position = "fixed";
				ta.style.opacity = "0";
				document.body.appendChild(ta);
				ta.select();
				document.execCommand("copy");
				ta.remove();
				toast.success("Copied!");
			} catch {
				toast.error("Copy failed.");
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[92vh] w-full max-w-4xl flex-col rounded-t-2xl border bg-card sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-semibold",
							children: title ?? `Questions — ${test?.name ?? "…"}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								report.total,
								" questions ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-success",
									children: [report.valid.length, " valid"]
								}),
								" ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("font-semibold", report.invalid.length && "text-destructive"),
									children: [report.invalid.length, " invalid"]
								}),
								" ",
								!onSelect && "— invalid questions are skipped when generating tests."
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: copyAllBox,
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setCopyAllOpen((open) => !open),
									className: "inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold",
									children: ["Copy All", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3 transition-transform", copyAllOpen && "rotate-180") })]
								}), copyAllOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute right-0 z-50 mt-1 w-56 overflow-hidden rounded-lg border bg-card shadow-lg",
									children: Object.entries(BULK_COPY_MODE_LABEL).map(([mode, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void copyAll(mode),
										className: "block w-full px-3 py-2 text-left text-xs hover:bg-accent",
										children: label
									}, mode))
								})]
							}),
							!onSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: add,
								className: "inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add"]
							}),
							onCreateNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onCreateNew,
								className: "inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Create New Question"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onClose,
								className: "rounded-md border px-3 py-1.5 text-xs",
								children: "Close"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 border-b p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setLimit(PAGE);
							},
							placeholder: "Search question text, id, number, subject, chapter or topic…",
							className: "w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: subject,
								onChange: setSubject,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All subjects"
								}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: type,
								onChange: (v) => setType(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All types"
								}), TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: QUESTION_TYPE_LABEL[t]
								}, t))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: difficulty,
								onChange: (v) => setDifficulty(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All difficulty"
								}), DIFFS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d,
									children: d
								}, d))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: validity,
								onChange: (v) => setValidity(v),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "Valid + invalid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "valid",
										children: "Valid only"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "invalid",
										children: "Invalid only"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: sort,
								onChange: (v) => setSort(v),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "newest",
										children: "Newest first"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "oldest",
										children: "Oldest first"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "subject",
										children: "Subject"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "chapter",
										children: "Chapter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "difficulty",
										children: "Difficulty"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-slim flex-1 space-y-3 overflow-y-auto p-4",
					children: [
						rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted-foreground",
							children: "No questions match."
						}),
						rows.slice(0, limit).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerRow, {
							testId: testId ?? "bank-selector",
							question: q,
							highlight: q.id === focusQuestionId,
							poolReasons: report.reasonsById.get(String(q.id)),
							onSave: save,
							onDelete: remove,
							onSelect,
							selected: Boolean(selectedQuestionIds?.includes(q.id) || selectedQuestionIds?.includes(q.sourceId ?? "")),
							saveLabel
						}, q.id)),
						rows.length > limit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setLimit((l) => l + PAGE),
							className: "w-full rounded-lg border py-2 text-sm font-semibold",
							children: "Load more"
						})
					]
				})
			]
		})
	});
}
function Select({ value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "rounded-lg border bg-background px-2 py-1.5 text-xs",
		children
	});
}
function AnswerRow({ testId, question, highlight, poolReasons, onSave, onDelete, onSelect, selected, saveLabel }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(question);
	const ids = (0, import_react.useMemo)(() => optionIds(draft), [draft]);
	const objective = !isNumericType(draft.type) && !Boolean(draft.matrix) && draft.type !== "matrix";
	const [multi, setMulti] = (0, import_react.useState)(isMultiCorrect(question));
	const [correct, setCorrect] = (0, import_react.useState)(question.correct.map(String));
	const [numeric, setNumeric] = (0, import_react.useState)(numericAnswers(question).join(",") || "");
	const [pairs, setPairs] = (0, import_react.useState)(() => {
		if (question.matrixPairs) return { ...question.matrixPairs };
		const out = {};
		(question.matrix?.left ?? []).forEach((_, i) => {
			const v = question.correct[i];
			if (v) out[String(i + 1)] = String(v);
		});
		return out;
	});
	const isMatrix = Boolean(draft.matrix) || draft.type === "matrix";
	const validation = (0, import_react.useMemo)(() => {
		const own = validateQuestion(question);
		const reasons = [...new Set([...own.reasons, ...poolReasons ?? []])];
		return {
			valid: reasons.length === 0,
			reasons
		};
	}, [question, poolReasons]);
	const patch = (p) => setDraft((d) => ({
		...d,
		...p
	}));
	const toggle = (id) => {
		setCorrect((cur) => multi ? cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] : cur.length === 1 && cur[0] === id ? [] : [id]);
	};
	const switchMode = (nextMulti) => {
		setMulti(nextMulti);
		if (!nextMulti) setCorrect((cur) => cur.length > 1 ? [cur[0]] : cur);
	};
	const setOptionText = (i, text) => patch({ options: draft.options.map((o, idx) => idx === i ? {
		...o,
		text
	} : o) });
	/** image-first options: an option may be an image with no text at all */
	const setOptionImages = (i, images) => patch({ options: draft.options.map((o, idx) => idx === i ? {
		...o,
		images: images.length ? images : void 0
	} : o) });
	const addOption = () => patch({ options: [...draft.options, {
		id: LETTERS[draft.options.length] ?? String(draft.options.length + 1),
		text: ""
	}] });
	const removeOption = (i) => {
		const removedId = ids[i];
		setCorrect((cur) => cur.filter((x) => x !== removedId));
		patch({ options: draft.options.filter((_, idx) => idx !== i) });
	};
	const commit = async () => {
		const numericList = parseNumericList(numeric);
		if (isMatrix) {
			const ordered = (draft.matrix?.left ?? []).map((_, i) => pairs[String(i + 1)] ?? "");
			if (ordered.every((v) => !v)) {
				toast.error("Match at least one row to a Column II option");
				return;
			}
			await onSave({
				...draft,
				type: "matrix",
				matrixPairs: Object.fromEntries(Object.entries(pairs).filter(([, v]) => v)),
				correct: ordered
			});
			return;
		}
		if (objective && correct.length === 0) {
			toast.error("Pick at least one correct option");
			return;
		}
		if (isNumericType(draft.type) && numericList.length === 0) {
			toast.error("Enter at least one numerical answer");
			return;
		}
		const type = objective ? multi ? "multiple" : draft.type === "single" || draft.type === "multiple" ? "single" : draft.type : draft.type;
		const ordered = ids.filter((id) => correct.includes(id));
		await onSave({
			...draft,
			type,
			text: draft.text,
			correct: objective ? ordered : draft.correct,
			answerValue: objective ? draft.answerValue : numericList[0],
			answerValues: objective ? draft.answerValues : numericList.length > 1 ? numericList : void 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border bg-surface p-3", highlight && "border-primary ring-2 ring-primary/30", !validation.valid && "border-destructive/50"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded bg-primary/10 px-1.5 py-0.5 text-primary",
						children: ["Q", draft.number]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: draft.subject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: draft.chapter }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: QUESTION_TYPE_LABEL[draft.type] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("rounded px-1.5 py-0.5", validation.valid ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"),
						children: validation.valid ? "Valid" : "Invalid"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyQuestion, {
						question,
						className: "ml-auto"
					}),
					onSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void onSelect(question),
						disabled: selected,
						className: cn("rounded border px-2 py-0.5 text-[10px] font-semibold", selected ? "cursor-not-allowed border-primary/40 bg-primary/10 text-primary" : "border-primary bg-primary text-primary-foreground"),
						children: selected ? "Selected" : "Add"
					}),
					objective && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => switchMode(false),
							className: cn("rounded border px-2 py-0.5 text-[10px]", !multi && "border-primary bg-primary text-primary-foreground"),
							children: "Single"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => switchMode(true),
							className: cn("rounded border px-2 py-0.5 text-[10px]", multi && "border-primary bg-primary text-primary-foreground"),
							children: "Multiple"
						})]
					})
				]
			}),
			!validation.valid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 flex items-start gap-1.5 text-[11px] text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-px size-3.5 shrink-0" }), validation.reasons.join(" · ")]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: draft.text,
				onChange: (e) => patch({ text: e.target.value }),
				rows: 3,
				placeholder: "Question statement (LaTeX supported)",
				className: "mt-2 w-full rounded-lg border bg-card p-2 text-sm"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 line-clamp-2 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: draft.text || "— empty question —" })
			}),
			objective ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-1.5 sm:grid-cols-2",
				children: [draft.options.map((o, i) => {
					const id = ids[i];
					const on = correct.includes(id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggle(id),
								className: cn("flex min-w-0 flex-1 items-start gap-2 rounded-lg border bg-card p-2 text-left text-xs", on && "border-success bg-success/10"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-5 shrink-0 place-items-center border text-[10px] font-bold", multi ? "rounded" : "rounded-full", on && "border-success bg-success text-background"),
									children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : id
								}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: o.text,
									onClick: (e) => e.stopPropagation(),
									onChange: (e) => setOptionText(i, e.target.value),
									placeholder: `Option ${id} — text, or leave empty and upload an image`,
									className: "min-w-0 flex-1 rounded border bg-surface px-2 py-1"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
									className: "min-w-0",
									children: o.text
								})]
							}), open && draft.options.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeOption(i),
								title: "Remove option",
								className: "rounded border p-1.5 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})]
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border bg-card p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionImageEditor, {
								testId,
								label: `Option ${id} image`,
								hint: "Drop or paste (Ctrl+V) an image of this option — used as-is.",
								images: o.images ?? [],
								onChange: (imgs) => setOptionImages(i, imgs)
							})
						}) : (o.images?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pl-2 text-[11px] text-muted-foreground",
							children: [o.images.length, " option image(s)"]
						})]
					}, id);
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: addOption,
					className: "rounded-lg border border-dashed py-2 text-xs font-semibold text-muted-foreground",
					children: "+ Add option"
				})]
			}) : isMatrix ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-[11px] text-muted-foreground",
				children: [
					"Match the Following question — open “Edit all fields” to build the table and set the matching pairs. Current pairs:",
					" ",
					Object.entries(pairs).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(", ") || "—"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 max-w-[280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: numeric,
					onChange: (e) => setNumeric(e.target.value.replace(/[^0-9.,\s-]/g, "")),
					className: "w-full rounded-lg border bg-card px-3 py-1.5 font-mono text-sm",
					placeholder: "e.g. 2 or 2,3 or 2.5,3.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: "Separate multiple accepted answers with commas — any one of them counts as correct."
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Subject",
								value: draft.subject,
								onChange: (v) => patch({ subject: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Chapter",
								value: draft.chapter,
								onChange: (v) => patch({ chapter: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Topic",
								value: draft.topic,
								onChange: (v) => patch({ topic: v })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
									children: "Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.type,
									onChange: (e) => patch({ type: e.target.value }),
									className: "w-full rounded-lg border bg-card px-2 py-1.5 text-xs",
									children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: QUESTION_TYPE_LABEL[t]
									}, t))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
									children: "Difficulty"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.difficulty,
									onChange: (e) => patch({ difficulty: e.target.value }),
									className: "w-full rounded-lg border bg-card px-2 py-1.5 text-xs",
									children: DIFFS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: d,
										children: d
									}, d))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Marks",
								value: String(draft.marks),
								onChange: (v) => patch({ marks: Number(v) || 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Text, {
								label: "Negative",
								value: String(draft.negative),
								onChange: (v) => patch({ negative: Number(v) || 0 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionImages, {
						testId,
						images: draft.images,
						hasText: Boolean(draft.text?.trim()),
						onChange: (images) => patch({
							images,
							flags: {
								...draft.flags,
								diagram: images.length > 0
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpacingControls, {
						spacing: draft.spacing,
						onChange: (spacing) => patch({ spacing })
					}),
					isMatrix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixEditor, {
						matrix: draft.matrix ?? {
							left: [
								"",
								"",
								""
							],
							right: [
								"",
								"",
								""
							]
						},
						pairs,
						onMatrix: (matrix) => patch({ matrix }),
						onPairs: setPairs
					}),
					!isMatrix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => patch({
							type: "matrix",
							matrix: {
								left: [
									"",
									"",
									""
								],
								right: [
									"",
									"",
									""
								],
								borders: true
							}
						}),
						className: "rounded-lg border border-dashed px-3 py-1.5 text-xs font-semibold text-muted-foreground",
						children: "+ Add Match the Following table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Explanation",
						value: draft.explanation ?? "",
						onChange: (v) => patch({ explanation: v || void 0 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Solution",
						value: draft.solution ?? "",
						onChange: (v) => patch({ solution: v || void 0 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: commit,
						className: "rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
						children: saveLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen((o) => !o),
						className: "inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform", open && "rotate-180") }), open ? "Hide fields" : "Edit all fields"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onDelete(question),
						className: "inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-semibold text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Delete"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: [
							"Key:",
							" ",
							objective ? correct.join(", ") || "—" : isMatrix ? Object.entries(pairs).filter(([, v]) => v).map(([k, v]) => `${k} → ${v}`).join(", ") || "—" : numeric || "—"
						]
					})
				]
			})
		]
	});
}
var GAPS = [
	{
		label: "Small",
		value: 10
	},
	{
		label: "Medium",
		value: 20
	},
	{
		label: "Large",
		value: 32
	}
];
/** Presentation-only gap editor — never touches question, answer or solution text. */
function SpacingControls({ spacing, onChange }) {
	const sp = spacing ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-semibold uppercase text-muted-foreground",
				children: "Gap / spacing (shown the same way in CBT)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(void 0),
				className: "rounded border px-2 py-0.5 text-[11px] font-semibold",
				children: "Reset formatting"
			})]
		}), [
			{
				key: "block",
				label: "Question / paragraph / equation blocks",
				fallback: 20
			},
			{
				key: "options",
				label: "Options",
				fallback: 8
			},
			{
				key: "solution",
				label: "Solution steps",
				fallback: 12
			}
		].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-1.5 text-[11px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-[210px]",
					children: r.label
				}),
				GAPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange({
						...sp,
						[r.key]: g.value
					}),
					className: cn("rounded border px-2 py-0.5 font-semibold", (sp[r.key] ?? r.fallback) === g.value && "border-primary bg-primary text-primary-foreground"),
					children: g.label
				}, g.label)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "number",
					min: 0,
					max: 120,
					value: sp[r.key] ?? r.fallback,
					onChange: (e) => onChange({
						...sp,
						[r.key]: Number(e.target.value) || 0
					}),
					className: "w-16 rounded border bg-surface px-1.5 py-0.5",
					title: "Custom gap in px"
				}),
				"px"
			]
		}, r.key))]
	});
}
function Text({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-lg border bg-card px-2 py-1.5 text-xs"
		})]
	});
}
function Area({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			rows: 2,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-lg border bg-card p-2 text-xs"
		})]
	});
}
/**
* Two image upload modes for the existing builder — no schema change:
* the same `images` array is used, the mode only changes the guidance and how
* the CBT renderer treats it (an image-only question with no statement text is
* shown as the question itself).
*/
function QuestionImages({ testId, images, hasText, onChange }) {
	const [mode, setMode] = (0, import_react.useState)(images.length > 0 && !hasText ? "complete" : "support");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 rounded-lg border p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: ["complete", "support"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(m),
					className: cn("rounded-md border px-2.5 py-1 text-[11px] font-semibold", mode === m ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground"),
					children: m === "complete" ? "Complete question image" : "Supporting image"
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionImageEditor, {
				testId,
				images,
				onChange,
				label: mode === "complete" ? "Complete question image" : "Supporting images",
				hint: mode === "complete" ? "Upload the scanned / screenshot question. Leave the statement text empty — the image is shown as the question in CBT, byte-for-byte, no OCR or processing. Add options, answer, marks and metadata below as usual." : "Attach graphs, diagrams, circuits, tables, chemical structures or other figures to a typed question. Drag & drop, or click and press Ctrl+V. PNG · JPG · JPEG · WEBP, stored exactly as uploaded."
			}),
			mode === "complete" && hasText && images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-warning",
				children: "This question has statement text, so the image renders as a figure below the text. Clear the statement to show the image as the whole question."
			})
		]
	});
}
//#endregion
export { AnswerEditor as t };
