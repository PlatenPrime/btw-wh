import type { ViewStyle } from "react-native";

import { Card, type CardProps } from "@/components/ui/card";
import { useTheme } from "@/providers/theme-provider";

export type ThemedCardProps = CardProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedCard({
  className,
  lightColor,
  darkColor,
  style,
  ...props
}: ThemedCardProps) {
  const { resolvedTheme } = useTheme();

  // Use custom colors if provided
  const customStyle =
    lightColor || darkColor
      ? {
          backgroundColor:
            resolvedTheme === "dark"
              ? darkColor || lightColor
              : lightColor || darkColor,
        }
      : undefined;

  // Combine styles: Card accepts ViewStyle (object), not array
  const combinedStyle: ViewStyle | undefined =
    customStyle && style ? { ...style, ...customStyle } : customStyle || style;

  return <Card className={className} style={combinedStyle} {...props} />;
}
