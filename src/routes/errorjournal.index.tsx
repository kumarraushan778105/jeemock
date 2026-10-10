import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BookMarked } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ErrorJournalList } from "@/components/review/ErrorJournalList";
import { ErrorJournalEditor } from "@/components/review/ErrorJournalEditor";
import { ErrorJournalViewer } from "@/components/review/ErrorJournalViewer";
import { ErrorJournalStats } from "@/components/review/ErrorJournalStats";
import { deleteErrorJournalEntry, listErrorJournalEntries, type ErrorJournalEntry } from "@/lib/db";

export const Route = createFileRoute("/errorjournal/")({
  head: () => ({
    meta: [
      { title: "Error Journal — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Your personal Error Journal for tracking learning gaps, mistakes, and reflections.",
      },
      { property: "og:title", content: "Error Journal" },
      {
        property: "og:description",
        content: "Track your errors and learning progress.",
      },
    ],
  }),
  component: ErrorJournalIndex,
});

function ErrorJournalIndex() {
  const [editingEntry, setEditingEntry] = useState<ErrorJournalEntry | undefined>();
  const [showEditor, setShowEditor] = useState(false);
  const [viewingEntry, setViewingEntry] = useState<ErrorJournalEntry | undefined>();

  const errorEntries = useQuery({
    queryKey: ["errorJournal"],
    queryFn: listErrorJournalEntries,
  });

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <BookMarked className="size-5" /> Error Journal
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review your preserved mistakes and learning notes. This is your personal archive for
        reflection and growth.
      </p>

      {errorEntries.isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}

      {!errorEntries.isLoading && (
        <>
          <ErrorJournalStats entries={errorEntries.data ?? []} />

          <div className="mt-5">
            <ErrorJournalList
              entries={errorEntries.data ?? []}
              onNew={() => {
                setEditingEntry(undefined);
                setShowEditor(true);
              }}
              onView={(entry) => {
                setViewingEntry(entry);
              }}
              onEdit={(entry) => {
                setEditingEntry(entry);
                setShowEditor(true);
              }}
              onDelete={async (id) => {
                await deleteErrorJournalEntry(id);
                await errorEntries.refetch();
              }}
            />
          </div>
        </>
      )}

      {/* Error Journal Editor Modal - for creating and editing */}
      {showEditor && (
        <ErrorJournalEditor
          entry={editingEntry}
          onSave={async (entry) => {
            setShowEditor(false);
            setEditingEntry(undefined);
            await errorEntries.refetch();
          }}
          onCancel={() => {
            setShowEditor(false);
            setEditingEntry(undefined);
          }}
        />
      )}

      {/* Error Journal Viewer Modal - for viewing preserved mistakes */}
      {viewingEntry && (
        <ErrorJournalViewer
          entry={viewingEntry}
          onClose={() => {
            setViewingEntry(undefined);
          }}
        />
      )}
    </AppShell>
  );
}
