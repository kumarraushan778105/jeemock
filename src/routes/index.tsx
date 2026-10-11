import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Clock,
  FilePlus2,
  FolderInput,
  LayoutGrid,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { listAttempts, listTests } from "@/lib/db";
import { dashboardStats } from "@/lib/stats";
import { seedSampleTest } from "@/lib/sample";
import { startAttempt } from "@/lib/attempt";
import { formatClock } from "@/lib/scoring";
import { isCompleted } from "@/lib/status";
import { prepareStartMode } from "@/lib/start-mode";
import { getXpState } from "@/lib/xp";
import { formatLiveDuration, formatLiveTestDate, formatLiveWindowRange, listUpcomingLiveTests, type ScheduledLiveTest } from "@/lib/live-tests";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JEE CBT Platform — Take JEE Main & Advanced Mock Tests" },
      {
        name: "description",
        content:
          "A professional NTA-style CBT engine: import question banks, attempt full-length JEE mocks with timer, palette and calculator, and review detailed analysis.",
      },
      { property: "og:title", content: "JEE CBT Platform — Mock Test Engine" },
      {
        property: "og:description",
        content:
          "Import, attempt and review JEE Main & Advanced mock tests entirely on your device.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const qc = useQueryClient();
  const router = useRouter();
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const attempts = useQuery({ queryKey: ["attempts"], queryFn: listAttempts });
  const stats = useQuery({ queryKey: ["dashboardStats"], queryFn: dashboardStats });
  const xp = getXpState();

  const completed = (attempts.data ?? []).filter(isCompleted);
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<
    ((selectedMode: StartMode) => Promise<void>) | null
  >(null);
  const [liveNow, setLiveNow] = useState<Date>(new Date());
  const liveTests = listUpcomingLiveTests();

  useEffect(() => {
    const interval = window.setInterval(() => setLiveNow(new Date()), 15000);
    return () => window.clearInterval(interval);
  }, []);

  const handleScheduledLiveTestClick = async (test: ScheduledLiveTest) => {
    const isLive = test.status === "LIVE" || (liveNow.getTime() >= test.liveStart && liveNow.getTime() <= test.liveEnd);
    if (!isLive) {
      await router.navigate({ to: "/live-tests" });
      return;
    }

    const attempt = await startAttempt(
      {
        id: test.id,
        name: test.testName,
        durationMin: test.durationMin,
        questionCount: test.questionCount,
        questions: test.fixedQuestions,
        subjects: [...new Set(test.fixedQuestions.map((q) => q.subject))],
        chapters: [...new Set(test.fixedQuestions.map((q) => q.chapter))],
        importedAt: Date.now(),
        updatedAt: Date.now(),
        valid: true,
        source: "custom",
        imageCount: 0,
        missingImages: 0,
        status: "valid",
        issues: [],
      } as any,
      {
        questions: test.fixedQuestions,
        durationMin: test.durationMin,
        name: test.testName,
        attemptType: "live",
        scheduledTestId: test.id,
        liveStart: test.liveStart,
        liveEnd: test.liveEnd,
        testDurationMin: test.durationMin,
      },
    );

    qc.invalidateQueries({ queryKey: ["attempts"] });
    router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
  };

  const launch = async (testId: string) => {
    const test = (tests.data ?? []).find((t) => t.id === testId);
    if (!test) return;
    if (test.status === "invalid") {
      toast.error("This test failed validation. Fix it in the Question Bank first.");
      return;
    }
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const attempt = await startAttempt(test, {
        mode: selectedMode,
        strictMode: selectedMode === "strict",
      });
      qc.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
    });
    setModePickerOpen(true);
  };

  const handleModeSelect = async (selectedMode: StartMode) => {
    const decision = await prepareStartMode(selectedMode, {
      fullscreenSupported: !!document.fullscreenEnabled,
      isFullscreen: !!document.fullscreenElement,
      requestFullscreen: async () => {
        try {
          await document.documentElement.requestFullscreen();
          return true;
        } catch {
          return false;
        }
      },
    });
    if (!decision.ok) {
      toast.error(decision.error);
      return;
    }
    if (pendingLaunch) {
      const currentLaunch = pendingLaunch;
      setPendingLaunch(null);
      await currentLaunch(selectedMode);
    }
  };

  return (
    <AppShell>
      <section className="exam-grid mb-8 overflow-hidden rounded-2xl border bg-card">
        <div className="bg-gradient-to-br from-primary/12 via-transparent to-transparent p-8">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Exam-grade CBT practice for JEE Main &amp; Advanced
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Import your own question banks, attempt full-length papers in an NTA-style interface
            with timer, palette, figures and a scientific calculator. Everything is stored on this
            device, autosaved every few seconds, and works offline.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/import"
              className="hero-action-glow inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <FolderInput className="size-4" /> Import Test
            </Link>
            <Link
              to="/create"
              className="hero-action-glow inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent"
            >
              <FilePlus2 className="size-4" /> Create Custom Test
            </Link>
            <button
              onClick={async () => {
                await seedSampleTest();
                qc.invalidateQueries({ queryKey: ["tests"] });
                toast.success("Demo test added to your Question Bank");
              }}
              className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent"
            >
              <Sparkles className="size-4" /> Load demo test
            </button>
          </div>
        </div>
      </section>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Stat label="Total tests given" value={String(stats.data?.testsGiven ?? 0)} />
        <Stat label="Avg accuracy" value={`${(stats.data?.accuracy ?? 0).toFixed(1)}%`} />
        <Stat
          label="Avg time / question"
          value={`${Math.round(stats.data?.avgTimePerQuestion ?? 0)}s`}
        />
        <Stat label="Question banks" value={String(stats.data?.bankCount ?? 0)} />
        <Stat label="Total images" value={String(stats.data?.totalImages ?? 0)} />
        <Stat label="Day streak" value={`${stats.data?.streak ?? 0} days`} />
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Tile
          to="/bank"
          icon={<LayoutGrid className="size-5" />}
          label="Question Bank"
          value={`${tests.data?.length ?? 0} tests · ${stats.data?.totalQuestions ?? 0} questions`}
        />
        <Tile
          to="/xp"
          icon={<Sparkles className="size-5" />}
          label="XP"
          value={`${xp.balance.toLocaleString()} XP`}
        />
        <Tile
          to="/practice"
          icon={<Target className="size-5" />}
          label="Practice"
          value="Chapter-wise drills"
        />
        <Tile
          to="/analytics"
          icon={<BarChart3 className="size-5" />}
          label="Analytics"
          value="Weak & strong areas"
        />
        <Tile
          to="/results"
          icon={<Trophy className="size-5" />}
          label="Results"
          value={`${completed.length} attempts`}
        />
        <Tile
          to="/resumes"
          icon={<Sparkles className="size-5" />}
          label="Resume Tests"
          value="Continue in-progress attempts"
        />
      </div>

      <Section title="Upcoming live tests" icon={<Clock className="size-4" />}>
        {liveTests.length === 0 ? (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No scheduled Live Tests are currently upcoming.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {liveTests.map((test) => {
              const isLive = test.status === "LIVE" || (liveNow.getTime() >= test.liveStart && liveNow.getTime() <= test.liveEnd);
              return (
                <div key={test.id} className="flex h-full max-w-[320px] flex-col rounded-xl border bg-card p-3 shadow-sm">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="min-w-0 truncate text-sm font-semibold leading-5">{test.testName}</h3>
                    <span
                      className={[
                        "inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]",
                        isLive
                          ? "border-red-500/20 bg-red-500/10 text-red-600"
                          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
                      ].join(" ")}
                    >
                      {isLive ? (
                        <>
                          <span className="live-status-dot" aria-hidden="true" />
                          <span className="font-bold text-red-600">LIVE</span>
                        </>
                      ) : (
                        "UPCOMING"
                      )}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] text-muted-foreground">
                    <div className="font-medium text-foreground">{formatLiveTestDate(test.liveStart)}</div>
                    <div>{formatLiveWindowRange(test.liveStart, test.liveEnd)}</div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-3 border-t border-border/70 pt-2 text-[11px] text-muted-foreground">
                    <span>{formatLiveDuration(test.durationMin)}</span>
                    <span>{test.questionCount} Q</span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => void handleScheduledLiveTestClick(test)}
                      className={[
                        "flex-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold",
                        isLive
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "border bg-card text-foreground hover:bg-accent",
                      ].join(" ")}
                    >
                      {isLive ? "ATTEMPT TEST" : "View Test"}
                    </button>
                    <button
                      type="button"
                      onClick={() => router.navigate({ to: "/live-tests" })}
                      className="rounded-md border px-2.5 py-1.5 text-[11px] font-medium hover:bg-accent"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <StartModeDialog
        open={modePickerOpen}
        onOpenChange={(open) => {
          setModePickerOpen(open);
          if (!open) setPendingLaunch(null);
        }}
        onStart={handleModeSelect}
      />

      {completed.length > 0 && (
        <Section title="Recent results" icon={<Trophy className="size-4" />}>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {completed.slice(0, 3).map((a) => (
              <Link
                key={a.id}
                to="/result/$attemptId"
                params={{ attemptId: a.id }}
                className="rounded-xl border bg-card p-4 transition-colors hover:border-primary"
              >
                <div className="truncate font-semibold">{a.testName}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(a.submittedAt ?? a.updatedAt).toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function Tile({
  to,
  icon,
  label,
  value,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Link
      to={to}
      className="quick-action-tile flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{label}</span>
        <span className="block truncate text-xs text-muted-foreground">{value}</span>
      </span>
    </Link>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide uppercase">
        {icon} {title}
      </h2>
      {children}
    </section>
  );
}

export function StatusDot({ status }: { status: "valid" | "warning" | "invalid" }) {
  const map = {
    valid: "bg-success",
    warning: "bg-warning",
    invalid: "bg-destructive",
  } as const;
  return (
    <span
      title={status}
      className={`mt-1.5 inline-block size-2 shrink-0 rounded-full ${map[status]}`}
    />
  );
}
