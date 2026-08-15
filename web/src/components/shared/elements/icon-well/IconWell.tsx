import { iconSize } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type IconWellTone =
  | "info"
  | "success"
  | "edit"
  | "warning"
  | "primary"
  | "destructive"
  | "muted";

export type IconWellSize = "sm" | "md";

const TONE_CLASSES: Record<IconWellTone, { icon: string; well: string }> = {
  info: {
    icon: "text-info",
    well: "bg-info/15",
  },
  success: {
    icon: "text-success",
    well: "bg-success/15",
  },
  edit: {
    icon: "text-edit",
    well: "bg-edit/15",
  },
  warning: {
    icon: "text-warning",
    well: "bg-warning/15",
  },
  primary: {
    icon: "text-primary",
    well: "bg-primary/15",
  },
  destructive: {
    icon: "text-destructive",
    well: "bg-destructive/15",
  },
  muted: {
    icon: "text-muted-foreground",
    well: "bg-muted",
  },
};

const SIZE_CLASSES: Record<IconWellSize, { well: string; icon: string }> = {
  sm: {
    well: "size-6 rounded-md",
    icon: iconSize.inline,
  },
  md: {
    well: "size-8 rounded-lg",
    icon: iconSize.ui,
  },
};

export interface IconWellProps {
  icon: LucideIcon;
  tone?: IconWellTone;
  size?: IconWellSize;
  className?: string;
}

export function IconWell({
  icon: Icon,
  tone = "muted",
  size = "md",
  className,
}: IconWellProps) {
  const toneClass = TONE_CLASSES[tone];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizeClass.well,
        toneClass.well,
        className,
      )}
      aria-hidden
    >
      <Icon className={cn(sizeClass.icon, toneClass.icon)} />
    </span>
  );
}
