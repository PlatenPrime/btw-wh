import { RunCompensatingSliceDialog } from "@/modules/sku-analytics/components/dialogs/run-compensating-slice-dialog";
import { RunPostCorrectionsDialog } from "@/modules/sku-analytics/components/dialogs/run-post-corrections-dialog";

interface SkuSlicesHeaderActionsViewProps {
  compensatingDialogOpen: boolean;
  onCompensatingDialogOpenChange: (open: boolean) => void;
  postCorrectionsDialogOpen: boolean;
  onPostCorrectionsDialogOpenChange: (open: boolean) => void;
  canRun: boolean;
}

export function SkuSlicesHeaderActionsView({
  compensatingDialogOpen,
  onCompensatingDialogOpenChange,
  postCorrectionsDialogOpen,
  onPostCorrectionsDialogOpenChange,
  canRun,
}: SkuSlicesHeaderActionsViewProps) {
  if (!canRun) {
    return null;
  }

  return (
    <>
      <RunCompensatingSliceDialog
        open={compensatingDialogOpen}
        onOpenChange={onCompensatingDialogOpenChange}
      />
      <RunPostCorrectionsDialog
        open={postCorrectionsDialogOpen}
        onOpenChange={onPostCorrectionsDialogOpenChange}
      />
    </>
  );
}
