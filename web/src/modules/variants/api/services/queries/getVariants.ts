import { apiClient } from "@/lib/apiClient";
import type {
  GetVariantsParams,
  VariantsResponseDto,
} from "@/modules/variants/api/types";

export const getVariants = async ({
  page,
  limit,
  konkName = "",
  prodName = "",
  search = "",
  signal,
}: GetVariantsParams): Promise<VariantsResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (konkName) params.set("konkName", konkName);
  if (prodName) params.set("prodName", prodName);
  if (search.trim()) params.set("search", search.trim());

  const res = await apiClient.get<VariantsResponseDto>(
    `/variants?${params.toString()}`,
    { signal },
  );

  return res.data;
};

