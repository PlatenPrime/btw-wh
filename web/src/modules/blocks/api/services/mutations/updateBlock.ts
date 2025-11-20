import { apiClient } from "@/lib/apiClient";
import type {
  BlockDto,
  UpdateBlockPayload,
} from "@/modules/blocks/api/types";

const BLOCKS_API_PATH = "/blocks";

interface UpdateBlockResponse {
  message: string;
  data: BlockDto;
}

export async function updateBlock(
  id: string,
  payload: UpdateBlockPayload,
): Promise<BlockDto> {
  const response = await apiClient.put<UpdateBlockResponse>(
    `${BLOCKS_API_PATH}/${id}`,
    payload,
  );

  return response.data.data;
}

