import { useThemeColors } from "@/hooks/use-theme-colors";
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
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

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
