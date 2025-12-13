import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { useAsksPullsQuery } from "@/modules/asks/api/hooks/queries/useAsksPullsQuery";
import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface PullsFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetAsksPullsResponse["data"];
    isFetching: boolean;
  }>;
  SkeletonComponent: ComponentType;
}

export function PullsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: PullsFetcherProps) {
  const { data, isLoading, isFetching, error } = useAsksPullsQuery();

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій для зняття"
        description="Не вдалося завантажити позиції для зняття"
      />
    );

  if (!data || !data.data) {
    return null;
  }

  return <ContainerComponent data={data.data} isFetching={isFetching} />;
}

