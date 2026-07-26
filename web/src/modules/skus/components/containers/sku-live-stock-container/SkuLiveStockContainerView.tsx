import { Button } from "@/components/ui/button";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { SkuStockDto } from "@/modules/skus/api/types";
import {
  DollarSign,
  Info,
  Loader2,
  RefreshCw,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router";

interface AirModeProps {
  mode: "air";
  airKonkId?: string;
}

interface LiveModeProps {
  mode: "live";
  hasRequested: boolean;
  isLoading: boolean;
  isError: boolean;
  data: SkuStockDto | null;
  onRequest: () => void;
}

type SkuLiveStockContainerViewProps = AirModeProps | LiveModeProps;

function AirHint({ airKonkId }: { airKonkId?: string }) {
  return (
    <div className="border-border/60 bg-muted/40 grid gap-1 rounded-lg border border-dashed px-3 py-2">
      <p className={cn("flex items-center gap-1.5", typography.body)}>
        <Info className={iconSize.ui} />
        Live-залишок Air недоступний (серверний scrape вимкнено).
      </p>
      {airKonkId ? (
        <Link
          to={`/sku/konks/${airKonkId}`}
          className={cn("text-primary hover:underline", typography.caption)}
        >
          Перейти до дозаповнення Air-зрізів
        </Link>
      ) : null}
    </div>
  );
}

export function SkuLiveStockContainerView(props: SkuLiveStockContainerViewProps) {
  if (props.mode === "air") {
    return <AirHint airKonkId={props.airKonkId} />;
  }

  const { hasRequested, isLoading, isError, data, onRequest } = props;

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
