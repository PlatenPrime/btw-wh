import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import type { VariantProps } from '@/lib/tv';
import { isWeb, tva } from "@/lib/tv";

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
    const baseClasses = cardStyle({ variant });
    const finalClassName = className 
      ? `${baseClasses} ${className}` 
      : baseClasses;
    
    return (
      <View
        ref={ref}
        {...props}
        style={style}
        className={finalClassName}
      />
    );
  }
);

ThemedCard.displayName = 'ThemedCard';

export { ThemedCard, cardStyle };
