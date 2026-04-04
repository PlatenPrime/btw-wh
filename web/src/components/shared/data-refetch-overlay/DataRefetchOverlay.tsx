import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface DataRefetchOverlayProps {
  isFetching: boolean;
  /** When true, overlay is hidden (initial load uses skeletons elsewhere). */
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function DataRefetchOverlay({
  isFetching,
  isLoading = false,
  children,
  className,
}: DataRefetchOverlayProps) {
  const showOverlay = isFetching && !isLoading;

  return (
    <div className={cn("relative min-h-0", className)}>
      {children}
      {showOverlay ? (
        <div
          className="pointer-events-none absolute inset-0 z-[5] flex items-start justify-center rounded-[inherit] bg-background/45 pt-6 backdrop-blur-[1px]"
          aria-busy
          aria-label="Оновлення даних"
        >
          <span className="text-muted-foreground flex items-center gap-2 rounded-md border bg-background/95 px-3 py-1.5 text-xs font-medium shadow-sm">
            <Loader2 className="size-3.5 shrink-0 animate-spin" />
            Оновлення…
          </span>
        </div>
      ) : null}
    </div>
  );
}
