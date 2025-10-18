import type { AxiosInstance } from "axios";
import type { User } from "../types";

/**
 * Get current user service
 * Требует инициализированный apiClient
 */
export const createGetMeService = (apiClient: AxiosInstance) => {
  return async (): Promise<User> => {
    const res = await apiClient.get<User>("/auth/me");
    return res.data;
  };
};
