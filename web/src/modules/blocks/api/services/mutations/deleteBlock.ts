import { apiClient } from "@/lib/apiClient";
import type { DeleteBlockResponse } from "@/modules/blocks/api/types";

export const deleteBlock = async ({
  id,
  signal,
}: {
  id: string;
  signal?: AbortSignal;
}): Promise<DeleteBlockResponse> => {
  const res = await apiClient.delete<DeleteBlockResponse>(`/blocks/${id}`, {
    signal,
  });

  return res.data;
};

