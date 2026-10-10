import { useCallback, useRef, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  FileJson,
  FileWarning,
  FolderArchive,
  ImagePlus,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { buildTestFromFiles, readZip, type RawImageFile } from "@/lib/import";
import { EXAM_LABEL, type ExamKind, type ImportIssue } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import Tests — JEE CBT Platform" },
      {
        name: "description",
        content:
          "Import JEE question sets from ZIP archives or JSON files with automatic image detection, nested folder handling and validation.",
      },
      { property: "og:title", content: "Import Tests — JEE CBT Platform" },
      {
        property: "og:description",
        content: "ZIP and JSON importer with automatic diagram linking and import validation.",
      },
    ],
  }),
  component: ImportPage,
});

function ImportPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<ImportIssue[]>([]);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [exam, setExam] = useState<ExamKind>("main");
  const examRef = useRef(exam);
  examRef.current = exam;

  const handleFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;
      setBusy(true);
      setLog([]);
      const issues: ImportIssue[] = [];
      try {
        const pdf = files.find((f) => /\.pdf$/i.test(f.name));
        if (pdf) {
          issues.push({
            level: "error",
            message: `PDF import is not supported by this platform — "${pdf.name}" was skipped. Convert questions to JSON (with images as PNG/JPG) and re-import.`,
          });
        }

        let jsonText: string | null = null;
        let jsonName = "Imported test";
        const images: RawImageFile[] = [];

        for (const f of files) {
          if (/\.zip$/i.test(f.name)) {
            const { jsons, images: zipImages } = await readZip(f);
            issues.push({
              level: "warning",
              message: `${f.name}: found ${jsons.length} JSON file(s) and ${zipImages.length} image(s).`,
            });
            images.push(...zipImages);
            if (!jsonText && jsons.length) {
              // prefer the shallowest / largest json
              const best = [...jsons].sort(
                (a, b) =>
                  a.path.split("/").length - b.path.split("/").length ||
                  b.text.length - a.text.length,
              )[0];
              jsonText = best.text;
              jsonName = f.name.replace(/\.zip$/i, "");
            }
          } else if (/\.json$/i.test(f.name)) {
            if (!jsonText) {
              jsonText = await f.text();
              jsonName = f.name.replace(/\.json$/i, "");
            }
          } else if (/\.(png|jpe?g|webp)$/i.test(f.name)) {
            images.push({ path: f.name, blob: f });
          }
        }

        if (!jsonText) {
          issues.push({
            level: "error",
            message: "No JSON question file was found. Add a .json file (or a ZIP containing one).",
          });
          setLog(issues);
          toast.error("Import failed — no question JSON found");
          return;
        }

        const { test, issues: buildIssues } = await buildTestFromFiles({
          name: jsonName,
          jsonText,
          images,
          source: images.length ? "zip" : "json",
          exam: examRef.current,
        });
        const all = [...issues, ...buildIssues];
        setLog(all);
        qc.invalidateQueries({ queryKey: ["tests"] });
        qc.invalidateQueries({ queryKey: ["adv"] });
        toast.success(
          `Imported "${test.name}" — ${test.questionCount} questions, ${test.imageCount} images`,
        );
        setTimeout(
          () => router.navigate({ to: "/bank", search: { edit: undefined, q: undefined } }),
          900,
        );
      } catch (err) {
        console.error("[import] failed", err);
        setLog([...issues, { level: "error", message: (err as Error).message }]);
        toast.error("Import failed — see the report below");
      } finally {
        setBusy(false);
      }
    },
    [qc, router],
  );

  return (
    <AppShell>
      <h1 className="text-2xl font-bold tracking-tight">Import Test</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Drop a ZIP bundle (questions JSON + images folder), a standalone JSON file, or loose images.
        Nested folders and relative image paths are resolved automatically, and the import continues
        even when some images are missing.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase text-muted-foreground">Import into</span>
        {(["main", "advanced"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setExam(k)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              exam === k ? "border-primary bg-primary text-primary-foreground" : "bg-card",
            )}
          >
            {EXAM_LABEL[k]}
          </button>
        ))}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(Array.from(e.dataTransfer.files));
        }}
        className={cn(
          "mt-6 grid place-items-center rounded-2xl border-2 border-dashed p-12 text-center transition-colors",
          drag ? "border-primary bg-primary/5" : "bg-card",
        )}
      >
        {busy ? (
          <Loader2 className="size-8 animate-spin text-primary" />
        ) : (
          <UploadCloud className="size-8 text-muted-foreground" />
        )}
        <p className="mt-3 text-sm font-medium">
          {busy ? "Processing import…" : "Drag & drop files here"}
        </p>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          Browse files
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept=".zip,.json,.png,.jpg,.jpeg,.webp,.pdf"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Fmt
          icon={<FolderArchive className="size-4" />}
          title="ZIP (preferred)"
          desc="JSON + images/ in any nested layout"
        />
        <Fmt
          icon={<FileJson className="size-4" />}
          title="JSON"
          desc="Array of questions or { questions: [...] }"
        />
        <Fmt
          icon={<ImagePlus className="size-4" />}
          title="Images"
          desc="PNG · JPG · JPEG · WEBP, Q1.png auto-links to Q1"
        />
        <Fmt
          icon={<FileWarning className="size-4" />}
          title="PDF"
          desc="Not supported — reported, never silently dropped"
        />
      </div>

      {log.length > 0 && (
        <div className="mt-6 rounded-xl border bg-card p-4">
          <h2 className="mb-2 text-sm font-bold uppercase">Import report</h2>
          <ul className="scroll-slim max-h-72 space-y-1 overflow-auto text-xs">
            {log.map((i, idx) => (
              <li
                key={idx}
                className={cn(
                  "rounded px-2 py-1",
                  i.level === "error"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-warning/10 text-warning",
                )}
              >
                {i.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <details className="mt-6 rounded-xl border bg-card p-4 text-sm">
        <summary className="cursor-pointer font-semibold">Expected JSON format</summary>
        <pre className="scroll-slim mt-3 overflow-auto rounded-lg bg-surface p-3 text-xs">
          {`{
  "name": "JEE Main Mock 01",
  "duration": 180,
  "questions": [
    {
      "number": 1,
      "subject": "Physics",
      "chapter": "Kinematics",
      "topic": "Projectile",
      "difficulty": "Medium",
      "type": "single",           // single | multiple | integer | numerical |
                                  // matrix | assertion | paragraph | diagram | graph | table
      "question": "Find $H$ if $u=20$ m/s and $\\\\theta=30^\\\\circ$.",
      "options": ["$5$ m", "$10$ m", "$15$ m", "$20$ m"],
      "correct": "A",             // or ["A","C"], or 5 for integer/numerical
      "images": ["images/q1.png"],
      "solution": "$H=\\\\dfrac{u^2\\\\sin^2\\\\theta}{2g}$",
      "marks": 4,
      "negative": 1
    }
  ]
}`}
        </pre>
      </details>
    </AppShell>
  );
}

function Fmt({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}
