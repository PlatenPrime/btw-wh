import { Button } from "@/components/ui/button";
import { SkuStatisticsPie } from "@/modules/sku-analytics/components/charts/sku-statistics-pie/SkuStatisticsPie";
import { SkuSelectionComparisonTable } from "@/modules/sku-analytics/components/tables/sku-selection-comparison-table";
import type {
  SkuSelectionComparisonRow,
  SkuStatisticsMetric,
} from "@/modules/sku-analytics/types";

export interface SkuSelectionComparisonContainerViewProps {
  rows: SkuSelectionComparisonRow[];
  metric: SkuStatisticsMetric;
  onMetricChange: (metric: SkuStatisticsMetric) => void;
  dateFrom: string;
  dateTo: string;
}

export function SkuSelectionComparisonContainerView({
  rows,
  metric,
  onMetricChange,
  dateFrom,
  dateTo,
}: SkuSelectionComparisonContainerViewProps) {
  return (
    <div className="grid gap-4">
      <SkuStatisticsPie rows={rows} metric={metric} />
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={metric === "salesUah" ? "default" : "outline"}
          size="sm"
          onClick={() => onMetricChange("salesUah")}
        >
          Виручка, грн
        </Button>
        <Button
          variant={metric === "salesPcs" ? "default" : "outline"}
          size="sm"
          onClick={() => onMetricChange("salesPcs")}
        >
          Продажі, шт
        </Button>
      </div>
      <SkuSelectionComparisonTable
        rows={rows}
        metric={metric}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  );
}
