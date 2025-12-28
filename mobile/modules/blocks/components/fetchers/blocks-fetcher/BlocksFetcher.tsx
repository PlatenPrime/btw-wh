import { useBlocksQuery } from "@/modules/blocks/api/hooks/queries/useBlocksQuery";
import { BlocksContainer } from "@/modules/blocks/components/containers/blocks-container";
import { BlocksContainerSkeleton } from "@/modules/blocks/components/containers/blocks-container";

export function BlocksFetcher() {
  const { data, isLoading, refetch, isRefetching } = useBlocksQuery();

  if (isLoading) {
    return <BlocksContainerSkeleton />;
  }

  const blocks = data?.exists && data?.data ? data.data : undefined;

  return (
    <BlocksContainer
      blocks={blocks}
      isLoading={isLoading}
      refreshing={isRefetching}
      onRefresh={() => void refetch()}
    />
  );
}

