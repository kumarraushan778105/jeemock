import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { formatXp, getXpState, xpCycleLabel } from "@/lib/xp";

export const Route = createFileRoute("/xp")({
  head: () => ({
    meta: [
      { title: "XP History — JEE CBT Platform" },
      {
        name: "description",
        content: "Track your JEE CBT XP, weekly cycle progress, and every earn/spend transaction.",
      },
    ],
  }),
  component: XpPage,
});

function XpPage() {
  const state = getXpState();
  return (
    <AppShell>
      <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Zap className="size-5 text-primary" /> XP Overview
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Correct answers earn +4 XP. Error Journal entries cost 20 XP.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Stat label="Total XP" value={`${state.balance.toLocaleString()} XP`} tone="good" />
        <Stat label="This week" value={formatXp(state.weeklyEarned)} tone="good" />
        <Stat label="Spent this week" value={formatXp(-state.weeklySpent)} tone="bad" />
      </div>

      <div className="mt-6 rounded-xl border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-base font-semibold">7-Day Cycle</h2>
          <span className="text-xs text-muted-foreground">{xpCycleLabel()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Cycle starts</span>
          <span className="font-medium text-foreground">{new Date(state.cycleStart).toLocaleDateString()}</span>
          <span>→</span>
          <span>{new Date(state.cycleEnd).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">Transaction history</h2>
        <div className="mt-3 space-y-2">
          {state.transactions.length === 0 && (
            <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No XP transactions yet.
            </p>
          )}
          {state.transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={tx.type === "earn" ? "text-success" : "text-destructive"}>
                    {tx.type === "earn" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  </span>
                  <span className="font-semibold">
                    {tx.type === "earn" ? "+" : "-"}
                    {tx.amount} XP
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{tx.reason}</div>
                <div className="text-[11px] text-muted-foreground">
                  {tx.source} · {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
              <span className={tx.type === "earn" ? "text-success" : "text-destructive"}>
                {tx.type === "earn" ? "Earn" : "Spend"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div className={"mt-2 text-xl font-bold " + (tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "")}>{value}</div>
    </div>
  );
}
