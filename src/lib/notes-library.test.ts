import assert from "node:assert/strict";
import test from "node:test";
import { groupLibraryNotesBySubjectAndChapter } from "./notes-library.ts";

test("groups notes by subject and chapter without duplicating folders", () => {
  const notes = [
    {
      id: "1",
      title: "Kinematics notes",
      subject: "Physics",
      chapter: "Kinematics",
      kind: "pdf" as const,
      name: "notes.pdf",
      type: "application/pdf",
      size: 100,
      blob: new Blob(["x"], { type: "application/pdf" }),
      createdAt: 2,
    },
    {
      id: "2",
      title: "Units notes",
      subject: "Physics",
      chapter: "Units & Dimensions",
      kind: "image" as const,
      name: "units.png",
      type: "image/png",
      size: 100,
      blob: new Blob(["x"], { type: "image/png" }),
      createdAt: 1,
    },
    {
      id: "3",
      title: "Chemistry notes",
      subject: "Chemistry",
      chapter: "Mole Concept",
      kind: "image" as const,
      name: "chem.jpg",
      type: "image/jpeg",
      size: 100,
      blob: new Blob(["x"], { type: "image/jpeg" }),
      createdAt: 3,
    },
  ];

  const groups = groupLibraryNotesBySubjectAndChapter(notes);

  assert.deepEqual(
    groups.map((group) => ({ subject: group.subject, chapter: group.chapter })),
    [
      { subject: "Physics", chapter: "Kinematics" },
      { subject: "Physics", chapter: "Units & Dimensions" },
      { subject: "Chemistry", chapter: "Mole Concept" },
    ],
  );
  assert.equal(groups[0]?.notes[0]?.id, "1");
  assert.equal(groups[2]?.notes[0]?.id, "3");
});
