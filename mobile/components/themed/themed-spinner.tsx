import { type ActivityIndicatorProps } from 'react-native';

import { Spinner } from '@/components/ui/spinner';
import { useTheme } from '@/providers/theme-provider';

export type ThemedSpinnerProps = ActivityIndicatorProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  'aria-label'?: string;
};

export function ThemedSpinner({ 
  color,
  lightColor, 
  darkColor, 
  className,
  ...otherProps 
}: ThemedSpinnerProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use default color
  const spinnerColor = (lightColor || darkColor) 
    ? (resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor))
    : color;

  return (
    <Spinner 
      className={className}
      color={spinnerColor}
      {...otherProps} 
    />
  );
}

