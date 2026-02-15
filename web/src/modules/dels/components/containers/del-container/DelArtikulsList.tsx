import { Button } from "@/components/ui/button";
import type { DelDto } from "@/modules/dels/api/types";
import { usePatchDelArtikulMutation } from "@/modules/dels/api/hooks/mutations/usePatchDelArtikulMutation";
import { Check, Clock, Loader2, RefreshCw, X } from "lucide-react";

export interface ChainStepForList {
  artikul: string;
  status: string;
  error?: string;
}

interface DelArtikulsListProps {
  del: DelDto;
  onRefetch?: () => void;
  chainRunning?: boolean;
  chainSteps?: ChainStepForList[];
}

export function DelArtikulsList({
  del,
  onRefetch,
  chainRunning = false,
  chainSteps = [],
}: DelArtikulsListProps) {
  const patchMutation = usePatchDelArtikulMutation({ delId: del._id });
  const entries = Object.entries(del.artikuls ?? {});

  const stepByArtikul = new Map(
    chainSteps.map((s) => [s.artikul, s]),
  );

  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        У поставці ще немає артикулів.
      </p>
    );
  }

  return (
    <div className="grid gap-1">
      <div
        className="grid grid-cols-[1fr_auto_auto] gap-2 border-b px-2 py-1 text-muted-foreground text-sm"
        role="row"
      >
        <span>Артикул</span>
        <span className="text-right">Кількість</span>
        <span className="w-[100px]" />
      </div>
      {entries.map(([artikul, qty]) => {
        const step = stepByArtikul.get(artikul);
        const showChainStatus = chainRunning && step;

        const isUpdating =
          !showChainStatus &&
          patchMutation.isPending &&
          patchMutation.variables?.artikul === artikul;

        return (
          <div
            key={artikul}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50"
            role="row"
          >
            <span className="font-mono text-sm">{artikul}</span>
            <span className="text-right text-sm">{qty}</span>
            <div className="flex min-w-0 items-center gap-2">
              {showChainStatus ? (
                <>
                  {step.status === "pending" && (
                    <Clock
                      className="text-muted-foreground size-4 shrink-0"
                      aria-hidden
                    />
                  )}
                  {step.status === "running" && (
                    <Loader2
                      className="size-4 shrink-0 animate-spin text-blue-600"
                      aria-hidden
                    />
                  )}
                  {step.status === "success" && (
                    <Check
                      className="size-4 shrink-0 text-green-600"
                      aria-hidden
                    />
                  )}
                  {step.status === "error" && (
                    <>
                      <X
                        className="size-4 shrink-0 text-destructive"
                        aria-hidden
                      />
                      {step.error && (
                        <span className="text-destructive truncate text-xs">
                          {step.error}
                        </span>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={patchMutation.isPending || chainRunning}
                  onClick={() => {
                    patchMutation.mutate(
                      { artikul },
                      {
                        onSettled: () => onRefetch?.(),
                      },
                    );
                  }}
                >
                  {isUpdating ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <RefreshCw className="size-4" aria-hidden />
                  )}
                  <span className="sr-only">Оновити артикул</span>
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
