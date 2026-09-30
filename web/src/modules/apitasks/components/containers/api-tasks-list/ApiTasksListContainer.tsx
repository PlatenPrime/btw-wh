import { useApiTasksListQuery } from "@/modules/apitasks/api/hooks/queries/useApiTasksListQuery";
import { ErrorDisplay } from "@/components/shared/errors";
import { ApiTasksListContainerSkeleton } from "./ApiTasksListContainerSkeleton";
import { ApiTasksListContainerView } from "./ApiTasksListContainerView";

export function ApiTasksListContainer() {
  const { data, isLoading, error, refetch } = useApiTasksListQuery();

  if (isLoading) {
    return <ApiTasksListContainerSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження задач"
        description="Не вдалося отримати список ApiTasks"
        onRetry={() => void refetch()}
      />
    );
  }

  return <ApiTasksListContainerView tasks={data ?? []} />;
}
