import { getSalesComparison } from "@/modules/sales/api/services/queries/getSalesComparison";
import { useQuery } from "@tanstack/react-query";

export interface UseSalesComparisonQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  abc?: string;
  enabled?: boolean;
}

export function useSalesComparisonQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  abc = "",
  enabled = true,
}: UseSalesComparisonQueryParams) {
  return useQuery({
    queryKey: ["sales-comparison", konk, prod, dateFrom, dateTo, abc],
    queryFn: ({ signal }) =>
      getSalesComparison(konk, prod, dateFrom, dateTo, abc ? { abc } : undefined, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
