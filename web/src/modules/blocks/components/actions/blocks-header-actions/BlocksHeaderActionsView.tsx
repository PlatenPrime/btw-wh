import { RecalculateSectorsConfirmDialog } from "@/modules/blocks/components/dialogs/recalculate-sectors-confirm-dialog/RecalculateSectorsConfirmDialog";

interface BlocksHeaderActionsViewProps {
  recalculateDialogOpen: boolean;
  onRecalculateDialogOpenChange: (open: boolean) => void;
  onRecalculateConfirm: () => void;
  onRecalculateCancel: () => void;
  isRecalculatePending: boolean;
}

export function BlocksHeaderActionsView({
  recalculateDialogOpen,
  onRecalculateDialogOpenChange,
  onRecalculateConfirm,
  onRecalculateCancel,
  isRecalculatePending,
}: BlocksHeaderActionsViewProps) {
  return (
    <RecalculateSectorsConfirmDialog
      open={recalculateDialogOpen}
      onOpenChange={onRecalculateDialogOpenChange}
      onConfirm={onRecalculateConfirm}
      onCancel={onRecalculateCancel}
      isPending={isRecalculatePending}
    />
  );
}
