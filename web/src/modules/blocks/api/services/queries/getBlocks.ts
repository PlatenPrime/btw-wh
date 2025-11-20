import { apiClient } from "@/lib/apiClient";
import type { BlockDto } from "@/modules/blocks/api/types";

const BLOCKS_API_PATH = "/blocks";

interface BlocksResponse {
  message: string;
  data: BlockDto[];
}

export async function getBlocks(signal?: AbortSignal): Promise<BlockDto[]> {
  const response = await apiClient.get<BlocksResponse>(BLOCKS_API_PATH, {
    signal,
  });

  return response.data.data;
}

