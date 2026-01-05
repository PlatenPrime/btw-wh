import { type ViewProps } from "react-native";

import { ThemedBox } from "./themed-box";

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
  // Use custom colors if provided, otherwise use theme tokens via className
  const customStyle =
    lightColor || darkColor
      ? { backgroundColor: lightColor || darkColor }
      : undefined;

  return (
    <ThemedBox
      className={customStyle ? undefined : className}
      style={customStyle ? [customStyle, style] : style}
      {...otherProps}
    />
  );
}
