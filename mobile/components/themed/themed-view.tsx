import { type ViewProps } from "react-native";

import { ThemedBox } from "./themed-box";
import { useTheme } from "@/providers/theme-provider";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className = "bg-background-0",
  ...otherProps
}: ThemedViewProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Используем кастомные цвета только если они предоставлены
  const customStyle =
    lightColor || darkColor
      ? { backgroundColor: isDark ? darkColor || lightColor : lightColor || darkColor }
      : undefined;

  return (
    <ThemedBox
      className={customStyle ? undefined : className}
      style={customStyle ? [customStyle, style] : style}
      {...otherProps}
    />
  );
}
