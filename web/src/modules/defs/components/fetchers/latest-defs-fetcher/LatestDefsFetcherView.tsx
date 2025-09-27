import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import type { GetLatestDefsResponse } from "@/modules/defs/api/types/dto";
import { DefsContainer } from "@/modules/defs/components/containers/defs-container/DefsContainer";
import { DefsContainerSkeleton } from "@/modules/defs/components/containers/defs-container/DefsContainerSkeleton";

interface LatestDefsFetcherViewProps {
  data: GetLatestDefsResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function LatestDefsFetcherView({
  data,
  isLoading,
  error,
  refetch,
}: LatestDefsFetcherViewProps) {
  if (isLoading) {
    return <DefsContainerSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Ошибка загрузки дефицитов"
        description={
          error?.message || "Не удалось загрузить данные о дефицитах"
        }
        onRetry={refetch}
      />
    );
  }

  if (!data?.data) {
    return (
      <ErrorDisplay
        error="Нет данных о дефицитах"
        title="Нет данных о дефицитах"
        description="Расчеты дефицитов еще не проводились"
        onRetry={refetch}
      />
    );
  }

  return <DefsContainer defsData={data.data} />;
}
