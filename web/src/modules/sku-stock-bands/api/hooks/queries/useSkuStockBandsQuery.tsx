import { getSkuStockBands } from "@/modules/sku-stock-bands/api/services/queries/getSkuStockBands";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuStockBandsQueryParams {
  konkName?: string;
  enabled?: boolean;
}

export function useSkuStockBandsQuery({
  konkName,
  enabled = true,
}: UseSkuStockBandsQueryParams = {}) {
  const normalizedKonk = konkName?.trim().toLowerCase() || undefined;

  return useQuery({
    queryKey: ["sku-stock-bands", { konkName: normalizedKonk ?? null }],
    queryFn: ({ signal }) =>
      getSkuStockBands({ konkName: normalizedKonk, signal }),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
