import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePosByIdQuery } from "@/modules/poses/api/hooks/queries/usePosByIdQuery";
import {
  PosContainer,
  PosContainerSkeleton,
} from "@/modules/poses/components/containers/pos-container";

interface PosFetcherProps {
  posId: string;
}

export function PosFetcher({ posId }: PosFetcherProps) {
  const { data: pos, isLoading, error } = usePosByIdQuery(posId);

  if (isLoading) return <PosContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позиції"
        description="Не вдалося завантажити дані позиції"
      />
    );

  if (!pos) return <LoadingNoData description="Позицію не знайдено" />;

  return <PosContainer pos={pos} />;
}
