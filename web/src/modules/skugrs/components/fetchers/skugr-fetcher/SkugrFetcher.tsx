import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useSkugrPageByIdQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrPageByIdQuery";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";

interface SkugrFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ skugr: SkugrPageDto }>;
  SkeletonComponent: React.ComponentType;
}

export function SkugrFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: SkugrFetcherProps) {
  const skugrQuery = useSkugrPageByIdQuery({ id });
  const { data, isLoading, error, refetch, isFetching } = skugrQuery;

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження групи"
        description="Не вдалося завантажити товарну групу"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Групу не знайдено"
        description="Товарної групи з таким ідентифікатором не існує або її видалено"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
      <ContainerComponent skugr={data.data} />
    </DataRefetchOverlay>
  );
}
