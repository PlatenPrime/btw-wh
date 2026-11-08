import type { SkuStockBandsListResponse } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandsList } from "@/modules/sku-stock-bands/components/lists/sku-stock-bands-list";

interface SkuStockBandsContainerViewProps {
  data: SkuStockBandsListResponse;
}

export function SkuStockBandsContainerView({
  data,
}: SkuStockBandsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <SkuStockBandsList bands={data.data} />
    </div>
  );
}
