import type { SkuKonksPieResponseDto } from "@/modules/sku-analytics/api/types";
import type {
  SkuComparisonRow,
  SkuStatisticsMetric,
} from "@/modules/sku-analytics/types";
import { useMemo, useState } from "react";
import { SkuComparisonContainerView } from "./SkuComparisonContainerView";

export interface SkuComparisonContainerProps {
  data: SkuKonksPieResponseDto;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

function buildRows(
  data: SkuKonksPieResponseDto["data"],
  metric: SkuStatisticsMetric,
): SkuComparisonRow[] {
  const mapped = Object.entries(data).map(([konkName, value]) => ({
    konkName,
    title: value.title || konkName,
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
}

export function SkuComparisonContainer({
  data,
  prod,
  dateFrom,
  dateTo,
}: SkuComparisonContainerProps) {
  const [metric, setMetric] = useState<SkuStatisticsMetric>("salesUah");
  const rows = useMemo(
    () => buildRows(data.data, metric),
    [data.data, metric],
  );

  return (
    <SkuComparisonContainerView
      rows={rows}
      metric={metric}
      onMetricChange={setMetric}
      prod={prod}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
}
