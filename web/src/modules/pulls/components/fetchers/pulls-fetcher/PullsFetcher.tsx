import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { usePullsQuery } from "@/modules/pulls/api/hooks/queries/usePullsQuery";
import type { GetPullsResponse } from "@/modules/pulls/api/types/dto";
import type { ComponentType } from "react";

interface PullsFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetPullsResponse;
    isFetching: boolean;
  }>;
  SkeletonComponent: ComponentType;
  enabled?: boolean;
  refetchInterval?: number;
}

export function PullsFetcher({
  ContainerComponent,
  SkeletonComponent,
  enabled = true,
  refetchInterval = 30000,
}: PullsFetcherProps) {
  const { data, isLoading, error, isFetching } = usePullsQuery({
    enabled,
    refetchInterval,
  });

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження pulls"
        description="Не вдалося завантажити pulls"
      />
    );

  if (!data || !data.data)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <ContainerComponent data={data} isFetching={isFetching} />;
}

