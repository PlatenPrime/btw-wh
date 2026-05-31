import type { LucideIcon } from "lucide-react";

export type CardActionVariant = "default" | "destructive";
export type CardActionIconColor = "emerald" | "rose" | "red" | "default";
export type CardActionsOrientation = "horizontal" | "vertical";
export type CardActionsSize = "sm" | "md";

export interface CardAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  iconColor?: CardActionIconColor;
  variant?: CardActionVariant;
  onClick: () => void;
}

export interface CardActionsMenuProps {
  actions: CardAction[];
  trigger?: React.ReactNode;
  orientation?: CardActionsOrientation;
  size?: CardActionsSize;
  align?: "start" | "center" | "end";
}
