import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";

export interface DialogThemeColors {
  bgColor: string;
  textColor: string;
  borderColor: string;
}

/**
 * Хук для получения цветов темы для диалогов
 * Возвращает bgColor, textColor и borderColor в зависимости от текущей темы
 */
export function useDialogThemeColors(): DialogThemeColors {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return {
    bgColor: SemanticColors.dialog.bg[theme],
    textColor: theme === "dark" ? "#E5E5E5" : "#11181C",
    borderColor: SemanticColors.dialog.border[theme],
  };
}
