import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as Outlet, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdvancedShell-BliK6l8P.js
var import_jsx_runtime = require_jsx_runtime();
var ADV_TABS = [
	{
		to: "/advanced",
		label: "Overview",
		exact: true
	},
	{
		to: "/advanced/practice",
		label: "Custom Practice"
	},
	{
		to: "/advanced/pyq",
		label: "PYQ"
	},
	{
		to: "/advanced/bank",
		label: "Question Bank"
	},
	{
		to: "/advanced/history",
		label: "Previous Tests"
	},
	{
		to: "/advanced/analytics",
		label: "Analytics"
	},
	{
		to: "/advanced/bookmarks",
		label: "Bookmarks"
	},
	{
		to: "/advanced/import",
		label: "Import Test"
	}
];
function AdvancedShell({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-bold uppercase tracking-widest text-primary",
					children: "JEE Advanced"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold tracking-tight",
					children: title
				}),
				subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-3xl text-sm text-muted-foreground",
					children: subtitle
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll-slim mt-4 flex gap-1.5 overflow-x-auto pb-1",
			children: ADV_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: t.to,
				activeOptions: { exact: Boolean(t.exact) },
				activeProps: { className: "border-primary bg-primary text-primary-foreground" },
				className: "shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent",
				children: t.label
			}, t.to))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})
	] });
}
function AdvancedLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AdvancedShell as n, AdvancedLayout as t };
