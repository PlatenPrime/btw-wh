import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useKonkByIdQuery } from "@/modules/konks/api/hooks/queries/useKonkByIdQuery";
import type { KonkDto } from "@/modules/konks/api/types";

interface KonkFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ konk: KonkDto }>;
  SkeletonComponent: React.ComponentType;
}

export function KonkFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: KonkFetcherProps) {
  const konkQuery = useKonkByIdQuery({ id });
  const { data, isLoading, error, refetch, isFetching } = konkQuery;

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження конкурента"
        description="Не вдалося завантажити дані конкурента"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Конкурента не знайдено"
        description="Конкурента з таким ідентифікатором не існує або було видалено"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
      <ContainerComponent konk={data.data} />
    </DataRefetchOverlay>
  );
}
