import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { SalesRangeChartView } from "@/components/shared/charts/sales-range-chart";
import { ART_CHART_PLOT_CLASS } from "@/modules/arts/components/charts/art-chart-plot-height";
import type { SalesRangeChartPoint } from "@/types/charts-range";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface ArtSalesChartViewProps {
  items: SalesRangeChartPoint[];
  showSales: boolean;
  showRevenue: boolean;
  onShowSalesChange: (value: boolean) => void;
  onShowRevenueChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function ArtSalesChartView({
  items,
  showSales,
  showRevenue,
  onShowSalesChange,
  onShowRevenueChange,
  isFetching,
  isLoading,
}: ArtSalesChartViewProps) {
  const showChart = showSales || showRevenue;

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="art-sales-chart-show-sales"
            checked={showSales}
            onCheckedChange={onShowSalesChange}
            className="data-[state=checked]:bg-[color:var(--chart-6)]"
          />
          <Label
            htmlFor="art-sales-chart-show-sales"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Продажі (шт)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="art-sales-chart-show-revenue"
            checked={showRevenue}
            onCheckedChange={onShowRevenueChange}
            className="data-[state=checked]:bg-[color:var(--chart-7)]"
          />
          <Label
            htmlFor="art-sales-chart-show-revenue"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Виручка (грн)
          </Label>
        </div>
      </div>
      <DataRefetchOverlay
        isFetching={isFetching}
        isLoading={isLoading}
        className="flex min-h-0 flex-1 flex-col"
      >
        {showChart ? (
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col [&_.sales-range-chart]:!h-full [&_.sales-range-chart]:!max-h-none [&_.sales-range-chart]:!max-w-none [&_.sales-range-chart]:!min-h-0",
              ART_CHART_PLOT_CLASS,
            )}
          >
            <SalesRangeChartView
              data={items}
              showSales={showSales}
              showRevenue={showRevenue}
            />
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 items-center justify-center rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
            Увімкніть хоча б одну серію: Продажі або Виручка.
          </div>
        )}
      </DataRefetchOverlay>
    </div>
  );
}
