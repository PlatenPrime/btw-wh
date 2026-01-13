import { type ViewProps } from "react-native";

import { ThemedBox } from "./themed-box";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className,
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
      className={customStyle ? undefined : cn("bg-background-0", className)}
      style={customStyle ? [customStyle, style] : style}
      {...otherProps}
    />
  );
}
