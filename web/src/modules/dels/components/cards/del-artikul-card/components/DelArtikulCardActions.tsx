import { Button } from "@/components/ui/button";
import type { DelArtikulCardViewChainStep } from "@/modules/dels/components/cards/del-artikul-card/components/delArtikulCardVariants";
import { DelArtikulCardChainStatus } from "@/modules/dels/components/cards/del-artikul-card/components/DelArtikulCardChainStatus";
import { Loader2, RefreshCw } from "lucide-react";

interface DelArtikulCardActionsProps {
  showChainStatus: boolean;
  chainStep: DelArtikulCardViewChainStep | null;
  onRefresh: () => void;
  isUpdating?: boolean;
  disabled?: boolean;
}

export function DelArtikulCardActions({
  showChainStatus,
  chainStep,
  onRefresh,
  isUpdating = false,
  disabled = false,
}: DelArtikulCardActionsProps) {
  if (showChainStatus && chainStep) {
    return <DelArtikulCardChainStatus chainStep={chainStep} />;
  }

  return (
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
  );
}
