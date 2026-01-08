'use client';
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';
import React from 'react';
import { tva } from '@/lib/tv';
import { cssInterop } from 'nativewind';
import { useTheme } from '@/providers/theme-provider';

cssInterop(ActivityIndicator, {
  className: { target: 'style', nativeStyleToProp: { color: true } },
});

const spinnerStyle = tva({});

export type ThemedSpinnerProps = ActivityIndicatorProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  'aria-label'?: string;
};

const ThemedSpinner = React.forwardRef<
  React.ComponentRef<typeof ActivityIndicator>,
  ThemedSpinnerProps
>(function ThemedSpinner(
  {
    className,
    color,
    lightColor,
    darkColor,
    focusable = false,
    'aria-label': ariaLabel = 'loading',
    ...props
  },
  ref
) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Используем кастомные цвета только если они предоставлены
  const spinnerColor = (lightColor || darkColor) 
    ? (isDark ? (darkColor || lightColor) : (lightColor || darkColor))
    : color;

  return (
    <ActivityIndicator
      ref={ref}
      focusable={focusable}
      aria-label={ariaLabel}
      {...props}
      color={spinnerColor}
      className={spinnerStyle({ class: className })}
    />
  );
});

ThemedSpinner.displayName = 'ThemedSpinner';

export { ThemedSpinner, spinnerStyle };

