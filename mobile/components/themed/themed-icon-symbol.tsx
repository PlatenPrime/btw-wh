// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';
import { useTheme } from '@/providers/theme-provider';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;

export type ThemedIconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color?: string;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function ThemedIconSymbol({
  name,
  size = 24,
  color,
  lightColor,
  darkColor,
  style,
  weight,
}: ThemedIconSymbolProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use the color prop
  const iconColor = (lightColor || darkColor) 
    ? (resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor))
    : color;

  return <MaterialIcons color={iconColor} size={size} name={MAPPING[name]} style={style} />;
}

