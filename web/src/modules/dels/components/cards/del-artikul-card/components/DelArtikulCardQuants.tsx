import { iconSize } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { DelArtikulItem } from "@/modules/dels/api/types";
import { Globe, Package } from "lucide-react";

interface DelArtikulCardQuantsProps {
  item: DelArtikulItem;
}

const iconClassName = cn(iconSize.inline, "shrink-0 text-muted-foreground");

export function DelArtikulCardQuants({ item }: DelArtikulCardQuantsProps) {
  const hasStock = item.stock !== undefined;

  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="flex items-center gap-1" title="В поставці">
        <Package className={iconClassName} aria-hidden />
        <span
          className={cn(
            "min-w-[1.25rem] text-center text-sm font-medium",
            item.quant === 0 && "text-destructive",
          )}
        >
          {item.quant}
        </span>
      </div>
      <div className="flex items-center gap-1" title="Sharik">
        <Globe className={iconClassName} aria-hidden />
        <span
          className={cn(
            "min-w-[1.25rem] text-center text-sm font-medium",
            !hasStock && "text-muted-foreground",
            item.stock === 0 && "text-chart-6",
          )}
        >
          {hasStock ? item.stock : "—"}
        </span>
      </div>
    </div>
  );
}
