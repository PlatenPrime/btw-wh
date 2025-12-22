import { useRowsQuery } from "@/modules/rows/api/hooks/queries/useRowsQuery";
import { RowsContainer } from "@/modules/rows/components/containers/rows-container/RowsContainer";
import { RowsContainerSkeleton } from "@/modules/rows/components/containers/rows-container/RowsContainerSkeleton";

export function RowsFetcher() {
  const { data, isLoading, refetch, isRefetching } = useRowsQuery();

  if (isLoading) {
    return <RowsContainerSkeleton />;
  }

  return (
    <RowsContainer
      data={data}
      isLoading={isLoading}
      refreshing={isRefetching}
      onRefresh={() => void refetch()}
    />
  );
}

