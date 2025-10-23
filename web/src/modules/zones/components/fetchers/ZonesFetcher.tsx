import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useZonesQuery } from "@/modules/zones/api/hooks/queries/useZonesQuery";
import type { GetZonesParams } from "@/modules/zones/api/types";

interface ZonesFetcherProps {
  params: GetZonesParams;
  ContainerComponent: React.ComponentType<{ data: any }>;
  SkeletonComponent: React.ComponentType;
}

export function ZonesFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: ZonesFetcherProps) {
  const { data, isLoading, error } = useZonesQuery(params);

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Ошибка загрузки зон"
        description="Не удалось загрузить список зон"
      />
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <LoadingNoData description="Зоны не найдены" />;
  }

  return <ContainerComponent data={data} />;
}
