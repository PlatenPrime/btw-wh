import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "../types/dto";

export interface UpdateAskRequest {
  artikul?: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  solver?: string;
  solverData?: {
    _id: string;
    fullname: string;
    telegram?: string;
    photo?: string;
  };
  status?: "new" | "in_progress" | "completed" | "cancelled";
  actions?: string[];
}

export const updateAskById = async (
  id: string,
  data: UpdateAskRequest,
): Promise<AskDto> => {
  const res = await apiClient.patch<AskDto>(`/asks/${id}`, data);
  return res.data;
};
