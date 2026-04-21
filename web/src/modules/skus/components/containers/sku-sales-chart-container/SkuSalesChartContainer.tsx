import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { SalesRangeChartSkeleton } from "@/components/shared/charts/sales-range-chart";
import { useSkuSalesRangeQuery } from "@/modules/skus/api/hooks/queries/useSkuSalesRangeQuery";
import { SkuSalesChartContainerView } from "@/modules/skus/components/containers/sku-sales-chart-container/SkuSalesChartContainerView";
import type { SalesRangeChartPoint } from "@/types/charts-range";
import { useState } from "react";

interface SkuSalesChartContainerProps {
  skuId: string | undefined;
  dateFrom: string;
  dateTo: string;
}

export function SkuSalesChartContainer({
  skuId,
  dateFrom,
  dateTo,
}: SkuSalesChartContainerProps) {
  const [showSales, setShowSales] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  const { data, isLoading, isFetching, error, refetch } = useSkuSalesRangeQuery({
    skuId,
    dateFrom,
    dateTo,
  });

  if (!skuId) {
    return (
      <LoadingNoData description="Ідентифікатор товару не передано для завантаження історії продаж" />
    );
  }

  if (isLoading && !data) {
    return <SalesRangeChartSkeleton />;
  }

  if (error && !data) {
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

  const items = (data?.data ?? []) as SalesRangeChartPoint[];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про продажі за обраний період" />
    );
  }

  return (
    <SkuSalesChartContainerView
      items={items}
      showSales={showSales}
      showRevenue={showRevenue}
      onShowSalesChange={setShowSales}
      onShowRevenueChange={setShowRevenue}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
}
