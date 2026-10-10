import { Link, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const ADV_TABS = [
  { to: "/advanced", label: "Overview", exact: true },
  { to: "/advanced/practice", label: "Custom Practice" },
  { to: "/advanced/pyq", label: "PYQ" },
  { to: "/advanced/bank", label: "Question Bank" },
  { to: "/advanced/history", label: "Previous Tests" },
  { to: "/advanced/analytics", label: "Analytics" },
  { to: "/advanced/bookmarks", label: "Bookmarks" },
  { to: "/advanced/import", label: "Import Test" },
] as const;

export function AdvancedShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent p-5">
        <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
          JEE Advanced
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="scroll-slim mt-4 flex gap-1.5 overflow-x-auto pb-1">
        {ADV_TABS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: Boolean((t as { exact?: boolean }).exact) }}
            activeProps={{ className: "border-primary bg-primary text-primary-foreground" }}
            className="shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-accent"
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-5">{children}</div>
    </AppShell>
  );
}

export function AdvancedLayout() {
  return <Outlet />;
}
