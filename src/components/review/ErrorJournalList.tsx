import { useMemo, useState } from "react";
import {
  Edit2,
  Trash2,
  Eye,
  Plus,
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
} from "lucide-react";
import type { ErrorJournalEntry } from "@/lib/db";
import { groupEntriesByChapter, type SubjectGroup, type ChapterGroup } from "@/lib/chapter-utils";
import { cn } from "@/lib/utils";

const ERROR_TYPES = [
  "Wrong Answer",
  "Couldn't Solve",
  "Concept",
  "Formula",
  "Calculation",
  "Misread",
  "Time Pressure",
  "Wrong Approach",
  "Guess",
];

const SUBJECTS = ["All", "Physics", "Chemistry", "Mathematics"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const STATUSES = ["All", "Need Review", "Learning", "Mastered"];

export function ErrorJournalList({
  entries,
  onNew,
  onView,
  onEdit,
  onDelete,
}: {
  entries: ErrorJournalEntry[];
  onNew: () => void;
  onView: (entry: ErrorJournalEntry) => void;
  onEdit: (entry: ErrorJournalEntry) => void;
  onDelete: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedErrorType, setSelectedErrorType] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = entries.filter((e) => {
      const q = search.toLowerCase();
      const matchesSearch =
        e.questionText.toLowerCase().includes(q) ||
        e.chapter.toLowerCase().includes(q) ||
        e.topic.toLowerCase().includes(q) ||
        e.mistakeMade.toLowerCase().includes(q) ||
        e.whatLearned.toLowerCase().includes(q);

      const matchesSubject = selectedSubject === "All" || e.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === "All" || e.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === "All" || e.status === selectedStatus;
      const matchesErrorType = selectedErrorType === "All" || e.errorType === selectedErrorType;

      return (
        matchesSearch && matchesSubject && matchesDifficulty && matchesStatus && matchesErrorType
      );
    });

    result.sort((a, b) =>
      sortBy === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt,
    );

    return result;
  }, [
    entries,
    search,
    selectedSubject,
    selectedDifficulty,
    selectedStatus,
    selectedErrorType,
    sortBy,
  ]);

  // Group by subject and chapter
  const groupedEntries = useMemo(() => {
    return groupEntriesByChapter(filtered);
  }, [filtered]);

  const hasFilters =
    search ||
    selectedSubject !== "All" ||
    selectedDifficulty !== "All" ||
    selectedStatus !== "All" ||
    selectedErrorType !== "All";

  const toggleChapter = (key: string) => {
    const newSet = new Set(expandedChapters);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedChapters(newSet);
  };

  const getChapterKey = (subject: string, normalizedChapter: string) => {
    return `${subject}::${normalizedChapter}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">📓 Error Journal</h2>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="size-4" /> New Entry
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by question, chapter, topic, notes..."
        className="w-full rounded-lg border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      {/* Filters */}
      <div className="space-y-2 rounded-lg border bg-card/50 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase">
          <span className="text-muted-foreground">Filters:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-md border bg-card px-2 py-1 text-xs"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-md border bg-card px-2 py-1 text-xs"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border bg-card px-2 py-1 text-xs"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={selectedErrorType}
            onChange={(e) => setSelectedErrorType(e.target.value)}
            className="rounded-md border bg-card px-2 py-1 text-xs"
          >
            <option value="All">All Error Types</option>
            {ERROR_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-md border bg-card px-2 py-1 text-xs"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedSubject("All");
                setSelectedDifficulty("All");
                setSelectedStatus("All");
                setSelectedErrorType("All");
              }}
              className="rounded-md border border-destructive px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="text-xs text-muted-foreground">
        Showing {filtered.length} of {entries.length} entry{entries.length !== 1 ? "ies" : ""}
        {hasFilters && " (filtered)"}
      </div>

      {/* Hierarchical List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            {entries.length === 0
              ? "No entries yet — create your first Error Journal entry!"
              : "No entries match your filters."}
          </div>
        ) : (
          <div className="space-y-1 rounded-lg border bg-card p-2">
            {groupedEntries.map((subjectGroup: SubjectGroup) => (
              <div key={subjectGroup.subject} className="space-y-1">
                {/* Subject Header */}
                <div className="px-2 py-1 text-sm font-semibold text-primary">
                  📚 {subjectGroup.subject}
                </div>

                {/* Chapters */}
                <div className="ml-2 space-y-1 border-l border-border/50">
                  {subjectGroup.chapters.map((chapterGroup: ChapterGroup) => {
                    const chapterKey = getChapterKey(
                      subjectGroup.subject,
                      chapterGroup.normalizedChapter,
                    );
                    const isExpanded = expandedChapters.has(chapterKey);

                    return (
                      <div key={chapterKey} className="space-y-1">
                        {/* Chapter Folder */}
                        <button
                          onClick={() => toggleChapter(chapterKey)}
                          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
                        >
                          {isExpanded ? (
                            <ChevronDown className="size-4 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="size-4 flex-shrink-0" />
                          )}
                          <Folder className="size-4 flex-shrink-0 text-yellow-500" />
                          <span className="flex-1 text-left">{chapterGroup.displayChapter}</span>
                          <span className="text-xs text-muted-foreground">
                            {chapterGroup.entries.length}
                          </span>
                        </button>

                        {/* Entries */}
                        {isExpanded && (
                          <div className="ml-2 space-y-1 border-l border-border/30 py-1">
                            {chapterGroup.entries.map((entry: ErrorJournalEntry) => (
                              <div
                                key={entry.id}
                                className="group flex items-start gap-2 rounded px-2 py-2 hover:bg-accent/50"
                              >
                                <FileText className="mt-1 size-3 flex-shrink-0 text-muted-foreground" />
                                <div className="min-w-0 flex-1">
                                  {/* Entry Title */}
                                  <h4 className="text-sm font-medium line-clamp-1">
                                    {entry.questionText || "Untitled"}
                                  </h4>

                                  {/* Entry Meta */}
                                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                    {entry.topic && <span>{entry.topic}</span>}
                                    <span
                                      className={cn(
                                        "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                                        entry.difficulty === "Easy"
                                          ? "bg-green-500/10 text-green-600"
                                          : entry.difficulty === "Medium"
                                            ? "bg-yellow-500/10 text-yellow-600"
                                            : "bg-red-500/10 text-red-600",
                                      )}
                                    >
                                      {entry.difficulty}
                                    </span>
                                    <span
                                      className={cn(
                                        "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                                        entry.status === "Need Review"
                                          ? "bg-red-500/10 text-red-600"
                                          : entry.status === "Learning"
                                            ? "bg-yellow-500/10 text-yellow-600"
                                            : "bg-green-500/10 text-green-600",
                                      )}
                                    >
                                      {entry.status === "Need Review" && "🔴"}
                                      {entry.status === "Learning" && "🟡"}
                                      {entry.status === "Mastered" && "🟢"}
                                    </span>
                                    {entry.hasAudio && <span>🎙️</span>}
                                    <span className="text-[10px]">
                                      {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>

                                  {/* Entry Preview */}
                                  {entry.mistakeMade && (
                                    <p className="mt-1 text-xs line-clamp-1 text-foreground/70">
                                      {entry.mistakeMade}
                                    </p>
                                  )}
                                </div>

                                {/* Actions */}
                                <div className="ml-2 flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                  <button
                                    onClick={() => onView(entry)}
                                    className="rounded p-1 hover:bg-primary/20"
                                    title="View"
                                  >
                                    <Eye className="size-3 text-primary" />
                                  </button>
                                  <button
                                    onClick={() => onEdit(entry)}
                                    className="rounded p-1 hover:bg-blue-500/20"
                                    title="Edit"
                                  >
                                    <Edit2 className="size-3 text-blue-500" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm("Delete this entry?")) {
                                        onDelete(entry.id);
                                      }
                                    }}
                                    className="rounded p-1 hover:bg-destructive/20"
                                    title="Delete"
                                  >
                                    <Trash2 className="size-3 text-destructive" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
