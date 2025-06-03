import { apiClient } from "@/lib/apiClient";
import type { BtradeArtInfoDto } from "../types/dto";

export const getBtradeInfoByArtikul = async (
  artikul: string,
  signal?: AbortSignal
): Promise<BtradeArtInfoDto> => {
  const res = await apiClient.get<BtradeArtInfoDto>(`/arts/btrade/${artikul}`, {
    signal,
  });
  return res.data;
};
