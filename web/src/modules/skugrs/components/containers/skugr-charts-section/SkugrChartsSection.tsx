import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type {
  AnalogSalesRangeItem,
  AnalogSliceRangeItem,
} from "@/modules/analogs/api/types";
import { AnalogSalesChartSkeleton } from "@/modules/analogs/components/containers/analog-sales-chart-container/AnalogSalesChartSkeleton";
import { AnalogSalesChartView } from "@/modules/analogs/components/containers/analog-sales-chart-container/AnalogSalesChartView";
import { AnalogSlicesChartSkeleton } from "@/modules/analogs/components/containers/analog-slices-chart-container/AnalogSlicesChartSkeleton";
import { AnalogSlicesChartView } from "@/modules/analogs/components/containers/analog-slices-chart-container/AnalogSlicesChartView";
import { useSkugrDailySummaryQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrDailySummaryQuery";
import { format, subDays } from "date-fns";
import { useMemo, useState } from "react";

const PERIOD_OPTIONS = [
  { value: "7", label: "7 днів" },
  { value: "30", label: "30 днів" },
  { value: "90", label: "90 днів" },
] as const;

function getPeriod(days: number): { dateFrom: string; dateTo: string } {
  const today = new Date();
  const from = subDays(today, days - 1);
  return {
    dateFrom: format(from, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
  };
}

interface SkugrChartsSectionProps {
  skugrId: string;
}

export function SkugrChartsSection({ skugrId }: SkugrChartsSectionProps) {
  const [periodDays, setPeriodDays] = useState<number>(30);
  const [showSales, setShowSales] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  const { dateFrom, dateTo } = useMemo(
    () => getPeriod(periodDays),
    [periodDays],
  );

  const { data, isLoading, isFetching, error, refetch } =
    useSkugrDailySummaryQuery({
      skugrId,
      dateFrom,
      dateTo,
    });

  const sliceItems = useMemo((): AnalogSliceRangeItem[] => {
    const rows = data?.data ?? [];
    return rows.map((row) => ({
      date: row.date,
      stock: row.stock,
      price: 0,
    }));
  }, [data?.data]);

  const salesItems = useMemo((): AnalogSalesRangeItem[] => {
    const rows = data?.data ?? [];
    return rows.map((row) => ({
      date: row.date,
      sales: row.sales,
      revenue: row.revenue,
      price: 0,
      isDeliveryDay: false,
    }));
  }, [data?.data]);

  if (isLoading && !data) {
    return (
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Label
            htmlFor="skugr-charts-period"
            className="text-muted-foreground text-sm"
          >
            Період
          </Label>
          <Select
            value={String(periodDays)}
            onValueChange={(v) => setPeriodDays(Number(v))}
          >
            <SelectTrigger id="skugr-charts-period" className="w-[120px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка залишків (група)
              </h3>
            </CardHeader>
            <CardContent>
              <AnalogSlicesChartSkeleton />
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка продаж (група)
              </h3>
            </CardHeader>
            <CardContent>
              <AnalogSalesChartSkeleton />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Label
            htmlFor="skugr-charts-period"
            className="text-muted-foreground text-sm"
          >
            Період
          </Label>
          <Select
            value={String(periodDays)}
            onValueChange={(v) => setPeriodDays(Number(v))}
          >
            <SelectTrigger id="skugr-charts-period" className="w-[120px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ErrorDisplay
          error={error}
          title="Помилка завантаження даних для графіків"
          description="Не вдалося завантажити денні підсумки групи"
          onRetry={() => void refetch()}
          variant="compact"
        />
      </div>
    );
  }

  if (!sliceItems.length) {
    return (
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Label
            htmlFor="skugr-charts-period"
            className="text-muted-foreground text-sm"
          >
            Період
          </Label>
          <Select
            value={String(periodDays)}
            onValueChange={(v) => setPeriodDays(Number(v))}
          >
            <SelectTrigger id="skugr-charts-period" className="w-[120px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <LoadingNoData description="Немає даних для графіків за обраний період" />
      </div>
    );
  }

  const showSalesChart = showSales || showRevenue;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <Label
          htmlFor="skugr-charts-period"
          className="text-muted-foreground text-sm"
        >
          Період
        </Label>
        <Select
          value={String(periodDays)}
          onValueChange={(v) => setPeriodDays(Number(v))}
        >
          <SelectTrigger id="skugr-charts-period" className="w-[120px]" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка залишків (група)
              </h3>
            </CardHeader>
            <CardContent>
              <AnalogSlicesChartView
                data={sliceItems}
                showStock
                showPrice={false}
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка продаж (група)
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="skugr-sales-chart-show-sales"
                      checked={showSales}
                      onCheckedChange={setShowSales}
                      className="data-[state=checked]:bg-[color:var(--chart-6)]"
                    />
                    <Label
                      htmlFor="skugr-sales-chart-show-sales"
                      className="text-muted-foreground cursor-pointer text-sm"
                    >
                      Продажі (шт)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="skugr-sales-chart-show-revenue"
                      checked={showRevenue}
                      onCheckedChange={setShowRevenue}
                      className="data-[state=checked]:bg-[color:var(--chart-7)]"
                    />
                    <Label
                      htmlFor="skugr-sales-chart-show-revenue"
                      className="text-muted-foreground cursor-pointer text-sm"
                    >
                      Виручка (грн)
                    </Label>
                  </div>
                </div>
                {showSalesChart ? (
                  <AnalogSalesChartView
                    data={salesItems}
                    showSales={showSales}
                    showRevenue={showRevenue}
                  />
                ) : (
                  <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
                    Увімкніть хоча б одну серію: Продажі або Виручка.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DataRefetchOverlay>
    </div>
  );
}
