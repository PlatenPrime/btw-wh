import { ContentReveal } from "@/components/shared/motion";
import { EntityNotFound } from "@/components/shared/entities/entity-not-found";
import { ErrorDisplay } from "@/components/shared/errors";
import { useApiTaskByIdQuery } from "@/modules/apitasks/api/hooks/queries/useApiTaskByIdQuery";
import type { ApiTaskDto } from "@/modules/apitasks/api/types";

interface ApiTaskFetcherProps {
  taskId: string;
  ContainerComponent: React.ComponentType<{ task: ApiTaskDto }>;
  SkeletonComponent: React.ComponentType;
}

export function ApiTaskFetcher({
  taskId,
  ContainerComponent,
  SkeletonComponent,
}: ApiTaskFetcherProps) {
  const { data, isLoading, isFetching, error, refetch } = useApiTaskByIdQuery({
    taskId,
  });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження задачі"
        description="Не вдалося завантажити дані ApiTask"
        onRetry={() => void refetch()}
      />
    );
  }

  if (!data) {
    return (
      <EntityNotFound
        title="Задачу не знайдено"
        description="Задачу з таким ідентифікатором не існує, вона чужа або прострочена"
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <ContentReveal lockMotion={isFetching && !isLoading}>
      <ContainerComponent task={data} />
    </ContentReveal>
  );
}
