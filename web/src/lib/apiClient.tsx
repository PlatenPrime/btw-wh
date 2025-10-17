import { toast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/constants/server";
import {
  getErrorMessage,
  isAuthError,
  isRoleError,
  type ErrorCode,
} from "@/modules/auth/types/errors";
import { getItem, removeItem } from "@/utils/localStorage";
import axios, { type AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
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
          const message = getErrorMessage(errorCode);
          toast({
            variant: "destructive",
            title: "Помилка авторизації",
            description: message,
          });

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
        } else {
          toast({
            variant: "destructive",
            title: "Помилка авторизації",
            description:
              data?.message || "Будь ласка, увійдіть в систему знову.",
          });
        }
      }

      // 403 Forbidden - недостатньо прав
      if (status === 403) {
        if (errorCode && isRoleError(errorCode)) {
          const message = getErrorMessage(errorCode);
          toast({
            variant: "destructive",
            title: "Доступ заборонено",
            description: message,
          });

          // Якщо недостатньо прав, перенаправляємо на forbidden
          if (errorCode === "INSUFFICIENT_PERMISSIONS") {
            if (window.location.hash !== "#/forbidden") {
              window.location.hash = "#/forbidden";
            }
          }
        } else {
          toast({
            variant: "destructive",
            title: "Доступ заборонено",
            description:
              data?.message || "У вас недостатньо прав для цієї операції.",
          });
        }
      }

      // 500 Internal Server Error
      if (status === 500) {
        toast({
          variant: "destructive",
          title: "Помилка сервера",
          description: "Спробуйте пізніше або зверніться до адміністратора.",
        });
      }

      // 404 Not Found
      if (status === 404) {
        toast({
          variant: "destructive",
          title: "Не знайдено",
          description: data?.message || "Запитуваний ресурс не знайдено.",
        });
      }
    } else if (error.request) {
      // Запит був відправлений, але відповіді немає
      toast({
        variant: "destructive",
        title: "Помилка з'єднання",
        description:
          "Не вдалося зв'язатися з сервером. Перевірте підключення до інтернету.",
      });
    }

    return Promise.reject(error);
  },
);
