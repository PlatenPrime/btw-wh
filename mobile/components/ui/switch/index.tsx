'use client';
import React from 'react';
import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from 'react-native';
import { useTheme } from '@/providers/theme-provider';
import { SemanticColors } from '@/constants/theme';

export interface SwitchProps extends Omit<RNSwitchProps, 'trackColor' | 'thumbColor'> {
  className?: string;
}

export const Switch = React.forwardRef<React.ComponentRef<typeof RNSwitch>, SwitchProps>(
  function Switch({ className, ...props }, ref) {
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

Switch.displayName = 'Switch';

