import { toast } from "@/components/ui/use-toast";
import { clear, getItem, removeItem, setItem } from "@/utils/localStorage";
import { createApiClient } from "@shared/lib/apiClient";
import { SERVER_URL } from "@shared/lib/config";
import { initStorage } from "@shared/lib/storage";
import {
  getErrorMessage,
  isAuthError,
  isRoleError,
  type ErrorCode,
} from "@shared/modules/auth";
import type { AxiosError } from "axios";

// Инициализация storage для web
initStorage({
  getItem: <T = string,>(key: string) => getItem(key as never) as T | null,
  setItem: <T = string,>(key: string, value: T) => {
    setItem(key as never, value as never);
  },
  removeItem: (key: string) => removeItem(key as never),
  clear: () => clear(),
});

// Создание API клиента с web-specific обработкой ошибок
export const apiClient = createApiClient({
  baseURL: SERVER_URL,
  timeout: 10000,
  getAuthToken: () => getItem("auth_token"),
  onError: (error: AxiosError) => {
    const errorData = error.response?.data as
      | { message?: string; code?: ErrorCode }
      | undefined;
    if (error.response) {
      const { status } = error.response;
      const data = errorData;
      const errorCode = errorData?.code;

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
  },
});

// Создание сервисов для Arts модуля
import { createArtServices } from "@shared/modules/arts/api/services/createArtServices";
export const artServices = createArtServices(apiClient);
