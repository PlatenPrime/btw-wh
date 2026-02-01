import { useThemeValue } from "@/hooks/use-theme-value";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, Pattern, Rect } from "react-native-svg";
import { View } from "react-native";

const PATTERN_SIZE = 28;
const DOT_RADIUS = 1.2;

/** Цвета точек: light — тёмные на светлом, dark — светлые на тёмном */
const DOT_COLORS = {
  light: "rgba(0, 0, 0, 0.06)",
  dark: "rgba(255, 255, 255, 0.05)",
} as const;

/** Градиент для глубины: диагональный, очень мягкий */
const GRADIENT_LIGHT = [
  "transparent",
  "rgba(50, 180, 244, 0.04)",
  "rgba(251, 157, 75, 0.06)",
  "transparent",
] as const;

const GRADIENT_DARK = [
  "transparent",
  "rgba(50, 180, 244, 0.06)",
  "rgba(231, 129, 40, 0.05)",
  "transparent",
] as const;

function DotPatternSvg({ dotColor }: { dotColor: string }) {
  return (
    <Svg
      width="100%"
      height="100%"
      style={{ position: "absolute" }}
      preserveAspectRatio="none"
    >
      <Defs>
        <Pattern
          id="page-dots"
          patternUnits="userSpaceOnUse"
          width={PATTERN_SIZE}
          height={PATTERN_SIZE}
        >
          <Circle
            cx={PATTERN_SIZE / 2}
            cy={PATTERN_SIZE / 2}
            r={DOT_RADIUS}
            fill={dotColor}
          />
        </Pattern>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#page-dots)" />
    </Svg>
  );
}

export function PageBackground() {
  const theme = useThemeValue();
  const isDark = theme === "dark";
  const dotColor = isDark ? DOT_COLORS.dark : DOT_COLORS.light;
  const gradientColors = isDark ? GRADIENT_DARK : GRADIENT_LIGHT;

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
      }}
      pointerEvents="none"
    >
      <DotPatternSvg dotColor={dotColor} />
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
    </View>
  );
}
