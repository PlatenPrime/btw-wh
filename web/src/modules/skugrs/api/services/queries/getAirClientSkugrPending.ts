import { apiClient } from "@/lib/apiClient";
import type { AirClientSkugrPendingResponseDto } from "@/modules/skugrs/api/types";

/** GET /api/skugrs/client/air/pending — черга Air-груп для клієнтського refill. */
export const getAirClientSkugrPending = async (
  signal?: AbortSignal,
): Promise<AirClientSkugrPendingResponseDto> => {
  const res = await apiClient.get<AirClientSkugrPendingResponseDto>(
    "/skugrs/client/air/pending",
    { signal },
  );
  return res.data;
};
