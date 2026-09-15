import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { usePackFlipsQuery } from "@/modules/sku-analytics/api/hooks/queries/usePackFlipsQuery";
import { SkuPackFlipsControls } from "@/modules/sku-analytics/components/controls/sku-pack-flips-controls";
import { SkuPackFlipsFetcher } from "@/modules/sku-analytics/components/fetchers/sku-pack-flips-fetcher";
import { useSkuPackFlipsParams } from "@/modules/sku-analytics/hooks/useSkuPackFlipsParams";
import { useCallback } from "react";

export function SkuPackFlips() {
  const {
    konk,
    dateFrom,
    dateTo,
    hasRun,
    setKonk,
    setDateRange,
    markRun,
  } = useSkuPackFlipsParams();

  const isFiltersReady = Boolean(konk && dateFrom && dateTo);
  const canFetch = hasRun && isFiltersReady;

  const packFlipsQuery = usePackFlipsQuery({
    konkName: konk,
    dateFrom,
    dateTo,
    enabled: canFetch,
  });

  const isFetching = packFlipsQuery.isFetching;
  const refetchPackFlips = packFlipsQuery.refetch;

  const handleSubmit = useCallback(() => {
    if (!isFiltersReady) {
      return;
    }

    if (hasRun) {
      if (!isFetching) {
        void refetchPackFlips();
      }
      return;
    }

    markRun();
  }, [isFiltersReady, hasRun, isFetching, refetchPackFlips, markRun]);

  return (
    <SidebarInsetLayout headerText="Перевірка скачків цін і залишків">
      <div className="grid gap-4 p-2">
        <SkuPackFlipsControls
          konk={konk}
          dateFrom={dateFrom}
          dateTo={dateTo}
          isSubmitReady={isFiltersReady}
          isFetching={isFetching}
          onKonkChange={setKonk}
          onDateRangeChange={setDateRange}
          onSubmit={handleSubmit}
        />

        {!canFetch ? (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента, період і запустіть перевірку.
          </p>
        ) : (
          <SkuPackFlipsFetcher
            konkName={konk}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        )}
      </div>
    </SidebarInsetLayout>
  );
}
