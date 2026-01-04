import { type TextProps } from 'react-native';

import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/theme-provider';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

// Map type to Tailwind classes with gluestack theme tokens
const typeClasses = {
  default: 'text-base leading-6 text-typography-900',
  defaultSemiBold: 'text-base leading-6 font-semibold text-typography-900',
  title: 'text-3xl font-bold leading-8 text-typography-950',
  subtitle: 'text-xl font-bold text-typography-900',
  link: 'text-base leading-8 text-info-600',
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use theme tokens
  const customStyle = (lightColor || darkColor) 
    ? { color: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  const typeClassName = typeClasses[type] || typeClasses.default;
  const combinedClassName = className 
    ? `${typeClassName} ${className}` 
    : typeClassName;

  return (
    <Text
      className={combinedClassName}
      style={customStyle ? [customStyle, style] : style}
      {...rest}
    />
  );
}

