import type { LibraryNote } from "./db";

export interface LibraryChapterGroup {
  subject: string;
  chapter: string;
  notes: LibraryNote[];
}

export function groupLibraryNotesBySubjectAndChapter(notes: LibraryNote[]): LibraryChapterGroup[] {
  const grouped = new Map<string, LibraryChapterGroup>();

  for (const note of notes) {
    const subject = note.subject?.trim() || "General";
    const chapter = note.chapter?.trim() || "General";
    const key = `${subject}::${chapter}`;

    if (!grouped.has(key)) {
      grouped.set(key, { subject, chapter, notes: [] });
    }

    grouped.get(key)!.notes.push(note);
  }

  return Array.from(grouped.values()).sort((a, b) => {
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
    return a.chapter.localeCompare(b.chapter);
  });
}
