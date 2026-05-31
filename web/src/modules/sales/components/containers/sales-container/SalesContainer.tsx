import type { SalesComparisonResponse } from "@/modules/sales/api/types";
import { SalesChartContainer } from "@/modules/sales/components/containers/sales-chart-container/SalesChartContainer";
import { SalesContainerView } from "./SalesContainerView";

export interface SalesContainerProps {
  data: SalesComparisonResponse;
}

export function SalesContainer({ data }: SalesContainerProps) {
  const days = data.data.days;
  const summary = data.data.summary;

  return (
    <SalesContainerView
      summary={summary}
      chart={<SalesChartContainer days={days} />}
    />
  );
}
