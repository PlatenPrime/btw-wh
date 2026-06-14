import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useArtStockChartQuery } from "@/modules/arts/api/hooks/queries/useArtStockChartQuery";
import { ArtStockChartSkeleton } from "@/modules/arts/components/charts/art-stock-chart";
import { ArtStockChartContainerView } from "./ArtStockChartContainerView";

interface ArtStockChartContainerProps {
  artikul: string | undefined;
  dateFrom: string;
  dateTo: string;
}

export function ArtStockChartContainer({
  artikul,
  dateFrom,
  dateTo,
}: ArtStockChartContainerProps) {
  const { data, isLoading, isFetching, error, refetch } = useArtStockChartQuery({
    artikul,
    dateFrom,
    dateTo,
  });

  if (!artikul) {
    return (
      <LoadingNoData description="Артикул не передано для завантаження історії залишків" />
    );
  }

  if (isLoading && !data) {
    return <ArtStockChartSkeleton />;
  }

  if (error && !data) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження історії залишків"
        description="Не вдалося завантажити дані для побудови графіка"
        onRetry={() => void refetch()}
        variant="compact"
      />
    );
  }

  const chartData = data?.data;
  if (!chartData?.days.length) {
    return (
      <LoadingNoData description="Немає даних про залишки за обраний період" />
    );
  }

  return (
    <ArtStockChartContainerView
      days={chartData.days}
      summary={chartData.summary}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
}
