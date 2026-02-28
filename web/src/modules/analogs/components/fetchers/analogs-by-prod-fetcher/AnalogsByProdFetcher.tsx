import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useAnalogsByProdQuery } from "@/modules/analogs/api/hooks/queries/useAnalogsByProdQuery";
import type {
  AnalogsResponseDto,
  GetAnalogsByProdParams,
} from "@/modules/analogs/api/types";

interface AnalogsByProdFetcherProps {
  prodName: string;
  params: GetAnalogsByProdParams;
  ContainerComponent: React.ComponentType<{ data: AnalogsResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function AnalogsByProdFetcher({
  prodName,
  params,
  ContainerComponent,
  SkeletonComponent,
}: AnalogsByProdFetcherProps) {
  const analogsQuery = useAnalogsByProdQuery(prodName, params);

  // При refetch (смена страницы/поиска) показываем старые данные, скелетон только при полном отсутствии данных
  if (analogsQuery.data) {
    if (analogsQuery.error) {
      return (
        <ErrorDisplay
          error={analogsQuery.error}
          title="Помилка завантаження аналогів виробника"
          description="Не вдалося завантажити список аналогів"
        />
      );
    }
    if (!analogsQuery.data.data?.length) {
      return <LoadingNoData description="Аналоги виробника не знайдено" />;
    }
    return <ContainerComponent data={analogsQuery.data} />;
  }

  return <SkeletonComponent />;
}
