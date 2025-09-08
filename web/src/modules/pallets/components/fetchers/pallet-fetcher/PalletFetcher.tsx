import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePalletByTitleQuery } from "@/modules/pallets/api/hooks/queries/usePalletByTitleQuery";
import {
  PalletContainer,
  PalletContainerSkeleton,
} from "@/modules/pallets/components/containers/pallet-container";

interface PalletFetcherProps {
  palletTitle?: string;
}

export function PalletFetcher({ palletTitle }: PalletFetcherProps) {
  const {
    data: pallet,
    isLoading,
    error,
    refetch,
  } = usePalletByTitleQuery(palletTitle);

  const handlePosCreated = () => {
    refetch();
  };

  if (isLoading) return <PalletContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження паллети"
        description="Не вдалося завантажити дані паллети"
      />
    );

  if (!pallet) return <LoadingNoData description="Запитаний палет не існує" />;

  return <PalletContainer pallet={pallet} onPosCreated={handlePosCreated} />;
}
