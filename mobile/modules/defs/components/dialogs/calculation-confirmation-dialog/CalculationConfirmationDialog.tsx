import { useDialogThemeColors } from "@/hooks/use-dialog-theme-colors";
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
  const { bgColor, textColor, borderColor } = useDialogThemeColors();

  return (
    <CalculationConfirmationDialogView
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
      isPending={isPending}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}
