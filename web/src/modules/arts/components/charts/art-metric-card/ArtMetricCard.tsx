import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ArtMetricCardProps {
  children: ReactNode;
  className?: string;
}

export function ArtMetricCard({ children, className }: ArtMetricCardProps) {
  return (
    <Card variant="compact" className={cn("w-fit gap-0 p-0", className)}>
      <CardContent className="flex items-center px-3 py-2">
        {children}
      </CardContent>
    </Card>
  );
}
