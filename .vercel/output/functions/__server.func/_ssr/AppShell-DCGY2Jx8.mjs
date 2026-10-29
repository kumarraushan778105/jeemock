import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useTheme } from "./ThemeProvider-D25iPLDG.mjs";
import { o as cn, u as getXpState } from "./xp-CqT-O4I5.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as NotebookPen, At as Brain, M as Moon, Mt as Bookmark, Nt as BookOpen, Ot as ChartColumn, Pt as BookMarked, St as CirclePlay, W as LayoutGrid, X as History, Y as House, _ as Settings, at as FilePlusCorner, d as Target, et as FolderInput, f as Sun, it as FileText, n as Zap, nt as FlaskConical, q as Images, r as X, z as Menu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DCGY2Jx8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: House,
		exact: true
	},
	{
		to: "/bank",
		label: "Question Bank",
		icon: LayoutGrid
	},
	{
		to: "/library",
		label: "Chapter Library",
		icon: BookOpen
	},
	{
		to: "/create",
		label: "Create Test",
		icon: FilePlusCorner
	},
	{
		to: "/practice",
		label: "Practice",
		icon: Target
	},
	{
		to: "/live-tests",
		label: "Live Tests",
		icon: CirclePlay
	},
	{
		to: "/advanced",
		label: "JEE Advanced",
		icon: FlaskConical
	},
	{
		to: "/results",
		label: "History",
		icon: History
	},
	{
		to: "/resumes",
		label: "Resume Tests",
		icon: CirclePlay
	},
	{
		to: "/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/mentor",
		label: "AI Mentor",
		icon: Brain
	},
	{
		to: "/mistakes",
		label: "Mistake Analysis",
		icon: Brain
	},
	{
		to: "/bookmarks",
		label: "Bookmarks",
		icon: Bookmark
	},
	{
		to: "/notebook",
		label: "Wrong Notebook",
		icon: NotebookPen
	},
	{
		to: "/errorjournal",
		label: "Error Journal",
		icon: BookMarked
	},
	{
		to: "/notes",
		label: "Notes Library",
		icon: FileText
	},
	{
		to: "/figures",
		label: "Figures",
		icon: Images
	},
	{
		to: "/import",
		label: "Import",
		icon: FolderInput
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavList({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "space-y-0.5 p-2",
		children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: n.to,
			onClick: onNavigate,
			activeOptions: { exact: Boolean(n.exact) },
			activeProps: { className: "bg-primary/12 text-primary font-semibold" },
			className: "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: n.label
			})]
		}, n.to))
	});
}
function AppShell({ children }) {
	const { theme, toggle } = useTheme();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [xpBalance, setXpBalance] = (0, import_react.useState)(() => getXpState().balance);
	(0, import_react.useEffect)(() => {
		const sync = () => setXpBalance(getXpState().balance);
		sync();
		window.addEventListener("cbt-xp-change", sync);
		return () => window.removeEventListener("cbt-xp-change", sync);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b bg-card/85 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-3 py-2.5 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen(true),
						"aria-label": "Open navigation",
						className: "grid size-9 shrink-0 place-items-center rounded-md border bg-card lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-bold tracking-tight",
								children: "JEE CBT Platform"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden truncate text-[11px] text-muted-foreground sm:block",
								children: "Main & Advanced test engine"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/xp",
								className: "hidden items-center gap-1 rounded-lg border bg-card px-2.5 py-1.5 text-xs font-semibold sm:inline-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-primary" }),
									xpBalance.toLocaleString(),
									" XP"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create",
								className: "hidden rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground sm:inline-flex",
								children: "New Test"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggle,
								"aria-label": "Toggle theme",
								className: "grid size-9 shrink-0 place-items-center rounded-md border bg-card transition-colors hover:bg-accent",
								children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-[1600px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "sticky top-[57px] hidden h-[calc(100vh-57px)] w-56 shrink-0 overflow-y-auto border-r bg-card/40 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {})
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-0 z-50 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-black/60",
						onClick: () => setOpen(false)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-y-0 left-0 w-64 overflow-y-auto border-r bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold",
								children: "Menu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen(false),
								"aria-label": "Close navigation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { onNavigate: () => setOpen(false) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: cn("min-w-0 flex-1 px-4 py-6 sm:px-6"),
					children
				})
			]
		})]
	});
}
//#endregion
export { AppShell as t };
