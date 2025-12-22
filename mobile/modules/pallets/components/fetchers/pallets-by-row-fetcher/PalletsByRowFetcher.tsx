import { usePalletsByRowQuery } from "@/modules/pallets/api/hooks/queries/usePalletsByRowQuery";
import { PalletsByRowContainer } from "@/modules/pallets/components/containers/pallets-by-row-container/PalletsByRowContainer";
import { PalletsByRowContainerSkeleton } from "@/modules/pallets/components/containers/pallets-by-row-container/PalletsByRowContainerSkeleton";

interface PalletsByRowFetcherProps {
  rowId: string;
}

export function PalletsByRowFetcher({ rowId }: PalletsByRowFetcherProps) {
  const { data, isLoading, refetch, isRefetching } = usePalletsByRowQuery(rowId);

  if (isLoading) {
    return <PalletsByRowContainerSkeleton />;
  }

  return (
    <PalletsByRowContainer
      pallets={data}
      rowId={rowId}
      isLoading={isLoading}
      refreshing={isRefetching}
      onRefresh={() => void refetch()}
    />
  );
}

