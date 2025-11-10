import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { PullsContainer } from "@/modules/pulls/components/containers/pulls-container/PullsContainer";
import { PullsContainerSkeleton } from "@/modules/pulls/components/containers/pulls-container/PullsContainerSkeleton";
import { usePullsQuery } from "@/modules/pulls/api/hooks/queries/usePullsQuery";
import { useCallback } from "react";

export function Pulls() {
  const {
    data,
    error,
    isPending,
    isRefetching,
    refetch,
  } = usePullsQuery();

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <SidebarInsetLayout headerText="Pulls">
      <main className="p-3 md:p-4">
        {isPending && <PullsContainerSkeleton />}

        {!isPending && error && (
          <ErrorDisplay
            error={error}
            title="Помилка завантаження pulls"
            description="Перевір з'єднання та спробуй знову"
            onRetry={handleRefresh}
          />
        )}

        {!isPending && !error && !data && (
          <LoadingNoData description="Немає даних для відображення" />
        )}

        {!isPending && !error && data && (
          <PullsContainer
            data={data}
            isFetching={isRefetching}
            onRefresh={handleRefresh}
          />
        )}
      </main>
    </SidebarInsetLayout>
  );
}
