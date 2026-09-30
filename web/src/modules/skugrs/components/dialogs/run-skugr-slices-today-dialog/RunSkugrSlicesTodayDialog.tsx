import { Dialog } from "@/components/ui/dialog";
import { useStartApiTask } from "@/modules/apitasks";
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
  const { startTask, isStarting } = useStartApiTask();

  const handleConfirm = useCallback(async () => {
    if (isStarting) return;
    try {
      const task = await startTask({
        kind: "sku-slices.skugr-run-today",
        params: { skugrId },
        title: `Зрізи групи · ${skugrTitle}`,
      });
      if (task) onOpenChange(false);
    } catch {
      // toast у provider
    }
  }, [isStarting, onOpenChange, skugrId, skugrTitle, startTask]);

  const handleCancel = useCallback(() => {
    if (isStarting) return;
    onOpenChange(false);
  }, [isStarting, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next && isStarting) return;
      onOpenChange(next);
    },
    [isStarting, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <RunSkugrSlicesTodayDialogView
        skugrTitle={skugrTitle}
        isRunning={isStarting}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
