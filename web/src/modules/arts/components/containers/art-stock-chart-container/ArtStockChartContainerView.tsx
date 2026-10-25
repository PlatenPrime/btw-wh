import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import type {
  ArtStockChartDay,
  ArtStockChartSummary,
} from "@/modules/arts/api/types/art-reports";
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
    <div className="grid gap-3">
      <ArtStockSummaryView summary={summary} />
      <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
        <ArtStockChartView data={days} />
      </DataRefetchOverlay>
    </div>
  );
}
