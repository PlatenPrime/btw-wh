import type { DelArtikulCardViewChainStep } from "@/modules/dels/components/cards/del-artikul-card/components/delArtikulCardVariants";
import { Check, Clock, Loader2, X } from "lucide-react";

interface DelArtikulCardChainStatusProps {
  chainStep: DelArtikulCardViewChainStep;
}

export function DelArtikulCardChainStatus({
  chainStep,
}: DelArtikulCardChainStatusProps) {
  return (
    <div className="flex min-w-0 items-center gap-1">
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
        <Check className="size-4 shrink-0 text-green-600" aria-hidden />
      )}
      {chainStep.status === "error" && (
        <>
          <X className="size-4 shrink-0 text-destructive" aria-hidden />
          {chainStep.error ? (
            <span className="text-destructive max-w-[9rem] truncate text-xs sm:max-w-[14rem]">
              {chainStep.error}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
