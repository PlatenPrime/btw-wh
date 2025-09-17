import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "@/modules/asks/api/types/dto";

export interface UpdateAskActionsRequest {
  action: string;
  userId: string;
}

export const updateAskActionsById = async (
  id: string,
  data: UpdateAskActionsRequest,
): Promise<AskDto> => {
  const res = await apiClient.patch<AskDto>(`/asks/${id}/actions`, data);
  return res.data;
};
