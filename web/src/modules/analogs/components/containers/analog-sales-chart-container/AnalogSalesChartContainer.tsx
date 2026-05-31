import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useAnalogSalesRangeQuery } from "@/modules/analogs/api/hooks/queries/useAnalogSalesRangeQuery";
import {
  AnalogSalesChartSkeleton,
} from "@/modules/analogs/components/charts/analog-sales-chart";
import { AnalogSalesChartContainerView } from "./AnalogSalesChartContainerView";
import { useState } from "react";

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

  return (
    <AnalogSalesChartContainerView
      items={items}
      showSales={showSales}
      onShowSalesChange={setShowSales}
      showRevenue={showRevenue}
      onShowRevenueChange={setShowRevenue}
    />
  );
}
