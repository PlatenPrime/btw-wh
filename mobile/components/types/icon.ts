import type { SvgProps } from "react-native-svg";

export type IconFamily =
  | "MaterialIcons"
  | "AntDesign"
  | "Feather"
  | "Ionicons"
  | "FontAwesome5";

export type IconProps = {
  className?: string;
  family?: IconFamily;
  name?: string;
  color?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | number;
  height?: number | string;
  width?: number | string;
  viewBox?: string;
  children?: React.ReactNode;
} & Omit<SvgProps, "children">;

