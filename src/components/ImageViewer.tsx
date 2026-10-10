import { useEffect, useRef, useState } from "react";
import { Maximize2, Minus, Plus, RotateCw, X, Move } from "lucide-react";
import { imageUrl } from "@/lib/db";
import { cn } from "@/lib/utils";

export function useImageUrl(id: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    if (!id) {
      setUrl(null);
      return;
    }
    imageUrl(id)
      .then((u) => alive && setUrl(u))
      .catch((e) => console.error("[image] load failed", id, e));
    return () => {
      alive = false;
    };
  }, [id]);
  return url;
}

export function LazyImage({
  id,
  alt,
  className,
  onClick,
}: {
  id: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const url = useImageUrl(id);
  if (!url) {
    return (
      <div
        className={cn(
          "flex h-28 items-center justify-center rounded-md border border-dashed bg-muted/40 text-xs text-muted-foreground",
          className,
        )}
      >
        image unavailable
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      onClick={onClick}
      className={cn("max-w-full object-contain", onClick && "cursor-zoom-in", className)}
    />
  );
}

/** Zoom / pan / rotate / fullscreen viewer for a gallery of stored images. */
export function ImageViewer({
  ids,
  startIndex = 0,
  onClose,
}: {
  ids: string[];
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const url = useImageUrl(ids[index]);

  useEffect(() => {
    setScale(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(8, s * 1.2));
      if (e.key === "-") setScale((s) => Math.max(0.2, s / 1.2));
      if (e.key === "r") setRotation((r) => (r + 90) % 360);
      if (e.key === "ArrowRight") setIndex((i) => Math.min(ids.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ids.length, onClose]);

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-100 flex flex-col bg-background/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm text-muted-foreground">
          Figure {index + 1} of {ids.length}
        </span>
        <div className="flex items-center gap-1">
          <ViewerBtn onClick={() => setScale((s) => Math.max(0.2, s / 1.2))} label="Zoom out">
            <Minus className="size-4" />
          </ViewerBtn>
          <span className="w-14 text-center font-mono text-xs">{Math.round(scale * 100)}%</span>
          <ViewerBtn onClick={() => setScale((s) => Math.min(8, s * 1.2))} label="Zoom in">
            <Plus className="size-4" />
          </ViewerBtn>
          <ViewerBtn onClick={() => setRotation((r) => (r + 90) % 360)} label="Rotate">
            <RotateCw className="size-4" />
          </ViewerBtn>
          <ViewerBtn
            onClick={() => {
              const el = shellRef.current;
              if (!el) return;
              if (document.fullscreenElement) document.exitFullscreen();
              else el.requestFullscreen?.();
            }}
            label="Fullscreen"
          >
            <Maximize2 className="size-4" />
          </ViewerBtn>
          <ViewerBtn onClick={onClose} label="Close">
            <X className="size-4" />
          </ViewerBtn>
        </div>
      </div>

      <div
        className="relative flex-1 overflow-hidden"
        onWheel={(e) => {
          if (!e.ctrlKey && !e.metaKey) return;
          e.preventDefault();
          setScale((s) => Math.min(8, Math.max(0.2, s * (e.deltaY < 0 ? 1.1 : 0.9))));
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
        }}
        onPointerUp={() => (drag.current = null)}
      >
        {url ? (
          <img
            src={url}
            alt={`Figure ${index + 1}`}
            draggable={false}
            className="absolute top-1/2 left-1/2 h-[calc(100vh-8rem)] w-[96vw] object-contain select-none"
            style={{
              transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${scale}) rotate(${rotation}deg)`,
              transition: drag.current ? "none" : "transform 120ms ease-out",
              imageRendering: "auto",
            }}
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            Image unavailable
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-card/90 px-3 py-1 text-xs text-muted-foreground shadow">
          <Move className="size-3" /> drag to pan · ctrl+scroll to zoom · R to rotate
        </div>
      </div>

      {ids.length > 1 && (
        <div className="scroll-slim flex gap-2 overflow-x-auto border-t p-2">
          {ids.map((id, i) => (
            <button
              key={id}
              onClick={() => setIndex(i)}
              className={cn(
                "size-16 shrink-0 overflow-hidden rounded border-2 bg-muted",
                i === index ? "border-primary" : "border-transparent",
              )}
            >
              <LazyImage id={id} alt={`thumb ${i + 1}`} className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ViewerBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-8 place-items-center rounded-md border bg-card text-foreground transition-colors hover:bg-accent"
    >
      {children}
    </button>
  );
}
