import { CalculationConfirmationDialog } from "@/modules/defs/components/dialogs/calculation-confirmation-dialog/CalculationConfirmationDialog";

interface DefsHeaderActionsViewProps {
  isDialogOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  isDisabled: boolean;
}

export function DefsHeaderActionsView({
  isDialogOpen,
  onClose,
  onConfirm,
  isPending,
  isDisabled,
}: DefsHeaderActionsViewProps) {
  return (
    <CalculationConfirmationDialog
      isOpen={isDialogOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isPending={isPending}
      isDisabled={isDisabled}
    />
  );
}

