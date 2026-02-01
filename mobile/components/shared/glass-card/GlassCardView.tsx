import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import { BlurView } from "expo-blur";
import type { EntryOrExitLayoutType } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Platform, StyleSheet, View, type ViewProps } from "react-native";

const DEFAULT_INTENSITY = 50;

export interface GlassCardViewProps extends ViewProps {
  className?: string;
  intensity?: number;
  entering?: EntryOrExitLayoutType;
}

const baseCardClassName =
  "overflow-hidden rounded-2xl border border-outline-100/80 shadow-hard-2";

function GlassCardInner({
  children,
  className,
  intensity = DEFAULT_INTENSITY,
  style,
  ...rest
}: Omit<GlassCardViewProps, "entering">) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const tint = isDark ? "dark" : "light";
  const cardClassName = cn(baseCardClassName, className);

  if (Platform.OS === "web") {
    return (
      <View
        className={cardClassName}
        style={[
          {
            backgroundColor: isDark ? "rgba(18, 18, 18, 0.85)" : "rgba(255, 255, 255, 0.85)",
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    );
  }

  return (
    <View className={cardClassName} style={style} {...rest}>
      <BlurView
        intensity={intensity}
        tint={tint}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

export function GlassCardView({
  children,
  entering,
  ...rest
}: GlassCardViewProps) {
  const inner = <GlassCardInner {...rest}>{children}</GlassCardInner>;

  if (entering) {
    return <Animated.View entering={entering}>{inner}</Animated.View>;
  }

  return inner;
}
