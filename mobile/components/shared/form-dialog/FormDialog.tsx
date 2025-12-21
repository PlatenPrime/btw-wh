import { useDialogThemeColors } from "@/hooks/use-dialog-theme-colors";
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
  const { bgColor, textColor, borderColor } = useDialogThemeColors();

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

