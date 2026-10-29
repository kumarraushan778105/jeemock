import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result._attemptId-Dklg8_ww.js
var $$splitComponentImporter = () => import("./result._attemptId-aObh_rBz.mjs");
var Route = createFileRoute("/result/$attemptId")({
	head: () => ({ meta: [
		{ title: "Attempt analysis — JEE CBT Platform" },
		{
			name: "description",
			content: "Detailed JEE mock analysis: score, accuracy, negative marking, subject and chapter breakdown, time per question and full solutions."
		},
		{
			property: "og:title",
			content: "Attempt analysis — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Score, accuracy, timing and solution review for your attempt."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
