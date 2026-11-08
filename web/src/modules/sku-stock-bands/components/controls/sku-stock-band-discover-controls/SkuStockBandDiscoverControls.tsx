import { SkuStockBandDiscoverControlsView } from "@/modules/sku-stock-bands/components/controls/sku-stock-band-discover-controls/SkuStockBandDiscoverControlsView";

interface SkuStockBandDiscoverControlsProps {
  dateFrom: string;
  dateTo: string;
  isSubmitReady: boolean;
  isFetching: boolean;
  onDateRangeChange: (from: string, to: string) => void;
  onSubmit: () => void;
}

export function SkuStockBandDiscoverControls(
  props: SkuStockBandDiscoverControlsProps,
) {
  return <SkuStockBandDiscoverControlsView {...props} />;
}
