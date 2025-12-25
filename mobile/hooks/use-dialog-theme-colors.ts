import { useThemeColors } from "@/hooks/use-theme-colors";

export interface DialogThemeColors {
  bgColor: string;
  textColor: string;
  borderColor: string;
}

/**
 * Хук для получения цветов темы для диалогов
 * Возвращает bgColor, textColor и borderColor в зависимости от текущей темы
 * 
 * @deprecated Используйте напрямую useThemeColors() для получения цветов
 * Этот хук оставлен для обратной совместимости
 */
export function useDialogThemeColors(): DialogThemeColors {
  const { dialog, text } = useThemeColors();
  
  return {
    bgColor: dialog.bg,
    textColor: text.primary,
    borderColor: dialog.border,
  };
}

