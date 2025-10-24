import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { usePalletByTitleQuery } from "@/modules/pallets/api/hooks/queries/usePalletByTitleQuery";
import type { PalletResponse } from "@/modules/pallets/api/types";
import type { ComponentType } from "react";

interface PalletFetcherProps {
  palletTitle?: string;
  ContainerComponent: ComponentType<{
    pallet: PalletResponse;
    onPosCreated?: () => void;
  }>;
  SkeletonComponent: ComponentType;
}

export function PalletFetcher({
  palletTitle,
  ContainerComponent,
  SkeletonComponent,
}: PalletFetcherProps) {
  const {
    data: palletResponse,
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

  if (!palletResponse || !palletResponse.exists)
    return (
      <EntityNotFound
        title="Палета не знайдена"
        description="Палета з таким назвою не існує або була видалена"
        onRetry={() => refetch()}
      />
    );

  return (
    <ContainerComponent
      pallet={palletResponse}
      onPosCreated={handlePosCreated}
    />
  );
}
