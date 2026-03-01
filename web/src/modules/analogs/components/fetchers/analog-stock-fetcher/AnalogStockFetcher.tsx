import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { useAnalogStockQuery } from "@/modules/analogs/api/hooks/queries/useAnalogStockQuery";
import type { AnalogStockDto } from "@/modules/analogs/api/types";
import type { ComponentType } from "react";

export interface AnalogStockContainerProps {
  analogId: string;
  data: AnalogStockDto | null;
  message?: string;
  onRetry: () => void;
}

interface AnalogStockFetcherProps {
  analogId: string | undefined;
  ContainerComponent: ComponentType<AnalogStockContainerProps>;
  SkeletonComponent: ComponentType;
}

export function AnalogStockFetcher({
  analogId,
  ContainerComponent,
  SkeletonComponent,
}: AnalogStockFetcherProps) {
  const { data: response, isLoading, error, refetch } = useAnalogStockQuery({
    id: analogId,
  });

  if (!analogId) {
    return (
      <LoadingNoData description="Ідентифікатор аналога не передано для завантаження залишку та ціни" />
    );
  }

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження залишку та ціни"
        description="Не вдалося завантажити дані про наявність та ціну товару"
      />
    );

  const containerProps: AnalogStockContainerProps = {
    analogId,
    data: response?.data ?? null,
    message: response?.message,
    onRetry: () => {
      void refetch();
    },
  };

  return <ContainerComponent {...containerProps} />;
}
