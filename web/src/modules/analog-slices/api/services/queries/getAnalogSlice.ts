import { apiClient } from "@/lib/apiClient";
import type { AnalogSliceResponseDto } from "@/modules/analog-slices/api/types";

export const getAnalogSlice = async (
  konkName: string,
  date: string,
  signal?: AbortSignal,
): Promise<AnalogSliceResponseDto> => {
  const params = new URLSearchParams({ konkName, date });
  const res = await apiClient.get<AnalogSliceResponseDto>(
    `analog-slices?${params.toString()}`,
    { signal },
  );
  return res.data;
};
