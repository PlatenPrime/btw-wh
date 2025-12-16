import { ErrorDisplay } from "@/components/shared/error-components";
import { useBlocksQuery } from "@/modules/blocks/api/hooks/queries/useBlocksQuery";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlocksEmptyState } from "@/modules/blocks/components/fetchers/blocks-fetcher/BlocksEmptyState";

interface BlocksFetcherProps {
  ContainerComponent: React.ComponentType<{ data: BlockDto[] }>;
  SkeletonComponent: React.ComponentType;
}

export function BlocksFetcher({
  ContainerComponent,
  SkeletonComponent,
}: BlocksFetcherProps) {
  const blocksQuery = useBlocksQuery();

  if (blocksQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (blocksQuery.error) {
    return (
      <ErrorDisplay
        error={blocksQuery.error}
        title="Помилка завантаження блоків"
        description="Не вдалося завантажити дані блоків"
      />
    );
  }

  if (!blocksQuery.data || !blocksQuery.data.exists) {
    return <BlocksEmptyState />;
  }

  return <ContainerComponent data={blocksQuery.data.data} />;
}
