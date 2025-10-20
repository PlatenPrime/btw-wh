import { apiClient } from "@/lib/apiClient";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";

interface ApiResponse {
  success: boolean;
  data: GetPosesByArtikulResponse;
}

export const getPosesByArtikul = async (
  artikul: string,
  signal?: AbortSignal,
): Promise<GetPosesByArtikulResponse> => {
  const res = await apiClient.get<ApiResponse>(`/poses/by-artikul/${artikul}`, {
    signal,
  });
  return res.data.data;
};
