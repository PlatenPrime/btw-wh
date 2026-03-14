import { getSalesComparison } from "@/modules/sales/api/services/queries/getSalesComparison";
import { useQuery } from "@tanstack/react-query";

export interface UseSalesComparisonQueryParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSalesComparisonQuery({
  konk,
  prod,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSalesComparisonQueryParams) {
  return useQuery({
    queryKey: ["sales-comparison", konk, prod, dateFrom, dateTo],
    queryFn: ({ signal }) => getSalesComparison(konk, prod, dateFrom, dateTo, signal),
    enabled: !!konk && !!prod && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
  });
}
