import { apiClient } from "@/lib/apiClient";
import type { GetSkusParams, SkusResponseDto } from "@/modules/skus/api/types";

export const getSkus = async ({
  page,
  limit,
  konkName,
  prodName,
  search,
  signal,
}: GetSkusParams): Promise<SkusResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    konkName,
  });
  if (prodName?.trim()) params.set("prodName", prodName.trim());
  if (search?.trim()) params.set("search", search.trim());

  const res = await apiClient.get<SkusResponseDto>(
    `/skus?${params.toString()}`,
    { signal },
  );
  return res.data;
};
