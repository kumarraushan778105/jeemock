import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn, r as SUBJECTS } from "./xp-CqT-O4I5.mjs";
import { $ as Folder, F as Minimize2, K as Image, P as Minus, Tt as ChevronLeft, V as Maximize2, ft as Download, i as Upload, it as FileText, r as X, w as Plus, wt as ChevronRight, y as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { N as libraryNoteUrl, Q as putLibraryNote, R as listLibraryNotes, at as uid, h as deleteLibraryNote } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes-DiOqwjLk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function groupLibraryNotesBySubjectAndChapter(notes) {
	const grouped = /* @__PURE__ */ new Map();
	for (const note of notes) {
		const subject = note.subject?.trim() || "General";
		const chapter = note.chapter?.trim() || "General";
		const key = `${subject}::${chapter}`;
		if (!grouped.has(key)) grouped.set(key, {
			subject,
			chapter,
			notes: []
		});
		grouped.get(key).notes.push(note);
	}
	return Array.from(grouped.values()).sort((a, b) => {
		if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
		return a.chapter.localeCompare(b.chapter);
	});
}
var OK_IMAGE = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp",
	"image/gif"
];
function NotesLibrary() {
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [subject, setSubject] = (0, import_react.useState)(SUBJECTS[0]);
	const [chapter, setChapter] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [fSubject, setFSubject] = (0, import_react.useState)("all");
	const [fChapter, setFChapter] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)(null);
	const [activeGroupKey, setActiveGroupKey] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const notes = useQuery({
		queryKey: ["library-notes"],
		queryFn: listLibraryNotes
	}).data ?? [];
	const chapters = (0, import_react.useMemo)(() => [...new Set(notes.map((n) => n.chapter).filter(Boolean))].sort(), [notes]);
	const chapterGroups = (0, import_react.useMemo)(() => groupLibraryNotesBySubjectAndChapter(notes), [notes]);
	const filteredGroups = (0, import_react.useMemo)(() => {
		const s = search.trim().toLowerCase();
		return chapterGroups.filter((group) => {
			if (fSubject !== "all" && group.subject !== fSubject) return false;
			if (fChapter !== "all" && group.chapter !== fChapter) return false;
			if (!s) return true;
			return `${group.subject} ${group.chapter}`.toLowerCase().includes(s) || group.notes.some((note) => `${note.title} ${note.name}`.toLowerCase().includes(s));
		});
	}, [
		chapterGroups,
		fSubject,
		fChapter,
		search
	]);
	const selectedGroup = (0, import_react.useMemo)(() => {
		if (!activeGroupKey) return null;
		return chapterGroups.find((group) => `${group.subject}::${group.chapter}` === activeGroupKey) ?? null;
	}, [activeGroupKey, chapterGroups]);
	(0, import_react.useEffect)(() => {
		if (!search.trim().toLowerCase()) {
			setActiveGroupKey(null);
			return;
		}
		const match = filteredGroups[0];
		if (match) setActiveGroupKey(`${match.subject}::${match.chapter}`);
	}, [filteredGroups, search]);
	const upload = async (files) => {
		const valid = files.filter((f) => f.type === "application/pdf" || OK_IMAGE.includes(f.type));
		if (valid.length === 0) {
			toast.error("Upload a PDF or an image (PNG, JPG, WEBP)");
			return;
		}
		setBusy(true);
		try {
			for (const f of valid) await putLibraryNote({
				id: uid("note"),
				title: f.name.replace(/\.[^.]+$/, ""),
				subject,
				chapter: chapter.trim() || "General",
				kind: f.type === "application/pdf" ? "pdf" : "image",
				name: f.name,
				type: f.type,
				size: f.size,
				blob: f,
				createdAt: Date.now()
			});
			qc.invalidateQueries({ queryKey: ["library-notes"] });
			toast.success(`${valid.length} note(s) added to ${subject} · ${chapter.trim() || "General"}`);
		} finally {
			setBusy(false);
		}
	};
	const remove = async (n) => {
		if (!window.confirm(`Delete "${n.title}"?`)) return;
		await deleteLibraryNote(n.id);
		qc.invalidateQueries({ queryKey: ["library-notes"] });
		toast.success("Note deleted");
	};
	const downloadNote = (n) => {
		const url = URL.createObjectURL(n.blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = n.name;
		link.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold tracking-tight",
				children: "Notes Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Revision material only — PDFs and note images organised by subject and chapter. Kept fully separate from the question bank and CBT engine."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-xl border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
									children: "Subject"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: subject,
									onChange: (e) => setSubject(e.target.value),
									className: "w-full rounded-lg border bg-background px-2 py-1.5 text-sm",
									children: [...new Set([...SUBJECTS, ...notes.map((n) => n.subject)])].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1 block text-[11px] font-semibold uppercase text-muted-foreground",
										children: "Chapter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: chapter,
										onChange: (e) => setChapter(e.target.value),
										placeholder: "e.g. Rotational Motion",
										list: "note-chapters",
										className: "w-full rounded-lg border bg-background px-2 py-1.5 text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: "note-chapters",
										children: chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: c }, c))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy,
									onClick: () => fileRef.current?.click(),
									className: "inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
										" ",
										busy ? "Saving…" : "Upload notes"
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						multiple: true,
						accept: "application/pdf,image/png,image/jpeg,image/webp,image/gif",
						className: "hidden",
						onChange: (e) => {
							const files = Array.from(e.target.files ?? []);
							e.target.value = "";
							if (files.length) upload(files);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "PDF · PNG · JPG · WEBP — stored offline on this device, exactly as uploaded."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search notes by title, file name, subject or chapter…",
						className: "w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: fSubject,
						onChange: (e) => setFSubject(e.target.value),
						className: "rounded-lg border bg-background px-2 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All subjects"
						}), [...new Set(notes.map((n) => n.subject))].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: fChapter,
						onChange: (e) => setFChapter(e.target.value),
						className: "rounded-lg border bg-background px-2 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All chapters"
						}), chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					})]
				})]
			}),
			filteredGroups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground",
				children: "No notes yet — upload a PDF or a screenshot of your notes to start your revision library."
			}) : selectedGroup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-background/70 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: selectedGroup.chapter
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: selectedGroup.subject
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveGroupKey(null),
						className: "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }), " Back to library"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 md:grid-cols-2",
					children: selectedGroup.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-xl border bg-card p-3 shadow-sm transition-colors hover:border-primary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-9 shrink-0 place-items-center rounded-lg", n.kind === "pdf" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"),
							children: n.kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setView(n),
								className: "w-full text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold",
									children: n.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-[11px] text-muted-foreground",
									children: [
										n.name,
										" · ",
										(n.size / 1024).toFixed(0),
										" KB"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setView(n),
										className: "rounded border px-2 py-1 text-[11px] font-medium",
										children: "Open"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => downloadNote(n),
										className: "rounded border px-2 py-1 text-[11px] font-medium",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }), " Download"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => void remove(n),
										title: "Delete note",
										"aria-label": "Delete note",
										className: "rounded border border-destructive/40 px-2 py-1 text-[11px] font-medium text-destructive",
										children: "Delete"
									})
								]
							})]
						})]
					}, n.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: filteredGroups.map((group) => {
					const lastUpdated = new Date(Math.max(...group.notes.map((note) => note.createdAt))).toLocaleDateString();
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveGroupKey(`${group.subject}::${group.chapter}`),
						className: "flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: group.chapter
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: group.subject
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground",
									children: [
										group.notes.length,
										" note",
										group.notes.length === 1 ? "" : "s"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-center justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Updated ", lastUpdated] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: "Open"
							})]
						})]
					}, `${group.subject}-${group.chapter}`);
				})
			})
		]
	}), view && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteViewer, {
		note: view,
		onClose: () => setView(null),
		chapterNotes: selectedGroup?.notes ?? [],
		onNavigate: setView
	})] });
}
function NoteViewer({ note, onClose, chapterNotes = [], onNavigate }) {
	const shellRef = (0, import_react.useRef)(null);
	const viewerRef = (0, import_react.useRef)(null);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [displayMode, setDisplayMode] = (0, import_react.useState)("fit-width");
	const [page, setPage] = (0, import_react.useState)(1);
	const [viewerSize, setViewerSize] = (0, import_react.useState)({
		width: 0,
		height: 0
	});
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const zoomRef = (0, import_react.useRef)(1);
	zoomRef.current = zoom;
	const url = useQuery({
		queryKey: ["library-note-url", note.id],
		queryFn: () => libraryNoteUrl(note.id)
	}).data;
	const currentIndex = chapterNotes.findIndex((item) => item.id === note.id);
	const canGoPrev = currentIndex > 0;
	const canGoNext = currentIndex >= 0 && currentIndex < chapterNotes.length - 1;
	const zoomPresets = [
		.25,
		.5,
		.75,
		1,
		1.25,
		1.5,
		1.75,
		1.9,
		2,
		2.5,
		3,
		4,
		5,
		8
	];
	(0, import_react.useEffect)(() => {
		setPage(1);
		setDisplayMode("fit-width");
		setZoom(1);
	}, [note.id]);
	(0, import_react.useEffect)(() => {
		if (!viewerRef.current) return;
		const updateViewerSize = () => {
			if (!viewerRef.current) return;
			const rect = viewerRef.current.getBoundingClientRect();
			setViewerSize({
				width: rect.width - 24,
				height: rect.height - 24
			});
		};
		updateViewerSize();
		const observer = new ResizeObserver(updateViewerSize);
		observer.observe(viewerRef.current);
		window.addEventListener("resize", updateViewerSize);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateViewerSize);
		};
	}, [note.id, isFullscreen]);
	(0, import_react.useEffect)(() => {
		if (!viewerSize.width) return;
		if (displayMode === "fit-width") setZoom(Math.max(.25, Math.min(8, viewerSize.width / 816)));
		else if (displayMode === "fit-page") setZoom(Math.max(.25, Math.min(8, Math.min(viewerSize.width / 816, viewerSize.height / 1056))));
	}, [
		displayMode,
		viewerSize.height,
		viewerSize.width
	]);
	(0, import_react.useEffect)(() => {
		const onFullscreenChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement));
		};
		const onKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "=")) {
				event.preventDefault();
				setDisplayMode("actual-size");
				setZoom((value) => Math.min(8, Number((value + .1).toFixed(2))));
			}
			if ((event.ctrlKey || event.metaKey) && event.key === "-") {
				event.preventDefault();
				setDisplayMode("actual-size");
				setZoom((value) => Math.max(.25, Number((value - .1).toFixed(2))));
			}
			if ((event.ctrlKey || event.metaKey) && event.key === "0") {
				event.preventDefault();
				setDisplayMode("actual-size");
				setZoom(1);
			}
			if (event.key === "Escape" && document.fullscreenElement) {
				event.preventDefault();
				document.exitFullscreen();
				setIsFullscreen(false);
			}
			if (event.key === "ArrowLeft" && canGoPrev && onNavigate) {
				event.preventDefault();
				onNavigate(chapterNotes[currentIndex - 1]);
			}
			if (event.key === "ArrowRight" && canGoNext && onNavigate) {
				event.preventDefault();
				onNavigate(chapterNotes[currentIndex + 1]);
			}
			if (event.key === "PageUp") {
				event.preventDefault();
				viewerRef.current?.scrollBy({
					top: -400,
					behavior: "smooth"
				});
			}
			if (event.key === "PageDown") {
				event.preventDefault();
				viewerRef.current?.scrollBy({
					top: 400,
					behavior: "smooth"
				});
			}
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("fullscreenchange", onFullscreenChange);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [
		canGoNext,
		canGoPrev,
		chapterNotes,
		currentIndex,
		note.id,
		onNavigate
	]);
	const applyZoom = (next) => {
		setDisplayMode("actual-size");
		setZoom(Math.min(8, Math.max(.25, Number(next.toFixed(3)))));
	};
	/**
	* Cursor-anchored, delta-proportional zoom. Kept in a ref so the native
	* non-passive wheel listener below never reads stale state.
	*/
	const wheelZoom = (event) => {
		const el = viewerRef.current;
		if (!el) return;
		const dy = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
		const current = zoomRef.current;
		const next = Math.min(8, Math.max(.25, current * Math.exp(-dy * .0018)));
		if (next === current) return;
		const rect = el.getBoundingClientRect();
		const px = event.clientX - rect.left + el.scrollLeft;
		const py = event.clientY - rect.top + el.scrollTop;
		const k = next / current;
		setDisplayMode("actual-size");
		setZoom(next);
		requestAnimationFrame(() => {
			const node = viewerRef.current;
			if (!node) return;
			node.scrollLeft += px * (k - 1);
			node.scrollTop += py * (k - 1);
		});
	};
	const wheelRef = (0, import_react.useRef)(wheelZoom);
	wheelRef.current = wheelZoom;
	(0, import_react.useEffect)(() => {
		const el = viewerRef.current;
		if (!el) return;
		const onWheel = (event) => {
			if (!(event.ctrlKey || event.metaKey)) return;
			event.preventDefault();
			wheelRef.current(event);
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [
		note.id,
		isFullscreen,
		url
	]);
	const setViewMode = (mode) => {
		setDisplayMode(mode);
	};
	const toggleFullscreen = async () => {
		const el = shellRef.current;
		if (!el) return;
		if (document.fullscreenElement) {
			await document.exitFullscreen();
			setIsFullscreen(false);
		} else await el.requestFullscreen?.();
	};
	const zoomLabel = displayMode === "fit-width" ? "Fit Width" : displayMode === "fit-page" ? "Fit Page" : `${Math.round(zoom * 100)}%`;
	const pdfZoomParam = displayMode === "fit-width" ? "page-width" : displayMode === "fit-page" ? "page-fit" : `${Math.round(zoom * 100)}`;
	const pdfSrc = url ? `${url}#page=${page}&toolbar=0&navpanes=0&zoom=${encodeURIComponent(pdfZoomParam)}` : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: cn("fixed inset-0 z-50 flex flex-col bg-black/80 p-2 sm:p-6", isFullscreen && "bg-black p-0 sm:p-0"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mb-2 flex items-center gap-2 text-sm text-white", isFullscreen && "justify-end"),
			children: [!isFullscreen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1 truncate font-semibold",
				children: [
					note.title,
					" — ",
					note.subject,
					" · ",
					note.chapter
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					chapterNotes.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canGoPrev,
						onClick: () => onNavigate?.(chapterNotes[currentIndex - 1]),
						"aria-label": "Previous note",
						title: "Previous note",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20 disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canGoNext,
						onClick: () => onNavigate?.(chapterNotes[currentIndex + 1]),
						"aria-label": "Next note",
						title: "Next note",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20 disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => applyZoom(zoom - .1),
						"aria-label": "Zoom out",
						title: "Zoom out",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: displayMode === "actual-size" ? `${Math.round(zoom * 100)}%` : displayMode,
						onChange: (event) => {
							const value = event.target.value;
							if (value === "fit-width") setViewMode("fit-width");
							else if (value === "fit-page") setViewMode("fit-page");
							else if (value === "actual-size") setViewMode("actual-size");
							else applyZoom(Number(value) / 100);
						},
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fit-width",
								children: "Fit Width"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fit-page",
								children: "Fit Page"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "actual-size",
								children: "Actual Size"
							}),
							zoomPresets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: Math.round(preset * 100),
								children: [Math.round(preset * 100), "%"]
							}, preset))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => applyZoom(zoom + .1),
						"aria-label": "Zoom in",
						title: "Zoom in",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setViewMode("fit-width"),
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-medium",
						children: "Fit Width"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setViewMode("fit-page"),
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-medium",
						children: "Fit Page"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setDisplayMode("actual-size");
							setZoom(1);
						},
						"aria-label": "Reset zoom",
						title: "Reset zoom",
						className: "rounded-md border border-white/30 bg-black/20 px-2 py-1 text-xs font-semibold",
						children: zoomLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleFullscreen,
						"aria-label": isFullscreen ? "Exit full screen" : "Full screen",
						title: isFullscreen ? "Exit full screen" : "Full screen",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close viewer",
						className: "grid size-8 place-items-center rounded-md border border-white/30 bg-black/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: viewerRef,
			className: cn("flex min-h-0 flex-1 items-start justify-center overflow-auto rounded-xl bg-card p-4", isFullscreen && "rounded-none p-2 sm:p-2"),
			children: !url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading…"
			}) : note.kind === "pdf" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("embed", {
					src: pdfSrc,
					type: "application/pdf",
					title: note.title,
					className: "min-h-[75vh] w-full rounded-xl border-0 bg-white"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full items-start justify-center",
				style: {
					transform: `scale(${zoom})`,
					transformOrigin: "top center",
					width: `${100 / zoom}%`,
					minHeight: `${100 / zoom}%`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: note.title,
					className: "max-h-full max-w-full object-contain"
				})
			})
		})]
	});
}
//#endregion
export { NotesLibrary as component };
