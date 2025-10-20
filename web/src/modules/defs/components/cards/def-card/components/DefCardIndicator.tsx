import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types/dto";

interface DefCardIndicatorProps {
  defItem: DeficitItem;
}

export function DefCardIndicator({ defItem }: DefCardIndicatorProps) {
  return  <div
  className={cn(
    "h-2 w-2 rounded-full",
    defItem.status === "critical"
      ? "bg-red-500 shadow-red-500/50"
      : "bg-yellow-500 shadow-yellow-500/50",
  )}
  title={
    defItem.status === "critical"
      ? "Критический дефицит"
      : "Лимитированный дефицит"
  }
/>;
}
