import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "../types/dto";

export const getAskById = async (id: string): Promise<AskDto> => {
  const res = await apiClient.get<AskDto>(`/asks/${id}`);
  return res.data;
};
