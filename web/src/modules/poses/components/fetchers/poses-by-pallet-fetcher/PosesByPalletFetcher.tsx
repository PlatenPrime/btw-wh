import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePosesByPalletQuery } from "@/modules/poses/api/hooks/queries/usePosesByPalletQuery";
import {
  PosesByPalletContainer,
  PosesByPalletContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-pallet-container";

interface PosesByPalletFetcherProps {
  palletId: string;
}

export function PosesByPalletFetcher({ palletId }: PosesByPalletFetcherProps) {
  const { data: poses, isLoading, error } = usePosesByPalletQuery(palletId);

  if (isLoading) return <PosesByPalletContainerSkeleton />;

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

  return <PosesByPalletContainer poses={poses} />;
}
