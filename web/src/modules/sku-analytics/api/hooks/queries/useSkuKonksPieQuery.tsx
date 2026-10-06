import { getSkuKonksPieData } from "@/modules/sku-analytics/api/services/queries/getSkuKonksPieData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UseSkuKonksPieQueryParams {
  prod: string;
  dateFrom: string;
  dateTo: string;
  excludeKonks?: string[];
  enabled?: boolean;
}

function useStableExcludeKonksKey(excludeKonks?: string[]) {
  return useMemo(
    () =>
      excludeKonks?.length
        ? [...excludeKonks]
            .map((name) => name.trim())
            .filter(Boolean)
            .sort()
            .join(",")
        : "",
    [excludeKonks],
  );
}

export function useSkuKonksPieQuery({
  prod,
  dateFrom,
  dateTo,
  excludeKonks,
  enabled = true,
}: UseSkuKonksPieQueryParams) {
  const excludeKonksKey = useStableExcludeKonksKey(excludeKonks);

  return useQuery({
    queryKey: [
      "sku-chart-reports",
      "konks-pie",
      prod,
      dateFrom,
      dateTo,
      excludeKonksKey,
    ],
    queryFn: ({ signal }) =>
      getSkuKonksPieData({
        prod,
        dateFrom,
        dateTo,
        excludeKonks,
        signal,
      }),
    enabled: !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
