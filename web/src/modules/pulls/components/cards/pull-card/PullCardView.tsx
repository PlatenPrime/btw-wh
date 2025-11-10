import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pull, PullPosition } from "@/modules/pulls/api/types";
import { PullPositionsList } from "@/modules/pulls/components/lists/pull-positions-list/PullPositionsList";
import { MapPin, Package, Rows4 } from "lucide-react";

interface PullCardViewProps {
  pull: Pull;
  onPositionClick: (position: PullPosition) => void;
}

export function PullCardView({ pull, onPositionClick }: PullCardViewProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-4 w-4 text-primary" />
            {pull.palletTitle}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Сектор {pull.sector ?? "—"}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Rows4 className="h-3 w-3" />
              Ряд {pull.rowTitle}
            </Badge>
          </div>
        </div>
        <div className="text-muted-foreground grid gap-1 text-sm sm:grid-cols-2">
          <span>Позицій: {pull.positions.length}</span>
          <span>Запитів: {pull.totalAsks}</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <PullPositionsList positions={pull.positions} onPositionClick={onPositionClick} />
      </CardContent>
    </Card>
  );
}
