import { apiClient } from "@/lib/apiClient";
import type { AirClientPendingResponseDto } from "@/modules/sku-analytics/api/types";

/** GET /api/sku-slices/client/air/pending — черга Air SKU відкритого зрізу (з 20:00 Київ — наступний день). */
export const getAirClientPending = async (
  signal?: AbortSignal,
): Promise<AirClientPendingResponseDto> => {
  const res = await apiClient.get<AirClientPendingResponseDto>(
    "sku-slices/client/air/pending",
    { signal },
  );
  return res.data;
};
