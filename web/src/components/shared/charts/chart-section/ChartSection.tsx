import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface ChartSectionProps {
  title?: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartSection({
  title,
  toolbar,
  children,
  className,
}: ChartSectionProps) {
  return (
    <Card variant="elevated" className={cn("gap-4 py-4", className)}>
      {title || toolbar ? (
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 px-4 pb-0">
          {title ? <CardTitle className={typography.sectionTitle}>{title}</CardTitle> : <span />}
          {toolbar ? <div className="flex flex-wrap items-center gap-2">{toolbar}</div> : null}
        </CardHeader>
      ) : null}
      <CardContent className="flex min-h-0 flex-1 flex-col px-4">{children}</CardContent>
    </Card>
  );
}
