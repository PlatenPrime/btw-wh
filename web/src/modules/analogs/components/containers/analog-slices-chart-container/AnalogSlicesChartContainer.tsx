import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  SliceRangeChartSkeleton,
  SliceRangeChartView,
} from "@/components/shared/charts/slice-range-chart";
import { useAnalogSlicesRangeQuery } from "@/modules/analogs/api/hooks/queries/useAnalogSlicesRangeQuery";
import { useState } from "react";

interface AnalogSlicesChartContainerProps {
  analogId: string | undefined;
  dateFrom: string;
  dateTo: string;
}

export function AnalogSlicesChartContainer({
  analogId,
  dateFrom,
  dateTo,
}: AnalogSlicesChartContainerProps) {
  const [showStock, setShowStock] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const { data, isLoading, error, refetch } = useAnalogSlicesRangeQuery({
    analogId,
    dateFrom,
    dateTo,
  });

  if (!analogId) {
    return (
      <LoadingNoData description="Ідентифікатор аналога не передано для завантаження історії залишків та цін" />
    );
  }

  if (isLoading) {
    return <SliceRangeChartSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження історії залишків та цін"
        description="Не вдалося завантажити дані для побудови графіка"
        onRetry={() => void refetch()}
        variant="compact"
      />
    );
  }

  const items = data?.data ?? [];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про залишки та ціни за обраний період" />
    );
  }

  const showChart = showStock || showPrice;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="chart-show-stock"
            checked={showStock}
            onCheckedChange={setShowStock}
            className="data-[state=checked]:bg-[color:var(--chart-1)]"
          />
          <Label
            htmlFor="chart-show-stock"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Залишок
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="chart-show-price"
            checked={showPrice}
            onCheckedChange={setShowPrice}
            className="data-[state=checked]:bg-[color:var(--chart-2)]"
          />
          <Label
            htmlFor="chart-show-price"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Ціна
          </Label>
        </div>
      </div>
      {showChart ? (
        <SliceRangeChartView
          data={items}
          showStock={showStock}
          showPrice={showPrice}
        />
      ) : (
        <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
          Увімкніть хоча б одну серію: Залишок або Ціна.
        </div>
      )}
    </div>
  );
}
