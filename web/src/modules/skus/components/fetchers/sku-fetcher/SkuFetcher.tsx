import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useSkuByIdQuery } from "@/modules/skus/api/hooks/queries/useSkuByIdQuery";
import type { SkuDto } from "@/modules/skus/api/types";

interface SkuFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ sku: SkuDto }>;
  SkeletonComponent: React.ComponentType;
}

export function SkuFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: SkuFetcherProps) {
  const skuQuery = useSkuByIdQuery({ id });
  const { data, isLoading, error, refetch, isFetching } = skuQuery;

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження товару"
        description="Не вдалося завантажити SKU конкурента"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Товар не знайдено"
        description="SKU з таким ідентифікатором не існує або його видалено"
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
