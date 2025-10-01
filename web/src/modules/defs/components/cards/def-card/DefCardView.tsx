import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtNameukr } from "@/modules/arts/components/elements/art-nameukr/ArtNameukr";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { DefAskButton } from "@/modules/defs/components/elements/def-ask-button/DefAskButton";
import { Clock, Info, User } from "lucide-react";

interface DefCardViewProps {
  artikul: string;
  defItem: DeficitItem;
}

// Fallback функция для определения статуса дефицита
const getDeficitStatus = (item: DeficitItem): "limited" | "critical" => {
  // Новое поле status
  if (item.status) {
    return item.status;
  }

  // Fallback к старой логике
  if (item.sharikQuant <= item.quant) {
    return "critical";
  } else if (item.sharikQuant <= item.defLimit) {
    return "limited";
  }

  // По умолчанию лимитированный
  return "limited";
};

export function DefCardView({ artikul, defItem }: DefCardViewProps) {
  const hasExistingAsk = defItem.existingAsk !== null;
  const deficitStatus = getDeficitStatus(defItem);
  const isCritical = deficitStatus === "critical";

  // Цветовые тени и рамка в зависимости от статуса
  const shadowClasses = isCritical
    ? "shadow-red-200 dark:shadow-red-900/50 hover:shadow-red-300 dark:hover:shadow-red-800/50"
    : "shadow-yellow-200 dark:shadow-yellow-900/50 hover:shadow-yellow-300 dark:hover:shadow-yellow-800/50";

  const borderClasses = isCritical
    ? "ring-red-300 dark:ring-red-700"
    : "ring-yellow-300 dark:ring-yellow-700";

  return (
    <Card
      className={cn(
        "bg-background h-full flex-col justify-between p-2 shadow-none ring-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-2xl",
        "text-sm",
        shadowClasses,
        borderClasses,
      )}
    >
      {/* Image and name */}
      <div className="flex items-center justify-between gap-2 text-sm">
        <ArtDialogImage artikul={artikul} />
        <ArtNameukr nameukr={defItem.nameukr || artikul} />
        <div className="flex items-center gap-1">
          {/* Статус индикатор */}
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              isCritical
                ? "bg-red-500 shadow-red-500/50"
                : "bg-yellow-500 shadow-yellow-500/50",
            )}
            title={
              isCritical ? "Критический дефицит" : "Лимитированный дефицит"
            }
          />
          <DefAskButton artikul={artikul} existingAsk={defItem.existingAsk} />
        </div>
      </div>

      {/* Existing ask info */}
      {hasExistingAsk && defItem.existingAsk && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-2 dark:border-amber-800 dark:bg-amber-950/20">
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
              Заявка створена
            </span>
          </div>
          <div className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{defItem.existingAsk.askerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                {new Date(defItem.existingAsk.createdAt).toLocaleDateString(
                  "uk-UA",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stock info */}
      <div className="space-y-1 px-2 pb-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">На складі:</span>
          <span
            className={cn(
              "font-medium",
              defItem.quant === 0 && "text-red-600 dark:text-red-400",
            )}
          >
            {defItem.quant}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Сайт:</span>
          <span className="font-medium">{defItem.sharikQuant}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Вітрина:</span>
          <span
            className={cn(
              "font-medium",
              defItem.difQuant <= 0
                ? "text-red-600 dark:text-red-400"
                : "text-yellow-600 dark:text-yellow-400",
            )}
          >
            {defItem.difQuant}
          </span>
        </div>
      </div>
    </Card>
  );
}
