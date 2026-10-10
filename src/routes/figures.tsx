import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Images, Link2, Search, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { LazyImage } from "@/components/ImageViewer";
import { MathText } from "@/components/MathText";
import { listAllImages, listTests, putImage, putTest } from "@/lib/db";
import type { Question, StoredImage, TestSet } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/figures")({
  head: () => ({
    meta: [
      { title: "Figure Library — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Browse every imported diagram, graph and figure, see which question it belongs to, and manually link unmatched images.",
      },
      { property: "og:title", content: "Figure Library — JEE CBT Platform" },
      {
        property: "og:description",
        content: "Every imported figure with its question, subject, chapter and filename.",
      },
    ],
  }),
  component: FiguresPage,
});

function FiguresPage() {
  const qc = useQueryClient();
  const images = useQuery({ queryKey: ["images"], queryFn: listAllImages });
  const tests = useQuery({ queryKey: ["tests"], queryFn: listTests });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "linked" | "unlinked">("all");
  const [mapping, setMapping] = useState<StoredImage | null>(null);
  const [preview, setPreview] = useState<{ img: StoredImage; q?: Question } | null>(null);

  const testMap = useMemo(() => new Map((tests.data ?? []).map((t) => [t.id, t])), [tests.data]);

  const rows = useMemo(() => {
    const list = (images.data ?? []).map((img) => {
      const test = testMap.get(img.testId);
      const q =
        test?.questions.find((x) => x.images.includes(img.id)) ??
        (img.qNumber !== undefined
          ? test?.questions.find((x) => x.number === img.qNumber)
          : undefined);
      return {
        img,
        test,
        q,
        linked: Boolean(test?.questions.some((x) => x.images.includes(img.id))),
      };
    });
    const s = search.trim().toLowerCase();
    return list.filter((r) => {
      if (filter === "linked" && !r.linked) return false;
      if (filter === "unlinked" && r.linked) return false;
      if (!s) return true;
      return [r.img.name, r.img.path, r.test?.name, r.q?.subject, r.q?.chapter, String(r.q?.number)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s));
    });
  }, [images.data, testMap, search, filter]);

  const linkImage = async (img: StoredImage, test: TestSet, questionNumber: number) => {
    const q = test.questions.find((x) => x.number === questionNumber);
    if (!q) return;
    for (const other of test.questions) other.images = other.images.filter((id) => id !== img.id);
    q.images = [...q.images, img.id];
    q.flags.diagram = true;
    await putTest({ ...test, updatedAt: Date.now() });
    await putImage({ ...img, qNumber: questionNumber });
    await qc.invalidateQueries({ queryKey: ["tests"] });
    await qc.invalidateQueries({ queryKey: ["images"] });
    setMapping(null);
    toast.success(`Linked ${img.name} to Q${questionNumber}`);
  };

  return (
    <AppShell>
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Images className="size-5" /> Figure Library
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {images.data?.length ?? 0} images stored on this device. Unlinked images can be mapped to a
        question manually.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search filename, chapter, question…"
            className="w-full rounded-lg border bg-surface py-2 pl-9 pr-3 text-sm"
          />
        </div>
        {(["all", "linked", "unlinked"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-semibold capitalize",
              filter === f ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No figures yet — import a ZIP containing an <code>images/</code> folder.
        </p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map(({ img, test, q, linked }) => (
            <div key={img.id} className="overflow-hidden rounded-xl border bg-card">
              <button
                onClick={() => setPreview({ img, q })}
                className="grid h-36 w-full place-items-center bg-surface p-2"
              >
                <LazyImage id={img.id} alt={img.name} className="max-h-32" />
              </button>
              <div className="space-y-1 border-t p-3 text-xs">
                <div className="truncate font-semibold" title={img.path ?? img.name}>
                  {img.name}
                </div>
                <div className="truncate text-muted-foreground">{test?.name ?? "Unknown set"}</div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {linked && q ? (
                    <>
                      <span className="rounded bg-answered/15 px-1.5 py-0.5 font-semibold text-answered">
                        Q{q.number}
                      </span>
                      <span className="rounded bg-surface px-1.5 py-0.5">{q.subject}</span>
                      <span className="truncate rounded bg-surface px-1.5 py-0.5">{q.chapter}</span>
                    </>
                  ) : (
                    <button
                      onClick={() => setMapping(img)}
                      className="inline-flex items-center gap-1 rounded bg-warning/15 px-1.5 py-0.5 font-semibold text-warning"
                    >
                      <Link2 className="size-3" /> Link to question
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <Overlay onClose={() => setPreview(null)}>
          <div className="grid max-h-[85vh] gap-4 overflow-auto p-5 sm:grid-cols-2">
            <LazyImage
              id={preview.img.id}
              alt={preview.img.name}
              className="w-full rounded-lg bg-surface"
            />
            <div className="text-sm">
              <div className="text-xs text-muted-foreground">
                {preview.img.path ?? preview.img.name}
              </div>
              {preview.q ? (
                <>
                  <div className="mt-2 font-bold">Question {preview.q.number}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {preview.q.subject} · {preview.q.chapter}
                  </div>
                  <MathText className="mt-3 text-sm">{preview.q.text}</MathText>
                  <Link
                    to="/bank"
                    search={{ edit: undefined, q: undefined }}
                    className="mt-4 inline-block rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    Open in Question Bank
                  </Link>
                </>
              ) : (
                <p className="mt-2 text-muted-foreground">
                  This figure is not linked to a question.
                </p>
              )}
            </div>
          </div>
        </Overlay>
      )}

      {mapping && (
        <Overlay onClose={() => setMapping(null)}>
          <MapDialog
            img={mapping}
            test={testMap.get(mapping.testId)}
            onLink={(n) => {
              const t = testMap.get(mapping.testId);
              if (t) void linkImage(mapping, t, n);
            }}
          />
        </Overlay>
      )}
    </AppShell>
  );
}

function MapDialog({
  img,
  test,
  onLink,
}: {
  img: StoredImage;
  test?: TestSet;
  onLink: (n: number) => void;
}) {
  const [q, setQ] = useState("");
  const list = (test?.questions ?? []).filter(
    (x) =>
      !q.trim() ||
      String(x.number).includes(q.trim()) ||
      x.text.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <div className="flex max-h-[85vh] flex-col p-5">
      <h2 className="text-sm font-bold">Link “{img.name}” to a question</h2>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by number or text"
        className="mt-3 rounded-lg border bg-surface px-3 py-2 text-sm"
      />
      <div className="scroll-slim mt-3 space-y-1 overflow-auto">
        {list.slice(0, 200).map((x) => (
          <button
            key={x.id}
            onClick={() => onLink(x.number)}
            className="block w-full truncate rounded-lg border bg-surface px-3 py-2 text-left text-xs hover:border-primary"
          >
            <span className="font-semibold">Q{x.number}</span> · {x.subject} — {x.text.slice(0, 90)}
          </button>
        ))}
        {list.length === 0 && (
          <p className="text-xs text-muted-foreground">No questions in this set.</p>
        )}
      </div>
    </div>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border bg-card shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-md border bg-card"
        >
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
