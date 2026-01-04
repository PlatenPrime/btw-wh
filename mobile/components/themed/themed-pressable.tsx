import { type PressableProps } from 'react-native';

import { Pressable } from '@/components/ui/pressable';
import { useTheme } from '@/providers/theme-provider';

export type ThemedPressableProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedPressable({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedPressableProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use theme tokens via className
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <Pressable 
      className={className}
      style={customStyle ? [customStyle, style] : style} 
      {...otherProps} 
    />
  );
}

