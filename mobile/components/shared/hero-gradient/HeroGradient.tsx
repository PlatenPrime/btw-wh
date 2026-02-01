import { useThemeValue } from "@/hooks/use-theme-value";
import { LinearGradient } from "expo-linear-gradient";
import { type ViewStyle } from "react-native";

const DEFAULT_HEIGHT = 140;

/** Цвета градиента: tertiary-400 → info-400 (light theme) */
const GRADIENT_LIGHT = [
  "rgba(251, 157, 75, 0.2)",
  "rgba(50, 180, 244, 0.12)",
  "transparent",
] as const;

/** Цвета градиента для dark theme */
const GRADIENT_DARK = [
  "rgba(231, 129, 40, 0.15)",
  "rgba(50, 180, 244, 0.08)",
  "transparent",
] as const;

export interface HeroGradientProps {
  height?: number;
  style?: ViewStyle;
}

export function HeroGradient({ height = DEFAULT_HEIGHT, style }: HeroGradientProps) {
  const theme = useThemeValue();
  const colors = theme === "dark" ? GRADIENT_DARK : GRADIENT_LIGHT;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height,
          zIndex: 0,
        },
        style,
      ]}
      pointerEvents="none"
    />
  );
}
