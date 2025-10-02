import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types/dto";

interface DefCardQuantsProps {
  defItem: DeficitItem;
}


export function DefCardQuants({ defItem }: DefCardQuantsProps) {
  return (
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
            defItem.status === "critical"
              ? "text-red-600 dark:text-red-400"
              : "text-yellow-600 dark:text-yellow-400",
          )}
        >
          {defItem.difQuant}
        </span>
      </div>
    </div>
  );
}
