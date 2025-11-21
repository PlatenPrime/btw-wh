import { apiClient } from "@/lib/apiClient";
import type { BlockResponse } from "@/modules/blocks/api/types";

export const getBlock = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<BlockResponse> => {
  const res = await apiClient.get<BlockResponse>(`/blocks/${id}`, {
    signal,
  });

  return res.data;
};

