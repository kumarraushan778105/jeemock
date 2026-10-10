import { describe, expect, it, test } from "vitest";
import { hasManualFormatting, splitBlocks } from "@/lib/blocks";
import { mathToHtml } from "@/components/MathText";

test("normal", () => {
  expect(hasManualFormatting("What is the value of x?")).toBe(false);
  expect(splitBlocks("What is x?").length).toBe(1);
});
test("manual blank lines + spaces", () => {
  const t = "Line one\n\nLine two\n   indented";
  expect(hasManualFormatting(t)).toBe(true);
  expect(mathToHtml("a   b", true)).toBe("a   b");
  expect(mathToHtml("a\nb", true)).toBe("a\nb");
  expect(mathToHtml("a\nb")).toBe("a<br/>b");
});
test("assertion reason still labelled", () => {
  const b = splitBlocks("Assertion (A): X is true.\n\nReason (R): because Y.");
  expect(b.map((x) => x.heading)).toEqual(["Assertion (A)", "Reason (R)"]);
});
test("math intact with preserve", () => {
  expect(mathToHtml("$x^2$  ok", true)).toContain("katex");
});

describe("statement-based auto formatting", () => {
  it("separates stem, statements and the answer lead-in", () => {
    const blocks = splitBlocks(
      "Given below are two statements: Statement I : Water is polar. Statement II - Oil is non polar. In the light of the above statements, choose the correct answer:",
    );
    expect(blocks.map((b) => b.heading)).toEqual([
      undefined,
      "Statement I",
      "Statement II",
      undefined,
    ]);
    expect(blocks[0].body).toBe("Given below are two statements:");
    expect(blocks[3].body.startsWith("In the light of the above")).toBe(true);
  });

  it("handles numeric and lettered statements", () => {
    expect(splitBlocks("Statement 1: A. Statement 2: B.").length).toBe(2);
    expect(splitBlocks("Statement A: A. Statement B: B.").length).toBe(2);
  });

  it("leaves plain questions untouched", () => {
    const blocks = splitBlocks("What is the value of x if x + 2 = 5?");
    expect(blocks.length).toBe(1);
    expect(blocks[0].heading).toBeUndefined();
  });
});
