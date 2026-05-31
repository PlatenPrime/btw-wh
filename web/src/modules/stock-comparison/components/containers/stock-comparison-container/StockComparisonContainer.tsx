import type { StockComparisonResponse } from "@/modules/stock-comparison/api/types";
import { StockChartContainer } from "@/modules/stock-comparison/components/containers/stock-chart-container/StockChartContainer";
import { StockComparisonContainerView } from "./StockComparisonContainerView";

export interface StockComparisonContainerProps {
  data: StockComparisonResponse;
}

export function StockComparisonContainer({ data }: StockComparisonContainerProps) {
  const days = data.data.days;
  const summary = data.data.summary;

  return (
    <StockComparisonContainerView
      summary={summary}
      chart={<StockChartContainer days={days} />}
    />
  );
}
