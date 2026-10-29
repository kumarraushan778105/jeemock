import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn, t as EXAM_LABEL } from "./xp-CqT-O4I5.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as LoaderCircle, J as ImagePlus, ht as CloudUpload, ot as FileExclamationPoint, st as FileBraces, tt as FolderArchive } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as readZip, t as buildTestFromFiles } from "./import-DJ_vCnim.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/import-DfgogCIn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImportPage() {
	const router = useRouter();
	const qc = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [log, setLog] = (0, import_react.useState)([]);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const [exam, setExam] = (0, import_react.useState)("main");
	const examRef = (0, import_react.useRef)(exam);
	examRef.current = exam;
	const handleFiles = (0, import_react.useCallback)(async (files) => {
		if (files.length === 0) return;
		setBusy(true);
		setLog([]);
		const issues = [];
		try {
			const pdf = files.find((f) => /\.pdf$/i.test(f.name));
			if (pdf) issues.push({
				level: "error",
				message: `PDF import is not supported by this platform — "${pdf.name}" was skipped. Convert questions to JSON (with images as PNG/JPG) and re-import.`
			});
			let jsonText = null;
			let jsonName = "Imported test";
			const images = [];
			for (const f of files) if (/\.zip$/i.test(f.name)) {
				const { jsons, images: zipImages } = await readZip(f);
				issues.push({
					level: "warning",
					message: `${f.name}: found ${jsons.length} JSON file(s) and ${zipImages.length} image(s).`
				});
				images.push(...zipImages);
				if (!jsonText && jsons.length) {
					jsonText = [...jsons].sort((a, b) => a.path.split("/").length - b.path.split("/").length || b.text.length - a.text.length)[0].text;
					jsonName = f.name.replace(/\.zip$/i, "");
				}
			} else if (/\.json$/i.test(f.name)) {
				if (!jsonText) {
					jsonText = await f.text();
					jsonName = f.name.replace(/\.json$/i, "");
				}
			} else if (/\.(png|jpe?g|webp)$/i.test(f.name)) images.push({
				path: f.name,
				blob: f
			});
			if (!jsonText) {
				issues.push({
					level: "error",
					message: "No JSON question file was found. Add a .json file (or a ZIP containing one)."
				});
				setLog(issues);
				toast.error("Import failed — no question JSON found");
				return;
			}
			const { test, issues: buildIssues } = await buildTestFromFiles({
				name: jsonName,
				jsonText,
				images,
				source: images.length ? "zip" : "json",
				exam: examRef.current
			});
			setLog([...issues, ...buildIssues]);
			qc.invalidateQueries({ queryKey: ["tests"] });
			qc.invalidateQueries({ queryKey: ["adv"] });
			toast.success(`Imported "${test.name}" — ${test.questionCount} questions, ${test.imageCount} images`);
			setTimeout(() => router.navigate({
				to: "/bank",
				search: {
					edit: void 0,
					q: void 0
				}
			}), 900);
		} catch (err) {
			console.error("[import] failed", err);
			setLog([...issues, {
				level: "error",
				message: err.message
			}]);
			toast.error("Import failed — see the report below");
		} finally {
			setBusy(false);
		}
	}, [qc, router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Import Test"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted-foreground",
			children: "Drop a ZIP bundle (questions JSON + images folder), a standalone JSON file, or loose images. Nested folders and relative image paths are resolved automatically, and the import continues even when some images are missing."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold uppercase text-muted-foreground",
				children: "Import into"
			}), ["main", "advanced"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setExam(k),
				className: cn("rounded-full border px-3 py-1 text-xs font-semibold", exam === k ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: EXAM_LABEL[k]
			}, k))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onDragOver: (e) => {
				e.preventDefault();
				setDrag(true);
			},
			onDragLeave: () => setDrag(false),
			onDrop: (e) => {
				e.preventDefault();
				setDrag(false);
				handleFiles(Array.from(e.dataTransfer.files));
			},
			className: cn("mt-6 grid place-items-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors", drag ? "border-primary bg-primary/5" : "bg-card"),
			children: [
				busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-8 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm font-medium",
					children: busy ? "Processing import…" : "Drag & drop files here"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => inputRef.current?.click(),
					disabled: busy,
					className: "mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50",
					children: "Browse files"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					multiple: true,
					hidden: true,
					accept: ".zip,.json,.png,.jpg,.jpeg,.webp,.pdf",
					onChange: (e) => e.target.files && handleFiles(Array.from(e.target.files))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderArchive, { className: "size-4" }),
					title: "ZIP (preferred)",
					desc: "JSON + images/ in any nested layout"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBraces, { className: "size-4" }),
					title: "JSON",
					desc: "Array of questions or { questions: [...] }"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
					title: "Images",
					desc: "PNG · JPG · JPEG · WEBP, Q1.png auto-links to Q1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fmt, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "size-4" }),
					title: "PDF",
					desc: "Not supported — reported, never silently dropped"
				})
			]
		}),
		log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-sm font-bold uppercase",
				children: "Import report"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "scroll-slim max-h-72 space-y-1 overflow-auto text-xs",
				children: log.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("rounded px-2 py-1", i.level === "error" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"),
					children: i.message
				}, idx))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "mt-6 rounded-xl border bg-card p-4 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer font-semibold",
				children: "Expected JSON format"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "scroll-slim mt-3 overflow-auto rounded-lg bg-surface p-3 text-xs",
				children: `{
  "name": "JEE Main Mock 01",
  "duration": 180,
  "questions": [
    {
      "number": 1,
      "subject": "Physics",
      "chapter": "Kinematics",
      "topic": "Projectile",
      "difficulty": "Medium",
      "type": "single",           // single | multiple | integer | numerical |
                                  // matrix | assertion | paragraph | diagram | graph | table
      "question": "Find $H$ if $u=20$ m/s and $\\\\theta=30^\\\\circ$.",
      "options": ["$5$ m", "$10$ m", "$15$ m", "$20$ m"],
      "correct": "A",             // or ["A","C"], or 5 for integer/numerical
      "images": ["images/q1.png"],
      "solution": "$H=\\\\dfrac{u^2\\\\sin^2\\\\theta}{2g}$",
      "marks": 4,
      "negative": 1
    }
  ]
}`
			})]
		})
	] });
}
function Fmt({ icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm font-semibold",
			children: [
				icon,
				" ",
				title
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: desc
		})]
	});
}
//#endregion
export { ImportPage as component };
