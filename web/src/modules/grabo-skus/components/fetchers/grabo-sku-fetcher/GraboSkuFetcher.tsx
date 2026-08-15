import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { EntityNotFound } from "@/components/shared/entities/entity-not-found";
import { ErrorDisplay } from "@/components/shared/errors";
import { useGraboSkuByIdQuery } from "@/modules/grabo-skus/api/hooks/queries/useGraboSkuByIdQuery";
import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import { isAxiosError } from "axios";
import type { ComponentType } from "react";

interface GraboSkuFetcherProps {
  id: string;
  ContainerComponent: ComponentType<{ sku: GraboSkuDto }>;
  SkeletonComponent: ComponentType;
}

export function GraboSkuFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: GraboSkuFetcherProps) {
  const skuQuery = useGraboSkuByIdQuery({ id });
  const { data, isLoading, error, refetch, isFetching } = skuQuery;

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return (
        <EntityNotFound
          title="Товар не знайдено"
          description="Товар Grabo з таким ідентифікатором не існує"
          onRetry={() => refetch()}
        />
      );
    }
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження товару Grabo"
        description="Не вдалося завантажити картку товару"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Товар не знайдено"
        description="Товар Grabo з таким ідентифікатором не існує"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
      <ContainerComponent sku={data.data} />
    </DataRefetchOverlay>
  );
}
