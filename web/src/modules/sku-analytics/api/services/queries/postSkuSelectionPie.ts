import { apiClient } from "@/lib/apiClient";
import { buildSkuSelectionScopeParams } from "@/modules/excel-jobs/utils/build-sku-selection-params";
import type {
  PostSkuSelectionPieBody,
  SkuSelectionPieResponseDto,
} from "@/modules/sku-analytics/api/types";

export interface PostSkuSelectionPieParams extends PostSkuSelectionPieBody {
  signal?: AbortSignal;
}

export const postSkuSelectionPie = async ({
  skuIds,
  selectAll,
  search,
  konkName,
  prodName,
  dateFrom,
  dateTo,
  signal,
}: PostSkuSelectionPieParams): Promise<SkuSelectionPieResponseDto> => {
  const scope = buildSkuSelectionScopeParams({
    selectAll: Boolean(selectAll),
    skuIds: skuIds ?? [],
    query: {
      search: search ?? "",
      konkName: konkName ?? "",
      prodName: prodName ?? "",
    },
  });
  const res = await apiClient.post<SkuSelectionPieResponseDto>(
    "sku-chart-reports/selection/skus-pie",
    { ...scope, dateFrom, dateTo },
    { signal },
  );
  return res.data;
};
