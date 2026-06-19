import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import { type LucideIcon } from "lucide-react";

interface StatItemProps {
  icon: LucideIcon;
  value: string | number;
  className?: string;
}

export const PosInfoItem = ({
  icon: Icon,
  value,
  className = "",
}: StatItemProps) => {
  return (
    <div
      className={cn(
        "bg-muted/30 hover:bg-muted/50 flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-center transition-colors",
        className,
      )}
    >
      <Icon className={iconSize.inline} />
      <span className={cn("truncate font-medium", typography.caption)}>
        {value}
      </span>
    </div>
  );
};
