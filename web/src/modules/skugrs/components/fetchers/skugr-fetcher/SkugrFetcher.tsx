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
  const { data, isLoading, error, refetch } = useSkugrPageByIdQuery({ id });

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

  return <ContainerComponent skugr={data.data} />;
}
