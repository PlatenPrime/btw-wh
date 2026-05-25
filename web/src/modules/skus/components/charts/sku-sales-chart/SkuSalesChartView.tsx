import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { SalesRangeChartView } from "@/components/shared/charts/sales-range-chart";
import type { SalesRangeChartPoint } from "@/types/charts-range";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export interface SkuSalesChartViewProps {
  items: SalesRangeChartPoint[];
  showSales: boolean;
  showRevenue: boolean;
  onShowSalesChange: (value: boolean) => void;
  onShowRevenueChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function SkuSalesChartView({
  items,
  showSales,
  showRevenue,
  onShowSalesChange,
  onShowRevenueChange,
  isFetching,
  isLoading,
}: SkuSalesChartViewProps) {
  const showChart = showSales || showRevenue;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="sku-sales-chart-show-sales"
            checked={showSales}
            onCheckedChange={onShowSalesChange}
            className="data-[state=checked]:bg-[color:var(--chart-6)]"
          />
          <Label
            htmlFor="sku-sales-chart-show-sales"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Продажі (шт)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sku-sales-chart-show-revenue"
            checked={showRevenue}
            onCheckedChange={onShowRevenueChange}
            className="data-[state=checked]:bg-[color:var(--chart-7)]"
          />
          <Label
            htmlFor="sku-sales-chart-show-revenue"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Виручка (грн)
          </Label>
        </div>
      </div>
      <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
        {showChart ? (
          <SalesRangeChartView
            data={items}
            showSales={showSales}
            showRevenue={showRevenue}
          />
        ) : (
          <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
            Увімкніть хоча б одну серію: Продажі або Виручка.
          </div>
        )}
      </DataRefetchOverlay>
    </div>
  );
}
