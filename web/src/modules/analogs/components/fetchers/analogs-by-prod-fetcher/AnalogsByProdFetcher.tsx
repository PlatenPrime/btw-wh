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
  const { data, isLoading, error } = analogsQuery;

  // Сначала проверяем data: при смене страницы keepPreviousData подставляет старые данные,
  // контейнер и кнопки остаются видимыми (как на странице аналогов/зон)
  if (data) {
    if (error) {
      return (
        <ErrorDisplay
          error={error}
          title="Помилка завантаження аналогів виробника"
          description="Не вдалося завантажити список аналогів"
        />
      );
    }
    if (!data.data?.length && !analogsQuery.isFetching) {
      return <LoadingNoData description="Аналоги виробника не знайдено" />;
    }
    return <ContainerComponent data={data} />;
  }

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження аналогів виробника"
        description="Не вдалося завантажити список аналогів"
      />
    );
  }

  return <LoadingNoData description="Аналоги виробника не знайдено" />;
}
