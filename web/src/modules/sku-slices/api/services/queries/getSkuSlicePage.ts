import { apiClient } from "@/lib/apiClient";
import type {
  GetSkuSlicePageParams,
  SkuSlicePageResponseDto,
} from "@/modules/sku-slices/api/types";

export const getSkuSlicePage = async ({
  konkName,
  date,
  page,
  limit,
  signal,
}: GetSkuSlicePageParams): Promise<SkuSlicePageResponseDto> => {
  const params = new URLSearchParams({
    konkName,
    date,
    page: String(page),
    limit: String(limit),
  });
  const res = await apiClient.get<SkuSlicePageResponseDto>(
    `sku-slices?${params.toString()}`,
    { signal },
  );
  return res.data;
};
