// Fallback for using MaterialIcons on Android and web.

import { useTheme } from "@/providers/theme-provider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as IconMapping;

export type ThemedIconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color?: string;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function ThemedIconSymbol({
  name,
  size = 24,
  color,
  lightColor,
  darkColor,
  style,
  weight,
}: ThemedIconSymbolProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Используем кастомные цвета только если они предоставлены
  const iconColor =
    lightColor || darkColor
      ? isDark
        ? darkColor || lightColor
        : lightColor || darkColor
      : color;

  return (
    <MaterialIcons
      color={iconColor}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
