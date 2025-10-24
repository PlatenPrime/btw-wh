import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { useRowByTitleQuery } from "@/modules/rows/api/hooks/queries/useRowByTitleQuery";
import type { RowDto } from "@/modules/rows/api/types/dto";
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
  const {
    data: rowResponse,
    isLoading,
    error,
    refetch,
  } = useRowByTitleQuery(rowTitle);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження рядів"
        description="Не вдалося завантажити дані рядів"
      />
    );

  if (!rowResponse || !rowResponse.exists)
    return (
      <EntityNotFound
        title="Ряд не знайдено"
        description="Ряд з такою назвою не існує або був видалений"
        onRetry={() => refetch()}
      />
    );

  return <ContainerComponent row={rowResponse.data!} />;
}
