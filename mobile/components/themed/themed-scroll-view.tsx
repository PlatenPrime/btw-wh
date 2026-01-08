import { type ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native';

import { useTheme } from '@/providers/theme-provider';

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  contentContainerClassName?: string;
};

export function ThemedScrollView({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  contentContainerStyle,
  contentContainerClassName,
  ...otherProps 
}: ThemedScrollViewProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Используем кастомные цвета только если они предоставлены
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: isDark ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <ScrollView 
      className={className}
      style={customStyle ? [customStyle, style] : style}
      contentContainerClassName={contentContainerClassName}
      contentContainerStyle={contentContainerStyle}
      {...otherProps} 
    />
  );
}

