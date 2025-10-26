import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useZoneByTitleQuery } from "@/modules/zones/api/hooks/queries/useZoneByTitleQuery";
import type { ZoneDto } from "@/modules/zones/api/types";

interface ZoneFetcherProps {
  zoneTitle: string;
  ContainerComponent: React.ComponentType<{ zone: ZoneDto }>;
  SkeletonComponent: React.ComponentType;
}

export function ZoneFetcher({
  zoneTitle,
  ContainerComponent,
  SkeletonComponent,
}: ZoneFetcherProps) {
  const {
    data: zoneResponse,
    isLoading,
    error,
    refetch,
  } = useZoneByTitleQuery({ title: zoneTitle });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження зони"
        description="Не вдалося завантажити дані зони"
      />
    );
  }

  if (!zoneResponse || !zoneResponse.exists) {
    return (
      <EntityNotFound
        title="Зона не знайдена"
        description="Зона з такою назвою не існує або була видалена"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent zone={zoneResponse.data!} />;
}
