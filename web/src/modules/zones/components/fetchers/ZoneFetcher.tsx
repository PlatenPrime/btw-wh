import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useZoneByIdQuery } from "@/modules/zones/api/hooks/queries/useZoneByIdQuery";
import type { ZoneDto } from "@/modules/zones/api/types";

interface ZoneFetcherProps {
  zoneId: string;
  ContainerComponent: React.ComponentType<{ zone: ZoneDto }>;
  SkeletonComponent: React.ComponentType;
}

export function ZoneFetcher({
  zoneId,
  ContainerComponent,
  SkeletonComponent,
}: ZoneFetcherProps) {
  const {
    data: zoneResponse,
    isLoading,
    error,
    refetch,
  } = useZoneByIdQuery({ id: zoneId });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Ошибка загрузки зоны"
        description="Не удалось загрузить данные зоны"
      />
    );
  }

  if (!zoneResponse || !zoneResponse.exists) {
    return (
      <EntityNotFound
        title="Зона не найдена"
        description="Зона с таким ID не существует или была удалена"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent zone={zoneResponse.data!} />;
}
