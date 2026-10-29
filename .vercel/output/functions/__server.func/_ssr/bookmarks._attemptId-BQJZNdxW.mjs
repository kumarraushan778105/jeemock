import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookmarks._attemptId-BQJZNdxW.js
var $$splitComponentImporter = () => import("./bookmarks._attemptId-D_1ynHOw.mjs");
var Route = createFileRoute("/bookmarks/$attemptId")({
	head: () => ({ meta: [
		{ title: "Bookmarked Questions Review — JEE CBT Platform" },
		{
			name: "description",
			content: "Only the bookmarked questions from this attempt, with sticky palette, subject filters, notes and revision flags."
		},
		{
			property: "og:title",
			content: "Bookmarked Questions Review"
		},
		{
			property: "og:description",
			content: "Review bookmarked questions from one test on a single page."
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
