import { RunCompensatingSliceDialog } from "@/modules/sku-analytics/components/dialogs/run-compensating-slice-dialog";

interface SkuSlicesHeaderActionsViewProps {
  compensatingDialogOpen: boolean;
  onCompensatingDialogOpenChange: (open: boolean) => void;
  canRun: boolean;
}

export function SkuSlicesHeaderActionsView({
  compensatingDialogOpen,
  onCompensatingDialogOpenChange,
  canRun,
}: SkuSlicesHeaderActionsViewProps) {
  if (!canRun) {
    return null;
  }

  return (
    <RunCompensatingSliceDialog
      open={compensatingDialogOpen}
      onOpenChange={onCompensatingDialogOpenChange}
    />
  );
}
