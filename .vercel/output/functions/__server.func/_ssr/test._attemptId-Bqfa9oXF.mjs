import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./xp-CqT-O4I5.mjs";
import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test._attemptId-Bqfa9oXF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	{
		label: "sin",
		expr: "Math.sin(",
		kind: "fn"
	},
	{
		label: "cos",
		expr: "Math.cos(",
		kind: "fn"
	},
	{
		label: "tan",
		expr: "Math.tan(",
		kind: "fn"
	},
	{
		label: "ln",
		expr: "Math.log(",
		kind: "fn"
	},
	{
		label: "log",
		expr: "Math.log10(",
		kind: "fn"
	},
	{
		label: "√",
		expr: "Math.sqrt(",
		kind: "fn"
	},
	{
		label: "x²",
		expr: "**2",
		kind: "fn"
	},
	{
		label: "xʸ",
		expr: "**",
		kind: "fn"
	},
	{
		label: "π",
		expr: "Math.PI",
		kind: "fn"
	},
	{
		label: "e",
		expr: "Math.E",
		kind: "fn"
	},
	{
		label: "(",
		expr: "(",
		kind: "op"
	},
	{
		label: ")",
		expr: ")",
		kind: "op"
	},
	{
		label: "7",
		kind: "num"
	},
	{
		label: "8",
		kind: "num"
	},
	{
		label: "9",
		kind: "num"
	},
	{
		label: "÷",
		expr: "/",
		kind: "op"
	},
	{
		label: "4",
		kind: "num"
	},
	{
		label: "5",
		kind: "num"
	},
	{
		label: "6",
		kind: "num"
	},
	{
		label: "×",
		expr: "*",
		kind: "op"
	},
	{
		label: "1",
		kind: "num"
	},
	{
		label: "2",
		kind: "num"
	},
	{
		label: "3",
		kind: "num"
	},
	{
		label: "−",
		expr: "-",
		kind: "op"
	},
	{
		label: "0",
		kind: "num"
	},
	{
		label: ".",
		kind: "num"
	},
	{
		label: "E",
		expr: "e",
		kind: "num"
	},
	{
		label: "+",
		expr: "+",
		kind: "op"
	}
];
function Calculator$1({ onClose, initialExpr = "", onExprChange }) {
	const [expr, setExprState] = (0, import_react.useState)(initialExpr);
	const setExpr = (v) => setExprState((cur) => {
		const next = typeof v === "function" ? v(cur) : v;
		onExprChange?.(next);
		return next;
	});
	const [out, setOut] = (0, import_react.useState)("0");
	const evaluate = () => {
		try {
			const value = Function(`"use strict"; return (${expr || "0"})`)();
			if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("bad");
			setOut(String(Number(value.toPrecision(12))));
		} catch {
			setOut("Error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-72 rounded-xl border bg-card p-3 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
					children: "Scientific Calculator"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "close"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 rounded-lg border bg-surface p-2 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: expr,
					onChange: (e) => setExpr(e.target.value),
					onKeyDown: (e) => {
						e.stopPropagation();
						if (e.key === "Enter") evaluate();
					},
					className: "w-full bg-transparent text-right font-mono text-sm outline-none",
					placeholder: "0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-lg font-semibold",
					children: out
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-4 gap-1",
				children: [
					KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setExpr((v) => v + (k.expr ?? k.label)),
						className: cn("rounded-md py-2 font-mono text-sm transition-colors", k.kind === "num" ? "bg-secondary hover:bg-accent" : "bg-muted hover:bg-accent"),
						children: k.label
					}, k.label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setExpr("");
							setOut("0");
						},
						className: "rounded-md bg-destructive/15 py-2 text-sm text-destructive",
						children: "AC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setExpr((v) => v.slice(0, -1)),
						className: "rounded-md bg-muted py-2 text-sm",
						children: "⌫"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: evaluate,
						className: "col-span-2 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground",
						children: "="
					})
				]
			})
		]
	});
}
var $$splitComponentImporter = () => import("./test._attemptId--2py-zoP.mjs");
var Route = createFileRoute("/test/$attemptId")({
	head: () => ({ meta: [
		{ title: "Test in progress — JEE CBT Platform" },
		{
			name: "description",
			content: "NTA-style CBT test window with countdown timer, question palette, figures gallery and scientific calculator."
		},
		{
			property: "og:title",
			content: "Test in progress — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Attempt your JEE mock in an exam-grade interface."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, Calculator$1 as t };
