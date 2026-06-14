import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ArtMetricCardProps {
  children: ReactNode;
  className?: string;
}

export function ArtMetricCard({ children, className }: ArtMetricCardProps) {
  return (
    <Card variant="compact" className={cn("h-full min-h-[5rem]", className)}>
      <CardContent className="flex h-full min-h-[5rem] items-center">
        {children}
      </CardContent>
    </Card>
  );
}
