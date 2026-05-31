import { AnalogSlicesChartView } from "@/modules/analogs/components/charts/analog-slices-chart";

export interface AnalogSlicesChartContainerViewProps {
  items: Parameters<typeof AnalogSlicesChartView>[0]["items"];
  showStock: boolean;
  showPrice: boolean;
  onShowStockChange: (value: boolean) => void;
  onShowPriceChange: (value: boolean) => void;
}

export function AnalogSlicesChartContainerView(
  props: AnalogSlicesChartContainerViewProps,
) {
  return <AnalogSlicesChartView {...props} />;
}
