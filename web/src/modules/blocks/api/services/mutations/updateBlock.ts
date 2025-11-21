import { apiClient } from "@/lib/apiClient";
import type { BlockResponse, UpdateBlockDto } from "@/modules/blocks/api/types";

export const updateBlock = async ({
  id,
  data,
  signal,
}: {
  id: string;
  data: UpdateBlockDto;
  signal?: AbortSignal;
}): Promise<BlockResponse> => {
  const res = await apiClient.put<BlockResponse>(`/blocks/${id}`, data, {
    signal,
  });

  return res.data;
};

