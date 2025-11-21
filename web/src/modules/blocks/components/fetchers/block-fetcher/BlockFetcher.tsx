import { ErrorDisplay } from "@/components/shared/error-components";
import { EntityNotFound } from "@/components/shared/entity-not-found";
import { useBlockQuery } from "@/modules/blocks/api/hooks/queries/useBlockQuery";
import type { BlockDto } from "@/modules/blocks/api/types";

interface BlockFetcherProps {
  blockId: string;
  ContainerComponent: React.ComponentType<{ block: BlockDto }>;
  SkeletonComponent: React.ComponentType;
}

export function BlockFetcher({
  blockId,
  ContainerComponent,
  SkeletonComponent,
}: BlockFetcherProps) {
  const {
    data: blockResponse,
    isLoading,
    error,
    refetch,
  } = useBlockQuery({ id: blockId });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження блоку"
        description="Не вдалося завантажити дані блоку"
      />
    );
  }

  if (!blockResponse || !blockResponse.data) {
    return (
      <EntityNotFound
        title="Блок не знайдено"
        description="Блок з таким ID не існує або був видалений"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent block={blockResponse.data} />;
}

