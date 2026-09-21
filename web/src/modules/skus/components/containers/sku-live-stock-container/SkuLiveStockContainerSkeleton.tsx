import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuLiveStockContainerSkeleton() {
  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      <MetricChipSkeleton />
      <MetricChipSkeleton />
      <Skeleton className="size-8 shrink-0 rounded-lg" />
    </div>
  );
}
