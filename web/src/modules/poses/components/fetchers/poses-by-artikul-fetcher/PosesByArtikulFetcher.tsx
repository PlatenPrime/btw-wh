import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
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
  const posesQuery = usePosesByArtikulQuery(artikul);

  if (posesQuery.isLoading || posesQuery.isFetching) return <SkeletonComponent />;

  if (posesQuery.error)
    return (
      <ErrorDisplay
        error={posesQuery.error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції для цього артикулу"
      />
    );

  if (!posesQuery.data )
    return <LoadingNoData description="Позиції не знайдено" />;

  // Дополнительная проверка структуры данных
  if (!posesQuery.data.pogrebi || !posesQuery.data.merezhi) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        Некоректна структура даних
      </div>
    );
  }

  return <ContainerComponent data={posesQuery.data} />;
}
