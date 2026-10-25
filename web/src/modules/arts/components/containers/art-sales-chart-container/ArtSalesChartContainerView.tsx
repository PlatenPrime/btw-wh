import type { ArtSalesChartSummary } from "@/modules/arts/api/types/art-reports";
import { ArtSalesChartView } from "@/modules/arts/components/charts/art-sales-chart";
import { ArtSalesSummaryView } from "@/modules/arts/components/charts/art-sales-summary";
import type { SalesRangeChartPoint } from "@/types/charts-range";

export interface ArtSalesChartContainerViewProps {
  items: SalesRangeChartPoint[];
  summary: ArtSalesChartSummary;
  showSales: boolean;
  showRevenue: boolean;
  onShowSalesChange: (value: boolean) => void;
  onShowRevenueChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function ArtSalesChartContainerView({
  items,
  summary,
  showSales,
  showRevenue,
  onShowSalesChange,
  onShowRevenueChange,
  isFetching,
  isLoading,
}: ArtSalesChartContainerViewProps) {
  return (
    <div className="grid gap-3">
      <ArtSalesSummaryView summary={summary} />
      <ArtSalesChartView
        items={items}
        showSales={showSales}
        showRevenue={showRevenue}
        onShowSalesChange={onShowSalesChange}
        onShowRevenueChange={onShowRevenueChange}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </div>
  );
}
