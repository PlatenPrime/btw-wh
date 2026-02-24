import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useConstantByIdQuery } from "@/modules/constants/api/hooks/queries/useConstantByIdQuery";
import type { ConstantDto } from "@/modules/constants/api/types";

interface ConstantFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ constant: ConstantDto }>;
  SkeletonComponent: React.ComponentType;
}

export function ConstantFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: ConstantFetcherProps) {
  const { data, isLoading, error, refetch } = useConstantByIdQuery({ id });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження константи"
        description="Не вдалося завантажити дані константи"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Константу не знайдено"
        description="Константу з таким ідентифікатором не існує або було видалено"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent constant={data.data} />;
}
