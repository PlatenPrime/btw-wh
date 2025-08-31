import { apiClient } from "@/lib/apiClient";
import type { AskDto } from "../types/dto";

export interface CreateAskRequest {
  artikul: string;
  nameukr?: string;
  quant?: number;
  com?: string;
  asker: string;
}

export const createAsk = async (data: CreateAskRequest): Promise<AskDto> => {
  const res = await apiClient.post<AskDto>("/asks", data);
  return res.data;
};
