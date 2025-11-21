import { apiClient } from "@/lib/apiClient";
import type { BlockResponse, CreateBlockDto } from "@/modules/blocks/api/types";

export const createBlock = async ({
  data,
  signal,
}: {
  data: CreateBlockDto;
  signal?: AbortSignal;
}): Promise<BlockResponse> => {
  const res = await apiClient.post<BlockResponse>("/blocks", data, {
    signal,
  });

  return res.data;
};

