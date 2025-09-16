import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "@/modules/asks/api/types/dto";

export const rejectAskById = async (
  id: string,
  solverId: string,
): Promise<AskDto> => {
  const res = await apiClient.patch<AskDto>(`/asks/${id}/reject`, {
    solverId,
  });
  return res.data;
};
