import { Switch as RNSwitch } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, SemanticColors } from "@/constants/theme";

export interface SwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
  ios_backgroundColor?: string;
}

export function Switch({
  value = false,
  onValueChange,
  disabled = false,
  trackColor,
  thumbColor,
  ios_backgroundColor,
  ...props
}: SwitchProps) {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";

  const defaultTrackColor = trackColor || {
    false: isDark ? SemanticColors.switch.track.false.dark : SemanticColors.switch.track.false.light,
    true: isDark ? SemanticColors.switch.track.true.dark : SemanticColors.switch.track.true.light,
  };

  const defaultThumbColor = thumbColor || SemanticColors.switch.thumb;

  const defaultIosBackgroundColor =
    ios_backgroundColor || defaultTrackColor.false;

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={defaultTrackColor}
      thumbColor={defaultThumbColor}
      ios_backgroundColor={defaultIosBackgroundColor}
      {...props}
    />
  );
}

export type SwitchPropsType = SwitchProps;

