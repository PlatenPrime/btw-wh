import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsMetaPanelSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Skeleton className="h-3 w-12" />
        <div className="grid gap-2">
          <MetricChipSkeleton className="w-full" />
          <MetricChipSkeleton className="w-full" />
        </div>
      </div>
    </div>
  );
}
