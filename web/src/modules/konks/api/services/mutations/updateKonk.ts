import { apiClient } from "@/lib/apiClient";
import type { KonkResponse, UpdateKonkDto } from "@/modules/konks/api/types";

export const updateKonk = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateKonkDto;
}): Promise<KonkResponse> => {
  const res = await apiClient.patch<KonkResponse>(`/konks/id/${id}`, data);
  return res.data;
};
