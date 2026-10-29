import { o as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useTheme } from "./ThemeProvider-D25iPLDG.mjs";
import { l as getRequireXpForErrorJournal, o as cn, x as setRequireXpForErrorJournal } from "./xp-CqT-O4I5.mjs";
import { M as Moon, _ as Settings, f as Sun, l as Trash2, pt as Database } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DCGY2Jx8.mjs";
import { F as listAttempts, V as listTests, s as countImages, u as deleteAttempt, v as deleteTest } from "./db-CAmn2mwk.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DOLlqdhM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { theme, toggle } = useTheme();
	const qc = useQueryClient();
	const tests = useQuery({
		queryKey: ["tests"],
		queryFn: listTests
	});
	const attempts = useQuery({
		queryKey: ["attempts"],
		queryFn: listAttempts
	});
	const images = useQuery({
		queryKey: ["imageCount"],
		queryFn: countImages
	});
	const [requireXpForErrorJournal, setRequireXpForErrorJournalState] = (0, import_react.useState)(() => typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true);
	(0, import_react.useEffect)(() => {
		setRequireXpForErrorJournalState(typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true);
	}, []);
	const refresh = () => Promise.all([
		qc.invalidateQueries({ queryKey: ["tests"] }),
		qc.invalidateQueries({ queryKey: ["attempts"] }),
		qc.invalidateQueries({ queryKey: ["reports"] }),
		qc.invalidateQueries({ queryKey: ["images"] }),
		qc.invalidateQueries({ queryKey: ["imageCount"] })
	]);
	const clearAttempts = async () => {
		if (!confirm("Delete all attempt history? Question banks are kept.")) return;
		for (const a of attempts.data ?? []) await deleteAttempt(a.id);
		await refresh();
		toast.success("Attempt history cleared");
	};
	const clearAll = async () => {
		if (!confirm("Delete every test, figure and attempt stored on this device?")) return;
		for (const a of attempts.data ?? []) await deleteAttempt(a.id);
		for (const t of tests.data ?? []) await deleteTest(t.id);
		await refresh();
		toast.success("All local data deleted");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "flex items-center gap-2 text-2xl font-bold tracking-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" }), " Settings"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold uppercase tracking-wide",
				children: "Appearance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: toggle,
				className: "mt-3 inline-flex items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm font-semibold",
				children: [
					theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }),
					"Switch to ",
					theme === "dark" ? "light" : "dark",
					" mode"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl border bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold uppercase tracking-wide",
				children: "Error Journal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between gap-3 rounded-lg border bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Require XP to add Error Journal entries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: requireXpForErrorJournal ? "Costs 20 XP" : "Free"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						const next = !requireXpForErrorJournal;
						setRequireXpForErrorJournal(next);
						setRequireXpForErrorJournalState(next);
					},
					"aria-pressed": requireXpForErrorJournal,
					className: cn("relative inline-flex h-7 w-12 items-center rounded-full border transition-colors", requireXpForErrorJournal ? "bg-primary" : "bg-muted"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("inline-block h-5 w-5 rounded-full bg-white transition-transform", requireXpForErrorJournal ? "translate-x-6" : "translate-x-1") })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-bold uppercase tracking-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-4" }), " Local storage"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Test sets",
							value: tests.data?.length ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Questions",
							value: (tests.data ?? []).reduce((a, t) => a + t.questionCount, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Figures",
							value: images.data ?? 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Attempts",
							value: attempts.data?.length ?? 0
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "Everything is stored offline in this browser (IndexedDB). Clearing browser data removes it."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-xl border border-destructive/40 bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold uppercase tracking-wide text-destructive",
				children: "Danger zone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Danger, {
					onClick: clearAttempts,
					children: "Clear attempt history"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Danger, {
					onClick: clearAll,
					children: "Delete all data"
				})]
			})]
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted-foreground",
			children: label
		})]
	});
}
function Danger({ children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("inline-flex items-center gap-2 rounded-lg border border-destructive/50 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
			" ",
			children
		]
	});
}
//#endregion
export { SettingsPage as component };
