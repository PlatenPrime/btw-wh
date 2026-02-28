import { apiClient } from "@/lib/apiClient";
import type {
  AnalogsResponseDto,
  GetAnalogsByKonkParams,
} from "@/modules/analogs/api/types";

export const getAnalogsByKonk = async (
  konkName: string,
  { page, limit, search = "", signal }: GetAnalogsByKonkParams,
): Promise<AnalogsResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search.trim()) params.set("search", search.trim());

  const res = await apiClient.get<AnalogsResponseDto>(
    `/analogs/konk/${encodeURIComponent(konkName)}?${params.toString()}`,
    { signal },
  );
  return res.data;
};
