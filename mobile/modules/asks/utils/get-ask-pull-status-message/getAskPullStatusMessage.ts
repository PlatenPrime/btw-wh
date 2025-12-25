import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";

export type AskPullStatusMessageVariant = "success" | "warning" | "default";

export interface AskPullStatusMessage {
  iconName: string;
  message: string;
  variant: AskPullStatusMessageVariant;
}

export const getAskPullStatusMessage = (
  data: GetAskPullResponse,
): AskPullStatusMessage | null => {
  const { status, message: backendMessage } = data;

  // Статусы satisfied и finished - успешное завершение
  if (status === "satisfied" || status === "finished") {
    return {
      iconName: "check-circle",
      message: backendMessage || "Товар знято",
      variant: "success" as const,
    };
  }

  // Статус no_poses - позиций нет
  if (status === "no_poses") {
    return {
      iconName: "cancel",
      message:
        backendMessage ||
        (data.remainingQuantity !== null && data.remainingQuantity > 0
          ? `Залишилось зняти: ${data.remainingQuantity}, але позицій з цим артикулом на складі не знайдено`
          : "Немає позицій для зняття"),
      variant: "warning" as const,
    };
  }

  // Статус process - нужно снимать, но если позиций нет, показываем сообщение
  if (status === "process" && data.positions.length === 0) {
    return {
      iconName: "cancel",
      message: backendMessage || "Позиції для зняття не знайдено",
      variant: "warning" as const,
    };
  }

  // Статус process с позициями - возвращаем null, чтобы показать позиции
  return null;
};
