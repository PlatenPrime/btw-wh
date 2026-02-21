import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useProdByIdQuery } from "@/modules/prods/api/hooks/queries/useProdByIdQuery";
import type { ProdDto } from "@/modules/prods/api/types";

interface ProdFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ prod: ProdDto }>;
  SkeletonComponent: React.ComponentType;
}

export function ProdFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: ProdFetcherProps) {
  const { data, isLoading, error, refetch } = useProdByIdQuery({ id });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження виробника"
        description="Не вдалося завантажити дані виробника"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Виробника не знайдено"
        description="Виробника з таким ідентифікатором не існує або було видалено"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent prod={data.data} />;
}
