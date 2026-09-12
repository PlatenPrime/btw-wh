import { ContentReveal } from "@/components/shared/motion";
import { ErrorDisplay } from '@/components/shared/errors';
import { LoadingNoData } from '@/components/shared/feedback/loading-states';
import { usePosesByRowQuery } from "@/modules/poses/api/hooks/queries/usePosesByRowQuery";
import type { IPos } from "@/modules/poses/api/types";
import type { ComponentType } from "react";

interface PosesByRowFetcherProps {
  rowId: string;
  ContainerComponent: ComponentType<{ poses: IPos[] }>;
  SkeletonComponent: ComponentType;
}

export function PosesByRowFetcher({
  rowId,
  ContainerComponent,
  SkeletonComponent,
}: PosesByRowFetcherProps) {
  const posesQuery = usePosesByRowQuery(rowId);
  const poses = posesQuery.data;

  if (posesQuery.isLoading) return <SkeletonComponent />;

  if (posesQuery.error)
    return (
      <ErrorDisplay
        error={posesQuery.error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції для цього ряду"
      />
    );

  if (!poses || poses.length === 0)
    return <LoadingNoData description="Позиції не знайдено" />;

  return (
    <ContentReveal lockMotion={posesQuery.isFetching && !posesQuery.isLoading}>
      <ContainerComponent poses={poses} />
    </ContentReveal>
  );
}
