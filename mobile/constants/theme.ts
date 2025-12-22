/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#3477eb";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#D1D5DB", // Светло-серый цвет для хорошей видимости в темной теме
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

// Семантические цвета для UI компонентов
export const SemanticColors = {
  // Положительные действия (создание, редактирование, подтверждение)
  primary: "#3b82f6", // blue-500
  // Деструктивные действия (удаление, очистка)
  destructive: "#ef4444", // red-500 / error-500
  // Disabled состояние
  disabled: "#9ca3af", // gray-400
  // Placeholder текст
  placeholder: {
    light: "#9ca3af", // gray-400
    dark: "#6b7280", // gray-500
  },
  // Белый цвет (для текста на цветном фоне, иконок)
  white: "#ffffff",
  // Черный цвет (для теней)
  black: "#000000",
  // Цвета для диалогов и модальных окон
  dialog: {
    bg: {
      light: "#fff",
      dark: "#1f2937", // gray-800
    },
    border: {
      light: "#d1d5db", // gray-300
      dark: "#4b5563", // gray-600
    },
  },
  // Цвета для ошибок
  error: {
    border: "#ef4444", // red-500
    text: "#ef4444", // red-500
    bg: {
      light: "#fee2e2", // red-100
      dark: "#7f1d1d", // red-900
    },
  },
  // Цвета для иконок (специфичные цвета)
  icon: {
    warehouse: "#0ea5e9", // sky-500
    money: "#10b981", // emerald-500
    orange: "#f97316", // orange-500
  },
  // Цвета для Switch компонента
  switch: {
    track: {
      false: {
        light: "#d1d5db", // gray-300
        dark: "#374151", // gray-700
      },
      true: {
        light: "#3b82f6", // blue-500
        dark: "#6366f1", // indigo-500
      },
    },
    thumb: "#ffffff", // white
  },
  // Цвета для карточек
  card: {
    bg: {
      light: "#fff",
      dark: "#1f2937", // gray-800
    },
    border: {
      light: "#d1d5db", // gray-300
      dark: "#4b5563", // gray-600
    },
  },
  // Цвета для sidebar
  sidebar: {
    border: {
      light: "#e5e7eb", // gray-200
      dark: "#374151", // gray-700
    },
  },
  // Цвета для теней и backdrop
  shadow: {
    color: "#000000", // black
    backdrop: "rgba(0, 0, 0, 0.5)", // полупрозрачный черный для backdrop
    backdropDark: "rgba(0, 0, 0, 0.8)", // более темный backdrop
  },
  // Цвета для иконок в header actions menu
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
