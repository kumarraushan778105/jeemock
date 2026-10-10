import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Database, Moon, Settings as SettingsIcon, Sun, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { useTheme } from "@/components/ThemeProvider";
import { countImages, deleteAttempt, deleteTest, listAttempts, listTests } from "@/lib/db";
import { getRequireXpForErrorJournal, setRequireXpForErrorJournal } from "@/lib/xp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Appearance, local storage usage and data management for your offline JEE CBT test platform.",
      },
      { property: "og:title", content: "Settings — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Manage theme, stored tests, figures and attempt history.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const qc = useQueryClient();
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const attempts = useQuery({ queryKey: ["attempts"], queryFn: listAttempts });
  const images = useQuery({ queryKey: ["imageCount"], queryFn: countImages });
  const [requireXpForErrorJournal, setRequireXpForErrorJournalState] = useState(() =>
    typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true,
  );

  useEffect(() => {
    setRequireXpForErrorJournalState(
      typeof getRequireXpForErrorJournal === "function" ? getRequireXpForErrorJournal() : true,
    );
  }, []);

  const refresh = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: ["tests"] }),
      qc.invalidateQueries({ queryKey: ["attempts"] }),
      qc.invalidateQueries({ queryKey: ["reports"] }),
      qc.invalidateQueries({ queryKey: ["images"] }),
      qc.invalidateQueries({ queryKey: ["imageCount"] }),
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

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <SettingsIcon className="size-5" /> Settings
      </h1>

      <section className="mt-6 rounded-xl border bg-card p-4">
        <h2 className="text-sm font-bold uppercase tracking-wide">Appearance</h2>
        <button
          onClick={toggle}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border bg-surface px-3 py-2 text-sm font-semibold"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          Switch to {theme === "dark" ? "light" : "dark"} mode
        </button>
      </section>

      <section className="mt-4 rounded-xl border bg-card p-4">
        <h2 className="text-sm font-bold uppercase tracking-wide">Error Journal</h2>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border bg-surface p-3">
          <div>
            <div className="text-sm font-semibold">Require XP to add Error Journal entries</div>
            <div className="text-xs text-muted-foreground">
              {requireXpForErrorJournal ? "Costs 20 XP" : "Free"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const next = !requireXpForErrorJournal;
              setRequireXpForErrorJournal(next);
              setRequireXpForErrorJournalState(next);
            }}
            aria-pressed={requireXpForErrorJournal}
            className={cn(
              "relative inline-flex h-7 w-12 items-center rounded-full border transition-colors",
              requireXpForErrorJournal ? "bg-primary" : "bg-muted",
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 rounded-full bg-white transition-transform",
                requireXpForErrorJournal ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-xl border bg-card p-4">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
          <Database className="size-4" /> Local storage
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <Stat label="Test sets" value={tests.data?.length ?? 0} />
          <Stat
            label="Questions"
            value={(tests.data ?? []).reduce((a, t) => a + t.questionCount, 0)}
          />
          <Stat label="Figures" value={images.data ?? 0} />
          <Stat label="Attempts" value={attempts.data?.length ?? 0} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Everything is stored offline in this browser (IndexedDB). Clearing browser data removes
          it.
        </p>
      </section>

      <section className="mt-4 rounded-xl border border-destructive/40 bg-card p-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-destructive">Danger zone</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Danger onClick={clearAttempts}>Clear attempt history</Danger>
          <Danger onClick={clearAll}>Delete all data</Danger>
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-surface p-3">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Danger({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-destructive/50 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10",
      )}
    >
      <Trash2 className="size-3.5" /> {children}
    </button>
  );
}
