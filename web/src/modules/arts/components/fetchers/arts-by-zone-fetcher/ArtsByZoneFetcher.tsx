import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useArtsByZoneQuery } from "@/modules/arts/api/hooks/queries/useArtsByZoneQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";

interface ArtsByZoneFetcherProps {
  zone?: string;
  ContainerComponent: ComponentType<{ data: ArtDto[]; total: number }>;
  SkeletonComponent: ComponentType;
}

export function ArtsByZoneFetcher({
  zone,
  ContainerComponent,
  SkeletonComponent,
}: ArtsByZoneFetcherProps) {
  const { data, isLoading, error } = useArtsByZoneQuery(zone);

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження артикулів"
        description="Не вдалося завантажити артикули зони"
      />
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return <LoadingNoData description="Ця зона не має артикулів" />;
  }

  return <ContainerComponent data={data.data} total={data.total} />;
}
