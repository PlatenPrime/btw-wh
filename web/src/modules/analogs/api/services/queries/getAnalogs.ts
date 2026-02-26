import { apiClient } from "@/lib/apiClient";
import type {
  AnalogsResponseDto,
  GetAnalogsParams,
} from "@/modules/analogs/api/types";

export const getAnalogs = async ({
  page,
  limit,
  konkName = "",
  prodName = "",
  signal,
}: GetAnalogsParams): Promise<AnalogsResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (konkName) params.set("konkName", konkName);
  if (prodName) params.set("prodName", prodName);

  const res = await apiClient.get<AnalogsResponseDto>(
    `/analogs?${params.toString()}`,
    { signal },
  );
  return res.data;
};
