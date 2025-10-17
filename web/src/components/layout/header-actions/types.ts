import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type HeaderActionVariant =
  | "default"
  | "destructive"
  | "super-destructive";
export type HeaderActionIconColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "default";

export interface HeaderAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  iconColor?: HeaderActionIconColor;
  variant?: HeaderActionVariant;
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
