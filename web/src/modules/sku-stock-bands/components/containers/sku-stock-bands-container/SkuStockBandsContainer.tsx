import type { SkuStockBandsListResponse } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandsContainerView } from "@/modules/sku-stock-bands/components/containers/sku-stock-bands-container/SkuStockBandsContainerView";

interface SkuStockBandsContainerProps {
  data: SkuStockBandsListResponse;
}

export function SkuStockBandsContainer({ data }: SkuStockBandsContainerProps) {
  return <SkuStockBandsContainerView data={data} />;
}
