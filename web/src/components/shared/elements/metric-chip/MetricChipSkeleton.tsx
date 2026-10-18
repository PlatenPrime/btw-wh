import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MetricChipSkeletonProps {
  className?: string;
}

export function MetricChipSkeleton({ className }: MetricChipSkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border/50 px-2.5 py-2 shadow-elevation-1 glass-inset",
        className,
      )}
    >
      <Skeleton className="size-8 shrink-0 rounded-lg" />
      <div className="grid gap-0.5">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
