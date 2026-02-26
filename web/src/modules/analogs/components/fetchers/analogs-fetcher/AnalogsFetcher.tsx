import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useAnalogsQuery } from "@/modules/analogs/api/hooks/queries/useAnalogsQuery";
import type {
  AnalogsResponseDto,
  GetAnalogsParams,
} from "@/modules/analogs/api/types";

interface AnalogsFetcherProps {
  params: GetAnalogsParams;
  ContainerComponent: React.ComponentType<{ data: AnalogsResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function AnalogsFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: AnalogsFetcherProps) {
  const analogsQuery = useAnalogsQuery(params);

  if (analogsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (analogsQuery.error) {
    return (
      <ErrorDisplay
        error={analogsQuery.error}
        title="Помилка завантаження списку аналогів"
        description="Не вдалося завантажити список аналогів"
      />
    );
  }

  if (!analogsQuery.data?.data || analogsQuery.data.data.length === 0) {
    return <LoadingNoData description="Аналоги не знайдено" />;
  }

  return <ContainerComponent data={analogsQuery.data} />;
}
