import { CalculationConfirmationDialogView } from "@/modules/defs/components/dialogs/calculation-confirmation-dialog/CalculationConfirmationDialogView";

interface CalculationConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  isDisabled?: boolean;
}

export function CalculationConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  isDisabled,
}: CalculationConfirmationDialogProps) {
  return (
    <CalculationConfirmationDialogView
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isPending={isPending}
      isDisabled={isDisabled}
    />
  );
}
