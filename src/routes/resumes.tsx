import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Clock3, PlayCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAttempt, listAttempts } from "@/lib/db";
import { formatClock } from "@/lib/scoring";
import { attemptStatus, isResumable, STATUS_LABEL } from "@/lib/status";
import type { Attempt } from "@/lib/types";

export const Route = createFileRoute("/resumes")({
  head: () => ({
    meta: [
      { title: "Resume Tests — Continue unfinished mock attempts" },
      {
        name: "description",
        content:
          "Manage resumed mock tests in one place and continue any unfinished attempt instantly.",
      },
    ],
  }),
  component: ResumeTestsPage,
});

function ResumeTestsPage() {
  const qc = useQueryClient();
  const router = useRouter();
  const { data: attempts = [], isLoading } = useQuery({
    queryKey: ["attempts"],
    queryFn: listAttempts,
    refetchOnMount: "always",
  });

  const resumable = attempts.filter(isResumable);

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await deleteAttempt(id);
      return id;
    },
    onSuccess: (id) => {
      qc.setQueryData(["attempts"], (current: Attempt[] | undefined) =>
        (current ?? []).filter((attempt) => attempt.id !== id),
      );
      qc.invalidateQueries({ queryKey: ["attempts"] });
      toast.success("Resumed test deleted");
    },
    onError: () => toast.error("Unable to delete resumed test"),
  });

  return (
    <AppShell>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Resume Tests
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Pick up where you left off
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                All in-progress and draft attempts live here so you can resume them without
                cluttering the dashboard.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground">
              <Clock3 className="size-4" />
              {resumable.length} {resumable.length === 1 ? "attempt" : "attempts"}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-dashed bg-card/60 p-10 text-center text-sm text-muted-foreground">
            Loading resumed tests…
          </div>
        ) : resumable.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-card/60 p-10 text-center text-sm text-muted-foreground">
            No resumed tests available
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {resumable.map((attempt) => (
              <div key={attempt.id} className="rounded-2xl border bg-card p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-base font-semibold">{attempt.testName}</h2>
                      <span className="shrink-0 rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning">
                        {STATUS_LABEL[attemptStatus(attempt)]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {attempt.questionIds.length} questions • started{" "}
                      {new Date(attempt.startedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-lg bg-warning/10 px-2.5 py-1 text-sm font-semibold text-warning">
                    {formatClock(attempt.remainingSec)}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      router.navigate({ to: "/test/$attemptId", params: { attemptId: attempt.id } })
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <PlayCircle className="size-4" /> Resume
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-accent"
                      >
                        <Trash2 className="size-4" /> Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete resumed test?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this resumed test?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove.mutate(attempt.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
