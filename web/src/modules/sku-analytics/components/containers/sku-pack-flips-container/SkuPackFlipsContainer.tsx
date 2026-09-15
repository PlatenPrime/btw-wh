import type { PackFlipsPayload } from "@/modules/sku-analytics/api/types";
import { SkuPackFlipsContainerView } from "@/modules/sku-analytics/components/containers/sku-pack-flips-container/SkuPackFlipsContainerView";

export interface SkuPackFlipsContainerProps {
  data: PackFlipsPayload;
}

function buildDateLabel(dates: string[]): string {
  if (dates.length === 0) {
    return "немає дат у відповіді";
  }
  if (dates.length === 1) {
    return dates[0];
  }
  return `${dates[0]} — ${dates[dates.length - 1]} · ${dates.length} днів`;
}

export function SkuPackFlipsContainer({ data }: SkuPackFlipsContainerProps) {
  const dateLabel = buildDateLabel(data.dates);

  return <SkuPackFlipsContainerView data={data} dateLabel={dateLabel} />;
}
