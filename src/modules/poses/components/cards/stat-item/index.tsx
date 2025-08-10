import  { type LucideIcon } from "lucide-react";

interface StatItemProps {
  icon: LucideIcon;
  value: string | number;
  className?: string;
}

export const StatItem = ({
  icon: Icon,
  value,

  className = "",
}: StatItemProps) => {
  return (
    <div
      className={`bg-muted flex flex-col items-center gap-1 rounded-lg p-1.5 text-center ${className}`}
    >
      <Icon className="text-muted-foreground h-4 w-4" />
      <span className="text-foreground text-sm font-semibold">{value}</span>

    </div>
  );
};
