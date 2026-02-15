import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useDelByIdQuery } from "@/modules/dels/api/hooks/queries/useDelByIdQuery";
import type { DelDto } from "@/modules/dels/api/types";

interface DelFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ del: DelDto }>;
  SkeletonComponent: React.ComponentType;
}

export function DelFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: DelFetcherProps) {
  const { data, isLoading, error, refetch } = useDelByIdQuery({ id });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження поставки"
        description="Не вдалося завантажити дані поставки"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Поставку не знайдено"
        description="Поставку з таким ідентифікатором не існує або була видалена"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent del={data.data} />;
}
