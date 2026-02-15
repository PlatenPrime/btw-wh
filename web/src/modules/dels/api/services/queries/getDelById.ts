import { apiClient } from "@/lib/apiClient";
import type { DelResponse } from "@/modules/dels/api/types";

export const getDelById = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<DelResponse> => {
  const res = await apiClient.get<DelResponse>(`/dels/id/${id}`, { signal });
  return res.data;
};
