import { useColorScheme } from "@/hooks/use-color-scheme";
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
  const colorScheme = useColorScheme() ?? "light";
  
  return {
    bgColor: colorScheme === "light" ? SemanticColors.dialog.bg.light : SemanticColors.dialog.bg.dark,
    textColor: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
    borderColor: colorScheme === "light" ? SemanticColors.dialog.border.light : SemanticColors.dialog.border.dark,
  };
}

