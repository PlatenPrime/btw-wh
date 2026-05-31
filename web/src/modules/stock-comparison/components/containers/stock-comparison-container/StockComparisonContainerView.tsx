import type { StockComparisonSummary } from "@/modules/stock-comparison/api/types";
import { StockSummaryView } from "@/modules/stock-comparison/components/containers/stock-summary-container/StockSummaryView";
import type { ReactNode } from "react";

export interface StockComparisonContainerViewProps {
  summary?: StockComparisonSummary;
  chart: ReactNode;
}

export function StockComparisonContainerView({
  summary,
  chart,
}: StockComparisonContainerViewProps) {
  return (
    <div className="grid gap-4">
      {summary ? <StockSummaryView summary={summary} /> : null}
      {chart}
    </div>
  );
}
