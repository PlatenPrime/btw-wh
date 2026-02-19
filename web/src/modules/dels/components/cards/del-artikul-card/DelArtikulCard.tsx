import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DelArtikulItem } from "@/modules/dels/api/types";
import { Check, Clock, Loader2, RefreshCw, X } from "lucide-react";

export interface DelArtikulCardChainStep {
  status: string;
  error?: string;
}

interface DelArtikulCardProps {
  artikul: string;
  item: DelArtikulItem;
  onRefresh: () => void;
  isUpdating?: boolean;
  disabled?: boolean;
  chainStep?: DelArtikulCardChainStep | null;
  chainRunning?: boolean;
}

export function DelArtikulCard({
  artikul,
  item,
  onRefresh,
  isUpdating = false,
  disabled = false,
  chainStep = null,
  chainRunning = false,
}: DelArtikulCardProps) {
  const showChainStatus = chainRunning && chainStep;

  return (
    <Card
      className="flex flex-row items-center gap-2 p-2 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md dark:ring-gray-700"
    >
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
            <span>Оновити</span>
          </Button>
        )}
      </div>
    </Card>
  );
}
