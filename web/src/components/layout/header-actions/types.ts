import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type HeaderActionVariant = "default" | "destructive";

export interface HeaderAction {
  id: string;
  label: string;
  icon?: LucideIcon;
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
