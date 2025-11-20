import { apiClient } from "@/lib/apiClient";
import type { BlockDto } from "@/modules/blocks/api/types";

const BLOCKS_API_PATH = "/blocks";

interface BlockResponse {
  message: string;
  data: BlockDto;
}

export async function getBlockById(
  id: string,
  signal?: AbortSignal,
): Promise<BlockDto> {
  const response = await apiClient.get<BlockResponse>(
    `${BLOCKS_API_PATH}/${id}`,
    {
      signal,
    },
  );

  return response.data.data;
}

