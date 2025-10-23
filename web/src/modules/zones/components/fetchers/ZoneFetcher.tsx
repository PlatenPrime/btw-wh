import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useZoneByIdQuery } from "@/modules/zones/api/hooks/queries/useZoneByIdQuery";

interface ZoneFetcherProps {
  zoneId: string;
  ContainerComponent: React.ComponentType<{ zone: any }>;
  SkeletonComponent: React.ComponentType;
}

export function ZoneFetcher({
  zoneId,
  ContainerComponent,
  SkeletonComponent,
}: ZoneFetcherProps) {
  const { data, isLoading, error } = useZoneByIdQuery({ id: zoneId });

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

  if (!data?.data) {
    return <LoadingNoData description="Зона не найдена" />;
  }

  return <ContainerComponent zone={data.data} />;
}
