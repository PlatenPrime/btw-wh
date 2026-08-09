import type {
  SkuSkugrSkusSalesResponseDto,
  SkuSkugrSkusSalesTotalDto,
} from "@/modules/sku-analytics/api/types";
import type {
  SkuStatisticsMetric,
  SkuStatisticsSkuRow,
} from "@/modules/sku-analytics/types";
import { SkuStatisticsSkugrContainerView } from "./SkuStatisticsSkugrContainerView";
import { useMemo, useState } from "react";

export interface SkuStatisticsSkugrContainerProps {
  data: SkuSkugrSkusSalesResponseDto;
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  konk?: string;
  prod?: string;
}

export function SkuStatisticsSkugrContainer({
  data,
  skugrId,
  dateFrom,
  dateTo,
  konk,
  prod,
}: SkuStatisticsSkugrContainerProps) {
  const [metric, setMetric] = useState<SkuStatisticsMetric>("salesUah");

  const all = useMemo<SkuSkugrSkusSalesTotalDto>(
    () => ({
      title: data.all.title,
      salesPcs: data.all.salesPcs,
      salesUah: data.all.salesUah,
    }),
    [data.all],
  );

  const rows = useMemo<SkuStatisticsSkuRow[]>(() => {
    const totalMetric =
      metric === "salesUah" ? data.all.salesUah : data.all.salesPcs;

    return data.data
      .map((item) => ({
        skuId: item.skuId,
        title: item.title,
        imageUrl: item.imageUrl,
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

  return (
    <SkuStatisticsSkugrContainerView
      rows={rows}
      all={all}
      skugrTitle={data.skugrTitle}
      metric={metric}
      onMetricChange={setMetric}
      skugrId={skugrId}
      dateFrom={dateFrom}
      dateTo={dateTo}
      konk={konk}
      prod={prod}
    />
  );
}
