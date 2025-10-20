import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "@/modules/asks/api/types/dto";

export const completeAskById = async (
  id: string,
  solverId: string,
): Promise<AskDto> => {
  const res = await apiClient.patch<AskDto>(`/asks/${id}/complete`, {
    solverId,
  });
  return res.data;
};
