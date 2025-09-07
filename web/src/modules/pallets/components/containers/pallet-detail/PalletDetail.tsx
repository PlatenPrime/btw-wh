import { LoadingError, LoadingNoData } from "@/components/loading-states";
import { usePalletByTitleQuery } from "@/modules/pallets/api/hooks/queries/usePalletByTitleQuery";
import { PalletDetailView } from "./PalletDetailView";
import { PalletDetailSkeleton } from "./skeleton";

interface PalletDetailProps {
  palletTitle?: string;
}

export function PalletDetail({ palletTitle }: PalletDetailProps) {
  const {
    data: pallet,
    isLoading,
    error,
    refetch,
  } = usePalletByTitleQuery(palletTitle);

  const handlePosCreated = () => {
    refetch();
  };

  if (isLoading) {
    return <PalletDetailSkeleton />;
  }

  if (error) {
    return <LoadingError description="Не вдалося завантажити дані паллети" />;
  }

  if (!pallet) {
    return <LoadingNoData description="Запитаний палет не існує" />;
  }

  return <PalletDetailView pallet={pallet} onPosCreated={handlePosCreated} />;
}
