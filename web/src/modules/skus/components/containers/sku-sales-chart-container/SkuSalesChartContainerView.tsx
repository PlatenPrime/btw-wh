import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SalesRangeChartView } from "@/components/shared/charts/sales-range-chart";
import type { SalesRangeChartPoint } from "@/types/charts-range";

export interface SkuSalesChartContainerViewProps {
  items: SalesRangeChartPoint[];
  showSales: boolean;
  showRevenue: boolean;
  onShowSalesChange: (value: boolean) => void;
  onShowRevenueChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function SkuSalesChartContainerView({
  items,
  showSales,
  showRevenue,
  onShowSalesChange,
  onShowRevenueChange,
  isFetching,
  isLoading,
}: SkuSalesChartContainerViewProps) {
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
            className="text-muted-foreground cursor-pointer text-sm"
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
            className="text-muted-foreground cursor-pointer text-sm"
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
          <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
            Увімкніть хоча б одну серію: Продажі або Виручка.
          </div>
        )}
      </DataRefetchOverlay>
    </div>
  );
}
