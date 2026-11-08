import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandDetailsCard } from "@/modules/sku-stock-bands/components/cards/sku-stock-band-details-card";
import { SkuStockBandDiscoverControls } from "@/modules/sku-stock-bands/components/controls/sku-stock-band-discover-controls";
import { SkuStockBandDiscoverFetcher } from "@/modules/sku-stock-bands/components/fetchers/sku-stock-band-discover-fetcher";
import type { ReactNode } from "react";

interface SkuStockBandContainerViewProps {
  band: SkuStockBandDto;
  dateFrom: string;
  dateTo: string;
  isSubmitReady: boolean;
  isFetching: boolean;
  canFetch: boolean;
  onDateRangeChange: (from: string, to: string) => void;
  onSubmit: () => void;
  headerActions?: ReactNode;
}

export function SkuStockBandContainerView({
  band,
  dateFrom,
  dateTo,
  isSubmitReady,
  isFetching,
  canFetch,
  onDateRangeChange,
  onSubmit,
  headerActions,
}: SkuStockBandContainerViewProps) {
  return (
    <div className="grid gap-4">
      {headerActions}
      <SkuStockBandDetailsCard band={band} />
      <SkuStockBandDiscoverControls
        dateFrom={dateFrom}
        dateTo={dateTo}
        isSubmitReady={isSubmitReady}
        isFetching={isFetching}
        onDateRangeChange={onDateRangeChange}
        onSubmit={onSubmit}
      />
      {!canFetch ? (
        <p className="text-muted-foreground text-sm">
          Обери період і натисни «Знайти».
        </p>
      ) : (
        <SkuStockBandDiscoverFetcher
          bandId={band._id}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      )}
    </div>
  );
}
