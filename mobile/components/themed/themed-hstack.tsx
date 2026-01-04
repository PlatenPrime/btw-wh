import { type ViewProps } from 'react-native';

import { HStack } from '@/components/ui/hstack';
import { useTheme } from '@/providers/theme-provider';

export type ThemedHStackProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedHStack({ 
  style, 
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedHStackProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use theme tokens via className
  const customStyle = (lightColor || darkColor) 
    ? { backgroundColor: resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor) }
    : undefined;

  return (
    <HStack 
      className={className}
      style={customStyle ? [customStyle, style] : style} 
      {...otherProps} 
    />
  );
}

