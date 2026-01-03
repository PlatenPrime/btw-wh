import { CalculationConfirmationDialogView } from "./CalculationConfirmationDialogView";

interface CalculationConfirmationDialogProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function CalculationConfirmationDialog({
  visible,
  onClose,
  onConfirm,
  isPending,
}: CalculationConfirmationDialogProps) {
  return (
    <CalculationConfirmationDialogView
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
      isPending={isPending}
    />
  );
}
