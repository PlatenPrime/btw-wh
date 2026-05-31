import { getSkuKonkProdStockChartData } from "@/modules/sku-analytics/api/services/queries/getSkuKonkProdStockChartData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UseSkuKonkProdStockChartQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  skugrIds?: string[];
  enabled?: boolean;
}

function useStableSkugrIdsKey(skugrIds?: string[]) {
  return useMemo(
    () =>
      skugrIds?.length
        ? [...skugrIds].map((id) => id.trim()).filter(Boolean).sort().join(",")
        : "",
    [skugrIds],
  );
}

export function useSkuKonkProdStockChartQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  enabled = true,
}: UseSkuKonkProdStockChartQueryParams) {
  const skugrIdsKey = useStableSkugrIdsKey(skugrIds);

  return useQuery({
    queryKey: [
      "sku-slices",
      "konk-prod-stock-chart",
      konk,
      prod,
      dateFrom,
      dateTo,
      skugrIdsKey,
    ],
    queryFn: ({ signal }) =>
      getSkuKonkProdStockChartData({
        konk,
        prod,
        dateFrom,
        dateTo,
        skugrIds,
        signal,
      }),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
