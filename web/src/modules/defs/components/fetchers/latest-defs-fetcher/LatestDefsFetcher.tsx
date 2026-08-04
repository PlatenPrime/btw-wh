import { ContentReveal } from "@/components/shared/motion";
import { ErrorDisplay } from "@/components/shared/errors";
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
        title="Ошибка загрузки дефицитов"
        description="Не удалось получить результат расчёта. Попробуйте ещё раз."
        onRetry={defsQuery.refetch}
      />
    );

  return (
    <ContentReveal>
      <ContainerComponent defsData={defsQuery.data.data} />
    </ContentReveal>
  );
}
