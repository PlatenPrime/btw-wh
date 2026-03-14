import { getStockComparison } from "@/modules/stock-comparison/api/services/queries/getStockComparison";
import { useQuery } from "@tanstack/react-query";

export interface UseStockComparisonQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useStockComparisonQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  enabled = true,
}: UseStockComparisonQueryParams) {
  return useQuery({
    queryKey: ["stock-comparison", konk, prod, dateFrom, dateTo],
    queryFn: ({ signal }) => getStockComparison(konk, prod, dateFrom, dateTo, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
