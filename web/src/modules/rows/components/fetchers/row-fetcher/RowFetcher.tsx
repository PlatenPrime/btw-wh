import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { useRowByTitleQuery } from "@/modules/rows/api/hooks/queries/useRowByTitleQuery";
import type { RowDto } from "@/modules/rows/api/types";
import type { ComponentType } from "react";

interface RowFetcherProps {
  rowTitle?: string;
  ContainerComponent: ComponentType<{ row: RowDto }>;
  SkeletonComponent: ComponentType;
}

export function RowFetcher({
  rowTitle,
  ContainerComponent,
  SkeletonComponent,
}: RowFetcherProps) {
  const { data: row, isLoading, error } = useRowByTitleQuery(rowTitle);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження рядів"
        description="Не вдалося завантажити дані рядів"
      />
    );

  if (!row) return <LoadingNoData description="Ряд не знайдено" />;

  return <ContainerComponent row={row} />;
}
