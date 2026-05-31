import {
  AnalogSalesChartView,
} from "@/modules/analogs/components/charts/analog-sales-chart";

export interface AnalogSalesChartContainerViewProps {
  items: Parameters<typeof AnalogSalesChartView>[0]["items"];
  showSales: boolean;
  showRevenue: boolean;
  onShowSalesChange: (value: boolean) => void;
  onShowRevenueChange: (value: boolean) => void;
}

export function AnalogSalesChartContainerView(
  props: AnalogSalesChartContainerViewProps,
) {
  return <AnalogSalesChartView {...props} />;
}
