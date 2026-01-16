import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
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
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const bgColor = SemanticColors.dialog.bg[theme];
  const textColor = theme === "dark" ? "#E5E5E5" : "#11181C";
  const borderColor = SemanticColors.dialog.border[theme];

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
