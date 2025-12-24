import { useTheme } from "@/providers/theme-provider";
import { Colors, SemanticColors } from "@/constants/theme";

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
    bgColor: theme === "light" ? SemanticColors.dialog.bg.light : SemanticColors.dialog.bg.dark,
    textColor: theme === "light" ? Colors.light.text : Colors.dark.text,
    borderColor: theme === "light" ? SemanticColors.dialog.border.light : SemanticColors.dialog.border.dark,
  };
}

