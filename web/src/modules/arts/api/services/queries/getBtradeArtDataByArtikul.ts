import { apiClient } from "@/lib/apiClient";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";

export const getBtradeArtDataByArtikul = async (
  artikul: string,
  signal?: AbortSignal,
): Promise<BtradeArtInfoDto> => {
  const res = await apiClient.get<BtradeArtInfoDto>(`/arts/btrade/${artikul}`, {
    signal,
  });
  return res.data;
};
