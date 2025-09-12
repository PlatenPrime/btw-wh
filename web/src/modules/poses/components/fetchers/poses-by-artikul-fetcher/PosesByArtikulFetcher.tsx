import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePosesByArtikulQuery } from "@/modules/poses/api/hooks/queries/usePosesByArtikulQuery";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import type { ComponentType } from "react";

interface PosesByArtikulFetcherProps {
  artikul: string;
  ContainerComponent: ComponentType<{ data: GetPosesByArtikulResponse }>;
  SkeletonComponent: ComponentType;
}

export function PosesByArtikulFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: PosesByArtikulFetcherProps) {
  const { data, isLoading, error } = usePosesByArtikulQuery(artikul);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції для цього артикулу"
      />
    );

  if (!data || data.total === 0)
    return <LoadingNoData description="Позиції не знайдено" />;

  return <ContainerComponent data={data} />;
}
