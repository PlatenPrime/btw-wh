import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";

export type ActionType =
  | "create"
  | "save"
  | "edit"
  | "delete"
  | "cancel"
  | "apply"
  | "view"
  | "export";

export const actionTypeToButtonVariant: Record<
  ActionType,
  NonNullable<VariantProps<typeof buttonVariants>["variant"]>
> = {
  create: "default",
  save: "success",
  edit: "edit",
  delete: "destructive",
  cancel: "outline",
  apply: "info",
  view: "info-soft",
  export: "info-soft",
};

export const actionTypeToIconVariant: Record<
  ActionType,
  NonNullable<VariantProps<typeof buttonVariants>["variant"]>
> = {
  create: "default",
  save: "success-soft",
  edit: "edit-soft",
  delete: "destructive",
  cancel: "outline",
  apply: "info-soft",
  view: "info-soft",
  export: "info-soft",
};
