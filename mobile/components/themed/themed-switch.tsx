'use client';
import React from 'react';
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from 'react-native';
import { useTheme } from '@/providers/theme-provider';
import { SemanticColors } from '@/constants/theme';

export interface ThemedSwitchProps extends Omit<RNSwitchProps, 'trackColor' | 'thumbColor'> {
  className?: string;
  lightColor?: string;
  darkColor?: string;
}

export const ThemedSwitch = React.forwardRef<React.ComponentRef<typeof RNSwitch>, ThemedSwitchProps>(
  function ThemedSwitch({ className, lightColor, darkColor, ...props }, ref) {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

    const trackColor = {
      false: SemanticColors.switch.track.false[theme],
      true: SemanticColors.switch.track.true[theme],
    };

    return (
      <RNSwitch
        ref={ref}
        {...props}
        trackColor={trackColor}
        thumbColor={SemanticColors.switch.thumb}
        ios_backgroundColor={trackColor.false}
      />
    );
  }
);

ThemedSwitch.displayName = 'ThemedSwitch';
