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
    <div className="contents">
      {data ? (
        <>
          <MetricChip
            icon={Warehouse}
            tone="info"
            label="Залишок"
            value={
              <span className="inline-flex min-w-0 items-center gap-2">
                <span className="min-w-0 break-words">{data.stock}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground -mr-1 shrink-0"
                  disabled={isRefreshing}
                  onClick={onRefresh}
                  aria-label={
                    isRefreshing ? "Оновлення залишку…" : "Оновити залишок"
                  }
                >
                  {isRefreshing ? (
                    <Loader2 className={cn(iconSize.ui, "animate-spin")} />
                  ) : (
                    <RefreshCw className={iconSize.ui} />
                  )}
                </Button>
              </span>
            }
            className="w-full"
          />
          <MetricChip
            icon={Banknote}
            tone="success"
            label="Ціна"
            value={`${data.price} грн`}
            className="w-full"
          />
        </>
      ) : null}

      {isError && !data ? (
        <div className="flex min-w-0 items-center gap-2 sm:col-span-2">
          <p className={cn(typography.caption, "text-destructive min-w-0")}>
            Не вдалося отримати залишок. Спробуйте пізніше.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground shrink-0"
            disabled={isRefreshing}
            onClick={onRefresh}
            aria-label={
              isRefreshing ? "Оновлення залишку…" : "Оновити залишок"
            }
          >
            {isRefreshing ? (
              <Loader2 className={cn(iconSize.ui, "animate-spin")} />
            ) : (
              <RefreshCw className={iconSize.ui} />
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
