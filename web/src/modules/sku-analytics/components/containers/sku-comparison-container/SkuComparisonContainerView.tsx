import { Button } from "@/components/ui/button";
import { SkuStatisticsPie } from "@/modules/sku-analytics/components/charts/sku-statistics-pie/SkuStatisticsPie";
import { SkuComparisonTable } from "@/modules/sku-analytics/components/tables/sku-comparison-table/SkuComparisonTable";
import type {
  SkuComparisonRow,
  SkuStatisticsMetric,
} from "@/modules/sku-analytics/types";

export interface SkuComparisonContainerViewProps {
  rows: SkuComparisonRow[];
  metric: SkuStatisticsMetric;
  onMetricChange: (metric: SkuStatisticsMetric) => void;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuComparisonContainerView({
  rows,
  metric,
  onMetricChange,
  prod,
  dateFrom,
  dateTo,
}: SkuComparisonContainerViewProps) {
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
      <SkuComparisonTable
        rows={rows}
        metric={metric}
        prod={prod}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  );
}
