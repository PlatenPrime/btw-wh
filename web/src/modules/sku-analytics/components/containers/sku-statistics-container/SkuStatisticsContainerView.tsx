import { Button } from "@/components/ui/button";
import { SkuStatisticsPie } from "@/modules/sku-analytics/components/charts/sku-statistics-pie/SkuStatisticsPie";
import { SkuStatisticsTable } from "@/modules/sku-analytics/components/tables/sku-statistics-table/SkuStatisticsTable";
import type {
  SkuStatisticsMetric,
  SkuStatisticsRow,
} from "@/modules/sku-analytics/types";

export interface SkuStatisticsContainerViewProps {
  rows: SkuStatisticsRow[];
  metric: SkuStatisticsMetric;
  onMetricChange: (metric: SkuStatisticsMetric) => void;
  konk: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuStatisticsContainerView({
  rows,
  metric,
  onMetricChange,
  konk,
  dateFrom,
  dateTo,
}: SkuStatisticsContainerViewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
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
      <SkuStatisticsPie rows={rows} metric={metric} />
      <SkuStatisticsTable
        rows={rows}
        metric={metric}
        konk={konk}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  );
}
