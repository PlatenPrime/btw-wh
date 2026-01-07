import React from 'react';
import type { VariantProps } from '@/lib/tv';
import { Text as RNText } from 'react-native';
import type { TextProps as RNTextProps } from 'react-native';
import { tva, isWeb } from '@/lib/tv';
import { useTheme } from '@/providers/theme-provider';

const baseStyle = isWeb
  ? 'font-sans tracking-sm my-0 bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word'
  : '';

const textStyle = tva({
  base: `text-typography-700 font-body ${baseStyle}`,
  variants: {
    isTruncated: {
      true: 'web:truncate',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    sub: {
      true: 'text-xs',
    },
    italic: {
      true: 'italic',
    },
    highlight: {
      true: 'bg-yellow-500',
    },
  },
});

// Map type to Tailwind classes with gluestack theme tokens
const typeClasses = {
  default: 'text-base leading-6 text-typography-900',
  defaultSemiBold: 'text-base leading-6 font-semibold text-typography-900',
  title: 'text-3xl font-bold leading-8 text-typography-950',
  subtitle: 'text-xl font-bold text-typography-900',
  link: 'text-base leading-8 text-info-600',
};

export type ThemedTextProps = RNTextProps & VariantProps<typeof textStyle> & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string;
};

const ThemedText = React.forwardRef<React.ComponentRef<typeof RNText>, ThemedTextProps>(
  function ThemedText(
    {
      className,
      style,
      lightColor,
      darkColor,
      type,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = 'md',
      sub,
      italic,
      highlight,
      ...props
    },
    ref
  ) {
    const { resolvedTheme } = useTheme();
    
    // Use custom colors if provided, otherwise use theme tokens
    const customStyle = (lightColor || darkColor) 
      ? { color: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
      : undefined;

    // Apply type classes if type is specified, otherwise use variant props
    let finalClassName = className;
    if (type) {
      const typeClassName = typeClasses[type] || typeClasses.default;
      finalClassName = className 
        ? `${typeClassName} ${className}` 
        : typeClassName;
    } else {
      finalClassName = textStyle({
        isTruncated: isTruncated as boolean,
        bold: bold as boolean,
        underline: underline as boolean,
        strikeThrough: strikeThrough as boolean,
        size,
        sub: sub as boolean,
        italic: italic as boolean,
        highlight: highlight as boolean,
        class: className,
      });
    }

    return (
      <RNText
        className={finalClassName}
        style={customStyle ? [customStyle, style] : style}
        {...props}
        ref={ref}
      />
    );
  }
);

ThemedText.displayName = 'ThemedText';

export { ThemedText, textStyle };

