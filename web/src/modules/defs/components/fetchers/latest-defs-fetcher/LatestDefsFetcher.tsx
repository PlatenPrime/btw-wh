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
  const defsQuery = useLatestDefsQuery();

  if (defsQuery.isLoading) return <SkeletonComponent />;

  if (defsQuery.error)
    return (
      <ErrorDisplay
        error={defsQuery.error}
        title="Ошибка загрузки дефицитов"
        description="Не удалось загрузить данные о дефицитах"
        onRetry={defsQuery.refetch}
      />
    );

  if (!defsQuery.data?.data)
    return (
      <ErrorDisplay
        error="Нет данных о дефицитах"
        title="Нет данных о дефицитах"
        description="Расчеты дефицитов еще не проводились"
        onRetry={defsQuery.refetch}
      />
    );

  return <ContainerComponent defsData={defsQuery.data.data} />;
}
