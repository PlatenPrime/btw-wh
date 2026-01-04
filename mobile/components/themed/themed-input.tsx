import { Colors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useTheme } from "@/providers/theme-provider";
import React, { createContext, useContext } from "react";
import {
  Pressable,
  TextInput,
  View,
  type PressableProps,
  type TextInputProps,
  type ViewProps,
} from "react-native";
import { ThemedIcon, type ThemedIconProps } from "./themed-icon";

type InputVariant = "underlined" | "outline" | "rounded";
type InputSize = "xl" | "lg" | "md" | "sm";

type InputContextType = {
  variant?: InputVariant;
  size?: InputSize;
};

const InputContext = createContext<InputContextType>({});

const useInputContext = () => useContext(InputContext);

// Размеры для вариантов
const sizeStyles = {
  sm: { height: 36, fontSize: 14, paddingHorizontal: 12 },
  md: { height: 40, fontSize: 16, paddingHorizontal: 12 },
  lg: { height: 44, fontSize: 16, paddingHorizontal: 14 },
  xl: { height: 48, fontSize: 18, paddingHorizontal: 16 },
};

// Стили для вариантов границ
const getVariantStyles = (variant: InputVariant = "outline") => {
  switch (variant) {
    case "underlined":
      return {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
      };
    case "rounded":
      return {
        borderWidth: 1,
        borderRadius: 9999,
      };
    case "outline":
    default:
      return {
        borderWidth: 1,
        borderRadius: 8,
      };
  }
};

export type ThemedInputProps = ViewProps & {
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({
  className,
  variant = "outline",
  size = "md",
  lightColor,
  darkColor,
  style,
  children,
  ...props
}: ThemedInputProps) {
  const { resolvedTheme } = useTheme();
  const { dialog, background } = useThemeColors();

  const contextValue: InputContextType = { variant, size };

  // Определяем цвет фона - используем background.secondary для инпутов (как в LoginForm)
  const bgColor =
    lightColor || darkColor
      ? resolvedTheme === "dark"
        ? darkColor || lightColor
        : lightColor || darkColor
      : background.secondary || dialog.bg;

  const variantStyles = getVariantStyles(variant);
  const sizeStyle = sizeStyles[size];

  return (
    <InputContext.Provider value={contextValue}>
      <View
        className={className}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: bgColor,
            borderColor: dialog.border,
            ...variantStyles,
            minHeight: sizeStyle.height,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </InputContext.Provider>
  );
}

export type ThemedInputFieldProps = TextInputProps & {
  className?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

export const ThemedInputField = React.forwardRef<
  React.ComponentRef<typeof TextInput>,
  ThemedInputFieldProps
>(function ThemedInputField(
  {
    className,
    lightTextColor,
    darkTextColor,
    placeholderTextColor,
    style,
    ...props
  },
  ref
) {
  const { resolvedTheme } = useTheme();
  const { placeholder: placeholderColor } = useThemeColors();
  const context = useInputContext();
  const variant = context?.variant || "outline";
  const size = context?.size || "md";

  // Определяем цвет текста - используем только Colors для гарантии контраста
  // Не используем text.primary, так как он может возвращать неправильное значение
  let textColor: string = Colors[resolvedTheme].text;

  if (lightTextColor || darkTextColor) {
    textColor =
      resolvedTheme === "dark"
        ? darkTextColor || lightTextColor || Colors.dark.text
        : lightTextColor || darkTextColor || Colors.light.text;
  }

  // Финальная гарантия контрастного цвета
  if (!textColor || textColor.trim() === "") {
    textColor = resolvedTheme === "dark" ? "#E5E5E5" : "#11181C";
  }

  // Определяем цвет placeholder
  const finalPlaceholderColor =
    placeholderTextColor || placeholderColor || "#9ca3af";

  const sizeStyle = sizeStyles[size];
  const variantPadding = {
    underlined: 0,
    outline: 12,
    rounded: 16,
  }[variant];

  // Создаем финальный стиль - используем один объект для гарантии применения
  const finalStyle: any = {
    flex: 1,
    fontSize: sizeStyle.fontSize,
    paddingVertical: 0,
    paddingHorizontal: variantPadding,
    color: textColor, // Цвет применяем напрямую
  };

  // Если передан внешний style, объединяем его, но color оставляем нашим
  if (style) {
    if (Array.isArray(style)) {
      // Если массив, объединяем все объекты, но наш color последний
      const mergedStyle = Object.assign(
        {},
        ...style.filter((s) => s && typeof s === "object")
      );
      Object.assign(finalStyle, mergedStyle, { color: textColor });
    } else if (typeof style === "object") {
      // Если объект, объединяем, но color оставляем нашим
      Object.assign(finalStyle, style, { color: textColor });
    }
  }

  return (
    <TextInput
      ref={ref}
      placeholderTextColor={finalPlaceholderColor}
      style={finalStyle}
      {...props}
    />
  );
});

ThemedInputField.displayName = "ThemedInputField";

export type ThemedInputSlotProps = PressableProps & {
  className?: string;
};

export function ThemedInputSlot({
  className,
  style,
  children,
  ...props
}: ThemedInputSlotProps) {
  const baseStyle = {
    justifyContent: "center" as const,
    alignItems: "center" as const,
    paddingHorizontal: 8,
  };

  const combinedStyle =
    typeof style === "function"
      ? (state: any) => [baseStyle, style(state)]
      : [baseStyle, style];

  return (
    <Pressable className={className} style={combinedStyle} {...props}>
      {children}
    </Pressable>
  );
}

// Реэкспорт ThemedIcon для удобства
export type ThemedInputIconProps = ThemedIconProps;

export function ThemedInputIcon(props: ThemedInputIconProps) {
  return <ThemedIcon {...props} />;
}
