import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { AirClientPendingItemDto } from "@/modules/sku-analytics/api/types";
import type {
  AirClientRowState,
  AirClientRowStatus,
} from "@/modules/sku-analytics/types";
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  MinusCircle,
  RotateCw,
  XCircle,
} from "lucide-react";

interface StatusMeta {
  label: string;
  variant: "default" | "secondary" | "success" | "warning" | "destructive" | "info" | "outline";
}

const STATUS_META: Record<AirClientRowStatus, StatusMeta> = {
  pending: { label: "Очікує", variant: "outline" },
  capturing: { label: "Зчитування…", variant: "info" },
  saving: { label: "Збереження…", variant: "info" },
  saved: { label: "Записано", variant: "success" },
  skipped: { label: "Пропущено", variant: "secondary" },
  error: { label: "Помилка", variant: "destructive" },
};

function StatusBadge({ state }: { state: AirClientRowState }) {
  const meta = STATUS_META[state.status];
  const isBusy = state.status === "capturing" || state.status === "saving";

  let icon = null;
  if (isBusy) icon = <Loader2 className={cn(iconSize.ui, "animate-spin")} />;
  else if (state.status === "saved")
    icon = <CheckCircle2 className={iconSize.ui} />;
  else if (state.status === "skipped")
    icon = <MinusCircle className={iconSize.ui} />;
  else if (state.status === "error")
    icon = <XCircle className={iconSize.ui} />;

  return (
    <Badge variant={meta.variant} className="gap-1">
      {icon}
      {meta.label}
    </Badge>
  );
}

interface AirClientPendingListProps {
  items: AirClientPendingItemDto[];
  rowStates: Record<string, AirClientRowState>;
  isRunning: boolean;
  onRetry: (skuId: string) => void;
}

export function AirClientPendingList({
  items,
  rowStates,
  isRunning,
  onRetry,
}: AirClientPendingListProps) {
  if (items.length === 0) {
    return (
      <p className={cn("text-muted-foreground", typography.body)}>
        Черга порожня — усі Air SKU за сьогодні заповнені.
      </p>
    );
  }

  return (
    <ul className="grid gap-2">
      {items.map((item) => {
        const state = rowStates[item.skuId] ?? { status: "pending" };
        const isError = state.status === "error";

        return (
          <li
            key={item.skuId}
            className="border-border/60 bg-card/40 flex flex-wrap items-center gap-3 rounded-lg border px-3 py-2"
          >
            <div className="grid min-w-0 flex-1 gap-0.5">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-primary inline-flex items-center gap-1.5 truncate hover:underline",
                  typography.body,
                )}
              >
                <ExternalLink className={iconSize.ui} />
                <span className="truncate">{item.title}</span>
              </a>
              {isError && state.message ? (
                <span className={cn(typography.caption, "text-destructive")}>
                  {state.code ? `${state.code}: ` : ""}
                  {state.message}
                </span>
              ) : (
                <span className={cn("text-muted-foreground font-mono", typography.caption)}>
                  {item.productId}
                </span>
              )}
            </div>

            <StatusBadge state={state} />

            {isError ? (
              <Button
                variant="outline"
                size="sm"
                disabled={isRunning}
                onClick={() => onRetry(item.skuId)}
              >
                <RotateCw className={iconSize.ui} />
                Повторити
              </Button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
