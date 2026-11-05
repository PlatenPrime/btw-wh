import { postSkuSelectionPie } from "@/modules/sku-analytics/api/services/queries/postSkuSelectionPie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UseSkuSelectionPieQueryParams {
  skuIds: string[];
  selectAll?: boolean;
  search?: string;
  konkName?: string;
  prodName?: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkuSelectionPieQuery({
  skuIds,
  selectAll = false,
  search = "",
  konkName = "",
  prodName = "",
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkuSelectionPieQueryParams) {
  const skuIdsKey = useMemo(() => skuIds.join(","), [skuIds]);
  const hasSelection = selectAll || skuIds.length > 0;

  return useQuery({
    queryKey: [
      "sku-chart-reports",
      "selection-skus-pie",
      selectAll ? "all" : skuIdsKey,
      selectAll ? search : "",
      selectAll ? konkName : "",
      selectAll ? prodName : "",
      dateFrom,
      dateTo,
    ],
    queryFn: ({ signal }) =>
      postSkuSelectionPie({
        skuIds: selectAll ? undefined : skuIds,
        selectAll: selectAll || undefined,
        search: selectAll ? search || undefined : undefined,
        konkName: selectAll ? konkName || undefined : undefined,
        prodName: selectAll ? prodName || undefined : undefined,
        dateFrom,
        dateTo,
        signal,
      }),
    enabled: hasSelection && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
