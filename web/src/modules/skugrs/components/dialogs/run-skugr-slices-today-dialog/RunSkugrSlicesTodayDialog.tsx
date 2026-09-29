import { Dialog } from "@/components/ui/dialog";
import { useRunSkugrSlicesTodayMutation } from "@/modules/sku-analytics/api/hooks/mutations/useRunSkugrSlicesTodayMutation";
import { RunSkugrSlicesTodayDialogView } from "@/modules/skugrs/components/dialogs/run-skugr-slices-today-dialog/RunSkugrSlicesTodayDialogView";
import { useCallback } from "react";

interface RunSkugrSlicesTodayDialogProps {
  skugrId: string;
  skugrTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RunSkugrSlicesTodayDialog({
  skugrId,
  skugrTitle,
  open,
  onOpenChange,
}: RunSkugrSlicesTodayDialogProps) {
  const mutation = useRunSkugrSlicesTodayMutation();

  const handleConfirm = useCallback(async () => {
    if (mutation.isPending) return;
    try {
      await mutation.mutateAsync(skugrId);
      onOpenChange(false);
    } catch {
      // toast у мутації
    }
  }, [mutation, onOpenChange, skugrId]);

  const handleCancel = useCallback(() => {
    if (mutation.isPending) return;
    onOpenChange(false);
  }, [mutation.isPending, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next && mutation.isPending) return;
      onOpenChange(next);
    },
    [mutation.isPending, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <RunSkugrSlicesTodayDialogView
        skugrTitle={skugrTitle}
        isRunning={mutation.isPending}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
