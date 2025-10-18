import type { AxiosInstance } from "axios";
import type { LoginResponse, RegisterData } from "../types";

/**
 * Register service
 * Требует инициализированный apiClient
 */
export const createRegisterService = (apiClient: AxiosInstance) => {
  return async (data: RegisterData): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>("/auth/register", data);
    return res.data;
  };
};
