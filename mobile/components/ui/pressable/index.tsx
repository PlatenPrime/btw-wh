'use client';
import React from 'react';
import { Pressable as RNPressable, type PressableProps as RNPressableProps } from 'react-native';

import { tva, type VariantProps } from '@/lib/tv';

const pressableStyle = tva({
  base: 'data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40',
});

type IPressableProps = RNPressableProps &
  VariantProps<typeof pressableStyle> & { className?: string };

const Pressable = React.forwardRef<
  React.ComponentRef<typeof RNPressable>,
  IPressableProps
>(function Pressable({ className, ...props }, ref) {
  return (
    <RNPressable
      {...props}
      ref={ref}
      className={pressableStyle({
        class: className,
      })}
    />
  );
});

Pressable.displayName = 'Pressable';
export { Pressable };
