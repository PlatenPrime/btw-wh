import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { Globe, Store, Warehouse } from "lucide-react";

interface DefCardQuantsProps {
  defItem: DeficitItem;
}

const iconClassName = "size-4 shrink-0 text-muted-foreground";

export function DefCardQuants({ defItem }: DefCardQuantsProps) {
  return (
    <div className="space-y-1 px-2 pb-2">
      <div
        className="flex items-center justify-start gap-2  text-xs"
        title="Запаси"
      >
        <Warehouse className={iconClassName} aria-hidden />
        <span
          className={cn(
            "font-medium",
            defItem.quant === 0 && "text-red-600 dark:text-red-400",
          )}
        >
          {defItem.quant}
        </span>
      </div>
      <div
        className="flex items-center justify-start gap-2  text-xs"
        title="Сайт"
      >
        <Globe className={iconClassName} aria-hidden />
        <span className="font-medium">{defItem.sharikQuant}</span>
      </div>
      <div
        className="flex items-center justify-start gap-2  text-xs"
        title="Вітрина"
      >
        <Store className={iconClassName} aria-hidden />
        <span
          className={cn(
            "font-medium",
            defItem.status === "critical"
              ? "text-red-600 dark:text-red-400"
              : "text-amber-600 dark:text-amber-400",
          )}
        >
          {defItem.difQuant}
        </span>
      </div>
    </div>
  );
}
