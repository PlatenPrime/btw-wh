import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types/dto";

interface DefCardQuantsProps {
  defItem: DeficitItem;
}


export function DefCardQuants({ defItem }: DefCardQuantsProps) {
  return (
    <div className="space-y-1 px-2 pb-2">
      <div className="flex justify-between text-xs border-b border-border ">
        <span className="text-foreground">Запаси:</span>
        <span
          className={cn(
            "font-medium",
            defItem.quant === 0 && "text-red-600 dark:text-red-400",
          )}
        >
          {defItem.quant}
        </span>
      </div>
      <div className="flex justify-between text-xs border-b border-border">
        <span className="text-foreground">Сайт:</span>
        <span className="font-medium">{defItem.sharikQuant}</span>
      </div>
      <div className="flex justify-between text-xs border-b border-border">
        <span className="text-foreground">Вітрина:</span>
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
