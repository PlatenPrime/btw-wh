import { type ViewProps } from 'react-native';

import { Box } from '@/components/ui/box';
import { useTheme } from '@/providers/theme-provider';

export type ThemedBoxProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedBox({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedBoxProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use theme tokens via className
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <Box 
      className={className}
      style={customStyle ? [customStyle, style] : style} 
      {...otherProps} 
    />
  );
}

