import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAnalogSalesRangeQuery } from "@/modules/analogs/api/hooks/queries/useAnalogSalesRangeQuery";
import { useState } from "react";
import { AnalogSalesChartView } from "./AnalogSalesChartView";
import { AnalogSalesChartSkeleton } from "./AnalogSalesChartSkeleton";

interface AnalogSalesChartContainerProps {
  analogId: string | undefined;
  dateFrom: string;
  dateTo: string;
}

export function AnalogSalesChartContainer({
  analogId,
  dateFrom,
  dateTo,
}: AnalogSalesChartContainerProps) {
  const [showSales, setShowSales] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  const { data, isLoading, error, refetch } = useAnalogSalesRangeQuery({
    analogId,
    dateFrom,
    dateTo,
  });

  if (!analogId) {
    return (
      <LoadingNoData description="Ідентифікатор аналога не передано для завантаження історії продаж" />
    );
  }

  if (isLoading) {
    return <AnalogSalesChartSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження історії продаж"
        description="Не вдалося завантажити дані для побудови графіка"
        onRetry={() => void refetch()}
        variant="compact"
      />
    );
  }

  const items = data?.data ?? [];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про продажі за обраний період" />
    );
  }

  const showChart = showSales || showRevenue;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="sales-chart-show-sales"
            checked={showSales}
            onCheckedChange={setShowSales}
            className="data-[state=checked]:bg-[color:var(--chart-6)]"
          />
          <Label
            htmlFor="sales-chart-show-sales"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Продажі (шт)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sales-chart-show-revenue"
            checked={showRevenue}
            onCheckedChange={setShowRevenue}
            className="data-[state=checked]:bg-[color:var(--chart-7)]"
          />
          <Label
            htmlFor="sales-chart-show-revenue"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Виручка (грн)
          </Label>
        </div>
      </div>
      {showChart ? (
        <AnalogSalesChartView
          data={items}
          showSales={showSales}
          showRevenue={showRevenue}
        />
      ) : (
        <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
          Увімкніть хоча б одну серію: Продажі або Виручка.
        </div>
      )}
    </div>
  );
}
