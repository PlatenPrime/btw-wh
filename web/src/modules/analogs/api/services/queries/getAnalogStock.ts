import { apiClient } from "@/lib/apiClient";
import type { AnalogStockResponseDto } from "@/modules/analogs/api/types";

export const getAnalogStock = async (
  id: string,
  signal?: AbortSignal,
): Promise<AnalogStockResponseDto> => {
  const res = await apiClient.get<AnalogStockResponseDto>(
    `/analogs/id/${id}/stock`,
    { signal },
  );
  return res.data;
};
