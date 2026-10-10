import { apiClient } from "@/lib/apiClient";
import type {
  GetSkuSliceDayStatusParams,
  SkuSliceDayStatusResponseDto,
} from "@/modules/sku-analytics/api/types";

/** GET /api/sku-slices/day-status — meta/stats денного прогону + лічильники точок. */
export const getSkuSliceDayStatus = async ({
  konkName,
  date,
  signal,
}: GetSkuSliceDayStatusParams): Promise<SkuSliceDayStatusResponseDto> => {
  const params = new URLSearchParams({ konkName, date });
  const res = await apiClient.get<SkuSliceDayStatusResponseDto>(
    `sku-slices/day-status?${params.toString()}`,
    { signal },
  );
  return res.data;
};
