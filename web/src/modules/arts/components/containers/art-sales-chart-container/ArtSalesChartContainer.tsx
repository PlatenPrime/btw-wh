import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { ArtSalesChartSkeleton } from "@/modules/arts/components/charts/art-sales-chart";
import { useArtSalesChartQuery } from "@/modules/arts/api/hooks/queries/useArtSalesChartQuery";
import { ArtSalesChartContainerView } from "./ArtSalesChartContainerView";
import type { SalesRangeChartPoint } from "@/types/charts-range";
import { useState } from "react";

interface ArtSalesChartContainerProps {
  artikul: string | undefined;
  dateFrom: string;
  dateTo: string;
}

export function ArtSalesChartContainer({
  artikul,
  dateFrom,
  dateTo,
}: ArtSalesChartContainerProps) {
  const [showSales, setShowSales] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  const { data, isLoading, isFetching, error, refetch } = useArtSalesChartQuery({
    artikul,
    dateFrom,
    dateTo,
  });

  if (!artikul) {
    return (
      <LoadingNoData description="Артикул не передано для завантаження історії продаж" />
    );
  }

  if (isLoading && !data) {
    return <ArtSalesChartSkeleton />;
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

  const chartData = data?.data;
  if (!chartData?.days.length) {
    return (
      <LoadingNoData description="Немає даних про продажі за обраний період" />
    );
  }

  const items: SalesRangeChartPoint[] = chartData.days.map((day) => ({
    date: day.date,
    sales: day.sales,
    revenue: day.revenue,
    price: day.price,
    isDeliveryDay: day.isDeliveryDay,
  }));

  return (
    <ArtSalesChartContainerView
      items={items}
      summary={chartData.summary}
      showSales={showSales}
      showRevenue={showRevenue}
      onShowSalesChange={setShowSales}
      onShowRevenueChange={setShowRevenue}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
}
