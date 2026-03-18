import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useVariantByIdQuery } from "@/modules/variants/api/hooks/queries/useVariantByIdQuery";
import type { VariantDto } from "@/modules/variants/api/types";

interface VariantFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{
    variant: VariantDto;
  }>;
  SkeletonComponent: React.ComponentType;
}

export function VariantFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: VariantFetcherProps) {
  const { data, isLoading, error, refetch } = useVariantByIdQuery({ id });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження варіанта"
        description="Не вдалося завантажити дані варіанта"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Варіант не знайдено"
        description="Варіанта з таким ідентифікатором не існує або було видалено"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent variant={data.data} />;
}

