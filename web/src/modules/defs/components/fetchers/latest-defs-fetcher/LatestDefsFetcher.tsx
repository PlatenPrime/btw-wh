import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { useLatestDefsQuery } from "@/modules/defs/api/hooks/queries/useLatestDefsQuery";
import type { GetLatestDefsResponse } from "@/modules/defs/api/types/dto";
import type { ComponentType } from "react";

interface LatestDefsFetcherProps {
  ContainerComponent: ComponentType<{
    defsData: GetLatestDefsResponse["data"];
  }>;
  SkeletonComponent: ComponentType;
}

export function LatestDefsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: LatestDefsFetcherProps) {
  const { data, isLoading, error, refetch } = useLatestDefsQuery();

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Ошибка загрузки дефицитов"
        description="Не удалось загрузить данные о дефицитах"
        onRetry={refetch}
      />
    );

  if (!data?.data)
    return (
      <ErrorDisplay
        error="Нет данных о дефицитах"
        title="Нет данных о дефицитах"
        description="Расчеты дефицитов еще не проводились"
        onRetry={refetch}
      />
    );

  return <ContainerComponent defsData={data.data} />;
}
