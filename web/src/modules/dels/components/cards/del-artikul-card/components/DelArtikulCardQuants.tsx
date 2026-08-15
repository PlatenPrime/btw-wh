import { IconWell } from "@/components/shared/elements";
import { cn } from "@/lib/utils";
import type { DelArtikulItem } from "@/modules/dels/api/types";
import { Globe, Package } from "lucide-react";

interface DelArtikulCardQuantsProps {
  item: DelArtikulItem;
}

export function DelArtikulCardQuants({ item }: DelArtikulCardQuantsProps) {
  const hasStock = item.stock !== undefined;
  const isEmptyQuant = item.quant === 0;
  const isEmptyStock = item.stock === 0;

  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="flex items-center gap-1" title="В поставці">
        <IconWell
          icon={Package}
          tone={isEmptyQuant ? "destructive" : "primary"}
          size="sm"
        />
        <span
          className={cn(
            "min-w-[1.25rem] text-center text-sm font-medium",
            isEmptyQuant && "text-destructive",
          )}
        >
          {item.quant}
        </span>
      </div>
      <div className="flex items-center gap-1" title="Sharik">
        <IconWell
          icon={Globe}
          tone={!hasStock ? "muted" : isEmptyStock ? "warning" : "info"}
          size="sm"
        />
        <span
          className={cn(
            "min-w-[1.25rem] text-center text-sm font-medium",
            !hasStock && "text-muted-foreground",
            isEmptyStock && "text-warning",
          )}
        >
          {hasStock ? item.stock : "—"}
        </span>
      </div>
    </div>
  );
}
