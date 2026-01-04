import { type ViewProps } from 'react-native';

import { VStack } from '@/components/ui/vstack';
import { useTheme } from '@/providers/theme-provider';

export type ThemedVStackProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedVStack({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedVStackProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use theme tokens via className
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <VStack 
      className={className}
      style={customStyle ? [customStyle, style] : style} 
      {...otherProps} 
    />
  );
}

