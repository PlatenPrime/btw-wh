import axios, { type AxiosInstance } from "axios";
import type { ApiClientConfig } from "./types";

/**
 * Создает настроенный axios instance с interceptors
 * Базовая версия без platform-specific логики
 */
export const createApiClient = (config: ApiClientConfig): AxiosInstance => {
  const { baseURL, timeout = 10000, onError, getAuthToken } = config;

  const client = axios.create({
    baseURL,
    timeout,
  });

  // Request Interceptor - добавление Bearer токена
  client.interceptors.request.use(
    async (requestConfig) => {
      if (getAuthToken) {
        const token = await getAuthToken();
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor - обработка ошибок
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Вызываем platform-specific обработчик ошибок если он есть
      if (onError) {
        onError(error);
      }
      return Promise.reject(error);
    }
  );

  return client;
};
