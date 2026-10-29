import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notebook._attemptId-Do6gQ6Dn.js
var $$splitComponentImporter = () => import("./notebook._attemptId-CtPiupnk.mjs");
var Route = createFileRoute("/notebook/$attemptId")({
	head: () => ({ meta: [
		{ title: "Wrong Questions Review — JEE CBT Platform" },
		{
			name: "description",
			content: "Only the wrong questions from this attempt, with sticky palette, subject filters, reasons and learnings."
		},
		{
			property: "og:title",
			content: "Wrong Questions Review"
		},
		{
			property: "og:description",
			content: "Review your mistakes from one test on a single page."
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
