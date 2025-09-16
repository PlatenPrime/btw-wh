import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "@/modules/asks/api/types/dto";

export const executeAskById = async (
  id: string,
  solverId: string,
): Promise<AskDto> => {
  const res = await apiClient.patch<AskDto>(`/asks/${id}/execute`, {
    solverId,
  });
  return res.data;
};
