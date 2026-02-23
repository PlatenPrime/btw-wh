import { apiClient } from "@/lib/apiClient";
import type { KonkResponse } from "@/modules/konks/api/types";

export const getKonkByName = async ({
  name,
  signal,
}: {
  name: string;
  signal?: AbortSignal;
}): Promise<KonkResponse> => {
  const res = await apiClient.get<KonkResponse>(
    `/konks/name/${encodeURIComponent(name)}`,
    { signal },
  );
  return res.data;
};
