import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { N as MonitorCheck, g as ShieldCheck, p as Sparkles, r as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-mode-CmP8nz0c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StartModeDialog({ open, onOpenChange, onStart }) {
	const [mode, setMode] = (0, import_react.useState)("normal");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setMode("normal");
			setBusy(false);
		}
	}, [open]);
	if (!open) return null;
	const handleStart = async () => {
		setBusy(true);
		try {
			await onStart(mode);
			onOpenChange(false);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-center justify-center bg-background/75 p-4 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl overflow-hidden rounded-[24px] border border-white/20 bg-card/80 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-white/10 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-6 sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Exam Mode"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-semibold tracking-tight",
								children: "Start Test"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Choose your exam mode before the test begins."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "rounded-full border border-white/20 bg-background/50 p-2 text-muted-foreground transition-colors hover:bg-background",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("normal"),
							className: cn("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all", mode === "normal" ? "border-primary/40 bg-primary/10 shadow-sm" : "border-border bg-background/40 hover:border-primary/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 rounded-2xl bg-background/70 p-2 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorCheck, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Normal Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Regular exam experience. The test always starts in fullscreen."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("strict"),
							className: cn("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all", mode === "strict" ? "border-amber-500/40 bg-amber-500/10 shadow-sm" : "border-border bg-background/40 hover:border-amber-500/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 rounded-2xl bg-background/70 p-2 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "Strict Mode (Recommended)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "The test starts in Fullscreen. Every tab switch, window switch or minimise counts as one violation — after 3 violations your test is submitted automatically."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode("nta"),
							className: cn("flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all", mode === "nta" ? "border-blue-500/40 bg-blue-500/10 shadow-sm" : "border-border bg-background/40 hover:border-blue-500/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 rounded-2xl bg-background/70 p-2 text-blue-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorCheck, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: "NTA-Style CBT Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Experience a JEE Main-style computer-based examination interface in fullscreen."
							})] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse gap-2 border-t border-white/10 bg-background/40 p-4 sm:flex-row sm:justify-end sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onOpenChange(false),
						className: "rounded-xl border bg-background/70 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleStart,
						disabled: busy,
						className: "rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60",
						children: busy ? "Preparing…" : "Start Test"
					})]
				})
			]
		})
	});
}
function resolveStartMode(_mode, env) {
	if (!env.fullscreenSupported) return {
		ok: false,
		error: "Fullscreen is not supported in this browser."
	};
	return { ok: true };
}
async function waitForFullscreenActivation() {
	if (typeof document === "undefined") return true;
	if (document.fullscreenElement) return true;
	return await new Promise((resolve) => {
		const cleanup = () => {
			document.removeEventListener("fullscreenchange", onFullscreenChange);
			window.clearTimeout(timeoutId);
		};
		const onFullscreenChange = () => {
			if (document.fullscreenElement) {
				cleanup();
				resolve(true);
			}
		};
		document.addEventListener("fullscreenchange", onFullscreenChange);
		const timeoutId = window.setTimeout(() => {
			cleanup();
			resolve(false);
		}, 1500);
	});
}
async function prepareStartMode(mode, env) {
	const decision = resolveStartMode(mode, {
		fullscreenSupported: env.fullscreenSupported,
		isFullscreen: env.isFullscreen
	});
	if (!decision.ok) return decision;
	if (!env.fullscreenSupported) return {
		ok: false,
		error: "Fullscreen is not supported in this browser."
	};
	if (env.isFullscreen) return { ok: true };
	if (!await env.requestFullscreen()) return {
		ok: false,
		error: "Fullscreen permission was denied. Please allow fullscreen to start the test."
	};
	if (!await waitForFullscreenActivation()) return {
		ok: false,
		error: "Fullscreen could not be activated. Please allow fullscreen to start the test."
	};
	return { ok: true };
}
//#endregion
export { prepareStartMode as n, StartModeDialog as t };
