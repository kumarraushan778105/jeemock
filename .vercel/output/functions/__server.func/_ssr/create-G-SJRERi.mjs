import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-G-SJRERi.js
var $$splitComponentImporter = () => import("./create-D3Vj5QVN.mjs");
var Route = createFileRoute("/create")({
	validateSearch: (search) => ({ creationContext: search.creationContext === "live" ? "live" : "normal" }),
	head: () => ({ meta: [
		{ title: "Custom Test Builder — JEE CBT Platform" },
		{
			name: "description",
			content: "Build custom JEE papers from any mix of chapters with auto or manual question distribution, difficulty and type filters."
		},
		{
			property: "og:title",
			content: "Custom Test Builder — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Chapter-mix papers with a smart random engine that avoids repeating questions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
