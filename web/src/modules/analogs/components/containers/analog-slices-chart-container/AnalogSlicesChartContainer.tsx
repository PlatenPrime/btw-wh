import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useAnalogSlicesRangeQuery } from "@/modules/analogs/api/hooks/queries/useAnalogSlicesRangeQuery";
import {
  AnalogSlicesChartSkeleton,
} from "@/modules/analogs/components/charts/analog-slices-chart";
import { AnalogSlicesChartContainerView } from "./AnalogSlicesChartContainerView";
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

  const items = data?.data ?? [];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про залишки та ціни за обраний період" />
    );
  }

  return (
    <AnalogSlicesChartContainerView
      items={items}
      showStock={showStock}
      onShowStockChange={setShowStock}
      showPrice={showPrice}
      onShowPriceChange={setShowPrice}
    />
  );
}
