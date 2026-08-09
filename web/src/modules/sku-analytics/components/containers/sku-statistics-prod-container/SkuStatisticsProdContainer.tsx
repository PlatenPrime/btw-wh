import type {
  SkuKonkProdSkugrGroupsSalesResponseDto,
  SkuKonkProdSkugrGroupsSalesTotalDto,
} from "@/modules/sku-analytics/api/types";
import type {
  SkugrGroupSalesRow,
  SkugrGroupsMetric,
} from "@/modules/sku-analytics/components/containers/sku-konk-prod-skugr-groups-section/types";
import { SkuStatisticsProdContainerView } from "./SkuStatisticsProdContainerView";
import { useMemo, useState } from "react";

export interface SkuStatisticsProdContainerProps {
  data: SkuKonkProdSkugrGroupsSalesResponseDto;
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuStatisticsProdContainer({
  data,
  konk,
  prod,
  dateFrom,
  dateTo,
}: SkuStatisticsProdContainerProps) {
  const [metric, setMetric] = useState<SkugrGroupsMetric>("salesUah");

  const all = useMemo<SkuKonkProdSkugrGroupsSalesTotalDto>(
    () => ({
      title: data.all.title,
      salesPcs: data.all.salesPcs,
      salesUah: data.all.salesUah,
    }),
    [data.all],
  );

  const rows = useMemo<SkugrGroupSalesRow[]>(() => {
    const totalMetric =
      metric === "salesUah" ? data.all.salesUah : data.all.salesPcs;

    return data.data
      .map((item) => ({
        skugrId: item.skugrId,
        title: item.title,
        salesPcs: item.salesPcs,
        salesUah: item.salesUah,
        share:
          totalMetric > 0
            ? ((metric === "salesUah" ? item.salesUah : item.salesPcs) /
                totalMetric) *
              100
            : 0,
      }))
      .sort(
        (a, b) =>
          (metric === "salesUah" ? b.salesUah : b.salesPcs) -
          (metric === "salesUah" ? a.salesUah : a.salesPcs),
      );
  }, [data.data, data.all, metric]);

  const pieRows = useMemo(() => {
    const nonzero = rows.filter((row) =>
      metric === "salesUah" ? row.salesUah > 0 : row.salesPcs > 0,
    );
    const total = nonzero.reduce(
      (acc, row) =>
        acc + (metric === "salesUah" ? row.salesUah : row.salesPcs),
      0,
    );
    if (total <= 0) return [];
    return nonzero.map((row) => ({
      ...row,
      share:
        ((metric === "salesUah" ? row.salesUah : row.salesPcs) / total) * 100,
    }));
  }, [rows, metric]);

  return (
    <SkuStatisticsProdContainerView
      rows={rows}
      pieRows={pieRows}
      all={all}
      metric={metric}
      onMetricChange={setMetric}
      konk={konk}
      prod={prod}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
}
