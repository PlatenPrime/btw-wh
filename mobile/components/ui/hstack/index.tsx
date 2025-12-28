import React from 'react';
import type { VariantProps } from '@/lib/tv';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';
import { hstackStyle } from './styles';

type IHStackProps = ViewProps & VariantProps<typeof hstackStyle>;

const HStack = React.forwardRef<React.ComponentRef<typeof View>, IHStackProps>(
  function HStack({ className, ...props }, ref) {
    return (
      <View
        className={hstackStyle({

          class: className,
        })}
        {...props}
        ref={ref}
      />
    );
  }
);

HStack.displayName = 'HStack';

export { HStack };
