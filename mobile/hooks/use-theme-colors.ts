import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";

/**
 * Упрощенный хук для получения цветов темы
 * 
 * ВАЖНО: Этот хук оставлен для обратной совместимости.
 * Для новых компонентов используйте Tailwind классы напрямую.
 * 
 * Цвета берутся из SemanticColors (статические значения).
 * 
 * @deprecated Используйте Tailwind классы напрямую: className="bg-background-0 border-outline-200"
 * 
 * @example
 * // Старый способ (не рекомендуется):
 * const { card } = useThemeColors();
 * <Box style={{ backgroundColor: card.bg }} />
 * 
 * // Новый способ (рекомендуется):
 * <Box className="bg-background-0" />
 */
export function useThemeColors() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return {
    theme,
    // Цвета для карточек
    card: {
      bg: SemanticColors.card.bg[theme],
      border: SemanticColors.card.border[theme],
    },
    // Цвета для диалогов и модальных окон
    dialog: {
      bg: SemanticColors.dialog.bg[theme],
      border: SemanticColors.dialog.border[theme],
    },
    // Цвета для ошибок
    error: {
      border: SemanticColors.error.border,
      text: SemanticColors.error.text,
      bg: SemanticColors.error.bg[theme],
    },
    // Цвета для успеха
    success: {
      border: "#10b981", // success-500
      text: "#10b981",
      bg: theme === "dark" ? "#064e3b" : "#d1fae5",
    },
    // Цвета для предупреждений
    warning: {
      border: "#f59e0b", // warning-500
      text: "#f59e0b",
      bg: theme === "dark" ? "#78350f" : "#fef3c7",
    },
    // Цвета для информации
    info: {
      border: SemanticColors.info,
      text: SemanticColors.info,
      bg: theme === "dark" ? "#1e3a8a" : "#dbeafe",
    },
    // Цвета для sidebar
    sidebar: {
      border: SemanticColors.sidebar.border[theme],
    },
    // Цвета для текста
    text: {
      primary: theme === "dark" ? "#E5E5E5" : "#11181C",
      secondary: theme === "dark" ? "#A3A3A3" : "#687076",
      icon: theme === "dark" ? "#A3A3A3" : "#687076",
      tabIconDefault: theme === "dark" ? "#A3A3A3" : "#687076",
      tabIconSelected: theme === "dark" ? "#fff" : SemanticColors.primary,
    },
    // Цвета для фона
    background: {
      primary: SemanticColors.card.bg[theme],
      secondary: theme === "dark" ? "#27272a" : "#fafafa",
      muted: theme === "dark" ? "#27272a" : "#f5f5f5",
    },
    // Placeholder цвет
    placeholder: SemanticColors.placeholder[theme],
    // Цвета для Switch компонента
    switch: {
      track: {
        false: SemanticColors.switch.track.false[theme],
        true: SemanticColors.switch.track.true[theme],
      },
      thumb: SemanticColors.switch.thumb,
    },
    // Статические цвета
    static: {
      primary: SemanticColors.primary,
      info: SemanticColors.info,
      destructive: SemanticColors.destructive,
      disabled: SemanticColors.disabled,
      white: SemanticColors.white,
      black: SemanticColors.black,
      shadow: SemanticColors.shadow,
      iconColors: SemanticColors.iconColors,
    },
  };
}

/**
 * Хелпер для получения цвета с opacity (не хук, просто функция)
 *
 * @param colorHex - Hex цвет
 * @param opacity - Прозрачность от 0 до 1
 * @returns RGBA строку
 */
export function getThemeColorWithOpacity(
  colorHex: string,
  opacity: number
): string {
  const rgb = colorHex.replace("#", "");
  const r = parseInt(rgb.substring(0, 2), 16);
  const g = parseInt(rgb.substring(2, 4), 16);
  const b = parseInt(rgb.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
