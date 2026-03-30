import { apiClient } from "@/lib/apiClient";
import type {
  GetSkugrsParams,
  SkugrsResponseDto,
} from "@/modules/skugrs/api/types";

export const getSkugrs = async ({
  page,
  limit,
  konkName = "",
  prodName = "",
  search = "",
  isSliced,
  signal,
}: GetSkugrsParams): Promise<SkugrsResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (konkName) params.set("konkName", konkName);
  if (prodName) params.set("prodName", prodName);
  if (search.trim()) params.set("search", search.trim());
  if (typeof isSliced === "boolean") params.set("isSliced", String(isSliced));

  const res = await apiClient.get<SkugrsResponseDto>(
    `/skugrs?${params.toString()}`,
    { signal },
  );
  return res.data;
};
