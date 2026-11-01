import type { SkuSelectionPieResponseDto } from "@/modules/sku-analytics/api/types";
import type {
  SkuSelectionComparisonRow,
  SkuStatisticsMetric,
} from "@/modules/sku-analytics/types";
import { useMemo, useState } from "react";
import { SkuSelectionComparisonContainerView } from "./SkuSelectionComparisonContainerView";

export interface SkuSelectionComparisonContainerProps {
  data: SkuSelectionPieResponseDto;
  /** Порядок skuIds з UI — зберігаємо для стабільного сортування fallback. */
  skuIds: string[];
  dateFrom: string;
  dateTo: string;
}

function buildRows(
  data: SkuSelectionPieResponseDto["data"],
  metric: SkuStatisticsMetric,
): SkuSelectionComparisonRow[] {
  const mapped = Object.entries(data).map(([skuId, value]) => ({
    skuId,
    title: value.title || value.productId || skuId,
    konkName: value.konkName || "",
    productId: value.productId || "",
    salesPcs: value.salesPcs,
    salesUah: value.salesUah,
    share:
      metric === "salesUah" ? value.shareUah : value.sharePcs,
  }));

  return mapped.sort(
    (a, b) =>
      (metric === "salesUah" ? b.salesUah : b.salesPcs) -
      (metric === "salesUah" ? a.salesUah : a.salesPcs),
  );
}

export function SkuSelectionComparisonContainer({
  data,
  dateFrom,
  dateTo,
}: SkuSelectionComparisonContainerProps) {
  const [metric, setMetric] = useState<SkuStatisticsMetric>("salesUah");
  const rows = useMemo(
    () => buildRows(data.data, metric),
    [data.data, metric],
  );

  return (
    <SkuSelectionComparisonContainerView
      rows={rows}
      metric={metric}
      onMetricChange={setMetric}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  );
}
