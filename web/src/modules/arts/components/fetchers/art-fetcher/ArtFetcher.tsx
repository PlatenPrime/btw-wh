import { ContentReveal } from "@/components/shared/motion";
import { EntityNotFound } from "@/components/shared/entities/entity-not-found";
import { ErrorDisplay } from "@/components/shared/errors";
import { useOneArtQuery } from "@/modules/arts/api/hooks/queries/useOneArtQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";

interface ArtFetcherProps {
  artikul: string;
  ContainerComponent: ComponentType<{ artData: ArtDto }>;
  SkeletonComponent: ComponentType;
}

export function ArtFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: ArtFetcherProps) {
  const {
    data: artResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useOneArtQuery(artikul);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження артикулу"
        description="Не вдалося завантажити артикул"
      />
    );

  if (!artResponse || !artResponse.exists)
    return (
      <EntityNotFound
        title="Артикул не знайдено"
        description="Артикул з таким кодом не існує або був видалений"
        onRetry={() => refetch()}
      />
    );

  return (
    <ContentReveal lockMotion={isFetching && !isLoading}>
      <ContainerComponent artData={artResponse.data!} />
    </ContentReveal>
  );
}
