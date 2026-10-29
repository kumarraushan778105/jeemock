import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-tests-B8DZ2s3g.js
var $$splitComponentImporter = () => import("./live-tests-TTDt7ozH.mjs");
var Route = createFileRoute("/live-tests")({
	validateSearch: (search) => ({ draft: typeof search.draft === "string" ? search.draft : void 0 }),
	head: () => ({ meta: [{ title: "Live Tests — JEE CBT Platform" }, {
		name: "description",
		content: "Upcoming, live, completed and missed scheduled JEE tests."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
