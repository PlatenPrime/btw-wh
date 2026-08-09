import { Button } from "@/components/ui/button";
import { SkuKonkProdSkugrGroupsPie } from "@/modules/sku-analytics/components/charts/sku-konk-prod-skugr-groups-pie/SkuKonkProdSkugrGroupsPie";
import type {
  SkugrGroupSalesRow,
  SkugrGroupsMetric,
} from "@/modules/sku-analytics/components/containers/sku-konk-prod-skugr-groups-section/types";
import { SkuStatisticsProdTable } from "@/modules/sku-analytics/components/tables/sku-statistics-prod-table";
import type { SkuKonkProdSkugrGroupsSalesTotalDto } from "@/modules/sku-analytics/api/types";

export interface SkuStatisticsProdContainerViewProps {
  rows: SkugrGroupSalesRow[];
  pieRows: SkugrGroupSalesRow[];
  all: SkuKonkProdSkugrGroupsSalesTotalDto;
  metric: SkugrGroupsMetric;
  onMetricChange: (metric: SkugrGroupsMetric) => void;
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuStatisticsProdContainerView({
  rows,
  pieRows,
  all,
  metric,
  onMetricChange,
  konk,
  prod,
  dateFrom,
  dateTo,
}: SkuStatisticsProdContainerViewProps) {
  return (
    <div className="grid gap-4">
      {pieRows.length > 0 ? (
        <SkuKonkProdSkugrGroupsPie rows={pieRows} metric={metric} />
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
      <SkuStatisticsProdTable
        rows={rows}
        all={all}
        metric={metric}
        konk={konk}
        prod={prod}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  );
}
