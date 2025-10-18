import type { AxiosInstance } from "axios";

export const createCalculateDefsService = (apiClient: AxiosInstance) => {
  return async (): Promise<void> => {
    // Отправляем запрос без ожидания ответа (fire-and-forget)
    apiClient.post("/defs/calculate").catch(() => {
      // Игнорируем ошибки сети, так как мы не ждем ответа
    });
  };
};
