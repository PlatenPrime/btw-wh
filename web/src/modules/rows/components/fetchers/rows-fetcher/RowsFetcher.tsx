import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { useRowsQuery } from "@/modules/rows/api/hooks/queries/useRowsQuery";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { ComponentType } from "react";

interface RowsFetcherProps {
  ContainerComponent: ComponentType<{ data: RowDto[] }>;
  SkeletonComponent: ComponentType;
}

export function RowsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: RowsFetcherProps) {
  const rowsQuery = useRowsQuery();

  if (rowsQuery.isLoading) return <SkeletonComponent />;

  if (rowsQuery.error)
    return (
      <ErrorDisplay
        error={rowsQuery.error}
        title="Помилка завантаження рядів"
        description="Не вдалося завантажити дані рядів"
      />
    );

  if (!rowsQuery.data) return <LoadingNoData description="Ряди не знайдено" />;

  return <ContainerComponent data={rowsQuery.data} />;
}
