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
  const askPullQuery = useAskPullQuery({ askId });

  if (askPullQuery.isLoading) return <SkeletonComponent />;

  if (askPullQuery.error)
    return (
      <ErrorDisplay
        error={askPullQuery.error}
        title="Помилка завантаження позицій для зняття"
        description="Не вдалося завантажити позиції для зняття"
      />
    );

  if (!askPullQuery.data || !askPullQuery.data.exists || !askPullQuery.data.data) {
    return null; // Не показываем контейнер если ask не найден
  }

  // Всегда показываем контейнер, даже если снимать не нужно
  return <ContainerComponent data={askPullQuery.data.data} isFetching={askPullQuery.isFetching} />;
}
