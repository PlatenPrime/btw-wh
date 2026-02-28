import { apiClient } from "@/lib/apiClient";
import type { AnalogsByArtikulResponseDto } from "@/modules/analogs/api/types";

export const getAnalogsByArtikul = async (
  artikul: string,
  { signal }: { signal?: AbortSignal } = {},
): Promise<AnalogsByArtikulResponseDto> => {
  const res = await apiClient.get<AnalogsByArtikulResponseDto>(
    `/analogs/artikul/${encodeURIComponent(artikul)}`,
    { signal },
  );
  return res.data;
};
