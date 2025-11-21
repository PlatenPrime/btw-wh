import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";

interface BlockZoneCardProps {
  zone: ZoneWithBlockDto;
}

export function BlockZoneCard({ zone }: BlockZoneCardProps) {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <CardTitle className="text-base">{zone.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Штрих-код:</span>
          <span className="text-muted-foreground text-xs">{zone.bar}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Сектор:</span>
          <span className="text-muted-foreground text-xs">{zone.sector}</span>
        </div>
        {zone.order !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Порядок:</span>
            <span className="text-muted-foreground text-xs">{zone.order}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

