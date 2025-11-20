import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { useBlocksQuery } from "@/modules/blocks/api/hooks/queries/useBlocksQuery";
import type { BlockDto } from "@/modules/blocks/api/types";
import type { ComponentType } from "react";

interface BlocksFetcherProps {
  ContainerComponent: ComponentType<{
    blocks: BlockDto[];
  }>;
  SkeletonComponent: ComponentType;
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
        description="Перевірте підключення або спробуйте пізніше"
      />
    );
  }

  if (!data) {
    return <LoadingNoData description="Немає даних від сервера" />;
  }

  return <ContainerComponent blocks={data} />;
}

