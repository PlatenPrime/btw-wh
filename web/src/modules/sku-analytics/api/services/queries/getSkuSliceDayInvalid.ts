import { apiClient } from "@/lib/apiClient";
import type {
  GetSkuSliceDayInvalidParams,
  SkuSliceDayInvalidResponseDto,
} from "@/modules/sku-analytics/api/types";

/** GET /api/sku-slices/day-invalid — пагінація invalid точок дня + join Sku. */
export const getSkuSliceDayInvalid = async ({
  konkName,
  date,
  page,
  limit,
  signal,
}: GetSkuSliceDayInvalidParams): Promise<SkuSliceDayInvalidResponseDto> => {
  const params = new URLSearchParams({
    konkName,
    date,
    page: String(page),
    limit: String(limit),
  });
  const res = await apiClient.get<SkuSliceDayInvalidResponseDto>(
    `sku-slices/day-invalid?${params.toString()}`,
    { signal },
  );
  return res.data;
};
