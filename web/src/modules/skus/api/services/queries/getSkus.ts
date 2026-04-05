import { apiClient } from "@/lib/apiClient";
import type { GetSkusParams, SkusResponseDto } from "@/modules/skus/api/types";

export const getSkus = async ({
  page,
  limit,
  konkName,
  prodName,
  search,
  isInvalid,
  createdFrom,
  signal,
}: GetSkusParams): Promise<SkusResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (konkName?.trim()) params.set("konkName", konkName.trim());
  if (prodName?.trim()) params.set("prodName", prodName.trim());
  if (search?.trim()) params.set("search", search.trim());
  if (typeof isInvalid === "boolean") {
    params.set("isInvalid", String(isInvalid));
  }
  if (createdFrom?.trim()) params.set("createdFrom", createdFrom.trim());

  const res = await apiClient.get<SkusResponseDto>(
    `/skus?${params.toString()}`,
    { signal },
  );
  return res.data;
};
