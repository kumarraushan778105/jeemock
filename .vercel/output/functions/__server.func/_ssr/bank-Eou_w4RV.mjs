import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bank-Eou_w4RV.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter$1 = () => import("./routes-BWtgfQn7.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "JEE CBT Platform — Take JEE Main & Advanced Mock Tests" },
		{
			name: "description",
			content: "A professional NTA-style CBT engine: import question banks, attempt full-length JEE mocks with timer, palette and calculator, and review detailed analysis."
		},
		{
			property: "og:title",
			content: "JEE CBT Platform — Mock Test Engine"
		},
		{
			property: "og:description",
			content: "Import, attempt and review JEE Main & Advanced mock tests entirely on your device."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
function StatusDot({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title: status,
		className: `mt-1.5 inline-block size-2 shrink-0 rounded-full ${{
			valid: "bg-success",
			warning: "bg-warning",
			invalid: "bg-destructive"
		}[status]}`
	});
}
var $$splitComponentImporter = () => import("./bank-Bintvb3N.mjs");
var Route = createFileRoute("/bank")({
	validateSearch: (search) => ({
		edit: typeof search.edit === "string" ? search.edit : void 0,
		q: typeof search.q === "string" ? search.q : void 0
	}),
	head: () => ({ meta: [
		{ title: "Question Bank — JEE CBT Platform" },
		{
			name: "description",
			content: "Manage imported JEE test sets: open, rename, duplicate, validate, export, edit answer keys and map diagrams to questions."
		},
		{
			property: "og:title",
			content: "Question Bank — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Search, filter and maintain every imported JEE question set on your device."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route$1 as n, StatusDot as r, Route as t };
