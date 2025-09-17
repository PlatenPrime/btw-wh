import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { useAllPosesQuery } from "@/modules/poses/api/hooks/queries/useAllPosesQuery";
import type { PosListResponse } from "@/modules/poses/api/types";
import type { ComponentType } from "react";

interface AllPosesFetcherProps {
  params?: Partial<{
    page: number;
    limit: number;
    palletId: string;
    rowId: string;
    artikul: string;
    sklad: string;
  }>;
  ContainerComponent: ComponentType<{ data: PosListResponse }>;
  SkeletonComponent: ComponentType;
}

export function AllPosesFetcher({
  params = {},
  ContainerComponent,
  SkeletonComponent,
}: AllPosesFetcherProps) {
  const { data, isLoading, error } = useAllPosesQuery(params);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції"
      />
    );

  if (!data || !data.data || data.data.length === 0)
    return <LoadingNoData description="Позиції не знайдено" />;

  return <ContainerComponent data={data} />;
}
