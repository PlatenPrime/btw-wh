import { apiClient } from "@/lib/apiClient";
import type { SkugrPageResponseDto } from "@/modules/skugrs/api/types";

export const getSkugrPageById = async (
  id: string,
  signal?: AbortSignal,
): Promise<SkugrPageResponseDto> => {
  const res = await apiClient.get<SkugrPageResponseDto>(
    `/skugrs/id/${id}`,
    { signal },
  );
  return res.data;
};
