import { IconWell } from "@/components/shared/elements";
import { cn } from "@/lib/utils";
import type { DeficitItem } from "@/modules/defs/api/types/dto";
import { Globe, Store, Warehouse } from "lucide-react";

interface DefCardQuantsProps {
  defItem: DeficitItem;
}

export function DefCardQuants({ defItem }: DefCardQuantsProps) {
  const isEmptyStock = defItem.quant === 0;
  const isCritical = defItem.status === "critical";

  return (
    <div className="flex flex-col gap-1 px-2 pb-2">
      <div
        className="flex items-center justify-start gap-2 text-xs"
        title="Запаси"
      >
        <IconWell
          icon={Warehouse}
          tone={isEmptyStock ? "destructive" : "primary"}
          size="sm"
        />
        <span
          className={cn("font-medium", isEmptyStock && "text-destructive")}
        >
          {defItem.quant}
        </span>
      </div>
      <div
        className="flex items-center justify-start gap-2 text-xs"
        title="Сайт"
      >
        <IconWell icon={Globe} tone="info" size="sm" />
        <span className="font-medium">{defItem.sharikQuant}</span>
      </div>
      <div
        className="flex items-center justify-start gap-2 text-xs"
        title="Вітрина"
      >
        <IconWell
          icon={Store}
          tone={isCritical ? "destructive" : "warning"}
          size="sm"
        />
        <span
          className={cn(
            "font-medium",
            isCritical ? "text-destructive" : "text-warning",
          )}
        >
          {defItem.difQuant}
        </span>
      </div>
    </div>
  );
}
