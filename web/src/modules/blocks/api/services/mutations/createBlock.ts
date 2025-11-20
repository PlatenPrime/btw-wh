import { apiClient } from "@/lib/apiClient";
import type {
  BlockDto,
  CreateBlockPayload,
} from "@/modules/blocks/api/types";

const BLOCKS_API_PATH = "/blocks";

interface CreateBlockResponse {
  message: string;
  data: BlockDto;
}

export async function createBlock(
  payload: CreateBlockPayload,
): Promise<BlockDto> {
  const response = await apiClient.post<CreateBlockResponse>(
    BLOCKS_API_PATH,
    payload,
  );

  return response.data.data;
}

