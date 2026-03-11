import { apiClient } from "@/lib/apiClient";
import type { AnalogSalesRangeResponseDto } from "@/modules/analogs/api/types";

export const getAnalogSalesRange = async (
  analogId: string,
  dateFrom: string,
  dateTo: string,
  signal?: AbortSignal,
): Promise<AnalogSalesRangeResponseDto> => {
  const params = new URLSearchParams({ dateFrom, dateTo });
  const res = await apiClient.get<AnalogSalesRangeResponseDto>(
    `analog-slices/analog/${analogId}/sales-range?${params.toString()}`,
    { signal },
  );
  return res.data;
};
