import { ContentRevealStagger } from "@/components/shared/motion";
import { SurfaceSection } from "@/components/shared/layout";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandCard } from "@/modules/sku-stock-bands/components/cards/sku-stock-band-card";

interface SkuStockBandsListProps {
  bands: SkuStockBandDto[];
}

export function SkuStockBandsList({ bands }: SkuStockBandsListProps) {
  return (
    <SurfaceSection className="p-2">
      <ContentRevealStagger className="grid grid-cols-1 gap-2">
        {bands.map((band) => (
          <SkuStockBandCard key={band._id} band={band} />
        ))}
      </ContentRevealStagger>
    </SurfaceSection>
  );
}
