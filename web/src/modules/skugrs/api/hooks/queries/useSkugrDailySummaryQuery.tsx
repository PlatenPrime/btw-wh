import { getSkugrDailySummary } from "@/modules/skugrs/api/services/queries/getSkugrDailySummary";
import { useQuery } from "@tanstack/react-query";

export interface UseSkugrDailySummaryQueryParams {
  skugrId: string | undefined;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useSkugrDailySummaryQuery({
  skugrId,
  dateFrom,
  dateTo,
  enabled = true,
}: UseSkugrDailySummaryQueryParams) {
  return useQuery({
    queryKey: ["sku-slices", "skugr-daily-summary", skugrId, dateFrom, dateTo],
    queryFn: ({ signal }) =>
      getSkugrDailySummary(skugrId!, dateFrom, dateTo, signal),
    enabled: Boolean(skugrId && dateFrom && dateTo && enabled),
    staleTime: 5 * 60 * 1000,
  });
}
