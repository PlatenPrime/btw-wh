import type { SkuManufacturersPieResponseDto } from "@/modules/sku-analytics/api/types";
import type { SkuStatisticsMetric } from "@/modules/sku-analytics/types";
import { useMemo, useState } from "react";
import { SkuStatisticsContainerView } from "./SkuStatisticsContainerView";
import type { SkuStatisticsRow } from "@/modules/sku-analytics/types";

export interface SkuStatisticsContainerProps {
  data: SkuManufacturersPieResponseDto;
  konk: string;
  dateFrom: string;
  dateTo: string;
}

function buildRows(
  data: SkuManufacturersPieResponseDto["data"],
  metric: SkuStatisticsMetric,
): SkuStatisticsRow[] {
  const mapped = Object.entries(data).map(([prodName, value]) => ({
    prodName,
    title: value.title || prodName,
    salesPcs: value.salesPcs,
    salesUah: value.salesUah,
    share: 0,
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
          ? ((metric === "salesUah" ? item.salesUah : item.salesPcs) / totalMetric) *
            100
          : 0,
    }))
    .sort(
      (a, b) =>
        (metric === "salesUah" ? b.salesUah : b.salesPcs) -
        (metric === "salesUah" ? a.salesUah : a.salesPcs),
    );
}

export function SkuStatisticsContainer({
  data,
  konk,
  dateFrom,
  dateTo,
}: SkuStatisticsContainerProps) {
  const [metric, setMetric] = useState<SkuStatisticsMetric>("salesUah");
  const rows = useMemo(
    () => buildRows(data.data, metric),
    [data.data, metric],
  );

  return (
    <SkuStatisticsContainerView
      rows={rows}
      metric={metric}
      onMetricChange={setMetric}
      konk={konk}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
}
