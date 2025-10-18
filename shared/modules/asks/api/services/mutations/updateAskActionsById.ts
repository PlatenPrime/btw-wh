import type { AxiosInstance } from "axios";
import type { AskDto } from "../../types/dto";

export interface UpdateAskActionsRequest {
  action: string;
  userId: string;
}

export const createUpdateAskActionsByIdService = (apiClient: AxiosInstance) => {
  return async (id: string, data: UpdateAskActionsRequest): Promise<AskDto> => {
    const res = await apiClient.patch<AskDto>(`/asks/${id}/actions`, data);
    return res.data;
  };
};
