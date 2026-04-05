import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useSkusCatalogQuery } from "@/modules/skus/api/hooks/queries/useSkusCatalogQuery";
import type { SkusResponseDto } from "@/modules/skus/api/types";

interface CompetitorSkusFetcherParams {
  page: number;
  limit: number;
  konkName?: string;
  prodName?: string;
  search?: string;
  isInvalid?: boolean;
  createdFrom?: string;
}

interface CompetitorSkusFetcherProps {
  params: CompetitorSkusFetcherParams;
  ContainerComponent: React.ComponentType<{ data: SkusResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function CompetitorSkusFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: CompetitorSkusFetcherProps) {
  const skusQuery = useSkusCatalogQuery({
    page: params.page,
    limit: params.limit,
    konkName: params.konkName,
    prodName: params.prodName,
    search: params.search,
    isInvalid: params.isInvalid,
    createdFrom: params.createdFrom,
  });
  const { data, isLoading, error } = skusQuery;

  if (data) {
    if (error) {
      return (
        <ErrorDisplay
          error={error}
          title="Помилка завантаження товарів"
          description="Не вдалося завантажити список SKU конкурентів"
        />
      );
    }
    if (!data.data?.length && !skusQuery.isFetching) {
      return (
        <LoadingNoData description="Товари за обраними фільтрами не знайдено" />
      );
    }
    return (
      <DataRefetchOverlay
        isFetching={skusQuery.isFetching}
        isLoading={skusQuery.isLoading}
      >
        <ContainerComponent data={data} />
      </DataRefetchOverlay>
    );
  }

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження товарів"
        description="Не вдалося завантажити список SKU конкурентів"
      />
    );
  }

  return (
    <LoadingNoData description="Товари за обраними фільтрами не знайдено" />
  );
}
