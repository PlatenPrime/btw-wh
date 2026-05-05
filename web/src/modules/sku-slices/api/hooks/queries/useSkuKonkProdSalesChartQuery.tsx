import { getSkuKonkProdSalesChartData } from "@/modules/sku-slices/api/services/queries/getSkuKonkProdSalesChartData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UseSkuKonkProdSalesChartQueryParams {
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

export function useSkuKonkProdSalesChartQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  enabled = true,
}: UseSkuKonkProdSalesChartQueryParams) {
  const skugrIdsKey = useStableSkugrIdsKey(skugrIds);

  return useQuery({
    queryKey: [
      "sku-slices",
      "konk-prod-sales-chart",
      konk,
      prod,
      dateFrom,
      dateTo,
      skugrIdsKey,
    ],
    queryFn: ({ signal }) =>
      getSkuKonkProdSalesChartData({
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
