import { MetricChip } from "@/components/shared/elements";
import { Button } from "@/components/ui/button";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { SkuStockDto } from "@/modules/skus/api/types";
import { Banknote, Loader2, RefreshCw, Warehouse } from "lucide-react";

interface SkuLiveStockContainerViewProps {
  isRefreshing: boolean;
  isError: boolean;
  data: SkuStockDto | null;
  onRefresh: () => void;
}

export function SkuLiveStockContainerView({
  isRefreshing,
  isError,
  data,
  onRefresh,
}: SkuLiveStockContainerViewProps) {
  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      {data ? (
        <>
          <MetricChip
            icon={Warehouse}
            tone="info"
            label="Залишок"
            value={data.stock}
          />
          <MetricChip
            icon={Banknote}
            tone="success"
            label="Ціна"
            value={`${data.price} грн`}
          />
        </>
      ) : null}

      {isError && !data ? (
        <p className={cn(typography.caption, "text-destructive")}>
          Не вдалося отримати залишок. Спробуйте пізніше.
        </p>
      ) : null}

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground"
        disabled={isRefreshing}
        onClick={onRefresh}
        aria-label={isRefreshing ? "Оновлення залишку…" : "Оновити залишок"}
      >
        {isRefreshing ? (
          <Loader2 className={cn(iconSize.ui, "animate-spin")} />
        ) : (
          <RefreshCw className={iconSize.ui} />
        )}
      </Button>
    </div>
  );
}
