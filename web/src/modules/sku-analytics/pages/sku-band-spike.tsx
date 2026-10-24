import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { useDiscoverBandSpikeQuery } from "@/modules/sku-analytics/api/hooks/queries/useDiscoverBandSpikeQuery";
import { BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS } from "@/modules/sku-analytics/components/controls/sku-band-spike-controls";
import { SkuBandSpikeControls } from "@/modules/sku-analytics/components/controls/sku-band-spike-controls";
import { SkuBandSpikeFetcher } from "@/modules/sku-analytics/components/fetchers/sku-band-spike-fetcher";
import { useSkuBandSpikeParams } from "@/modules/sku-analytics/hooks/useSkuBandSpikeParams";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import { useCallback } from "react";

function isDiscoverRangeValid(dateFrom: string, dateTo: string): boolean {
  if (!dateFrom || !dateTo) return false;
  const from = parseISO(dateFrom);
  const to = parseISO(dateTo);
  if (!isValid(from) || !isValid(to) || from > to) return false;
  const daySpan = differenceInCalendarDays(to, from) + 1;
  return daySpan <= BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS;
}

export function SkuBandSpike() {
  const {
    konk,
    dateFrom,
    dateTo,
    stockMin,
    stockMax,
    stockMinRaw,
    stockMaxRaw,
    hasRun,
    setKonk,
    setDateRange,
    setStockBand,
    markRun,
  } = useSkuBandSpikeParams();

  const isBandReady =
    stockMin !== null &&
    stockMax !== null &&
    stockMin >= 0 &&
    stockMax >= stockMin;
  const isFiltersReady =
    Boolean(konk && dateFrom && dateTo) &&
    isBandReady &&
    isDiscoverRangeValid(dateFrom, dateTo);
  const canFetch = hasRun && isFiltersReady;

  const discoverQuery = useDiscoverBandSpikeQuery({
    konkName: konk,
    stockMin,
    stockMax,
    dateFrom,
    dateTo,
    enabled: canFetch,
  });

  const isFetching = discoverQuery.isFetching;
  const refetchDiscover = discoverQuery.refetch;

  const handleSubmit = useCallback(() => {
    if (!isFiltersReady) {
      return;
    }

    if (hasRun) {
      if (!isFetching) {
        void refetchDiscover();
      }
      return;
    }

    markRun();
  }, [isFiltersReady, hasRun, isFetching, refetchDiscover, markRun]);

  return (
    <SidebarInsetLayout headerText="Band-spike">
      <div className="grid gap-4 p-2">
        <SkuBandSpikeControls
          konk={konk}
          dateFrom={dateFrom}
          dateTo={dateTo}
          stockMinRaw={stockMinRaw}
          stockMaxRaw={stockMaxRaw}
          isSubmitReady={isFiltersReady}
          isFetching={isFetching}
          onKonkChange={setKonk}
          onDateRangeChange={setDateRange}
          onStockBandChange={setStockBand}
          onSubmit={handleSubmit}
        />

        {!canFetch ? (
          <p className="text-muted-foreground text-sm">
            Обери конкурента, смугу залишку й період (≤{" "}
            {BAND_SPIKE_DISCOVER_MAX_RANGE_DAYS} днів).
          </p>
        ) : (
          <SkuBandSpikeFetcher
            konkName={konk}
            stockMin={stockMin as number}
            stockMax={stockMax as number}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        )}
      </div>
    </SidebarInsetLayout>
  );
}
