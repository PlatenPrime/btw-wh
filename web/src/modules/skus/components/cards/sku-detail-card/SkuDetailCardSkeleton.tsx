import { DetailPanelCard } from "@/components/shared/cards";
import { CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SkuLiveStockContainerSkeleton } from "@/modules/skus/components/containers/sku-live-stock-container";

export function SkuDetailCardSkeleton() {
  return (
    <DetailPanelCard className="overflow-hidden p-0">
      <Skeleton className="h-10 w-full rounded-none" />
      <CardHeader className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-start">
        <Skeleton className="size-40 shrink-0 rounded-lg" />
        <div className="grid min-w-0 flex-1 gap-3">
          <Skeleton className="h-6 w-full max-w-xl" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-28 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
          <SkuLiveStockContainerSkeleton />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardHeader>
    </DetailPanelCard>
  );
}
