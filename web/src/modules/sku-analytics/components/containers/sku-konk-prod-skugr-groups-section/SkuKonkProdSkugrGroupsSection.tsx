import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { Button } from "@/components/ui/button";
import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";
import { SkuKonkProdSkugrGroupsPie } from "@/modules/sku-analytics/components/charts/sku-konk-prod-skugr-groups-pie/SkuKonkProdSkugrGroupsPie";
import { SkuKonkProdSkugrGroupsTable } from "@/modules/sku-analytics/components/tables/sku-konk-prod-skugr-groups-table/SkuKonkProdSkugrGroupsTable";
import type {
  SkugrGroupSalesRow,
  SkugrGroupsMetric,
} from "@/modules/sku-analytics/components/containers/sku-konk-prod-skugr-groups-section/types";
import type { SkuKonkProdSkugrGroupsSalesTotalDto } from "@/modules/sku-analytics/api/types";
import { useSkuKonkProdSkugrGroupsSalesQuery } from "@/modules/sku-analytics/api/hooks/queries/useSkuKonkProdSkugrGroupsSalesQuery";
import { SkuStatisticsContainerSkeleton } from "@/modules/sku-analytics/components/containers/sku-statistics-container";
import { isAxiosError } from "axios";
import { useMemo, useState } from "react";

interface SkuKonkProdSkugrGroupsSectionProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  /** Якщо true — зверху показується нотатка, що API цього блоку не враховує фільтр `skugrIds` на графіку */
  hasActiveSkugrFilter?: boolean;
}

export function SkuKonkProdSkugrGroupsSection({
  konk,
  prod,
  dateFrom,
  dateTo,
  hasActiveSkugrFilter = false,
}: SkuKonkProdSkugrGroupsSectionProps) {
  const isProdAll = prod === SKU_KONK_PROD_QUERY_ALL;
  const [metric, setMetric] = useState<SkugrGroupsMetric>("salesUah");

  const skugrQuery = useSkuKonkProdSkugrGroupsSalesQuery({
    konk,
    prod,
    dateFrom,
    dateTo,
    enabled: !isProdAll,
  });

  const total = useMemo<SkuKonkProdSkugrGroupsSalesTotalDto | null>(() => {
    const serverTotal = skugrQuery.data?.all;
    if (!serverTotal) return null;
    return {
      title: serverTotal.title,
      salesPcs: serverTotal.salesPcs,
      salesUah: serverTotal.salesUah,
    };
  }, [skugrQuery.data]);

  const tableRows = useMemo<SkugrGroupSalesRow[]>(() => {
    const response = skugrQuery.data;
    const list = response?.data;
    if (!list?.length) return [];

    const totalMetric =
      metric === "salesUah" ? (response?.all.salesUah ?? 0) : (response?.all.salesPcs ?? 0);

    return list
      .map((item) => ({
        skugrId: item.skugrId,
        title: item.title,
        salesPcs: item.salesPcs,
        salesUah: item.salesUah,
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
  }, [skugrQuery.data, metric]);

  const pieRows = useMemo(
    () =>
      tableRows.filter((row) =>
        metric === "salesUah" ? row.salesUah > 0 : row.salesPcs > 0,
      ),
    [tableRows, metric],
  );

  const pieRowsForChart = useMemo(() => {
    const total = pieRows.reduce(
      (acc, row) => acc + (metric === "salesUah" ? row.salesUah : row.salesPcs),
      0,
    );
    if (total <= 0) return [];
    return pieRows.map((row) => ({
      ...row,
      share:
        ((metric === "salesUah" ? row.salesUah : row.salesPcs) / total) * 100,
    }));
  }, [pieRows, metric]);

  if (isProdAll) {
    return (
      <p className="text-muted-foreground text-sm">
        Розподіл продажів по товарних групах доступний лише для конкретного виробника.
        Оберіть виробника замість «Всі виробники».
      </p>
    );
  }

  if (skugrQuery.isLoading && !skugrQuery.data) {
    return <SkuStatisticsContainerSkeleton />;
  }

  if (
    skugrQuery.isError &&
    !skugrQuery.data &&
    isAxiosError(skugrQuery.error) &&
    skugrQuery.error.response?.status === 404
  ) {
    return (
      <LoadingNoData description="Немає товарних груп для обраної пари конкурент / виробник" />
    );
  }

  if (
    skugrQuery.isError &&
    !skugrQuery.data &&
    !(isAxiosError(skugrQuery.error) && skugrQuery.error.response?.status === 404)
  ) {
    return (
      <ErrorDisplay
        error={skugrQuery.error}
        title="Помилка завантаження товарних груп"
        description="Не вдалося завантажити дані для діаграми та таблиці"
        onRetry={() => void skugrQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (skugrQuery.data && skugrQuery.isSuccess && !tableRows.length) {
    return (
      <LoadingNoData description="Немає даних про продажі товарних груп за обраний період" />
    );
  }

  if (!skugrQuery.data || !tableRows.length || !total) {
    return null;
  }

  return (
    <DataRefetchOverlay
      isFetching={skugrQuery.isFetching}
      isLoading={false}
      busyLabel="Оновлення товарних груп…"
      className="rounded-xl"
    >
      <ChartSection
        title="Продажі по товарних групах"
        className="gap-2"
      >
        <div className="grid gap-4">
          {hasActiveSkugrFilter ? (
            <p className="text-xs text-muted-foreground">
              Перелік нижче не враховує обраний фільтр товарних груп для графіка
              вище — відповідний API цей параметр не приймає.
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
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
          {pieRowsForChart.length > 0 ? (
            <SkuKonkProdSkugrGroupsPie rows={pieRowsForChart} metric={metric} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Немає ненульових продажів для діаграми; див. таблицю нижче.
            </p>
          )}
          <SkuKonkProdSkugrGroupsTable
            rows={tableRows}
            all={total}
            metric={metric}
            konk={konk}
            prod={prod}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        </div>
      </ChartSection>
    </DataRefetchOverlay>
  );
}
