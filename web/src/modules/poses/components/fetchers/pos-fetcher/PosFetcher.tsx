import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
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
  const {
    data: posResponse,
    isLoading,
    error,
    refetch,
  } = usePosByIdQuery(posId);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позиції"
        description="Не вдалося завантажити дані позиції"
      />
    );

  if (!posResponse || !posResponse.exists)
    return (
      <EntityNotFound
        title="Позицію не знайдено"
        description="Позиція з таким ID не існує або була видалена"
        onRetry={() => refetch()}
      />
    );

  return <ContainerComponent pos={posResponse.data!} />;
}
