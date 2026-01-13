import { type ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native';

import { useTheme } from '@/providers/theme-provider';
import { tva, type VariantProps } from '@/lib/tv';
import { cn } from '@/lib/utils';

const scrollViewStyle = tva({
  base: '',
});

const scrollViewContentStyle = tva({
  base: '',
});

export type ThemedScrollViewProps = ScrollViewProps & VariantProps<typeof scrollViewStyle> & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  contentContainerClassName?: string;
};

export { scrollViewStyle, scrollViewContentStyle };

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
      className={cn(scrollViewStyle(), className)}
      style={customStyle ? [customStyle, style] : style}
      contentContainerClassName={cn(scrollViewContentStyle(), contentContainerClassName)}
      contentContainerStyle={contentContainerStyle}
      {...otherProps} 
    />
  );
}

