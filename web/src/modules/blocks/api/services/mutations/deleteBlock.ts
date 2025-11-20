import { apiClient } from "@/lib/apiClient";

const BLOCKS_API_PATH = "/blocks";

interface DeleteBlockResponse {
  message: string;
  data: {
    _id: string;
    title: string;
    order: number;
  };
}

export async function deleteBlock(id: string): Promise<void> {
  await apiClient.delete<DeleteBlockResponse>(`${BLOCKS_API_PATH}/${id}`);
}

