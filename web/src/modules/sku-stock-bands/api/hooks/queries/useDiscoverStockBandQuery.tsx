import { discoverStockBand } from "@/modules/sku-stock-bands/api/services/mutations/discoverStockBand";
import { useQuery } from "@tanstack/react-query";

export interface UseDiscoverStockBandQueryParams {
  bandId: string;
  dateFrom: string;
  dateTo: string;
  enabled?: boolean;
}

export function useDiscoverStockBandQuery({
  bandId,
  dateFrom,
  dateTo,
  enabled = false,
}: UseDiscoverStockBandQueryParams) {
  const canRun = Boolean(bandId && dateFrom && dateTo);

  return useQuery({
    queryKey: [
      "sku-slices",
      "stock-band-discover",
      bandId,
      dateFrom,
      dateTo,
    ],
    queryFn: ({ signal }) =>
      discoverStockBand({
        bandId,
        dateFrom,
        dateTo,
        signal,
      }),
    enabled: canRun && enabled,
    staleTime: 30 * 1000,
  });
}
