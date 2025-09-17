import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { usePosByIdQuery } from "@/modules/poses/api/hooks/queries/usePosByIdQuery";
import type { IPos } from "@/modules/poses/api/types";
import type { ComponentType } from "react";

interface PosFetcherProps {
  posId: string;
  ContainerComponent: ComponentType<{ pos: IPos }>;
  SkeletonComponent: ComponentType;
}

export function PosFetcher({
  posId,
  ContainerComponent,
  SkeletonComponent,
}: PosFetcherProps) {
  const { data: pos, isLoading, error } = usePosByIdQuery(posId);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позиції"
        description="Не вдалося завантажити дані позиції"
      />
    );

  if (!pos) return <LoadingNoData description="Позицію не знайдено" />;

  return <ContainerComponent pos={pos} />;
}
