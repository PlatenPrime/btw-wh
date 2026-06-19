import { ContentReveal } from "@/components/shared/motion";
import { ErrorDisplay } from "@/components/shared/errors";
import { EntityNotFound } from "@/components/shared/entities/entity-not-found";
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

  if (!blockResponse || !blockResponse.exists) {
    return (
      <EntityNotFound
        title="Блок не знайдено"
        description="Блок з таким ID не існує або був видалений"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <ContentReveal>
      <ContainerComponent block={blockResponse.data!} />
    </ContentReveal>
  );
}

