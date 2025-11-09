import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "@/modules/asks/api/types/dto";

export interface PullAskRequest {
  solverId: string;
  action: string;
  pullAskData: {
    palletData: {
      _id: string;
      title: string;
    };
    quant: number;
    boxes: number;
  };
}

export const pullAskById = async (
  id: string,
  payload: PullAskRequest,
): Promise<AskDto> => {
  const res = await apiClient.patch<AskDto>(`/asks/${id}/pull`, payload);
  return res.data;
};

