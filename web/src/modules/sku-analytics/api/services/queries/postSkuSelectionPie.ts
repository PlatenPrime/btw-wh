import { apiClient } from "@/lib/apiClient";
import type {
  PostSkuSelectionPieBody,
  SkuSelectionPieResponseDto,
} from "@/modules/sku-analytics/api/types";

export interface PostSkuSelectionPieParams extends PostSkuSelectionPieBody {
  signal?: AbortSignal;
}

export const postSkuSelectionPie = async ({
  skuIds,
  dateFrom,
  dateTo,
  signal,
}: PostSkuSelectionPieParams): Promise<SkuSelectionPieResponseDto> => {
  const res = await apiClient.post<SkuSelectionPieResponseDto>(
    "sku-chart-reports/selection/skus-pie",
    { skuIds, dateFrom, dateTo },
    { signal },
  );
  return res.data;
};
