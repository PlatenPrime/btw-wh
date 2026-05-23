import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

import {
  actionTypeToButtonVariant,
  actionTypeToIconVariant,
  type ActionType,
} from "@/components/shared/action-button/action-button-variants";

interface ActionButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant"> {
  action: ActionType;
  iconOnly?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export function ActionButton({
  action,
  iconOnly = false,
  variant,
  className,
  size,
  ...props
}: ActionButtonProps) {
  const resolvedVariant =
    variant ??
    (iconOnly ? actionTypeToIconVariant[action] : actionTypeToButtonVariant[action]);

  return (
    <Button
      variant={resolvedVariant}
      size={iconOnly ? (size ?? "icon-sm") : size}
      className={cn(className)}
      {...props}
    />
  );
}
