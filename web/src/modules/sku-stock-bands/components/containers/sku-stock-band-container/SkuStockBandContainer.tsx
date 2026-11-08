import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandDetailHeaderActions } from "@/modules/sku-stock-bands/components/actions/sku-stock-band-detail-header-actions";
import { SkuStockBandContainerView } from "@/modules/sku-stock-bands/components/containers/sku-stock-band-container/SkuStockBandContainerView";

interface SkuStockBandContainerProps {
  band: SkuStockBandDto;
  dateFrom: string;
  dateTo: string;
  isSubmitReady: boolean;
  isFetching: boolean;
  canFetch: boolean;
  onDateRangeChange: (from: string, to: string) => void;
  onSubmit: () => void;
}

export function SkuStockBandContainer({
  band,
  dateFrom,
  dateTo,
  isSubmitReady,
  isFetching,
  canFetch,
  onDateRangeChange,
  onSubmit,
}: SkuStockBandContainerProps) {
  return (
    <SkuStockBandContainerView
      band={band}
      dateFrom={dateFrom}
      dateTo={dateTo}
      isSubmitReady={isSubmitReady}
      isFetching={isFetching}
      canFetch={canFetch}
      onDateRangeChange={onDateRangeChange}
      onSubmit={onSubmit}
      headerActions={<SkuStockBandDetailHeaderActions band={band} />}
    />
  );
}
