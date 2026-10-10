import { putTest, uid } from "./db";
import type { Question, TestSet } from "./types";

function q(p: Partial<Question> & { number: number; text: string }): Question {
  return {
    id: `sq${p.number}`,
    subject: "Physics",
    chapter: "General",
    topic: "",
    difficulty: "Medium",
    type: "single",
    options: [],
    correct: [],
    images: [],
    marks: 4,
    negative: 1,
    flags: { diagram: false, graph: false, table: false, chem: false },
    ...p,
  } as Question;
}

const opts = (a: string, b: string, c: string, d: string) => [
  { id: "A", text: a },
  { id: "B", text: b },
  { id: "C", text: c },
  { id: "D", text: d },
];

export const SAMPLE_QUESTIONS: Question[] = [
  q({
    number: 1,
    subject: "Physics",
    chapter: "Kinematics",
    topic: "Projectile Motion",
    text: "A particle is projected with speed $u$ at an angle $\\theta$ to the horizontal. The maximum height attained is $H = \\dfrac{u^2\\sin^2\\theta}{2g}$. If $u = 20\\,\\mathrm{m/s}$ and $\\theta = 30^\\circ$, find $H$ (take $g = 10\\,\\mathrm{m/s^2}$).",
    options: opts(
      "$5\\,\\mathrm{m}$",
      "$10\\,\\mathrm{m}$",
      "$15\\,\\mathrm{m}$",
      "$20\\,\\mathrm{m}$",
    ),
    correct: ["A"],
    solution:
      "$H = \\dfrac{(20)^2 (1/2)^2}{2\\times 10} = \\dfrac{400 \\times 0.25}{20} = 5\\,\\mathrm{m}$",
  }),
  q({
    number: 2,
    subject: "Physics",
    chapter: "Current Electricity",
    type: "numerical",
    difficulty: "Hard",
    text: "In a circuit, three resistors of $2\\,\\Omega$, $3\\,\\Omega$ and $6\\,\\Omega$ are connected in parallel across a $12\\,\\mathrm{V}$ battery of negligible internal resistance. Find the total current (in ampere).",
    answerValue: 12,
    negative: 0,
    solution:
      "$\\dfrac{1}{R} = \\dfrac12 + \\dfrac13 + \\dfrac16 = 1 \\Rightarrow R = 1\\,\\Omega$, so $I = 12\\,\\mathrm{A}$.",
    flags: { diagram: false, graph: false, table: false, chem: false },
  }),
  q({
    number: 3,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    type: "multiple",
    text: "Which of the following species are paramagnetic? (More than one correct)",
    options: opts("$\\mathrm{O_2}$", "$\\mathrm{N_2}$", "$\\mathrm{O_2^-}$", "$\\mathrm{F_2}$"),
    correct: ["A", "C"],
    marks: 4,
    negative: 2,
    explanation:
      "$\\mathrm{O_2}$ and $\\mathrm{O_2^-}$ have unpaired electrons in $\\pi^*$ orbitals.",
    flags: { diagram: false, graph: false, table: false, chem: true },
  }),
  q({
    number: 4,
    subject: "Chemistry",
    chapter: "Thermodynamics",
    type: "assertion",
    text: "**Assertion (A):** For an isothermal reversible expansion of an ideal gas, $\\Delta U = 0$.\n**Reason (R):** Internal energy of an ideal gas depends only on temperature.",
    options: opts(
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true, R is false",
      "A is false, R is true",
    ),
    correct: ["A"],
  }),
  q({
    number: 5,
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "Definite Integrals",
    difficulty: "Hard",
    text: "Evaluate $\\displaystyle\\int_0^{\\pi/2}\\frac{\\sin x}{\\sin x + \\cos x}\\,dx$.",
    options: opts("$\\dfrac{\\pi}{4}$", "$\\dfrac{\\pi}{2}$", "$\\dfrac{\\pi}{3}$", "$\\pi$"),
    correct: ["A"],
    solution:
      "Using the King property $I = \\int_0^{a} f(a-x)dx$, $2I = \\dfrac{\\pi}{2} \\Rightarrow I = \\dfrac{\\pi}{4}$.",
  }),
  q({
    number: 6,
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    type: "integer",
    text: "If $A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$, find $\\det(A)$.",
    answerValue: 5,
    negative: 0,
    solution: "$\\det(A) = 2\\times3 - 1\\times1 = 5$",
  }),
  q({
    number: 7,
    subject: "Mathematics",
    chapter: "Matrices & Determinants",
    type: "matrix",
    text: "Match List-I with List-II.",
    matrix: {
      left: ["$\\lim_{x\\to0}\\frac{\\sin x}{x}$", "$\\frac{d}{dx}(\\ln x)$", "$\\int x\\,dx$"],
      right: ["$1/x$", "$1$", "$x^2/2 + C$"],
    },
    correct: ["B", "A", "C"],
    marks: 4,
    negative: 1,
  }),
  q({
    number: 8,
    subject: "Physics",
    chapter: "Modern Physics",
    type: "table",
    text: "The table shows stopping potential for different frequencies in a photoelectric experiment. Which conclusion is correct?",
    tableHtml:
      "<table><thead><tr><th>Frequency (10¹⁴ Hz)</th><th>Stopping potential (V)</th></tr></thead><tbody><tr><td>5.0</td><td>0.4</td></tr><tr><td>6.0</td><td>0.8</td></tr><tr><td>7.0</td><td>1.2</td></tr></tbody></table>",
    options: opts(
      "Slope gives $h/e$",
      "Slope gives $e/h$",
      "Intercept gives Planck's constant",
      "Stopping potential is independent of frequency",
    ),
    correct: ["A"],
    flags: { diagram: false, graph: false, table: true, chem: false },
  }),
];

export async function seedSampleTest(): Promise<TestSet> {
  const test: TestSet = {
    id: uid("test"),
    name: "JEE Demo Mock — Paper 1",
    description: "Sample test bundled with the platform to demo the CBT interface.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    chapters: [...new Set(SAMPLE_QUESTIONS.map((x) => x.chapter))],
    questionCount: SAMPLE_QUESTIONS.length,
    imageCount: 0,
    missingImages: 0,
    importedAt: Date.now(),
    updatedAt: Date.now(),
    source: "sample",
    durationMin: 30,
    status: "valid",
    issues: [],
    questions: SAMPLE_QUESTIONS.map((x) => ({
      ...x,
      id: `${x.id}_${Math.random().toString(36).slice(2, 6)}`,
    })),
  };
  await putTest(test);
  return test;
}
