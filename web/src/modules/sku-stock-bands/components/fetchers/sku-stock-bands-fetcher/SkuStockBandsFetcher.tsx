import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useSkuStockBandsQuery } from "@/modules/sku-stock-bands/api/hooks/queries/useSkuStockBandsQuery";
import type { SkuStockBandsListResponse } from "@/modules/sku-stock-bands/api/types";

interface SkuStockBandsFetcherProps {
  konkName?: string;
  ContainerComponent: React.ComponentType<{ data: SkuStockBandsListResponse }>;
  SkeletonComponent: React.ComponentType;
}

export function SkuStockBandsFetcher({
  konkName,
  ContainerComponent,
  SkeletonComponent,
}: SkuStockBandsFetcherProps) {
  const bandsQuery = useSkuStockBandsQuery({ konkName });

  if (bandsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (bandsQuery.error) {
    return (
      <ErrorDisplay
        error={bandsQuery.error}
        title="Помилка завантаження діапазонів"
        description="Не вдалося завантажити збережені діапазони залишків"
      />
    );
  }

  if (!bandsQuery.data?.data || bandsQuery.data.data.length === 0) {
    return <LoadingNoData description="Діапазонів не знайдено" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={bandsQuery.isFetching}
      isLoading={bandsQuery.isLoading}
    >
      <ContainerComponent data={bandsQuery.data} />
    </DataRefetchOverlay>
  );
}
