export type Subject = "Physics" | "Chemistry" | "Mathematics" | string;

export type QuestionType =
  | "single"
  | "multiple"
  | "integer"
  | "numerical"
  | "matrix"
  | "assertion"
  | "paragraph"
  | "diagram"
  | "graph"
  | "table";

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  single: "Single Correct",
  multiple: "Multiple Correct",
  integer: "Integer",
  numerical: "Numerical",
  matrix: "Matrix Match",
  assertion: "Assertion Reason",
  paragraph: "Paragraph",
  diagram: "Diagram",
  graph: "Graph",
  table: "Table",
};

export type Difficulty = "Easy" | "Medium" | "Hard";

/** which JEE library a question set belongs to */
export type ExamKind = "main" | "advanced";

export const EXAM_LABEL: Record<ExamKind, string> = {
  main: "JEE Main",
  advanced: "JEE Advanced",
};

export interface QOption {
  id: string;
  text: string;
  images?: string[];
}

export interface Question {
  id: string;
  number: number;
  subject: Subject;
  chapter: string;
  topic: string;
  difficulty: Difficulty;
  type: QuestionType;
  text: string;
  paragraph?: string;
  options: QOption[];
  /** option ids for single/multiple/assertion, string values for matrix */
  correct: string[];
  answerValue?: number;
  /** additional accepted numerical answers (e.g. "2,3,4") */
  answerValues?: number[];

  tolerance?: number;
  matrix?: {
    left: string[];
    right: string[];
    /** Column I width in px (formatter only — never changes content) */
    leftWidth?: number;
    /** draw cell borders in CBT rendering */
    borders?: boolean;
  };
  /** match-the-following pairs, e.g. { "1": "C", "2": "A" } — row number → Column II letter */
  matrixPairs?: Record<string, string>;
  /** presentation-only spacing (px) applied in the editor and CBT alike */
  spacing?: {
    /** gap between question blocks (statement, figures, options) */
    block?: number;
    /** gap between options */
    options?: number;
    /** gap between solution / explanation steps */
    solution?: number;
  };

  tableHtml?: string;
  solution?: string;
  explanation?: string;
  /** image record ids stored in the images object store */
  images: string[];
  marks: number;
  negative: number;
  flags: { diagram: boolean; graph: boolean; table: boolean; chem: boolean };
  /** content fingerprint used for cross-import duplicate detection */
  hash?: string;
  /** true when the source marks this as a previous-year question */
  pyq?: boolean;
  /** PYQ year, when known */
  year?: number;
  /** optional rich solution metadata */
  formula?: string;
  concept?: string;
  altMethod?: string;
}

export interface ImportIssue {
  level: "error" | "warning";
  message: string;
}

export interface TestSet {
  id: string;
  name: string;
  description?: string;
  subjects: string[];
  chapters: string[];
  questionCount: number;
  imageCount: number;
  missingImages: number;
  importedAt: number;
  updatedAt: number;
  source: "zip" | "json" | "custom" | "sample";
  /** which library this set belongs to */
  exam?: ExamKind;
  /** JEE Advanced paper tag */
  paper?: 1 | 2;
  /** PYQ year, when known */
  year?: number;
  durationMin: number;
  status: "valid" | "warning" | "invalid";
  issues: ImportIssue[];
  questions: Question[];
}

export interface AnswerState {
  value: string[] | string | null;
  visited: boolean;
  marked: boolean;
  bookmarked: boolean;
  /** bookmark category: Revision | Doubt | Important | Formula | Favourite */
  tag?: string;
  timeSpent: number;
}

export interface Attempt {
  id: string;
  testId: string;
  testName: string;
  startedAt: number;
  updatedAt: number;
  durationSec: number;
  remainingSec: number;
  currentIndex: number;
  answers: Record<string, AnswerState>;
  submitted: boolean;
  submittedAt?: number;
  questionIds: string[];
  /** snapshot of questions for custom tests assembled from multiple sets */
  questionsSnapshot?: Question[];
  scoring: { marks: number; negative: number };
  attemptType?: "live" | "missed" | "normal";
  scheduledTestId?: string;
  resultId?: string;
  liveStart?: number;
  liveEnd?: number;
  testDurationMin?: number;
  xpRewarded?: number;
  xpAwardedAt?: number;
  status?: string;
  /** exam-integrity counters */
  proctor?: { tabSwitches: number; fullscreenExits: number; blurs: number };
  /** JEE Advanced paper tag: 1 | 2 */
  paper?: 1 | 2;
  paperGroupId?: string;
  /** which library this attempt belongs to */
  exam?: ExamKind;
  /** set when this attempt is a re-attempt of another */
  reattemptOf?: string;
  /** persisted, non-critical UI state (calculator, palette filter, CBT text scale) */
  uiState?: {
    calcOpen?: boolean;
    calcExpr?: string;
    subjectFilter?: string;
    fontScale?: number;
  };
  /** temporary CBT preview/check mode for live test drafts */
  preview?: { draftId: string; mode: "check" };
  /** strict mode forces fullscreen and auto-submits on exit */
  strictMode?: boolean;
  /** selected exam mode: normal, strict, or nta */
  mode?: "normal" | "strict" | "nta";
}

export interface QuestionResult {
  question: Question;
  answer: AnswerState | undefined;
  status: "correct" | "wrong" | "skipped";
  score: number;
}

export interface StoredImage {
  id: string;
  testId: string;
  name: string;
  /** normalized path inside the archive */
  path?: string;
  /** linked question number, if resolved */
  qNumber?: number;
  kind?: "figure" | "solution";
  blob: Blob;
}

export const SUBJECTS: Subject[] = ["Physics", "Chemistry", "Mathematics"];
