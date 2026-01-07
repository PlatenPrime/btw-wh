import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
import { getTokenRgbFromPath, rgbToHex, rgbToRgba } from "@/utils/color-tokens";

/**
 * Централизованный хук для получения цветов темы
 * Возвращает объект с цветами для текущей темы (light/dark)
 *
 * Цвета получаются из Tailwind токенов через config.ts, обеспечивая
 * единую систему управления цветами.
 *
 * @example
 * const { card, dialog, text } = useThemeColors();
 * <Box style={{ backgroundColor: card.bg, borderColor: card.border }} />
 */
export function useThemeColors() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  // Получаем RGB значения из токенов и преобразуем в hex
  const getColorFromToken = (tokenPath: string, fallback?: string): string => {
    const rgb = getTokenRgbFromPath(tokenPath, theme);
    if (rgb) {
      return rgbToHex(rgb);
    }
    // Fallback на переданное значение или старые значения для обратной совместимости
    if (fallback) {
      return fallback;
    }
    return SemanticColors.card.bg[theme];
  };

  return {
    theme,
    // Цвета для карточек (из токенов: background-0, outline-100)
    card: {
      bg: getColorFromToken("card.bg", SemanticColors.card.bg[theme]),
      border: getColorFromToken(
        "card.border",
        SemanticColors.card.border[theme]
      ),
    },
    // Цвета для диалогов и модальных окон (из токенов: background-0, outline-200)
    dialog: {
      bg: getColorFromToken("dialog.bg", SemanticColors.dialog.bg[theme]),
      border: getColorFromToken(
        "dialog.border",
        SemanticColors.dialog.border[theme]
      ),
    },
    // Цвета для ошибок (из токенов: error-500, error-100/error-900)
    error: {
      border: getColorFromToken("error.border"),
      text: getColorFromToken("error.text"),
      bg: getColorFromToken("error.bg"),
    },
    // Цвета для успеха (из токенов: success-500, success-100/success-900)
    success: {
      border: getColorFromToken("success.border"),
      text: getColorFromToken("success.text"),
      bg: getColorFromToken("success.bg"),
    },
    // Цвета для предупреждений (из токенов: warning-500, warning-100/warning-900)
    warning: {
      border: getColorFromToken("warning.border"),
      text: getColorFromToken("warning.text"),
      bg: getColorFromToken("warning.bg"),
    },
    // Цвета для информации (из токенов: info-500, info-100/info-900)
    info: {
      border: getColorFromToken("info.border"),
      text: getColorFromToken("info.text"),
      bg: getColorFromToken("info.bg"),
    },
    // Цвета для sidebar (из токенов: outline-200/outline-300)
    sidebar: {
      border: getColorFromToken("sidebar.border"),
    },
    // Цвета для текста (из токенов: typography-900/typography-700, typography-500)
    text: {
      primary: getColorFromToken("text.primary"),
      secondary: getColorFromToken("text.secondary"),
      icon: getColorFromToken("text.icon"),
      tabIconDefault: getColorFromToken("text.tabIconDefault"),
      tabIconSelected: getColorFromToken("text.tabIconSelected"),
    },
    // Цвета для фона (из токенов: background-0, background-50)
    background: {
      primary: getColorFromToken("background.primary"),
      secondary: getColorFromToken("background.secondary"),
      muted: getColorFromToken("background.muted"),
    },
    // Placeholder цвет (из токенов: typography-400/typography-500)
    placeholder: getColorFromToken("placeholder"),
    // Цвета для Switch компонента (из токенов: typography-300/typography-700, primary-500)
    switch: {
      track: {
        false: getColorFromToken("switch.track.false"),
        true: getColorFromToken("switch.track.true"),
      },
      thumb: getColorFromToken("switch.thumb"),
    },
    // Статические цвета (не зависят от темы или из SemanticColors)
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
  return rgbToRgba(`${r} ${g} ${b}`, opacity);
}
