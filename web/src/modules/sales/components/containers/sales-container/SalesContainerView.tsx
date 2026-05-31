import type { SalesComparisonSummary } from "@/modules/sales/api/types";
import { SalesSummaryView } from "@/modules/sales/components/containers/sales-summary-container/SalesSummaryView";
import type { ReactNode } from "react";

export interface SalesContainerViewProps {
  summary?: SalesComparisonSummary;
  chart: ReactNode;
}

export function SalesContainerView({ summary, chart }: SalesContainerViewProps) {
  return (
    <div className="grid gap-4">
      {summary ? <SalesSummaryView summary={summary} /> : null}
      {chart}
    </div>
  );
}
