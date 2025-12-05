import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { useAskPullQuery } from "@/modules/asks/api/hooks/queries/useAskPullQuery";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface AskPullPositionsFetcherProps {
  askId: string;
  ContainerComponent: ComponentType<{
    data: GetAskPullResponse;
    isFetching: boolean;
  }>;
  SkeletonComponent: ComponentType;
}

export function AskPullPositionsFetcher({
  askId,
  ContainerComponent,
  SkeletonComponent,
}: AskPullPositionsFetcherProps) {
  const { data, isLoading, isFetching, error } = useAskPullQuery({ askId });

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій для зняття"
        description="Не вдалося завантажити позиції для зняття"
      />
    );

  if (!data || !data.exists || !data.data) {
    return null; // Не показываем контейнер если ask не найден
  }

  // Всегда показываем контейнер, даже если снимать не нужно
  return <ContainerComponent data={data.data} isFetching={isFetching} />;
}
