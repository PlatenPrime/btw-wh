import { Skeleton } from "@/components/ui/skeleton";
import { MetricChipSkeleton } from "@/components/shared/elements";

export function BtradeArtDataPanelSkeleton() {
  return (
    <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
      <Skeleton className="h-3.5 w-16" />
      <div className="flex flex-wrap gap-2">
        <MetricChipSkeleton />
        <MetricChipSkeleton />
      </div>
    </div>
  );
}
