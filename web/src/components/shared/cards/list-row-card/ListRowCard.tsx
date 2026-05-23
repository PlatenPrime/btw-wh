import { Card, type CardProps } from "@/components/ui/card";
import { cn, interactiveCardClassName } from "@/lib/utils";

export function ListRowCard({ className, ...props }: CardProps) {
  return (
    <Card
      variant="compact"
      className={cn(interactiveCardClassName(), "gap-0", className)}
      {...props}
    />
  );
}
