import { apiClient } from "@/lib/apiClient";
import type {
  ConstantResponse,
  CreateConstantDto,
} from "@/modules/constants/api/types";

export const createConstant = async (
  data: CreateConstantDto,
): Promise<ConstantResponse> => {
  const res = await apiClient.post<ConstantResponse>("/constants", data);
  return res.data;
};
