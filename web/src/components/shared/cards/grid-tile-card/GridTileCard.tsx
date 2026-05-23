import { Card, type CardProps } from "@/components/ui/card";
import { cn, interactiveCardClassName } from "@/lib/utils";

export function GridTileCard({ className, ...props }: CardProps) {
  return (
    <Card
      variant="compact"
      className={cn(interactiveCardClassName(), className)}
      {...props}
    />
  );
}
