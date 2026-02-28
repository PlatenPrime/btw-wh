import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useAnalogsByKonkQuery } from "@/modules/analogs/api/hooks/queries/useAnalogsByKonkQuery";
import type {
  AnalogsResponseDto,
  GetAnalogsByKonkParams,
} from "@/modules/analogs/api/types";

interface AnalogsByKonkFetcherProps {
  konkName: string;
  params: GetAnalogsByKonkParams;
  ContainerComponent: React.ComponentType<{ data: AnalogsResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function AnalogsByKonkFetcher({
  konkName,
  params,
  ContainerComponent,
  SkeletonComponent,
}: AnalogsByKonkFetcherProps) {
  const analogsQuery = useAnalogsByKonkQuery(konkName, params);

  // При refetch (смена страницы/поиска) показываем старые данные, скелетон только при полном отсутствии данных
  if (analogsQuery.data) {
    if (analogsQuery.error) {
      return (
        <ErrorDisplay
          error={analogsQuery.error}
          title="Помилка завантаження аналогів конкурента"
          description="Не вдалося завантажити список аналогів"
        />
      );
    }
    if (!analogsQuery.data.data?.length) {
      return <LoadingNoData description="Аналоги конкурента не знайдено" />;
    }
    return <ContainerComponent data={analogsQuery.data} />;
  }

  return <SkeletonComponent />;
}
