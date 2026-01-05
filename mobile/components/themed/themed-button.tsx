import { tva } from "@/lib/tv";
import { useTheme } from "@/providers/theme-provider";
import React from "react";
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from "react-native";

const buttonVariants = tva({
  base: "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 web:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring/50",
  variants: {
    variant: {
      default:
        "bg-primary-500 text-typography-0 data-[hover=true]:bg-primary-600 data-[active=true]:bg-primary-700",
      destructive:
        "bg-error-500 text-typography-0 data-[hover=true]:bg-error-600 data-[active=true]:bg-error-700",
      outline:
        "border border-outline-100 bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-background-100",
      secondary:
        "bg-secondary-500 text-typography-0 data-[hover=true]:bg-secondary-600 data-[active=true]:bg-secondary-700",
      ghost: "bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-background-100",
      link: "text-primary-500 underline-offset-4 data-[hover=true]:underline",
      create:
        "bg-success-500 text-typography-0 data-[hover=true]:bg-success-600 data-[active=true]:bg-success-700",
      delete:
        "bg-error-500 text-typography-0 data-[hover=true]:bg-error-600 data-[active=true]:bg-error-700",
      confirm:
        "bg-info-500 text-typography-0 data-[hover=true]:bg-info-600 data-[active=true]:bg-info-700",
    },
    size: {
      default: "min-h-9 p-2",
      sm: "min-h-8 p-3 gap-1.5",
      lg: "min-h-10 p-4",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ThemedButtonProps extends PressableProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "create"
    | "delete"
    | "confirm";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  lightColor?: string;
  darkColor?: string;
}

export const ThemedButton = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  ThemedButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      lightColor,
      darkColor,
      style,
      children,
      ...props
    },
    ref
  ) => {
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

    return (
      <Pressable
        ref={ref}
        className={buttonVariants({ variant, size, class: className })}
        style={combinedStyle}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

ThemedButton.displayName = "ThemedButton";
