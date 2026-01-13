import { type FlatListProps } from 'react-native';
import { FlatList } from 'react-native';

import { useTheme } from '@/providers/theme-provider';
import { tva, type VariantProps } from '@/lib/tv';
import { cn } from '@/lib/utils';

const flatListStyle = tva({
  base: '',
});

export type ThemedFlatListProps<ItemT> = FlatListProps<ItemT> & VariantProps<typeof flatListStyle> & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export { flatListStyle };

export function ThemedFlatList<ItemT = any>({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedFlatListProps<ItemT>) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Используем кастомные цвета только если они предоставлены
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: isDark ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <FlatList 
      className={cn(flatListStyle(), className)}
      style={customStyle ? [customStyle, style] : style} 
      {...otherProps} 
    />
  );
}

