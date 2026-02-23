import { apiClient } from "@/lib/apiClient";
import type { CreateKonkDto, KonkResponse } from "@/modules/konks/api/types";

export const createKonk = async (data: CreateKonkDto): Promise<KonkResponse> => {
  const res = await apiClient.post<KonkResponse>("/konks", data);
  return res.data;
};
