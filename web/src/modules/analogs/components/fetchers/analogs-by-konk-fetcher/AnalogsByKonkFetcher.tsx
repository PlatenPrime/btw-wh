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
  const { data, isLoading, error } = analogsQuery;

  // Сначала проверяем data: при смене страницы keepPreviousData подставляет старые данные,
  // контейнер и кнопки остаются видимыми (как на странице аналогов/зон)
  if (data) {
    if (error) {
      return (
        <ErrorDisplay
          error={error}
          title="Помилка завантаження аналогів конкурента"
          description="Не вдалося завантажити список аналогів"
        />
      );
    }
    if (!data.data?.length && !analogsQuery.isFetching) {
      return <LoadingNoData description="Аналоги конкурента не знайдено" />;
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
        title="Помилка завантаження аналогів конкурента"
        description="Не вдалося завантажити список аналогів"
      />
    );
  }

  return <LoadingNoData description="Аналоги конкурента не знайдено" />;
}
