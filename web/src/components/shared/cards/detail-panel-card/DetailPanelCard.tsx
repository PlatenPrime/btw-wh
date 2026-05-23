import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DetailPanelCard({ className, ...props }: CardProps) {
  return (
    <Card variant="elevated" className={cn("p-3", className)} {...props} />
  );
}
