import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePosesByRowQuery } from "@/modules/poses/api/hooks/queries/usePosesByRowQuery";
import {
  PosesByRowContainer,
  PosesByRowContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-row-container";

interface PosesByRowFetcherProps {
  rowId: string;
}

export function PosesByRowFetcher({ rowId }: PosesByRowFetcherProps) {
  const { data: poses, isLoading, error } = usePosesByRowQuery(rowId);

  if (isLoading) return <PosesByRowContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції для цього ряду"
      />
    );

  if (!poses || poses.length === 0)
    return <LoadingNoData description="Позиції не знайдено" />;

  return <PosesByRowContainer poses={poses} />;
}
