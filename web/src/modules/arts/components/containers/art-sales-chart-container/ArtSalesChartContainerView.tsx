import type { ArtSalesChartSummary } from "@/modules/arts/api/types/art-reports";
import { ArtChartCard } from "@/modules/arts/components/charts/art-chart-card";
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
    <div className="grid h-full gap-3 grid-rows-[auto_1fr]">
      <ArtSalesSummaryView summary={summary} />
      <ArtChartCard>
        <ArtSalesChartView
          items={items}
          showSales={showSales}
          showRevenue={showRevenue}
          onShowSalesChange={onShowSalesChange}
          onShowRevenueChange={onShowRevenueChange}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </ArtChartCard>
    </div>
  );
}
