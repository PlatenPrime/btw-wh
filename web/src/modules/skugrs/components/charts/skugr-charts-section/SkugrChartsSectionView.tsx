import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import {
  SalesRangeChartView,
} from "@/components/shared/charts/sales-range-chart";
import {
  SliceRangeChartView,
} from "@/components/shared/charts/slice-range-chart";
import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type {
  SalesRangeChartPoint,
  SliceRangeChartPoint,
} from "@/types/charts-range";
import { SkugrChartsSectionSkeleton } from "@/modules/skugrs/components/charts/skugr-charts-section/SkugrChartsSectionSkeleton";

type SkugrChartsSectionViewToolbarProps = {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
};

type SkugrChartsSectionViewProps =
  | (SkugrChartsSectionViewToolbarProps & { phase: "loading" })
  | (SkugrChartsSectionViewToolbarProps & {
      phase: "error";
      error: unknown;
      onRetry: () => void;
    })
  | (SkugrChartsSectionViewToolbarProps & { phase: "empty" })
  | (SkugrChartsSectionViewToolbarProps & {
      phase: "ready";
      sliceItems: SliceRangeChartPoint[];
      salesItems: SalesRangeChartPoint[];
      showSales: boolean;
      onShowSalesChange: (value: boolean) => void;
      showRevenue: boolean;
      onShowRevenueChange: (value: boolean) => void;
      showSalesChart: boolean;
      isFetching: boolean;
      isLoading: boolean;
    });

export function SkugrChartsSectionView(props: SkugrChartsSectionViewProps) {
  const { dateFrom, dateTo, onDateRangeChange } = props;

  if (props.phase === "loading") {
    return <SkugrChartsSectionSkeleton />;
  }

  return (
    <div className="grid gap-3">
      <ChartDateRangeToolbar
        idPrefix="skugr-charts"
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
      {props.phase === "error" ? (
        <ErrorDisplay
          error={props.error}
          title="Помилка завантаження даних для графіків"
          description="Не вдалося завантажити денні підсумки групи"
          onRetry={props.onRetry}
          variant="compact"
        />
      ) : null}
      {props.phase === "empty" ? (
        <LoadingNoData description="Немає даних для графіків за обраний період" />
      ) : null}
      {props.phase === "ready" ? (
        <DataRefetchOverlay
          isFetching={props.isFetching}
          isLoading={props.isLoading}
        >
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <ChartSection title="Динаміка залишків (група)">
              <SliceRangeChartView
                data={props.sliceItems}
                showStock
                showPrice={false}
              />
            </ChartSection>
            <ChartSection
              title="Динаміка продаж (група)"
              toolbar={
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="skugr-sales-chart-show-sales"
                      checked={props.showSales}
                      onCheckedChange={props.onShowSalesChange}
                      className="data-[state=checked]:bg-[color:var(--chart-6)]"
                    />
                    <Label
                      htmlFor="skugr-sales-chart-show-sales"
                      className="cursor-pointer text-sm text-muted-foreground"
                    >
                      Продажі (шт)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="skugr-sales-chart-show-revenue"
                      checked={props.showRevenue}
                      onCheckedChange={props.onShowRevenueChange}
                      className="data-[state=checked]:bg-[color:var(--chart-7)]"
                    />
                    <Label
                      htmlFor="skugr-sales-chart-show-revenue"
                      className="cursor-pointer text-sm text-muted-foreground"
                    >
                      Виручка (грн)
                    </Label>
                  </div>
                </div>
              }
            >
              {props.showSalesChart ? (
                <SalesRangeChartView
                  data={props.salesItems}
                  showSales={props.showSales}
                  showRevenue={props.showRevenue}
                />
              ) : (
                <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                  Увімкніть хоча б одну серію: Продажі або Виручка.
                </div>
              )}
            </ChartSection>
          </div>
        </DataRefetchOverlay>
      ) : null}
    </div>
  );
}
