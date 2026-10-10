import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Gauge,
  MessageSquareText,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Target,
  TimerReset,
  TrendingUp,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/AppShell";
import { mathToHtml } from "@/components/MathText";
import { StartModeDialog, type StartMode } from "@/components/StartModeDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  askMentor,
  GEMINI_RATE_LIMIT_MESSAGE,
  getGeminiRequestUsage,
  getGeminiRequestUsageSummary,
  getTodayDateKey,
  incrementGeminiRequestUsage,
  normalizeMentorQuestion,
  shouldShortCircuitMentorQuestion,
} from "@/lib/ai/gemini";
import { listTests } from "@/lib/db";
import { startAttempt } from "@/lib/attempt";
import { buildMentorAnalysis, buildMentorContext, findRecommendedQuestions, resolveMentorAction } from "@/lib/mentor";
import { buildJeeTimeContext, cacheMentorResponse, createMentorConversation, getCachedMentorResponse, loadMentorConversations, loadMentorMemory, relevantMentorHistory, rememberGoal, saveMentorConversations, saveMentorMemory, searchMentorConversations, updateMentorConversation, updateMentorMemory, type MentorChatMessage, type MentorConversation, type StoredMentorMemory } from "@/lib/mentor-memory";
import { allReports } from "@/lib/stats";
import { prepareStartMode } from "@/lib/start-mode";
import { toast } from "sonner";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function historyGroup(timestamp: number) {
  const date = new Date(timestamp);
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const daysAgo = Math.floor((startToday - new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) / 86_400_000);
  if (daysAgo <= 0) return "TODAY";
  if (daysAgo === 1) return "YESTERDAY";
  if (daysAgo < 7) return "THIS WEEK";
  return "OLDER";
}

function renderInlineMarkdown(text: string) {
  let html = "";
  let cursor = 0;
  const mathPattern = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\([^\n]+?\\\)|\\\[[\s\S]+?\\\]|\\(?:d?frac|tfrac|sqrt|text|mathrm|mathbb|sin|cos|tan|log|ln|sum|prod|int|cdot|times|leq|geq|neq|infty)\s*(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}){1,2}|[A-Za-z0-9)\]}]\s*[\^_]\s*(?:\{[^{}]+\}|[A-Za-z0-9+\-]+))/g;

  for (const matches of text.matchAll(mathPattern)) {
    const matchIndex = matches.index ?? 0;
    const matchText = matches[0];
    html += renderPlainMarkdown(text.slice(cursor, matchIndex));
    html += mathToHtml(matchText, false);
    cursor = matchIndex + matchText.length;
  }

  html += renderPlainMarkdown(text.slice(cursor));
  return html;
}

function renderPlainMarkdown(text: string) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(^|\s)\*([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/_([^_\n]+?)_/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  return html;
}

export function renderMentorMessageHtml(message: string) {
  const normalized = message.replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";

  const lines = normalized.split("\n");
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (!listItems.length) return;
    const tag = listType === "ol" ? "ol" : "ul";
    blocks.push(
      `<${tag}>${listItems
        .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
        .join("")}</${tag}>`,
    );
    listItems = [];
    listType = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      const item = line.replace(/^[-*]\s+/, "");
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(item);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph();
      const item = line.replace(/^\d+\.\s+/, "");
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(item);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks.join("");
}

function MentorMessage({ text }: { text: string }) {
  return (
    <div
      className="mentor-markdown prose prose-sm max-w-none space-y-2 text-sm leading-7 text-foreground [&_h1]:mt-0 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:mt-0 [&_h2]:text-sm [&_h2]:font-semibold [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs"
      dangerouslySetInnerHTML={{ __html: renderMentorMessageHtml(text) }}
    />
  );
}

export const Route = createFileRoute("/mentor")({
  head: () => ({
    meta: [
      { title: "AI Mentor — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Personalized JEE mentor that analyses real attempts, finds weak topics, and recommends focused revision and practice.",
      },
    ],
  }),
  component: Mentor,
});

function Mentor() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const reports = useQuery({ queryKey: ["mentor", "reports"], queryFn: allReports });
  const tests = useQuery({ queryKey: ["mentor", "tests"], queryFn: listTests });

  const analysis = useMemo(
    () => buildMentorAnalysis(reports.data ?? []),
    [reports.data],
  );

  const [mentorMemory, setMentorMemory] = useState<StoredMentorMemory>(() => loadMentorMemory());
  const [conversations, setConversations] = useState<MentorConversation[]>(() => loadMentorConversations());
  const [activeConversationId, setActiveConversationId] = useState(() => loadMentorConversations()[0]?.id ?? "");
  const [historyQuery, setHistoryQuery] = useState("");
  const [historyOpen, setHistoryOpen] = useState(true);
  const [retryStatus, setRetryStatus] = useState("");
  const [retryCountdown, setRetryCountdown] = useState(0);
  const [quickBankMatchLoading, setQuickBankMatchLoading] = useState(false);
  const [quickBankMatchResult, setQuickBankMatchResult] = useState<number | null>(null);
  const [geminiUsage, setGeminiUsage] = useState(() => getGeminiRequestUsage());
  const requestInFlightRef = useRef<string | null>(null);
  const activeConversation = conversations.find((item) => item.id === activeConversationId) ?? conversations[0];
  const chat = activeConversation?.messages ?? [];

  function updateActiveChat(nextMessages: MentorChatMessage[]) {
    if (!activeConversation) return;
    setConversations((current) => current.map((item) => item.id === activeConversation.id ? updateMentorConversation(item, nextMessages) : item));
  }

  useEffect(() => {
    const updated = updateMentorMemory(analysis, mentorMemory);
    if (updated.performanceFingerprint !== mentorMemory.performanceFingerprint) {
      setMentorMemory(updated);
    }
  }, [analysis, mentorMemory]);

  useEffect(() => {
    saveMentorMemory(mentorMemory);
  }, [mentorMemory]);

  useEffect(() => {
    saveMentorConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (retryCountdown <= 0) return;
    const timer = window.setTimeout(() => {
      setRetryCountdown((current) => Math.max(0, current - 1));
      setRetryStatus(`AI limit reached. Retrying in ${Math.max(0, retryCountdown - 1)}s…`);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [retryCountdown]);

  useEffect(() => {
    if (!activeConversationId && analysis.summary) {
      const conversation = updateMentorConversation(createMentorConversation(), [{ role: "mentor", text: analysis.summary, timestamp: Date.now() }]);
      setConversations([conversation]);
      setActiveConversationId(conversation.id);
    }
  }, [analysis.summary, activeConversationId]);

  const trendData = useMemo(() => {
    const history = [...(reports.data ?? [])]
      .sort((a, b) => (a.attempt.submittedAt ?? a.attempt.updatedAt) - (b.attempt.submittedAt ?? b.attempt.updatedAt))
      .map((report) => ({
        label: new Date(report.attempt.submittedAt ?? report.attempt.updatedAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        accuracy: Number(report.summary.accuracy.toFixed(1)),
        score: report.summary.score,
        timeSpent: Math.max(0, Math.round(report.summary.timeSpent / 60)),
      }));
    return history.length > 0 ? history : [];
  }, [reports.data]);

  const subjectPerformanceData = useMemo(() => {
    const map = new Map<string, { correct: number; total: number; score: number; time: number }>();

    for (const report of reports.data ?? []) {
      for (const item of report.summary.bySubject ?? []) {
        const current = map.get(item.name) ?? { correct: 0, total: 0, score: 0, time: 0 };
        current.correct += item.correct;
        current.total += item.total;
        current.score += item.score;
        current.time += item.time;
        map.set(item.name, current);
      }
    }

    return [...map.entries()]
      .map(([name, values]) => ({
        name,
        accuracy: values.total ? (values.correct / values.total) * 100 : 0,
        score: values.score,
        time: values.time,
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 6);
  }, [reports.data]);

  const questionPack = useMemo(() => {
    const request = analysis.priorityTopics[0]
      ? resolveMentorAction(
          `Give me 10 questions on ${analysis.priorityTopics[0].topic} in ${analysis.priorityTopics[0].subject}`,
          analysis,
        )
      : null;
    if (!request || !tests.data) return [];
    return findRecommendedQuestions(tests.data, request, analysis).slice(0, request.count ?? 10);
  }, [analysis, tests.data]);

  const targetedRequest = useMemo(
    () => (analysis.priorityTopics[0]
      ? resolveMentorAction(
          `Give me 10 questions on ${analysis.priorityTopics[0].topic} in ${analysis.priorityTopics[0].subject}`,
          analysis,
        )
      : null),
    [analysis],
  );
  const targetedQuestions = useMemo(
    () => targetedRequest && tests.data
      ? findRecommendedQuestions(tests.data, targetedRequest, analysis).slice(0, targetedRequest.count ?? 10)
      : [],
    [analysis, targetedRequest, tests.data],
  );
  const [modePickerOpen, setModePickerOpen] = useState(false);
  const [pendingLaunch, setPendingLaunch] = useState<((mode: StartMode) => Promise<void>) | null>(null);

  const [prompt, setPrompt] = useState("What should I study today?");
  const [loading, setLoading] = useState(false);
  const visibleConversations = searchMentorConversations(conversations, historyQuery);
  const groupedConversations = ["TODAY", "YESTERDAY", "THIS WEEK", "OLDER"].map((group) => ({
    group,
    items: visibleConversations.filter((conversation) => historyGroup(conversation.updatedAt) === group),
  })).filter((section) => section.items.length > 0);

  function startNewConversation() {
    const conversation = createMentorConversation();
    setConversations((current) => [conversation, ...current]);
    setActiveConversationId(conversation.id);
  }

  function deleteConversation(id: string) {
    const remaining = conversations.filter((conversation) => conversation.id !== id);
    setConversations(remaining);
    if (id === activeConversation?.id) setActiveConversationId(remaining[0]?.id ?? "");
  }

  async function handleQuickBankMatch() {
    if (!targetedQuestions.length || !tests.data?.length) {
      setQuickBankMatchResult(0);
      setQuickBankMatchLoading(false);
      return;
    }

    setQuickBankMatchLoading(true);
    setQuickBankMatchResult(null);

    await new Promise((resolve) => setTimeout(resolve, 150));

    const matched = findRecommendedQuestions(tests.data, targetedRequest ?? { count: 5 }, analysis).slice(0, 5).length;
    setQuickBankMatchResult(matched);
    setQuickBankMatchLoading(false);
  }

  function openTargetedPractice() {
    if (!tests.data?.length || targetedQuestions.length === 0) {
      toast.error("There are not enough suitable bank questions for a targeted practice test yet.");
      return;
    }
    const base = tests.data[0];
    const topic = analysis.priorityTopics[0];
    setPendingLaunch(() => async (selectedMode: StartMode) => {
      const durationMin = Math.max(30, Math.ceil(targetedQuestions.length * 2));
      const attempt = await startAttempt(
        {
          ...base,
          name: `Mentor Practice — ${topic?.topic ?? "Priority Revision"}`,
          questions: targetedQuestions,
          questionCount: targetedQuestions.length,
          durationMin,
        },
        {
          questions: targetedQuestions,
          durationMin,
          name: `Mentor Practice — ${topic?.topic ?? "Priority Revision"}`,
          mode: selectedMode,
          strictMode: selectedMode === "strict",
        },
      );
      queryClient.invalidateQueries({ queryKey: ["attempts"] });
      router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } });
    });
    setModePickerOpen(true);
  }

  async function handleModeSelect(selectedMode: StartMode) {
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
      const launch = pendingLaunch;
      setPendingLaunch(null);
      await launch(selectedMode);
    }
  }

  async function handleAsk() {
    const value = prompt.trim();
    if (!value) return;

    const normalizedPrompt = normalizeMentorQuestion(value);
    if (requestInFlightRef.current === normalizedPrompt) {
      return;
    }

    const staticAnswer = shouldShortCircuitMentorQuestion(value);
    const cachedAnswer = getCachedMentorResponse(normalizedPrompt);
    if (staticAnswer || cachedAnswer) {
      const answer = staticAnswer ?? cachedAnswer;
      const userMessage = { role: "user" as const, text: value, timestamp: Date.now() };
      updateActiveChat([...chat, userMessage, { role: "mentor", text: answer, timestamp: Date.now() }]);
      setPrompt("");
      if (staticAnswer && !cachedAnswer) {
        cacheMentorResponse(normalizedPrompt, answer);
      }
      return;
    }

    const userMessage = { role: "user" as const, text: value, timestamp: Date.now() };
    updateActiveChat([...chat, userMessage]);
    setMentorMemory((current) => rememberGoal(current, value));
    setPrompt("");
    setLoading(true);
    setRetryStatus("");
    requestInFlightRef.current = normalizedPrompt;

    try {
      const request = resolveMentorAction(value, analysis);
      const candidates = request && tests.data ? findRecommendedQuestions(tests.data, request, analysis).slice(0, 5) : [];
      const questionBankById = new Map<string, string>();
      for (const test of tests.data ?? []) {
        for (const question of test.questions) {
          questionBankById.set(question.id, test.name || "Insufficient Evidence");
        }
      }
      const candidatesForGemini = candidates.map((q) => {
        const normalizedDifficulty = q.difficulty === "Easy" || q.difficulty === "Medium" || q.difficulty === "Hard"
          ? q.difficulty
          : "Medium";
        const evidence = analysis.priorityTopics.find((item) => item.subject === q.subject && item.topic === q.topic)?.reason ?? "Insufficient Evidence";
        const questionBank = questionBankById.get(q.id) ?? "Insufficient Evidence";
        return {
          reference: `Q${q.number} · ${q.chapter} · ${q.topic} · ${normalizedDifficulty}`,
          questionBank,
          subject: q.subject,
          chapter: q.chapter,
          topic: q.topic,
          difficulty: normalizedDifficulty,
          type: q.type,
          pyq: q.pyq,
          reason: evidence,
        };
      });
      const compactContext = buildMentorContext(
        analysis,
        rememberGoal(mentorMemory, value),
        value,
      );
      const conversation = chat.slice(-6).map(({ role, text }) => ({ role, text }));
      const relevantHistory = relevantMentorHistory(conversations, value, activeConversation?.id);
      const result = await askMentor({
        data: {
          prompt: value,
          context: { ...compactContext, jeeTime: buildJeeTimeContext(), longTermMemory: mentorMemory },
          questionRequest: request ? { ...request } : null,
          questionContext: candidatesForGemini,
          conversation,
          relevantHistory,
        },
      });

      const answer = result || "I need a little more data before I can answer confidently.";
      cacheMentorResponse(normalizedPrompt, answer);
      incrementGeminiRequestUsage();
      setGeminiUsage(getGeminiRequestUsage());
      updateActiveChat([...chat, userMessage, { role: "mentor", text: answer, timestamp: Date.now() }]);
    } catch (error) {
      const parsedRateLimit = error instanceof Error && error.message.startsWith("{") ? (() => {
        try { return JSON.parse(error.message); } catch { return null; }
      })() : null;
      const isRateLimit = Boolean(parsedRateLimit?.kind === "rate_limit") || (error instanceof Error && /rate limit|quota|RESOURCE_EXHAUSTED|429/i.test(error.message));
      const retryDelaySeconds = typeof parsedRateLimit?.retryDelaySeconds === "number" ? parsedRateLimit.retryDelaySeconds : 35;
      const fallback = isRateLimit ? GEMINI_RATE_LIMIT_MESSAGE : "AI Mentor is temporarily unavailable. Please try again shortly.";
      if (isRateLimit && retryDelaySeconds > 0) {
        setRetryCountdown(retryDelaySeconds);
        setRetryStatus(`AI limit reached. Retrying in ${retryDelaySeconds}s…`);
      }
      updateActiveChat([
        ...chat,
        userMessage,
        {
          role: "mentor",
          timestamp: Date.now(),
          text:
            `${fallback}\n\nBased on your data: ${analysis.summary}`,
        },
      ]);
    } finally {
      requestInFlightRef.current = null;
      setLoading(false);
      setRetryStatus("");
    }
  }

  const overallAccuracy = analysis.subjectPerformance.length
    ? analysis.subjectPerformance.reduce((sum, item) => sum + item.accuracy, 0) /
        analysis.subjectPerformance.length
    : 0;

  if (reports.isLoading || tests.isLoading) {
    return (
      <AppShell>
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Loading your mentor dashboard…
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <BrainCircuit className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">AI Mentor</p>
                <h1 className="text-2xl font-bold tracking-tight">Personalized preparation coach</h1>
              </div>
            </div>
            <p className="max-w-3xl text-sm text-muted-foreground">{analysis.summary}</p>
          </div>
          <Badge variant="secondary" className="w-fit gap-2 px-3 py-1.5 text-xs">
            <Sparkles className="size-3.5" />
            Live from your practice data
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Gauge className="size-4" />}
            label="Overall accuracy"
            value={`${((analysis.priorityTopics[0]?.accuracy ?? overallAccuracy) || 0).toFixed(1)}%`}
            tone="default"
          />
          <StatCard icon={<TrendingUp className="size-4" />} label="Recent tests" value={String(analysis.recentPerformance.length)} tone="default" />
          <StatCard icon={<Target className="size-4" />} label="Priority topics" value={String(analysis.priorityTopics.length)} tone="warning" />
          <StatCard icon={<TimerReset className="size-4" />} label="Weak themes" value={String(analysis.repeatedMistakes.length || analysis.priorityTopics.length)} tone="danger" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <MentorChartCard title="Accuracy over time" emptyLabel="Not enough data yet for a trend chart.">
            {trendData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
                  <RechartsTooltip
                    animationDuration={220}
                    animationEasing="ease-out"
                    formatter={(value: number) => [`${value}%`, "Accuracy"]}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
                    isAnimationActive
                    animationDuration={700}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState />
            )}
          </MentorChartCard>

          <MentorChartCard title="Score over time" emptyLabel="Not enough data yet for a score graph.">
            {trendData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <RechartsTooltip
                    animationDuration={220}
                    animationEasing="ease-out"
                    formatter={(value: number) => [String(value), "Score"]}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                  <Bar
                    dataKey="score"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive
                    animationDuration={700}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState />
            )}
          </MentorChartCard>

          <MentorChartCard title="Minutes spent per test" emptyLabel="Not enough data yet for time trend.">
            {trendData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <RechartsTooltip
                    animationDuration={220}
                    animationEasing="ease-out"
                    formatter={(value: number) => [`${value} min`, "Time spent"]}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                  <Bar
                    dataKey="timeSpent"
                    fill="var(--success)"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive
                    animationDuration={700}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState />
            )}
          </MentorChartCard>

          <MentorChartCard title="Subject performance" emptyLabel="Not enough subject data yet.">
            {subjectPerformanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} />
                  <RechartsTooltip
                    animationDuration={220}
                    animationEasing="ease-out"
                    formatter={(value: number) => [`${Number(value).toFixed(1)}%`, "Accuracy"]}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                  <Bar
                    dataKey="accuracy"
                    fill="var(--warning)"
                    radius={[0, 4, 4, 0]}
                    isAnimationActive
                    animationDuration={700}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState />
            )}
          </MentorChartCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="size-4" /> Overall preparation analysis
              </CardTitle>
              <CardDescription>What your real data is telling you right now.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mentor status</p>
                <p className="mt-1 text-base leading-7 text-foreground">{analysis.summary}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current strengths</p>
                  <ul className="mt-2 space-y-2 text-sm text-foreground">
                    {(analysis.strengths.length ? analysis.strengths : ["Not enough data yet to identify strong areas."]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current weaknesses</p>
                  <ul className="mt-2 space-y-2 text-sm text-foreground">
                    {(analysis.weaknesses.length ? analysis.weaknesses : ["No major weakness is visible yet because the sample size is still small."]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="size-4" /> Recommended actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.recommendations.map((item) => (
                <div key={item} className="rounded-lg border bg-accent/30 p-3 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Priority topics</CardTitle>
              <CardDescription>Weaknesses ranked by actual performance, time, and repetition.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.priorityTopics.length ? (
                analysis.priorityTopics.map((topic) => (
                  <div key={topic.key} className="rounded-xl border bg-card p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{topic.subject} · {topic.topic}</p>
                        <p className="text-xs text-muted-foreground">{topic.chapter}</p>
                      </div>
                      <Badge variant={topic.priority === "Critical" ? "destructive" : topic.priority === "High" ? "secondary" : "outline"}>{topic.priority}</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>Accuracy <span className="font-medium text-foreground">{topic.accuracy.toFixed(1)}%</span></div>
                      <div>Wrong <span className="font-medium text-foreground">{topic.wrong}</span></div>
                      <div>Avg time <span className="font-medium text-foreground">{Math.round(topic.avgTime)}s</span></div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{topic.reason}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">I need more attempts before I can rank your weak topics reliably.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent performance</CardTitle>
              <CardDescription>Trend across your latest submitted tests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.recentPerformance.length ? (
                analysis.recentPerformance.map((item) => (
                  <div key={`${item.label}-${item.date}`} className="flex items-center justify-between rounded-lg border bg-card p-3">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{item.accuracy.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">{item.score} marks</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Submit a mock test to build a recent performance trend.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Bank Match</CardTitle>
              <CardDescription>Find suitable questions for your weakest area without dumping a full list into chat.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickBankMatchLoading ? (
                <div className="rounded-lg border border-dashed bg-accent/20 p-3 text-sm text-muted-foreground">
                  Matching suitable questions from your Question Bank…
                </div>
              ) : quickBankMatchResult !== null ? (
                quickBankMatchResult > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">{quickBankMatchResult} questions matched</p>
                    <Button onClick={openTargetedPractice} className="w-fit gap-2">
                      <Target className="size-4" /> Start Practice
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No suitable questions found in your Question Bank.</p>
                )
              ) : (
                <Button onClick={handleQuickBankMatch} className="w-fit gap-2" disabled={!targetedQuestions.length || !tests.data?.length}>
                  <Target className="size-4" /> Quick Bank Match
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next study block</CardTitle>
              <CardDescription>Concrete steps for the next one to two hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.nextActions.map((action) => (
                <div key={action.title} className="rounded-lg border bg-card p-3">
                  <p className="font-medium text-foreground">{action.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{action.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquareText className="size-4" /> Chat with Mentor
            </CardTitle>
            <CardDescription>Ask about your weak areas, revision plan, or next mock strategy.</CardDescription>
            <Button type="button" variant="outline" size="sm" className="w-fit gap-2 lg:hidden" onClick={() => setHistoryOpen(true)}>
              <PanelLeftOpen className="size-4" /> History
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={historyOpen ? "grid gap-4 lg:grid-cols-[176px_1fr]" : "grid gap-4 lg:grid-cols-[40px_1fr]"}>
              <aside className={historyOpen ? "fixed inset-y-0 left-0 z-50 w-[min(82vw,280px)] overflow-y-auto border-r bg-card p-3 shadow-xl lg:static lg:w-auto lg:rounded-xl lg:border lg:shadow-none" : "hidden lg:block lg:rounded-xl lg:border lg:bg-card lg:p-2"}>
                <div className="flex items-center justify-between gap-2">
                  {historyOpen && <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">History</p>}
                  <Button type="button" variant="outline" size="sm" className="gap-1" onClick={() => setHistoryOpen((open) => !open)} aria-label={historyOpen ? "Collapse history" : "Expand history"}>
                    {historyOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
                    {historyOpen && "Collapse"}
                  </Button>
                </div>
                {historyOpen && <input
                  value={historyQuery}
                  onChange={(event) => setHistoryQuery(event.target.value)}
                  placeholder="Search history"
                  className="mt-3 w-full rounded-lg border bg-background px-2 py-1.5 text-xs outline-none focus:border-primary"
                />}
                {historyOpen && <Button type="button" variant="outline" size="sm" className="mt-2 w-full" onClick={startNewConversation}>+ New Chat</Button>}
                {historyOpen && <div className="mt-3 max-h-[calc(100vh-180px)] space-y-1 overflow-y-auto">
                  {groupedConversations.map((section) => (
                    <div key={section.group}>
                      <p className="px-2 pb-1 pt-2 text-[10px] font-semibold tracking-wide text-muted-foreground">{section.group}</p>
                      {section.items.map((conversation) => (
                    <div key={conversation.id} className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveConversationId(conversation.id)}
                        className={`min-w-0 flex-1 rounded-lg px-2 py-2 text-left text-xs ${conversation.id === activeConversation?.id ? "bg-primary/10 text-primary" : "hover:bg-accent"}`}
                      >
                        <span className="block truncate font-medium">{conversation.title}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(conversation.updatedAt).toLocaleDateString()}</span>
                      </button>
                      <button type="button" onClick={() => deleteConversation(conversation.id)} className="px-1 text-xs text-muted-foreground hover:text-destructive" aria-label={`Delete ${conversation.title}`}>×</button>
                    </div>
                  ))}
                    </div>
                  ))}
                  {!visibleConversations.length && <p className="py-3 text-xs text-muted-foreground">No saved conversations.</p>}
                </div>}
              </aside>
              {historyOpen && <button type="button" aria-label="Close history" onClick={() => setHistoryOpen(false)} className="fixed inset-0 z-40 bg-background/60 lg:hidden" />}
              <div className="space-y-3 rounded-xl border bg-card p-3">
              {chat.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[85%] rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "mr-auto max-w-[85%] rounded-xl border bg-accent/20 px-3 py-2 text-sm text-foreground"
                  }
                >
                  {message.role === "mentor" ? (
                    <MentorMessage text={message.text} />
                  ) : (
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  )}
                </div>
              ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  rows={3}
                  placeholder="Example: Why am I getting weak in Physics? Which topic should I revise today?"
                  className="min-h-[90px] w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 focus:border-primary"
                />
                <p className="mt-2 text-xs text-muted-foreground">{getGeminiRequestUsageSummary({ count: geminiUsage.count, date: getTodayDateKey() })}</p>
              </div>
              <div className="self-end">
                <Button onClick={handleAsk} disabled={loading || !prompt.trim()}>
                  {loading ? retryStatus || "Thinking…" : "Ask Mentor"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <StartModeDialog open={modePickerOpen} onOpenChange={setModePickerOpen} onStart={handleModeSelect} />
    </AppShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "warning" | "danger";
}) {
  const palette =
    tone === "warning"
      ? "border-amber-500/20 bg-amber-500/5"
      : tone === "danger"
        ? "border-red-500/20 bg-red-500/5"
        : "border-primary/20 bg-primary/5";

  return (
    <div className={`premium-card rounded-xl border p-4 ${palette}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">{value}</p>
    </div>
  );
}

function MentorChartCard({ title, children, emptyLabel }: { title: string; children: React.ReactNode; emptyLabel: string }) {
  return (
    <Card className="premium-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="chart-animated h-40">{children}</div>
      </CardContent>
    </Card>
  );
}

function EmptyChartState() {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-accent/10 p-4 text-center text-xs text-muted-foreground">
      Not enough data yet.
    </div>
  );
}