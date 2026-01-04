import { type FlatListProps } from 'react-native';
import { FlatList } from 'react-native';

import { useTheme } from '@/providers/theme-provider';

export type ThemedFlatListProps<ItemT> = FlatListProps<ItemT> & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedFlatList<ItemT = any>({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedFlatListProps<ItemT>) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <FlatList 
      className={className}
      style={customStyle ? [customStyle, style] : style} 
      {...otherProps} 
    />
  );
}

