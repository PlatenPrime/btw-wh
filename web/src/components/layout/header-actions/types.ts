import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type HeaderActionVariant =
  | "default"
  | "destructive"
  | "super-destructive"
  | "success"
  | "edit"
  | "info";

export type HeaderActionIconColor =
  | "default"
  | "primary"
  | "muted"
  | "success"
  | "edit"
  | "info"
  | "warning"
  | "destructive"
  | "green"
  | "emerald"
  | "blue"
  | "sky"
  | "red"
  | "rose"
  | "violet"
  | "purple"
  | "orange"
  | "amber";

export type HeaderActionEmphasis = "filled" | "soft" | "icon";

export interface HeaderAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  iconColor?: HeaderActionIconColor;
  variant?: HeaderActionVariant;
  emphasis?: HeaderActionEmphasis;
  onClick: () => void;
}

export interface HeaderActionGroup {
  actions: HeaderAction[];
  variant?: HeaderActionVariant;
}

export interface HeaderActionsContextValue {
  actions: HeaderAction[];
  registerAction: (action: HeaderAction) => void;
  unregisterAction: (id: string) => void;
  clearActions: () => void;
}

export interface HeaderActionsMenuProps {
  trigger?: ReactNode;
}
