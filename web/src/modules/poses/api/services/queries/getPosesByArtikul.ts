import { apiClient } from "@/lib/apiClient";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";

export const getPosesByArtikul = async (
  artikul: string,
  signal?: AbortSignal,
): Promise<GetPosesByArtikulResponse> => {
  const res = await apiClient.get<GetPosesByArtikulResponse>(
    `/poses/by-artikul/${artikul}`,
    {
      signal,
    },
  );
  return res.data;
};
