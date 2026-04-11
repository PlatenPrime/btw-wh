import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-konk-prod-charts/constants";
import { SkuKonkProdSkugrGroupsPie } from "@/modules/sku-konk-prod-charts/components/sku-konk-prod-skugr-groups-section/SkuKonkProdSkugrGroupsPie";
import { SkuKonkProdSkugrGroupsTable } from "@/modules/sku-konk-prod-charts/components/sku-konk-prod-skugr-groups-section/SkuKonkProdSkugrGroupsTable";
import type {
  SkugrGroupSalesRow,
  SkugrGroupsMetric,
} from "@/modules/sku-konk-prod-charts/components/sku-konk-prod-skugr-groups-section/types";
import { useSkuKonkProdSkugrGroupsSalesQuery } from "@/modules/sku-slices/api/hooks/queries/useSkuKonkProdSkugrGroupsSalesQuery";
import { SkuStatisticsContentSkeleton } from "@/modules/sku-statistics/components/skeletons/sku-statistics-content-skeleton/SkuStatisticsContentSkeleton";
import { isAxiosError } from "axios";
import { useMemo, useState } from "react";

interface SkuKonkProdSkugrGroupsSectionProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuKonkProdSkugrGroupsSection({
  konk,
  prod,
  dateFrom,
  dateTo,
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

  const tableRows = useMemo<SkugrGroupSalesRow[]>(() => {
    const list = skugrQuery.data?.data;
    if (!list?.length) return [];

    const totalMetric = list.reduce(
      (acc, item) => acc + (metric === "salesUah" ? item.salesUah : item.salesPcs),
      0,
    );

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
    return <SkuStatisticsContentSkeleton />;
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

  if (!skugrQuery.data || !tableRows.length) {
    return null;
  }

  return (
    <DataRefetchOverlay
      isFetching={skugrQuery.isFetching}
      isLoading={false}
      busyLabel="Оновлення товарних груп…"
      className="rounded-xl"
    >
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="pb-2">
          <h3 className="text-muted-foreground text-sm font-medium">
            Продажі по товарних групах
          </h3>
        </CardHeader>
        <CardContent className="grid gap-4">
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
            <p className="text-muted-foreground text-sm">
              Немає ненульових продажів для діаграми; див. таблицю нижче.
            </p>
          )}
          <SkuKonkProdSkugrGroupsTable rows={tableRows} metric={metric} />
        </CardContent>
      </Card>
    </DataRefetchOverlay>
  );
}
