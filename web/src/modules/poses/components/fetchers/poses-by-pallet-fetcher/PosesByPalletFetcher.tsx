import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { usePosesByPalletQuery } from "@/modules/poses/api/hooks/queries/usePosesByPalletQuery";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import type { IPos } from "@/modules/poses/api/types";
import type { ComponentType } from "react";

interface PosesByPalletFetcherProps {
  palletId: string;
  ContainerComponent: ComponentType<{ poses: IPos[] }>;
  SkeletonComponent: ComponentType;
  sortParams?: GetPosesByPalletIdParams;
}

export function PosesByPalletFetcher({
  palletId,
  ContainerComponent,
  SkeletonComponent,
  sortParams,
}: PosesByPalletFetcherProps) {
  const { data: poses, isLoading, error } = usePosesByPalletQuery(
    palletId,
    sortParams,
  );

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції для цієї паллети"
      />
    );

  if (!poses || poses.length === 0)
    return <LoadingNoData description="Позиції не знайдено" />;

  return <ContainerComponent poses={poses} />;
}
