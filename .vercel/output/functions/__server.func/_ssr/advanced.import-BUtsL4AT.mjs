import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AdvancedShell } from "./AdvancedShell-BliK6l8P.mjs";
import { V as listTests } from "./db-CAmn2mwk.mjs";
import { f as paperOf, g as yearOf, i as advancedTests } from "./advanced-D6ylZ9Tw.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advanced.import-BUtsL4AT.js
var import_jsx_runtime = require_jsx_runtime();
function AdvancedImport() {
	const { data: tests } = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const sets = advancedTests(tests ?? []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdvancedShell, {
		title: "Import Advanced Sets",
		subtitle: "Name your files like “JEE Advanced 2022 Paper 1” — the year and paper are detected automatically.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/import",
				className: "inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
				children: "Open importer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "In the importer, choose “Import into: Advanced” so the set joins this library."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-6 text-sm font-bold uppercase tracking-wide",
				children: [
					"Advanced sets (",
					sets.length,
					")"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2",
				children: [sets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[180px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								t.questionCount,
								" questions · ",
								t.imageCount,
								" images · Paper ",
								paperOf(t),
								yearOf(t) ? ` · ${yearOf(t)}` : ""
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: new Date(t.importedAt).toLocaleDateString()
					})]
				}, t.id)), sets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border bg-card p-6 text-sm text-muted-foreground",
					children: "No Advanced sets imported yet."
				})]
			})
		]
	});
}
//#endregion
export { AdvancedImport as component };
