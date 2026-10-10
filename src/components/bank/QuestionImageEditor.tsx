import { useRef, useState } from "react";
import { ImagePlus, Trash2, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { ImageViewer, LazyImage } from "@/components/ImageViewer";
import { deleteImage, forgetImageUrl, putImage } from "@/lib/db";
import { cn } from "@/lib/utils";

const OK = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

/**
 * Image-based question support for the Question Bank editor: upload, drag & drop
 * or paste (Ctrl+V) a screenshot. Images are stored byte-for-byte — no OCR, no
 * conversion — and rendered in CBT exactly as stored.
 */
export function QuestionImageEditor({
  testId,
  images,
  onChange,
  label = "Question images",
  hint,
}: {
  testId: string;
  images: string[];
  onChange: (ids: string[]) => void;
  /** section label — e.g. "Option A image" */
  label?: string;
  /** replaces the default drop-zone helper text */
  hint?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const [replace, setReplace] = useState<string | null>(null);

  const store = async (files: File[]) => {
    const valid = files.filter((f) => OK.includes(f.type.toLowerCase()));
    if (valid.length === 0) {
      toast.error("Only PNG, JPG, JPEG or WEBP images are supported");
      return;
    }
    const ids: string[] = [];
    for (const f of valid) {
      const id = `${testId}::img_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
      await putImage({ id, testId, name: f.name || "pasted-image.png", blob: f, kind: "figure" });
      ids.push(id);
    }
    if (replace) {
      onChange(images.map((i) => (i === replace ? ids[0] : i)));
      forgetImageUrl(replace);
      await deleteImage(replace);
      setReplace(null);
      toast.success("Image replaced — save the question to keep it");
    } else {
      onChange([...images, ...ids]);
      toast.success(`${ids.length} image(s) attached — save the question to keep it`);
    }
  };

  const removeAt = async (id: string) => {
    onChange(images.filter((i) => i !== id));
    forgetImageUrl(id);
    await deleteImage(id);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase text-muted-foreground">
          {label} ({images.length})
        </span>
        <button
          type="button"
          onClick={() => {
            setReplace(null);
            fileRef.current?.click();
          }}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold"
        >
          <ImagePlus className="size-3.5" /> Upload image
        </button>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          void store(Array.from(e.dataTransfer.files));
        }}
        onPaste={(e) => {
          const files = Array.from(e.clipboardData.files);
          if (files.length) {
            e.preventDefault();
            void store(files);
          }
        }}
        tabIndex={0}
        className={cn(
          "rounded-lg border border-dashed p-3 text-center text-[11px] text-muted-foreground outline-none focus:ring-2 focus:ring-ring",
          over && "border-primary bg-primary/5",
        )}
      >
        {hint ?? (
          <>
            Drag &amp; drop an image here, or click this box and press Ctrl+V to paste a screenshot.
            <br />
            PNG · JPG · JPEG · WEBP — stored exactly as uploaded.
          </>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (files.length) void store(files);
        }}
      />

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((id, i) => (
            <div key={id} className="rounded-lg border bg-card p-1.5">
              <LazyImage
                id={id}
                alt={`Question image ${i + 1}`}
                className="max-h-28 rounded"
                onClick={() => setViewer(i)}
              />
              <div className="mt-1 flex justify-center gap-1">
                <IconBtn label="Full preview" onClick={() => setViewer(i)}>
                  <ZoomIn className="size-3" />
                </IconBtn>
                <IconBtn
                  label="Replace image"
                  onClick={() => {
                    setReplace(id);
                    fileRef.current?.click();
                  }}
                >
                  <ImagePlus className="size-3" />
                </IconBtn>
                <IconBtn label="Delete image" danger onClick={() => void removeAt(id)}>
                  <Trash2 className="size-3" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewer !== null && (
        <ImageViewer ids={images} startIndex={viewer} onClose={() => setViewer(null)} />
      )}
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "rounded border p-1 hover:bg-accent",
        danger && "border-destructive/40 text-destructive",
      )}
    >
      {children}
    </button>
  );
}
