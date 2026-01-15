import { Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn("bg-card/10 dark:bg-card/50 rounded-xl p-2")}
    >
      <CardContent className={cn("p-0", className)}>{children}</CardContent>
    </Card>
  );
}
