import { Button } from "@/components/ui/button";
import { SkuStatisticsSkusTable } from "@/modules/sku-analytics/components/tables/sku-statistics-skus-table";
import type { SkuSkugrSkusSalesTotalDto } from "@/modules/sku-analytics/api/types";
import type {
  SkuStatisticsMetric,
  SkuStatisticsSkuRow,
} from "@/modules/sku-analytics/types";

export interface SkuStatisticsSkugrContainerViewProps {
  rows: SkuStatisticsSkuRow[];
  all: SkuSkugrSkusSalesTotalDto;
  skugrTitle: string;
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
  all,
  skugrTitle,
  metric,
  onMetricChange,
  skugrId,
  dateFrom,
  dateTo,
  konk,
  prod,
}: SkuStatisticsSkugrContainerViewProps) {
  const hasTitle = Boolean(skugrTitle);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          className={
            hasTitle
              ? "text-lg font-semibold text-foreground"
              : "text-lg font-semibold text-muted-foreground"
          }
        >
          {skugrTitle || "Товарна група"}
        </h2>
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
