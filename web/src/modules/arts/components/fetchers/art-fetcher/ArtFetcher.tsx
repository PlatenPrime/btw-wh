import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
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
  const { data: artData, isLoading, error } = useOneArtQuery(artikul);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження артикулу"
        description="Не вдалося завантажити артикул"
      />
    );

  if (!artData)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <ContainerComponent artData={artData} />;
}
