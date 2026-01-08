'use client';
import React from 'react';
import { Pressable as RNPressable, type PressableProps as RNPressableProps } from 'react-native';
import { tva, type VariantProps } from '@/lib/tv';
import { useTheme } from '@/providers/theme-provider';

const pressableStyle = tva({
  base: 'data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40',
});

export type ThemedPressableProps = RNPressableProps &
  VariantProps<typeof pressableStyle> & { 
    className?: string;
    lightColor?: string;
    darkColor?: string;
  };

const ThemedPressable = React.forwardRef<
  React.ComponentRef<typeof RNPressable>,
  ThemedPressableProps
>(function ThemedPressable({ className, style, lightColor, darkColor, ...props }, ref) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Используем кастомные цвета только если они предоставлены
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: isDark ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <RNPressable
      {...props}
      ref={ref}
      className={pressableStyle({
        class: className,
      })}
      style={customStyle ? [customStyle, style] : style}
    />
  );
});

ThemedPressable.displayName = 'ThemedPressable';
export { ThemedPressable, pressableStyle };

