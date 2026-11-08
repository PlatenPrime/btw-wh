import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { SkuStockBandDiscoverTableSkeleton } from "@/modules/sku-stock-bands/components/tables/sku-stock-band-discover-table";

export function SkuStockBandDiscoverContainerSkeleton() {
  return (
    <SurfaceSection className="grid gap-3 p-2">
      <div className="flex items-center justify-between gap-3">
        <div className="grid gap-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-9 w-44" />
      </div>
      <SkuStockBandDiscoverTableSkeleton />
    </SurfaceSection>
  );
}
