import { SkuSlicesChartView } from "@/modules/skus/components/charts/sku-slices-chart";
import type { SliceRangeChartPoint } from "@/types/charts-range";

export interface SkuSlicesChartContainerViewProps {
  items: SliceRangeChartPoint[];
  showStock: boolean;
  showPrice: boolean;
  onShowStockChange: (value: boolean) => void;
  onShowPriceChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
  canPatchSlice?: boolean;
  onPatchSlice?: () => void;
}

export function SkuSlicesChartContainerView(
  props: SkuSlicesChartContainerViewProps,
) {
  return <SkuSlicesChartView {...props} />;
}
