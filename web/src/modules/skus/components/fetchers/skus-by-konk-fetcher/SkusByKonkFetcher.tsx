import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useSkusByKonkQuery } from "@/modules/skus/api/hooks/queries/useSkusByKonkQuery";
import type { SkusResponseDto } from "@/modules/skus/api/types";

interface SkusByKonkFetcherParams {
  page: number;
  limit: number;
  prodName?: string;
  search?: string;
}

interface SkusByKonkFetcherProps {
  konkName: string;
  params: SkusByKonkFetcherParams;
  ContainerComponent: React.ComponentType<{ data: SkusResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function SkusByKonkFetcher({
  konkName,
  params,
  ContainerComponent,
  SkeletonComponent,
}: SkusByKonkFetcherProps) {
  const skusQuery = useSkusByKonkQuery(konkName, {
    page: params.page,
    limit: params.limit,
    prodName: params.prodName || undefined,
    search: params.search,
  });
  const { data, isLoading, error } = skusQuery;

  if (data) {
    if (error) {
      return (
        <ErrorDisplay
          error={error}
          title="Помилка завантаження товарів конкурента"
          description="Не вдалося завантажити список SKU"
        />
      );
    }
    if (!data.data?.length && !skusQuery.isFetching) {
      return <LoadingNoData description="Товари конкурента не знайдено" />;
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
        title="Помилка завантаження товарів конкурента"
        description="Не вдалося завантажити список SKU"
      />
    );
  }

  return <LoadingNoData description="Товари конкурента не знайдено" />;
}
