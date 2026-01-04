import type { ButtonProps } from "@/components/types";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";
import type {
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from "react-native";

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  className,
  lightColor,
  darkColor,
  style,
  ...props
}: ThemedButtonProps) {
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

  // Handle style prop which can be a function or StyleProp
  const combinedStyle:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) =
    customStyle
      ? typeof style === "function"
        ? (state) => [customStyle, style(state)]
        : [customStyle, style]
      : style;

  return <Button className={className} style={combinedStyle} {...props} />;
}
