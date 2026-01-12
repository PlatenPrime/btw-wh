import { isWeb, tva } from "@/lib/tv";
import { cn } from "@/lib/utils";
import React from "react";
import { View, ViewProps } from "react-native";

import type { VariantProps } from "@/lib/tv";

type IBoxProps = ViewProps &
  VariantProps<typeof themedBoxStyle> & { className?: string };

const ThemedBox = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(
  function Box({ className, ...props }, ref) {
    return (
      <View
        ref={ref}
        {...props}
        className={cn(themedBoxStyle(), className)}
      />
    );
  }
);

ThemedBox.displayName = "ThemedBox";
export { ThemedBox };

const baseStyle = isWeb
  ? "flex flex-col relative z-0 box-border list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none"
  : "";

export const themedBoxStyle = tva({
  base: baseStyle,
});
