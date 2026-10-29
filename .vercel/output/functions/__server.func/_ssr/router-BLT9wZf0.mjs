import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as ThemeProvider } from "./ThemeProvider-D25iPLDG.mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as Route$1$1, t as Route$27 } from "./bank-Eou_w4RV.mjs";
import { t as Route$28 } from "./bookmarks._attemptId-BQJZNdxW.mjs";
import { t as Route$29 } from "./create-G-SJRERi.mjs";
import { t as Route$30 } from "./live-tests-B8DZ2s3g.mjs";
import { t as Route$31 } from "./notebook._attemptId-Do6gQ6Dn.mjs";
import { t as Route$32 } from "./result._attemptId-Dklg8_ww.mjs";
import { t as Route$33 } from "./review._attemptId-B-aMgfhl.mjs";
import { n as Route$34 } from "./test._attemptId-Bqfa9oXF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BLT9wZf0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BQbjz3bZ.css";
var katex_min_default = "/assets/katex.min-ClQbWekD.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Your saved tests and answers are safe on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$26 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "JEE CBT Platform — Main & Advanced Mock Test Engine" },
			{
				name: "description",
				content: "Offline-first computer based test platform for JEE Main and JEE Advanced with imports, diagrams and LaTeX rendering."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: katex_min_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$26.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$24 = () => import("./advanced-Dt86Aswi.mjs");
var Route$25 = createFileRoute("/advanced")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Module — CBT Test Platform" },
		{
			name: "description",
			content: "Full JEE Advanced test module: Paper 1, Paper 2, full papers, PYQ practice and analytics."
		},
		{
			property: "og:title",
			content: "JEE Advanced Module — CBT Test Platform"
		},
		{
			property: "og:description",
			content: "Take Paper 1 + Paper 2 full tests, practice PYQs and track Advanced analytics."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./analytics-BqKo7wlm.mjs");
var Route$24 = createFileRoute("/analytics")({
	head: () => ({ meta: [
		{ title: "Performance Analytics — JEE CBT Platform" },
		{
			name: "description",
			content: "Subject accuracy, time distribution, weak and strong chapters, difficulty and question-type breakdowns across every attempt."
		},
		{
			property: "og:title",
			content: "Performance Analytics — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Deep analysis of your JEE mock performance across subjects, chapters and time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./figures-B1n6qP10.mjs");
var Route$23 = createFileRoute("/figures")({
	head: () => ({ meta: [
		{ title: "Figure Library — JEE CBT Platform" },
		{
			name: "description",
			content: "Browse every imported diagram, graph and figure, see which question it belongs to, and manually link unmatched images."
		},
		{
			property: "og:title",
			content: "Figure Library — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every imported figure with its question, subject, chapter and filename."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./gemini-test-BUKXUZQL.mjs");
var Route$22 = createFileRoute("/gemini-test")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./import-DfgogCIn.mjs");
var Route$21 = createFileRoute("/import")({
	head: () => ({ meta: [
		{ title: "Import Tests — JEE CBT Platform" },
		{
			name: "description",
			content: "Import JEE question sets from ZIP archives or JSON files with automatic image detection, nested folder handling and validation."
		},
		{
			property: "og:title",
			content: "Import Tests — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "ZIP and JSON importer with automatic diagram linking and import validation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./library-CBcGSgqT.mjs");
var Route$20 = createFileRoute("/library")({
	head: () => ({ meta: [
		{ title: "Chapter Library — JEE CBT Platform" },
		{
			name: "description",
			content: "Every chapter in your question bank with question counts, difficulty spread and one-click chapter practice."
		},
		{
			property: "og:title",
			content: "Chapter Library — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Browse chapters across all imported JEE sets and launch chapter-wise practice."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./mentor-BAV6dfcz.mjs");
var Route$19 = createFileRoute("/mentor")({
	head: () => ({ meta: [{ title: "AI Mentor — JEE CBT Platform" }, {
		name: "description",
		content: "Personalized JEE mentor that analyses real attempts, finds weak topics, and recommends focused revision and practice."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./mistakes-sxGwcbC6.mjs");
var Route$18 = createFileRoute("/mistakes")({
	head: () => ({ meta: [
		{ title: "Smart Mistake Analysis — JEE CBT Platform" },
		{
			name: "description",
			content: "Automatic mistake analysis after every test: accuracy by subject, chapter, topic, difficulty and question type, time analysis, trends and what to revise next."
		},
		{
			property: "og:title",
			content: "Smart Mistake Analysis — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Interactive charts on your real attempts plus dynamic recommendations for what to practise next."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./notes-DiOqwjLk.mjs");
var Route$17 = createFileRoute("/notes")({
	head: () => ({ meta: [
		{ title: "Notes Library — Revision PDFs & Images" },
		{
			name: "description",
			content: "Upload, organise and read revision notes as PDFs or images, sorted by subject and chapter, entirely offline."
		},
		{
			property: "og:title",
			content: "Notes Library — Revision PDFs & Images"
		},
		{
			property: "og:description",
			content: "Subject and chapter wise revision notes with a built-in PDF and image viewer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./practice-_g5RSreP.mjs");
var Route$16 = createFileRoute("/practice")({
	head: () => ({ meta: [
		{ title: "Practice Mode — JEE CBT Platform" },
		{
			name: "description",
			content: "Quick chapter-wise and subject-wise practice sessions with difficulty filters and an instant timed runner."
		},
		{
			property: "og:title",
			content: "Practice Mode — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Spin up a focused practice set by subject, chapter and difficulty in one click."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./results-CIxK6tzd.mjs");
var Route$15 = createFileRoute("/results")({
	head: () => ({ meta: [
		{ title: "Test History — JEE CBT Platform" },
		{
			name: "description",
			content: "Permanent history of every submitted JEE mock: marks, percentage, accuracy, time taken, correct, wrong, unattempted and negative marks."
		},
		{
			property: "og:title",
			content: "Test History — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every completed attempt with full score, accuracy and timing breakdown."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./resumes-CRb80uuv.mjs");
var Route$14 = createFileRoute("/resumes")({
	head: () => ({ meta: [{ title: "Resume Tests — Continue unfinished mock attempts" }, {
		name: "description",
		content: "Manage resumed mock tests in one place and continue any unfinished attempt instantly."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./settings-DOLlqdhM.mjs");
var Route$13 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — JEE CBT Platform" },
		{
			name: "description",
			content: "Appearance, local storage usage and data management for your offline JEE CBT test platform."
		},
		{
			property: "og:title",
			content: "Settings — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Manage theme, stored tests, figures and attempt history."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var BASE_URL = "";
var Route$12 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/bank",
				changefreq: "weekly",
				priority: "0.8"
			},
			{
				path: "/import",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/create",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/results",
				changefreq: "weekly",
				priority: "0.6"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$11 = () => import("./xp-Cnb6rEII.mjs");
var Route$11 = createFileRoute("/xp")({
	head: () => ({ meta: [{ title: "XP History — JEE CBT Platform" }, {
		name: "description",
		content: "Track your JEE CBT XP, weekly cycle progress, and every earn/spend transaction."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./advanced.index-DtZfr59M.mjs");
var Route$10 = createFileRoute("/advanced/")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Overview — Paper 1 & Paper 2 Tests" },
		{
			name: "description",
			content: "Start a JEE Advanced full test (Paper 1 + Paper 2), single-paper test, resume drafts or re-attempt past papers."
		},
		{
			property: "og:title",
			content: "JEE Advanced Overview — Paper 1 & Paper 2 Tests"
		},
		{
			property: "og:description",
			content: "Full test, Paper 1, Paper 2, resume management and re-attempts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./advanced.analytics-DqrO_WkO.mjs");
var Route$9 = createFileRoute("/advanced/analytics")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Analytics — Subject & Chapter Performance" },
		{
			name: "description",
			content: "Separate JEE Advanced analytics: subject, chapter, difficulty and paper-wise accuracy plus score trend."
		},
		{
			property: "og:title",
			content: "JEE Advanced Analytics"
		},
		{
			property: "og:description",
			content: "Subject, chapter, difficulty and paper-wise Advanced performance breakdowns."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./advanced.bank-CtodX8at.mjs");
var Route$8 = createFileRoute("/advanced/bank")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Question Bank — Chapter & Topic Browser" },
		{
			name: "description",
			content: "Search and browse the full JEE Advanced question bank by subject, chapter, topic, paper and year — built to stay fast with 100k+ questions."
		},
		{
			property: "og:title",
			content: "JEE Advanced Question Bank"
		},
		{
			property: "og:description",
			content: "Fast search across the entire Advanced bank with chapter and topic filters."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./advanced.bookmarks-C3B_wsZ9.mjs");
var Route$7 = createFileRoute("/advanced/bookmarks")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Bookmarks — Tagged Questions & Solutions" },
		{
			name: "description",
			content: "All bookmarked JEE Advanced questions with tags like Revision, Doubt, Important and Formula, plus full solutions."
		},
		{
			property: "og:title",
			content: "JEE Advanced Bookmarks"
		},
		{
			property: "og:description",
			content: "Tagged Advanced bookmarks with solutions and one-click revision tests."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./advanced.history-DRbWL1Bk.mjs");
var Route$6 = createFileRoute("/advanced/history")({
	head: () => ({ meta: [
		{ title: "JEE Advanced Test History & Re-attempts" },
		{
			name: "description",
			content: "Every JEE Advanced test you have taken with score, accuracy, review and one-click re-attempt."
		},
		{
			property: "og:title",
			content: "JEE Advanced Test History"
		},
		{
			property: "og:description",
			content: "Scores, accuracy and re-attempts for all your Advanced papers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./advanced.import-BUtsL4AT.mjs");
var Route$5 = createFileRoute("/advanced/import")({
	head: () => ({ meta: [
		{ title: "Import JEE Advanced Papers — JSON & ZIP Sets" },
		{
			name: "description",
			content: "Import JEE Advanced question sets with images, answer keys and year/paper tags detected automatically."
		},
		{
			property: "og:title",
			content: "Import JEE Advanced Papers"
		},
		{
			property: "og:description",
			content: "Add Advanced sets with automatic Paper 1 / Paper 2 and year detection."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./advanced.practice-BLkXElZG.mjs");
var Route$4 = createFileRoute("/advanced/practice")({
	head: () => ({ meta: [
		{ title: "Custom JEE Advanced Practice Test Generator" },
		{
			name: "description",
			content: "Build a custom JEE Advanced test by subject, chapter, topic, difficulty, question type, paper and year."
		},
		{
			property: "og:title",
			content: "Custom JEE Advanced Practice Test Generator"
		},
		{
			property: "og:description",
			content: "Filter by chapter, difficulty, type and year, then generate a timed test."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./advanced.pyq-DLulTwYK.mjs");
var Route$3 = createFileRoute("/advanced/pyq")({
	head: () => ({ meta: [
		{ title: "JEE Advanced PYQ — Year-wise Previous Year Papers" },
		{
			name: "description",
			content: "Practise JEE Advanced previous year questions year-wise and paper-wise, or attempt a full past paper in exam mode."
		},
		{
			property: "og:title",
			content: "JEE Advanced PYQ — Year-wise Previous Year Papers"
		},
		{
			property: "og:description",
			content: "Year-wise and paper-wise Advanced PYQ practice with full-paper exam mode."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./bookmarks.index-CGBOkUp-.mjs");
var Route$2 = createFileRoute("/bookmarks/")({
	head: () => ({ meta: [
		{ title: "Bookmarks by Test — JEE CBT Platform" },
		{
			name: "description",
			content: "Bookmarked questions grouped by test. Open any test to review only its bookmarked questions with notes."
		},
		{
			property: "og:title",
			content: "Bookmarks by Test — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every test with its bookmarked-question count."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./errorjournal.index-DCHv1gtw.mjs");
var Route$1 = createFileRoute("/errorjournal/")({
	head: () => ({ meta: [
		{ title: "Error Journal — JEE CBT Platform" },
		{
			name: "description",
			content: "Your personal Error Journal for tracking learning gaps, mistakes, and reflections."
		},
		{
			property: "og:title",
			content: "Error Journal"
		},
		{
			property: "og:description",
			content: "Track your errors and learning progress."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./notebook.index-B3XIfukH.mjs");
var Route = createFileRoute("/notebook/")({
	head: () => ({ meta: [
		{ title: "Wrong Notebook — JEE CBT Platform" },
		{
			name: "description",
			content: "Your mistakes grouped by test. Open any test to review only its wrong questions with reasons and learnings."
		},
		{
			property: "og:title",
			content: "Wrong Notebook — JEE CBT Platform"
		},
		{
			property: "og:description",
			content: "Every test you attempted with its wrong-question count."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$1$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AdvancedRoute = Route$25.update({
	id: "/advanced",
	path: "/advanced",
	getParentRoute: () => Route$26
});
var AnalyticsRoute = Route$24.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$26
});
var BankRoute = Route$27.update({
	id: "/bank",
	path: "/bank",
	getParentRoute: () => Route$26
});
var CreateRoute = Route$29.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => Route$26
});
var FiguresRoute = Route$23.update({
	id: "/figures",
	path: "/figures",
	getParentRoute: () => Route$26
});
var GeminiTestRoute = Route$22.update({
	id: "/gemini-test",
	path: "/gemini-test",
	getParentRoute: () => Route$26
});
var ImportRoute = Route$21.update({
	id: "/import",
	path: "/import",
	getParentRoute: () => Route$26
});
var LibraryRoute = Route$20.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$26
});
var LiveTestsRoute = Route$30.update({
	id: "/live-tests",
	path: "/live-tests",
	getParentRoute: () => Route$26
});
var MentorRoute = Route$19.update({
	id: "/mentor",
	path: "/mentor",
	getParentRoute: () => Route$26
});
var MistakesRoute = Route$18.update({
	id: "/mistakes",
	path: "/mistakes",
	getParentRoute: () => Route$26
});
var NotesRoute = Route$17.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => Route$26
});
var PracticeRoute = Route$16.update({
	id: "/practice",
	path: "/practice",
	getParentRoute: () => Route$26
});
var ResultsRoute = Route$15.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => Route$26
});
var ResumesRoute = Route$14.update({
	id: "/resumes",
	path: "/resumes",
	getParentRoute: () => Route$26
});
var SettingsRoute = Route$13.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$26
});
var SitemapDotxmlRoute = Route$12.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$26
});
var XpRoute = Route$11.update({
	id: "/xp",
	path: "/xp",
	getParentRoute: () => Route$26
});
var AdvancedIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdvancedRoute
});
var AdvancedAnalyticsRoute = Route$9.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AdvancedRoute
});
var AdvancedBankRoute = Route$8.update({
	id: "/bank",
	path: "/bank",
	getParentRoute: () => AdvancedRoute
});
var AdvancedBookmarksRoute = Route$7.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => AdvancedRoute
});
var AdvancedHistoryRoute = Route$6.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => AdvancedRoute
});
var AdvancedImportRoute = Route$5.update({
	id: "/import",
	path: "/import",
	getParentRoute: () => AdvancedRoute
});
var AdvancedPracticeRoute = Route$4.update({
	id: "/practice",
	path: "/practice",
	getParentRoute: () => AdvancedRoute
});
var AdvancedPyqRoute = Route$3.update({
	id: "/pyq",
	path: "/pyq",
	getParentRoute: () => AdvancedRoute
});
var BookmarksIndexRoute = Route$2.update({
	id: "/bookmarks/",
	path: "/bookmarks/",
	getParentRoute: () => Route$26
});
var BookmarksAttemptIdRoute = Route$28.update({
	id: "/bookmarks/$attemptId",
	path: "/bookmarks/$attemptId",
	getParentRoute: () => Route$26
});
var ErrorjournalIndexRoute = Route$1.update({
	id: "/errorjournal/",
	path: "/errorjournal/",
	getParentRoute: () => Route$26
});
var NotebookIndexRoute = Route.update({
	id: "/notebook/",
	path: "/notebook/",
	getParentRoute: () => Route$26
});
var NotebookAttemptIdRoute = Route$31.update({
	id: "/notebook/$attemptId",
	path: "/notebook/$attemptId",
	getParentRoute: () => Route$26
});
var ResultAttemptIdRoute = Route$32.update({
	id: "/result/$attemptId",
	path: "/result/$attemptId",
	getParentRoute: () => Route$26
});
var ReviewAttemptIdRoute = Route$33.update({
	id: "/review/$attemptId",
	path: "/review/$attemptId",
	getParentRoute: () => Route$26
});
var TestAttemptIdRoute = Route$34.update({
	id: "/test/$attemptId",
	path: "/test/$attemptId",
	getParentRoute: () => Route$26
});
var AdvancedRouteChildren = {
	AdvancedAnalyticsRoute,
	AdvancedBankRoute,
	AdvancedBookmarksRoute,
	AdvancedHistoryRoute,
	AdvancedImportRoute,
	AdvancedPracticeRoute,
	AdvancedPyqRoute,
	AdvancedIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdvancedRoute: AdvancedRoute._addFileChildren(AdvancedRouteChildren),
	AnalyticsRoute,
	BankRoute,
	CreateRoute,
	FiguresRoute,
	GeminiTestRoute,
	ImportRoute,
	LibraryRoute,
	LiveTestsRoute,
	MentorRoute,
	MistakesRoute,
	NotesRoute,
	PracticeRoute,
	ResultsRoute,
	ResumesRoute,
	SettingsRoute,
	SitemapDotxmlRoute,
	XpRoute,
	BookmarksAttemptIdRoute,
	NotebookAttemptIdRoute,
	ResultAttemptIdRoute,
	ReviewAttemptIdRoute,
	TestAttemptIdRoute,
	BookmarksIndexRoute,
	ErrorjournalIndexRoute,
	NotebookIndexRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: { queries: {
			staleTime: 3e4,
			gcTime: 5 * 6e4,
			refetchOnWindowFocus: false,
			retry: 0
		} } }) },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadDelay: 40,
		defaultPreloadStaleTime: 3e4
	});
};
//#endregion
export { getRouter };
