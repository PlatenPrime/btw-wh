import { postSkuSelectionPie } from "@/modules/sku-analytics/api/services/queries/postSkuSelectionPie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UseSkuSelectionPieQueryParams {
  skuIds: string[];
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuSelectionPieQuery({
  skuIds,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuSelectionPieQueryParams) {
  const skuIdsKey = useMemo(() => skuIds.join(","), [skuIds]);

  return useQuery({
    queryKey: [
      "sku-chart-reports",
      "selection-skus-pie",
      skuIdsKey,
      dateFrom,
      dateTo,
    ],
    queryFn: ({ signal }) =>
      postSkuSelectionPie({
        skuIds,
        dateFrom,
        dateTo,
        signal,
      }),
    enabled:
      skuIds.length > 0 && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
