import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChipSkeleton } from "@/components/shared/elements";
import { Skeleton } from "@/components/ui/skeleton";
import { SkuLiveStockContainerSkeleton } from "@/modules/skus/components/containers/sku-live-stock-container";

export function SkuDetailCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <Skeleton className="h-10 w-full rounded-none" />
      <div className="grid gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-4">
          <Skeleton className="size-16 shrink-0 rounded-lg sm:size-20" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <MetricChipSkeleton className="w-full" />
          <MetricChipSkeleton className="w-full" />
          <MetricChipSkeleton className="w-full" />
          <SkuLiveStockContainerSkeleton />
          <MetricChipSkeleton className="w-full" />
        </div>
      </div>
    </DetailPanelCard>
  );
}
