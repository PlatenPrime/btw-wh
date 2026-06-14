import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import type {
  ArtStockChartDay,
  ArtStockChartSummary,
} from "@/modules/arts/api/types/art-reports";
import { ArtChartCard } from "@/modules/arts/components/charts/art-chart-card";
import { ArtStockChartView } from "@/modules/arts/components/charts/art-stock-chart";
import { ArtStockSummaryView } from "@/modules/arts/components/charts/art-stock-summary";

export interface ArtStockChartContainerViewProps {
  days: ArtStockChartDay[];
  summary: ArtStockChartSummary;
  isFetching: boolean;
  isLoading: boolean;
}

export function ArtStockChartContainerView({
  days,
  summary,
  isFetching,
  isLoading,
}: ArtStockChartContainerViewProps) {
  return (
    <div className="grid h-full gap-3 grid-rows-[auto_1fr]">
      <ArtStockSummaryView summary={summary} />
      <ArtChartCard>
        <DataRefetchOverlay
          isFetching={isFetching}
          isLoading={isLoading}
          className="flex min-h-0 flex-1 flex-col"
        >
          <ArtStockChartView data={days} />
        </DataRefetchOverlay>
      </ArtChartCard>
    </div>
  );
}
