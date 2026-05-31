import { SkuSalesChartView } from "@/modules/skus/components/charts/sku-sales-chart";
import type { SalesRangeChartPoint } from "@/types/charts-range";

export interface SkuSalesChartContainerViewProps {
  items: SalesRangeChartPoint[];
  showSales: boolean;
  showRevenue: boolean;
  onShowSalesChange: (value: boolean) => void;
  onShowRevenueChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function SkuSalesChartContainerView(props: SkuSalesChartContainerViewProps) {
  return <SkuSalesChartView {...props} />;
}
