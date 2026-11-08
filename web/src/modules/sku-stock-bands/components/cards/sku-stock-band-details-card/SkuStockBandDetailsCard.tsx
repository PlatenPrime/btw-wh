import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandDetailsCardView } from "@/modules/sku-stock-bands/components/cards/sku-stock-band-details-card/SkuStockBandDetailsCardView";

interface SkuStockBandDetailsCardProps {
  band: SkuStockBandDto;
}

export function SkuStockBandDetailsCard({ band }: SkuStockBandDetailsCardProps) {
  return <SkuStockBandDetailsCardView band={band} />;
}
