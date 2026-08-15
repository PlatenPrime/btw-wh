import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChipSkeleton } from "@/components/shared/elements";
import { CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GraboSkuDetailCardSkeleton() {
  return (
    <DetailPanelCard className="overflow-hidden p-0">
      <CardHeader className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
        <Skeleton className="mx-auto size-40 shrink-0 rounded-lg sm:mx-0" />
        <div className="grid min-w-0 flex-1 gap-2">
          <Skeleton className="h-6 w-full max-w-xl" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardHeader>
      <div className="flex flex-wrap justify-center gap-3 px-6 pb-4 sm:justify-start">
        <Skeleton className="size-40 rounded-lg" />
        <Skeleton className="size-40 rounded-lg" />
        <Skeleton className="size-40 rounded-lg" />
      </div>
      <div className="flex flex-wrap gap-2 px-6 pb-6">
        <MetricChipSkeleton />
        <MetricChipSkeleton />
        <MetricChipSkeleton />
        <MetricChipSkeleton />
      </div>
    </DetailPanelCard>
  );
}
