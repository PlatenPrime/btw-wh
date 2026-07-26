import { apiClient } from "@/lib/apiClient";
import type { SkuStockResponseDto } from "@/modules/skus/api/types";

/** Live-scrape сайту конкурента може тривати десятки секунд (проксі/повільний сайт). */
const SKU_STOCK_TIMEOUT_MS = 120 * 1000;

/** GET /api/skus/id/:id/stock — одноразовий live-знімок залишку і ціни картки SKU. */
export const getSkuStock = async (
  id: string,
  signal?: AbortSignal,
): Promise<SkuStockResponseDto> => {
  const res = await apiClient.get<SkuStockResponseDto>(
    `skus/id/${id}/stock`,
    { signal, timeout: SKU_STOCK_TIMEOUT_MS },
  );
  return res.data;
};
