import { useThemeColors } from "@/hooks/use-theme-colors";
import { FormDialogView } from "./FormDialogView";

interface FormDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function FormDialog({
  visible,
  onClose,
  title,
  children,
  footer,
}: FormDialogProps) {
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  return (
    <FormDialogView
      visible={visible}
      onClose={onClose}
      title={title}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
      footer={footer}
    >
      {children}
    </FormDialogView>
  );
}

