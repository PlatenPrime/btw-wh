import { Colors } from "@/constants/theme";
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
  const isDark = resolvedTheme === "dark";

  const contextValue: InputContextType = { variant, size };

  // Используем кастомные цвета только если они предоставлены
  // Иначе используем Tailwind классы через className
  const customBgColor =
    lightColor || darkColor
      ? isDark
        ? darkColor || lightColor
        : lightColor || darkColor
      : undefined;

  const variantStyles = getVariantStyles(variant);
  const sizeStyle = sizeStyles[size];

  // Базовые классы для инпута (используем outline-200 для лучшего контраста)
  const baseClassName = className || "bg-background-50 border-outline-200";

  return (
    <InputContext.Provider value={contextValue}>
      <View
        className={customBgColor ? undefined : baseClassName}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            ...(customBgColor && { backgroundColor: customBgColor }),
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
  const context = useInputContext();
  const variant = context?.variant || "outline";
  const size = context?.size || "md";

  // Определяем цвет текста - используем Colors как fallback для обратной совместимости
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

  // Определяем цвет placeholder - используем стандартный цвет для placeholder
  const finalPlaceholderColor =
    placeholderTextColor || (resolvedTheme === "dark" ? "#6b7280" : "#9ca3af");

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
