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
  const { data, isLoading, error } = useBlocksQuery();

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження блоків"
        description="Не вдалося завантажити дані блоків"
      />
    );
  }

  if (!data || !data.exists) {
    return <BlocksEmptyState />;
  }

  return <ContainerComponent data={data.data} />;
}
