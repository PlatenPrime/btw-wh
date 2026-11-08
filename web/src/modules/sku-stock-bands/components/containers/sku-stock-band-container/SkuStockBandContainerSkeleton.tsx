import { SkuStockBandDetailsCardSkeleton } from "@/modules/sku-stock-bands/components/cards/sku-stock-band-details-card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuStockBandContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <SkuStockBandDetailsCardSkeleton />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}
