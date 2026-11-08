import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { useDiscoverStockBandQuery } from "@/modules/sku-stock-bands/api/hooks/queries/useDiscoverStockBandQuery";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandContainer } from "@/modules/sku-stock-bands/components/containers/sku-stock-band-container";
import { SkuStockBandFetcher } from "@/modules/sku-stock-bands/components/fetchers/sku-stock-band-fetcher";
import { STOCK_BAND_DISCOVER_MAX_RANGE_DAYS } from "@/modules/sku-stock-bands/constants/discover";
import { useSkuStockBandDiscoverParams } from "@/modules/sku-stock-bands/hooks/useSkuStockBandDiscoverParams";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { useCallback } from "react";
import { useParams } from "react-router";

function isDiscoverRangeValid(dateFrom: string, dateTo: string): boolean {
  if (!dateFrom || !dateTo) return false;
  const from = parseISO(dateFrom);
  const to = parseISO(dateTo);
  if (!isValid(from) || !isValid(to) || from > to) return false;
  const daySpan = differenceInCalendarDays(to, from) + 1;
  return daySpan <= STOCK_BAND_DISCOVER_MAX_RANGE_DAYS;
}

function SkuStockBandPageContent({ band }: { band: SkuStockBandDto }) {
  const {
    dateFrom,
    dateTo,
    hasRun,
    setDateRange,
    markRun,
  } = useSkuStockBandDiscoverParams();

  const isFiltersReady =
    Boolean(dateFrom && dateTo) && isDiscoverRangeValid(dateFrom, dateTo);
  const canFetch = hasRun && isFiltersReady;

  const discoverQuery = useDiscoverStockBandQuery({
    bandId: band._id,
    dateFrom,
    dateTo,
    enabled: canFetch,
  });

  const isFetching = discoverQuery.isFetching;
  const refetchDiscover = discoverQuery.refetch;

  const handleSubmit = useCallback(() => {
    if (!isFiltersReady) return;

    if (hasRun) {
      if (!isFetching) {
        void refetchDiscover();
      }
      return;
    }

    markRun();
  }, [hasRun, isFetching, isFiltersReady, markRun, refetchDiscover]);

  return (
    <SkuStockBandContainer
      band={band}
      dateFrom={dateFrom}
      dateTo={dateTo}
      isSubmitReady={isFiltersReady}
      isFetching={isFetching}
      canFetch={canFetch}
      onDateRangeChange={setDateRange}
      onSubmit={handleSubmit}
    />
  );
}

export function SkuStockBand() {
  const { id = "" } = useParams<{ id: string }>();

  return (
    <SidebarInsetLayout headerText="Діапазон залишків">
      <div className="grid gap-2 p-2">
        <SkuStockBandFetcher
          id={id}
          ContainerComponent={({ band }) => (
            <SkuStockBandPageContent band={band} />
          )}
        />
      </div>
    </SidebarInsetLayout>
  );
}
