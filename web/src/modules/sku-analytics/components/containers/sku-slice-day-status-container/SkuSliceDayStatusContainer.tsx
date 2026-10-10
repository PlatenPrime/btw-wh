import type { SkuSliceDayStatusDto } from "@/modules/sku-analytics/api/types";
import { SkuSliceDayStatusContainerView } from "./SkuSliceDayStatusContainerView";

export interface SkuSliceDayStatusContainerProps {
  data: SkuSliceDayStatusDto;
}

export function SkuSliceDayStatusContainer({
  data,
}: SkuSliceDayStatusContainerProps) {
  return <SkuSliceDayStatusContainerView data={data} />;
}
