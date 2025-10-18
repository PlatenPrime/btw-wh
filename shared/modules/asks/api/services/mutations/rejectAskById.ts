import type { AxiosInstance } from "axios";
import type { AskDto } from "../../types/dto";

export const createRejectAskByIdService = (apiClient: AxiosInstance) => {
  return async (id: string, solverId: string): Promise<AskDto> => {
    const res = await apiClient.patch<AskDto>(`/asks/${id}/reject`, {
      solverId,
    });
    return res.data;
  };
};
