export type HeaderActionVariant =
  | "default"
  | "destructive"
  | "super-destructive";

export type HeaderActionIconColor =
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

export type HeaderActionTextColor =
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
  icon?: string;
  iconColor?: HeaderActionIconColor;
  textColor?: HeaderActionTextColor;
  variant?: HeaderActionVariant;
  onClick: () => void;
}

export interface HeaderActionsContextValue {
  actions: HeaderAction[];
  registerAction: (action: HeaderAction) => void;
  unregisterAction: (id: string) => void;
  clearActions: () => void;
}
