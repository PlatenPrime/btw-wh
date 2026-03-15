import { getStockComparison } from "@/modules/stock-comparison/api/services/queries/getStockComparison";
import { useQuery } from "@tanstack/react-query";

export interface UseStockComparisonQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  abc?: string;
  enabled?: boolean;
}

export function useStockComparisonQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  abc = "",
  enabled = true,
}: UseStockComparisonQueryParams) {
  return useQuery({
    queryKey: ["stock-comparison", konk, prod, dateFrom, dateTo, abc],
    queryFn: ({ signal }) =>
      getStockComparison(konk, prod, dateFrom, dateTo, abc ? { abc } : undefined, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
