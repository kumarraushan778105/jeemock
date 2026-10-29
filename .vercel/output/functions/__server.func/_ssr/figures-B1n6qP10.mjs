import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as Link2, q as Images, r as X, y as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { P as listAllImages, V as listTests, X as putImage, et as putTest } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as MathText } from "./MathText-DrvVO8lf.mjs";
import { n as LazyImage } from "./ImageViewer-CLGX6jid.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/figures-B1n6qP10.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FiguresPage() {
	const qc = useQueryClient();
	const images = useQuery({
		queryKey: ["images"],
		queryFn: listAllImages
	});
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [mapping, setMapping] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const testMap = (0, import_react.useMemo)(() => new Map((tests.data ?? []).map((t) => [t.id, t])), [tests.data]);
	const rows = (0, import_react.useMemo)(() => {
		const list = (images.data ?? []).map((img) => {
			const test = testMap.get(img.testId);
			return {
				img,
				test,
				q: test?.questions.find((x) => x.images.includes(img.id)) ?? (img.qNumber !== void 0 ? test?.questions.find((x) => x.number === img.qNumber) : void 0),
				linked: Boolean(test?.questions.some((x) => x.images.includes(img.id)))
			};
		});
		const s = search.trim().toLowerCase();
		return list.filter((r) => {
			if (filter === "linked" && !r.linked) return false;
			if (filter === "unlinked" && r.linked) return false;
			if (!s) return true;
			return [
				r.img.name,
				r.img.path,
				r.test?.name,
				r.q?.subject,
				r.q?.chapter,
				String(r.q?.number)
			].filter(Boolean).some((v) => String(v).toLowerCase().includes(s));
		});
	}, [
		images.data,
		testMap,
		search,
		filter
	]);
	const linkImage = async (img, test, questionNumber) => {
		const q = test.questions.find((x) => x.number === questionNumber);
		if (!q) return;
		for (const other of test.questions) other.images = other.images.filter((id) => id !== img.id);
		q.images = [...q.images, img.id];
		q.flags.diagram = true;
		await putTest({
			...test,
			updatedAt: Date.now()
		});
		await putImage({
			...img,
			qNumber: questionNumber
		});
		await qc.invalidateQueries({ queryKey: ["tests"] });
		await qc.invalidateQueries({ queryKey: ["images"] });
		setMapping(null);
		toast.success(`Linked ${img.name} to Q${questionNumber}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-5" }), " Figure Library"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [images.data?.length ?? 0, " images stored on this device. Unlinked images can be mapped to a question manually."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[220px] flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search filename, chapter, question…",
					className: "w-full rounded-lg border bg-surface py-2 pl-9 pr-3 text-sm"
				})]
			}), [
				"all",
				"linked",
				"unlinked"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setFilter(f),
				className: cn("rounded-lg border px-3 py-2 text-xs font-semibold capitalize", filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card"),
				children: f
			}, f))]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: [
				"No figures yet — import a ZIP containing an ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "images/" }),
				" folder."
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: rows.map(({ img, test, q, linked }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPreview({
						img,
						q
					}),
					className: "grid h-36 w-full place-items-center bg-surface p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id: img.id,
						alt: img.name,
						className: "max-h-32"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 border-t p-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-semibold",
							title: img.path ?? img.name,
							children: img.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-muted-foreground",
							children: test?.name ?? "Unknown set"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: linked && q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-answered/15 px-1.5 py-0.5 font-semibold text-answered",
									children: ["Q", q.number]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-surface px-1.5 py-0.5",
									children: q.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate rounded bg-surface px-1.5 py-0.5",
									children: q.chapter
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setMapping(img),
								className: "inline-flex items-center gap-1 rounded bg-warning/15 px-1.5 py-0.5 font-semibold text-warning",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3" }), " Link to question"]
							})
						})
					]
				})]
			}, img.id))
		}),
		preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
			onClose: () => setPreview(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid max-h-[85vh] gap-4 overflow-auto p-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
					id: preview.img.id,
					alt: preview.img.name,
					className: "w-full rounded-lg bg-surface"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: preview.img.path ?? preview.img.name
					}), preview.q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 font-bold",
							children: ["Question ", preview.q.number]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								preview.q.subject,
								" · ",
								preview.q.chapter
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, {
							className: "mt-3 text-sm",
							children: preview.q.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/bank",
							search: {
								edit: void 0,
								q: void 0
							},
							className: "mt-4 inline-block rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground",
							children: "Open in Question Bank"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "This figure is not linked to a question."
					})]
				})]
			})
		}),
		mapping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
			onClose: () => setMapping(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapDialog, {
				img: mapping,
				test: testMap.get(mapping.testId),
				onLink: (n) => {
					const t = testMap.get(mapping.testId);
					if (t) linkImage(mapping, t, n);
				}
			})
		})
	] });
}
function MapDialog({ img, test, onLink }) {
	const [q, setQ] = (0, import_react.useState)("");
	const list = (test?.questions ?? []).filter((x) => !q.trim() || String(x.number).includes(q.trim()) || x.text.toLowerCase().includes(q.trim().toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex max-h-[85vh] flex-col p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-sm font-bold",
				children: [
					"Link “",
					img.name,
					"” to a question"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search by number or text",
				className: "mt-3 rounded-lg border bg-surface px-3 py-2 text-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-slim mt-3 space-y-1 overflow-auto",
				children: [list.slice(0, 200).map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onLink(x.number),
					className: "block w-full truncate rounded-lg border bg-surface px-3 py-2 text-left text-xs hover:border-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: ["Q", x.number]
						}),
						" · ",
						x.subject,
						" — ",
						x.text.slice(0, 90)
					]
				}, x.id)), list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "No questions in this set."
				})]
			})
		]
	});
}
function Overlay({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/70",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				"aria-label": "Close",
				className: "absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-md border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			}), children]
		})]
	});
}
//#endregion
export { FiguresPage as component };
