import React from 'react';
import type { VariantProps } from '@/lib/tv';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';
import { isWeb, tva } from '@/lib/tv';
import { useTheme } from '@/providers/theme-provider';

const baseStyle = isWeb
  ? 'flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none'
  : '';

const vstackStyle = tva({
  base: `flex-col ${baseStyle}`,
  variants: {
    space: {
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-3',
      'lg': 'gap-4',
      'xl': 'gap-5',
      '2xl': 'gap-6',
      '3xl': 'gap-7',
      '4xl': 'gap-8',
    },
    reversed: {
      true: 'flex-col-reverse',
    },
  },
});

export type ThemedVStackProps = ViewProps & VariantProps<typeof vstackStyle> & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

const ThemedVStack = React.forwardRef<React.ComponentRef<typeof View>, ThemedVStackProps>(
  function ThemedVStack({ 
    className, 
    style,
    lightColor, 
    darkColor,
    space,
    reversed,
    ...props 
  }, ref) {
    const { resolvedTheme } = useTheme();
    
    // Use custom colors if provided, otherwise use theme tokens via className
    const customStyle = (lightColor || darkColor) 
      ? { backgroundColor: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
      : undefined;

    return (
      <View
        className={vstackStyle({
          space,
          reversed: reversed as boolean,
          class: className,
        })}
        style={customStyle ? [customStyle, style] : style}
        {...props}
        ref={ref}
      />
    );
  }
);

ThemedVStack.displayName = 'ThemedVStack';

export { ThemedVStack, vstackStyle };

