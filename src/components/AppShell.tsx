import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Brain,
  Bookmark,
  BookMarked,
  BookOpen,
  FileText,
  FilePlus2,
  FlaskConical,
  FolderInput,
  History,
  Home,
  Images,
  LayoutGrid,
  Menu,
  Moon,
  NotebookPen,
  PlayCircle,
  Settings,
  Sun,
  Target,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { getXpState } from "@/lib/xp";

const NAV = [
  { to: "/", label: "Dashboard", icon: Home, exact: true },
  { to: "/bank", label: "Question Bank", icon: LayoutGrid },
  { to: "/library", label: "Chapter Library", icon: BookOpen },
  { to: "/create", label: "Create Test", icon: FilePlus2 },
  { to: "/practice", label: "Practice", icon: Target },
  { to: "/live-tests", label: "Live Tests", icon: PlayCircle },
  { to: "/advanced", label: "JEE Advanced", icon: FlaskConical },
  { to: "/results", label: "History", icon: History },
  { to: "/resumes", label: "Resume Tests", icon: PlayCircle },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/mentor", label: "AI Mentor", icon: Brain },
  { to: "/mistakes", label: "Mistake Analysis", icon: Brain },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/notebook", label: "Wrong Notebook", icon: NotebookPen },
  { to: "/errorjournal", label: "Error Journal", icon: BookMarked },
  { to: "/notes", label: "Notes Library", icon: FileText },
  { to: "/figures", label: "Figures", icon: Images },

  { to: "/import", label: "Import", icon: FolderInput },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-0.5 p-2">
      {NAV.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          onClick={onNavigate}
          activeOptions={{ exact: Boolean((n as { exact?: boolean }).exact) }}
          activeProps={{ className: "bg-primary/12 text-primary font-semibold" }}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <n.icon className="size-4 shrink-0" />
          <span className="truncate">{n.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [xpBalance, setXpBalance] = useState(0);

  useEffect(() => {
    const sync = () => setXpBalance(getXpState().balance);
    sync();
    window.addEventListener("cbt-xp-change", sync);
    return () => window.removeEventListener("cbt-xp-change", sync);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/85 backdrop-blur">
        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="grid size-9 shrink-0 place-items-center rounded-md border bg-card lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold tracking-tight">
                JEE CBT Platform
              </span>
              <span className="hidden truncate text-[11px] text-muted-foreground sm:block">
                Main &amp; Advanced test engine
              </span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <Link
              to="/xp"
              className="hidden items-center gap-1 rounded-lg border bg-card px-2.5 py-1.5 text-xs font-semibold sm:inline-flex"
            >
              <Zap className="size-3.5 text-primary" />
              {xpBalance.toLocaleString()} XP
            </Link>
            <Link
              to="/create"
              className="hidden rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground sm:inline-flex"
            >
              New Test
            </Link>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid size-9 shrink-0 place-items-center rounded-md border bg-card transition-colors hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-56 shrink-0 overflow-y-auto border-r bg-card/40 lg:block">
          <NavList />
        </aside>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-64 overflow-y-auto border-r bg-card">
              <div className="flex items-center justify-between border-b px-3 py-3">
                <span className="text-sm font-bold">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close navigation">
                  <X className="size-4" />
                </button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className={cn("min-w-0 flex-1 px-4 py-6 sm:px-6")}>{children}</main>
      </div>
    </div>
  );
}
