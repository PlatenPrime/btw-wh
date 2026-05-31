import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { SliceRangeChartSkeleton } from "@/components/shared/charts/slice-range-chart";
import { useSkuSliceRangeQuery } from "@/modules/skus/api/hooks/queries/useSkuSliceRangeQuery";
import { SkuSlicesChartContainerView } from "./SkuSlicesChartContainerView";
import type { SliceRangeChartPoint } from "@/types/charts-range";
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

  const { data, isLoading, isFetching, error, refetch } = useSkuSliceRangeQuery({
    skuId,
    dateFrom,
    dateTo,
  });

  if (!skuId) {
    return (
      <LoadingNoData description="Ідентифікатор товару не передано для завантаження історії залишків та цін" />
    );
  }

  if (isLoading && !data) {
    return <SliceRangeChartSkeleton />;
  }

  if (error && !data) {
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

  const items = (data?.data ?? []) as SliceRangeChartPoint[];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про залишки та ціни за обраний період" />
    );
  }

  return (
    <SkuSlicesChartContainerView
      items={items}
      showStock={showStock}
      showPrice={showPrice}
      onShowStockChange={setShowStock}
      onShowPriceChange={setShowPrice}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
}

