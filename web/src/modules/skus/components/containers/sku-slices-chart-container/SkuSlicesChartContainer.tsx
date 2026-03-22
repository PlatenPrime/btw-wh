import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { AnalogSliceRangeItem } from "@/modules/analogs/api/types";
import { AnalogSlicesChartSkeleton } from "@/modules/analogs/components/containers/analog-slices-chart-container/AnalogSlicesChartSkeleton";
import { AnalogSlicesChartView } from "@/modules/analogs/components/containers/analog-slices-chart-container/AnalogSlicesChartView";
import { useSkuSliceRangeQuery } from "@/modules/skus/api/hooks/queries/useSkuSliceRangeQuery";
import { useState } from "react";

interface SkuSlicesChartContainerProps {
  skuId: string | undefined;
  dateFrom: string;
  dateTo: string;
}

export function SkuSlicesChartContainer({
  skuId,
  dateFrom,
  dateTo,
}: SkuSlicesChartContainerProps) {
  const [showStock, setShowStock] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const { data, isLoading, error, refetch } = useSkuSliceRangeQuery({
    skuId,
    dateFrom,
    dateTo,
  });

  if (!skuId) {
    return (
      <LoadingNoData description="Ідентифікатор товару не передано для завантаження історії залишків та цін" />
    );
  }

  if (isLoading) {
    return <AnalogSlicesChartSkeleton />;
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

  const items = (data?.data ?? []) as AnalogSliceRangeItem[];
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
            id="sku-chart-show-stock"
            checked={showStock}
            onCheckedChange={setShowStock}
            className="data-[state=checked]:bg-[color:var(--chart-1)]"
          />
          <Label
            htmlFor="sku-chart-show-stock"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Залишок
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sku-chart-show-price"
            checked={showPrice}
            onCheckedChange={setShowPrice}
            className="data-[state=checked]:bg-[color:var(--chart-2)]"
          />
          <Label
            htmlFor="sku-chart-show-price"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Ціна
          </Label>
        </div>
      </div>
      {showChart ? (
        <AnalogSlicesChartView
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
