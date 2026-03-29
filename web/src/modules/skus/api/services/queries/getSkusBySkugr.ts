import { apiClient } from "@/lib/apiClient";
import type {
  GetSkusBySkugrParams,
  SkusResponseDto,
} from "@/modules/skus/api/types";

export const getSkusBySkugr = async ({
  skugrId,
  page,
  limit,
  search,
  signal,
}: GetSkusBySkugrParams): Promise<SkusResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search?.trim()) params.set("search", search.trim());

  const res = await apiClient.get<SkusResponseDto>(
    `/skus/by-skugr/${skugrId}?${params.toString()}`,
    { signal },
  );
  return res.data;
};
