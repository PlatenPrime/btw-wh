/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "@/hooks/use-color-scheme";

// Цвета для обратной совместимости (соответствуют устаревшему Colors)
// Используйте Tailwind классы напрямую вместо этого хука
const themeColors = {
  light: {
    text: "#11181C", // Tailwind: text-typography-900
    background: "#ffffff", // Tailwind: bg-background-0
    tint: "#3477eb",
    icon: "#687076", // Tailwind: text-typography-500
    tabIconDefault: "#687076", // Tailwind: text-typography-500
    tabIconSelected: "#3477eb", // Tailwind: text-primary-600
  },
  dark: {
    text: "#E5E5E5", // Tailwind: text-typography-700
    background: "#121212", // Tailwind: bg-background-0
    tint: "#fff",
    icon: "#A3A3A3", // Tailwind: text-typography-500
    tabIconDefault: "#A3A3A3", // Tailwind: text-typography-500
    tabIconSelected: "#fff", // Tailwind: text-primary-500
  },
} as const;

export type ThemeColorName = keyof typeof themeColors.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return themeColors[theme][colorName];
  }
}
