import { SurfaceSection } from "@/components/shared/layout";
import { SkuStockBandCardSkeleton } from "@/modules/sku-stock-bands/components/cards/sku-stock-band-card";

const SKELETON_ITEMS_COUNT = 8;

export function SkuStockBandsListSkeleton() {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
        <SkuStockBandCardSkeleton key={index} />
      ))}
    </SurfaceSection>
  );
}
