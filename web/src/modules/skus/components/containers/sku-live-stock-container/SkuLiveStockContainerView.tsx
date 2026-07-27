import { Button } from "@/components/ui/button";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { SkuStockDto } from "@/modules/skus/api/types";
import {
  DollarSign,
  Loader2,
  RefreshCw,
  Warehouse,
} from "lucide-react";

interface SkuLiveStockContainerViewProps {
  hasRequested: boolean;
  isLoading: boolean;
  isError: boolean;
  data: SkuStockDto | null;
  onRequest: () => void;
}

export function SkuLiveStockContainerView({
  hasRequested,
  isLoading,
  isError,
  data,
  onRequest,
}: SkuLiveStockContainerViewProps) {
  return (
    <div className="grid gap-2">
      <Button
        variant="info"
        size="sm"
        className="w-fit"
        disabled={isLoading}
        onClick={onRequest}
      >
        {isLoading ? (
          <Loader2 className={cn(iconSize.ui, "animate-spin")} />
        ) : (
          <RefreshCw className={iconSize.ui} />
        )}
        {hasRequested ? "Оновити залишок" : "Актуальний залишок"}
      </Button>

      {data ? (
        <div className="text-foreground grid gap-2 text-sm">
          <p className="flex items-center gap-2 text-nowrap">
            <Warehouse className="h-4 w-4 text-sky-500" />
            <span>{data.stock}</span>
          </p>
          <p className="flex items-center gap-2 text-nowrap">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <span>{data.price} грн</span>
          </p>
        </div>
      ) : null}

      {isError && !isLoading ? (
        <p className={cn(typography.caption, "text-destructive")}>
          Не вдалося отримати залишок. Спробуйте пізніше.
        </p>
      ) : null}
    </div>
  );
}
