import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as testGemini } from "./gemini-CZw1GLr8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini-test-BUKXUZQL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GeminiTest() {
	const [result, setResult] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleTest() {
		setLoading(true);
		setResult("");
		try {
			setResult(await testGemini() ?? "No response");
		} catch (error) {
			setResult(error instanceof Error ? error.message : "Gemini test failed");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: 40 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Gemini API Test" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleTest,
				disabled: loading,
				children: loading ? "Testing..." : "Test Gemini"
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				style: { marginTop: 20 },
				children: result
			})
		]
	});
}
//#endregion
export { GeminiTest as component };
