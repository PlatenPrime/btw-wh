import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useRowByTitleQuery } from "@/modules/rows/api/hooks/queries/useRowByTitleQuery";
import {
  RowContainer,
  RowContainerSkeleton,
} from "@/modules/rows/components/containers/row-container";

interface RowFetcherProps {
  rowTitle?: string;
}

export function RowFetcher({ rowTitle }: RowFetcherProps) {
  const { data: row, isLoading, error } = useRowByTitleQuery(rowTitle);

  if (isLoading) return <RowContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження рядів"
        description="Не вдалося завантажити дані рядів"
      />
    );

  if (!row) return <LoadingNoData description="Ряд не знайдено" />;

  return <RowContainer row={row} />;
}
