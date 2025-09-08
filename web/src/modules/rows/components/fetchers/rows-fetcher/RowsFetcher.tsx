import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useRowsQuery } from "@/modules/rows/api/hooks/queries/useRowsQuery";
import {
  RowsContainer,
  RowsContainerSkeleton,
} from "@/modules/rows/components/containers/rows-container";

export function RowsFetcher() {
  const { data, isLoading, error } = useRowsQuery();

  if (isLoading) return <RowsContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження рядів"
        description="Не вдалося завантажити дані рядів"
      />
    );

  if (!data) return <LoadingNoData description="Ряди не знайдено" />;

  return <RowsContainer data={data} />;
}
