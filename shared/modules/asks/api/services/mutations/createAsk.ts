import type { AxiosInstance } from "axios";
import type { AskDto } from "../../types/dto";

export interface CreateAskRequest {
  artikul: string;
  nameukr?: string;
  quant?: string;
  com?: string;
  askerId: string;
}

export const createCreateAskService = (apiClient: AxiosInstance) => {
  return async (data: CreateAskRequest): Promise<AskDto> => {
    const res = await apiClient.post<AskDto>("/asks", data);
    return res.data;
  };
};
