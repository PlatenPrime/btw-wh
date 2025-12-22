import { usePosesByPalletQuery } from "@/modules/poses/api/hooks/queries/usePosesByPalletQuery";
import { PosesByPalletContainer } from "@/modules/poses/components/containers/poses-by-pallet-container/PosesByPalletContainer";
import { PosesByPalletContainerSkeleton } from "@/modules/poses/components/containers/poses-by-pallet-container/PosesByPalletContainerSkeleton";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";

interface PosesByPalletFetcherProps {
  palletId: string;
  sortParams?: GetPosesByPalletIdParams;
}

export function PosesByPalletFetcher({
  palletId,
  sortParams,
}: PosesByPalletFetcherProps) {
  const { data, isLoading, refetch, isRefetching } = usePosesByPalletQuery(
    palletId,
    sortParams,
  );

  if (isLoading) {
    return <PosesByPalletContainerSkeleton />;
  }

  return (
    <PosesByPalletContainer
      poses={data}
      isLoading={isLoading}
      refreshing={isRefetching}
      onRefresh={() => void refetch()}
    />
  );
}

