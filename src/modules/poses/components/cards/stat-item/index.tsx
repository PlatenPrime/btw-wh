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
      className={`bg-muted flex justify-center items-center gap-1 rounded-lg  text-center ${className}`}
    >
      <Icon className="text-muted-foreground  size-[1cap]" />
      <span className="text-foreground text-sm ">{value}</span>

    </div>
  );
};
