import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components";
import { useAnalogByIdQuery } from "@/modules/analogs/api/hooks/queries/useAnalogByIdQuery";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";

interface AnalogFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ analog: EnrichedAnalogDto }>;
  SkeletonComponent: React.ComponentType;
}

export function AnalogFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: AnalogFetcherProps) {
  const { data, isLoading, error, refetch } = useAnalogByIdQuery({ id });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження аналога"
        description="Не вдалося завантажити дані аналога"
      />
    );
  }

  if (!data?.data) {
    return (
      <EntityNotFound
        title="Аналог не знайдено"
        description="Аналога з таким ідентифікатором не існує або було видалено"
        onRetry={() => refetch()}
      />
    );
  }

  return <ContainerComponent analog={data.data} />;
}
