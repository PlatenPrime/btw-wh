import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { usePalletByTitleQuery } from "@/modules/pallets/api/hooks/queries/usePalletByTitleQuery";
import type { IPallet } from "@/modules/pallets/api/types";
import type { ComponentType } from "react";

interface PalletFetcherProps {
  palletTitle?: string;
  ContainerComponent: ComponentType<{ pallet: IPallet; onPosCreated?: () => void }>;
  SkeletonComponent: ComponentType;
}

export function PalletFetcher({
  palletTitle,
  ContainerComponent,
  SkeletonComponent,
}: PalletFetcherProps) {
  const {
    data: pallet,
    isLoading,
    error,
    refetch,
  } = usePalletByTitleQuery(palletTitle);

  const handlePosCreated = () => {
    refetch();
  };

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження паллети"
        description="Не вдалося завантажити дані паллети"
      />
    );

  if (!pallet) return <LoadingNoData description="Запитаний палет не існує" />;

  return <ContainerComponent pallet={pallet} onPosCreated={handlePosCreated} />;
}
