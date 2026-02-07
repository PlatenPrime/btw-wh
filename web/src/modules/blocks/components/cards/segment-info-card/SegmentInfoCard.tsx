import { Card, CardContent } from "@/components/ui/card";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface SegmentInfoCardProps {
  segment: SegmentDto;
  zonesCount: number;
}

export function SegmentInfoCard({ segment, zonesCount }: SegmentInfoCardProps) {
  return (
    <Card className="gap-2 p-2 transition-shadow hover:shadow-md">
      <CardContent className="grid gap-2 p-0">
        <div className="flex gap-1">
          <span className="text-muted-foreground text-sm">Порядок:</span>
          <span className="text-sm">{segment.order}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-muted-foreground text-sm">Сектор:</span>
          <span className="text-sm">{segment.sector}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-muted-foreground text-sm">Блок:</span>
          <span className="text-sm">{segment.blockData.title}</span>
        </div>
        <div className="flex gap-1">
          <span className="text-muted-foreground text-sm">Кількість зон:</span>
          <span className="text-sm">{zonesCount}</span>
        </div>
      </CardContent>
    </Card>
  );
}
