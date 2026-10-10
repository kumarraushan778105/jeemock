/**
 * Utility functions for handling chapter organization and normalization
 */

/**
 * Normalize chapter name for consistent grouping
 * - Trim whitespace
 * - Preserve original casing for display
 * Returns normalized version for comparison
 */
export function normalizeChapter(chapter: string): string {
  return chapter.trim().toLowerCase();
}

/**
 * Group error journal entries by Subject and normalized Chapter
 * Returns a hierarchical structure for folder-like display
 */
export interface ChapterGroup {
  subject: string;
  normalizedChapter: string;
  displayChapter: string; // The canonical display name (first occurrence)
  entries: any[];
}

export interface SubjectGroup {
  subject: string;
  chapters: ChapterGroup[];
}

export function groupEntriesByChapter(entries: any[]): SubjectGroup[] {
  const subjectMap = new Map<string, Map<string, ChapterGroup>>();

  // Group entries
  for (const entry of entries) {
    const subject = entry.subject || "General";
    const chapter = entry.chapter || "General";
    const normalizedChapter = normalizeChapter(chapter);

    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, new Map());
    }

    const chaptersMap = subjectMap.get(subject)!;
    if (!chaptersMap.has(normalizedChapter)) {
      chaptersMap.set(normalizedChapter, {
        subject,
        normalizedChapter,
        displayChapter: chapter, // Use first occurrence as display name
        entries: [],
      });
    }

    chaptersMap.get(normalizedChapter)!.entries.push(entry);
  }

  // Convert to array and sort
  const result: SubjectGroup[] = [];
  for (const [subject, chaptersMap] of subjectMap) {
    const chapters = Array.from(chaptersMap.values()).sort((a, b) =>
      a.displayChapter.localeCompare(b.displayChapter),
    );
    result.push({ subject, chapters });
  }

  result.sort((a, b) => a.subject.localeCompare(b.subject));
  return result;
}

/**
 * Get all unique normalized chapters for a subject
 */
export function getUniqueChapters(
  entries: any[],
  subject: string,
): { normalized: string; display: string }[] {
  const chapters = new Map<string, string>();

  for (const entry of entries) {
    if (entry.subject === subject && entry.chapter) {
      const normalized = normalizeChapter(entry.chapter);
      if (!chapters.has(normalized)) {
        chapters.set(normalized, entry.chapter);
      }
    }
  }

  return Array.from(chapters.entries())
    .map(([normalized, display]) => ({ normalized, display }))
    .sort((a, b) => a.display.localeCompare(b.display));
}
