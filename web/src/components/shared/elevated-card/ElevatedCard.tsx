import { Card, type CardProps } from "@/components/ui/card";
import { cn, interactiveCardClassName } from "@/lib/utils";

export function ElevatedCard({ className, ...props }: CardProps) {
  return (
    <Card
      variant="elevated"
      className={cn(interactiveCardClassName(), className)}
      {...props}
    />
  );
}
