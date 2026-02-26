import { apiClient } from "@/lib/apiClient";
import type { EnrichedAnalogResponseDto } from "@/modules/analogs/api/types";

export const getAnalogById = async (
  id: string,
  signal?: AbortSignal,
): Promise<EnrichedAnalogResponseDto> => {
  const res = await apiClient.get<EnrichedAnalogResponseDto>(
    `/analogs/id/${id}`,
    { signal },
  );
  return res.data;
};
