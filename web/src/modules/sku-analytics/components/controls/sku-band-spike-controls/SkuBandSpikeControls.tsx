import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import {
  SkuBandSpikeControlsView,
  type SkuBandSpikeControlsViewProps,
} from "@/modules/sku-analytics/components/controls/sku-band-spike-controls/SkuBandSpikeControlsView";

export interface SkuBandSpikeControlsProps
  extends Omit<SkuBandSpikeControlsViewProps, "konks"> {}

export function SkuBandSpikeControls({
  konk,
  dateFrom,
  dateTo,
  stockMinRaw,
  stockMaxRaw,
  isSubmitReady,
  isFetching,
  onKonkChange,
  onDateRangeChange,
  onStockBandChange,
  onSubmit,
}: SkuBandSpikeControlsProps) {
  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];

  return (
    <SkuBandSpikeControlsView
      konk={konk}
      dateFrom={dateFrom}
      dateTo={dateTo}
      stockMinRaw={stockMinRaw}
      stockMaxRaw={stockMaxRaw}
      konks={konks}
      isSubmitReady={isSubmitReady}
      isFetching={isFetching}
      onKonkChange={onKonkChange}
      onDateRangeChange={onDateRangeChange}
      onStockBandChange={onStockBandChange}
      onSubmit={onSubmit}
    />
  );
}
