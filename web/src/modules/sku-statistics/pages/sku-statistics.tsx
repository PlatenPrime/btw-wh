import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { Button } from "@/components/ui/button";
import { useSkuManufacturersPieQuery } from "@/modules/sku-slices/api/hooks/queries/useSkuManufacturersPieQuery";
import { SkuStatisticsPie } from "@/modules/sku-statistics/components/charts/sku-statistics-pie/SkuStatisticsPie";
import { SkuStatisticsControls } from "@/modules/sku-statistics/components/controls/sku-statistics-controls/SkuStatisticsControls";
import { SkuStatisticsContentSkeleton } from "@/modules/sku-statistics/components/skeletons/sku-statistics-content-skeleton/SkuStatisticsContentSkeleton";
import { SkuStatisticsTable } from "@/modules/sku-statistics/components/tables/sku-statistics-table/SkuStatisticsTable";
import { useSkuStatisticsParams } from "@/modules/sku-statistics/hooks/useSkuStatisticsParams";
import type { SkuStatisticsMetric, SkuStatisticsRow } from "@/modules/sku-statistics/types";
import { isAxiosError } from "axios";
import { useMemo, useState } from "react";

export function SkuStatistics() {
  const { konk, dateFrom, dateTo, setKonk, setDateRange } = useSkuStatisticsParams();
  const [metric, setMetric] = useState<SkuStatisticsMetric>("salesUah");

  const isFiltersReady = Boolean(konk && dateFrom && dateTo);

  const statisticsQuery = useSkuManufacturersPieQuery({
    konk,
    dateFrom,
    dateTo,
  });

  const rows = useMemo<SkuStatisticsRow[]>(() => {
    const data = statisticsQuery.data?.data;
    if (!data) return [];

    const mapped = Object.entries(data).map(([prodName, value]) => ({
      prodName,
      title: value.title || prodName,
      salesPcs: value.salesPcs,
      salesUah: value.salesUah,
    }));

    const totalMetric = mapped.reduce(
      (acc, item) => acc + (metric === "salesUah" ? item.salesUah : item.salesPcs),
      0,
    );

    return mapped
      .map((item) => ({
        ...item,
        share:
          totalMetric > 0
            ? ((metric === "salesUah" ? item.salesUah : item.salesPcs) / totalMetric) * 100
            : 0,
      }))
      .sort(
        (a, b) =>
          (metric === "salesUah" ? b.salesUah : b.salesPcs) -
          (metric === "salesUah" ? a.salesUah : a.salesPcs),
      );
  }, [statisticsQuery.data, metric]);

  return (
    <SidebarInsetLayout headerText="Статистика по виробникам">
      <div className="grid gap-4 p-2">
        <SkuStatisticsControls
          konk={konk}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onKonkChange={setKonk}
          onDateRangeChange={setDateRange}
        />

        {!isFiltersReady && (
          <p className="text-muted-foreground text-sm">
            Оберіть конкурента та період для перегляду статистики за виробниками.
          </p>
        )}

        {isFiltersReady && statisticsQuery.isLoading && !statisticsQuery.data && (
          <SkuStatisticsContentSkeleton />
        )}

        {isFiltersReady &&
          statisticsQuery.isError &&
          !statisticsQuery.data &&
          isAxiosError(statisticsQuery.error) &&
          statisticsQuery.error.response?.status === 404 && (
            <LoadingNoData description="Немає даних для обраного конкурента і періоду" />
          )}

        {isFiltersReady &&
          statisticsQuery.isError &&
          !statisticsQuery.data &&
          !(
            isAxiosError(statisticsQuery.error) &&
            statisticsQuery.error.response?.status === 404
          ) && (
            <ErrorDisplay
              error={statisticsQuery.error}
              title="Помилка завантаження статистики"
              description="Не вдалося завантажити дані для кругової діаграми."
              onRetry={() => void statisticsQuery.refetch()}
              variant="compact"
            />
          )}

        {isFiltersReady &&
          statisticsQuery.data &&
          statisticsQuery.isSuccess &&
          !rows.length && (
            <LoadingNoData description="Немає даних про продажі виробників за обраний період" />
          )}

        {isFiltersReady && statisticsQuery.data && rows.length > 0 && (
          <DataRefetchOverlay
            isFetching={statisticsQuery.isFetching}
            isLoading={statisticsQuery.isLoading}
          >
            <div className="grid gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={metric === "salesUah" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMetric("salesUah")}
                >
                  Виручка, грн
                </Button>
                <Button
                  variant={metric === "salesPcs" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMetric("salesPcs")}
                >
                  Продажі, шт
                </Button>
              </div>
              <SkuStatisticsPie rows={rows} metric={metric} />
              <SkuStatisticsTable rows={rows} metric={metric} />
            </div>
          </DataRefetchOverlay>
        )}
      </div>
    </SidebarInsetLayout>
  );
}
