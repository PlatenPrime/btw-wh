import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useGraboSkusQuery } from "@/modules/grabo-skus/api/hooks/queries/useGraboSkusQuery";
import type { GraboSkusResponseDto } from "@/modules/grabo-skus/api/types";
import type { ComponentType } from "react";

interface GraboSkusFetcherParams {
  page: number;
  limit: number;
  search?: string;
  color?: string;
  size?: string;
  material?: string;
  gas?: string;
  language?: string;
  isOnSite?: boolean;
  isNewProduct?: boolean;
}

interface GraboSkusFetcherProps {
  params: GraboSkusFetcherParams;
  ContainerComponent: ComponentType<{ data: GraboSkusResponseDto }>;
  SkeletonComponent: ComponentType;
}

export function GraboSkusFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: GraboSkusFetcherProps) {
  const skusQuery = useGraboSkusQuery({
    page: params.page,
    limit: params.limit,
    search: params.search,
    color: params.color,
    size: params.size,
    material: params.material,
    gas: params.gas,
    language: params.language,
    isOnSite: params.isOnSite,
    isNewProduct: params.isNewProduct,
  });
  const { data, isLoading, error } = skusQuery;

  if (data) {
    if (error) {
      return (
        <ErrorDisplay
          error={error}
          title="Помилка завантаження товарів Grabo"
          description="Не вдалося завантажити каталог"
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
        title="Помилка завантаження товарів Grabo"
        description="Не вдалося завантажити каталог"
      />
    );
  }

  return (
    <LoadingNoData description="Товари за обраними фільтрами не знайдено" />
  );
}
