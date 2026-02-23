import { apiClient } from "@/lib/apiClient";
import type { KonkResponse } from "@/modules/konks/api/types";

export const getKonkById = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<KonkResponse> => {
  const res = await apiClient.get<KonkResponse>(`/konks/id/${id}`, { signal });
  return res.data;
};
