import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ArtChartCardProps {
  children: ReactNode;
  className?: string;
}

export function ArtChartCard({ children, className }: ArtChartCardProps) {
  return (
    <Card className={cn("h-full min-h-0", className)}>
      <CardContent className="flex h-full min-h-0 flex-col gap-3">
        {children}
      </CardContent>
    </Card>
  );
}
