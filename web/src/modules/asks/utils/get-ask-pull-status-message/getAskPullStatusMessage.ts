import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";
import { CheckCircle2, PackageX } from "lucide-react";

export interface AskPullStatusMessage {
  icon: React.ComponentType<{ className?: string }>;
  message: string;
  description: string;
  variant: "success" | "warning";
}

export const getAskPullStatusMessage = (
  data: GetAskPullResponse,
): AskPullStatusMessage | null => {
  const { status, message: backendMessage } = data;

  // Статусы satisfied и finished - успешное завершение
  if (status === "satisfied" || status === "finished") {
    return {
      icon: CheckCircle2,
      message: backendMessage || "Товар знято",
      description: backendMessage
        ? backendMessage
        : status === "finished"
          ? "Процес зняття завершено"
          : "Всі позиції знято",
      variant: "success" as const,
    };
  }

  // Статус no_poses - позиций нет
  if (status === "no_poses") {
    return {
      icon: PackageX,
      message: backendMessage || "Немає позицій для зняття",
      description: backendMessage
        ? backendMessage
        : data.remainingQuantity !== null && data.remainingQuantity > 0
          ? `Залишилось зняти: ${data.remainingQuantity}, але позицій з цим артикулом на складі не знайдено`
          : "Позицій з цим артикулом на складі не знайдено",
      variant: "warning" as const,
    };
  }

  // Статус process - нужно снимать, но если позиций нет, показываем сообщение
  if (status === "process" && data.positions.length === 0) {
    return {
      icon: PackageX,
      message: backendMessage || "Позиції для зняття не знайдено",
      description:
        backendMessage || "Позицій з цим артикулом на складі не знайдено",
      variant: "warning" as const,
    };
  }

  // Статус process с позициями - возвращаем null, чтобы показать позиции
  return null;
};
