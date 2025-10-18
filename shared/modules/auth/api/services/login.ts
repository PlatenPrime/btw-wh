import type { AxiosInstance } from "axios";
import type { LoginData, LoginResponse } from "../types";

/**
 * Login service
 * Требует инициализированный apiClient
 */
export const createLoginService = (apiClient: AxiosInstance) => {
  return async (data: LoginData): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>("/auth/login", data);
    return res.data;
  };
};
