import { apiClient } from "@/lib/apiClient";
import type { BlocksResponseDto } from "@/modules/blocks/api/types";

export const getBlocks = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<BlocksResponseDto> => {
  const res = await apiClient.get<BlocksResponseDto>("/blocks", {
    signal,
  });

  return res.data;
};

