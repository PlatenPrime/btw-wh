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
  const pullsQuery = useAsksPullsQuery();

  if (pullsQuery.isLoading) return <SkeletonComponent />;

  if (pullsQuery.error)
    return (
      <ErrorDisplay
        error={pullsQuery.error}
        title="Помилка завантаження позицій для зняття"
        description="Не вдалося завантажити позиції для зняття"
      />
    );

  if (!pullsQuery.data || !pullsQuery.data.data) {
    return null;
  }

  return <ContainerComponent data={pullsQuery.data.data} isFetching={pullsQuery.isFetching} />;
}

