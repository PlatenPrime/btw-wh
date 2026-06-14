import { getArtStockChartData } from "@/modules/arts/api/services/queries/getArtStockChartData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface UseArtStockChartQueryParams {
  artikul: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useArtStockChartQuery({
  artikul,
  dateFrom,
  dateTo,
  enabled = true,
}: UseArtStockChartQueryParams) {
  return useQuery({
    queryKey: ["art-chart-reports", "stock", artikul, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getArtStockChartData(artikul!, dateFrom, dateTo, signal),
    enabled: !!artikul && !!dateFrom && !!dateTo && enabled,
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
