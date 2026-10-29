import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as numericAnswerLabel, h as matrixAnswerLabel, n as QUESTION_TYPE_LABEL, o as cn, p as isMultiCorrect, v as optionIds } from "./xp-CqT-O4I5.mjs";
import { t as MathText } from "./MathText-DrvVO8lf.mjs";
import { n as LazyImage, t as ImageViewer } from "./ImageViewer-CLGX6jid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QuestionView-C1bo6bV-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABEL = String.raw`Assertion|Reason|Statements?\s*(?:IV|I{1,3}|[1-4]|[A-D])\b|Paragraph|Case\s*Study|Comprehension|Passage|Directions?|Column\s*(?:I{1,2})|List\s*(?:I{1,2})|Given|To\s*Find|Note`;
/**
* Lead-in phrases that introduce the answer choices of a statement-based
* question. Splitting before them puts the choices lead-in in its own block so
* it gets the same spacing as the statements above it.
*/
var TAIL_RE = /In\s+(?:the\s+)?light\s+of\s+the\s+above|Choose\s+the\s+(?:correct|most)|Which\s+of\s+the\s+(?:above|following)\s+(?:is|are|statements?)|In\s+respect\s+of\s+the\s+above/i;
/** Splits a chunk once, right before the answer-choices lead-in. */
function splitTail(chunk) {
	const m = TAIL_RE.exec(chunk);
	if (!m || m.index <= 0) return [chunk];
	return [chunk.slice(0, m.index), chunk.slice(m.index)];
}
/** e.g. "Assertion (A):", "Reason (R) -", "Passage:" at the start of a chunk */
var HEAD_RE = new RegExp(String.raw`^\s*((?:${LABEL})\s*(?:\([^)\n]{1,12}\))?)\s*[:\-–—.]\s*`, "i");
/** split point right before a known section label */
var SPLIT_RE = new RegExp(String.raw`(?=(?:${LABEL})\s*(?:\([^)\n]{1,12}\))?\s*[:\-–—])`, "gi");
/** generic "Some Heading:" line followed by its own content */
var GENERIC_HEAD_RE = /^\s*([A-Z][A-Za-z ]{2,28})\s*:\s*(?=\S)/;
function chunkToBlock(chunk) {
	const raw = chunk.replace(/^\s+|\s+$/g, "");
	if (!raw) return null;
	const known = HEAD_RE.exec(raw);
	if (known) {
		const body = raw.slice(known[0].length).trim();
		return {
			heading: known[1].replace(/\s+/g, " ").trim(),
			body
		};
	}
	return { body: raw };
}
/**
* Splits text into logical blocks. Returns a single unlabelled block when no
* section structure is detected (the overwhelmingly common case), so existing
* questions render byte-for-byte as before.
*/
function splitBlocks(input) {
	const src = String(input ?? "");
	if (!src.trim()) return [{ body: src }];
	const out = [];
	for (const para of src.split(/\n\s*\n+/)) {
		if (!para.trim()) continue;
		const pieces = para.split(SPLIT_RE).flatMap(splitTail);
		for (const piece of pieces) {
			const block = chunkToBlock(piece);
			if (!block) continue;
			if (!block.heading) {
				const generic = GENERIC_HEAD_RE.exec(block.body);
				if (generic && block.body.length > generic[0].length + 8) {
					out.push({
						heading: generic[1].trim(),
						body: block.body.slice(generic[0].length).trim()
					});
					continue;
				}
			}
			out.push(block);
		}
	}
	if (out.length === 0) return [{ body: src }];
	return out;
}
/**
* True when the author deliberately formatted the text themselves — blank
* lines, leading indentation on a line, or runs of 2+ spaces. Such text must be
* rendered verbatim instead of being re-flowed by the automatic block splitter.
*/
function hasManualFormatting(input) {
	const src = String(input ?? "");
	if (!src) return false;
	return /\n[ \t]*\n/.test(src) || /(^|\n)[ \t]+\S/.test(src) || /\S[ \t]{2,}\S/.test(src);
}
/**
* Renders text with automatically detected logical sections (Assertion, Reason,
* Paragraph, Passage, Case Study, Comprehension, "Heading: content" …) using the
* question's existing spacing configuration.
*
* Manual formatting always wins: when the author typed blank lines, indentation
* or intentional multi-space runs, the text is rendered verbatim (whitespace
* preserved) instead of being re-flowed. Section headings are still labelled
* when they are detected, but nothing inside a block is collapsed.
*
* Falls back to a plain <MathText> when no section structure is present, so
* existing questions render exactly as before.
*/
var MathBlocks = (0, import_react.memo)(function MathBlocks({ children, className, gap = 12, style }) {
	const src = children ?? "";
	const blocks = (0, import_react.useMemo)(() => splitBlocks(src), [src]);
	const manual = (0, import_react.useMemo)(() => hasManualFormatting(src), [src]);
	const structured = blocks.length > 1 || Boolean(blocks[0]?.heading);
	const labelled = blocks.some((b) => b.heading);
	if (!structured || manual && !labelled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
		className,
		preserveWhitespace: manual,
		style,
		children: src
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col",
		style: { rowGap: gap },
		children: blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: b.heading ? "pl-3" : void 0,
			children: [b.heading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mb-1 text-[11px] font-semibold uppercase text-muted-foreground"),
				children: b.heading
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
				className,
				preserveWhitespace: manual,
				style,
				children: b.body
			})]
		}, i))
	});
});
function QuestionView({ question, value, onChange, readOnly = false, showAnswer = false, fontScale = 1 }) {
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const selected = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];
	const ids = (0, import_react.useMemo)(() => optionIds(question), [question]);
	const multi = isMultiCorrect(question);
	const toggle = (id) => {
		if (readOnly || !onChange) return;
		if (multi) {
			const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
			onChange(next.length ? next : []);
		} else onChange(selected.length === 1 && selected[0] === id ? [] : [id]);
	};
	const sp = question.spacing ?? {};
	/** an uploaded question image with no typed statement renders as the stem */
	const stemImage = !question.text?.trim() && question.images.length > 0;
	/** image-only question whose options live inside the image — offer A–D choices */
	const imageOnlyChoices = stemImage && !question.matrix && question.type !== "integer" && question.type !== "numerical" ? question.options.length < 2 : false;
	const fallbackOptions = [
		"A",
		"B",
		"C",
		"D"
	];
	const scale = Math.min(1.5, Math.max(.8, fontScale));
	const size = (base) => `${Math.round(base * scale)}px`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		style: { rowGap: sp.block ?? 20 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-[11px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.subject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.chapter }),
					question.topic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.topic }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: multi ? "Multiple Correct" : QUESTION_TYPE_LABEL[question.type] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: question.difficulty }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						tone: "good",
						children: ["+", question.marks]
					}),
					question.negative > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
						tone: "bad",
						children: ["−", question.negative]
					})
				]
			}),
			question.paragraph && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border-l-4 border-primary bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-1 text-xs font-semibold text-muted-foreground uppercase",
					children: "Paragraph"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
					className: "text-sm",
					gap: sp.block ?? 20,
					children: question.paragraph
				})]
			}),
			question.text?.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
				className: "font-medium",
				gap: sp.block ?? 20,
				style: { fontSize: size(15) },
				children: question.text
			}),
			question.tableHtml && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "math-content overflow-x-auto rounded-lg border [&_table]:w-full [&_td]:border [&_td]:px-3 [&_td]:py-1.5 [&_th]:border [&_th]:bg-surface [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left",
				dangerouslySetInnerHTML: { __html: question.tableHtml }
			}),
			question.images.length > 0 && (stemImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full space-y-3",
				children: question.images.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id,
						alt: `Q${question.number} question image ${i + 1}`,
						className: "block h-auto max-h-[350px] max-w-full w-auto rounded-none border-0 bg-transparent p-0 shadow-none object-contain object-left",
						onClick: () => setViewer(i)
					})
				}, id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: question.images.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
							id,
							alt: `Q${question.number} figure ${i + 1}`,
							className: "block h-auto max-h-[350px] max-w-full w-auto rounded-none border-0 bg-transparent p-0 shadow-none object-contain object-left",
							onClick: () => setViewer(i)
						})
					}, id))
				})
			})),
			question.matrix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixMatch, {
				question,
				selected,
				readOnly,
				onChange: (v) => onChange?.(v)
			}) : question.type === "integer" || question.type === "numerical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-xs font-semibold text-muted-foreground uppercase",
					children: "Your answer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					inputMode: "decimal",
					disabled: readOnly,
					value: Array.isArray(value) ? value[0] ?? "" : value ?? "",
					onChange: (e) => onChange?.(e.target.value.replace(/[^0-9.\-]/g, "")),
					placeholder: question.type === "integer" ? "Integer value" : "Numerical value",
					className: "w-full rounded-lg border bg-card px-3 py-2 font-mono outline-none focus:ring-2 focus:ring-ring",
					style: { fontSize: size(18) }
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid",
				style: { rowGap: sp.options ?? 8 },
				children: [multi && !readOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Select all correct options — tap again to deselect"
				}), (imageOnlyChoices ? fallbackOptions.map((id) => ({
					id,
					text: "",
					images: []
				})) : question.options).map((o, i) => {
					const oid = imageOnlyChoices ? fallbackOptions[i] : ids[i];
					const isSel = selected.includes(oid);
					const isRight = question.correct.map(String).includes(oid);
					const missed = showAnswer && isRight && !isSel;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: readOnly,
						"aria-pressed": isSel,
						onClick: () => toggle(oid),
						className: cn("flex items-start gap-3 rounded-lg border p-3 text-left transition-colors", !readOnly && "hover:border-primary/60 hover:bg-accent/40", isSel && "border-primary bg-primary/10", showAnswer && isRight && "border-success bg-success/10", showAnswer && isSel && !isRight && "border-destructive bg-destructive/10", missed && "border-dashed"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 grid size-6 shrink-0 place-items-center border text-xs font-bold", multi ? "rounded" : "rounded-full", isSel && "border-primary bg-primary text-primary-foreground", showAnswer && isRight && "border-success bg-success text-background"),
							children: oid
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								o.text?.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
									className: "min-w-0",
									style: { fontSize: size(14) },
									children: o.text
								}),
								(o.images?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 flex flex-wrap gap-2",
									children: o.images.map((imgId, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
										id: imgId,
										alt: `Option ${oid} image ${k + 1}`,
										className: "max-h-32 rounded-none border-0 bg-transparent p-0 shadow-none"
									}, imgId))
								}),
								showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 flex flex-wrap gap-1 text-[10px] font-bold uppercase",
									children: [
										isSel && isRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-success/15 px-1.5 py-0.5 text-success",
											children: "Selected · correct"
										}),
										isSel && !isRight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-destructive/15 px-1.5 py-0.5 text-destructive",
											children: "Selected · wrong"
										}),
										missed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-warning/15 px-1.5 py-0.5 text-warning",
											children: "Missed correct option"
										})
									]
								})
							]
						})]
					}, oid);
				})]
			}),
			showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col rounded-lg border bg-surface p-4",
				style: { rowGap: sp.solution ?? 12 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold text-muted-foreground uppercase",
						children: "Correct answer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
						className: "font-semibold",
						style: { fontSize: size(14) },
						children: question.type === "integer" || question.type === "numerical" ? numericAnswerLabel(question) : question.matrix ? matrixAnswerLabel(question) : question.correct.join(", ") || "—"
					}),
					question.solution && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-xs font-semibold text-muted-foreground uppercase",
						children: "Solution"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
						className: "",
						gap: sp.solution ?? 12,
						style: { fontSize: size(14) },
						children: question.solution
					})] }),
					question.explanation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-xs font-semibold text-muted-foreground uppercase",
						children: "Explanation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathBlocks, {
						className: "",
						gap: sp.solution ?? 12,
						style: { fontSize: size(14) },
						children: question.explanation
					})] })
				]
			}),
			viewer !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageViewer, {
				ids: question.images,
				startIndex: viewer,
				onClose: () => setViewer(null)
			})
		]
	});
}
function MatrixMatch({ question, selected, readOnly, onChange }) {
	const left = question.matrix?.left ?? [];
	const right = question.matrix?.right ?? [];
	const letters = right.map((_, i) => String.fromCharCode(65 + i));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: cn("w-full text-sm", question.matrix?.borders !== false && "[&_td]:border [&_th]:border"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-surface text-xs uppercase",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: { width: question.matrix?.leftWidth ?? void 0 },
					className: "px-3 py-2 text-left",
					children: "List I"
				}), letters.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-3 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
						as: "span",
						children: `${l}. ${right[i]}`
					})
				}, l))] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: left.map((item, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-3 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
						as: "span",
						children: `${r + 1}. ${item}`
					})
				}), letters.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-3 py-2 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "radio",
						disabled: readOnly,
						checked: selected[r] === l,
						onChange: () => {
							const next = [...selected];
							next[r] = l;
							onChange(next);
						},
						className: "size-4 accent-[var(--primary)]"
					})
				}, l))]
			}, r)) })]
		})
	});
}
function Chip({ children, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full border px-2 py-0.5 font-medium", tone === "good" && "border-success/40 bg-success/10 text-success", tone === "bad" && "border-destructive/40 bg-destructive/10 text-destructive", !tone && "bg-surface text-muted-foreground"),
		children
	});
}
//#endregion
export { QuestionView as t };
