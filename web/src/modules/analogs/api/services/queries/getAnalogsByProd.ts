import { apiClient } from "@/lib/apiClient";
import type {
  AnalogsResponseDto,
  GetAnalogsByProdParams,
} from "@/modules/analogs/api/types";

export const getAnalogsByProd = async (
  prodName: string,
  { page, limit, search = "", signal }: GetAnalogsByProdParams,
): Promise<AnalogsResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search.trim()) params.set("search", search.trim());

  const res = await apiClient.get<AnalogsResponseDto>(
    `/analogs/prod/${encodeURIComponent(prodName)}?${params.toString()}`,
    { signal },
  );
  return res.data;
};
