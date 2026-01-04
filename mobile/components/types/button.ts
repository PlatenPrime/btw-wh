import type { PressableProps } from "react-native";

export interface ButtonProps extends PressableProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "create"
    | "delete"
    | "confirm";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

