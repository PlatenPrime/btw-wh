import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/providers/theme-provider';
import type { IconProps as UIIconProps } from '@/components/types/icon';

export type ThemedIconProps = UIIconProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({ 
  color,
  lightColor, 
  darkColor, 
  ...props 
}: ThemedIconProps) {
  const { resolvedTheme } = useTheme();
  
  // Use custom colors if provided, otherwise use the color prop
  const iconColor = (lightColor || darkColor) 
    ? (resolvedTheme === 'dark' ? (darkColor || lightColor) : (lightColor || darkColor))
    : color;

  return (
    <Icon
      color={iconColor}
      {...props}
    />
  );
}

