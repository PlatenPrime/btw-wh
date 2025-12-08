import { CheckCircle2, PackageX } from "lucide-react";
import type { GetAskPullResponse } from "@/modules/asks/api/types/dto";

export interface AskPullStatusMessage {
    icon: React.ComponentType<{ className?: string }>;
    message: string;
    description: string;
    variant: "success" | "warning";
  }

export const getAskPullStatusMessage = (data: GetAskPullResponse): AskPullStatusMessage | null => {
    const { status } = data;

    // Статусы completed и excess считаем успешным завершением
    if (status === "completed" || status === "excess") {
      return {
        icon: CheckCircle2,
        message: status === "excess" ? "Товар знято" : "Товар вже знято",
        description:
          status === "excess"
            ? "Знято навіть більше, ніж просили"
            : "Всі позиції знято",
        variant: "success" as const,
      };
    }

    // Если нужно снятие, но позиций нет
    if (status === "need_pull" && data.positions.length === 0) {
      if (data.remainingQuantity !== null && data.remainingQuantity > 0) {
        return {
          icon: PackageX,
          message: "Немає позицій для зняття",
          description: `Залишилось зняти: ${data.remainingQuantity}, але позицій з цим артикулом на складі не знайдено`,
          variant: "warning" as const,
        };
      }
      return {
        icon: PackageX,
        message: "Немає позицій для зняття",
        description: "Позицій з цим артикулом на складі не знайдено",
        variant: "warning" as const, // Changed to warning to be consistent or maybe info? 
        // Previously it was info if remainingQuantity was null/0, but need_pull implies we WANT to pull.
        // Let's stick to warning if need_pull is true.
      };
    }

    return null;
  };