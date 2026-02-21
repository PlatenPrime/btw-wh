import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DelArtikulItem } from "@/modules/dels/api/types";
import { Check, Clock, Loader2, RefreshCw, X } from "lucide-react";

export type DelArtikulCardVariant = "normal" | "zeroQuantity" | "noNameUkr";

export interface DelArtikulCardViewChainStep {
  status: string;
  error?: string;
}

const cardBaseClasses =
  "flex flex-row items-center gap-2 p-2 shadow-none ring-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md";

const variantClasses: Record<DelArtikulCardVariant, string> = {
  normal: "ring-gray-200 dark:ring-gray-700",
  zeroQuantity:
    "ring-red-300 bg-red-50 dark:ring-red-800 dark:bg-red-950/30",
  noNameUkr:
    "ring-amber-300 bg-amber-50 dark:ring-amber-700 dark:bg-amber-950/30",
};

interface DelArtikulCardViewProps {
  variant: DelArtikulCardVariant;
  artikul: string;
  item: DelArtikulItem;
  onRefresh: () => void;
  isUpdating?: boolean;
  disabled?: boolean;
  chainStep?: DelArtikulCardViewChainStep | null;
  chainRunning?: boolean;
}

export function DelArtikulCardView({
  variant,
  artikul,
  item,
  onRefresh,
  isUpdating = false,
  disabled = false,
  chainStep = null,
  chainRunning = false,
}: DelArtikulCardViewProps) {
  const showChainStatus = chainRunning && chainStep;

  return (
    <Card className={cn(cardBaseClasses, variantClasses[variant])}>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ArtikulImageLink
          artikul={artikul}
          nameukr={item.nameukr}
          className="min-w-0 flex-1"
        />
        <span className="text-muted-foreground shrink-0 text-sm font-medium">
          {item.quantity}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {showChainStatus ? (
          <>
            {chainStep.status === "pending" && (
              <Clock
                className="text-muted-foreground size-4 shrink-0"
                aria-hidden
              />
            )}
            {chainStep.status === "running" && (
              <Loader2
                className="size-4 shrink-0 animate-spin text-blue-600"
                aria-hidden
              />
            )}
            {chainStep.status === "success" && (
              <Check
                className="size-4 shrink-0 text-green-600"
                aria-hidden
              />
            )}
            {chainStep.status === "error" && (
              <>
                <X
                  className="size-4 shrink-0 text-destructive"
                  aria-hidden
                />
                {chainStep.error && (
                  <span className="text-destructive truncate text-xs">
                    {chainStep.error}
                  </span>
                )}
              </>
            )}
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={onRefresh}
            aria-label={isUpdating ? "Оновлення…" : "Оновити артикул"}
          >
            {isUpdating ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <RefreshCw className="size-4" aria-hidden />
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
