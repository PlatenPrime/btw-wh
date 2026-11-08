import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSkuStockBandByIdQuery } from "@/modules/sku-stock-bands/api/hooks/queries/useSkuStockBandByIdQuery";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandContainerSkeleton } from "@/modules/sku-stock-bands/components/containers/sku-stock-band-container";

interface SkuStockBandFetcherProps {
  id: string;
  ContainerComponent: React.ComponentType<{ band: SkuStockBandDto }>;
}

export function SkuStockBandFetcher({
  id,
  ContainerComponent,
}: SkuStockBandFetcherProps) {
  const bandQuery = useSkuStockBandByIdQuery({ id });

  if (bandQuery.isLoading) {
    return <SkuStockBandContainerSkeleton />;
  }

  if (bandQuery.error) {
    return (
      <ErrorDisplay
        error={bandQuery.error}
        title="Помилка завантаження діапазону"
        description="Не вдалося завантажити діапазон залишків"
      />
    );
  }

  if (!bandQuery.data?.data) {
    return <LoadingNoData description="Діапазон не знайдено" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={bandQuery.isFetching}
      isLoading={bandQuery.isLoading}
    >
      <ContainerComponent band={bandQuery.data.data} />
    </DataRefetchOverlay>
  );
}
