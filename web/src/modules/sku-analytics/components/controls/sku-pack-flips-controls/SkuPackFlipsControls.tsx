import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import {
  SkuPackFlipsControlsView,
  type SkuPackFlipsControlsViewProps,
} from "@/modules/sku-analytics/components/controls/sku-pack-flips-controls/SkuPackFlipsControlsView";

export interface SkuPackFlipsControlsProps
  extends Omit<SkuPackFlipsControlsViewProps, "konks"> {}

export function SkuPackFlipsControls({
  konk,
  dateFrom,
  dateTo,
  isSubmitReady,
  isFetching,
  onKonkChange,
  onDateRangeChange,
  onSubmit,
}: SkuPackFlipsControlsProps) {
  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];

  return (
    <SkuPackFlipsControlsView
      konk={konk}
      dateFrom={dateFrom}
      dateTo={dateTo}
      konks={konks}
      isSubmitReady={isSubmitReady}
      isFetching={isFetching}
      onKonkChange={onKonkChange}
      onDateRangeChange={onDateRangeChange}
      onSubmit={onSubmit}
    />
  );
}
