import { SERVER_URL } from "@/constants/server";
import {
  isAuthError,
  isRoleError,
  type ErrorCode,
} from "@/modules/auth/types/errors";
import { getItem, removeItem } from "@/utils/localStorage";
import axios, { type AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: SERVER_URL,
});

/**
 * 🔐 Request Interceptor - автоматичне додавання Bearer токена
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * ⚠️ Response Interceptor - обробка помилок авторизації та прав доступу
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string; code?: ErrorCode }>) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorCode = data?.code;

      // 401 Unauthorized - проблеми з авторизацією
      if (status === 401) {
        if (errorCode && isAuthError(errorCode)) {
          // Критичні помилки токена - виходимо
          if (
            errorCode === "TOKEN_EXPIRED" ||
            errorCode === "INVALID_TOKEN" ||
            errorCode === "NO_TOKEN" ||
            errorCode === "INVALID_TOKEN_FORMAT" ||
            errorCode === "INVALID_TOKEN_PAYLOAD"
          ) {
            removeItem("auth_token");
            removeItem("auth_user");

            // Перенаправляємо на сторінку unauthorized
            if (window.location.hash !== "#/login") {
              window.location.hash = "#/unauthorized";
            }
          }
        }
      }

      // 403 Forbidden - недостатньо прав
      if (status === 403) {
        if (errorCode && isRoleError(errorCode)) {
          // Якщо недостатньо прав, перенаправляємо на forbidden
          if (errorCode === "INSUFFICIENT_PERMISSIONS") {
            if (window.location.hash !== "#/forbidden") {
              window.location.hash = "#/forbidden";
            }
          }
        }
      }

      // 500 Internal Server Error
      // 404 Not Found
      // Network errors
    }

    return Promise.reject(error);
  },
);
