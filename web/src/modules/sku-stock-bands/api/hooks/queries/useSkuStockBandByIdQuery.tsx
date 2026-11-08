import { getSkuStockBandById } from "@/modules/sku-stock-bands/api/services/queries/getSkuStockBandById";
import type { SkuStockBandResponse } from "@/modules/sku-stock-bands/api/types";
import { useQuery } from "@tanstack/react-query";

export interface UseSkuStockBandByIdQueryParams {
  id: string;
  enabled?: boolean;
}

export function useSkuStockBandByIdQuery({
  id,
  enabled = true,
}: UseSkuStockBandByIdQueryParams) {
  return useQuery<SkuStockBandResponse>({
    queryKey: ["sku-stock-bands", id],
    queryFn: ({ signal }) => getSkuStockBandById({ id, signal }),
    enabled: enabled && Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
