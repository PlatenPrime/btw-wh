import type { AxiosError, AxiosInstance } from "axios";

/**
 * Конфигурация для создания API клиента
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  onError?: (error: AxiosError) => void;
  getAuthToken?: () => Promise<string | null> | string | null;
}

/**
 * API Client интерфейс
 */
export interface IApiClient extends AxiosInstance {}

/**
 * Стандартный формат ошибки от API
 */
export interface ApiErrorResponse {
  message: string;
  code?: string;
  statusCode?: number;
}
