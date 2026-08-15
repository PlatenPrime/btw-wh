import {
  IconWell,
  type IconWellTone,
} from "@/components/shared/elements";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { type LucideIcon } from "lucide-react";

interface StatItemProps {
  icon: LucideIcon;
  value: string | number;
  tone?: IconWellTone;
  className?: string;
}

export const PosInfoItem = ({
  icon,
  value,
  tone = "muted",
  className = "",
}: StatItemProps) => {
  return (
    <div
      className={cn(
        "bg-muted/30 hover:bg-muted/50 flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-center transition-colors",
        className,
      )}
    >
      <IconWell icon={icon} tone={tone} size="sm" />
      <span className={cn("truncate font-medium", typography.caption)}>
        {value}
      </span>
    </div>
  );
};
