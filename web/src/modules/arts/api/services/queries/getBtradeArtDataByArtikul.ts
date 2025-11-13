import { apiClient } from "@/lib/apiClient";
import type { BtradeArtInfoResponse } from "@/modules/arts/api/types/dto";

export const getBtradeArtDataByArtikul = async (
  artikul: string,
  signal?: AbortSignal,
): Promise<BtradeArtInfoResponse> => {
  const res = await apiClient.get<BtradeArtInfoResponse>(`/arts/btrade/${artikul}`, {
    signal,
  });
  return res.data;
};
