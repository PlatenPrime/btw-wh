import { apiClient } from "@/lib/apiClient";
import type { AnalogSliceRangeResponseDto } from "@/modules/analogs/api/types";

export const getAnalogSlicesRange = async (
  analogId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<AnalogSliceRangeResponseDto> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<AnalogSliceRangeResponseDto>(
    `analog-slices/analog/${analogId}/range?${params.toString()}`,
    { signal },
  );
  return res.data;
};
