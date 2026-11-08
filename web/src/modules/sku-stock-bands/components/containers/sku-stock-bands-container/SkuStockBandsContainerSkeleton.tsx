import { SkuStockBandsListSkeleton } from "@/modules/sku-stock-bands/components/lists/sku-stock-bands-list";

export function SkuStockBandsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <SkuStockBandsListSkeleton />
    </div>
  );
}
