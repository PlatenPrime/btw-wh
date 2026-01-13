import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import type { VariantProps } from '@/lib/tv';
import { isWeb, tva } from "@/lib/tv";
import { cn } from "@/lib/utils";

const baseStyle = isWeb
  ? "flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 items-stretch m-0 p-0 text-decoration-none"
  : "flex flex-col";

const cardStyle = tva({
  base: `${baseStyle} bg-background-0`,
  variants: {
    variant: {
      default: "rounded-lg",
      outlined: "rounded-lg border border-outline-100",
      elevated: "rounded-lg shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});





export interface CardProps extends Omit<ViewProps, 'style'>, Omit<VariantProps<typeof cardStyle>, 'variant'> {
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  style?: ViewStyle;
}

const ThemedCard = React.forwardRef<React.ComponentRef<typeof View>, CardProps>(
  function Card({ className, variant = 'default', style, ...props }, ref) {
    return (
      <View
        ref={ref}
        {...props}
        style={style}
        className={cn(cardStyle({ variant }), className)}
      />
    );
  }
);

ThemedCard.displayName = 'ThemedCard';

export { ThemedCard, cardStyle };
