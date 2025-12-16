import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useZonesQuery } from "@/modules/zones/api/hooks/queries/useZonesQuery";
import type {
  GetZonesParams,
  ZonesResponseDto,
} from "@/modules/zones/api/types";

interface ZonesFetcherProps {
  params: GetZonesParams;
  ContainerComponent: React.ComponentType<{ data: ZonesResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function ZonesFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: ZonesFetcherProps) {
  const zonesQuery = useZonesQuery(params);

  if (zonesQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (zonesQuery.error) {
    return (
      <ErrorDisplay
        error={zonesQuery.error}
        title="Помилка завантаження списку зон"
        description="Не вдалося завантажити список зон"
      />
    );
  }

  if (!zonesQuery.data?.data || zonesQuery.data.data.length === 0) {
    return <LoadingNoData description="Зони не знайдено" />;
  }

  return <ContainerComponent data={zonesQuery.data} />;
}

