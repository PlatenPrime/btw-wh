/**
 * Цветовая система приложения
 * 
 * ВАЖНО: Большинство цветов теперь определены через Tailwind токены в config.ts
 * и доступны через ThemeTokens (constants/theme-tokens.ts).
 * 
 * Этот файл содержит только:
 * 1. Устаревшие цвета Colors (используются для обратной совместимости)
 * 2. Статические цвета, не представленные в Tailwind токенах (iconColors)
 * 
 * Для новых компонентов используйте:
 * - Tailwind классы: className="bg-background-0 text-typography-900"
 * - Хук useThemeColors() для динамических цветов
 * - Утилиты из utils/color-tokens.ts для работы с opacity
 * 
 * @see constants/theme-tokens.ts - маппинг семантических цветов на Tailwind токены
 * @see hooks/use-theme-colors.ts - хук для получения цветов темы
 * @see utils/color-tokens.ts - утилиты для работы с токенами
 */

import { Platform } from "react-native";

const tintColorLight = "#3477eb";
const tintColorDark = "#fff";

/**
 * Устаревшие цвета (используются для обратной совместимости)
 * 
 * @deprecated Используйте Tailwind классы или useThemeColors()
 * - text -> text-typography-900 (light) / text-typography-700 (dark)
 * - background -> bg-background-0
 * - icon -> text-typography-500
 * - tabIconDefault -> text-typography-500
 * - tabIconSelected -> text-primary-600 (light) / text-primary-500 (dark)
 */
export const Colors = {
  light: {
    text: "#11181C", // Tailwind: text-typography-900
    background: "#ffffff", // Tailwind: bg-background-0
    tint: tintColorLight,
    icon: "#687076", // Tailwind: text-typography-500
    tabIconDefault: "#687076", // Tailwind: text-typography-500
    tabIconSelected: tintColorLight, // Tailwind: text-primary-600
  },
  dark: {
    text: "#E5E5E5", // Tailwind: text-typography-700
    background: "#121212", // Tailwind: bg-background-0
    tint: tintColorDark,
    icon: "#A3A3A3", // Tailwind: text-typography-500
    tabIconDefault: "#A3A3A3", // Tailwind: text-typography-500
    tabIconSelected: tintColorDark, // Tailwind: text-primary-500
  },
};

/**
 * Семантические цвета для UI компонентов
 * 
 * ВАЖНО: Большинство цветов теперь доступны через Tailwind токены.
 * Используйте ThemeTokens (constants/theme-tokens.ts) для получения соответствий.
 * 
 * Оставлены только цвета, которые:
 * 1. Не представлены в Tailwind токенах (iconColors - специфичные hex значения)
 * 2. Используются как статические hex значения в существующих компонентах
 * 
 * Для новых компонентов используйте:
 * - iconColors: используйте через SemanticColors.iconColors (статические цвета)
 * - Остальные цвета: используйте через useThemeColors() или Tailwind классы
 */
export const SemanticColors = {
  // Положительные действия (создание, редактирование, подтверждение)
  // Tailwind токен: primary-500
  primary: "#3b82f6",
  
  // Информационные действия (выбор, информация)
  // Tailwind токен: info-500
  info: "#0ea5e9",
  
  // Деструктивные действия (удаление, очистка)
  // Tailwind токен: error-500
  destructive: "#ef4444",
  
  // Disabled состояние
  // Tailwind токен: typography-400
  disabled: "#9ca3af",
  
  // Placeholder текст
  // Tailwind токен: typography-400 (light) / typography-500 (dark)
  placeholder: {
    light: "#9ca3af", // Tailwind: text-typography-400
    dark: "#6b7280", // Tailwind: text-typography-500
  },
  
  // Белый цвет (для текста на цветном фоне, иконок)
  // Tailwind токен: typography-0
  white: "#ffffff",
  
  // Черный цвет (для теней)
  // Tailwind токен: typography-950
  black: "#000000",
  
  // Цвета для диалогов и модальных окон
  // Tailwind токены: card.bg -> background-0, card.border -> outline-200
  dialog: {
    bg: {
      light: "#ffffff", // Tailwind: bg-background-0
      dark: "#121212", // Tailwind: bg-background-0
    },
    border: {
      light: "#DDDCDB", // Tailwind: border-outline-200
      dark: "#737474", // Tailwind: border-outline-200
    },
  },
  
  // Цвета для ошибок
  // Tailwind токены: error.border -> error-500, error.bg -> error-100 (light) / error-900 (dark)
  error: {
    border: "#ef4444", // Tailwind: border-error-500
    text: "#ef4444", // Tailwind: text-error-500
    bg: {
      light: "#fee2e2", // Tailwind: bg-error-100
      dark: "#7f1d1d", // Tailwind: bg-error-900
    },
  },
  
  // Цвета для иконок (специфичные цвета - не представлены в Tailwind токенах)
  // Используются как статические hex значения
  icon: {
    warehouse: "#0ea5e9", // Приблизительно: info-500
    money: "#10b981", // Приблизительно: success-500
    orange: "#f97316", // Приблизительно: warning-500
  },
  
  // Цвета для Switch компонента
  // Tailwind токены: switch.track.false -> typography-300 (light) / typography-700 (dark)
  //                   switch.track.true -> primary-500
  switch: {
    track: {
      false: {
        light: "#d1d5db", // Tailwind: bg-typography-300
        dark: "#374151", // Tailwind: bg-typography-700
      },
      true: {
        light: "#3b82f6", // Tailwind: bg-primary-500
        dark: "#6366f1", // Tailwind: bg-primary-500 (в dark теме может отличаться)
      },
    },
    thumb: "#ffffff", // Tailwind: bg-typography-0
  },
  
  // Цвета для карточек
  // Tailwind токены: card.bg -> background-0, card.border -> outline-100
  card: {
    bg: {
      light: "#ffffff", // Tailwind: bg-background-0
      dark: "#121212", // Tailwind: bg-background-0
    },
    border: {
      light: "#E6E6E6", // Tailwind: border-outline-100
      dark: "#414141", // Tailwind: border-outline-100
    },
  },
  
  // Цвета для sidebar
  // Tailwind токены: sidebar.border -> outline-200 (light) / outline-300 (dark)
  sidebar: {
    border: {
      light: "#e5e7eb", // Tailwind: border-outline-200
      dark: "#374151", // Tailwind: border-outline-300
    },
  },
  
  // Цвета для теней и backdrop
  shadow: {
    color: "#000000", // Tailwind: typography-950
    backdrop: "rgba(0, 0, 0, 0.5)",
    backdropDark: "rgba(0, 0, 0, 0.8)",
  },
  
  /**
   * Цвета для иконок в header actions menu
   * 
   * Эти цвета используются как статические hex значения и не представлены
   * напрямую в Tailwind токенах. Они используются для цветных иконок.
   * 
   * При необходимости работы с opacity используйте hexToRgba() из utils/color-utils.ts
   */
  iconColors: {
    red: "#ef4444",
    orange: "#f97316",
    amber: "#f59e0b",
    yellow: "#eab308",
    lime: "#84cc16",
    green: "#22c55e",
    emerald: "#10b981",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    sky: "#0ea5e9",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    purple: "#a855f7",
    fuchsia: "#d946ef",
    pink: "#ec4899",
    rose: "#f43f5e",
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
