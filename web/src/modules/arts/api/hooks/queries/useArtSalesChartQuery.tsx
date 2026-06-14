import { getArtSalesChartData } from "@/modules/arts/api/services/queries/getArtSalesChartData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseArtSalesChartQueryParams {
  artikul: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useArtSalesChartQuery({
  artikul,
  dateFrom,
  dateTo,
  enabled = true,
}: UseArtSalesChartQueryParams) {
  return useQuery({
    queryKey: ["art-chart-reports", "sales", artikul, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getArtSalesChartData(artikul!, dateFrom, dateTo, signal),
    enabled: !!artikul && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
