import { discoverBandSpike } from "@/modules/sku-analytics/api/services/mutations/discoverBandSpike";
import { useQuery } from "@tanstack/react-query";

export interface UseDiscoverBandSpikeQueryParams {
  konkName: string;
  stockMin: number | null;
  stockMax: number | null;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useDiscoverBandSpikeQuery({
  konkName,
  stockMin,
  stockMax,
  dateFrom,
  dateTo,
  enabled = false,
}: UseDiscoverBandSpikeQueryParams) {
  const canRun =
    Boolean(konkName && dateFrom && dateTo) &&
    stockMin !== null &&
    stockMax !== null &&
    Number.isFinite(stockMin) &&
    Number.isFinite(stockMax) &&
    stockMin >= 0 &&
    stockMax >= stockMin;

  return useQuery({
    queryKey: [
      "sku-slices",
      "band-spike-discover",
      konkName,
      stockMin,
      stockMax,
      dateFrom,
      dateTo,
    ],
    queryFn: ({ signal }) =>
      discoverBandSpike({
        konkName,
        stockMin: stockMin as number,
        stockMax: stockMax as number,
        dateFrom,
        dateTo,
        signal,
      }),
    enabled: canRun && enabled,
    staleTime: 30 * 1000,
  });
}
