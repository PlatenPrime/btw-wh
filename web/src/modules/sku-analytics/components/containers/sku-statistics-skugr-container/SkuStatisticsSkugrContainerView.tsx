import { Button } from "@/components/ui/button";
import { SkuStatisticsPie } from "@/modules/sku-analytics/components/charts/sku-statistics-pie/SkuStatisticsPie";
import { SkuStatisticsSkusTable } from "@/modules/sku-analytics/components/tables/sku-statistics-skus-table";
import type { SkuSkugrSkusSalesTotalDto } from "@/modules/sku-analytics/api/types";
import type {
  SkuStatisticsMetric,
  SkuStatisticsRow,
  SkuStatisticsSkuRow,
} from "@/modules/sku-analytics/types";

export interface SkuStatisticsSkugrContainerViewProps {
  rows: SkuStatisticsSkuRow[];
  pieRows: SkuStatisticsRow[];
  all: SkuSkugrSkusSalesTotalDto;
  metric: SkuStatisticsMetric;
  onMetricChange: (metric: SkuStatisticsMetric) => void;
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  konk?: string;
  prod?: string;
}

export function SkuStatisticsSkugrContainerView({
  rows,
  pieRows,
  all,
  metric,
  onMetricChange,
  skugrId,
  dateFrom,
  dateTo,
  konk,
  prod,
}: SkuStatisticsSkugrContainerViewProps) {
  return (
    <div className="grid gap-4">
      {pieRows.length > 0 ? (
        <SkuStatisticsPie rows={pieRows} metric={metric} />
      ) : (
        <p className="text-sm text-muted-foreground">
          Немає ненульових продажів для діаграми; див. таблицю нижче.
        </p>
      )}
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
      <SkuStatisticsSkusTable
        rows={rows}
        all={all}
        metric={metric}
        skugrId={skugrId}
        dateFrom={dateFrom}
        dateTo={dateTo}
        konk={konk}
        prod={prod}
      />
    </div>
  );
}
