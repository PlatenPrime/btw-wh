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
    background: "#ffffff", // rgb(255, 255, 255) - соответствует background-0
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076", // rgb(104, 112, 118) - соответствует typography-500
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#E5E5E5", // rgb(229, 229, 229) - соответствует typography-700
    background: "#121212", // rgb(18, 18, 18) - соответствует background-0
    tint: tintColorDark,
    icon: "#A3A3A3", // rgb(163, 163, 163) - соответствует typography-500 в темной теме
    tabIconDefault: "#A3A3A3", // rgb(163, 163, 163) - соответствует typography-500 в темной теме
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
      light: "#ffffff", // rgb(255, 255, 255) - соответствует background-0
      dark: "#121212", // rgb(18, 18, 18) - соответствует background-0
    },
    border: {
      light: "#DDDCDB", // rgb(221, 220, 219) - соответствует outline-200
      dark: "#737474", // rgb(115, 116, 116) - соответствует outline-200
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
      light: "#ffffff", // rgb(255, 255, 255) - соответствует background-0
      dark: "#121212", // rgb(18, 18, 18) - соответствует background-0
    },
    border: {
      light: "#DDDCDB", // rgb(221, 220, 219) - соответствует outline-200
      dark: "#737474", // rgb(115, 116, 116) - соответствует outline-200
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
