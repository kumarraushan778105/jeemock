import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { P as Minus, V as Maximize2, j as Move, r as X, w as Plus, x as RotateCw } from "../_libs/lucide-react.mjs";
import { M as imageUrl } from "./db-CAmn2mwk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageViewer-CLGX6jid.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useImageUrl(id) {
	const [url, setUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		if (!id) {
			setUrl(null);
			return;
		}
		imageUrl(id).then((u) => alive && setUrl(u)).catch((e) => console.error("[image] load failed", id, e));
		return () => {
			alive = false;
		};
	}, [id]);
	return url;
}
function LazyImage({ id, alt, className, onClick }) {
	const url = useImageUrl(id);
	if (!url) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-28 items-center justify-center rounded-md border border-dashed bg-muted/40 text-xs text-muted-foreground", className),
		children: "image unavailable"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: url,
		alt,
		loading: "lazy",
		decoding: "async",
		onClick,
		className: cn("max-w-full object-contain", onClick && "cursor-zoom-in", className)
	});
}
/** Zoom / pan / rotate / fullscreen viewer for a gallery of stored images. */
function ImageViewer({ ids, startIndex = 0, onClose }) {
	const [index, setIndex] = (0, import_react.useState)(startIndex);
	const [scale, setScale] = (0, import_react.useState)(1);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const drag = (0, import_react.useRef)(null);
	const shellRef = (0, import_react.useRef)(null);
	const url = useImageUrl(ids[index]);
	(0, import_react.useEffect)(() => {
		setScale(1);
		setRotation(0);
		setOffset({
			x: 0,
			y: 0
		});
	}, [index]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "+" || e.key === "=") setScale((s) => Math.min(8, s * 1.2));
			if (e.key === "-") setScale((s) => Math.max(.2, s / 1.2));
			if (e.key === "r") setRotation((r) => (r + 90) % 360);
			if (e.key === "ArrowRight") setIndex((i) => Math.min(ids.length - 1, i + 1));
			if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [ids.length, onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		className: "fixed inset-0 z-100 flex flex-col bg-background/97 backdrop-blur-sm",
		role: "dialog",
		"aria-modal": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground",
					children: [
						"Figure ",
						index + 1,
						" of ",
						ids.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => setScale((s) => Math.max(.2, s / 1.2)),
							label: "Zoom out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-14 text-center font-mono text-xs",
							children: [Math.round(scale * 100), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => setScale((s) => Math.min(8, s * 1.2)),
							label: "Zoom in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => setRotation((r) => (r + 90) % 360),
							label: "Rotate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: () => {
								const el = shellRef.current;
								if (!el) return;
								if (document.fullscreenElement) document.exitFullscreen();
								else el.requestFullscreen?.();
							},
							label: "Fullscreen",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerBtn, {
							onClick: onClose,
							label: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 overflow-hidden",
				onWheel: (e) => {
					if (!e.ctrlKey && !e.metaKey) return;
					e.preventDefault();
					setScale((s) => Math.min(8, Math.max(.2, s * (e.deltaY < 0 ? 1.1 : .9))));
				},
				onPointerDown: (e) => {
					drag.current = {
						x: e.clientX - offset.x,
						y: e.clientY - offset.y
					};
					e.target.setPointerCapture?.(e.pointerId);
				},
				onPointerMove: (e) => {
					if (!drag.current) return;
					setOffset({
						x: e.clientX - drag.current.x,
						y: e.clientY - drag.current.y
					});
				},
				onPointerUp: () => drag.current = null,
				children: [url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: `Figure ${index + 1}`,
					draggable: false,
					className: "absolute top-1/2 left-1/2 h-[calc(100vh-8rem)] w-[96vw] object-contain select-none",
					style: {
						transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale}) rotate(${rotation}deg)`,
						transition: drag.current ? "none" : "transform 120ms ease-out",
						imageRendering: "auto"
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center text-sm text-muted-foreground",
					children: "Image unavailable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card/90 px-3 py-1 text-xs text-muted-foreground shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Move, { className: "size-3" }), " drag to pan · ctrl+scroll to zoom · R to rotate"]
				})]
			}),
			ids.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll-slim flex gap-2 overflow-x-auto border-t p-2",
				children: ids.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIndex(i),
					className: cn("size-16 shrink-0 overflow-hidden rounded border-2 bg-muted", i === index ? "border-primary" : "border-transparent"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
						id,
						alt: `thumb ${i + 1}`,
						className: "size-full object-cover"
					})
				}, id))
			})
		]
	});
}
function ViewerBtn({ children, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		"aria-label": label,
		title: label,
		className: "grid size-8 place-items-center rounded-md border bg-card text-foreground transition-colors hover:bg-accent",
		children
	});
}
//#endregion
export { LazyImage as n, ImageViewer as t };
